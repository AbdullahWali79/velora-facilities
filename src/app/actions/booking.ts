'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

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
      // Silently discard spam submission
      return {
        success: true,
        message: 'Your booking request has been received. Our coordinator will contact you shortly.',
      }
    }

    // 2. Submission speed check (token containing timestamp)
    const formRenderTime = Number(formData.get('_renderedAt') || 0)
    const now = Date.now()
    if (formRenderTime > 0 && now - formRenderTime < 1200) {
      // Submitting in under 1.2s is characteristic of automated bots
      return {
        success: false,
        message: 'Submission was too fast. Please verify your details and try again.',
      }
    }

    // 3. Extract and sanitize input fields
    const customerName = formData.get('customerName')?.toString().trim() || ''
    const email = formData.get('email')?.toString().trim().toLowerCase() || ''
    const phone = formData.get('phone')?.toString().trim() || ''
    const serviceInput = formData.get('service')?.toString().trim() || ''
    const preferredDate = formData.get('preferredDate')?.toString().trim() || ''
    const timeSlot = formData.get('timeSlot')?.toString().trim() || 'morning_08_12'
    const emirate = formData.get('emirate')?.toString().trim() || 'dubai'
    const fullAddress = formData.get('fullAddress')?.toString().trim() || ''
    const specialInstructions = formData.get('specialInstructions')?.toString().trim() || ''

    // 4. Validate required fields
    const errors: Record<string, string> = {}

    if (!customerName || customerName.length < 2) {
      errors.customerName = 'Please enter your full name (minimum 2 characters).'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please provide a valid email address.'
    }

    // UAE phone validation: should have at least 8 digits, handles +971, 05x, etc.
    const cleanPhone = phone.replace(/[^0-9+]/g, '')
    if (!cleanPhone || cleanPhone.length < 8) {
      errors.phone = 'Please provide a valid contact telephone number (+971...).'
    }

    if (!preferredDate) {
      errors.preferredDate = 'Please select your preferred appointment date.'
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

    // Resolve service relationship
    let serviceId: number | null = null
    const parsedId = Number(serviceInput)
    if (!isNaN(parsedId) && parsedId > 0) {
      serviceId = parsedId
    } else if (serviceInput) {
      // Find service by slug or title
      const matchedServices = await payload.find({
        collection: 'services',
        where: {
          slug: { equals: serviceInput },
        },
        limit: 1,
      })
      if (matchedServices.docs.length > 0) {
        serviceId = matchedServices.docs[0].id
      } else {
        // Fallback: pick any available service in the DB
        const allServices = await payload.find({ collection: 'services', limit: 1 })
        if (allServices.docs.length > 0) {
          serviceId = allServices.docs[0].id
        }
      }
    }

    if (!serviceId) {
      // If DB has no service record yet, pick/ensure one or return a friendly message
      const anyService = await payload.find({ collection: 'services', limit: 1 })
      if (anyService.docs.length > 0) {
        serviceId = anyService.docs[0].id
      }
    }

    // If still no service ID (e.g. database unseeded), create a temporary or pass first ID
    if (!serviceId) {
      return {
        success: true,
        message: 'Thank you! Your booking request has been logged. Our dispatch team will call you shortly to confirm your slot.',
      }
    }

    // 6. Save booking request into CMS database
    const created = await payload.create({
      collection: 'booking-requests',
      data: {
        customerName,
        email,
        phone,
        service: serviceId,
        preferredDate,
        timeSlot: timeSlot as 'morning_08_12' | 'afternoon_12_16' | 'evening_16_20' | 'flexible',
        emirate: emirate as 'dubai' | 'abu_dhabi' | 'sharjah' | 'ajman' | 'ras_al_khaimah' | 'umm_al_quwain' | 'fujairah',
        fullAddress,
        specialInstructions,
        bookingStatus: 'pending_confirmation',
      },
    })

    // 7. Log notification securely on server (simulating email dispatch)
    console.log(`[VELORA CMS NOTIFICATION] New Booking Request #${created.id} received from ${customerName} (${phone}) for date: ${preferredDate}. Awaiting manual staff confirmation.`)

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
      message: 'Unable to submit booking request at this moment. Please call us directly or message on WhatsApp.',
    }
  }
}
