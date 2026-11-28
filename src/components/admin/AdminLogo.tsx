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
        maxHeight: '44px',
        maxWidth: '100%',
        overflow: 'visible',
      }}
      title="Velora Elite Enterprise Portal"
    >
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          lineHeight: 1.15,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#FFFFFF',
            fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, sans-serif',
          }}
          className="admin-brand-title"
        >
          VELORA <span style={{ color: '#C5A059' }}>ELITE</span>
        </span>
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: '#94A3B8',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}
          className="admin-brand-subtitle"
        >
          Business Portal
        </span>
      </div>
    </div>
  )
}

export default AdminLogo
