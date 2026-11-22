// Read-only seed data used when no Turso database is connected
// (TURSO_DATABASE_URL / TURSO_AUTH_TOKEN not set).
// These are Anas's real projects and experience — nothing here is invented.

export const seedJobs = [
  {
    id: 1,
    title: 'Junior Frontend Developer',
    company: 'Cognitive IT Solutions',
    range: '2024 — Oct 2026',
    url: '',
    duties: [
      'Built and maintained frontend features with React/Next.js; role discontinued Oct 2026 due to company operational requirements.',
    ],
    created_at: '2026-11-22',
  },
];

export const seedFeaturedProjects = [
  {
    id: 1,
    title: 'AI Pro Resume',
    description:
      'Complete resume builder plus cover letter builder with 1000+ templates. Cut load time from 34–50s to 10–12s and reached Lighthouse 80+.',
    html: '',
    cover_image: '/images/project-placeholder.svg',
    tech: ['React', 'Next.js', 'Tailwind CSS'],
    github: '',
    external: 'https://aiproresume.com',
    cta: '',
    date: '2025-01-01',
    created_at: '2026-11-22',
  },
  {
    id: 2,
    title: 'Prospect IQ',
    description:
      'Lead CRM that finds business leads with map-based scraping via its MapLeads API, manages them in a pipeline (New / Contacted / Follow-Up / Qualified), runs WhatsApp outreach campaigns, and tracks leads and results on a dashboard.',
    html: '',
    cover_image: '/images/project-placeholder.svg',
    tech: ['Next.js', 'Node.js', 'Express'],
    github: 'https://github.com/AnasJahangir/ProspectIQ',
    external: 'https://prospect-iq-omega.vercel.app',
    cta: '',
    date: '2025-01-01',
    created_at: '2026-11-22',
  },
  {
    id: 3,
    title: 'Gym Management System',
    description:
      'Fully AI-coded gym management system. The hard part was full WhatsApp automation — memberships, reminders and member messaging, automated end to end.',
    html: '',
    cover_image: '/images/project-placeholder.svg',
    tech: ['React', 'Node.js', 'Express'],
    github: '',
    external: '',
    cta: '',
    date: '2025-01-01',
    created_at: '2026-11-22',
  },
];

export const seedArchiveProjects = [
  {
    id: 1,
    title: 'DokyAI',
    description: 'AI-powered document assistant.',
    tech: ['React', 'Next.js'],
    github: '',
    external: 'https://signin.dokyai.com',
    year: '2025',
    company: '',
    order_index: 1,
    ios: '',
    android: '',
    cover_image: '/images/project-placeholder.svg',
    created_at: '2026-11-22',
  },
  {
    id: 2,
    title: 'SmartMedics',
    description: 'Healthcare web platform.',
    tech: ['React', 'Next.js'],
    github: '',
    external: 'https://smartmedics.pk',
    year: '2025',
    company: '',
    order_index: 2,
    ios: '',
    android: '',
    cover_image: '/images/project-placeholder.svg',
    created_at: '2026-11-22',
  },
  {
    id: 3,
    title: 'Medschein',
    description: 'Medical services web app.',
    tech: ['React', 'Next.js'],
    github: '',
    external: 'https://medschein.com',
    year: '2025',
    company: '',
    order_index: 3,
    ios: '',
    android: '',
    cover_image: '/images/project-placeholder.svg',
    created_at: '2026-11-22',
  },
  {
    id: 4,
    title: 'LeadVix',
    description: 'Lead generation platform.',
    tech: ['React', 'Next.js', 'Node.js'],
    github: '',
    external: 'https://leadvix.com',
    year: '2025',
    company: '',
    order_index: 4,
    ios: '',
    android: '',
    cover_image: '/images/project-placeholder.svg',
    created_at: '2026-11-22',
  },
  {
    id: 5,
    title: 'AI Job Orbit',
    description: 'AI-powered job search platform.',
    tech: ['React', 'Next.js'],
    github: '',
    external: 'https://aijoborbit.com',
    year: '2025',
    company: '',
    order_index: 5,
    ios: '',
    android: '',
    cover_image: '/images/project-placeholder.svg',
    created_at: '2026-11-22',
  },
];

// Never invent fake testimonials — empty until real ones are added in /admin.
export const seedTestimonials = [];
