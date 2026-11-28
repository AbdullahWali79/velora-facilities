'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export const AdminHeaderActions: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Ensure sidebar in collapsed mode remains interactive without browser inert blocking
  useEffect(() => {
    const handleInert = () => {
      if (typeof window !== 'undefined' && window.innerWidth > 1024) {
        const aside = document.querySelector('aside.nav')
        if (aside && aside.hasAttribute('inert')) {
          aside.removeAttribute('inert')
        }
      }
    }
    handleInert()
    const aside = document.querySelector('aside.nav')
    const observer = new MutationObserver(handleInert)
    if (aside) {
      observer.observe(aside, { attributes: true, attributeFilter: ['inert'] })
    }
    const interval = setInterval(handleInert, 500)
    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        paddingRight: '8px',
        position: 'relative',
        zIndex: 100,
      }}
    >
      {/* 1. View Live Website Pill */}
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '8px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          color: '#101C29',
          fontSize: '12px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'all 0.15s ease',
        }}
        title="Open public website in new tab"
      >
        <span>View Website</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#C5A059' }}
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </Link>

      {/* 2. Live System Status Indicator */}
      <div
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          borderRadius: '8px',
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
          color: '#166534',
          fontSize: '11px',
          fontWeight: 600,
        }}
        className="admin-system-status"
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#16A34A',
          }}
        />
        <span>System Live</span>
      </div>

      {/* 3. Administrator Profile Pill & Dropdown */}
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 10px 4px 4px',
            borderRadius: '9999px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          {/* Avatar Initials Badge */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #101C29 0%, #1E2D42 100%)',
              border: '1.5px solid #C5A059',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C5A059',
              fontWeight: 800,
              fontSize: '13px',
              letterSpacing: '0.05em',
            }}
          >
            VE
          </div>

          {/* User Details */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              lineHeight: 1.15,
            }}
          >
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#101C29',
              }}
            >
              Administrator
            </span>
            <span
              style={{
                fontSize: '9.5px',
                fontWeight: 700,
                color: '#C5A059',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Super Admin
            </span>
          </div>

          {/* Dropdown Chevron */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              color: '#64748B',
              transform: dropdownOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Dropdown Menu Modal */}
        {dropdownOpen && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              width: '240px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 10px 25px -5px rgba(16, 28, 41, 0.12), 0 8px 10px -6px rgba(16, 28, 41, 0.08)',
              overflow: 'hidden',
              zIndex: 9999,
              padding: '6px',
            }}
          >
            {/* Header info */}
            <div
              style={{
                padding: '10px 12px 10px',
                borderBottom: '1px solid #F1F5F9',
                marginBottom: '4px',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#101C29' }}>
                Velora Elite Concierge
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>
                Dubai Executive Operations
              </div>
            </div>

            {/* Menu Links */}
            <Link
              href="/admin/account"
              onClick={() => setDropdownOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12.5px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>My Profile & Account</span>
            </Link>

            <Link
              href="/admin/collections/users"
              onClick={() => setDropdownOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12.5px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>User Management</span>
            </Link>

            <Link
              href="/admin/globals/site-settings"
              onClick={() => setDropdownOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12.5px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Business Settings</span>
            </Link>

            <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '4px 0' }} />

            <Link
              href="/admin/logout"
              onClick={() => setDropdownOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12.5px',
                color: '#DC2626',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Sign Out</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminHeaderActions
