import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default('https://zendrix-riva.vercel.app'),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_RECEIVER_EMAIL: z.string().email().optional(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_RECEIVER_EMAIL: process.env.CONTACT_RECEIVER_EMAIL,
  NODE_ENV: process.env.NODE_ENV,
});
