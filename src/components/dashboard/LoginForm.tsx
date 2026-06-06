'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error('invalid');
      router.replace('/dashboard');
      router.refresh();
    } catch {
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (state === 'error') setState('idle');
          }}
          className="h-12 w-full rounded-xl border border-line/10 bg-card px-4 text-sm text-ink focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
          placeholder="••••••••"
        />
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-600">Incorrect password. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-60"
      >
        {state === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Lock className="h-4 w-4" aria-hidden />
        )}
        Sign in
      </button>
    </form>
  );
}
