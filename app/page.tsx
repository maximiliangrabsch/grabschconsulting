"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
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
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── Typing animation ─────────────────────────────────────────────────────────

function TypedCode({ code, isActive }: { code: string; isActive: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isActive) return;
    setDisplayed("");
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (i >= code.length) return;
      i++;
      setDisplayed(code.slice(0, i));
      timer = setTimeout(tick, 16);
    };

    const start = setTimeout(tick, 400);
    return () => { clearTimeout(start); clearTimeout(timer); };
  }, [isActive, code]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl p-5 select-none">
      <pre className="whitespace-pre-wrap break-words font-mono text-[9px] leading-[1.5] text-emerald-400/20">
        {displayed}
        {displayed.length < code.length && isActive && (
          <span className="animate-pulse text-emerald-400/40">▋</span>
        )}
      </pre>
    </div>
  );
}

// ── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    const start = Date.now();
    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Tech Stack card ───────────────────────────────────────────────────────────

interface TechStack {
  Icon: React.ElementType;
  title: string;
  desc: string;
  code: string;
}

function TechStackCard({ Icon, title, desc, code }: TechStack) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      whileHover={{ scale: 1.025, y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-primary-500/40 hover:bg-white/[0.08]"
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Typed code background */}
      <TypedCode code={code} isActive={isInView} />

      {/* Hover glow overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content sits above */}
      <div className="relative z-10">
        <motion.div
          className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600/80 text-white"
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <h3 className="mb-2 font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
      </div>
    </motion.div>
  );
}

// ── Why-Me card ───────────────────────────────────────────────────────────────

interface WhyMeItem {
  Icon: React.ElementType;
  title: string;
  desc: string;
  statValue: number;
  statSuffix: string;
  statLabel: string;
}

function WhyMeCard({ Icon, title, desc, statValue, statSuffix, statLabel }: WhyMeItem) {
  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-primary-500/30 hover:bg-white/[0.08]"
    >
      {/* Animated stat number */}
      <div className="mb-4 font-mono text-4xl font-bold tracking-tight text-primary-400">
        <AnimatedCounter value={statValue} suffix={statSuffix} />
      </div>

      {/* Icon with spring hover */}
      <motion.div
        className="mb-3 inline-flex h-10 w-10 cursor-default items-center justify-center rounded-lg bg-primary-600 text-white"
        whileHover={{ scale: 1.15, rotate: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 14 }}
      >
        <Icon className="h-5 w-5" />
      </motion.div>

      <h3 className="mb-1 font-semibold text-white">{title}</h3>
      <p className="mb-2 text-xs text-neutral-500">{statLabel}</p>
      <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
    </motion.div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const techStacks: TechStack[] = [
  {
    Icon: Brain,
    title: "AI / ML",
    desc: "Python, PyTorch, LangChain – KI und Machine Learning.",
    code: `model = nn.Sequential(
  nn.Linear(512, 256),
  nn.ReLU(),
  nn.Dropout(0.2),
  nn.Linear(256, 10)
)

for epoch in range(100):
  output = model(X_train)
  loss = loss_fn(output, y)
  optimizer.zero_grad()
  loss.backward()
  optimizer.step()`,
  },
  {
    Icon: Server,
    title: "Backend",
    desc: "Node.js, Go, Java – skalierbare APIs und Systeme.",
    code: `app.get('/api/users',
  async (req, res) => {
    const { page } = req.query
    const users = await db
      .users
      .findAll({ page })
    res.json({
      data: users,
      total: users.count
    })
  }
)`,
  },
  {
    Icon: Layers,
    title: "Frontend",
    desc: "React, Next.js, TypeScript – moderne Web-Applikationen.",
    code: `const Dashboard = () => {
  const [data, setData]
    = useState<Data>(null)

  useEffect(() => {
    api.get('/dashboard')
       .then(r => r.json())
       .then(setData)
  }, [])

  return (
    <Layout>
      <DataGrid data={data} />
    </Layout>
  )
}`,
  },
  {
    Icon: Code2,
    title: "Full-Stack",
    desc: "End-to-End-Entwicklung für Web und Cloud-Plattformen.",
    code: `export default async
function Page() {
  const projects = await
    prisma.project.findMany({
      where: { active: true },
      include: { team: true }
    })

  return (
    <main>
      <ProjectList
        data={projects}
      />
    </main>
  )
}`,
  },
];

const whyMe: WhyMeItem[] = [
  {
    Icon: Code2,
    title: "Erfahrenes Entwickler-Netzwerk",
    desc: "Etabliertes Netzwerk vorgeprüfter Teams – sofort verfügbar.",
    statValue: 50,
    statSuffix: "+",
    statLabel: "Entwickler im Netzwerk",
  },
  {
    Icon: Shield,
    title: "Technisches Screening",
    desc: "Jeder Kandidat wird persönlich technisch geprüft.",
    statValue: 100,
    statSuffix: "%",
    statLabel: "Kandidaten persönlich geprüft",
  },
  {
    Icon: Zap,
    title: "Schnelle Ergebnisse",
    desc: "Erste Kandidaten in 7 bis 14 Tagen.",
    statValue: 14,
    statSuffix: " Tage",
    statLabel: "bis zum ersten Kandidaten",
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
        <div className="absolute inset-0" style={{ background: "rgba(8,14,31,0.82)" }} />
        <div className="absolute inset-0 sm:hidden" style={{ background: "rgba(8,14,31,0.07)" }} />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
          style={{
            height: "220px",
            background: "linear-gradient(to bottom, transparent 0%, rgba(8,14,31,0.6) 45%, rgba(8,14,31,0.9) 75%, #080e1f 100%)",
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
              {techStacks.map((stack) => (
                <TechStackCard key={stack.title} {...stack} />
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
              {whyMe.map((item) => (
                <WhyMeCard key={item.title} {...item} />
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
            <Image
              src="/MRGconsulting.png"
              alt="MRG Consulting Logo"
              width={130}
              height={44}
              className="h-20 w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
            <div className="flex items-center gap-4 text-sm text-neutral-600">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-neutral-900"
              >
                Erstgespräch vereinbaren
              </a>
              <span className="text-neutral-400">·</span>
              <Link
                href="/impressum"
                className="underline underline-offset-2 transition hover:text-neutral-900"
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
