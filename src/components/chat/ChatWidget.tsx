'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { MessageCircle, X, Send, Sparkles, CalendarClock } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Msg = { id: string; role: 'user' | 'assistant'; content: string };

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

export function ChatWidget() {
  const t = useTranslations('Chat');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [failed, setFailed] = useState(false);
  const [exchanges, setExchanges] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed the greeting in the active locale when first opened.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), role: 'assistant', content: t('greeting') }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    if (open) {
      track('chat_open', { locale });
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open, locale]);

  // Allow any "Talk to our AI assistant" CTA on the page to open the widget.
  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener('sda-open-chat', openChat);
    return () => window.removeEventListener('sda-open-chat', openChat);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streaming]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Msg = { id: nextId(), role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setStreaming(true);
    setFailed(false);

    const assistantId = nextId();
    setMessages((m) => [...m, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok || !res.body) throw new Error('chat failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) =>
          m.map((msg) => (msg.id === assistantId ? { ...msg, content: acc } : msg)),
        );
      }
      setExchanges((n) => n + 1);
    } catch {
      // Never lose a lead: drop the empty assistant bubble and reveal the fallback.
      setMessages((m) => m.filter((msg) => msg.id !== assistantId));
      setFailed(true);
    } finally {
      setStreaming(false);
    }
  }

  const showLead = failed || exchanges >= 2;

  return (
    <>
      {/* Floating launcher — bottom-end respects RTL. */}
      <button
        type="button"
        aria-label={t('buttonLabel')}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'fixed bottom-5 end-5 z-[55] inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue text-white shadow-glow transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2',
          open && 'scale-90 opacity-0',
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label={t('title')}
        className={cn(
          'fixed bottom-0 end-0 z-[60] flex w-full flex-col overflow-hidden bg-card shadow-lift transition-all duration-300 sm:bottom-5 sm:end-5 sm:h-[min(620px,calc(100dvh-2.5rem))] sm:w-[400px] sm:rounded-3xl',
          open
            ? 'pointer-events-auto h-[100dvh] translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-hero-gradient px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Sparkles className="h-5 w-5 text-cyan" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">{t('title')}</p>
              <p className="text-xs text-white/70">{t('subtitle')}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label={t('close')}
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface p-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                  m.role === 'user'
                    ? 'bg-blue text-white'
                    : 'border border-line/[0.06] bg-card text-ink shadow-soft',
                )}
              >
                {m.content || (streaming ? <span className="text-ink-muted">{t('thinking')}</span> : '')}
              </div>
            </div>
          ))}

          {showLead && <LeadCapture />}
        </div>

        {/* Composer */}
        <form onSubmit={send} className="flex items-center gap-2 border-t border-line/[0.06] p-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            aria-label={t('placeholder')}
            className="h-11 w-full rounded-full border border-line/10 bg-card px-4 text-sm text-ink placeholder:text-ink-muted/70 focus:border-blue focus:outline-none"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            aria-label={t('send')}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="pb-2 text-center text-[11px] text-ink-muted/70">{t('poweredBy')}</p>
      </div>
    </>
  );
}

/** Inline lead capture shown after a couple of exchanges or on API failure. */
function LeadCapture() {
  const t = useTranslations('Chat');
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    track('chat_lead_captured', {});
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent: 'chat_lead', email }),
      });
    } catch {
      /* best effort */
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-blue/20 bg-blue/5 p-4 text-sm text-ink">
        {t('leadSuccess')}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-blue/20 bg-card p-4 shadow-soft">
      <p className="text-sm font-medium text-ink">{t('leadPrompt')}</p>
      <form onSubmit={submit} className="mt-3 flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('leadEmailPlaceholder')}
          className="h-10 w-full rounded-full border border-line/10 px-3 text-sm focus:border-blue focus:outline-none"
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-full bg-blue px-4 text-sm font-medium text-white hover:bg-blue-600"
        >
          {t('leadSubmit')}
        </button>
      </form>
      <Link
        href="/contact"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:underline"
      >
        <CalendarClock className="h-4 w-4" /> {t('bookInstead')}
      </Link>
    </div>
  );
}
