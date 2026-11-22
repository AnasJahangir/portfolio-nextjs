export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-text-light">
          Designed &amp; Built by Anas Jahangir
        </p>
        <div className="flex items-center gap-5 font-mono text-sm">
          <a href="https://github.com/AnasJahangir" target="_blank" rel="noreferrer" className="text-text-light hover:text-accent transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/anasjahangir" target="_blank" rel="noreferrer" className="text-text-light hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href="mailto:anas@anasjahangir.com" className="text-text-light hover:text-accent transition-colors">
            Email
          </a>
          <a href="#top" className="text-accent hover:underline">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
