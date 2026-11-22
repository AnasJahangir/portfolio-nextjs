import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Experience({ jobs }) {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionHeading number="02" title="Where I've Worked" />
      {jobs.length === 0 ? (
        <Reveal>
          <p className="text-text">Experience details coming soon.</p>
        </Reveal>
      ) : (
        <div className="space-y-10">
          {jobs.map((job, i) => (
            <Reveal key={job.id ?? i} delay={i * 0.08}>
              <article className="border-l-2 border-accent/40 pl-6">
                <h3 className="text-xl font-display font-semibold text-heading">
                  {job.title}{' '}
                  <span className="text-accent">
                    @ {job.url ? (
                      <a href={job.url} target="_blank" rel="noreferrer" className="hover:underline">
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </span>
                </h3>
                <p className="font-mono text-sm text-text mt-1">{job.range}</p>
                <ul className="mt-4 space-y-2">
                  {(job.duties || []).map((d, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed">
                      <span className="text-accent shrink-0" aria-hidden="true">▸</span>
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
