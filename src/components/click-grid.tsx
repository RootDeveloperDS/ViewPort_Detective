"use client"

import React, { useState, useEffect } from "react"

export function ClickGrid({ onExit }: { onExit: () => void }) {
  const [css, setCss] = useState<string | null>(null)
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const onDocClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null
      if (!target) return
      if (target.closest("button, a, input, textarea, select, [data-ignore-grid], [role='button']")) {
        return
      }
      const clickX = Math.round(ev.clientX)
      const clickY = Math.round(ev.clientY)
      const marginTop = clickY
      const marginLeft = clickX
      const marginRight = Math.round(window.innerWidth) - clickX
      const marginBottom = Math.round(window.innerHeight) - clickY
      const snippet = `margin: ${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px;`
      setCss(snippet)
      setClickPos({ x: clickX, y: clickY })
    }
    window.addEventListener("click", onDocClick, true)
    return () => window.removeEventListener("click", onDocClick, true)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExit()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onExit])

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden>
      {clickPos && (
        <>
          <div
            className="fixed top-0 bottom-0 w-px bg-red-500 pointer-events-none"
            style={{ left: clickPos.x }}
          />
          <div
            className="fixed left-0 right-0 h-px bg-red-500 pointer-events-none"
            style={{ top: clickPos.y }}
          />
        </>
      )}
      {css && (
        <div
          className="fixed bottom-4 left-4 bg-gray-900 text-white text-xs sm:text-sm px-3 py-2 rounded shadow-lg flex items-center gap-2 pointer-events-auto"
          data-ignore-grid
        >
          <code>{css}</code>
          <button
            className="ml-2 px-2 py-1 bg-blue-600 rounded hover:bg-blue-500"
            onClick={() => navigator.clipboard.writeText(css)}
            data-ignore-grid
          >
            Copy
          </button>
        </div>
      )}
    </div>
  )
}
