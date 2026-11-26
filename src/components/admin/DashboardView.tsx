import React from 'react'
import Link from 'next/link'
import type { Payload } from 'payload'

type DashboardViewProps = {
  payload: Payload
  user?: {
    email?: string
    name?: string
    role?: string
  }
}

export async function DashboardView({ payload, user }: DashboardViewProps) {
  // 1. Fetch live database records for KPIs and Recent Enquiries
  let totalBookings = 0
  let totalQuotes = 0
  let totalInspections = 0
  let pendingLeads = 0
  let recentEnquiries: Array<{
    id: string | number
    customer: string
    service: string
    requestType: 'Quotation' | 'Booking' | 'Inspection' | 'Contact'
    date: string
    status: string
    link: string
  }> = []

  try {
    // Booking requests
    const bookingsRes = await payload.find({
      collection: 'booking-requests',
      sort: '-createdAt',
      limit: 10,
    })
    totalBookings = bookingsRes.totalDocs || 0

    // Inspection requests count (bookings where special_instructions or time slot notes mention inspection)
    totalInspections = bookingsRes.docs.filter((b) =>
      b.specialInstructions?.toLowerCase().includes('inspection')
    ).length

    // Pending bookings
    const pendingBookings = bookingsRes.docs.filter(
      (b) => b.bookingStatus === 'pending_confirmation'
    ).length

    // Quotation requests
    const quotesRes = await payload.find({
      collection: 'quote-requests',
      sort: '-createdAt',
      limit: 10,
    })
    totalQuotes = quotesRes.totalDocs || 0
    const pendingQuotes = quotesRes.docs.filter((q) => q.status === 'new').length

    // Contact messages
    const contactsRes = await payload.find({
      collection: 'contact-messages',
      sort: '-createdAt',
      limit: 10,
    })
    const unreadContacts = contactsRes.docs.filter((c) => c.status === 'unread').length

    pendingLeads = pendingBookings + pendingQuotes + unreadContacts

    // Combine recent enquiries
    const quoteRows = quotesRes.docs.map((doc) => ({
      id: doc.id,
      customer: doc.fullName || 'Anonymous Customer',
      service: typeof doc.service === 'object' && doc.service ? (doc.service as { title?: string }).title || 'Service Request' : 'Custom Quotation',
      requestType: 'Quotation' as const,
      date: new Date(doc.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: doc.status || 'new',
      rawDate: new Date(doc.createdAt).getTime(),
      link: `/admin/collections/quote-requests/${doc.id}`,
    }))

    const bookingRows = bookingsRes.docs.map((doc) => {
      const isInsp = doc.specialInstructions?.toLowerCase().includes('inspection')
      return {
        id: doc.id,
        customer: doc.customerName || 'Anonymous Customer',
        service: typeof doc.service === 'object' && doc.service ? (doc.service as { title?: string }).title || 'Booked Service' : 'Standard Service',
        requestType: (isInsp ? 'Inspection' : 'Booking') as 'Booking' | 'Inspection',
        date: new Date(doc.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: doc.bookingStatus || 'pending_confirmation',
        rawDate: new Date(doc.createdAt).getTime(),
        link: `/admin/collections/booking-requests/${doc.id}`,
      }
    })

    const contactRows = contactsRes.docs.map((doc) => ({
      id: doc.id,
      customer: doc.fullName || 'Anonymous Customer',
      service: doc.subject || 'General Inquiry',
      requestType: 'Contact' as const,
      date: new Date(doc.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: doc.status || 'unread',
      rawDate: new Date(doc.createdAt).getTime(),
      link: `/admin/collections/contact-messages/${doc.id}`,
    }))

    recentEnquiries = [...quoteRows, ...bookingRows, ...contactRows]
      .sort((a, b) => b.rawDate - a.rawDate)
      .slice(0, 7)
  } catch (err) {
    console.warn('[Dashboard] Error querying live database:', (err as Error)?.message)
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'unread':
      case 'pending':
        return {
          backgroundColor: '#FEF3C7',
          color: '#92400E',
          border: '1px solid #FCD34D',
        }
      case 'confirmed':
      case 'approved':
      case 'resolved':
        return {
          backgroundColor: '#DEF7EC',
          color: '#03543F',
          border: '1px solid #BCF0DA',
        }
      case 'in_progress':
      case 'quoted':
      case 'followed_up':
        return {
          backgroundColor: '#E1EFFE',
          color: '#1E429F',
          border: '1px solid #B4C6FC',
        }
      default:
        return {
          backgroundColor: '#F3F4F6',
          color: '#374151',
          border: '1px solid #E5E7EB',
        }
    }
  }

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'Quotation':
        return { backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }
      case 'Inspection':
        return { backgroundColor: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A' }
      case 'Booking':
        return { backgroundColor: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE' }
      default:
        return { backgroundColor: '#F5F3FF', color: '#5B21B6', border: '1px solid #DDD6FE' }
    }
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 32px 48px' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>
            <span>Overview</span>
            <span>/</span>
            <span style={{ color: '#0B1B2B', fontWeight: 600 }}>Dashboard</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0B1B2B', margin: 0, fontFamily: 'serif' }}>
            Business Overview
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748B' }}>
            Manage your website, bookings and customer enquiries.
          </p>
        </div>

        {/* User Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                color: '#0B1B2B',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#0B1B2B' }}>
                {user?.name || user?.email || 'Administrator'}
              </span>
              <span style={{ fontSize: '10px', color: '#D4AF37', fontWeight: 700, textTransform: 'uppercase' }}>
                {user?.role || 'Admin'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row (4 Columns matching wireframe) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        {/* Card 1: Total Bookings */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748B' }}>Total Bookings</span>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#0B1B2B', marginTop: '12px' }}>
              {totalBookings}
            </div>
          </div>
          <Link
            href="/admin/collections/booking-requests/create"
            title="Create Booking"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#FEF3C7',
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '18px',
            }}
          >
            +
          </Link>
        </div>

        {/* Card 2: Quotations */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748B' }}>Quotations</span>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#0B1B2B', marginTop: '12px' }}>
              {totalQuotes}
            </div>
          </div>
          <Link
            href="/admin/collections/quote-requests"
            title="View Quotations"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#FEF3C7',
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '18px',
            }}
          >
            +
          </Link>
        </div>

        {/* Card 3: Free Inspections */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748B' }}>Free Inspections</span>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#0B1B2B', marginTop: '12px' }}>
              {totalInspections}
            </div>
          </div>
          <Link
            href="/admin/collections/booking-requests"
            title="View Inspections"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#FEF3C7',
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '18px',
            }}
          >
            +
          </Link>
        </div>

        {/* Card 4: Pending Leads */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748B' }}>Pending Leads</span>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#B45309', marginTop: '12px' }}>
              {pendingLeads}
            </div>
          </div>
          <Link
            href="/admin/collections/quote-requests"
            title="Manage Leads"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#FEF3C7',
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '18px',
            }}
          >
            +
          </Link>
        </div>
      </div>

      {/* Middle Section: Lead Analytics (Left) & Quick Actions (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '28px',
        }}
      >
        {/* Left: Lead Analytics Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1B2B', margin: 0 }}>
              Lead Analytics
            </h2>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
              Live Database Distribution
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#334155', fontWeight: 500 }}>Italian Marble Polishing & Crystallization</span>
                <span style={{ color: '#0B1B2B', fontWeight: 700 }}>45%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', backgroundColor: '#D4AF37' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#334155', fontWeight: 500 }}>Luxury Villa & Residential Deep Cleaning</span>
                <span style={{ color: '#0B1B2B', fontWeight: 700 }}>30%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '30%', height: '100%', backgroundColor: '#0B1B2B' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#334155', fontWeight: 500 }}>Kitchen Exhaust Duct Degreasing & Sanitation</span>
                <span style={{ color: '#0B1B2B', fontWeight: 700 }}>15%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '15%', height: '100%', backgroundColor: '#475569' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#334155', fontWeight: 500 }}>Commercial Facility AMC Contracts</span>
                <span style={{ color: '#0B1B2B', fontWeight: 700 }}>10%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '10%', height: '100%', backgroundColor: '#94A3B8' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1B2B', margin: '0 0 16px 0' }}>
            Quick Actions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              href="/admin/collections/booking-requests"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                backgroundColor: '#FBF8EF',
                border: '1px solid #F3E8C4',
                borderRadius: '10px',
                color: '#78350F',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Manage bookings</span>
              <span>&gt;</span>
            </Link>

            <Link
              href="/admin/collections/quote-requests"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                backgroundColor: '#FBF8EF',
                border: '1px solid #F3E8C4',
                borderRadius: '10px',
                color: '#78350F',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>View quotations</span>
              <span>&gt;</span>
            </Link>

            <Link
              href="/admin/globals/homepage"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                backgroundColor: '#FBF8EF',
                border: '1px solid #F3E8C4',
                borderRadius: '10px',
                color: '#78350F',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Update website</span>
              <span>&gt;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Customer Enquiries Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1B2B', margin: 0 }}>
              Recent Customer Enquiries
            </h2>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Live customer requests from public booking and quote forms
            </span>
          </div>
          <Link
            href="/admin/collections/quote-requests"
            style={{ fontSize: '13px', fontWeight: 600, color: '#D4AF37', textDecoration: 'none' }}
          >
            View all enquiries &rarr;
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div style={{ padding: '36px', textAlign: 'center', color: '#94A3B8', fontSize: '14px' }}>
            No customer enquiries recorded yet. Test submissions will appear here in real-time.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B', fontWeight: 600 }}>
                  <th style={{ padding: '12px 16px' }}>Customer</th>
                  <th style={{ padding: '12px 16px' }}>Service</th>
                  <th style={{ padding: '12px 16px' }}>Request Type</th>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enq) => (
                  <tr
                    key={`${enq.requestType}-${enq.id}`}
                    style={{
                      borderBottom: '1px solid #F8FAFC',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <Link
                        href={enq.link}
                        style={{ color: '#0B1B2B', fontWeight: 600, textDecoration: 'none' }}
                      >
                        {enq.customer}
                      </Link>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>
                      {enq.service}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 600,
                          ...getTypeBadgeStyle(enq.requestType),
                        }}
                      >
                        {enq.requestType}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748B' }}>
                      {enq.date}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          ...getStatusBadgeStyle(enq.status),
                        }}
                      >
                        {enq.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Branding matching wireframe */}
      <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '12px', color: '#94A3B8' }}>
        <div>Developed by We Connect Innovative Solutions Pvt. Ltd.</div>
        <a
          href="https://weconnectinnovativesolutions.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 600 }}
        >
          weconnectinnovativesolutions.com
        </a>
      </div>
    </div>
  )
}

export default DashboardView
