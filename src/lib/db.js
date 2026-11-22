import { createClient } from '@libsql/client';
import { seedArchiveProjects, seedFeaturedProjects, seedJobs, seedTestimonials } from './seed';

let client = null;
let tablesEnsured = false;

export function isDbConnected() {
  return Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);
}

function getClient() {
  if (!isDbConnected()) return null;
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

const CREATE_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT,
    avatar TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS featured_projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    html TEXT,
    cover_image TEXT,
    tech TEXT,
    github TEXT,
    external TEXT,
    cta TEXT,
    date TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS archive_projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    tech TEXT,
    github TEXT,
    external TEXT,
    year TEXT,
    company TEXT,
    order_index INTEGER DEFAULT 0,
    ios TEXT,
    android TEXT,
    cover_image TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT,
    range TEXT,
    url TEXT,
    duties TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
];

export async function ensureTables() {
  const db = getClient();
  if (!db || tablesEnsured) return;
  for (const sql of CREATE_STATEMENTS) {
    await db.execute(sql);
  }
  tablesEnsured = true;
}

function parseTech(row) {
  if (!row) return row;
  const out = { ...row };
  if (typeof out.tech === 'string') {
    try {
      out.tech = JSON.parse(out.tech);
    } catch {
      out.tech = out.tech ? [out.tech] : [];
    }
  }
  if (typeof out.duties === 'string') {
    try {
      out.duties = JSON.parse(out.duties);
    } catch {
      out.duties = out.duties ? [out.duties] : [];
    }
  }
  return out;
}

// ---------- Public reads (seed fallback when DB is not connected) ----------

export async function getFeaturedProjects() {
  const db = getClient();
  if (!db) return seedFeaturedProjects;
  try {
    await ensureTables();
    const r = await db.execute(
      "SELECT * FROM featured_projects ORDER BY date DESC, id DESC",
    );
    return r.rows.map(parseTech);
  } catch (e) {
    console.error('getFeaturedProjects failed, using seed:', e.message);
    return seedFeaturedProjects;
  }
}

export async function getArchiveProjects() {
  const db = getClient();
  if (!db) return seedArchiveProjects;
  try {
    await ensureTables();
    const r = await db.execute(
      'SELECT * FROM archive_projects ORDER BY order_index ASC, id DESC',
    );
    return r.rows.map(parseTech);
  } catch (e) {
    console.error('getArchiveProjects failed, using seed:', e.message);
    return seedArchiveProjects;
  }
}

export async function getJobs() {
  const db = getClient();
  if (!db) return seedJobs;
  try {
    await ensureTables();
    const r = await db.execute('SELECT * FROM jobs ORDER BY id DESC');
    return r.rows.map(parseTech);
  } catch (e) {
    console.error('getJobs failed, using seed:', e.message);
    return seedJobs;
  }
}

export async function getTestimonials() {
  const db = getClient();
  if (!db) return seedTestimonials;
  try {
    await ensureTables();
    const r = await db.execute('SELECT * FROM testimonials ORDER BY created_at DESC');
    return r.rows;
  } catch (e) {
    console.error('getTestimonials failed, using seed:', e.message);
    return seedTestimonials;
  }
}

// ---------- Writes ----------

export async function insertMessage({ name, email, message }) {
  const db = getClient();
  if (!db) return { id: null, stored: false };
  await ensureTables();
  const r = await db.execute({
    sql: 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
    args: [name, email, message],
  });
  return { id: Number(r.lastInsertRowid), stored: true };
}

// ---------- Admin CRUD ----------

export const TABLES = {
  messages: {
    columns: ['name', 'email', 'message'],
    jsonColumns: [],
    readOnly: true,
  },
  testimonials: {
    columns: ['name', 'role', 'avatar', 'message'],
    jsonColumns: [],
    readOnly: false,
  },
  featured_projects: {
    columns: ['title', 'description', 'html', 'cover_image', 'tech', 'github', 'external', 'cta', 'date'],
    jsonColumns: ['tech'],
    readOnly: false,
  },
  archive_projects: {
    columns: ['title', 'description', 'tech', 'github', 'external', 'year', 'company', 'order_index', 'ios', 'android', 'cover_image'],
    jsonColumns: ['tech'],
    readOnly: false,
  },
  jobs: {
    columns: ['title', 'company', 'range', 'url', 'duties'],
    jsonColumns: ['duties'],
    readOnly: false,
  },
};

export async function listRows(table) {
  const db = getClient();
  if (!db) throw new Error('Database not connected');
  await ensureTables();
  const r = await db.execute(`SELECT * FROM ${table} ORDER BY id DESC`);
  return r.rows.map(parseTech);
}

export async function createRow(table, data) {
  const db = getClient();
  if (!db) throw new Error('Database not connected');
  const def = TABLES[table];
  if (!def || def.readOnly) throw new Error('Table is read-only or unknown');
  await ensureTables();
  const cols = def.columns.filter((c) => data[c] !== undefined);
  const values = cols.map((c) =>
    def.jsonColumns.includes(c) ? JSON.stringify(data[c] ?? []) : data[c] ?? '',
  );
  const placeholders = cols.map(() => '?').join(', ');
  const r = await db.execute({
    sql: `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${placeholders})`,
    args: values,
  });
  return { id: Number(r.lastInsertRowid) };
}

export async function updateRow(table, id, data) {
  const db = getClient();
  if (!db) throw new Error('Database not connected');
  const def = TABLES[table];
  if (!def || def.readOnly) throw new Error('Table is read-only or unknown');
  await ensureTables();
  const cols = def.columns.filter((c) => data[c] !== undefined);
  if (cols.length === 0) return { ok: true };
  const values = cols.map((c) =>
    def.jsonColumns.includes(c) ? JSON.stringify(data[c] ?? []) : data[c] ?? '',
  );
  await db.execute({
    sql: `UPDATE ${table} SET ${cols.map((c) => `${c} = ?`).join(', ')} WHERE id = ?`,
    args: [...values, id],
  });
  return { ok: true };
}

export async function deleteRow(table, id) {
  const db = getClient();
  if (!db) throw new Error('Database not connected');
  await ensureTables();
  await db.execute({ sql: `DELETE FROM ${table} WHERE id = ?`, args: [id] });
  return { ok: true };
}
