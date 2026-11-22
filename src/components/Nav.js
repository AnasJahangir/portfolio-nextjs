'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { n: '01', label: 'About', href: '#about' },
  { n: '02', label: 'Experience', href: '#experience' },
  { n: '03', label: 'Work', href: '#work' },
  { n: '04', label: 'Services', href: '#services' },
  { n: '05', label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/85 backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-[72px]" aria-label="Main">
        <a href="#top" className="font-mono text-accent text-xl font-bold" aria-label="Anas Jahangir — home">
          AJ<span className="text-heading">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group text-sm text-text-light hover:text-accent transition-colors"
            >
              <span className="font-mono text-accent text-xs mr-1">{l.n}.</span>
              <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 group-hover:after:w-full">
                {l.label}
              </span>
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-mono text-accent border border-accent rounded px-4 py-2 hover:bg-accent/10 transition-colors"
          >
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-heading p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="block w-6 h-0.5 bg-accent mb-1.5 transition-transform" style={open ? { transform: 'translateY(8px) rotate(45deg)' } : {}} />
          <span className="block w-6 h-0.5 bg-accent mb-1.5" style={open ? { opacity: 0 } : {}} />
          <span className="block w-6 h-0.5 bg-accent" style={open ? { transform: 'translateY(-8px) rotate(-45deg)' } : {}} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-navy-light border-t border-border px-6 py-6">
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-text-light hover:text-accent transition-colors"
              >
                <span className="font-mono text-accent text-xs mr-2">{l.n}.</span>
                {l.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-mono text-accent border border-accent rounded px-4 py-2 w-max"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
