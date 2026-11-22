import { jwtVerify, SignJWT } from 'jose';

const COOKIE_NAME = 'admin_session';
const SESSION_DAYS = 7;

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function createSessionToken() {
  const secret = getSecret();
  if (!secret) throw new Error('Admin password is not configured');
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret);
}

export async function verifySessionToken(token) {
  const secret = getSecret();
  if (!secret || !token) return false;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.admin === true;
  } catch {
    return false;
  }
}

export async function isAdminRequest(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export const sessionCookie = {
  name: COOKIE_NAME,
  maxAge: SESSION_DAYS * 24 * 60 * 60,
  options: {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  },
};
