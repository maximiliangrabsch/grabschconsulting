"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { fadeUp, staggerFast } from "@/lib/animations";
import { CALENDLY_URL } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#080e1f",
        backgroundImage: "url('/hero-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(8,14,31,0.82)" }} />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: "220px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(8,14,31,0.6) 45%, rgba(8,14,31,0.9) 75%, #080e1f 100%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary-700/15 blur-3xl" />

      <div className="relative z-20 mx-auto max-w-5xl px-6 py-40 text-center md:py-56">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerFast}
          className="flex flex-col items-center gap-7"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
            {["100% Remote", "Alle Tech-Stacks", "10+ Jahre Erfahrung"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300"
              >
                <CheckCircle className="h-3.5 w-3.5 text-primary-400" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem]"
          >
            Ausgebildete Remote-Entwickler{" "}
            <span className="text-primary-400">für Ihr Projekt</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-md text-lg leading-relaxed text-neutral-400"
          >
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
  );
}
