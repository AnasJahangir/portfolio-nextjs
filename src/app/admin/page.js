'use client';

import { useCallback, useEffect, useState } from 'react';

const TABLES = {
  messages: {
    label: 'Messages',
    readOnly: true,
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'message', label: 'Message', type: 'textarea' },
    ],
  },
  testimonials: {
    label: 'Testimonials',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'avatar', label: 'Avatar URL', type: 'text' },
      { key: 'message', label: 'Message', type: 'textarea' },
    ],
  },
  featured_projects: {
    label: 'Featured Projects',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'cover_image', label: 'Cover image', type: 'image' },
      { key: 'tech', label: 'Tech (comma separated)', type: 'list' },
      { key: 'github', label: 'GitHub URL', type: 'text' },
      { key: 'external', label: 'Live URL', type: 'text' },
      { key: 'cta', label: 'CTA', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
    ],
  },
  archive_projects: {
    label: 'Archive Projects',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'cover_image', label: 'Cover image', type: 'image' },
      { key: 'tech', label: 'Tech (comma separated)', type: 'list' },
      { key: 'github', label: 'GitHub URL', type: 'text' },
      { key: 'external', label: 'Live URL', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'order_index', label: 'Order', type: 'number' },
    ],
  },
  jobs: {
    label: 'Jobs',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'range', label: 'Date range', type: 'text' },
      { key: 'url', label: 'Company URL', type: 'text' },
      { key: 'duties', label: 'Duties (one per line)', type: 'lines' },
    ],
  },
};

function toFormValues(row, table) {
  const values = {};
  for (const f of TABLES[table].fields) {
    const v = row?.[f.key];
    if (Array.isArray(v)) values[f.key] = f.type === 'lines' ? v.join('\n') : v.join(', ');
    else values[f.key] = v ?? '';
  }
  return values;
}

function fromFormValues(values, table) {
  const out = {};
  for (const f of TABLES[table].fields) {
    const v = values[f.key];
    if (f.type === 'list') out[f.key] = String(v || '').split(',').map((s) => s.trim()).filter(Boolean);
    else if (f.type === 'lines') out[f.key] = String(v || '').split('\n').map((s) => s.trim()).filter(Boolean);
    else if (f.type === 'number') out[f.key] = v === '' ? 0 : Number(v);
    else out[f.key] = v;
  }
  return out;
}

