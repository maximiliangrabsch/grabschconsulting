interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`section-label inline-block border-l-2 border-primary-600 pl-2 ${className}`}
    >
      {children}
    </span>
  );
}
