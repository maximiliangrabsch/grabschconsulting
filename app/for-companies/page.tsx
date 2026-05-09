"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  FileCheck,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { CALENDLY_URL } from "@/lib/constants";

const painPoints = [
  {
    title: "Ungeprüfte Kandidaten",
    desc: "CVs sagen wenig über echte Code-Qualität aus. Klassische Recruiter können das nicht beurteilen.",
  },
  {
    title: "Lange Suchdauer",
    desc: "Klassische Vermittler brauchen Monate. Ihr Team braucht Verstärkung jetzt.",
  },
  {
    title: "Kulturelle Fehlbesetzungen",
    desc: "Remote-Tauglichkeit wird systematisch unterschätzt — mit teuren Folgen.",
  },
];

const solutions = [
  {
    Icon: ShieldCheck,
    title: "Technisches Screening",
    desc: "Jeder Kandidat absolviert ein persönliches Code-Review und Live-Interview. Keine Überraschungen nach dem Onboarding.",
  },
  {
    Icon: Clock,
    title: "Schnelle Lieferung",
    desc: "Erste Profile innerhalb von 48 Stunden. Onboarding-Start in der Regel in unter 14 Tagen.",
  },
  {
    Icon: Globe,
    title: "Remote-Kultur-Fit",
    desc: "Wir prüfen Async-Kommunikation, Zeitzonenkompetenz und Eigenverantwortung — nicht nur den Stack.",
  },
  {
    Icon: FileCheck,
    title: "Vertragsabwicklung",
    desc: "Rechtssichere Verträge, Abrechnung und administrativer Support inklusive — ohne Mehraufwand für Ihr Team.",
  },
];

export default function ForCompanies() {
  return (
    <main className="antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden py-32 md:py-44" style={{ background: "#080e1f" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary-700/15 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{
            background: "linear-gradient(to bottom, transparent, #080e1f)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Für Unternehmen</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-[3rem]"
            >
              Vorgeprüfte Remote-Entwickler{" "}
              <span className="gradient-text">für Ihr Team</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-400"
            >
              Kein Raten, kein Risiko — jeder Kandidat hat ein technisches Interview
              absolviert und ist remote-erfahren.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
              >
                Gespräch buchen
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#process"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
              >
                Wie es funktioniert
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 md:py-32" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <SectionLabel>Das Problem</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Recruiting kostet Zeit, die Ihr Team nicht hat.
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 md:grid-cols-3">
              {painPoints.map(({ title, desc }) => (
                <motion.div
                  key={title}
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
      <section className="py-24 md:py-32" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <SectionLabel>Unsere Lösung</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Was Sie von MRG bekommen
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2">
              {solutions.map(({ Icon, title, desc }) => (
                <motion.div
                  key={title}
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
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Trust */}
      <section className="py-24 md:py-32" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10 text-center">
              <SectionLabel>Vertrauen</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Unternehmen, die auf MRG vertrauen
              </h2>
            </motion.div>

            {/* Logo placeholder row */}
            <motion.div
              variants={stagger}
              className="mb-10 grid grid-cols-3 gap-4 sm:grid-cols-6"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
                >
                  <Users className="h-5 w-5 text-neutral-700" />
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonial */}
            <motion.blockquote
              variants={fadeUp}
              className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <p className="text-lg leading-relaxed text-neutral-300 italic">
                &ldquo;MRG hat uns in 10 Tagen zwei hervorragende Entwickler vermittelt — beide
                haben das technische Interview mit Auszeichnung bestanden.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-neutral-500">
                — CTO, deutsches SaaS-Unternehmen
              </footer>
            </motion.blockquote>
          </motion.div>
        </div>
      </section>

      {/* Reuse shared sections */}
      <div id="process">
        <ProcessSection />
      </div>
      <TechStackSection />
      <CtaSection />
    </main>
  );
}
