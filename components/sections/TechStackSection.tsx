"use client";

import { motion } from "framer-motion";
import { Brain, Server, Layers, Code2, Shield } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import RadialOrbitalTimeline, { type TimelineItem } from "@/components/ui/radial-orbital-timeline";
import { useLanguage } from "@/lib/i18n";
import { useT } from "@/lib/translations";

const STACK_ICONS = [Brain, Server, Layers, Code2, Shield];
const STACK_TAGS = [
  ["Python", "PyTorch", "LangChain", "OpenAI", "Hugging Face"],
  ["Node.js", "Go", "Java", "PostgreSQL", "Docker", "Kubernetes"],
  ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  ["Next.js", "Prisma", "tRPC", "Vercel", "AWS"],
  ["Kali Linux", "Burp Suite", "SIEM", "OWASP", "Zero Trust"],
];
const STACK_CATEGORIES = ["AI", "Backend", "Frontend", "Full-Stack", "Security"];
const STACK_RELATED = [[2, 3], [1, 4], [2, 4], [2, 3], [1, 2]];

export function TechStackSection() {
  const { lang } = useLanguage();
  const t = useT(lang);

  const techStacks: TimelineItem[] = t.tech.stacks.map((stack, i) => ({
    id: i + 1,
    title: stack.title,
    date: "Expert",
    content: stack.content,
    details: [...stack.details],
    tags: STACK_TAGS[i],
    category: STACK_CATEGORIES[i],
    icon: STACK_ICONS[i],
    relatedIds: STACK_RELATED[i],
    status: "completed" as const,
    energy: [95, 90, 88, 85, 80][i],
  }));

  return (
    <section className="py-14 md:py-20" style={{ background: "#080e1f" }}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-4 text-center">
            <SectionLabel className="mb-3">{t.tech.label}</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              {t.tech.headline}
            </h2>
            <p className="mt-3 text-neutral-400">{t.tech.sub}</p>
          </motion.div>
        </motion.div>

        <RadialOrbitalTimeline timelineData={techStacks} />
      </div>
    </section>
  );
}
