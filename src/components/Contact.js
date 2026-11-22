'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again or email me directly.');
    }
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionHeading number="06" title="Get In Touch" />
      <div className="grid md:grid-cols-2 gap-12">
        <Reveal>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-heading leading-tight">
            Let&apos;s build something great.
          </h3>
          <p className="mt-5 leading-relaxed">
            My inbox is always open — whether you have a project in mind, a question, or just
            want to say hello. I&apos;ll do my best to get back to you.
          </p>
          <p className="mt-6 font-mono text-accent">
            <a href="mailto:anasjahangir00@gmail.com" className="hover:underline">
              anasjahangir00@gmail.com
            </a>
          </p>
          <p className="mt-2 text-text-light">Karachi, Pakistan</p>
        </Reveal>
        <Reveal delay={0.12}>
          {status === 'success' ? (
            <div className="bg-panel border border-accent/50 rounded-lg p-8 text-center" role="status">
              <p className="text-2xl" aria-hidden="true">✓</p>
              <h4 className="font-display text-xl font-semibold text-heading mt-3">Message sent</h4>
              <p className="mt-2">Thanks for reaching out — I&apos;ll reply soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 px-5 py-2 border border-accent text-accent rounded font-mono text-sm hover:bg-accent/10 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block font-mono text-sm text-text-light mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-panel border border-border rounded px-4 py-3 text-heading placeholder:text-text/60 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block font-mono text-sm text-text-light mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-panel border border-border rounded px-4 py-3 text-heading placeholder:text-text/60 focus:outline-none focus:border-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block font-mono text-sm text-text-light mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-panel border border-border rounded px-4 py-3 text-heading placeholder:text-text/60 focus:outline-none focus:border-accent transition-colors resize-y"
                  placeholder="Tell me about your project..."
                />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-400" role="alert">{error}</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-6 py-3 rounded bg-accent text-navy font-mono text-sm font-semibold hover:bg-accent-dim transition-colors disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
