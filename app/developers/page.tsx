"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Building2,
  CheckCircle,
  ArrowRight,
  UserCheck,
  Briefcase,
  Rocket,
  Search,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { CALENDLY_URL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import { useT } from "@/lib/translations";

const VALUE_ICONS = [ShieldCheck, TrendingUp, Building2];
const STEP_ICONS = [Search, UserCheck, Briefcase, Rocket];

export default function Developers() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const d = t.developers;

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
              <SectionLabel>{d.label}</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-[3rem]"
            >
              {d.headline1}{" "}
              <span className="gradient-text">{d.headline2}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-400">
              {d.sub}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
              >
                {d.applyBtn}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#requirements"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
              >
                {d.checkBtn}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-14 md:py-20" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8 text-center">
              <SectionLabel>{d.valueLabel}</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{d.valueHeadline}</h2>
              <p className="mx-auto mt-4 max-w-xl text-neutral-400">{d.valueSub}</p>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 md:grid-cols-3">
              {d.valueProps.map(({ title, desc }, i) => {
                const Icon = VALUE_ICONS[i];
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-primary-500/30 hover:bg-white/[0.07]"
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
                      <Icon className="h-5 w-5" />
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

      {/* Requirements */}
      <section
        id="requirements"
        className="border-y py-14 md:py-20"
        style={{ background: "#080e1f", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8 text-center">
              <SectionLabel>{d.requireLabel}</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{d.requireHeadline}</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-8 md:grid-cols-2">
              <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6" style={{ backdropFilter: "blur(8px)" }}>
                <h3 className="mb-4 font-semibold text-white">{d.fitTitle}</h3>
                <ul className="space-y-3">
                  {d.checksFit.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6" style={{ backdropFilter: "blur(8px)" }}>
                <h3 className="mb-4 font-semibold text-white">{d.niceTitle}</h3>
                <ul className="space-y-3">
                  {d.checksNiceToHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-400">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-neutral-600">{d.seniorityNote}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Application Steps */}
      <section className="py-14 md:py-20" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8 text-center">
              <SectionLabel>{d.processLabel}</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{d.processHeadline}</h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {d.applySteps.map(({ step, title, desc }, idx) => {
                const Icon = STEP_ICONS[idx];
                return (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-primary-500/30"
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    {idx < d.applySteps.length - 1 && (
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

      <TechStackSection />

      {/* Apply CTA */}
      <section className="relative overflow-hidden py-14 md:py-20" style={{ background: "#080e1f" }}>
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)" }}
        />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-col items-center gap-6"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {d.ctaHeadline1}{" "}
              <span className="gradient-text">{d.ctaHeadline2}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral-400">{d.ctaSub}</motion.p>
            <motion.div variants={fadeUp}>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
              >
                {d.ctaBtn}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
