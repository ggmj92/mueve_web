'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import s from './artist-carousel.module.css'

// Keyboard + click/tap navigation
export default function ArtistCarousel({ slides, interval = 7000 }) {
  const [i, setI] = useState(0)
  const len = slides.length
  const go = useCallback((n) => setI((prev) => (prev + n + len) % len), [len])
  const timer = useRef(null)

  // Auto-advance
  useEffect(() => {
    if (len <= 1) return
    timer.current = setInterval(() => go(1), interval)
    return () => clearInterval(timer.current)
  }, [len, interval, go])

  if (!len) return null

  const slide = slides[i]
  const titleLine = slide.title ? (
    <span>
      <strong>{slide.title}</strong>
      {slide.year ? `, ${slide.year}` : ''}
    </span>
  ) : null
  const secondaryDetails = [
    slide.title ? null : slide.year,
    slide.technique,
    slide.dims,
  ].filter(Boolean)
  const showControls = len > 1
  const showMeta = Boolean(titleLine || secondaryDetails.length || showControls)

  return (
    <section className={s.carousel} aria-label="Artist artworks">
      <div className={s.frame}>
        <img
          src={slide.url}
          alt={slide.title || 'Artwork'}
          className={s.art}
          loading="eager"
        />
      </div>

      {showMeta ? (
        <div className={s.meta}>
          {titleLine || secondaryDetails.length ? (
            <div className={s.metaInfo}>
              {titleLine}
              {secondaryDetails.map((text, idx) => (
                <span key={`${text}-${idx}`}>{text}</span>
              ))}
            </div>
          ) : null}

          {showControls ? (
            <div className={s.controls}>
              <button onClick={() => go(-1)} aria-label="Anterior">
                ←
              </button>
              <span className={s.idx}>
                {i + 1} / {len}
              </span>
              <button onClick={() => go(1)} aria-label="Siguiente">
                →
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
