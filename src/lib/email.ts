import nodemailer from 'nodemailer'

export interface EmailResult {
  sent: boolean
  messageId?: string
  error?: string
}

export interface BookingEmailData {
  id: number | string
  customerName: string
  email: string
  phone: string
  serviceTitle: string
  preferredDate: string
  timeSlot: string
  emirate: string
  fullAddress: string
  specialInstructions?: string
}

export interface QuoteEmailData {
  id: number | string
  fullName: string
  email?: string
  phone: string
  serviceTitle?: string
  propertyType: string
  emirate: string
  areaOrCommunity?: string
  approximateSizeSqFt?: number
  preferredDate?: string
  details?: string
}

export interface ContactEmailData {
  id: number | string
  fullName: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface SystemAlertData {
  alertType: string
  details: string
  severity?: 'warning' | 'critical'
  metadata?: Record<string, unknown>
}

/**
 * Sanitize strings used in email headers to prevent Header Injection attacks.
 */
export function sanitizeEmailHeader(value: string): string {
  return value.replace(/[\r\n\t]/g, ' ').trim()
}

/**
 * Strict email address validation regex (RFC 5322 standard compliant).
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  return emailRegex.test(email.trim())
}

/**
 * Department-Based Notification Routing
 * Configurable via environment variables with active Hostinger mailboxes as defaults.
 */
export const DEPARTMENT_EMAILS = {
  bookings: () => process.env.BOOKINGS_NOTIFICATION_EMAIL || 'bookings@veloraelite.ae',
  sales: () => process.env.SALES_NOTIFICATION_EMAIL || 'sales@veloraelite.ae',
  contact: () => process.env.CONTACT_NOTIFICATION_EMAIL || 'info@veloraelite.ae',
  admin: () => process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@veloraelite.ae',
}

/**
 * Check if outbound Hostinger SMTP service is fully configured.
 */
export function isSMTPConfigured(): boolean {
  return Boolean(
    (process.env.SMTP_HOST || 'smtp.hostinger.com') &&
    (process.env.SMTP_USER || 'info@veloraelite.ae') &&
    process.env.SMTP_PASS
  )
}

/**
 * Configure Hostinger SMTP transporter using environment variables.
 * Supports port 465 (SSL/TLS direct) and port 587 (STARTTLS).
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com'
  const user = process.env.SMTP_USER || 'info@veloraelite.ae'
  const pass = process.env.SMTP_PASS
  const port = Number(process.env.SMTP_PORT) || 465
  const isPort465 = port === 465
  const secure = process.env.SMTP_SECURE !== undefined 
    ? process.env.SMTP_SECURE === 'true'
    : isPort465

  if (!pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    },
  })
}

/**
 * Verify SMTP connection & authentication.
 * Useful for diagnostics and testing.
 */
export async function verifySMTPConnection(): Promise<{ success: boolean; message: string }> {
  if (!process.env.SMTP_PASS) {
    return {
      success: false,
      message: 'SMTP_PASS environment variable is not set. SMTP delivery is in simulation mode.',
    }
  }

  const transporter = getTransporter()
  if (!transporter) {
    return {
      success: false,
      message: 'Failed to initialize Nodemailer transporter.',
    }
  }

  try {
    await transporter.verify()
    return {
      success: true,
      message: `Successfully authenticated with Hostinger SMTP (${process.env.SMTP_HOST || 'smtp.hostinger.com'}:465) as ${process.env.SMTP_USER || 'info@veloraelite.ae'}.`,
    }
  } catch (err: unknown) {
    const error = err as Error
    return {
      success: false,
      message: `Hostinger SMTP verification failed: ${error.message}`,
    }
  }
}

const BRAND_NAME = 'Velora Elite Technical Services L.L.C.'
const DEFAULT_SENDER = () =>
  sanitizeEmailHeader(process.env.SMTP_FROM || 'Velora Elite Concierge <info@veloraelite.ae>')

/**
 * Luxury Dark-and-Gold Responsive HTML Email Shell
 */
function renderEmailTemplate({
  previewText,
  headerTitle,
  headerBadge,
  contentHtml,
}: {
  previewText: string
  headerTitle: string
  headerBadge?: string
  contentHtml: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headerTitle}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid rgba(197, 160, 89, 0.25); border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(180deg, #182234 0%, #111827 100%); padding: 36px 32px 24px 32px; text-align: center; border-bottom: 1px solid rgba(197, 160, 89, 0.2); }
    .badge { display: inline-block; padding: 4px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #DFB76C; background: rgba(197, 160, 89, 0.12); border: 1px solid rgba(197, 160, 89, 0.3); border-radius: 9999px; font-weight: 700; margin-bottom: 14px; }
    .title { color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 6px 0; letter-spacing: -0.01em; }
    .subtitle { color: #94a3b8; font-size: 13px; margin: 0; }
    .content { padding: 32px; background-color: #111827; }
    .data-card { background: #0b0f17; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin: 20px 0; }
    .data-row { display: table; width: 100%; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
    .data-label { display: table-cell; width: 38%; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; }
    .data-value { display: table-cell; width: 62%; font-size: 13px; font-weight: 500; color: #ffffff; }
    .highlight { color: #DFB76C; font-weight: 600; }
    .notice-box { background: rgba(197, 160, 89, 0.08); border-left: 3px solid #DFB76C; padding: 14px 16px; border-radius: 4px; margin: 20px 0; }
    .footer { padding: 28px 32px; background-color: #0b0f17; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center; font-size: 11px; color: #64748b; line-height: 1.6; }
    .footer a { color: #DFB76C; text-decoration: none; }
    .cta-btn { display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #DFB76C 0%, #C5A059 100%); color: #0b0f17 !important; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 8px; margin-top: 18px; }
  </style>
</head>
<body>
  <div style="display:none;font-size:1px;color:#333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${previewText}
  </div>
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="24" style="background-color: #05070a;">
    <tr>
      <td align="center">
        <div class="email-container">
          <div class="header">
            ${headerBadge ? `<span class="badge">${headerBadge}</span>` : ''}
            <h1 class="title">${headerTitle}</h1>
            <p class="subtitle">${BRAND_NAME} — Dubai, UAE</p>
          </div>
          <div class="content">
            ${contentHtml}
          </div>
          <div class="footer">
            <p style="margin: 0 0 8px 0; color: #94a3b8; font-weight: 600;">VELORA ELITE TECHNICAL SERVICES L.L.C.</p>
            <p style="margin: 0 0 8px 0;">Office 4301F, Aspin Commercial Tower, Sheikh Zayed Road, Dubai, UAE</p>
            <p style="margin: 0 0 12px 0;">Telephone: +971 4 579 2137 | WhatsApp: +971 55 675 1854</p>
            <p style="margin: 0;"><a href="https://veloraelite.ae">veloraelite.ae</a> &bull; Licensed by Dubai Economy & Tourism</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

/**
 * Convert HTML email to clean formatted plain text for anti-spam multipart delivery.
 */
function stripHtmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<div class="data-row">/gi, '\n')
    .replace(/<div class="data-label">/gi, '• ')
    .replace(/<div class="data-value[^"]*">/gi, ': ')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&bull;/g, '•')
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Generic internal sender with anti-header-injection sanitization, plain-text fallback, and anti-spam protection.
 */
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}): Promise<EmailResult> {
  const cleanTo = sanitizeEmailHeader(to)
  const cleanSubject = sanitizeEmailHeader(subject)

  if (!isValidEmail(cleanTo)) {
    console.warn(`[VELORA EMAIL SERVICE] Blocked dispatch to invalid recipient address: "${cleanTo}"`)
    return {
      sent: false,
      error: 'Invalid recipient email address.',
    }
  }

  const transporter = getTransporter()

  if (!transporter) {
    console.warn(`[VELORA EMAIL SERVICE] SMTP credentials not set (SMTP_PASS missing). Email simulated for: ${cleanTo} (Subject: "${cleanSubject}")`)
    return {
      sent: false,
      error: 'SMTP credentials not configured in environment variables (SMTP_PASS missing). Please set SMTP_PASS on your hosting server.',
    }
  }

  try {
    const plainText = stripHtmlToPlainText(html)
    const replyTo = process.env.SMTP_REPLY_TO || 'info@veloraelite.ae'

    const info = await transporter.sendMail({
      from: DEFAULT_SENDER(),
      to: cleanTo,
      replyTo: sanitizeEmailHeader(replyTo),
      subject: cleanSubject,
      text: plainText,
      html,
      headers: {
        'X-Mailer': 'Velora Elite Concierge Mail Engine',
        'X-Priority': '1 (Highest)',
        'Importance': 'high',
      },
    })

    console.log(`[VELORA EMAIL SERVICE] Outbound email successfully dispatched to ${cleanTo}. MessageId: ${info.messageId}`)
    return {
      sent: true,
      messageId: info.messageId,
    }
  } catch (err: unknown) {
    const error = err as Error
    console.error(`[VELORA EMAIL SERVICE] Outbound delivery failed to ${cleanTo}:`, error.message)
    return {
      sent: false,
      error: error.message,
    }
  }
}

/**
 * 1. Admin Alert: New Booking Request -> bookings@veloraelite.ae
 */
export async function sendAdminBookingNotification(data: BookingEmailData): Promise<EmailResult> {
  const html = renderEmailTemplate({
    previewText: `New Booking #${data.id} from ${data.customerName} for ${data.serviceTitle}`,
    headerBadge: 'New Booking Request',
    headerTitle: `Booking Request #${data.id}`,
    contentHtml: `
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-top: 0;">
        A new client booking request has been submitted through <strong>veloraelite.ae</strong>. This appointment requires manual dispatch confirmation.
      </p>

      <div class="data-card">
        <div class="data-row">
          <div class="data-label">Customer Name</div>
          <div class="data-value highlight">${data.customerName}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Phone / WhatsApp</div>
          <div class="data-value"><a href="tel:${data.phone}" style="color: #DFB76C; text-decoration: none;">${data.phone}</a></div>
        </div>
        <div class="data-row">
          <div class="data-label">Email</div>
          <div class="data-value">${data.email}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Requested Service</div>
          <div class="data-value highlight">${data.serviceTitle}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Preferred Date</div>
          <div class="data-value">${data.preferredDate}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Time Slot</div>
          <div class="data-value">${data.timeSlot}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Emirate</div>
          <div class="data-value">${data.emirate.toUpperCase()}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Full Address</div>
          <div class="data-value">${data.fullAddress}</div>
        </div>
        ${data.specialInstructions ? `
        <div class="data-row" style="border-bottom: none;">
          <div class="data-label">Special Notes</div>
          <div class="data-value">${data.specialInstructions}</div>
        </div>` : ''}
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://veloraelite.ae/admin/collections/booking-requests/${data.id}" class="cta-btn">
          View & Confirm in Admin Panel
        </a>
      </div>
    `,
  })

  const recipient = DEPARTMENT_EMAILS.bookings()
  return sendEmail({
    to: recipient,
    subject: `[New Booking #${data.id}] ${data.customerName} — ${data.serviceTitle}`,
    html,
  })
}

/**
 * 2. Customer Automatic Reply: Booking Acknowledgement
 * Clearly informs client that manual confirmation by phone or WhatsApp is required.
 */
export async function sendCustomerBookingAcknowledgement(data: BookingEmailData): Promise<EmailResult> {
  const html = renderEmailTemplate({
    previewText: `Thank you for choosing Velora Elite. We have received your booking request #${data.id}.`,
    headerBadge: 'Booking Request Received',
    headerTitle: 'We Have Received Your Request',
    contentHtml: `
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-top: 0;">
        Dear <strong>${data.customerName}</strong>,
      </p>
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
        Thank you for choosing <strong>Velora Elite Technical Services</strong>. Your booking request has been successfully registered with reference <strong>#${data.id}</strong>.
      </p>

      <div class="data-card">
        <div class="data-row">
          <div class="data-label">Booking Reference</div>
          <div class="data-value highlight">#${data.id}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Service</div>
          <div class="data-value">${data.serviceTitle}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Preferred Date</div>
          <div class="data-value">${data.preferredDate}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Preferred Window</div>
          <div class="data-value">${data.timeSlot}</div>
        </div>
        <div class="data-row" style="border-bottom: none;">
          <div class="data-label">Location</div>
          <div class="data-value">${data.emirate.toUpperCase()}</div>
        </div>
      </div>

      <div class="notice-box">
        <p style="margin: 0; font-size: 13px; color: #f8fafc; line-height: 1.6;">
          <strong>Manual Confirmation Protocol:</strong> To uphold our luxury standard of service, bookings are not finalized automatically. Our Velora Elite scheduling coordinator will contact you via telephone (<strong>04 579 2137</strong>) or WhatsApp (<strong>+971 55 675 1854</strong>) to confirm the dispatch time, team allocation, and property access details.
        </p>
      </div>

      <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin-bottom: 0;">
        For urgent scheduling changes, reach our client concierge desk directly at <a href="tel:045792137" style="color: #DFB76C;">04 579 2137</a> or reply to this email.
      </p>
    `,
  })

  return sendEmail({
    to: data.email,
    subject: `Booking Request Confirmation #${data.id} — Velora Elite Dubai`,
    html,
  })
}

/**
 * 3. Sales Alert: New Quotation Request -> sales@veloraelite.ae
 */
export async function sendAdminQuoteNotification(data: QuoteEmailData): Promise<EmailResult> {
  const html = renderEmailTemplate({
    previewText: `New Quote Request #${data.id} from ${data.fullName} for ${data.propertyType}`,
    headerBadge: 'New Quotation Lead',
    headerTitle: `Quotation Request #${data.id}`,
    contentHtml: `
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-top: 0;">
        A new custom quotation inquiry has been received through <strong>veloraelite.ae</strong>.
      </p>

      <div class="data-card">
        <div class="data-row">
          <div class="data-label">Client Name</div>
          <div class="data-value highlight">${data.fullName}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Email</div>
          <div class="data-value">${data.email}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Phone</div>
          <div class="data-value"><a href="tel:${data.phone}" style="color: #DFB76C; text-decoration: none;">${data.phone}</a></div>
        </div>
        <div class="data-row">
          <div class="data-label">Property Type</div>
          <div class="data-value highlight">${data.propertyType.toUpperCase()}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Emirate</div>
          <div class="data-value">${data.emirate.toUpperCase()}</div>
        </div>
        ${data.areaOrCommunity ? `
        <div class="data-row">
          <div class="data-label">Community / Area</div>
          <div class="data-value">${data.areaOrCommunity}</div>
        </div>` : ''}
        ${data.approximateSizeSqFt ? `
        <div class="data-row">
          <div class="data-label">Approx Size</div>
          <div class="data-value">${data.approximateSizeSqFt.toLocaleString()} sq.ft.</div>
        </div>` : ''}
        ${data.serviceTitle ? `
        <div class="data-row">
          <div class="data-label">Service</div>
          <div class="data-value">${data.serviceTitle}</div>
        </div>` : ''}
        ${data.details ? `
        <div class="data-row" style="border-bottom: none;">
          <div class="data-label">Scope Notes</div>
          <div class="data-value">${data.details}</div>
        </div>` : ''}
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://veloraelite.ae/admin/collections/quote-requests/${data.id}" class="cta-btn">
          Review & Prepare Proposal
        </a>
      </div>
    `,
  })

  const recipient = DEPARTMENT_EMAILS.sales()
  return sendEmail({
    to: recipient,
    subject: `[New Quote #${data.id}] ${data.fullName} — ${data.propertyType.toUpperCase()} (${data.emirate.toUpperCase()})`,
    html,
  })
}

/**
 * 4. Customer Automatic Reply: Quotation Acknowledgement
 * Does NOT promise an unverified fixed response time.
 */
export async function sendCustomerQuoteAcknowledgement(data: QuoteEmailData): Promise<EmailResult> {
  const html = renderEmailTemplate({
    previewText: `Thank you for your quotation request #${data.id}. Our technical estimators are reviewing your scope.`,
    headerBadge: 'Proposal In Review',
    headerTitle: 'Quotation Request Received',
    contentHtml: `
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-top: 0;">
        Dear <strong>${data.fullName}</strong>,
      </p>
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
        Thank you for requesting an estimate with <strong>Velora Elite Technical Services</strong>. Your quotation request has been assigned reference <strong>#${data.id}</strong>.
      </p>

      <div class="data-card">
        <div class="data-row">
          <div class="data-label">Reference</div>
          <div class="data-value highlight">#${data.id}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Property Type</div>
          <div class="data-value">${data.propertyType.toUpperCase()}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Emirate</div>
          <div class="data-value">${data.emirate.toUpperCase()}</div>
        </div>
        ${data.approximateSizeSqFt ? `
        <div class="data-row" style="border-bottom: none;">
          <div class="data-label">Size</div>
          <div class="data-value">${data.approximateSizeSqFt.toLocaleString()} sq.ft.</div>
        </div>` : ''}
      </div>

      <div class="notice-box">
        <p style="margin: 0; font-size: 13px; color: #f8fafc; line-height: 1.6;">
          <strong>Next Steps:</strong> Our technical estimating team is evaluating your property specifications and surface requirements. An itemized proposal tailored to your property will be delivered to this email address once our review is complete.
        </p>
      </div>

      <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin-bottom: 0;">
        Need to expedite your request or provide architectural drawings? Contact our sales office at <a href="tel:045792137" style="color: #DFB76C;">04 579 2137</a> or WhatsApp <a href="https://wa.me/971556751854" style="color: #DFB76C;">+971 55 675 1854</a>.
      </p>
    `,
  })

  if (!data.email || !isValidEmail(data.email)) {
    return { sent: false, error: 'No valid customer email provided (optional field)' }
  }

  return sendEmail({
    to: data.email,
    subject: `Quotation Request #${data.id} Received — Velora Elite Dubai`,
    html,
  })
}

/**
 * 5. Customer Care Alert: Contact Inquiry -> info@veloraelite.ae
 */
export async function sendAdminContactNotification(data: ContactEmailData): Promise<EmailResult> {
  const html = renderEmailTemplate({
    previewText: `New Contact Inquiry #${data.id} from ${data.fullName}: ${data.subject}`,
    headerBadge: 'Customer Inquiry',
    headerTitle: `New Message: ${data.subject}`,
    contentHtml: `
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-top: 0;">
        A new inquiry has been submitted through the Contact Us page on <strong>veloraelite.ae</strong>.
      </p>

      <div class="data-card">
        <div class="data-row">
          <div class="data-label">Sender</div>
          <div class="data-value highlight">${data.fullName}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Email</div>
          <div class="data-value">${data.email}</div>
        </div>
        ${data.phone ? `
        <div class="data-row">
          <div class="data-label">Phone</div>
          <div class="data-value">${data.phone}</div>
        </div>` : ''}
        <div class="data-row">
          <div class="data-label">Subject</div>
          <div class="data-value">${data.subject}</div>
        </div>
        <div class="data-row" style="border-bottom: none;">
          <div class="data-label">Message</div>
          <div class="data-value" style="white-space: pre-wrap;">${data.message}</div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://veloraelite.ae/admin/collections/contact-messages/${data.id}" class="cta-btn">
          View in Admin Dashboard
        </a>
      </div>
    `,
  })

  const recipient = DEPARTMENT_EMAILS.contact()
  return sendEmail({
    to: recipient,
    subject: `[Inquiry #${data.id}] ${data.subject} — ${data.fullName}`,
    html,
  })
}

/**
 * 6. Customer Automatic Reply: Contact Message Acknowledgement
 */
export async function sendCustomerContactAcknowledgement(data: ContactEmailData): Promise<EmailResult> {
  const html = renderEmailTemplate({
    previewText: `Thank you for contacting Velora Elite. We have received your inquiry #${data.id}.`,
    headerBadge: 'Message Received',
    headerTitle: 'Thank You for Contacting Us',
    contentHtml: `
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-top: 0;">
        Dear <strong>${data.fullName}</strong>,
      </p>
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
        Thank you for contacting <strong>Velora Elite Technical Services</strong>. We have received your inquiry regarding <em>"${data.subject}"</em> (Reference: <strong>#${data.id}</strong>).
      </p>
      <div class="notice-box">
        <p style="margin: 0; font-size: 13px; color: #f8fafc; line-height: 1.6;">
          Our client support desk has logged your request and a dedicated representative will respond to your inquiry promptly.
        </p>
      </div>
      <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin-bottom: 0;">
        You can also visit our corporate office at Office 4301F, Aspin Commercial Tower, Sheikh Zayed Road, Dubai, or call us at <a href="tel:045792137" style="color: #DFB76C;">04 579 2137</a>.
      </p>
    `,
  })

  return sendEmail({
    to: data.email,
    subject: `Thank you for contacting Velora Elite [Ref: #${data.id}]`,
    html,
  })
}

/**
 * 7. Critical System Alerts -> admin@veloraelite.ae
 */
export async function sendSystemAlertNotification(data: SystemAlertData): Promise<EmailResult> {
  const html = renderEmailTemplate({
    previewText: `[SYSTEM ALERT] ${data.alertType}`,
    headerBadge: data.severity === 'critical' ? 'CRITICAL SYSTEM ALERT' : 'SYSTEM NOTIFICATION',
    headerTitle: data.alertType,
    contentHtml: `
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-top: 0;">
        A system alert has been triggered on <strong>veloraelite.ae</strong>.
      </p>
      <div class="data-card">
        <div class="data-row">
          <div class="data-label">Alert Type</div>
          <div class="data-value highlight">${data.alertType}</div>
        </div>
        <div class="data-row">
          <div class="data-label">Timestamp</div>
          <div class="data-value">${new Date().toISOString()}</div>
        </div>
        <div class="data-row" style="border-bottom: none;">
          <div class="data-label">Details</div>
          <div class="data-value" style="white-space: pre-wrap;">${data.details}</div>
        </div>
      </div>
    `,
  })

  const recipient = DEPARTMENT_EMAILS.admin()
  return sendEmail({
    to: recipient,
    subject: `[SYSTEM ALERT] ${data.alertType} — Velora Elite Infrastructure`,
    html,
  })
}
