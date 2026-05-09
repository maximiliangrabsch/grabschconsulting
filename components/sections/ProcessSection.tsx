"use client";

import { motion } from "framer-motion";
import { Search, UserCheck, FileText, Rocket } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    Icon: Search,
    step: "01",
    title: "Projekt-Analyse",
    desc: "Anforderungen und Tech-Stack werden im Erstgespräch definiert.",
  },
  {
    Icon: UserCheck,
    step: "02",
    title: "Kandidaten-Vorstellung",
    desc: "Passende, vorgeprüfte Profile erhalten Sie innerhalb von 48h.",
  },
  {
    Icon: FileText,
    step: "03",
    title: "Vertragsschluss",
    desc: "Rechtssichere Verträge und alle administrativen Details inklusive.",
  },
  {
    Icon: Rocket,
    step: "04",
    title: "Onboarding",
    desc: "Begleitung beim Start – wir stehen jederzeit für Support bereit.",
  },
];

export function ProcessSection() {
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
            <SectionLabel className="mb-3">Der Prozess</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Vom Briefing zum Start — in 4 Schritten
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map(({ Icon, step, title, desc }, idx) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-primary-500/30 hover:bg-white/[0.07]"
                style={{ backdropFilter: "blur(8px)" }}
              >
                {/* connector line */}
                {idx < steps.length - 1 && (
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
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
