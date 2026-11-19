'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export interface ContactFormState {
  success: boolean
  message: string
  referenceId?: string | number
  errors?: Record<string, string>
}

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // 1. Anti-spam honeypot
    const honeypot = formData.get('hp_subject_field')?.toString() || ''
    if (honeypot.trim().length > 0) {
      return {
        success: true,
        message: 'Your message has been received. Our team will review your inquiry.',
      }
    }

    // 2. Submission speed check
    const formRenderTime = Number(formData.get('_renderedAt') || 0)
    const now = Date.now()
    if (formRenderTime > 0 && now - formRenderTime < 1000) {
      return {
        success: false,
        message: 'Submission was too fast. Please verify your message and try again.',
      }
    }

    // 3. Extract and sanitize inputs
    const fullName = formData.get('fullName')?.toString().trim() || ''
    const email = formData.get('email')?.toString().trim().toLowerCase() || ''
    const phone = formData.get('phone')?.toString().trim() || ''
    const subject = formData.get('subject')?.toString().trim() || ''
    const message = formData.get('message')?.toString().trim() || ''

    // 4. Validate fields
    const errors: Record<string, string> = {}

    if (!fullName || fullName.length < 2) {
      errors.fullName = 'Please enter your full name.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please provide a valid email address.'
    }

    if (!subject || subject.length < 3) {
      errors.subject = 'Please enter a message subject.'
    }

    if (!message || message.length < 10) {
      errors.message = 'Please provide a message with at least 10 characters.'
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please complete all required fields.',
        errors,
      }
    }

    // 5. Connect to Payload CMS Local API
    const payload = await getPayload({ config: configPromise })

    // 6. Save message to database
    const created = await payload.create({
      collection: 'contact-messages',
      data: {
        fullName,
        email,
        phone,
        subject,
        message,
        status: 'unread',
      },
    })

    console.log(`[VELORA CMS NOTIFICATION] New Contact Message #${created.id} from ${fullName} (${email}): ${subject}`)

    return {
      success: true,
      message: 'Thank you! Your message has been sent to our customer care team. We will get back to you promptly.',
      referenceId: created.id,
    }
  } catch (err: unknown) {
    const error = err as Error
    console.error('submitContactMessage error:', error.message)
    return {
      success: false,
      message: 'Failed to send message. Please contact us via phone or WhatsApp.',
    }
  }
}
