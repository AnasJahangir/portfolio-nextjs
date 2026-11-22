'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section id="top" className="max-w-3xl mx-auto px-6 pt-28 md:pt-36 pb-16">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Image
            src="/images/me.jpg"
            alt="Anas Jahangir"
            width={64}
            height={64}
            className="rounded-full object-cover w-16 h-16 ring-1 ring-border"
            priority
          />
        </motion.div>
        <motion.h1
          variants={item}
          className="font-display font-bold text-heading text-4xl sm:text-5xl leading-tight mt-6"
        >
          Anas Jahangir
        </motion.h1>
        <motion.p variants={item} className="mt-3 text-lg text-text-light">
          Full-Stack Developer — Karachi, Pakistan
        </motion.p>
        <motion.p variants={item} className="mt-5 max-w-xl leading-relaxed">
          I build complete products for the web, end to end — React, Next.js and TypeScript
          on the front, Node.js and Express on the back — and I use AI as a tool to ship
          real things, faster.
        </motion.p>
        <motion.div variants={item} className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href="https://github.com/AnasJahangir"
            target="_blank"
            rel="noreferrer"
            className="text-heading hover:text-accent transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/anasjahangir"
            target="_blank"
            rel="noreferrer"
            className="text-heading hover:text-accent transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:anasjahangir00@gmail.com"
            className="text-heading hover:text-accent transition-colors"
          >
            Email ↗
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-heading hover:text-accent transition-colors"
          >
            Resume ↗
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
