import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Experience({ jobs }) {
  return (
    <section id="experience" className="max-w-3xl mx-auto px-6 py-16 scroll-mt-20">
      <SectionHeading title="Experience" />
      {jobs.length === 0 ? (
        <Reveal>
          <p>Experience details coming soon.</p>
        </Reveal>
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {jobs.map((job, i) => (
            <Reveal key={job.id ?? i} delay={i * 0.06}>
              <article className="py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-medium text-heading">
                    {job.title}{' '}
                    <span className="text-text font-normal">
                      ·{' '}
                      {job.url ? (
                        <a href={job.url} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                    </span>
                  </h3>
                  <span className="text-sm text-text">{job.range}</span>
                </div>
                <ul className="mt-3 space-y-1.5 leading-relaxed">
                  {(job.duties || []).map((d, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-text shrink-0" aria-hidden="true">—</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
