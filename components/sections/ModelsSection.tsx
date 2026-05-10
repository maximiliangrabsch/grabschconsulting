"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Rocket, Users } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { CALENDLY_URL } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLanguage } from "@/lib/i18n";
import { useT } from "@/lib/translations";

const MODEL_ICONS = [Rocket, Users];

export function ModelsSection() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const models = [t.models.a, t.models.b];

  return (
    <section id="modelle" className="py-14 md:py-20" style={{ background: "#080e1f" }}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 text-center">
            <SectionLabel className="mb-3">{t.models.label}</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {t.models.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-neutral-400">{t.models.sub}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {models.map((model, i) => {
              const Icon = MODEL_ICONS[i];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-10 transition-all duration-300 hover:border-primary-500/40 hover:bg-white/[0.07]"
                  style={{ backdropFilter: "blur(12px)" }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div
                    className="pointer-events-none absolute right-0 top-0 h-32 w-32 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "radial-gradient(ellipse at top right, rgba(6,182,212,0.08) 0%, transparent 70%)" }}
                  />

                  <div className="mb-6 flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-900/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary-400">
                      {model.label}
                    </p>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold leading-snug text-white">{model.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-neutral-400">{model.desc}</p>

                  <ul className="mb-8 flex-1 space-y-2.5">
                    {model.bullets.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-base text-neutral-300">
                        <Check className="h-4 w-4 shrink-0 text-primary-400" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-500"
                  >
                    {model.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
