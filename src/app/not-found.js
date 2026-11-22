import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-accent">404</p>
      <h1 className="font-display text-4xl font-bold text-heading mt-4">Page not found</h1>
      <p className="mt-4 max-w-md">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 rounded border border-accent text-accent font-mono text-sm hover:bg-accent/10 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
