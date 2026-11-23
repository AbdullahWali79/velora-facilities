'use client'

import { useEffect } from 'react'

export function LuxuryEffects() {
  useEffect(() => {
    // Spotlight effect exclusively inside cards (no intrusive cursor blobs)
    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const card = target?.closest('.spotlight-card') as HTMLElement | null
      if (card) {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return null
}
