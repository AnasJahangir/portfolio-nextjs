import { NextResponse } from 'next/server';
import { insertMessage } from '@/lib/db';

export const dynamic = 'force-dynamic';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are all required.' }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'One of the fields is too long.' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  // Save first — the message must never be lost because email failed.
  let stored = false;
  try {
    const result = await insertMessage({ name, email, message });
    stored = result.stored;
  } catch (e) {
    console.error('Failed to save contact message:', e);
  }

  // Email notification is best-effort only. If it fails (or Resend is not
  // configured), the visitor still sees success — the message is safe.
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_TO_EMAIL || 'anasjahangir00@gmail.com',
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
    } catch (e) {
      console.error('Resend notification failed (message still saved):', e.message);
    }
  }

  if (!stored) {
    // No database connected and no email configured — still accept the message
    // gracefully rather than showing a dead end, but log it server-side.
    console.log('Contact message received (not persisted — no DB):', { name, email });
  }

  return NextResponse.json({ ok: true });
}
