import Reveal from './Reveal';

export default function SectionHeading({ number, title }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 mb-10">
        <span className="font-mono text-accent text-lg md:text-xl">{number}.</span>
        <h2 className="text-2xl md:text-3xl font-bold text-heading font-display whitespace-nowrap">
          {title}
        </h2>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
    </Reveal>
  );
}
