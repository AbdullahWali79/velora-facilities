'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  vx: number
  vy: number
  color: string
}

export function LuxuryEffects() {
  const [enabled, setEnabled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Positions
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const isMoving = useRef(false)
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-enabled')

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      isMoving.current = true

      // Update position of inner dot directly for zero lag
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      // Add delicate gold stardust particle occasionally on movement
      if (Math.random() < 0.28) {
        const goldColors = ['#DFB76C', '#C5A059', '#FFE6A3', '#9E7D3B']
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          size: Math.random() * 2.2 + 0.8,
          opacity: 0.8,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 + 0.3,
          color: goldColors[Math.floor(Math.random() * goldColors.length)],
        })
      }

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

      // Detect hover over interactive elements
      const isInteractive = target?.closest('a, button, [role="button"], input, select, textarea, .interactive-gold')
      setHovered(Boolean(isInteractive))
    }

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)
    const onMouseLeave = () => {
      mousePos.current = { x: -100, y: -100 }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)

    // Smooth Canvas setup for gold stardust
    const canvas = canvasRef.current
    let ctx: CanvasRenderingContext2D | null = null
    if (canvas) {
      ctx = canvas.getContext('2d')
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
    }

    // Animation Loop: Spring lerp ring + render stardust particles
    let animId: number
    const loop = () => {
      // Lerp ring towards mouse position
      const dx = mousePos.current.x - ringPos.current.x
      const dy = mousePos.current.y - ringPos.current.y
      ringPos.current.x += dx * 0.18
      ringPos.current.y += dy * 0.18

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }

      // Render stardust particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i]
          p.x += p.vx
          p.y += p.vy
          p.opacity -= 0.02
          p.size = Math.max(0, p.size - 0.03)

          if (p.opacity <= 0 || p.size <= 0) {
            particles.current.splice(i, 1)
            continue
          }

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.opacity
          ctx.shadowBlur = 4
          ctx.shadowColor = '#DFB76C'
          ctx.fill()
        }
        ctx.globalAlpha = 1
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
      document.body.classList.remove('custom-cursor-enabled')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Canvas for trailing gold stardust */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-50 select-none"
      />

      {/* Trailing Luxury Gold Ring */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-50 transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out will-change-transform ${
          hovered
            ? 'w-14 h-14 bg-amber-400/10 border-2 border-amber-400 shadow-[0_0_25px_rgba(223,183,108,0.55)] scale-110'
            : clicked
            ? 'w-8 h-8 bg-amber-500/25 border border-amber-300 shadow-[0_0_15px_rgba(197,160,89,0.4)] scale-90'
            : 'w-10 h-10 bg-transparent border border-amber-400/50 shadow-[0_0_12px_rgba(197,160,89,0.25)]'
        }`}
      />

      {/* Central Gold Dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-50 will-change-transform transition-all duration-150 ${
          hovered
            ? 'w-2 h-2 bg-gradient-to-tr from-yellow-200 via-amber-300 to-amber-500 shadow-[0_0_12px_#FFF] scale-125'
            : clicked
            ? 'w-2.5 h-2.5 bg-amber-300 shadow-[0_0_8px_#FFE6A3] scale-150'
            : 'w-2 h-2 bg-amber-400 shadow-[0_0_8px_#DFB76C]'
        }`}
      />
    </>
  )
}
