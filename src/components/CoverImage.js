'use client';

import { useState } from 'react';
import Image from 'next/image';

const FALLBACK = '/images/project-placeholder.svg';

export default function CoverImage({ src, alt, width = 1200, height = 900, className }) {
  const [err, setErr] = useState(false);
  return (
    <Image
      src={err || !src ? FALLBACK : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setErr(true)}
    />
  );
}
