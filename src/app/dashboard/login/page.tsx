import { redirect } from 'next/navigation';
import { isAuthed, authConfigured } from '@/lib/auth';
import { LogoMark } from '@/components/layout/Logo';
import { LoginForm } from '@/components/dashboard/LoginForm';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  if (isAuthed()) redirect('/dashboard');

  return (
    <div className="flex min-h-dvh items-center justify-center p-5">
      <div className="w-full max-w-sm rounded-3xl border border-line/10 bg-card p-8 shadow-soft">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-9 w-9" />
          <span className="text-lg font-bold tracking-tight text-ink">
            SwissDigi<span className="text-blue">AI</span>
          </span>
        </div>
        <h1 className="mt-6 text-xl font-semibold text-ink">Dashboard sign-in</h1>
        <p className="mb-6 mt-1 text-sm text-ink-muted">Enter the admin password to continue.</p>

        {authConfigured ? (
          <LoginForm />
        ) : (
          <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            Set <code>DASHBOARD_PASSWORD</code> in your environment to enable the dashboard.
          </p>
        )}
      </div>
    </div>
  );
}
