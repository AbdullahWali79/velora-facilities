import React from 'react'
import Image from 'next/image'

export const AdminIcon: React.FC = () => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '1.5px solid #C5A059',
        boxShadow: '0 2px 6px rgba(197, 160, 89, 0.35)',
        backgroundColor: '#101C29',
        flexShrink: 0,
      }}
      title="Velora Elite Facilities Management"
    >
      <Image
        src="/images/logo.jpg"
        alt="Velora Elite Emblem"
        width={34}
        height={34}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        priority
      />
    </div>
  )
}

export default AdminIcon
