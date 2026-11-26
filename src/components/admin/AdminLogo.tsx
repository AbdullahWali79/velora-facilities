import React from 'react'

export const AdminLogo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0', textDecoration: 'none' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #D4AF37 0%, #AA8010 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(212, 175, 55, 0.3)',
          fontWeight: 800,
          color: '#0B1B2B',
          fontSize: '20px',
          fontFamily: 'serif',
        }}
      >
        V
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: '#E6C65B',
            fontFamily: 'serif',
            lineHeight: 1.1,
          }}
        >
          VELORA
        </span>
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.28em',
            color: '#CBD5E1',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}
        >
          ELITE FACILITIES
        </span>
      </div>
    </div>
  )
}

export default AdminLogo
