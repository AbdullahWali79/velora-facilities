import React from 'react'
import Image from 'next/image'

export const AdminLogo: React.FC = () => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        padding: '4px 0',
        textDecoration: 'none',
        lineHeight: 1,
      }}
      title="Velora Elite Enterprise Portal"
    >
      {/* Luxury Circular Emblem */}
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1.5px solid #C5A059',
          boxShadow: '0 2px 8px rgba(197, 160, 89, 0.4)',
          backgroundColor: '#101C29',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src="/images/logo.jpg"
          alt="Velora Elite Logo"
          width={38}
          height={38}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          priority
        />
      </div>

      {/* Brand Identity & Portal Details */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2px',
          whiteSpace: 'nowrap',
        }}
        className="velora-brand-text-block"
      >
        <div
          style={{
            fontSize: '16px',
            fontWeight: 800,
            letterSpacing: '0.07em',
            color: '#101C29',
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            lineHeight: 1.1,
          }}
          className="admin-brand-title"
        >
          <span>VELORA</span>
          <span style={{ color: '#C5A059' }}>ELITE</span>
        </div>
        <div
          style={{
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#64748B',
            textTransform: 'uppercase',
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
            lineHeight: 1,
          }}
          className="admin-brand-subtitle"
        >
          Business Management Portal
        </div>
      </div>
    </div>
  )
}

export default AdminLogo
