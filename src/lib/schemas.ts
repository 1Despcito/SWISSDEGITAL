import { z } from 'zod';
import { serviceSlugs } from '@/content/services';

export const budgetValues = ['lt5k', '5to15k', '15to50k', 'gt50k', 'notSure'] as const;
const budgetTuple = budgetValues as unknown as [string, ...string[]];
const serviceTuple = serviceSlugs as unknown as [string, ...string[]];

const optionalStr = (max: number) => z.string().max(max).optional().or(z.literal(''));

/** Full contact form (shared by the client form and the server route). */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'required').max(120),
  email: z.string().email('invalidEmail').max(200),
  company: optionalStr(160),
  service: z.enum(serviceTuple).optional().or(z.literal('')),
  budget: z.enum(budgetTuple).optional().or(z.literal('')),
  package: optionalStr(60),
  language: optionalStr(40),
  message: z.string().min(10, 'tooShort').max(4000),
  // Honeypot — must stay empty. Bots fill it.
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Server payload: full lead, newsletter signup, or chatbot lead. */
export const apiContactSchema = z.discriminatedUnion('intent', [
  contactFormSchema.extend({ intent: z.literal('lead') }),
  z.object({ intent: z.literal('newsletter'), email: z.string().email().max(200) }),
  z.object({ intent: z.literal('chat_lead'), email: z.string().email().max(200) }),
]);

export type ApiContactPayload = z.infer<typeof apiContactSchema>;
