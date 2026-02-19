'use client'

import { useEffect, useState } from 'react'

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false)

  const setRootClass = (className: string, enabled: boolean) => {
    document.documentElement.classList.toggle(className, enabled)
  }

  useEffect(() => {
    const stored = window.localStorage.getItem('mindwell:a11y')
    if (stored) {
      const settings = JSON.parse(stored)
      setRootClass('mw-high-contrast', !!settings.highContrast)
      setRootClass('mw-dyslexia-font', !!settings.dyslexiaFont)
      setRootClass('mw-reduced-motion', !!settings.reducedMotion)
      document.documentElement.style.fontSize = settings.textSize || '100%'
    }
  }, [])

  const saveSetting = (key: string, value: string | boolean) => {
    const raw = window.localStorage.getItem('mindwell:a11y')
    const current = raw ? JSON.parse(raw) : {}
    const next = { ...current, [key]: value }
    window.localStorage.setItem('mindwell:a11y', JSON.stringify(next))
  }

  return (
    <div className="fixed bottom-4 right-4 z-[75]">
      <button className="rounded-full bg-teal-600 text-white px-4 py-2 text-sm shadow-lg" onClick={() => setOpen((v) => !v)}>
        Accessibility
      </button>
      {open && (
        <div className="mt-2 w-72 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-xl space-y-3 text-sm">
          <p className="font-semibold">Accessibility options</p>
          <div>
            <label className="block mb-1">Text size</label>
            <div className="flex gap-2">
              {[
                { label: 'A-', value: '95%' },
                { label: 'A', value: '100%' },
                { label: 'A+', value: '112%' },
              ].map((option) => (
                <button
                  key={option.label}
                  className="rounded border px-2 py-1"
                  onClick={() => {
                    document.documentElement.style.fontSize = option.value
                    saveSetting('textSize', option.value)
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center justify-between gap-2">
              High contrast
              <input type="checkbox" onChange={(e) => { setRootClass('mw-high-contrast', e.target.checked); saveSetting('highContrast', e.target.checked) }} />
            </label>
            <label className="flex items-center justify-between gap-2">
              Dyslexia-friendly font
              <input type="checkbox" onChange={(e) => { setRootClass('mw-dyslexia-font', e.target.checked); saveSetting('dyslexiaFont', e.target.checked) }} />
            </label>
            <label className="flex items-center justify-between gap-2">
              Reduced motion
              <input type="checkbox" onChange={(e) => { setRootClass('mw-reduced-motion', e.target.checked); saveSetting('reducedMotion', e.target.checked) }} />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
