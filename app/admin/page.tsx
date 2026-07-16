'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabaseBrowser, type Post, type PostType } from '@/lib/supabase';

type Tab = 'news' | 'event' | 'project' | 'messages';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const emptyDraft = {
  id: '',
  type: 'news' as PostType,
  slug: '',
  title_en: '',
  title_sk: '',
  excerpt_en: '',
  excerpt_sk: '',
  body_en: '',
  body_sk: '',
  cover_url: '',
  event_date: '',
  external_url: '',
  published: false
};

type Draft = typeof emptyDraft;

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AdminPage() {
  const supabase = supabaseBrowser();
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (!checked) return <div className="admin-wrap">Loading…</div>;
  if (!session) return <Login />;
  return <Dashboard email={session.user.email || ''} />;
}

function Login() {
  const supabase = supabaseBrowser();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const data = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get('email')),
      password: String(data.get('password'))
    });
    if (error) setError(error.message);
    setBusy(false);
  }

  return (
    <div className="admin-wrap" style={{ maxWidth: 420 }}>
      <h1>Admin login</h1>
      <p style={{ color: 'var(--ink-soft)' }}>
        Sign in with your Supabase admin account.
      </p>
      <form className="form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        <div>
          <button className="btn btn-primary" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
        {error && <p className="form-status err">{error}</p>}
      </form>
    </div>
  );
}

