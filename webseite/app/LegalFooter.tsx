"use client";

import { useRef } from "react";

const CONTACT_EMAIL = "m.grabsch@proton.me";
const CONTACT_PHONE = "+49 172 4245048";
const COMPANY = "MRG Consulting OÜ";
const ADDRESS = "Paju tn 1a, 50603 Tartu linn, Tartu maakond, Estland";

export function LegalFooter() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <footer className="relative bg-gradient-to-t from-ink via-ink/85 to-transparent px-5 pb-5 pt-10 text-center text-xs leading-relaxed text-white/70 sm:text-[13px]">
      <p>
        <span className="font-semibold text-white">Impressum</span> · {COMPANY} · {ADDRESS} ·
        Vertreten durch Maximilian Grabsch
      </p>
      <p>
        Handelsregister: Eesti äriregister, Registrikood 17553016 · USt-IdNr. EE103011158
      </p>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline-offset-2 hover:text-white hover:underline">
          {CONTACT_EMAIL}
        </a>
        {" · "}
        <a
          href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
          className="underline-offset-2 hover:text-white hover:underline"
        >
          {CONTACT_PHONE}
        </a>
        {" · "}
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="font-semibold text-white underline underline-offset-2 hover:text-ember-300"
        >
          Datenschutz
        </button>
      </p>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto max-h-[85svh] w-[min(40rem,calc(100vw-2rem))] rounded-2xl border border-white/15 bg-ink p-0 text-left text-white backdrop:bg-black/70"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-ink px-5 py-4">
          <h2 className="text-base font-semibold">Datenschutzerklärung</h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Schließen"
            className="rounded-full px-2 text-xl leading-none text-white/70 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 px-5 py-5 text-sm leading-relaxed text-white/75">
          <section>
            <h3 className="mb-1 font-semibold text-white">1. Verantwortlicher</h3>
            <p>
              {COMPANY}, {ADDRESS}
              <br />
              Vertreten durch Maximilian Grabsch
              <br />
              E-Mail: {CONTACT_EMAIL} · Telefon: {CONTACT_PHONE}
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-white">2. Hosting und Server-Logfiles</h3>
            <p>
              Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA
              gehostet. Beim Aufruf der Seite verarbeitet der Hoster automatisch technische Daten,
              die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene
              Datei, Browsertyp und Betriebssystem sowie die zuvor besuchte Seite (Referrer).
            </p>
            <p className="mt-2">
              Die Verarbeitung ist erforderlich, um die Website sicher und stabil auszuliefern
              (Art. 6 Abs. 1 lit. f DSGVO). Die Daten werden nicht mit anderen Datenquellen
              zusammengeführt und nur so lange gespeichert, wie es für diesen Zweck erforderlich
              ist. Eine Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy
              Framework bzw. der Standardvertragsklauseln der EU-Kommission.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-white">3. Keine Cookies, kein Tracking</h3>
            <p>
              Diese Website setzt keine Cookies und verwendet keine Analyse- oder
              Tracking-Dienste. Schriftarten, Bilder und Videos werden direkt von unserem Server
              geladen; es findet keine Verbindung zu Drittanbietern wie Google statt.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-white">4. Kontakt per E-Mail oder Telefon</h3>
            <p>
              Wenn Sie uns kontaktieren, verarbeiten wir Ihre Angaben (z. B. Name, E-Mail-Adresse,
              Telefonnummer, Inhalt der Anfrage), um Ihre Anfrage zu beantworten. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage mit einem Vertrag oder dessen
              Anbahnung zusammenhängt, ansonsten Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden
              gelöscht, sobald sie nicht mehr benötigt werden und keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h3 className="mb-1 font-semibold text-white">5. Ihre Rechte</h3>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
              Verarbeitung Ihrer Daten, auf Datenübertragbarkeit sowie das Recht, der
              Verarbeitung zu widersprechen (Art. 15–21 DSGVO). Wenden Sie sich dazu einfach an
              die oben genannten Kontaktdaten.
            </p>
            <p className="mt-2">
              Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, etwa
              in Ihrem Wohnsitzland oder bei der für uns zuständigen estnischen Behörde:
              Andmekaitse Inspektsioon, Tatari 39, 10134 Tallinn, www.aki.ee.
            </p>
          </section>

          <p className="text-xs text-white/50">Stand: September 2026</p>
        </div>
      </dialog>
    </footer>
  );
}
