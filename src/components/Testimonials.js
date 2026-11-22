'use client';

import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Testimonials({ testimonials }) {
  const [index, setIndex] = useState(0);

  // Hidden entirely when there are no real testimonials — never show fake ones.
  useEffect(() => {
    if (!testimonials || testimonials.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[index];

  return (
    <section id="testimonials" className="max-w-3xl mx-auto px-6 py-16 scroll-mt-20">
      <SectionHeading title="Kind words" />
      <Reveal>
        <figure className="max-w-2xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl leading-relaxed text-heading font-display">
            &ldquo;{current.message}&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-sm">
            <span className="font-medium text-heading">{current.name}</span>
            {current.role && <span className="text-text"> — {current.role}</span>}
          </figcaption>
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 text-sm">
              <button
                onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
                className="text-text hover:text-heading transition-colors"
                aria-label="Previous testimonial"
              >
                ← Prev
              </button>
              <span className="text-text" aria-live="polite">
                {index + 1} / {testimonials.length}
              </span>
              <button
                onClick={() => setIndex((index + 1) % testimonials.length)}
                className="text-text hover:text-heading transition-colors"
                aria-label="Next testimonial"
              >
                Next →
              </button>
            </div>
          )}
        </figure>
      </Reveal>
    </section>
  );
}
