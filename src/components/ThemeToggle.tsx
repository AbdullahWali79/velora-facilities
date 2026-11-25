'use client'

import React, { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from './Icons'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // DEFAULT IS ALWAYS LIGHT
    // Only switch to dark if the user explicitly clicked and saved 'dark' in localStorage
    const saved = localStorage.getItem('velora_theme') as 'light' | 'dark' | null
    if (saved === 'dark') {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
      if (!saved) {
        localStorage.setItem('velora_theme', 'light')
      }
    }
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('velora_theme', nextTheme)
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-lg bg-slate-800/10 animate-pulse ${className}`} />
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 border ${
        theme === 'dark'
          ? 'bg-slate-900 text-amber-400 border-amber-500/30 hover:bg-slate-800 hover:border-amber-400 shadow-xs'
          : 'bg-amber-50/80 text-slate-800 border-amber-300/60 hover:bg-amber-100/80 hover:text-amber-900 shadow-xs'
      } ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <MoonIcon className="w-4 h-4 text-slate-800 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  )
}
