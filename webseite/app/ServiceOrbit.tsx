"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  Bot,
  DatabaseBackup,
  LayoutTemplate,
  Server,
  ShieldCheck,
  Code2,
  type LucideIcon,
} from "lucide-react";

type Service = {
  title: string;
  text: string;
  tags: string[];
  icon: LucideIcon;
};

const SERVICES: Service[] = [
  {
    title: "KI-Automationen",
    text: "Wiederkehrende Aufgaben an KI abgeben – E-Mails, Dokumente, Datenpflege und ganze Workflows.",
    tags: ["LLMs", "Agents", "n8n"],
    icon: Bot,
  },
  {
    title: "Backup-Lösungen",
    text: "Automatisierte, verschlüsselte Backups mit getesteter Wiederherstellung für den Ernstfall.",
    tags: ["3-2-1", "S3", "Monitoring"],
    icon: DatabaseBackup,
  },
  {
    title: "Backend",
    text: "Robuste APIs, Datenbanken und Schnittstellen, die Ihre Systeme zuverlässig verbinden.",
    tags: ["Node.js", "Python", "PostgreSQL"],
    icon: Server,
  },
  {
    title: "UI/UX",
    text: "Oberflächen, die Ihre Nutzer verstehen – klar, schnell und auf jedem Gerät.",
    tags: ["Figma", "React", "Tailwind"],
    icon: LayoutTemplate,
  },
  {
    title: "Development",
    text: "Individuelle Web-Apps und interne Tools – von der Idee bis zum laufenden Betrieb.",
    tags: ["Next.js", "TypeScript", "AWS"],
    icon: Code2,
  },
  {
    title: "Security",
    text: "Sichere Architektur, Zugriffskonzepte und Härtung Ihrer bestehenden Systeme.",
    tags: ["OWASP", "Zero Trust", "Audits"],
    icon: ShieldCheck,
  },
];

// Karte öffnet sich immer Richtung Kreismitte, damit sie im Bild bleibt.
function cardPlacement(dx: number, dy: number): CSSProperties {
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx > 0
      ? { right: "2.25rem", top: 0, transform: "translateY(-50%)" }
      : { left: "2.25rem", top: 0, transform: "translateY(-50%)" };
  }
  return dy > 0
    ? { bottom: "2.25rem", left: 0, transform: "translateX(-50%)" }
    : { top: "3.75rem", left: 0, transform: "translateX(-50%)" };
}

export function ServiceOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [placement, setPlacement] = useState<CSSProperties>({});

  useEffect(() => {
    if (active === null) return;
    function close(e: PointerEvent) {
      if (!(e.target as Element).closest?.("button[aria-expanded]")) setActive(null);
    }
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [active]);

  function open(i: number, el: HTMLElement) {
    const orbit = orbitRef.current?.getBoundingClientRect();
    const icon = el.getBoundingClientRect();
    if (orbit) {
      const dx = icon.left + icon.width / 2 - (orbit.left + orbit.width / 2);
      const dy = icon.top + icon.width / 2 - (orbit.top + orbit.height / 2);
      setPlacement(cardPlacement(dx, dy));
    }
    setActive(i);
  }

  return (
    <div
      ref={orbitRef}
      className="orbit relative aspect-square w-full max-w-[34rem]"
      data-paused={active !== null || undefined}
      onMouseLeave={() => setActive(null)}
    >
      {/* Ringe */}
      <div className="absolute inset-[8%] rounded-full border border-white/15" />
      <div className="absolute inset-[30%] rounded-full border border-dashed border-white/10" />

      {/* Zentrum */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="absolute h-28 w-28 animate-ping rounded-full border border-ember-500/30 motion-reduce:hidden" />
        <Image
          src="/logorund.png"
          alt="MRG Consulting"
          width={224}
          height={224}
          priority
          className="relative h-20 w-20 rounded-full shadow-[0_0_70px_-8px] shadow-ember-500/70 sm:h-28 sm:w-28"
        />
      </div>

      {/* Rotierende Knoten */}
      <div className="orbit-spin absolute inset-0">
        {SERVICES.map((service, i) => {
          const angle = (360 / SERVICES.length) * i;
          const isActive = active === i;
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{
                transform: `rotate(${angle}deg) translateY(calc(var(--orbit-r) * -1)) rotate(${-angle}deg)`,
                zIndex: isActive ? 20 : 1,
              }}
            >
              <div className="orbit-counter relative h-0 w-0">
                <button
                  type="button"
                  // Maus: Hover öffnet. Touch: Tippen öffnet/schließt.
                  // Tastatur: Fokus öffnet (nur bei sichtbarem Fokus, sonst
                  // würde Tippen erst per Fokus öffnen und per Klick schließen).
                  onPointerEnter={(e) => e.pointerType === "mouse" && open(i, e.currentTarget)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                  onFocus={(e) => e.currentTarget.matches(":focus-visible") && open(i, e.currentTarget)}
                  onBlur={() => setActive(null)}
                  onClick={(e) => (isActive ? setActive(null) : open(i, e.currentTarget))}
                  aria-expanded={isActive}
                  className="group absolute left-0 top-0 flex -translate-x-1/2 -translate-y-6 flex-col items-center gap-2 outline-none"
                >
                  <span
                    className={[
                      "flex h-11 w-11 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-200 sm:h-12 sm:w-12",
                      isActive
                        ? "scale-125 border-ember-400 bg-ember-500 text-ink"
                        : "border-white/25 bg-ink/80 text-white group-hover:border-ember-400/60 group-focus-visible:border-ember-400",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span
                    className={[
                      "whitespace-nowrap rounded-full bg-ink/70 px-2 py-0.5 text-[11px] font-semibold tracking-wide transition-colors sm:text-xs",
                      isActive ? "text-white" : "text-white/85",
                    ].join(" ")}
                  >
                    {service.title}
                  </span>
                </button>

                {isActive && (
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute w-52 rounded-xl border border-white/15 bg-ink/95 p-3.5 text-left shadow-2xl shadow-black/60"
                    style={placement}
                  >
                    <p className="text-sm font-semibold text-white">{service.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/65">{service.text}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-ember-500/30 bg-ember-500/10 px-2 py-0.5 text-[10px] text-ember-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
