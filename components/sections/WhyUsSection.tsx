"use client";

import { motion } from "framer-motion";
import { Code2, Shield, Zap } from "lucide-react";
import { fadeUp, slideInLeft, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";

const features = [
  {
    Icon: Code2,
    title: "Technisches Screening",
    desc: "Jeder Kandidat durchläuft ein persönliches technisches Interview – kein Raten, kein Risiko.",
  },
  {
    Icon: Zap,
    title: "Schnelle Ergebnisse",
    desc: "Erste Kandidatenprofile in 48 Stunden, Onboarding in 14 Tagen.",
  },
  {
    Icon: Shield,
    title: "Remote-Kultur-Fit",
    desc: "Wir prüfen Kommunikation, Eigenverantwortung und Remote-Tauglichkeit.",
  },
];

export function WhyUsSection() {
  return (
    <section className="pt-8 md:pt-10 pb-24 md:pb-32" style={{ background: "#080e1f" }}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-12 lg:grid-cols-5"
        >
          {/* Left: editorial */}
          <motion.div variants={slideInLeft} className="lg:col-span-2">
            <SectionLabel className="mb-4">Warum MRG</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white">
              Was uns von klassischen Recruitern unterscheidet
            </h2>
            <p className="mt-5 leading-relaxed text-neutral-400">
              Klassische Recruiter sehen CVs. Wir sehen Code. Jeder Kandidat im MRG-Netzwerk
              hat ein persönliches technisches Interview absolviert — geführt von jemandem,
              der selbst entwickelt hat.
            </p>
            <p className="mt-4 leading-relaxed text-neutral-400">
              Das bedeutet für Sie: keine bösen Überraschungen, keine Kandidaten die auf dem
              Papier brillieren, aber im ersten Sprint scheitern.
            </p>
            <blockquote className="mt-6 border-l-2 border-primary-500 pl-4 text-primary-300 italic">
              "Qualität über Quantität — lieber drei perfekte Matches als zwanzig
              unpassende Profile."
            </blockquote>
          </motion.div>

          {/* Right: feature cards */}
          <motion.div variants={stagger} className="flex flex-col gap-4 lg:col-span-3">
            {features.map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-primary-500/30 hover:bg-white/[0.07]"
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
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
