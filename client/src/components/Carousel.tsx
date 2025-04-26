import React, { useState, CSSProperties } from 'react'
import '../assets/ProfessionalDashboard.css' // ou ton fichier CSS global pure

export interface CarouselItem {
  src: string
  alt?: string
}

interface CarouselProps {
  items: CarouselItem[]
  /** hauteur fixe si besoin (ex: '160px') */
  height?: string
  /** style supplémentaire sur le container */
  style?: CSSProperties
}

export default function Carousel({
  items,
  height = '160px',
  style
}: CarouselProps) {
  const [slide, setSlide] = useState(0)
  const prev = () => setSlide(s => (s === 0 ? items.length - 1 : s - 1))
  const next = () => setSlide(s => (s + 1) % items.length)

  return (
    <section
      className="carousel"
      style={{ ...style, '--carousel-height': height } as any}
    >
      <button className="nav prev" onClick={prev}>‹</button>
      <div className="carousel-strip">
        {items.map((item, i) => (
          <img
            key={i}
            src={item.src}
            alt={item.alt || `slide ${i+1}`}
            style={{ opacity: i === slide ? 1 : 0.4, height }}
          />
        ))}
      </div>
      <button className="nav next" onClick={next}>›</button>
      <div className="carousel-dots">
        {items.map((_, i) => (
          <span
            key={i}
            className={i === slide ? 'dot active' : 'dot'}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>
    </section>
  )
}
