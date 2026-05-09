import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Impressum – Grabsch Consulting OÜ",
  description: "Impressum nach § 5 TMG – Grabsch Consulting OÜ",
  robots: { index: false, follow: false },
};

export default function Impressum() {
  return (
    <main className="min-h-screen antialiased" style={{ background: "#080e1f" }}>
      <div className="mx-auto max-w-2xl px-6 pb-20 pt-28">
        <h1 className="mb-10 text-3xl font-semibold tracking-tight text-white">Impressum</h1>

        {/* § 5 TMG */}
        <section className="mb-8">
          <SectionLabel className="mb-3">Angaben gemäß § 5 TMG</SectionLabel>
          <div className="mt-3 space-y-1 text-sm leading-relaxed text-neutral-400">
            <p className="font-medium text-neutral-200">Grabsch Consulting OÜ</p>
            <p>Am Bahnhof 13</p>
            <p>09600 Oberschöna</p>
            <p>Deutschland</p>
          </div>
        </section>

        <section className="mb-8">
          <SectionLabel className="mb-3">Vertreten durch</SectionLabel>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">Maximilian Grabsch</p>
        </section>

        <section className="mb-8">
          <SectionLabel className="mb-3">Kontakt</SectionLabel>
          <div className="mt-3 space-y-1 text-sm leading-relaxed text-neutral-400">
            <p>
              Telefon:{" "}
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="transition hover:text-white">
                {CONTACT_PHONE}
              </a>
            </p>
            <p>
              E-Mail:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </section>

        <div className="my-10 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <section className="mb-8">
          <SectionLabel className="mb-3">Haftung für Inhalte</SectionLabel>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
            Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
            als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>

        <section className="mb-8">
          <SectionLabel className="mb-3">Haftung für Links</SectionLabel>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
            keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
            oder Betreiber der Seiten verantwortlich.
          </p>
        </section>

        <section className="mb-8">
          <SectionLabel className="mb-3">Urheberrecht</SectionLabel>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
            Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
            bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

        <div className="my-10 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <section>
          <SectionLabel className="mb-3">Datenschutz</SectionLabel>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            Informationen zur Verarbeitung personenbezogener Daten entnehmen Sie bitte unserer{" "}
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
