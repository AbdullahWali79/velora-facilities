'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  sendAdminQuoteNotification,
  sendCustomerQuoteAcknowledgement,
} from '@/lib/email'

export interface QuoteFormState {
  success: boolean
  message: string
  referenceId?: string | number
  errors?: Record<string, string>
}

export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  try {
    // 1. Anti-spam honeypot
    const honeypot = formData.get('hp_organization')?.toString() || ''
    if (honeypot.trim().length > 0) {
      return {
        success: true,
        message: 'Your quote request has been received. Our team will prepare your estimate.',
      }
    }

    // 2. Submission speed check
    const formRenderTime = Number(formData.get('_renderedAt') || 0)
    const now = Date.now()
    if (formRenderTime > 0 && now - formRenderTime < 1000) {
      return {
        success: false,
        message: 'Submission was too fast. Please verify your details and resubmit.',
      }
    }

    // 3. Extract and sanitize inputs
    const fullName = formData.get('fullName')?.toString().trim().replace(/<[^>]*>?/gm, '') || ''
    const email = formData.get('email')?.toString().trim().toLowerCase() || ''
    const phone = formData.get('phone')?.toString().trim() || ''
    const serviceInput = formData.get('service')?.toString().trim() || ''
    const propertyType = formData.get('propertyType')?.toString().trim().toLowerCase() || 'villa'
    const emirate = formData.get('emirate')?.toString().trim().toLowerCase() || 'dubai'
    const areaOrCommunity = formData.get('areaOrCommunity')?.toString().trim().replace(/<[^>]*>?/gm, '') || ''
    const approximateSizeSqFt = Number(formData.get('approximateSizeSqFt')) || undefined
    const preferredDate = formData.get('preferredDate')?.toString().trim() || undefined
    const details = formData.get('details')?.toString().trim().replace(/<[^>]*>?/gm, '') || ''

    // 4. Validate required fields
    const errors: Record<string, string> = {}

    if (!fullName || fullName.length < 2) {
      errors.fullName = 'Please enter your full name (minimum 2 characters).'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please provide a valid email address.'
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '')
    if (!cleanPhone || cleanPhone.length < 8) {
      errors.phone = 'Please provide a valid contact telephone number (+971...).'
    }

    const validPropertyTypes = ['apartment', 'villa', 'office', 'retail', 'warehouse', 'building', 'other']
    if (!validPropertyTypes.includes(propertyType)) {
      errors.propertyType = 'Please select a valid property category.'
    }

    const validEmirates = ['dubai', 'abu_dhabi', 'sharjah', 'ajman', 'ras_al_khaimah', 'umm_al_quwain', 'fujairah']
    if (!validEmirates.includes(emirate)) {
      errors.emirate = 'Please select a valid UAE emirate.'
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please resolve the highlighted fields and resubmit.',
        errors,
      }
    }

    // 5. Connect to Payload CMS Local API
    const payload = await getPayload({ config: configPromise })

    // Optional service relationship & title
    let serviceId: number | undefined = undefined
    let serviceTitle: string | undefined = undefined

    const parsedId = Number(serviceInput)
    if (!isNaN(parsedId) && parsedId > 0) {
      serviceId = parsedId
      try {
        const doc = await payload.findByID({ collection: 'services', id: serviceId })
        if (doc?.title) serviceTitle = doc.title
      } catch {
        // ignore
      }
    } else if (serviceInput) {
      const matched = await payload.find({
        collection: 'services',
        where: { slug: { equals: serviceInput } },
        limit: 1,
      })
      if (matched.docs.length > 0) {
        serviceId = matched.docs[0].id
        serviceTitle = matched.docs[0].title
      }
    }

    // 6. Duplicate Submission Protection
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    const recentDuplicate = await payload.find({
      collection: 'quote-requests',
      where: {
        and: [
          { email: { equals: email } },
          { propertyType: { equals: propertyType } },
          { emirate: { equals: emirate } },
          { createdAt: { greater_than_equal: tenMinutesAgo } },
        ],
      },
      limit: 1,
    })

    if (recentDuplicate.docs.length > 0) {
      const existing = recentDuplicate.docs[0]
      return {
        success: true,
        message: 'We have already received your quotation request! Our team is preparing your custom proposal and will contact you shortly.',
        referenceId: existing.id,
      }
    }

    // 7. Save quote request into Supabase PostgreSQL via Payload CMS
    const created = await payload.create({
      collection: 'quote-requests',
      data: {
        fullName,
        email,
        phone: cleanPhone,
        ...(serviceId ? { service: serviceId } : {}),
        propertyType: propertyType as 'apartment' | 'villa' | 'office' | 'retail' | 'warehouse' | 'building' | 'other',
        emirate: emirate as 'dubai' | 'abu_dhabi' | 'sharjah' | 'ajman' | 'ras_al_khaimah' | 'umm_al_quwain' | 'fujairah',
        areaOrCommunity,
        approximateSizeSqFt,
        preferredDate,
        details,
        status: 'new',
      },
    })

    console.log(`[VELORA CMS NOTIFICATION] New Quotation Request #${created.id} received from ${fullName} (${email}, ${cleanPhone}) for ${propertyType} in ${emirate}.`)

    // 8. Dispatch notification emails (Admin alert + Customer acknowledgement)
    const emailPayload = {
      id: created.id,
      fullName,
      email,
      phone: cleanPhone,
      serviceTitle,
      propertyType,
      emirate,
      areaOrCommunity,
      approximateSizeSqFt,
      preferredDate,
      details,
    }

    Promise.allSettled([
      sendAdminQuoteNotification(emailPayload),
      sendCustomerQuoteAcknowledgement(emailPayload),
    ]).then((results) => {
      results.forEach((res, idx) => {
        const target = idx === 0 ? 'Admin' : 'Customer'
        if (res.status === 'fulfilled' && res.value.sent) {
          console.log(`[EMAIL DISPATCH] ${target} quote notification sent successfully for #${created.id}`)
        } else {
          console.log(`[EMAIL DISPATCH] ${target} quote email not sent or simulated. Reason:`, res.status === 'fulfilled' ? res.value.error : res.reason)
        }
      })
    })

    return {
      success: true,
      message: 'Thank you! Your quotation request has been received. An estimator from Velora Elite will contact you within 2 business hours with a detailed proposal.',
      referenceId: created.id,
    }
  } catch (err: unknown) {
    const error = err as Error
    console.error('submitQuoteRequest error:', error.message)
    return {
      success: false,
      message: 'Failed to submit quote request. Please reach us directly via WhatsApp (+971 55 675 1854) or telephone (04 579 2137).',
    }
  }
}
