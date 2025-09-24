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
  const isPortrait = slide.ar < 1 // ar < 1 means tall

  return (
    <section className={s.stage} aria-label="Artist artworks">
      {/* image area */}
      <div className={`${s.frame} ${isPortrait ? s.portrait : s.landscape}`}>
        {/* Use plain <img> so no Next image domain config needed */}
        <img
          src={slide.url}
          alt={slide.title || 'Artwork'}
          className={s.art}
          loading="eager"
        />
      </div>

      {/* caption / meta */}
      <div className={s.meta}>
        <div className={s.metaInner}>
          <span className={s.title}>
            <strong>{slide.title}</strong>
            {slide.year ? `, ${slide.year}` : ''}
          </span>
          {slide.technique ? <span>{slide.technique}</span> : null}
          {slide.dims ? <span>{slide.dims}</span> : null}
        </div>
        <div className={s.controls}>
          <button onClick={() => go(-1)} aria-label="Previous">
            ←
          </button>
          <span className={s.idx}>
            {i + 1} / {len}
          </span>
          <button onClick={() => go(1)} aria-label="Next">
            →
          </button>
        </div>
      </div>
    </section>
  )
}
