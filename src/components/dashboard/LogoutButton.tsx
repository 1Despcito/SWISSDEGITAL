'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/dashboard/login');
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line/15 px-4 text-sm font-medium text-ink transition-colors hover:bg-surface"
    >
      <LogOut className="h-4 w-4" aria-hidden />
      Sign out
    </button>
  );
}
