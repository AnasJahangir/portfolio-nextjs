import Reveal from './Reveal';

export default function SectionHeading({ title }) {
  return (
    <Reveal>
      <div className="mb-8">
        <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-text">
          {title}
        </h2>
        <div className="mt-4 h-px bg-border" aria-hidden="true" />
      </div>
    </Reveal>
  );
}
