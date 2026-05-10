"use client";

import { motion } from "framer-motion";
import { Users, Globe, Wifi, Zap } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { useLanguage } from "@/lib/i18n";
import { useT } from "@/lib/translations";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ICONS = [Users, Globe, Wifi, Zap];

export function ForWhomSection() {
  const { lang } = useLanguage();
  const t = useT(lang);

  return (
    <section className="py-14 md:py-20" style={{ background: "#080e1f" }}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 text-center">
            <SectionLabel className="mb-3">{t.whyUs.label}</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              {t.whyUs.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-400">{t.whyUs.sub}</p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2">
            {t.whyUs.cards.map((card, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-primary-500/30 hover:bg-white/[0.07]"
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{card.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
