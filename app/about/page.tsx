"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Star, ArrowRight } from "lucide-react";
import { fadeUp, slideInLeft, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CALENDLY_URL } from "@/lib/constants";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { useT } from "@/lib/translations";
import { StatsSection } from "@/components/sections/StatsSection";

const VALUE_ICONS = [Heart, Star, Zap];

export default function About() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const a = t.about;

  return (
    <main className="antialiased">
      {/* Founder Hero */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "#080e1f" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary-700/15 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #080e1f)" }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid gap-10 lg:grid-cols-5 lg:gap-12"
          >
            {/* Founder Photo — first on mobile, right on desktop */}
            <motion.div
              variants={fadeUp}
              className="order-first flex items-center justify-center lg:order-last lg:col-span-2"
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  role="img"
                  aria-label={a.founderName}
                  className="h-[220px] w-[176px] sm:h-[300px] sm:w-[240px]"
                  style={{
                    borderRadius: "50%",
                    backgroundImage: "url('/maxbildwebsite.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "35% 15%",
                  }}
                />
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">{a.founderName}</p>
                  <p className="text-xs text-primary-400">{a.founderRole}</p>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div variants={slideInLeft} className="order-last lg:order-first lg:col-span-3">
              <SectionLabel>{a.label}</SectionLabel>
              <h1
                className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                {a.headline1}{" "}
                <span className="gradient-text">{a.headline2}</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-neutral-400 sm:text-lg">{a.sub}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
                >
                  {a.meetBtn}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
                >
                  {a.contactBtn}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section
        className="border-y py-14 md:py-20"
        style={{ background: "#080e1f", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <SectionLabel>{a.storyLabel}</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {a.storyHeadline}
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5 leading-relaxed text-neutral-400">
              <p>{a.storyP1}</p>
              <p>{a.storyP2}</p>
              <p>{a.storyP3}</p>
              <blockquote className="mt-6 border-l-2 border-primary-500 pl-5 text-primary-300 italic">
                &ldquo;{a.quote}&rdquo;
              </blockquote>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 md:py-20" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-8 text-center">
              <SectionLabel>{a.valuesLabel}</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {a.valuesHeadline}
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 md:grid-cols-3">
              {a.values.map(({ title, desc }, i) => {
                const Icon = VALUE_ICONS[i];
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-primary-500/30 hover:bg-white/[0.07]"
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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

      <StatsSection />

      {/* Contact CTA */}
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
              <span className="gradient-text">{a.ctaHeadline}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral-400">{a.ctaSub}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
              >
                {a.ctaBook}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
              >
                {a.ctaContact}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
