import Reveal from './Reveal';

export default function Archive({ projects }) {
  if (!projects || projects.length === 0) return null;
  return (
    <section id="archive" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-bold text-heading font-display text-center">
          Other Noteworthy Projects
        </h2>
        <p className="text-center font-mono text-accent text-sm mt-3">view the archive</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="overflow-x-auto mt-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-text-light font-mono text-sm">
                <th className="py-3 pr-4 font-medium">Year</th>
                <th className="py-3 pr-4 font-medium">Title</th>
                <th className="py-3 pr-4 font-medium hidden md:table-cell">Built at</th>
                <th className="py-3 pr-4 font-medium hidden lg:table-cell">Built with</th>
                <th className="py-3 font-medium">Links</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-border/60 hover:bg-panel/60 transition-colors">
                  <td className="py-4 pr-4 font-mono text-accent text-sm whitespace-nowrap">{p.year || '—'}</td>
                  <td className="py-4 pr-4 font-semibold text-heading">{p.title}</td>
                  <td className="py-4 pr-4 text-text hidden md:table-cell">{p.company || '—'}</td>
                  <td className="py-4 pr-4 font-mono text-xs text-text hidden lg:table-cell">
                    {(p.tech || []).join(' · ')}
                  </td>
                  <td className="py-4 whitespace-nowrap">
                    <span className="flex gap-3">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`} className="text-text-light hover:text-accent transition-colors">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                          </svg>
                        </a>
                      )}
                      {p.external && (
                        <a href={p.external} target="_blank" rel="noreferrer" aria-label={`${p.title} live site`} className="text-text-light hover:text-accent transition-colors">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
