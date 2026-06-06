import 'server-only';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const TO = process.env.CONTACT_TO_EMAIL ?? 'hello@swissdigiai.ch';
const FROM = process.env.CONTACT_FROM_EMAIL ?? 'SwissDigiAI <hello@swissdigiai.ch>';

const resend = apiKey ? new Resend(apiKey) : null;

export type LeadEmail = {
  name?: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  packageName?: string;
  language?: string;
  message?: string;
  source: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label: string, value?: string): string {
  if (!value) return '';
  return `<tr><td style="padding:6px 12px;color:#5B6B7F;font-size:13px">${label}</td><td style="padding:6px 12px;color:#0A1B2E;font-size:14px"><strong>${escapeHtml(value)}</strong></td></tr>`;
}

/** Notify the team about a new lead. Returns false if email isn't configured. */
export async function sendLeadNotification(lead: LeadEmail): Promise<boolean> {
  if (!resend) return false;
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="color:#0A1B2E">New ${escapeHtml(lead.source)} lead</h2>
      <table style="border-collapse:collapse;width:100%">
        ${row('Name', lead.name)}
        ${row('Email', lead.email)}
        ${row('Company', lead.company)}
        ${row('Service', lead.service)}
        ${row('Package', lead.packageName)}
        ${row('Budget', lead.budget)}
        ${row('Language', lead.language)}
      </table>
      ${lead.message ? `<p style="margin-top:16px;color:#0A1B2E;white-space:pre-wrap">${escapeHtml(lead.message)}</p>` : ''}
    </div>`;

  await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: lead.email,
    subject: `New ${lead.source} lead${lead.name ? ` — ${lead.name}` : ''}`,
    html,
  });
  return true;
}

/** Branded autoresponder to the lead. Best-effort. */
export async function sendAutoresponder(lead: LeadEmail): Promise<boolean> {
  if (!resend || !lead.email) return false;
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#0A1B2E">
      <h2 style="color:#0A1B2E">Thanks${lead.name ? `, ${escapeHtml(lead.name)}` : ''}!</h2>
      <p style="color:#5B6B7F;line-height:1.6">
        We've received your message and a human from SwissDigiAI will be in touch shortly —
        usually within a few hours.
      </p>
      <p style="color:#5B6B7F;line-height:1.6">In the meantime, feel free to book a free 30-minute discovery call.</p>
      <p style="margin-top:24px;color:#5B6B7F">— The SwissDigiAI team 🇨🇭</p>
    </div>`;

  await resend.emails.send({
    from: FROM,
    to: lead.email,
    subject: 'We received your message — SwissDigiAI',
    html,
  });
  return true;
}
