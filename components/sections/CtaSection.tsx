"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { CALENDLY_URL } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36" style={{ background: "#080e1f" }}>
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.13) 0%, transparent 70%)",
        }}
      />

      {/* Top gradient rule */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col items-center gap-6"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-semibold tracking-tight text-white md:text-5xl"
          >
            Ihr nächstes Projekt beginnt{" "}
            <span className="gradient-text">heute.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg text-neutral-400">
            Kostenloses 15-Minuten-Gespräch.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-500 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080e1f]"
            >
              Termin buchen
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
            >
              Über uns
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
