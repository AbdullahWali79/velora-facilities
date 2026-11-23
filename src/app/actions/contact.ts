'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  sendAdminContactNotification,
  sendCustomerContactAcknowledgement,
} from '@/lib/email'

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
    const fullName = formData.get('fullName')?.toString().trim().replace(/<[^>]*>?/gm, '') || ''
    const email = formData.get('email')?.toString().trim().toLowerCase() || ''
    const phone = formData.get('phone')?.toString().trim() || ''
    const subject = formData.get('subject')?.toString().trim().replace(/<[^>]*>?/gm, '') || ''
    const message = formData.get('message')?.toString().trim().replace(/<[^>]*>?/gm, '') || ''

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
      errors.subject = 'Please enter a message subject (minimum 3 characters).'
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

    const cleanPhone = phone ? phone.replace(/[^0-9+]/g, '') : undefined

    // 5. Connect to Payload CMS Local API
    const payload = await getPayload({ config: configPromise })

    // 6. Duplicate Submission Protection (check identical message/email in last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const recentDuplicate = await payload.find({
      collection: 'contact-messages',
      where: {
        and: [
          { email: { equals: email } },
          { subject: { equals: subject } },
          { createdAt: { greater_than_equal: fiveMinutesAgo } },
        ],
      },
      limit: 1,
    })

    if (recentDuplicate.docs.length > 0) {
      const existing = recentDuplicate.docs[0]
      return {
        success: true,
        message: 'We have already received your message! Our client care desk is reviewing it and will respond promptly.',
        referenceId: existing.id,
      }
    }

    // 7. Save message into Supabase PostgreSQL via Payload CMS
    const created = await payload.create({
      collection: 'contact-messages',
      data: {
        fullName,
        email,
        phone: cleanPhone,
        subject,
        message,
        status: 'unread',
      },
    })

    console.log(`[VELORA CMS NOTIFICATION] New Contact Message #${created.id} from ${fullName} (${email}): ${subject}`)

    // 8. Dispatch notification emails (Admin alert + Customer acknowledgement)
    const emailPayload = {
      id: created.id,
      fullName,
      email,
      phone: cleanPhone,
      subject,
      message,
    }

    try {
      const emailResults = await Promise.allSettled([
        sendAdminContactNotification(emailPayload),
        sendCustomerContactAcknowledgement(emailPayload),
      ])
      emailResults.forEach((res, idx) => {
        const target = idx === 0 ? 'Admin' : 'Customer'
        if (res.status === 'fulfilled' && res.value.sent) {
          console.log(`[EMAIL DISPATCH] ${target} contact notification sent successfully for #${created.id}`)
        } else {
          console.log(`[EMAIL DISPATCH] ${target} contact email not sent or simulated. Reason:`, res.status === 'fulfilled' ? res.value.error : res.reason)
        }
      })
    } catch (emailErr: unknown) {
      console.warn('[EMAIL DISPATCH] Error during contact email dispatch:', (emailErr as Error).message)
    }

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
      message: 'Failed to send message. Please contact us via phone (04 579 2137) or WhatsApp (+971 55 675 1854).',
    }
  }
}
