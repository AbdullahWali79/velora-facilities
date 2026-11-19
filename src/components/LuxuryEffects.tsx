'use client'

import React, { useEffect, useRef, useState } from 'react'

export function LuxuryEffects() {
  const [enabled, setEnabled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const haloRef = useRef<HTMLDivElement>(null)
  const ambientGlowRef = useRef<HTMLDivElement>(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const curPos = useRef({ x: -100, y: -100 })
  const isVisible = useRef(false)

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    setEnabled(true)

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      isVisible.current = true

      // Spotlight effect for cards
      const target = e.target as HTMLElement | null
      const card = target?.closest('.spotlight-card') as HTMLElement | null
      if (card) {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      }

      // Detect hover over interactive elements (links, buttons, inputs)
      const isInteractive = target?.closest('a, button, [role="button"], input, select, textarea, .interactive-gold')
      setHovered(Boolean(isInteractive))
    }

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)
    const onMouseLeave = () => {
      isVisible.current = false
    }
    const onMouseEnter = () => {
      isVisible.current = true
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Smooth spring animation loop
    let animId: number
    const loop = () => {
      // Responsive lerp (0.28 for tight, smooth, non-laggy tracking)
      const dx = mousePos.current.x - curPos.current.x
      const dy = mousePos.current.y - curPos.current.y
      curPos.current.x += dx * 0.28
      curPos.current.y += dy * 0.28

      const x = curPos.current.x
      const y = curPos.current.y

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
        haloRef.current.style.opacity = isVisible.current ? '1' : '0'
      }

      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
        ambientGlowRef.current.style.opacity = isVisible.current ? '1' : '0'
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Soft Ambient Warm Gold Glow Underneath */}
      <div
        ref={ambientGlowRef}
        aria-hidden="true"
        className={`soft-cursor-ambient ${
          hovered ? 'w-28 h-28 opacity-90' : 'w-20 h-20 opacity-60'
        }`}
      />

      {/* Elegant, Soft Gold Fluid Halo */}
      <div
        ref={haloRef}
        aria-hidden="true"
        className={`soft-cursor-halo ${
          hovered
            ? 'w-12 h-12 border-amber-400/80 bg-amber-400/10 shadow-[0_0_20px_rgba(223,183,108,0.4)] scale-110'
            : clicked
            ? 'w-7 h-7 border-amber-300 bg-amber-400/20 shadow-[0_0_12px_rgba(223,183,108,0.5)] scale-90'
            : 'w-8 h-8 border-amber-400/40 bg-transparent'
        }`}
      />
    </>
  )
}