function Dashboard({ email }: { email: string }) {
  const supabase = supabaseBrowser();
  const [tab, setTab] = useState<Tab>('news');
  const [posts, setPosts] = useState<Post[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  async function load(currentTab: Tab) {
    if (currentTab === 'messages') {
      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      setMessages((data as Message[]) || []);
    } else {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('type', currentTab)
        .order('created_at', { ascending: false });
      setPosts((data as Post[]) || []);
    }
  }

  useEffect(() => {
    load(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  function startNew() {
    setNotice('');
    setDraft({ ...emptyDraft, type: tab === 'messages' ? 'news' : tab });
  }

  function startEdit(p: Post) {
    setNotice('');
    setDraft({
      id: p.id,
      type: p.type,
      slug: p.slug,
      title_en: p.title_en || '',
      title_sk: p.title_sk || '',
      excerpt_en: p.excerpt_en || '',
      excerpt_sk: p.excerpt_sk || '',
      body_en: p.body_en || '',
      body_sk: p.body_sk || '',
      cover_url: p.cover_url || '',
      event_date: p.event_date || '',
      external_url: p.external_url || '',
      published: p.published
    });
  }

  async function saveDraft() {
    if (!draft) return;
    if (!draft.title_en.trim()) {
      setNotice('English title is required.');
      return;
    }
    setBusy(true);
    setNotice('');
    const slug = draft.slug.trim() || slugify(draft.title_en);
    const payload = {
      type: draft.type,
      slug,
      title_en: draft.title_en,
      title_sk: draft.title_sk,
      excerpt_en: draft.excerpt_en,
      excerpt_sk: draft.excerpt_sk,
      body_en: draft.body_en,
      body_sk: draft.body_sk,
      cover_url: draft.cover_url || null,
      event_date: draft.event_date || null,
      external_url: draft.external_url || null,
      published: draft.published
    };
    const query = draft.id
      ? supabase.from('posts').update(payload).eq('id', draft.id)
      : supabase.from('posts').insert(payload);
    const { error } = await query;
    setBusy(false);
    if (error) {
      setNotice(`Save failed: ${error.message}`);
    } else {
      setDraft(null);
      load(tab);
    }
  }

  async function deletePost(p: Post) {
    if (!window.confirm(`Delete "${p.title_en}"? This cannot be undone.`)) return;
    await supabase.from('posts').delete().eq('id', p.id);
    load(tab);
  }

  async function deleteMessage(m: Message) {
    if (!window.confirm('Delete this message?')) return;
    await supabase.from('contact_messages').delete().eq('id', m.id);
    load(tab);
  }

  async function uploadCover(file: File) {
    if (!draft) return;
    setBusy(true);
    setNotice('');
    const path = `covers/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ''))}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('media').upload(path, file);
    if (error) {
      setNotice(`Upload failed: ${error.message}`);
    } else {
      const { data } = supabase.storage.from('media').getPublicUrl(path);
      setDraft({ ...draft, cover_url: data.publicUrl });
    }
    setBusy(false);
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'news', label: 'News' },
    { id: 'event', label: 'Events' },
    { id: 'project', label: 'Projects' },
    { id: 'messages', label: 'Messages' }
  ];

  return (
    <div className="admin-wrap">
      <div className="admin-bar">
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Site admin</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="muted" style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>{email}</span>
          <button className="btn-sm" onClick={() => supabase.auth.signOut()}>
            Sign out
          </button>
        </div>
      </div>

      <div className="admin-bar">
        <div className="admin-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? 'on' : ''}
              onClick={() => {
                setTab(t.id);
                setDraft(null);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab !== 'messages' && !draft && (
          <button className="btn btn-primary" onClick={startNew}>
            + New {tab}
          </button>
        )}
      </div>

      {draft ? (
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>{draft.id ? 'Edit' : 'New'} {draft.type}</h2>
          <div className="form editor-grid" style={{ maxWidth: 'none' }}>
            <div>
              <label>Title (EN) *</label>
              <input value={draft.title_en} onChange={(e) => setDraft({ ...draft, title_en: e.target.value })} />
            </div>
            <div>
              <label>Title (SK)</label>
              <input value={draft.title_sk} onChange={(e) => setDraft({ ...draft, title_sk: e.target.value })} />
            </div>
            <div>
              <label>Short excerpt (EN)</label>
              <input value={draft.excerpt_en} onChange={(e) => setDraft({ ...draft, excerpt_en: e.target.value })} />
            </div>
            <div>
              <label>Short excerpt (SK)</label>
              <input value={draft.excerpt_sk} onChange={(e) => setDraft({ ...draft, excerpt_sk: e.target.value })} />
            </div>
            <div className="full">
              <label>Body (EN) — separate paragraphs with an empty line</label>
              <textarea rows={7} value={draft.body_en} onChange={(e) => setDraft({ ...draft, body_en: e.target.value })} />
            </div>
            <div className="full">
              <label>Body (SK)</label>
              <textarea rows={7} value={draft.body_sk} onChange={(e) => setDraft({ ...draft, body_sk: e.target.value })} />
            </div>
            <div>
              <label>Type</label>
              <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as PostType })}>
                <option value="news">News</option>
                <option value="event">Event</option>
                <option value="project">Project</option>
              </select>
            </div>
            <div>
              <label>Slug (URL, auto-generated if empty)</label>
              <input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} placeholder="my-article" />
            </div>
            <div>
              <label>Event date (for events)</label>
              <input type="date" value={draft.event_date} onChange={(e) => setDraft({ ...draft, event_date: e.target.value })} />
            </div>
            <div>
              <label>External link (optional — card links there instead)</label>
              <input value={draft.external_url} onChange={(e) => setDraft({ ...draft, external_url: e.target.value })} placeholder="https://…" />
            </div>
            <div className="full">
              <label>Cover image</label>
              {draft.cover_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={draft.cover_url} alt="" style={{ maxWidth: 260, borderRadius: 10, marginBottom: 8 }} />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadCover(f);
                }}
              />
            </div>
            <div className="full" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', margin: 0 }}>
                <input
                  type="checkbox"
                  checked={draft.published}
                  onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                  style={{ width: 'auto' }}
                />
                Published (visible on the site)
              </label>
              <button className="btn btn-primary" onClick={saveDraft} disabled={busy}>
                {busy ? 'Saving…' : 'Save'}
              </button>
              <button className="btn-sm" onClick={() => setDraft(null)}>Cancel</button>
              {notice && <span className="form-status err">{notice}</span>}
            </div>
          </div>
        </div>
      ) : tab === 'messages' ? (
        <div className="admin-list">
          {messages.length === 0 && <p className="empty-note">No messages yet.</p>}
          {messages.map((m) => (
            <div className="admin-item" key={m.id} style={{ alignItems: 'flex-start' }}>
              <div>
                <div className="t">
                  {m.name} · <a href={`mailto:${m.email}`}>{m.email}</a>
                </div>
                <div className="muted">{new Date(m.created_at).toLocaleString()}</div>
                <p style={{ margin: '8px 0 0', whiteSpace: 'pre-wrap' }}>{m.message}</p>
              </div>
              <div className="admin-actions">
                <button className="btn-sm danger" onClick={() => deleteMessage(m)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-list">
          {posts.length === 0 && <p className="empty-note">Nothing here yet — create the first one.</p>}
          {posts.map((p) => (
            <div className="admin-item" key={p.id}>
              <div>
                <div className="t">{p.title_en}</div>
                <div className="muted">/{p.slug} · {new Date(p.created_at).toLocaleDateString()}</div>
              </div>
              <div className="admin-actions" style={{ alignItems: 'center' }}>
                <span className={`pill ${p.published ? 'pub' : 'draft'}`}>
                  {p.published ? 'Published' : 'Draft'}
                </span>
                <button className="btn-sm" onClick={() => startEdit(p)}>Edit</button>
                <button className="btn-sm danger" onClick={() => deletePost(p)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
