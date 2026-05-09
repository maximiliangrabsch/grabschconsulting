"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Star, ArrowRight } from "lucide-react";
import { fadeUp, slideInLeft, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatsSection } from "@/components/sections/StatsSection";
import { CALENDLY_URL } from "@/lib/constants";
import Link from "next/link";

const values = [
  {
    Icon: Heart,
    title: "Ehrlichkeit",
    desc: "Klare Kommunikation, keine leeren Versprechen. Wir sagen, was möglich ist — und halten, was wir sagen.",
  },
  {
    Icon: Star,
    title: "Qualität",
    desc: "Lieber drei perfekte Matches als zwanzig unpassende Profile. Qualität vor Quantität.",
  },
  {
    Icon: Zap,
    title: "Geschwindigkeit",
    desc: "Erste Profile in Tagen, nicht Wochen. Ihr Projekt kann nicht warten — wir auch nicht.",
  },
];

export default function About() {
  return (
    <main className="antialiased">
      {/* Founder Hero */}
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
            className="grid gap-12 lg:grid-cols-5"
          >
            {/* Text */}
            <motion.div variants={slideInLeft} className="lg:col-span-3">
              <SectionLabel>Über MRG Consulting</SectionLabel>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                Recruiting von einem Entwickler —{" "}
                <span className="gradient-text">für Entwickler.</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-neutral-400">
                Maximilian Grabsch gründete MRG Consulting mit einem klaren Ziel: Technisches
                Talent und Unternehmen zusammenbringen — ohne Umwege und ohne Recruiter,
                die Code nicht lesen können.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
                >
                  Kennenlernen
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
                >
                  Kontakt aufnehmen
                </Link>
              </div>
            </motion.div>

            {/* Photo placeholder */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center lg:col-span-2"
            >
              <div
                className="flex h-64 w-64 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-neutral-600"
                style={{ backdropFilter: "blur(8px)" }}
              >
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600/20 text-primary-400">
                    <span className="text-2xl font-bold">MG</span>
                  </div>
                  <p className="text-xs text-neutral-600">Maximilian Grabsch</p>
                  <p className="text-xs text-neutral-700">Gründer, MRG Consulting</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section
        className="border-y py-24 md:py-32"
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
              <SectionLabel>Die Geschichte</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Warum MRG?
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5 leading-relaxed text-neutral-400">
              <p>
                Als Entwickler hat Maximilian Grabsch jahrelang erlebt, wie klassisches
                Recruiting funktioniert — oder eben nicht. Recruiter, die Stacks verwechseln.
                Unternehmen, die Monate auf Kandidaten warten. Entwickler, die Spam-Nachrichten
                mit völlig unpassenden Positionen erhalten.
              </p>
              <p>
                Die Lösung war klar: Ein Recruiting-Service, bei dem jemand die technische
                Seite wirklich versteht. Jemand, der selbst Code geschrieben hat, Interviews
                führt, die etwas bedeuten, und Matches findet, die wirklich funktionieren.
              </p>
              <p>
                MRG Consulting wurde mit dem Anspruch gegründet, dass jeder Kandidat im
                Netzwerk persönlich geprüft wird — und jedes Unternehmen vorab auf
                Remote-Reife und Teamkultur bewertet wird.
              </p>

              <blockquote className="mt-6 border-l-2 border-primary-500 pl-5 text-primary-300 italic">
                &ldquo;Ein guter Entwickler ist nicht derjenige mit dem besten CV — sondern
                derjenige, der zum Team und zum Problem passt.&rdquo;
              </blockquote>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32" style={{ background: "#080e1f" }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <SectionLabel>Unsere Werte</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Was uns antreibt
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 md:grid-cols-3">
              {values.map(({ Icon, title, desc }) => (
                <motion.div
                  key={title}
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
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <StatsSection />

      {/* Contact CTA */}
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
              <span className="gradient-text">Lernen Sie uns kennen</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral-400">
              Ein kurzes Gespräch reicht — kostenlos und unverbindlich.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
              >
                Termin buchen
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/30 hover:text-white"
              >
                Schreiben Sie uns
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
