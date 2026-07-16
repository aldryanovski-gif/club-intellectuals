'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase';
import type { Dictionary } from '@/lib/i18n';

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    const { error } = await supabaseBrowser().from('contact_messages').insert({
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      message: String(data.get('message') || '')
    });
    if (error) {
      setStatus('err');
    } else {
      setStatus('ok');
      form.reset();
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">{dict.contact.name}</label>
        <input id="name" name="name" required maxLength={120} />
      </div>
      <div>
        <label htmlFor="email">{dict.contact.email}</label>
        <input id="email" name="email" type="email" required maxLength={200} />
      </div>
      <div>
        <label htmlFor="message">{dict.contact.message}</label>
        <textarea id="message" name="message" rows={6} required maxLength={4000} />
      </div>
      <div>
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? dict.contact.sending : dict.contact.send}
        </button>
      </div>
      {status === 'ok' && <p className="form-status ok">{dict.contact.ok}</p>}
      {status === 'err' && <p className="form-status err">{dict.contact.error}</p>}
    </form>
  );
}
