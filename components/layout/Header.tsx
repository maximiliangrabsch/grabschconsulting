"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Globe } from "lucide-react";
import { CALENDLY_URL } from "@/lib/constants";
import { useLanguage, type Lang } from "@/lib/i18n";
import { useT } from "@/lib/translations";

const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Sprache wählen"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-white/[0.06] hover:text-white"
      >
        <Globe className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-white/10 shadow-xl"
            style={{ background: "rgba(8,14,31,0.97)", backdropFilter: "blur(16px)" }}
          >
            {LANGUAGES.map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => { setLang(code); setOpen(false); }}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                  lang === code
                    ? "bg-primary-600/20 text-white"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-base leading-none">{flag}</span>
                {label}
                {lang === code && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-400" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavTab({
  children,
  href,
  isActive,
}: {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`block rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
          isActive
            ? "bg-primary-600 text-white"
            : "text-white/70 hover:bg-primary-600 hover:text-white"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang } = useLanguage();
  const t = useT(lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,14,31,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      }}
    >
      {/* Language switcher pinned to top-right corner */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
        <LanguageSwitcher />
      </div>

      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logorund.png"
            alt="MRG Consulting"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-sm font-semibold tracking-tight text-white">MRG Consulting</span>
        </Link>

        {/* Desktop sliding pill nav */}
        <ul className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm md:flex">
          {t.navLinks.map((link) => (
            <NavTab
              key={link.href}
              href={link.href}
              isActive={pathname === link.href}
            >
              {link.label}
            </NavTab>
          ))}
        </ul>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3 pr-10">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-500 hover:shadow-primary-600/20 sm:inline-flex"
          >
            {t.header.book}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-white/5 hover:text-white md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-white/8 px-6 pb-6 pt-4 md:hidden"
            style={{ background: "rgba(8,14,31,0.97)", backdropFilter: "blur(16px)" }}
          >
            <div className="flex flex-col gap-4">
              {t.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base transition-colors ${
                    pathname === link.href
                      ? "font-semibold text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white"
              >
                {t.header.book}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
