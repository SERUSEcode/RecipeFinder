// Handels the general overlay component with backdrop and animation

import { ReactNode, useEffect, useState } from 'react'

interface OverlayProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function Overlay({ open, onClose, children }: OverlayProps) {
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        setAnimateIn(true)
      })
    } else {
      setAnimateIn(false)
    }
  }, [open])

  if (!open && !animateIn) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          animateIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={`
          relative z-10 w-full max-w-3xl max-h-[90vh]
          overflow-y-auto rounded-xl bg-white shadow-xl
          transition-transform transition-opacity duration-200
          ${animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        {children}
      </div>
    </div>
  )
}
