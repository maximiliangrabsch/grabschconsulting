"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Server, Layers, Code2 } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";

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
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [isActive, code]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl p-5 select-none">
      <pre className="whitespace-pre-wrap break-words font-mono text-[9px] leading-[1.5] text-accent-400/20">
        {displayed}
        {displayed.length < code.length && isActive && (
          <span className="animate-pulse text-accent-400/40">▋</span>
        )}
      </pre>
    </div>
  );
}

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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-primary-500/40 hover:bg-white/[0.08]"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <TypedCode code={code} isActive={isInView} />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600/80 text-white">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mb-2 font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
      </div>
    </motion.div>
  );
}

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

export function TechStackSection() {
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
            <SectionLabel className="mb-3">Tech-Expertise</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Alle modernen Stacks — abgedeckt
            </h2>
            <p className="mt-3 text-neutral-400">
              Von KI bis Full-Stack – wo immer Ihr Team wachsen muss.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {techStacks.map((stack) => (
              <TechStackCard key={stack.title} {...stack} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
