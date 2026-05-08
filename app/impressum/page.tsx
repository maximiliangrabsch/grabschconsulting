import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum – Grabsch Consulting OÜ",
  description: "Impressum nach § 5 TMG – Grabsch Consulting OÜ",
  robots: { index: false, follow: false },
};

export default function Impressum() {
  return (
    <main
      className="min-h-screen antialiased"
      style={{ background: "#080e1f", color: "#e5e7eb" }}
    >
      <div className="mx-auto max-w-2xl px-6 pt-8 pb-12">

        {/* Back link */}
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-300"
        >
          ← Zurück zur Startseite
        </Link>

        {/* Logo */}
        <div className="mb-2">
          <Image
            src="/MRGconsulting.png"
            alt="MRG Consulting Logo"
            width={400}
            height={133}
            className="h-44 w-auto object-contain md:h-72"
            style={{ filter: "invert(1)", mixBlendMode: "screen" }}
            priority
          />
        </div>

        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-white">
          Impressum
        </h1>

        {/* § 5 TMG */}
        <section className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Angaben gemäß § 5 TMG
          </h2>
          <div className="space-y-1 text-neutral-300">
            <p className="font-medium text-white">Grabsch Consulting OÜ</p>
            <p>Am Bahnhof 13</p>
            <p>09600 Oberschöna</p>
            <p>Deutschland</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Vertreten durch
          </h2>
          <p className="text-neutral-300">Maximilian Grabsch</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Kontakt
          </h2>
          <div className="space-y-1 text-neutral-300">
            <p>
              Telefon:{" "}
              <a
                href="tel:+4917242450489"
                className="transition hover:text-white"
              >
                +49 172 4245048
              </a>
            </p>
            <p>
              E-Mail:{" "}
              <a
                href="mailto:m.grabsch@proton.me"
                className="transition hover:text-white"
              >
                m.grabsch@proton.me
              </a>
            </p>
          </div>
        </section>

        <div className="my-10 border-t border-white/10" />

        {/* Haftungsausschluss */}
        <section className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Haftung für Inhalte
          </h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
            diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
            TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
            gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
            forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Haftung für Links
          </h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
            wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
            keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
            jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Urheberrecht
          </h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
            Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
            Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
            bzw. Erstellers.
          </p>
        </section>

        <div className="my-10 border-t border-white/10" />

        {/* Datenschutz */}
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Datenschutz
          </h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            Informationen zur Verarbeitung personenbezogener Daten entnehmen Sie bitte
            unserer{" "}
            <Link
              href="/privacy"
              className="text-neutral-300 underline underline-offset-2 transition hover:text-white"
            >
              Datenschutzerklärung
            </Link>
            .
          </p>
        </section>

      </div>
    </main>
  );
}
