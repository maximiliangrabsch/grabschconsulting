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
import { useLanguage } from "@/lib/i18n";
import { useT } from "@/lib/translations";
import { WhatsAppBox } from "@/components/ui/WhatsAppBox";

const ROLE_VALUES = [
  "Startup-Gründer",
  "CTO/Tech-Lead",
  "HR/Recruiting",
  "Entwickler auf Jobsuche",
  "Investor",
  "Sonstiges",
] as const;

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  role: z.enum(ROLE_VALUES),
  message: z.string().min(20),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputBase =
  "w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition focus:border-primary-500/60 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-primary-500/30";

const inputError = "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { lang } = useLanguage();
  const t = useT(lang);
  const c = t.contact;

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
      if (!res.ok) throw new Error("error");
      setSubmitted(true);
    } catch {
      setServerError(c.serverError);
    }
  }

  return (
    <main className="antialiased">
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "#080e1f" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary-700/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-14 max-w-xl">
            <motion.div variants={fadeUp}>
              <SectionLabel>{c.label}</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
            >
              {c.headline}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-neutral-400">
              {c.sub}
            </motion.p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-primary-500/20 bg-primary-500/5 py-20 text-center"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/20 text-primary-400">
                      <CheckCircle className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">{c.successTitle}</h3>
                    <p className="max-w-xs text-neutral-400">{c.successMsg}</p>
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
                          {c.nameLabel} <span className="text-red-400">*</span>
                        </label>
                        <input
                          {...register("name")}
                          placeholder={c.namePlaceholder}
                          className={`${inputBase} ${errors.name ? inputError : ""}`}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-400">{c.nameError}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                          {c.emailLabel} <span className="text-red-400">*</span>
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder={c.emailPlaceholder}
                          className={`${inputBase} ${errors.email ? inputError : ""}`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-400">{c.emailError}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                        {c.companyLabel}
                        <span className="ml-1 text-xs text-neutral-600">{c.companyOptional}</span>
                      </label>
                      <input
                        {...register("company")}
                        placeholder={c.companyPlaceholder}
                        className={inputBase}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                        {c.roleLabel} <span className="text-red-400">*</span>
                      </label>
                      <select
                        {...register("role")}
                        className={`${inputBase} ${errors.role ? inputError : ""}`}
                        defaultValue=""
                      >
                        <option value="" disabled>{c.rolePlaceholder}</option>
                        {c.roles.map((r) => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                      {errors.role && (
                        <p className="mt-1.5 text-xs text-red-400">{c.rolePlaceholder}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                        {c.messageLabel} <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder={c.messagePlaceholder}
                        className={`${inputBase} resize-none ${errors.message ? inputError : ""}`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400">{c.messageError}</p>
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
                      {isSubmitting ? c.submitSending : c.submitBtn}
                      {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right column: WhatsApp + contact info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col gap-5"
            >
              <WhatsAppBox />

              <div
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                style={{ backdropFilter: "blur(8px)" }}
              >
                <h3 className="mb-4 font-semibold text-white">{c.directTitle}</h3>
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
                <div className="mb-3 flex items-center gap-3 text-sm text-neutral-400">
                  <Clock className="h-4 w-4 shrink-0 text-primary-400" />
                  {c.trust[0]}
                </div>
                <p className="mb-3 text-sm text-neutral-400">{c.calendarText}</p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 transition hover:text-primary-300"
                >
                  {c.calendarBtn} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
