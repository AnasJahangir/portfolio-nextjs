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
    <section id="testimonials" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionHeading number="05" title="Testimonials" />
      <Reveal>
        <figure className="max-w-3xl mx-auto text-center bg-panel border border-border rounded-lg p-8 md:p-10">
          <blockquote className="text-lg md:text-xl leading-relaxed text-heading">
            &ldquo;{current.message}&rdquo;
          </blockquote>
          <figcaption className="mt-6">
            <p className="font-semibold text-accent">{current.name}</p>
            {current.role && <p className="font-mono text-sm text-text mt-1">{current.role}</p>}
          </figcaption>
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
                className="px-4 py-2 border border-border rounded text-text-light hover:text-accent hover:border-accent transition-colors"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <span className="font-mono text-sm text-text" aria-live="polite">
                {index + 1} / {testimonials.length}
              </span>
              <button
                onClick={() => setIndex((index + 1) % testimonials.length)}
                className="px-4 py-2 border border-border rounded text-text-light hover:text-accent hover:border-accent transition-colors"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          )}
        </figure>
      </Reveal>
    </section>
  );
}
