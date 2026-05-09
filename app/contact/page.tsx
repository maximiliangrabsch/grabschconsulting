"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACT_EMAIL, CONTACT_PHONE, CALENDLY_URL } from "@/lib/constants";

const ROLES = [
  "Startup-Gründer",
  "CTO/Tech-Lead",
  "HR/Recruiting",
  "Entwickler auf Jobsuche",
  "Investor",
  "Sonstiges",
] as const;

const contactSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen haben"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  company: z.string().optional(),
  role: z.enum(ROLES),
  message: z.string().min(20, "Nachricht muss mindestens 20 Zeichen haben"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputBase =
  "w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition focus:border-primary-500/60 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-primary-500/30";

const inputError = "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Fehler beim Senden");
      setSubmitted(true);
    } catch {
      setServerError("Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.");
    }
  }

  return (
    <main className="antialiased">
      <section className="relative overflow-hidden py-32 md:py-40" style={{ background: "#080e1f" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary-700/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mb-14 max-w-xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Kontakt</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
            >
              Schreiben Sie uns
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-neutral-400">
              Wir antworten in der Regel innerhalb von 24 Stunden.
            </motion.p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-accent-500/20 bg-accent-500/5 py-20 text-center"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
                      <CheckCircle className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">Vielen Dank!</h3>
                    <p className="max-w-xs text-neutral-400">
                      Wir haben Ihre Nachricht erhalten und melden uns bald bei Ihnen.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                          Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Ihr Name"
                          className={`${inputBase} ${errors.name ? inputError : ""}`}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                          E-Mail <span className="text-red-400">*</span>
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="ihre@email.de"
                          className={`${inputBase} ${errors.email ? inputError : ""}`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                        Unternehmen
                        <span className="ml-1 text-xs text-neutral-600">(optional)</span>
                      </label>
                      <input
                        {...register("company")}
                        placeholder="Optional"
                        className={inputBase}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                        Ich bin... <span className="text-red-400">*</span>
                      </label>
                      <select
                        {...register("role")}
                        className={`${inputBase} ${errors.role ? inputError : ""}`}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Bitte wählen
                        </option>
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                      {errors.role && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.role.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                        Nachricht <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Wie können wir Ihnen helfen?"
                        className={`${inputBase} resize-none ${errors.message ? inputError : ""}`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                      )}
                    </div>

                    {serverError && (
                      <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {serverError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? "Wird gesendet…" : "Nachricht senden"}
                      {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col gap-8 lg:col-span-2"
            >
              {/* Trust indicators */}
              <div className="space-y-4">
                {[
                  { Icon: Clock, label: "Antwort in 24h" },
                  { Icon: CheckCircle, label: "Kostenlos & unverbindlich" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-sm text-neutral-400">
                    <Icon className="h-4 w-4 shrink-0 text-primary-400" />
                    {label}
                  </div>
                ))}
              </div>

              <div
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                style={{ backdropFilter: "blur(8px)" }}
              >
                <h3 className="mb-4 font-semibold text-white">Direktkontakt</h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-3 text-sm text-neutral-400 transition hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                    {CONTACT_EMAIL}
                  </a>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-sm text-neutral-400 transition hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div
                className="rounded-2xl border border-primary-500/20 bg-primary-500/5 p-6"
                style={{ backdropFilter: "blur(8px)" }}
              >
                <p className="mb-3 text-sm text-neutral-400">
                  Lieber direkt ein Gespräch buchen?
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 transition hover:text-primary-300"
                >
                  Termin buchen <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
