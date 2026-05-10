"use client";

import { motion } from "framer-motion";
import { Search, UserCheck, FileText, Rocket } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLanguage } from "@/lib/i18n";
import { useT } from "@/lib/translations";

const STEP_ICONS = [Search, UserCheck, FileText, Rocket];

export function ProcessSection() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const p = t.process;

  return (
    <section className="py-14 md:py-20" style={{ background: "#080e1f" }}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-14 text-center">
            <SectionLabel className="mb-3">{p.label}</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              {p.headline}
            </h2>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.steps.map(({ step, title, desc }, idx) => {
              const Icon = STEP_ICONS[idx];
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-primary-500/30 hover:bg-white/[0.07]"
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  {idx < p.steps.length - 1 && (
                    <div className="absolute right-0 top-9 hidden h-px w-5 translate-x-full bg-gradient-to-r from-white/20 to-transparent lg:block" />
                  )}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xl font-bold text-white/20">{step}</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
