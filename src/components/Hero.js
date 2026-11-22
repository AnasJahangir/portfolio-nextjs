'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section id="top" className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 pt-24 pb-16">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p variants={item} className="font-mono text-accent text-base md:text-lg mb-5">
          Hi, my name is
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display font-bold text-heading text-5xl sm:text-6xl md:text-7xl leading-[1.05]"
        >
          Anas Jahangir.
        </motion.h1>
        <motion.h2
          variants={item}
          className="font-display font-bold text-text text-4xl sm:text-5xl md:text-6xl leading-[1.1] mt-3"
        >
          I build complete products for the web.
        </motion.h2>
        <motion.p variants={item} className="mt-6 max-w-xl text-base md:text-lg leading-relaxed">
          I&apos;m a full-stack developer from Karachi, Pakistan. I build products end to end —
          React, Next.js and TypeScript on the front, Node.js and Express on the back — and I
          use AI as a tool to ship real things, faster.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="px-6 py-3 rounded border border-accent text-accent font-mono text-sm hover:bg-accent/10 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded bg-accent text-navy font-mono text-sm font-semibold hover:bg-accent-dim transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
        <motion.div variants={item} className="mt-10 flex items-center gap-5">
          <a
            href="https://github.com/AnasJahangir"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-text-light hover:text-accent transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/anasjahangir"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-text-light hover:text-accent transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
            </svg>
          </a>
          <a
            href="mailto:anas@anasjahangir.com"
            aria-label="Email"
            className="text-text-light hover:text-accent transition-colors font-mono text-sm"
          >
            anas@anasjahangir.com
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
