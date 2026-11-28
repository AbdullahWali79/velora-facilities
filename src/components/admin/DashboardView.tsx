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
  // 1. Fetch live database records for KPIs and Analytics
  let totalBookings = 0
  let totalQuotes = 0
  let totalInspections = 0
  let pendingLeads = 0
  let confirmedAppointments = 0
  let completedRequests = 0

  let recentEnquiries: Array<{
    id: string | number
    customer: string
    contactInfo: string
    service: string
    requestType: 'Quotation' | 'Booking' | 'Inspection' | 'Enquiry'
    date: string
    status: string
    rawDate: number
    link: string
  }> = []

  // Dynamic Service Distribution Map
  const serviceDistributionMap: Record<string, number> = {}

  try {
    // 1. Fetch Bookings (limit: 100 for comprehensive calculation)
    const bookingsRes = await payload.find({
      collection: 'booking-requests',
      sort: '-createdAt',
      limit: 100,
    })
    totalBookings = bookingsRes.totalDocs || 0

    // Fetch Services catalog to map IDs to titles if needed
    const servicesCatalog = await payload.find({
      collection: 'services',
      limit: 30,
    })
    const serviceTitleById: Record<string | number, string> = {}
    servicesCatalog.docs.forEach((s) => {
      serviceTitleById[s.id] = s.title
    })

    // Process Bookings
    bookingsRes.docs.forEach((b) => {
      // Inspection detector
      const isInsp =
        b.specialInstructions?.toLowerCase().includes('inspection') ||
        (typeof b.service === 'object' &&
          b.service &&
          (b.service as { title?: string }).title?.toLowerCase().includes('inspection'))

      if (isInsp) {
        totalInspections++
      }

      // Status counters
      if (b.bookingStatus === 'pending_confirmation') {
        pendingLeads++
      } else if (b.bookingStatus === 'confirmed') {
        confirmedAppointments++
      } else if (b.bookingStatus === 'completed') {
        completedRequests++
      }

      // Service distribution
      let svcTitle = 'Luxury Cleaning Service'
      if (typeof b.service === 'object' && b.service && (b.service as { title?: string }).title) {
        svcTitle = (b.service as { title?: string }).title!
      } else if (typeof b.service === 'number' || typeof b.service === 'string') {
        svcTitle = serviceTitleById[b.service] || `Service #${b.service}`
      }
      serviceDistributionMap[svcTitle] = (serviceDistributionMap[svcTitle] || 0) + 1
    })

    // 2. Fetch Quotations (limit: 100)
    const quotesRes = await payload.find({
      collection: 'quote-requests',
      sort: '-createdAt',
      limit: 100,
    })
    totalQuotes = quotesRes.totalDocs || 0

    quotesRes.docs.forEach((q) => {
      if (q.status === 'new') {
        pendingLeads++
      } else if (q.status === 'accepted') {
        confirmedAppointments++
      }

      let svcTitle = 'Custom Quotation Scope'
      if (typeof q.service === 'object' && q.service && (q.service as { title?: string }).title) {
        svcTitle = (q.service as { title?: string }).title!
      } else if (typeof q.service === 'number' || typeof q.service === 'string') {
        svcTitle = serviceTitleById[q.service] || `Service #${q.service}`
      } else if (q.propertyType) {
        svcTitle = `${q.propertyType.toUpperCase()} Technical Quote`
      }
      serviceDistributionMap[svcTitle] = (serviceDistributionMap[svcTitle] || 0) + 1
    })

    // 3. Fetch Contact Messages (limit: 50)
    const contactsRes = await payload.find({
      collection: 'contact-messages',
      sort: '-createdAt',
      limit: 50,
    })
    contactsRes.docs.forEach((c) => {
      if (c.status === 'unread') {
        pendingLeads++
      } else if (c.status === 'resolved') {
        completedRequests++
      }
    })

    // 4. Transform Recent Enquiries Table
    const quoteRows = quotesRes.docs.slice(0, 5).map((doc) => ({
      id: doc.id,
      customer: doc.fullName || 'Anonymous Customer',
      contactInfo: doc.phone || doc.email || '—',
      service:
        typeof doc.service === 'object' && doc.service
          ? (doc.service as { title?: string }).title || 'Quotation Request'
          : doc.propertyType ? `${doc.propertyType.toUpperCase()} Scope` : 'Tailored Estimate',
      requestType: 'Quotation' as const,
      date: new Date(doc.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: doc.status || 'new',
      rawDate: new Date(doc.createdAt).getTime(),
      link: `/admin/collections/quote-requests/${doc.id}`,
    }))

    const bookingRows = bookingsRes.docs.slice(0, 5).map((doc) => {
      const isInsp = doc.specialInstructions?.toLowerCase().includes('inspection')
      return {
        id: doc.id,
        customer: doc.customerName || 'Anonymous Customer',
        contactInfo: doc.phone || doc.email || '—',
        service:
          typeof doc.service === 'object' && doc.service
            ? (doc.service as { title?: string }).title || 'Specialized Service'
            : typeof doc.service === 'number'
            ? serviceTitleById[doc.service] || `Service #${doc.service}`
            : 'Specialized Service',
        requestType: (isInsp ? 'Inspection' : 'Booking') as 'Booking' | 'Inspection',
        date: new Date(doc.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        status: doc.bookingStatus || 'pending_confirmation',
        rawDate: new Date(doc.createdAt).getTime(),
        link: `/admin/collections/booking-requests/${doc.id}`,
      }
    })

    const contactRows = contactsRes.docs.slice(0, 5).map((doc) => ({
      id: doc.id,
      customer: doc.fullName || 'Anonymous Customer',
      contactInfo: doc.email || doc.phone || '—',
      service: doc.subject || 'Customer Enquiry',
      requestType: 'Enquiry' as const,
      date: new Date(doc.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: doc.status || 'unread',
      rawDate: new Date(doc.createdAt).getTime(),
      link: `/admin/collections/contact-messages/${doc.id}`,
    }))

    recentEnquiries = [...bookingRows, ...quoteRows, ...contactRows]
      .sort((a, b) => b.rawDate - a.rawDate)
      .slice(0, 6)
  } catch (err) {
    console.warn('[Dashboard] Error querying live database:', (err as Error)?.message)
  }

  // Calculate live database service percentages
  const totalInquiries = totalBookings + totalQuotes
  const serviceDistribution = Object.entries(serviceDistributionMap)
    .map(([title, count]) => ({
      title,
      count,
      percentage: totalInquiries > 0 ? Math.round((count / totalInquiries) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)

  // Status badge styling helper
  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'unread':
      case 'pending':
      case 'pending_confirmation':
        return {
          backgroundColor: '#FEF3C7',
          color: '#92400E',
          border: '1px solid #FCD34D',
        }
      case 'confirmed':
      case 'approved':
      case 'won':
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
          backgroundColor: '#E0E7FF',
          color: '#3730A3',
          border: '1px solid #C7D2FE',
        }
      case 'completed':
        return {
          backgroundColor: '#ECFDF5',
          color: '#065F46',
          border: '1px solid #A7F3D0',
        }
      default:
        return {
          backgroundColor: '#F1F5F9',
          color: '#475569',
          border: '1px solid #E2E8F0',
        }
    }
  }

  // Request Type styling helper
  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'Booking':
        return { backgroundColor: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE' }
      case 'Inspection':
        return { backgroundColor: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A' }
      case 'Quotation':
        return { backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }
      default:
        return { backgroundColor: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0' }
    }
  }

  // Format today's date in Dubai
  const todayDubai = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dubai',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '24px 32px 64px',
        fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. EXECUTIVE DASHBOARD HEADER */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          paddingBottom: '20px',
          marginBottom: '24px',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12.5px',
              color: '#64748B',
              marginBottom: '4px',
            }}
          >
            <span>Workspace</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ color: '#101C29', fontWeight: 600 }}>Business Overview</span>
          </div>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#101C29',
              margin: '0 0 4px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Business Operations Overview
          </h1>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#64748B' }}>
            {user?.name ? `${user.name} | ` : ''}Real-time operations management for bookings, quotations, and inspections across Dubai.
          </p>
        </div>

        {/* Header Right Actions & Timestamp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '12.5px',
              color: '#475569',
              boxShadow: '0 1px 2px rgba(16, 28, 41, 0.04)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ fontWeight: 600, color: '#101C29' }}>{todayDubai}</span>
            <span style={{ color: '#94A3B8', fontSize: '11px' }}>(Dubai, UTC+4)</span>
          </div>

          <Link
            href="/admin/collections/booking-requests/create"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #C5A059 0%, #AA8010 100%)',
              color: '#101C29',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(197, 160, 89, 0.3)',
              transition: 'all 0.15s ease',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>New Booking</span>
          </Link>
        </div>
      </div>

      {/* 2. KPI METRIC CARDS GRID (4 Specialized Business Cards) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
            boxShadow: '0 2px 4px rgba(16, 28, 41, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Bookings
              </span>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#101C29', marginTop: '10px', lineHeight: 1 }}>
                {totalBookings}
              </div>
            </div>
            {/* Business Icon: Calendar Schedule */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#1D4ED8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="9 14 11 16 15 12" />
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              {confirmedAppointments} confirmed &middot; {completedRequests} completed
            </span>
            <Link
              href="/admin/collections/booking-requests"
              style={{ fontSize: '12px', fontWeight: 700, color: '#C5A059', textDecoration: 'none' }}
            >
              View Bookings &rarr;
            </Link>
          </div>
        </div>

        {/* Card 2: Total Quotations */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(16, 28, 41, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Quotations
              </span>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#101C29', marginTop: '10px', lineHeight: 1 }}>
                {totalQuotes}
              </div>
            </div>
            {/* Business Icon: Document Estimate */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                color: '#15803D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>Commercial & Residential scope</span>
            <Link
              href="/admin/collections/quote-requests"
              style={{ fontSize: '12px', fontWeight: 700, color: '#C5A059', textDecoration: 'none' }}
            >
              View Quotes &rarr;
            </Link>
          </div>
        </div>

        {/* Card 3: Free Inspections */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(16, 28, 41, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Free Inspections
              </span>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#101C29', marginTop: '10px', lineHeight: 1 }}>
                {totalInspections}
              </div>
            </div>
            {/* Business Icon: Inspection Magnifier / Shield */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FDE68A',
                color: '#B45309',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <path d="m11 8 1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>0 AED on-site assessment</span>
            <Link
              href="/admin/collections/booking-requests"
              style={{ fontSize: '12px', fontWeight: 700, color: '#C5A059', textDecoration: 'none' }}
            >
              Filter Leads &rarr;
            </Link>
          </div>
        </div>

        {/* Card 4: Pending Leads */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(16, 28, 41, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Pending Leads
              </span>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 800,
                  color: pendingLeads > 0 ? '#B45309' : '#101C29',
                  marginTop: '10px',
                  lineHeight: 1,
                }}
              >
                {pendingLeads}
              </div>
            </div>
            {/* Business Icon: Alert Bell */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: pendingLeads > 0 ? '#FFFBEB' : '#F1F5F9',
                border: pendingLeads > 0 ? '1px solid #FCD34D' : '1px solid #E2E8F0',
                color: pendingLeads > 0 ? '#D97706' : '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: pendingLeads > 0 ? '#B45309' : '#64748B', fontWeight: pendingLeads > 0 ? 600 : 400 }}>
              {pendingLeads > 0 ? 'Action required by coordinator' : 'All leads reviewed'}
            </span>
            <Link
              href="/admin/collections/quote-requests"
              style={{ fontSize: '12px', fontWeight: 700, color: '#C5A059', textDecoration: 'none' }}
            >
              Take Action &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE SECTION: Real Database Analytics & Quick Operations */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: '24px',
          marginBottom: '28px',
        }}
      >
        {/* Left Column: Live Service Demand Analytics */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px 28px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(16, 28, 41, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#101C29', margin: 0 }}>
                Service Demand Distribution
              </h2>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748B' }}>
                Calculated directly from customer booking & quotation records
              </p>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#166534',
                backgroundColor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                padding: '3px 10px',
                borderRadius: '9999px',
              }}
            >
              Live Database
            </span>
          </div>

          {serviceDistribution.length === 0 ? (
            <div style={{ padding: '32px 0', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
              No service inquiry data available yet. Submissions from the website forms will populate distribution bars in real time.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {serviceDistribution.map((item, idx) => {
                const barColors = ['#C5A059', '#101C29', '#3B82F6', '#10B981']
                const color = barColors[idx % barColors.length]
                return (
                  <div key={item.title}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginBottom: '6px' }}>
                      <span style={{ color: '#334155', fontWeight: 600 }}>{item.title}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#64748B', fontSize: '12px' }}>{item.count} {item.count === 1 ? 'request' : 'requests'}</span>
                        <span style={{ color: '#101C29', fontWeight: 700 }}>{item.percentage}%</span>
                      </div>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${Math.max(item.percentage, 4)}%`,
                          height: '100%',
                          backgroundColor: color,
                          borderRadius: '4px',
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right Column: Quick Operations Desk */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px 28px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(16, 28, 41, 0.03)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#101C29', margin: '0 0 4px 0' }}>
            Quick Operations
          </h2>
          <p style={{ margin: '0 0 18px 0', fontSize: '12px', color: '#64748B' }}>
            Direct actions for scheduling coordinators
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              href="/admin/collections/booking-requests"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                color: '#101C29',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#C5A059' }}>●</span>
                <span>Dispatch & Bookings</span>
              </div>
              <span style={{ color: '#94A3B8', fontSize: '14px' }}>&rarr;</span>
            </Link>

            <Link
              href="/admin/collections/quote-requests"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                color: '#101C29',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#C5A059' }}>●</span>
                <span>Proposals & Quotations</span>
              </div>
              <span style={{ color: '#94A3B8', fontSize: '14px' }}>&rarr;</span>
            </Link>

            <Link
              href="/admin/collections/services"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                color: '#101C29',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#C5A059' }}>●</span>
                <span>Services Portfolio</span>
              </div>
              <span style={{ color: '#94A3B8', fontSize: '14px' }}>&rarr;</span>
            </Link>

            <Link
              href="/admin/globals/homepage"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                color: '#101C29',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#C5A059' }}>●</span>
                <span>Homepage CMS</span>
              </div>
              <span style={{ color: '#94A3B8', fontSize: '14px' }}>&rarr;</span>
            </Link>

            <Link
              href="/admin/globals/site-settings"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                color: '#101C29',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#C5A059' }}>●</span>
                <span>Business Settings</span>
              </div>
              <span style={{ color: '#94A3B8', fontSize: '14px' }}>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. RECENT CUSTOMER ENQUIRIES & DISPATCH QUEUE */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px 28px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 4px rgba(16, 28, 41, 0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#101C29', margin: 0 }}>
              Recent Customer Inquiries & Dispatch Queue
            </h2>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748B' }}>
              Live customer submissions from veloraelite.ae booking, quote, and contact forms
            </p>
          </div>
          <Link
            href="/admin/collections/booking-requests"
            style={{ fontSize: '13px', fontWeight: 700, color: '#C5A059', textDecoration: 'none' }}
          >
            View all inquiries &rarr;
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8', fontSize: '13.5px' }}>
            No client submissions recorded yet. Live customer requests will appear in this dispatch queue in real time.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #F1F5F9', color: '#64748B', fontWeight: 700 }}>
                  <th style={{ padding: '12px 16px' }}>Customer Name</th>
                  <th style={{ padding: '12px 16px' }}>Contact</th>
                  <th style={{ padding: '12px 16px' }}>Requested Scope</th>
                  <th style={{ padding: '12px 16px' }}>Category</th>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
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
                        style={{ color: '#101C29', fontWeight: 700, textDecoration: 'none' }}
                      >
                        {enq.customer}
                      </Link>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748B' }}>
                      {enq.contactInfo}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 500 }}>
                      {enq.service}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          ...getTypeBadgeStyle(enq.requestType),
                        }}
                      >
                        {enq.requestType}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748B', fontSize: '12.5px' }}>
                      {enq.date}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'capitalize',
                          ...getStatusBadgeStyle(enq.status),
                        }}
                      >
                        {enq.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <Link
                        href={enq.link}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          color: '#101C29',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        <span>Open</span>
                        <span>&rarr;</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. FOOTER ENTERPRISE BRANDING */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid #E2E8F0',
          fontSize: '12px',
          color: '#94A3B8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#10B981' }}>●</span>
          <span>Velora Elite Technical Services L.L.C. &bull; Enterprise Operations Hub</span>
        </div>
        <div>
          Office 4301F, Aspin Commercial Tower, Sheikh Zayed Road, Dubai, UAE
        </div>
      </div>
    </div>
  )
}

export default DashboardView