export default function AdminPage() {
  const [status, setStatus] = useState('loading'); // loading | login | admin
  const [dbConnected, setDbConnected] = useState(false);
  const [adminConfigured, setAdminConfigured] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [table, setTable] = useState('messages');
  const [rows, setRows] = useState([]);
  const [rowsError, setRowsError] = useState('');
  const [editing, setEditing] = useState(null); // null | { id? , values }
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState('');

  const loadMe = useCallback(async () => {
    const res = await fetch('/api/admin/me');
    const data = await res.json();
    setDbConnected(data.dbConnected);
    setAdminConfigured(data.adminConfigured);
    setStatus(data.authenticated ? 'admin' : 'login');
  }, []);

  const loadRows = useCallback(async (t) => {
    setRowsError('');
    const res = await fetch(`/api/admin/${t}`);
    const data = await res.json();
    if (!res.ok) {
      setRowsError(data.error || 'Failed to load.');
      setRows([]);
      return;
    }
    setRows(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  useEffect(() => {
    if (status === 'admin') loadRows(table);
  }, [status, table, loadRows]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setLoginError(data.error || 'Login failed.');
      return;
    }
    setPassword('');
    setStatus('admin');
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setStatus('login');
    setRows([]);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this row?')) return;
    const res = await fetch(`/api/admin/${table}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setRowsError(data.error || 'Delete failed.');
      return;
    }
    loadRows(table);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setNotice('');
    const payload = fromFormValues(editing.values, table);
    const url = editing.id ? `/api/admin/${table}/${editing.id}` : `/api/admin/${table}`;
    const method = editing.id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setNotice(data.error || 'Save failed.');
      return;
    }
    setEditing(null);
    setNotice('Saved.');
    loadRows(table);
  }

  async function handleUpload(e, fieldKey) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setNotice('');
    const form = new FormData();
    form.append('file', file);
    form.append('folder', table === 'archive_projects' ? 'archive-covers' : 'project-covers');
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    const data = await res.json().catch(() => ({}));
    setUploading(false);
    if (!res.ok) {
      setNotice(data.error || 'Upload failed.');
      return;
    }
    setEditing((ed) => ({ ...ed, values: { ...ed.values, [fieldKey]: data.url } }));
    setNotice('Image uploaded.');
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <p className="font-mono text-text-light">Loading...</p>
      </div>
    );
  }

  if (status === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-panel border border-border rounded-lg p-8">
          <h1 className="font-display text-2xl font-bold text-heading">Admin Login</h1>
          {!adminConfigured && (
            <p className="mt-3 text-sm text-red-400">
              ADMIN_PASSWORD is not set on the server — login is disabled until it is configured.
            </p>
          )}
          <label htmlFor="admin-password" className="block font-mono text-sm text-text-light mt-6 mb-2">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-navy border border-border rounded px-4 py-3 text-heading focus:outline-none focus:border-accent"
            autoComplete="current-password"
          />
          {loginError && <p className="text-sm text-red-400 mt-3" role="alert">{loginError}</p>}
          <button
            type="submit"
            className="mt-6 w-full px-6 py-3 rounded bg-accent text-navy font-mono text-sm font-semibold hover:bg-accent-dim transition-colors"
          >
            Log In
          </button>
          <p className="mt-4 text-center">
            <a href="/" className="font-mono text-sm text-text-light hover:text-accent">← Back to site</a>
          </p>
        </form>
      </div>
    );
  }

  const def = TABLES[table];

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-heading">Admin</h1>
        <div className="flex gap-3">
          <a href="/" className="px-4 py-2 border border-border rounded font-mono text-sm text-text-light hover:text-accent">
            View site
          </a>
          <button onClick={handleLogout} className="px-4 py-2 border border-accent rounded font-mono text-sm text-accent hover:bg-accent/10">
            Log out
          </button>
        </div>
      </div>

      {!dbConnected && (
        <div className="mt-6 bg-panel border border-yellow-500/50 rounded-lg p-4 text-sm" role="alert">
          <strong className="text-yellow-300">Database not connected.</strong>
          <span className="text-text-light"> Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in the environment — the
          public site is currently showing built-in seed data, and changes made here will not be saved.</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-8">
        {Object.entries(TABLES).map(([key, t]) => (
          <button
            key={key}
            onClick={() => { setTable(key); setEditing(null); setNotice(''); }}
            className={`px-4 py-2 rounded font-mono text-sm border transition-colors ${
              table === key ? 'bg-accent text-navy border-accent font-semibold' : 'border-border text-text-light hover:text-accent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {notice && <p className="mt-4 text-sm text-accent" role="status">{notice}</p>}
      {rowsError && <p className="mt-4 text-sm text-red-400" role="alert">{rowsError}</p>}

      {!def.readOnly && (
        <button
          onClick={() => setEditing({ id: null, values: toFormValues(null, table) })}
          className="mt-6 px-5 py-2 rounded bg-accent text-navy font-mono text-sm font-semibold hover:bg-accent-dim"
        >
          + Add {def.label.slice(0, -1)}
        </button>
      )}

      {editing && (
        <form onSubmit={handleSave} className="mt-6 bg-panel border border-border rounded-lg p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-heading">
            {editing.id ? 'Edit' : 'Add'} — {def.label}
          </h2>
          {def.fields.map((f) => (
            <div key={f.key}>
              <label htmlFor={`f-${f.key}`} className="block font-mono text-sm text-text-light mb-2">
                {f.label}
              </label>
              {f.type === 'textarea' ? (
                <textarea
                  id={`f-${f.key}`}
                  rows={4}
                  value={editing.values[f.key]}
                  onChange={(e) => setEditing((ed) => ({ ...ed, values: { ...ed.values, [f.key]: e.target.value } }))}
                  className="w-full bg-navy border border-border rounded px-4 py-3 text-heading focus:outline-none focus:border-accent"
                />
              ) : f.type === 'image' ? (
                <div className="space-y-2">
                  <input
                    id={`f-${f.key}`}
                    type="text"
                    value={editing.values[f.key]}
                    onChange={(e) => setEditing((ed) => ({ ...ed, values: { ...ed.values, [f.key]: e.target.value } }))}
                    placeholder="https://... or /images/....svg"
                    className="w-full bg-navy border border-border rounded px-4 py-3 text-heading focus:outline-none focus:border-accent"
                  />
                  <label className="block text-sm">
                    <span className="text-text-light">Or upload (needs Vercel Blob token): </span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => handleUpload(e, f.key)}
                      className="text-text-light file:mr-3 file:px-3 file:py-1.5 file:rounded file:border file:border-border file:bg-navy file:text-text-light"
                    />
                  </label>
                </div>
              ) : (
                <input
                  id={`f-${f.key}`}
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={editing.values[f.key]}
                  onChange={(e) => setEditing((ed) => ({ ...ed, values: { ...ed.values, [f.key]: e.target.value } }))}
                  className="w-full bg-navy border border-border rounded px-4 py-3 text-heading focus:outline-none focus:border-accent"
                />
              )}
            </div>
          ))}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded bg-accent text-navy font-mono text-sm font-semibold hover:bg-accent-dim disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-5 py-2 rounded border border-border font-mono text-sm text-text-light hover:text-accent"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-text-light font-mono text-sm">
              <th className="py-3 pr-4 font-medium">ID</th>
              <th className="py-3 pr-4 font-medium">Title / Name</th>
              <th className="py-3 pr-4 font-medium hidden md:table-cell">Detail</th>
              <th className="py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border/60 align-top">
                <td className="py-3 pr-4 font-mono text-sm">{row.id}</td>
                <td className="py-3 pr-4 font-semibold text-heading">
                  {row.title || row.name || '—'}
                  {row.created_at && (
                    <span className="block font-normal font-mono text-xs text-text mt-1">{row.created_at}</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-sm hidden md:table-cell max-w-md truncate">
                  {row.description || row.message || row.company || row.email || '—'}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {!def.readOnly && (
                    <button
                      onClick={() => setEditing({ id: row.id, values: toFormValues(row, table) })}
                      className="text-accent hover:underline font-mono text-sm mr-4"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-400 hover:underline font-mono text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && !rowsError && (
              <tr>
                <td colSpan={4} className="py-6 text-text">No rows yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
