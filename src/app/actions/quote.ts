'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

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
    if (formRenderTime > 0 && now - formRenderTime < 1200) {
      return {
        success: false,
        message: 'Submission was too fast. Please verify your details and resubmit.',
      }
    }

    // 3. Extract and sanitize inputs
    const fullName = formData.get('fullName')?.toString().trim() || ''
    const email = formData.get('email')?.toString().trim().toLowerCase() || ''
    const phone = formData.get('phone')?.toString().trim() || ''
    const serviceInput = formData.get('service')?.toString().trim() || ''
    const propertyType = formData.get('propertyType')?.toString().trim() || 'villa'
    const emirate = formData.get('emirate')?.toString().trim() || 'dubai'
    const areaOrCommunity = formData.get('areaOrCommunity')?.toString().trim() || ''
    const approximateSizeSqFt = Number(formData.get('approximateSizeSqFt')) || undefined
    const preferredDate = formData.get('preferredDate')?.toString().trim() || undefined
    const details = formData.get('details')?.toString().trim() || ''

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

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please resolve the highlighted fields and resubmit.',
        errors,
      }
    }

    // 5. Connect to Payload CMS Local API
    const payload = await getPayload({ config: configPromise })

    // Optional service relationship
    let serviceId: number | undefined = undefined
    const parsedId = Number(serviceInput)
    if (!isNaN(parsedId) && parsedId > 0) {
      serviceId = parsedId
    } else if (serviceInput) {
      const matched = await payload.find({
        collection: 'services',
        where: { slug: { equals: serviceInput } },
        limit: 1,
      })
      if (matched.docs.length > 0) {
        serviceId = matched.docs[0].id
      }
    }

    // 6. Save quote request
    const created = await payload.create({
      collection: 'quote-requests',
      data: {
        fullName,
        email,
        phone,
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

    console.log(`[VELORA CMS NOTIFICATION] New Quotation Request #${created.id} received from ${fullName} (${email}, ${phone}) for ${propertyType} in ${emirate}.`)

    return {
      success: true,
      message: 'Thank you! Your quotation request has been received. An estimator from Velora Facilities will contact you within 2 business hours with a detailed proposal.',
      referenceId: created.id,
    }
  } catch (err: unknown) {
    const error = err as Error
    console.error('submitQuoteRequest error:', error.message)
    return {
      success: false,
      message: 'Failed to submit quote request. Please reach us directly via WhatsApp or call.',
    }
  }
}
