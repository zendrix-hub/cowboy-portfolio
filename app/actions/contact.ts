'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(120),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1500),
  _honeypot: z.string().optional(),
  _startedAt: z.string().optional(),
});

export type ContactFormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    _honeypot: formData.get('_honeypot'),
    _startedAt: formData.get('_startedAt'),
  };

  // 1. Honeypot check: If bot populated hidden field, silently return success without processing
  if (rawData._honeypot) {
    return {
      success: true,
      message: "Thank you for reaching out! I will get back to you shortly.",
    };
  }

  // 2. Fast-submission bot check (< 1.5 seconds)
  if (rawData._startedAt) {
    const started = parseInt(rawData._startedAt as string, 10);
    if (!isNaN(started) && Date.now() - started < 1500) {
      return {
        success: true,
        message: "Thank you for reaching out! I will get back to you shortly.",
      };
    }
  }

  // 3. Schema validation
  const validation = contactSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      message: "Please review and correct the highlighted fields.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = validation.data;

  // 4. Dispatch Email or Log
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_RECEIVER_EMAIL || 'rivazendrix@gmail.com',
        replyTo: email,
        subject: `[Portfolio] ${subject} - from ${name}`,
        text: `From: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
      });
    } else {
      console.log(`[Contact Message Received] From: ${name} <${email}> | Subject: ${subject}`);
    }

    return {
      success: true,
      message: "Message sent successfully! Thank you for getting in touch.",
    };
  } catch (error) {
    console.error("[Contact Action Error]", error);
    return {
      success: false,
      message: "Unable to send message directly right now. Please email me at rivazendrix@gmail.com.",
    };
  }
}
