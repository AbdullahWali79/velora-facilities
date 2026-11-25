/**
 * Unified Analytics & Advertising Conversion Tracking Helper
 * Supports:
 * - Google Analytics 4 (gtag)
 * - Meta / Facebook Pixel (fbq)
 * - TikTok Pixel (ttq)
 * - Google Tag Manager (dataLayer)
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void
      page: () => void
    }
    dataLayer?: Array<Record<string, unknown>>
  }
}

/**
 * Generic event dispatcher across all active ad pixels and analytics engines
 * Enforces session deduplication and scrubs sensitive PII
 */
export function trackConversionEvent(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === 'undefined') return

  // 1. Session Deduplication Check (prevents double firing on reloads/back-forward)
  const deduplicatedEvents = [
    'generate_lead',
    'quote_submission',
    'schedule_service',
    'book_inspection',
    'thank_you_view',
  ]
  if (deduplicatedEvents.includes(eventName)) {
    const refKey = params.reference_id ? String(params.reference_id) : 'session'
    const dedupeKey = `velora_dedupe_${eventName}_${refKey}`
    try {
      if (window.sessionStorage.getItem(dedupeKey)) {
        // Event already fired in this session for this reference ID - prevent double counting
        return
      }
      window.sessionStorage.setItem(dedupeKey, '1')
    } catch {
      // sessionStorage unavailable or restricted, proceed safely
    }
  }

  // 2. Scrub PII from payload to protect user privacy
  const sanitizedParams: Record<string, unknown> = { ...params }
  delete sanitizedParams.email
  delete sanitizedParams.phone
  delete sanitizedParams.fullName
  delete sanitizedParams.customerName
  delete sanitizedParams.address

  try {
    // 3. Google Analytics 4 & Google Ads (gtag)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, sanitizedParams)
    }

    // 4. Google Tag Manager (dataLayer)
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...sanitizedParams,
        timestamp: new Date().toISOString(),
      })
    }

    // 5. Meta (Facebook) Pixel
    if (typeof window.fbq === 'function') {
      if (eventName === 'generate_lead' || eventName === 'quote_submission') {
        window.fbq('track', 'Lead', sanitizedParams)
      } else if (eventName === 'book_inspection' || eventName === 'schedule_service') {
        window.fbq('track', 'Schedule', sanitizedParams)
      } else if (eventName === 'contact_whatsapp' || eventName === 'contact_call') {
        window.fbq('track', 'Contact', sanitizedParams)
      } else {
        window.fbq('trackCustom', eventName, sanitizedParams)
      }
    }

    // 6. TikTok Pixel
    if (window.ttq && typeof window.ttq.track === 'function') {
      if (eventName === 'generate_lead' || eventName === 'quote_submission') {
        window.ttq.track('SubmitForm', sanitizedParams)
      } else if (eventName === 'contact_whatsapp' || eventName === 'contact_call') {
        window.ttq.track('Contact', sanitizedParams)
      } else {
        window.ttq.track(eventName, sanitizedParams)
      }
    }
  } catch (err) {
    console.debug('[Tracking Error]', err)
  }
}

/**
 * Pre-defined high-intent conversion helpers
 */
export function trackWhatsAppClick(source: string = 'floating_button') {
  trackConversionEvent('contact_whatsapp', {
    channel: 'whatsapp',
    source,
    value: 1,
    currency: 'AED',
  })
}

export function trackPhoneCallClick(source: string = 'header') {
  trackConversionEvent('contact_call', {
    channel: 'phone',
    source,
    value: 1,
    currency: 'AED',
  })
}

export function trackQuoteSubmission(referenceId?: string | number, service?: string) {
  trackConversionEvent('generate_lead', {
    type: 'quotation_request',
    reference_id: referenceId,
    service_name: service,
    currency: 'AED',
  })
}

export function trackBookingSubmission(referenceId?: string | number, service?: string) {
  trackConversionEvent('schedule_service', {
    type: 'booking_request',
    reference_id: referenceId,
    service_name: service,
    currency: 'AED',
  })
}

export function trackInspectionClick(source: string = 'button') {
  trackConversionEvent('book_inspection_click', {
    source,
    intent: 'free_site_inspection',
  })
}
