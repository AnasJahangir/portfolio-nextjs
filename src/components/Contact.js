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

  const inputCls =
    'w-full bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-heading placeholder:text-text/60 focus:outline-none focus:border-accent transition-colors';

  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-16 scroll-mt-20">
      <SectionHeading title="Contact" />
      <Reveal>
        <div className="text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-heading leading-tight">
            Let&apos;s build something.
          </h3>
          <p className="mt-4 leading-relaxed max-w-md mx-auto">
            My inbox is always open — whether you have a project in mind, a question, or just
            want to say hello.
          </p>
          <a
            href="mailto:anasjahangir00@gmail.com"
            className="mt-5 inline-block text-lg text-accent hover:underline"
          >
            anasjahangir00@gmail.com
          </a>
          <p className="mt-2 text-sm">Karachi, Pakistan</p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="max-w-xl mx-auto mt-12">
          {status === 'success' ? (
            <div className="text-center py-8" role="status">
              <p className="font-display text-xl font-semibold text-heading">Message sent</p>
              <p className="mt-2">Thanks for reaching out — I&apos;ll reply soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm text-accent hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-xs uppercase tracking-[0.18em] text-text mb-1">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs uppercase tracking-[0.18em] text-text mb-1">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs uppercase tracking-[0.18em] text-text mb-1">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputCls} resize-y`}
                  placeholder="Tell me about your project..."
                />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-400" role="alert">{error}</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-6 py-3 rounded-full bg-accent text-navy text-sm font-semibold hover:bg-accent-dim transition-colors disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
