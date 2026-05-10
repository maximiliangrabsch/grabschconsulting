"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useLanguage } from "@/lib/i18n";
import { useT } from "@/lib/translations";

export function StatsSection() {
  const { lang } = useLanguage();
  const t = useT(lang);

  return (
    <section
      className="border-y"
      style={{ background: "#080e1f", borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}
        >
          {t.stats.items.map(({ value, suffix, label }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center py-8 text-center sm:px-8 sm:py-0"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <span className="gradient-text font-mono text-4xl font-bold tracking-tight md:text-5xl">
                <AnimatedCounter value={value} suffix={suffix} />
              </span>
              <span className="mt-2 text-sm text-neutral-500">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
