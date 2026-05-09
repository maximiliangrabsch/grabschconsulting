import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "success" | "blue";
}

const variants = {
  default: "border-white/10 bg-white/5 text-neutral-300",
  success: "border-accent-500/20 bg-accent-500/10 text-accent-400",
  blue: "border-primary-500/20 bg-primary-500/10 text-primary-300",
};

export function Badge({ children, icon, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
