"use client";

import { motion } from "framer-motion";
import { Brain, Server, Layers, Code2, Shield } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import RadialOrbitalTimeline, { type TimelineItem } from "@/components/ui/radial-orbital-timeline";

const techStacks: TimelineItem[] = [
  {
    id: 1,
    title: "AI / ML",
    date: "Expert",
    content: "Wir entwickeln intelligente Systeme, die aus Daten lernen und echten Mehrwert schaffen.",
    details: [
      "Entwicklung maßgeschneiderter ML-Modelle",
      "LLM-Integration & KI-Agenten",
      "Datenanalyse & Predictive Analytics",
      "NLP und Computer Vision",
    ],
    tags: ["Python", "PyTorch", "LangChain", "OpenAI", "Hugging Face"],
    category: "AI",
    icon: Brain,
    relatedIds: [2, 3],
    status: "completed",
    energy: 95,
  },
  {
    id: 2,
    title: "Backend",
    date: "Expert",
    content: "Robuste, skalierbare Server-Architekturen, die auch unter Last zuverlässig performen.",
    details: [
      "RESTful & GraphQL APIs",
      "Microservices & Event-Driven Architekturen",
      "Datenbankdesign (SQL & NoSQL)",
      "Cloud-Infrastruktur & DevOps",
    ],
    tags: ["Node.js", "Go", "Java", "PostgreSQL", "Docker", "Kubernetes"],
    category: "Backend",
    icon: Server,
    relatedIds: [1, 4],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Frontend",
    date: "Expert",
    content: "Moderne, performante Web-Applikationen mit exzellenter User Experience.",
    details: [
      "Komponentenbasierte UI-Entwicklung",
      "Server-Side Rendering & Static Generation",
      "State Management & Performance-Optimierung",
      "Responsive Design & Accessibility",
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    icon: Layers,
    relatedIds: [2, 4],
    status: "completed",
    energy: 88,
  },
  {
    id: 4,
    title: "Full-Stack",
    date: "Expert",
    content: "End-to-End-Entwicklung – vom Konzept bis zur produktionsreifen Anwendung.",
    details: [
      "Vollständige Produktentwicklung aus einer Hand",
      "API-Design & Frontend-Integration",
      "CI/CD-Pipelines & automatisierte Tests",
      "Cloud-Deployment & Monitoring",
    ],
    tags: ["Next.js", "Prisma", "tRPC", "Vercel", "AWS"],
    category: "Full-Stack",
    icon: Code2,
    relatedIds: [2, 3],
    status: "completed",
    energy: 85,
  },
  {
    id: 5,
    title: "Cyber Security",
    date: "Expert",
    content: "Wir identifizieren Schwachstellen bevor Angreifer es tun – und schließen sie nachhaltig.",
    details: [
      "Penetration Testing & Ethical Hacking",
      "Security Audits & Code Reviews",
      "SIEM-Implementierung & Monitoring",
      "Compliance (ISO 27001, DSGVO)",
    ],
    tags: ["Kali Linux", "Burp Suite", "SIEM", "OWASP", "Zero Trust"],
    category: "Security",
    icon: Shield,
    relatedIds: [1, 2],
    status: "completed",
    energy: 80,
  },
];

export function TechStackSection() {
  return (
    <section className="pt-12 md:pt-16 pb-4" style={{ background: "#080e1f" }}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-4 text-center">
            <SectionLabel className="mb-3">Tech-Expertise</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Alle modernen Stacks — abgedeckt
            </h2>
            <p className="mt-3 text-neutral-400">
              Von KI bis Cyber Security – fahren Sie mit der Maus über einen Bereich für Details.
            </p>
          </motion.div>
        </motion.div>

        <RadialOrbitalTimeline timelineData={techStacks} />
      </div>
    </section>
  );
}
