"use client";

import { motion } from "framer-motion";
import { Users, Code2, CheckCircle, ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";

export function ForWhomSection() {
  return (
    <section className="py-24 md:py-32" style={{ background: "#080e1f" }}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-14 text-center">
            <SectionLabel className="mb-3">Für wen</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Die richtige Lösung — für beide Seiten
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Für Unternehmen */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-colors hover:border-primary-500/30 hover:bg-white/[0.07]"
              style={{ backdropFilter: "blur(8px)" }}
            >
              {/* Top glow line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Für Unternehmen</h3>
              <ul className="mb-6 space-y-2">
                {[
                  "Vorgeprüfte Kandidaten, passend zu Ihrem Stack",
                  "Technisches Interview bereits absolviert",
                  "Erste Profile innerhalb von 48 Stunden",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-400">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/for-companies"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition hover:text-primary-300"
              >
                Mehr erfahren <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            {/* Für Entwickler */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-colors hover:border-primary-500/30 hover:bg-white/[0.07]"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Für Entwickler</h3>
              <ul className="mb-6 space-y-2">
                {[
                  "Qualitäts-Placements bei deutschen Tech-Unternehmen",
                  "Ein Recruiter, der Code wirklich versteht",
                  "Kein Spam — nur passende Positionen",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-400">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/developers"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition hover:text-primary-300"
              >
                Mehr erfahren <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
