"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle,
  Code2,
  Users,
  Zap,
  Shield,
  Brain,
  Server,
  Layers,
  ArrowRight,
  Search,
  UserCheck,
  FileText,
  Rocket,
} from "lucide-react";

const CALENDLY_URL = "https://calendly.com/max-developer-consult/30min";



// ── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Data ─────────────────────────────────────────────────────────────────────

const techStacks = [
  { Icon: Brain,  title: "AI / ML",    desc: "Python, PyTorch, LangChain – KI und Machine Learning." },
  { Icon: Server, title: "Backend",    desc: "Node.js, Go, Java – skalierbare APIs und Systeme." },
  { Icon: Layers, title: "Frontend",   desc: "React, Next.js, TypeScript – moderne Web-Applikationen." },
  { Icon: Code2,  title: "Full-Stack", desc: "End-to-End-Entwicklung für Web und Cloud-Plattformen." },
];

const whyMe = [
  {
    Icon: Code2,
    title: "Erfahrenes Entwickler-Netzwerk",
    desc: "Etabliertes Netzwerk vorgeprüfter Teams – sofort verfügbar.",
  },
  {
    Icon: Shield,
    title: "Technisches Screening",
    desc: "Jeder Kandidat wird persönlich technisch geprüft.",
  },
  {
    Icon: Zap,
    title: "Schnelle Ergebnisse",
    desc: "Erste Kandidaten in 7 bis 14 Tagen.",
  },
];

const process = [
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

// ── Gradient helpers ─────────────────────────────────────────────────────────
//
// Page flows dark → light:
//   #080e1f  hero
//   #10102a  für wen
//   #1a1a2e  prozess
//   #22223a  tech stacks
//   #2d2d46  warum ich
//   #3a3a58  cta
//   #e8e8f0  footer

const G = {
  hero:      { background: "#080e1f" },
  fuerWen:   { background: "linear-gradient(to bottom, #080e1f, #10102a)" },
  prozess:   { background: "linear-gradient(to bottom, #10102a, #1a1a2e)" },
  techStack: { background: "linear-gradient(to bottom, #1a1a2e, #22223a)" },
  warum:     { background: "linear-gradient(to bottom, #22223a, #2d2d46)" },
  cta:       { background: "linear-gradient(to bottom, #2d2d46, #3a3a58)" },
  footer:    { background: "#e8e8f0" },
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="text-white antialiased">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#080e1f",
          backgroundImage: "url('/hero-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Base dark overlay for readability */}
        <div className="absolute inset-0" style={{ background: "rgba(8,14,31,0.82)" }} />
        {/* Mobile: slightly heavier */}
        <div className="absolute inset-0 sm:hidden" style={{ background: "rgba(8,14,31,0.07)" }} />
        {/* Bottom fade — blends the image into the next section (#080e1f) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
          style={{
            height: "220px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(8,14,31,0.6) 45%, rgba(8,14,31,0.9) 75%, #080e1f 100%)",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary-700/15 blur-3xl" />

        <div className="relative z-20 mx-auto max-w-5xl px-6 py-36 text-center md:py-52">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center gap-7">

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
              {["100% Remote", "Alle Tech-Stacks", "10+ Jahre Erfahrung"].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
                  <CheckCircle className="h-3.5 w-3.5 text-primary-400" />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.h1 variants={fadeUp} className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
              Ausgebildete Remote-Entwickler{" "}
              <span className="text-primary-400">für Ihr Projekt</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="max-w-md text-lg leading-relaxed text-neutral-400">
              Aus unserem Netzwerk erfahrener Entwickler – schnell, kompetent und zuverlässig.
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-500 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080e1f]"
              >
                Entwickler finden
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── Für wen ───────────────────────────────────────────────────── */}
      <section style={G.fuerWen} className="pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={stagger} className="grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="mb-3 text-xl font-semibold text-white">Für Unternehmen</h2>
              <p className="text-neutral-400 leading-relaxed">
                Vorgeprüfte Remote-Entwickler, passend zu Stack und Kultur. Jeder Kandidat hat ein technisches Interview absolviert – keine Überraschungen.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
                <Code2 className="h-5 w-5" />
              </div>
              <h2 className="mb-3 text-xl font-semibold text-white">Für Entwickler</h2>
              <p className="text-neutral-400 leading-relaxed">
                Qualitäts-Placements bei deutschen Tech-Unternehmen. Ich verstehe Ihren CV und Ihre Ziele – kein Recruiter, der Code nicht lesen kann.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Prozess ───────────────────────────────────────────────────── */}
      <section style={G.prozess} className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                So funktioniert Remote Hiring mit uns
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {process.map(({ Icon, step, title, desc }, idx) => (
                <motion.div key={title} variants={fadeUp} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
                  {idx < process.length - 1 && (
                    <div className="absolute right-0 top-9 hidden h-px w-5 translate-x-full bg-white/15 lg:block" />
                  )}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold text-white/20">{step}</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Tech Stacks ───────────────────────────────────────────────── */}
      <section style={G.techStack} className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Wir decken alle modernen Tech-Stacks ab
              </h2>
              <p className="mt-3 text-neutral-400">Von KI bis Full-Stack – wo immer Ihr Team wachsen muss.</p>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {techStacks.map(({ Icon, title, desc }) => (
                <motion.div key={title} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.08]">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600/80 text-white">
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

      {/* ── Warum ich ─────────────────────────────────────────────────── */}
      <section style={G.warum} className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Warum mit mir arbeiten
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 md:grid-cols-3">
              {whyMe.map(({ Icon, title, desc }) => (
                <motion.div key={title} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
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

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section style={G.cta} className="py-28 md:py-36">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={stagger} className="flex flex-col items-center gap-6"
          >
            <motion.h2 variants={fadeUp} className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Ihr Projekt wartet nicht.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-neutral-300">
              15-Minuten-Gespräch – kostenlos und unverbindlich.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-500 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3a3a58]"
              >
                Termin buchen
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer style={G.footer} className="py-3">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            {/* Logo */}
            <Image
              src="/MRGconsulting.png"
              alt="MRG Consulting Logo"
              width={130}
              height={44}
              className="h-20 w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
            />

            {/* Links */}
            <div className="flex items-center gap-4 text-sm text-neutral-600">
              <a
                href="https://calendly.com/max-developer-consult/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-neutral-900"
              >
                Erstgespräch vereinbaren
              </a>
              <span className="text-neutral-400">·</span>
              <Link
                href="/impressum"
                className="transition hover:text-neutral-900 underline underline-offset-2"
              >
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
