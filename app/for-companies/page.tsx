"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Globe,
  FileCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { CALENDLY_URL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import { useT } from "@/lib/translations";

const SOLUTION_ICONS = [ShieldCheck, Clock, Globe, FileCheck];

export default function ForCompanies() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const fc = t.forCompanies;

  return (
    <main className="antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "#080e1f" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary-700/15 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #080e1f)" }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp}>
              <SectionLabel>{fc.label}</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-[3rem]"
            >
              {fc.headline1}{" "}
              <span className="gradient-text">{fc.headline2}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-400">
              {fc.sub}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
              >
                {fc.bookBtn}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#process"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
              >
                {fc.howBtn}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-14 md:py-20" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8 text-center">
              <SectionLabel>{fc.painLabel}</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{fc.painHeadline}</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 md:grid-cols-3">
              {fc.painPoints.map(({ title, desc }, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6"
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-14 md:py-20" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8 text-center">
              <SectionLabel>{fc.solutionLabel}</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{fc.solutionHeadline}</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2">
              {fc.solutions.map(({ title, desc }, i) => {
                const Icon = SOLUTION_ICONS[i];
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-primary-500/30 hover:bg-white/[0.07]"
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-white">{title}</h3>
                      <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div id="process">
        <ProcessSection />
      </div>
      <TechStackSection />
      <CtaSection />
    </main>
  );
}
