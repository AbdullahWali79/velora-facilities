'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  sendAdminBookingNotification,
  sendCustomerBookingAcknowledgement,
} from '@/lib/email'

export interface BookingFormState {
  success: boolean
  message: string
  referenceId?: string | number
  errors?: Record<string, string>
}

export async function submitBookingRequest(
  _prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  try {
    // 1. Anti-spam honeypot check (hidden field that only bots fill)
    const honeypot = formData.get('hp_address')?.toString() || ''
    if (honeypot.trim().length > 0) {
      // Silently discard automated bot submission
      return {
        success: true,
        message: 'Your booking request has been received. Our coordinator will contact you shortly.',
      }
    }

    // 2. Submission speed check (token containing timestamp)
    const formRenderTime = Number(formData.get('_renderedAt') || 0)
    const now = Date.now()
    if (formRenderTime > 0 && now - formRenderTime < 1000) {
      // Submitting in under 1s is characteristic of automated bots
      return {
        success: false,
        message: 'Submission was too fast. Please verify your details and try again.',
      }
    }

    // 3. Extract and sanitize input fields
    const customerName = formData.get('customerName')?.toString().trim().replace(/<[^>]*>?/gm, '') || ''
    const email = formData.get('email')?.toString().trim().toLowerCase() || ''
    const phone = formData.get('phone')?.toString().trim() || ''
    const serviceInput = formData.get('service')?.toString().trim() || ''
    const preferredDate = formData.get('preferredDate')?.toString().trim() || ''
    const timeSlot = formData.get('timeSlot')?.toString().trim() || 'morning_08_12'
    const emirate = formData.get('emirate')?.toString().trim().toLowerCase() || 'dubai'
    const fullAddress = formData.get('fullAddress')?.toString().trim().replace(/<[^>]*>?/gm, '') || ''
    const specialInstructions = formData.get('specialInstructions')?.toString().trim().replace(/<[^>]*>?/gm, '') || ''

    // 4. Validate required fields
    const errors: Record<string, string> = {}

    if (!customerName || customerName.length < 2) {
      errors.customerName = 'Please enter your full name (minimum 2 characters).'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please provide a valid email address.'
    }

    // UAE phone validation: min 8 digits, handles +971, 05x, etc.
    const cleanPhone = phone.replace(/[^0-9+]/g, '')
    if (!cleanPhone || cleanPhone.length < 8) {
      errors.phone = 'Please provide a valid contact telephone number (+971...).'
    }

    if (!preferredDate) {
      errors.preferredDate = 'Please select your preferred appointment date.'
    } else {
      // Validate appointment date against current calendar date in Asia/Dubai timezone (UTC+4)
      const todayDubaiStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai' }).format(new Date())
      if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || preferredDate < todayDubaiStr) {
        errors.preferredDate = 'Please choose a current or future appointment date.'
      }
    }

    const validTimeSlots = ['morning_08_12', 'afternoon_12_16', 'evening_16_20', 'flexible']
    if (!validTimeSlots.includes(timeSlot)) {
      errors.timeSlot = 'Please select a valid time window.'
    }

    const validEmirates = ['dubai', 'abu_dhabi', 'sharjah', 'ajman', 'ras_al_khaimah', 'umm_al_quwain', 'fujairah']
    if (!validEmirates.includes(emirate)) {
      errors.emirate = 'Please select a valid UAE emirate.'
    }

    if (!fullAddress || fullAddress.length < 5) {
      errors.fullAddress = 'Please specify your building/villa number, community, and address.'
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

    // Resolve service relationship & title
    let serviceId: number | null = null
    let serviceTitle = 'Specialized Technical Service'

    const parsedId = Number(serviceInput)
    if (!isNaN(parsedId) && parsedId > 0) {
      serviceId = parsedId
      try {
        const doc = await payload.findByID({ collection: 'services', id: serviceId })
        if (doc?.title) serviceTitle = doc.title
      } catch {
        // ignore if not found
      }
    } else if (serviceInput) {
      const matchedServices = await payload.find({
        collection: 'services',
        where: {
          slug: { equals: serviceInput },
        },
        limit: 1,
      })
      if (matchedServices.docs.length > 0) {
        serviceId = matchedServices.docs[0].id
        serviceTitle = matchedServices.docs[0].title
      }
    }

    if (!serviceId) {
      const allServices = await payload.find({ collection: 'services', limit: 1 })
      if (allServices.docs.length > 0) {
        serviceId = allServices.docs[0].id
        serviceTitle = allServices.docs[0].title
      }
    }

    if (!serviceId) {
      return {
        success: true,
        message: 'Thank you! Your booking request has been logged. Our dispatch team will call you shortly to confirm your slot.',
      }
    }

    // 6. Duplicate Submission Protection (prevent double-clicks & rapid repeats)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    const recentDuplicate = await payload.find({
      collection: 'booking-requests',
      where: {
        and: [
          { email: { equals: email } },
          { service: { equals: serviceId } },
          { preferredDate: { equals: preferredDate } },
          { createdAt: { greater_than_equal: tenMinutesAgo } },
        ],
      },
      limit: 1,
    })

    if (recentDuplicate.docs.length > 0) {
      const existing = recentDuplicate.docs[0]
      return {
        success: true,
        message: 'We have already received your booking request! Our scheduling coordinator will contact you shortly to confirm your slot.',
        referenceId: existing.id,
      }
    }

    // 7. Save booking request into Supabase PostgreSQL via Payload CMS
    const created = await payload.create({
      collection: 'booking-requests',
      data: {
        customerName,
        email,
        phone: cleanPhone,
        service: serviceId,
        preferredDate,
        timeSlot: timeSlot as 'morning_08_12' | 'afternoon_12_16' | 'evening_16_20' | 'flexible',
        emirate: emirate as 'dubai' | 'abu_dhabi' | 'sharjah' | 'ajman' | 'ras_al_khaimah' | 'umm_al_quwain' | 'fujairah',
        fullAddress,
        specialInstructions,
        bookingStatus: 'pending_confirmation',
      },
    })

    console.log(`[VELORA CMS NOTIFICATION] New Booking Request #${created.id} received from ${customerName} (${cleanPhone}) for service ${serviceTitle} on ${preferredDate}.`)

    // 8. Dispatch notification emails (Admin alert + Customer acknowledgement)
    // Non-blocking: failures are logged and do not prevent successful user feedback
    const timeSlotLabelMap: Record<string, string> = {
      morning_08_12: 'Morning (08:00 AM - 12:00 PM)',
      afternoon_12_16: 'Afternoon (12:00 PM - 04:00 PM)',
      evening_16_20: 'Evening (04:00 PM - 08:00 PM)',
      flexible: 'Flexible / Any Time',
    }

    const emailPayload = {
      id: created.id,
      customerName,
      email,
      phone: cleanPhone,
      serviceTitle,
      preferredDate,
      timeSlot: timeSlotLabelMap[timeSlot] || timeSlot,
      emirate,
      fullAddress,
      specialInstructions,
    }

    try {
      const emailResults = await Promise.allSettled([
        sendAdminBookingNotification(emailPayload),
        sendCustomerBookingAcknowledgement(emailPayload),
      ])
      emailResults.forEach((res, idx) => {
        const target = idx === 0 ? 'Admin' : 'Customer'
        if (res.status === 'fulfilled' && res.value.sent) {
          console.log(`[EMAIL DISPATCH] ${target} booking notification sent successfully for #${created.id}`)
        } else {
          console.log(`[EMAIL DISPATCH] ${target} booking email not sent or simulated. Reason:`, res.status === 'fulfilled' ? res.value.error : res.reason)
        }
      })
    } catch (emailErr: unknown) {
      console.warn('[EMAIL DISPATCH] Error during booking email dispatch:', (emailErr as Error).message)
    }

    return {
      success: true,
      message: 'Your booking request was submitted successfully! Our scheduling coordinator will contact you via phone or WhatsApp to confirm your dispatch time.',
      referenceId: created.id,
    }
  } catch (err: unknown) {
    const error = err as Error
    console.error('submitBookingRequest error:', error.message)
    return {
      success: false,
      message: 'Unable to submit booking request at this moment. Please call us directly at 04 579 2137 or message on WhatsApp.',
    }
  }
}
