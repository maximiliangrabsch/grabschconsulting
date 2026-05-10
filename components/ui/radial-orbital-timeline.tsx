"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  details: string[];
  tags: string[];
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

function getCardOffset(x: number, y: number): React.CSSProperties {
  // Always open INWARD so the card stays within the visible viewport:
  // - node at bottom  (y > 0) → card opens upward   (bottom: anchor)
  // - node at top     (y < 0) → card opens downward  (top: anchor)
  // - node on right   (x > 0) → card opens leftward  (right: anchor)
  // - node on left    (x < 0) → card opens rightward (left: anchor)
  const ax = Math.abs(x);
  const ay = Math.abs(y);
  if (ax >= ay) {
    // Horizontal dominant
    if (x > 0) return { right: "3rem", top: "50%", transform: "translateY(-50%)" };
    return { left: "3rem", top: "50%", transform: "translateY(-50%)" };
  } else {
    // Vertical dominant
    if (y > 0) return { bottom: "3rem", left: "50%", transform: "translateX(-50%)" };
    return { top: "3rem", left: "50%", transform: "translateX(-50%)" };
  }
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)));
      }, 50);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    return { x, y };
  };

  const getStatusStyles = (status: TimelineItem["status"]) => {
    if (status === "completed") return "bg-primary-600/80 text-white border-primary-500/50";
    if (status === "in-progress") return "bg-white/10 text-white border-white/30";
    return "bg-white/5 text-white/60 border-white/20";
  };

  const getStatusLabel = (status: TimelineItem["status"]) => {
    if (status === "completed") return "EXPERT";
    if (status === "in-progress") return "AKTIV";
    return "AUFBAU";
  };

  return (
    <div
      className="w-full h-[580px] flex items-center justify-center overflow-visible"
      ref={containerRef}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        {/* Center person avatar */}
        <div className="absolute flex items-center justify-center z-10 pointer-events-none">
          <div className="absolute w-20 h-20 rounded-full border border-primary-500/30 animate-ping opacity-40" />
          <div
            className="absolute w-28 h-28 rounded-full border border-primary-500/15 animate-ping opacity-25"
            style={{ animationDelay: "0.7s" }}
          />
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center shadow-lg shadow-primary-600/30 border border-primary-500/40">
            <User className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Orbit ring */}
        <div className="absolute w-[420px] h-[420px] rounded-full border border-white/8 pointer-events-none" />

        {/* Nodes */}
        {timelineData.map((item, index) => {
          const { x, y } = calculateNodePosition(index, timelineData.length);
          const isActive = activeNodeId === item.id;
          const Icon = item.icon;
          const cardStyle = getCardOffset(x, y);

          return (
            <div
              key={item.id}
              className="absolute transition-transform duration-[50ms]"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                zIndex: isActive ? 200 : 10,
              }}
              onMouseEnter={() => { setAutoRotate(false); setActiveNodeId(item.id); }}
              onMouseLeave={() => { setAutoRotate(true); setActiveNodeId(null); }}
            >
              {/* Glow halo */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)",
                  width: "64px",
                  height: "64px",
                  left: "-12px",
                  top: "-12px",
                }}
              />

              {/* Node circle */}
              <div
                className={[
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                  isActive
                    ? "bg-primary-600 text-white border-primary-400 shadow-lg shadow-primary-500/40 scale-125"
                    : "bg-surface-1 text-white border-white/25 hover:border-primary-500/60 hover:bg-primary-600/20",
                ].join(" ")}
              >
                <Icon size={16} />
              </div>

              {/* Label */}
              <div
                className={[
                  "absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wider transition-colors duration-200 pointer-events-none select-none",
                  isActive ? "text-white" : "text-white/60",
                ].join(" ")}
              >
                {item.title}
              </div>

              {/* Card — positioned in the outward direction from center */}
              {isActive && (
                <Card
                  className="absolute w-72 bg-surface-1/98 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/60"
                  style={{ ...cardStyle, position: "absolute" }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${getStatusStyles(item.status)}`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">{item.date}</span>
                    </div>
                    <CardTitle className="mt-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-white/70 space-y-3">
                    <p className="leading-relaxed">{item.content}</p>

                    {item.details.length > 0 && (
                      <ul className="space-y-1">
                        {item.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-primary-400 shrink-0" />
                            <span className="text-white/60">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-300 text-[10px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.relatedIds.length > 0 && (
                      <div className="pt-2 border-t border-white/10">
                        <h4 className="text-[10px] uppercase tracking-wider font-medium text-white/40 mb-2">
                          Verwandte Bereiche
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((relatedId) => {
                            const relatedItem = timelineData.find((i) => i.id === relatedId);
                            return (
                              <span
                                key={relatedId}
                                className="flex items-center gap-1 h-6 px-2 text-[10px] rounded border border-white/15 text-white/50"
                              >
                                {relatedItem?.title}
                                <ArrowRight size={7} className="text-white/40" />
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
