"use client";

import { useActionState, useState } from "react";
import { sendContactMessage, type ContactFormState } from "@/app/actions/contact";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const initialState: ContactFormState = {};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);
  const [startedAt, setStartedAt] = useState<string>("");

  const handleInteraction = () => {
    if (!startedAt) {
      setStartedAt(Date.now().toString());
    }
  };

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-white/90 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-3.5 rounded-full bg-cyan-500" />
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
          Send a Direct Message
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
        Have a project in mind, an internship or full-time opportunity, or want to talk systems engineering? Send a message directly to my inbox.
      </p>

      {/* Success Notification */}
      {state.success && (
        <div
          role="status"
          className="mb-6 p-4 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}

      {/* General Error Notification */}
      {!state.success && state.message && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-rose-50/90 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-start gap-3 text-rose-800 dark:text-rose-300 text-xs sm:text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} onFocus={handleInteraction} className="space-y-4">
        {/* Anti-spam hidden honeypot and timestamp */}
        <input
          type="text"
          name="_honeypot"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <input type="hidden" name="_startedAt" value={startedAt} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Your Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              suppressHydrationWarning
              placeholder="Alex Cruz"
              disabled={isPending}
              className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-950/60 border ${
                state.errors?.name
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-cyan-500"
              } text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all`}
            />
            {state.errors?.name && (
              <p className="mt-1 text-[11px] text-rose-500 dark:text-rose-400 font-mono">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Your Email <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              suppressHydrationWarning
              placeholder="alex@example.com"
              disabled={isPending}
              className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-950/60 border ${
                state.errors?.email
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-cyan-500"
              } text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all`}
            />
            {state.errors?.email && (
              <p className="mt-1 text-[11px] text-rose-500 dark:text-rose-400 font-mono">
                {state.errors.email[0]}
              </p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            Subject <span className="text-cyan-600 dark:text-cyan-400">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            suppressHydrationWarning
            placeholder="Software Engineering Opportunity / Collaboration"
            disabled={isPending}
            className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-950/60 border ${
              state.errors?.subject
                ? "border-rose-500 focus:ring-rose-500"
                : "border-zinc-200 dark:border-zinc-800 focus:border-cyan-500"
            } text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all`}
          />
          {state.errors?.subject && (
            <p className="mt-1 text-[11px] text-rose-500 dark:text-rose-400 font-mono">
              {state.errors.subject[0]}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            Message <span className="text-cyan-600 dark:text-cyan-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            suppressHydrationWarning
            placeholder="Hi Zendrix, I noticed your work on PlayIT and offline-first mobile architecture..."
            disabled={isPending}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-950/60 border ${
              state.errors?.message
                ? "border-rose-500 focus:ring-rose-500"
                : "border-zinc-200 dark:border-zinc-800 focus:border-cyan-500"
            } text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-y`}
          />
          {state.errors?.message && (
            <p className="mt-1 text-[11px] text-rose-500 dark:text-rose-400 font-mono">
              {state.errors.message[0]}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          suppressHydrationWarning
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-zinc-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
