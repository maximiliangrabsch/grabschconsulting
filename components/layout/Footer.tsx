import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NAV_LINKS, FOOTER_LEGAL_LINKS, CALENDLY_URL, COMPANY_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: "#080e1f",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            {/* Crop to ibex circle only (top ~65% of the 1024×1536 image).
                mix-blend-mode:screen makes the inverted-white background
                invisible against the dark footer, leaving only the white ibex. */}
            <div className="relative overflow-hidden" style={{ width: 96, height: 96 }}>
              <Image
                src="/MRGconsulting.png"
                alt="MRG Consulting"
                fill
                className="object-cover object-top"
                style={{
                  filter: "invert(1) brightness(2)",
                  mixBlendMode: "screen",
                }}
              />
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">
              Professionelles Tech-Recruiting für Remote-Teams und Entwickler.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-600">
              Seiten
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 transition hover:text-neutral-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + CTA */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-600">
              Rechtliches
            </p>
            <ul className="mb-6 space-y-2">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 transition hover:text-neutral-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-primary-500"
            >
              Erstgespräch
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs text-neutral-700">
            © {new Date().getFullYear()} {COMPANY_NAME}
          </p>
          <p className="text-xs text-neutral-700">Alle Rechte vorbehalten</p>
        </div>
      </div>
    </footer>
  );
}
