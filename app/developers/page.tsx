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

const valueProps = [
  {
    Icon: ShieldCheck,
    title: "Kein Spam",
    desc: "Wir kontaktieren Sie nur mit Positionen, die wirklich zu Ihrem Stack und Ihren Zielen passen.",
  },
  {
    Icon: TrendingUp,
    title: "Marktgerechte Vergütung",
    desc: "Wir kennen den Markt und vertreten Ihren Wert klar gegenüber Unternehmen.",
  },
  {
    Icon: Building2,
    title: "Geprüfte Unternehmen",
    desc: "Jedes Unternehmen in unserem Netzwerk wird vorab auf Kultur, Prozesse und Remote-Reife geprüft.",
  },
];

const checksFit = [
  "3+ Jahre Entwicklungserfahrung",
  "Remote-Erfahrung vorhanden",
  "Eigenverantwortliches Arbeiten",
  "Kommunikation auf Deutsch oder Englisch",
];

const checksNiceToHave = [
  "Open-Source-Beiträge",
  "Stack-Flexibilität",
  "Startup-Erfahrung",
  "Agile-Kenntnisse",
];

const applySteps = [
  {
    Icon: Search,
    step: "01",
    title: "Profil einreichen",
    desc: "Kurzes Gespräch oder Profil einsenden — kein aufwendiger Bewerbungsprozess.",
  },
  {
    Icon: UserCheck,
    step: "02",
    title: "Technisches Gespräch",
    desc: "30-minütiges Video-Interview mit jemandem, der Ihren Code wirklich versteht.",
  },
  {
    Icon: Briefcase,
    step: "03",
    title: "Matchmaking",
    desc: "Vorstellung bei passenden Unternehmen — nur dort, wo es wirklich passt.",
  },
  {
    Icon: Rocket,
    step: "04",
    title: "Onboarding & Support",
    desc: "Begleitung beim Start und Ansprechpartner während der gesamten Zusammenarbeit.",
  },
];

export default function Developers() {
  return (
    <main className="antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden py-32 md:py-44" style={{ background: "#080e1f" }}>
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
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Für Entwickler</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-[3rem]"
            >
              Top-Placements bei{" "}
              <span className="gradient-text">deutschen Tech-Unternehmen</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-400"
            >
              Ein Recruiter, der Code versteht — und Ihren Marktwert kennt. Kein Spam,
              kein Druck, nur passende Positionen.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
              >
                Jetzt bewerben
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#requirements"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
              >
                Anforderungen prüfen
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 md:py-32" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <SectionLabel>Was wir bieten</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Mehr als eine Jobvermittlung
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 md:grid-cols-3">
              {valueProps.map(({ Icon, title, desc }) => (
                <motion.div
                  key={title}
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
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
      <section
        id="requirements"
        className="border-y py-24 md:py-32"
        style={{ background: "#080e1f", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <SectionLabel>Was wir suchen</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Passt MRG zu Ihnen?
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-8 md:grid-cols-2">
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                style={{ backdropFilter: "blur(8px)" }}
              >
                <h3 className="mb-4 font-semibold text-white">Perfekter Match</h3>
                <ul className="space-y-3">
                  {checksFit.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                style={{ backdropFilter: "blur(8px)" }}
              >
                <h3 className="mb-4 font-semibold text-white">Nice to have</h3>
                <ul className="space-y-3">
                  {checksNiceToHave.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-400">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-neutral-600">
                  Wir arbeiten mit Entwicklern aller Senioritätsstufen.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Application Steps */}
      <section className="py-24 md:py-32" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <SectionLabel>Der Ablauf</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Vom Profil zum Vertrag
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {applySteps.map(({ Icon, step, title, desc }, idx) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-primary-500/30"
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  {idx < applySteps.length - 1 && (
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

      <TechStackSection />

      {/* Apply CTA */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "#080e1f" }}>
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
              Bereit für Ihr{" "}
              <span className="gradient-text">nächstes Projekt?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral-400">
              Kurzes Gespräch genügt — kein aufwendiger Bewerbungsprozess.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
              >
                Jetzt bewerben
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
