import type { Lang } from "./i18n";

interface NavLink { label: string; href: string }
interface Card { title: string; desc: string }
interface Bullet { label: string; title: string; desc: string; bullets: string[]; cta: string }
interface Step { step: string; title: string; desc: string }
interface StatItem { value: number; suffix: string; label: string }
interface StackItem { title: string; content: string; details: string[] }
interface RoleItem { value: string; label: string }

interface WhatsAppT {
  floatHeadline: string;
  company: string;
  developer: string;
  companyUrl: string;
  developerUrl: string;
  boxHeadline: string;
  boxSub: string;
  hours: string;
}

interface Translations {
  whatsapp: WhatsAppT;
  navLinks: NavLink[];
  header: { book: string };
  hero: { badges: string[]; headline1: string; headline2: string; sub: string; cta: string };
  whyUs: { label: string; headline: string; sub: string; cards: Card[] };
  models: { label: string; headline: string; sub: string; a: Bullet; b: Bullet };
  tech: { label: string; headline: string; sub: string; stacks: StackItem[] };
  stats: { items: StatItem[] };
  process: { label: string; headline: string; steps: Step[] };
  cta: { headline1: string; headline2: string; sub: string; book: string; about: string };
  footer: { tagline: string; pages: string; legal: string; bookCall: string; allRights: string; impressum: string };
  about: {
    label: string; headline1: string; headline2: string; sub: string;
    meetBtn: string; contactBtn: string;
    storyLabel: string; storyHeadline: string; storyP1: string; storyP2: string; storyP3: string; quote: string;
    valuesLabel: string; valuesHeadline: string; values: Card[];
    founderName: string; founderRole: string;
    ctaHeadline: string; ctaSub: string; ctaBook: string; ctaContact: string;
  };
  forCompanies: {
    label: string; headline1: string; headline2: string; sub: string;
    bookBtn: string; howBtn: string;
    painLabel: string; painHeadline: string; painPoints: Card[];
    solutionLabel: string; solutionHeadline: string; solutions: Card[];
  };
  developers: {
    label: string; headline1: string; headline2: string; sub: string;
    applyBtn: string; checkBtn: string;
    valueLabel: string; valueHeadline: string; valueSub: string; valueProps: Card[];
    requireLabel: string; requireHeadline: string;
    fitTitle: string; niceTitle: string;
    checksFit: string[]; checksNiceToHave: string[]; seniorityNote: string;
    processLabel: string; processHeadline: string; applySteps: Step[];
    ctaHeadline1: string; ctaHeadline2: string; ctaSub: string; ctaBtn: string;
  };
  contact: {
    label: string; headline: string; sub: string;
    nameLabel: string; namePlaceholder: string;
    emailLabel: string; emailPlaceholder: string;
    companyLabel: string; companyOptional: string; companyPlaceholder: string;
    roleLabel: string; rolePlaceholder: string;
    messageLabel: string; messagePlaceholder: string;
    submitSending: string; submitBtn: string;
    successTitle: string; successMsg: string; serverError: string;
    trust: string[]; directTitle: string; calendarText: string; calendarBtn: string;
    roles: RoleItem[];
    nameError: string; emailError: string; messageError: string;
  };
}

const de: Translations = {
  whatsapp: {
    floatHeadline: "Schreib uns auf WhatsApp",
    company: "Ich suche Entwickler",
    developer: "Ich bin Entwickler",
    companyUrl: "https://wa.me/491724245048?text=Guten%20Tag%2C%20wir%20haben%20Bedarf%20an%20Entwickler-Kapazit%C3%A4t%20und%20w%C3%BCrden%20uns%20gerne%20%C3%BCber%20eine%20Zusammenarbeit%20austauschen.",
    developerUrl: "https://wa.me/491724245048?text=Guten%20Tag%2C%20ich%20bin%20erfahrener%20Entwickler%20und%20m%C3%B6chte%20mich%20gerne%20als%20Teil%20eures%20Netzwerks%20vorstellen.",
    boxHeadline: "Lieber per WhatsApp?",
    boxSub: "Schreib uns direkt — wir antworten innerhalb weniger Stunden.",
    hours: "Mo–Fr · 9–18 Uhr · Antwort innerhalb von 2 Stunden",
  },
  navLinks: [
    { label: "Für Unternehmen", href: "/for-companies" },
    { label: "Für Entwickler", href: "/developers" },
    { label: "Über uns", href: "/about" },
    { label: "Kontakt", href: "/contact" },
  ],
  header: { book: "Termin buchen" },
  hero: {
    badges: ["100% Remote", "Alle Tech-Stacks", "10+ Jahre Erfahrung"],
    headline1: "Ausgebildete Remote-Entwickler",
    headline2: "für Ihr Projekt",
    sub: "Aus unserem Netzwerk erfahrener Entwickler – schnell, kompetent und zuverlässig.",
    cta: "Entwickler finden",
  },
  whyUs: {
    label: "Warum wir",
    headline: "Was uns von allen anderen unterscheidet",
    sub: "Kein Offshore-Massenanbieter. Kein klassischer Headhunter. Kein Junior-Pool. Wir sind ein eingespieltes Team mit echtem Senior-Netzwerk — schneller, günstiger, zuverlässiger.",
    cards: [
      { title: "Team statt Einzelkämpfer", desc: "Du buchst kein einzelnes Profil — du buchst ein eingespieltes Team. Krank, Urlaub, Spezialgebiet? Wir fangen das auf. Lieferung bleibt gesichert." },
      { title: "Internationales Netzwerk, alle Stacks", desc: "Frontend, Backend, AI/ML, Cloud, DevOps — unser Netzwerk deckt jeden modernen Stack ab. Wir finden den passenden Senior für deine Nische, auch wenn du in Deutschland niemanden findest." },
      { title: "100 % Remote, niedrige Overheads", desc: "Kein Büro, keine Reisekosten, keine Bench-Kosten. Diese Effizienz geben wir direkt an dich weiter. Volle Überlappung mit deutschen Kernzeiten (10–17 Uhr)." },
      { title: "In 14 Tagen produktiv — nicht 6 Monate", desc: "Klassische Headhunter bedeuten Monate Wartezeit. Bei uns startet jemand in 14 Tagen, produktiv ab Tag 1. Du sparst Zeit, Geld und Onboarding-Risiko." },
    ],
  },
  models: {
    label: "Unsere Modelle",
    headline: "Zwei Wege — du wählst",
    sub: "Egal ob du ein Projekt liefern oder eine Stelle besetzen willst — wir haben das passende Modell.",
    a: {
      label: "Modell A",
      title: "Erfolgsbasierte Projektarbeit",
      desc: "Du hast ein konkretes Projekt — wir liefern es als Team. Meilenstein-basiert, kein Lock-In.",
      bullets: ["MVPs, Features & AI-Integrationen", "Fester Ansprechpartner, agiler Prozess", "14-Tage-Pilot möglich"],
      cta: "Projekt anfragen",
    },
    b: {
      label: "Modell B",
      title: "Festanstellungs-Vermittlung",
      desc: "Du suchst einen festen Mitarbeiter. Wir liefern vorqualifizierte Senior-Profile — schnell und passgenau.",
      bullets: ["Kandidat in einer Woche", "10 Jahre+ Erfahrung", "24/7 Betreuung"],
      cta: "Kandidaten anfragen",
    },
  },
  tech: {
    label: "Tech-Expertise",
    headline: "Alle modernen Stacks — abgedeckt",
    sub: "Von KI bis Cyber Security – fahren Sie mit der Maus über einen Bereich für Details.",
    stacks: [
      { title: "AI / ML", content: "Wir entwickeln intelligente Systeme, die aus Daten lernen und echten Mehrwert schaffen.", details: ["Entwicklung maßgeschneiderter ML-Modelle", "LLM-Integration & KI-Agenten", "Datenanalyse & Predictive Analytics", "NLP und Computer Vision"] },
      { title: "Backend", content: "Robuste, skalierbare Server-Architekturen, die auch unter Last zuverlässig performen.", details: ["RESTful & GraphQL APIs", "Microservices & Event-Driven Architekturen", "Datenbankdesign (SQL & NoSQL)", "Cloud-Infrastruktur & DevOps"] },
      { title: "Frontend", content: "Moderne, performante Web-Applikationen mit exzellenter User Experience.", details: ["Komponentenbasierte UI-Entwicklung", "Server-Side Rendering & Static Generation", "State Management & Performance-Optimierung", "Responsive Design & Accessibility"] },
      { title: "Full-Stack", content: "End-to-End-Entwicklung – vom Konzept bis zur produktionsreifen Anwendung.", details: ["Vollständige Produktentwicklung aus einer Hand", "API-Design & Frontend-Integration", "CI/CD-Pipelines & automatisierte Tests", "Cloud-Deployment & Monitoring"] },
      { title: "Cyber Security", content: "Wir identifizieren Schwachstellen bevor Angreifer es tun – und schließen sie nachhaltig.", details: ["Penetration Testing & Ethical Hacking", "Security Audits & Code Reviews", "SIEM-Implementierung & Monitoring", "Compliance (ISO 27001, DSGVO)"] },
    ],
  },
  stats: {
    items: [
      { value: 50, suffix: "+", label: "Entwickler im Netzwerk" },
      { value: 100, suffix: "%", label: "Kandidaten persönlich geprüft" },
      { value: 14, suffix: " Tage", label: "bis zum ersten Kandidaten" },
    ],
  },
  process: {
    label: "Der Prozess",
    headline: "Vom Briefing zum Start — in 4 Schritten",
    steps: [
      { step: "01", title: "Projekt-Analyse", desc: "Anforderungen und Tech-Stack werden im Erstgespräch definiert." },
      { step: "02", title: "Kandidaten-Vorstellung", desc: "Passende, vorgeprüfte Profile erhalten Sie innerhalb von 48h." },
      { step: "03", title: "Vertragsschluss", desc: "Rechtssichere Verträge und alle administrativen Details inklusive." },
      { step: "04", title: "Onboarding", desc: "Begleitung beim Start – wir stehen jederzeit für Support bereit." },
    ],
  },
  cta: {
    headline1: "Ihr nächstes Projekt beginnt",
    headline2: "heute.",
    sub: "Kostenloses 15-Minuten-Gespräch.",
    book: "Termin buchen",
    about: "Über uns",
  },
  footer: {
    tagline: "Professionelles Tech-Recruiting für Remote-Teams und Entwickler.",
    pages: "Seiten",
    legal: "Rechtliches",
    bookCall: "Erstgespräch",
    allRights: "Alle Rechte vorbehalten",
    impressum: "Impressum",
  },
  about: {
    label: "Über MRG Consulting",
    headline1: "Recruiting von einem Entwickler —",
    headline2: "für Entwickler.",
    sub: "Maximilian Grabsch gründete MRG Consulting mit einem klaren Ziel: Technisches Talent und Unternehmen zusammenbringen — ohne Umwege und ohne Recruiter, die Code nicht lesen können.",
    meetBtn: "Kennenlernen",
    contactBtn: "Kontakt aufnehmen",
    storyLabel: "Die Geschichte",
    storyHeadline: "Warum MRG?",
    storyP1: "Als Entwickler hat Maximilian Grabsch jahrelang erlebt, wie klassisches Recruiting funktioniert — oder eben nicht. Recruiter, die Stacks verwechseln. Unternehmen, die Monate auf Kandidaten warten. Entwickler, die Spam-Nachrichten mit völlig unpassenden Positionen erhalten.",
    storyP2: "Die Lösung war klar: Ein Recruiting-Service, bei dem jemand die technische Seite wirklich versteht. Jemand, der selbst Code geschrieben hat, Interviews führt, die etwas bedeuten, und Matches findet, die wirklich funktionieren.",
    storyP3: "MRG Consulting wurde mit dem Anspruch gegründet, dass jeder Kandidat im Netzwerk persönlich geprüft wird — und jedes Unternehmen vorab auf Remote-Reife und Teamkultur bewertet wird.",
    quote: "Ein guter Entwickler ist nicht derjenige mit dem besten CV — sondern derjenige, der zum Team und zum Problem passt.",
    valuesLabel: "Unsere Werte",
    valuesHeadline: "Was uns antreibt",
    values: [
      { title: "Ehrlichkeit", desc: "Klare Kommunikation, keine leeren Versprechen. Wir sagen, was möglich ist — und halten, was wir sagen." },
      { title: "Qualität", desc: "Lieber drei perfekte Matches als zwanzig unpassende Profile. Qualität vor Quantität." },
      { title: "Geschwindigkeit", desc: "Erste Profile in Tagen, nicht Wochen. Ihr Projekt kann nicht warten — wir auch nicht." },
    ],
    founderName: "Maximilian Grabsch",
    founderRole: "Gründer, MRG Consulting",
    ctaHeadline: "Lernen Sie uns kennen",
    ctaSub: "Ein kurzes Gespräch reicht — kostenlos und unverbindlich.",
    ctaBook: "Termin buchen",
    ctaContact: "Schreiben Sie uns",
  },
  forCompanies: {
    label: "Für Unternehmen",
    headline1: "Vorgeprüfte Remote-Entwickler",
    headline2: "für Ihr Team",
    sub: "Kein Raten, kein Risiko — jeder Kandidat hat ein technisches Interview absolviert und ist remote-erfahren.",
    bookBtn: "Gespräch buchen",
    howBtn: "Wie es funktioniert",
    painLabel: "Das Problem",
    painHeadline: "Recruiting kostet Zeit, die Ihr Team nicht hat.",
    painPoints: [
      { title: "Ungeprüfte Kandidaten", desc: "CVs sagen wenig über echte Code-Qualität aus. Klassische Recruiter können das nicht beurteilen." },
      { title: "Lange Suchdauer", desc: "Klassische Vermittler brauchen Monate. Ihr Team braucht Verstärkung jetzt." },
      { title: "Kulturelle Fehlbesetzungen", desc: "Remote-Tauglichkeit wird systematisch unterschätzt — mit teuren Folgen." },
    ],
    solutionLabel: "Unsere Lösung",
    solutionHeadline: "Was Sie von MRG bekommen",
    solutions: [
      { title: "Technisches Screening", desc: "Jeder Kandidat absolviert ein persönliches Code-Review und Live-Interview. Keine Überraschungen nach dem Onboarding." },
      { title: "Schnelle Lieferung", desc: "Erste Profile innerhalb von 48 Stunden. Onboarding-Start in der Regel in unter 14 Tagen." },
      { title: "Remote-Kultur-Fit", desc: "Wir prüfen Async-Kommunikation, Zeitzonenkompetenz und Eigenverantwortung — nicht nur den Stack." },
      { title: "Vertragsabwicklung", desc: "Rechtssichere Verträge, Abrechnung und administrativer Support inklusive — ohne Mehraufwand für Ihr Team." },
    ],
  },
  developers: {
    label: "Für Entwickler",
    headline1: "Top-Placements bei",
    headline2: "Unternehmen und Startups",
    sub: "Ein Recruiter, der Code versteht — und Ihren Marktwert kennt. Kein Spam, kein Druck, nur passende Positionen.",
    applyBtn: "Jetzt bewerben",
    checkBtn: "Anforderungen prüfen",
    valueLabel: "Was wir bieten",
    valueHeadline: "Mehr als eine Jobvermittlung",
    valueSub: "Wir begleiten Sie vom ersten Gespräch bis zum Vertragsabschluss — diskret, ohne Druck und ohne Spam.",
    valueProps: [
      { title: "Kein Spam", desc: "Wir kontaktieren Sie nur mit Positionen, die wirklich zu Ihrem Stack und Ihren Zielen passen." },
      { title: "Marktgerechte Vergütung", desc: "Wir kennen den Markt und vertreten Ihren Wert klar gegenüber Unternehmen." },
      { title: "Geprüfte Unternehmen", desc: "Jedes Unternehmen in unserem Netzwerk wird vorab auf Kultur, Prozesse und Remote-Reife geprüft." },
    ],
    requireLabel: "Was wir suchen",
    requireHeadline: "Passt MRG zu Ihnen?",
    fitTitle: "Perfekter Match",
    niceTitle: "Nice to have",
    checksFit: ["3+ Jahre Entwicklungserfahrung", "Remote-Erfahrung vorhanden", "Eigenverantwortliches Arbeiten", "Kommunikation auf Deutsch oder Englisch"],
    checksNiceToHave: ["Open-Source-Beiträge", "Stack-Flexibilität", "Startup-Erfahrung", "Agile-Kenntnisse"],
    seniorityNote: "Wir arbeiten mit Entwicklern aller Senioritätsstufen.",
    processLabel: "Der Ablauf",
    processHeadline: "Vom Profil zum Vertrag",
    applySteps: [
      { step: "01", title: "Profil einreichen", desc: "Kurzes Gespräch oder Profil einsenden — kein aufwendiger Bewerbungsprozess." },
      { step: "02", title: "Technisches Gespräch", desc: "30-minütiges Video-Interview mit jemandem, der Ihren Code wirklich versteht." },
      { step: "03", title: "Matchmaking", desc: "Vorstellung bei passenden Unternehmen — nur dort, wo es wirklich passt." },
      { step: "04", title: "Onboarding & Support", desc: "Begleitung beim Start und Ansprechpartner während der gesamten Zusammenarbeit." },
    ],
    ctaHeadline1: "Bereit für Ihr",
    ctaHeadline2: "nächstes Projekt?",
    ctaSub: "Kurzes Gespräch genügt — kein aufwendiger Bewerbungsprozess.",
    ctaBtn: "Jetzt bewerben",
  },
  contact: {
    label: "Kontakt",
    headline: "Schreiben Sie uns",
    sub: "Wir antworten in der Regel innerhalb von 24 Stunden.",
    nameLabel: "Name",
    namePlaceholder: "Ihr Name",
    emailLabel: "E-Mail",
    emailPlaceholder: "ihre@email.de",
    companyLabel: "Unternehmen",
    companyOptional: "(optional)",
    companyPlaceholder: "Optional",
    roleLabel: "Ich bin...",
    rolePlaceholder: "Bitte wählen",
    messageLabel: "Nachricht",
    messagePlaceholder: "Wie können wir Ihnen helfen?",
    submitSending: "Wird gesendet…",
    submitBtn: "Nachricht senden",
    successTitle: "Vielen Dank!",
    successMsg: "Wir haben Ihre Nachricht erhalten und melden uns bald bei Ihnen.",
    serverError: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    trust: ["Antwort in 24h", "Kostenlos & unverbindlich"],
    directTitle: "Direktkontakt",
    calendarText: "Lieber direkt ein Gespräch buchen?",
    calendarBtn: "Termin buchen",
    roles: [
      { value: "Startup-Gründer", label: "Startup-Gründer" },
      { value: "CTO/Tech-Lead", label: "CTO/Tech-Lead" },
      { value: "HR/Recruiting", label: "HR/Recruiting" },
      { value: "Entwickler auf Jobsuche", label: "Entwickler auf Jobsuche" },
      { value: "Investor", label: "Investor" },
      { value: "Sonstiges", label: "Sonstiges" },
    ],
    nameError: "Name muss mindestens 2 Zeichen haben",
    emailError: "Ungültige E-Mail-Adresse",
    messageError: "Nachricht muss mindestens 20 Zeichen haben",
  },
};

const en: Translations = {
  whatsapp: {
    floatHeadline: "Message us on WhatsApp",
    company: "I'm looking for developers",
    developer: "I'm a developer",
    companyUrl: "https://wa.me/491724245048?text=Hello%2C%20we%20are%20looking%20for%20developer%20capacity%20and%20would%20like%20to%20discuss%20a%20potential%20collaboration.",
    developerUrl: "https://wa.me/491724245048?text=Hello%2C%20I%20am%20an%20experienced%20developer%20and%20would%20like%20to%20introduce%20myself%20as%20part%20of%20your%20network.",
    boxHeadline: "Prefer WhatsApp?",
    boxSub: "Message us directly — we reply within a few hours.",
    hours: "Mon–Fri · 9 am–6 pm · Reply within 2 hours",
  },
  navLinks: [
    { label: "For Companies", href: "/for-companies" },
    { label: "For Developers", href: "/developers" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  header: { book: "Book a Call" },
  hero: {
    badges: ["100% Remote", "All Tech Stacks", "10+ Years Experience"],
    headline1: "Trained Remote Developers",
    headline2: "for your project",
    sub: "From our network of experienced developers – fast, competent and reliable.",
    cta: "Find Developers",
  },
  whyUs: {
    label: "Why us",
    headline: "What sets us apart from everyone else",
    sub: "No offshore mass provider. No classic headhunter. No junior pool. We are a seasoned team with a real senior network — faster, cheaper, more reliable.",
    cards: [
      { title: "Team instead of lone wolves", desc: "You're not booking a single profile — you're booking a seasoned team. Sick leave, holidays, specialisation? We cover it. Delivery stays guaranteed." },
      { title: "International network, all stacks", desc: "Frontend, Backend, AI/ML, Cloud, DevOps — our network covers every modern stack. We find the right senior for your niche, even when nobody in Germany is available." },
      { title: "100% Remote, low overheads", desc: "No office, no travel costs, no bench costs. We pass this efficiency directly on to you. Full overlap with German core hours (10 am – 5 pm)." },
      { title: "Productive in 14 days — not 6 months", desc: "Classic headhunters mean months of waiting. With us, someone starts in 14 days, productive from day 1. You save time, money and onboarding risk." },
    ],
  },
  models: {
    label: "Our Models",
    headline: "Two paths — you choose",
    sub: "Whether you want to deliver a project or fill a position — we have the right model.",
    a: {
      label: "Model A",
      title: "Success-Based Project Work",
      desc: "You have a concrete project — we deliver it as a team. Milestone-based, no lock-in.",
      bullets: ["MVPs, features & AI integrations", "Dedicated point of contact, agile process", "14-day pilot possible"],
      cta: "Request a project",
    },
    b: {
      label: "Model B",
      title: "Permanent Placement",
      desc: "You're looking for a permanent employee. We deliver pre-qualified senior profiles — fast and precisely matched.",
      bullets: ["Candidate within a week", "10+ years experience", "24/7 support"],
      cta: "Request candidates",
    },
  },
  tech: {
    label: "Tech Expertise",
    headline: "All modern stacks — covered",
    sub: "From AI to Cyber Security – hover over an area for details.",
    stacks: [
      { title: "AI / ML", content: "We build intelligent systems that learn from data and create real value.", details: ["Custom ML model development", "LLM integration & AI agents", "Data analysis & predictive analytics", "NLP and computer vision"] },
      { title: "Backend", content: "Robust, scalable server architectures that perform reliably even under load.", details: ["RESTful & GraphQL APIs", "Microservices & event-driven architectures", "Database design (SQL & NoSQL)", "Cloud infrastructure & DevOps"] },
      { title: "Frontend", content: "Modern, high-performance web applications with excellent user experience.", details: ["Component-based UI development", "Server-side rendering & static generation", "State management & performance optimisation", "Responsive design & accessibility"] },
      { title: "Full-Stack", content: "End-to-end development – from concept to production-ready application.", details: ["Complete product development from a single source", "API design & frontend integration", "CI/CD pipelines & automated tests", "Cloud deployment & monitoring"] },
      { title: "Cyber Security", content: "We identify vulnerabilities before attackers do – and close them for good.", details: ["Penetration testing & ethical hacking", "Security audits & code reviews", "SIEM implementation & monitoring", "Compliance (ISO 27001, GDPR)"] },
    ],
  },
  stats: {
    items: [
      { value: 50, suffix: "+", label: "Developers in our network" },
      { value: 100, suffix: "%", label: "Candidates personally vetted" },
      { value: 14, suffix: " days", label: "until the first candidate" },
    ],
  },
  process: {
    label: "The Process",
    headline: "From briefing to start — in 4 steps",
    steps: [
      { step: "01", title: "Project analysis", desc: "Requirements and tech stack are defined in the initial conversation." },
      { step: "02", title: "Candidate presentation", desc: "Suitable, pre-vetted profiles delivered within 48 hours." },
      { step: "03", title: "Contract signing", desc: "Legally sound contracts and all administrative details included." },
      { step: "04", title: "Onboarding", desc: "Support at the start — we are available at any time." },
    ],
  },
  cta: {
    headline1: "Your next project starts",
    headline2: "today.",
    sub: "Free 15-minute call.",
    book: "Book a call",
    about: "About us",
  },
  footer: {
    tagline: "Professional tech recruiting for remote teams and developers.",
    pages: "Pages",
    legal: "Legal",
    bookCall: "Get in touch",
    allRights: "All rights reserved.",
    impressum: "Imprint",
  },
  about: {
    label: "About MRG Consulting",
    headline1: "Recruiting from a developer —",
    headline2: "for developers.",
    sub: "Maximilian Grabsch founded MRG Consulting with a clear goal: connecting technical talent with companies — directly and without recruiters who can't read code.",
    meetBtn: "Meet us",
    contactBtn: "Get in touch",
    storyLabel: "The Story",
    storyHeadline: "Why MRG?",
    storyP1: "As a developer, Maximilian Grabsch spent years experiencing how classic recruiting works — or doesn't. Recruiters who mix up stacks. Companies waiting months for candidates. Developers receiving spam messages about completely irrelevant positions.",
    storyP2: "The solution was clear: a recruiting service where someone truly understands the technical side. Someone who has written code themselves, conducts interviews that mean something, and finds matches that actually work.",
    storyP3: "MRG Consulting was founded with the commitment that every candidate in the network is personally vetted — and every company is assessed upfront for remote readiness and team culture.",
    quote: "A great developer isn't the one with the best CV — it's the one who fits the team and the problem.",
    valuesLabel: "Our Values",
    valuesHeadline: "What drives us",
    values: [
      { title: "Honesty", desc: "Clear communication, no empty promises. We say what's possible — and deliver what we say." },
      { title: "Quality", desc: "Three perfect matches over twenty mismatched profiles. Quality over quantity." },
      { title: "Speed", desc: "First profiles in days, not weeks. Your project can't wait — neither can we." },
    ],
    founderName: "Maximilian Grabsch",
    founderRole: "Founder, MRG Consulting",
    ctaHeadline: "Get to know us",
    ctaSub: "A short conversation is enough — free and non-binding.",
    ctaBook: "Book a call",
    ctaContact: "Write to us",
  },
  forCompanies: {
    label: "For Companies",
    headline1: "Pre-vetted remote developers",
    headline2: "for your team",
    sub: "No guessing, no risk — every candidate has completed a technical interview and has remote experience.",
    bookBtn: "Book a call",
    howBtn: "How it works",
    painLabel: "The Problem",
    painHeadline: "Recruiting costs time your team doesn't have.",
    painPoints: [
      { title: "Unvetted candidates", desc: "CVs say little about real code quality. Traditional recruiters can't assess that." },
      { title: "Long search times", desc: "Classic agencies take months. Your team needs reinforcement now." },
      { title: "Cultural mismatches", desc: "Remote suitability is systematically underestimated — with costly consequences." },
    ],
    solutionLabel: "Our Solution",
    solutionHeadline: "What you get from MRG",
    solutions: [
      { title: "Technical screening", desc: "Every candidate completes a personal code review and live interview. No surprises after onboarding." },
      { title: "Fast delivery", desc: "First profiles within 48 hours. Onboarding typically starts in under 14 days." },
      { title: "Remote culture fit", desc: "We assess async communication, timezone competency and ownership — not just the stack." },
      { title: "Contract handling", desc: "Legally sound contracts, billing and administrative support included — no extra effort for your team." },
    ],
  },
  developers: {
    label: "For Developers",
    headline1: "Top placements at",
    headline2: "Companies and Startups",
    sub: "A recruiter who understands code — and knows your market value. No spam, no pressure, only matching positions.",
    applyBtn: "Apply now",
    checkBtn: "Check requirements",
    valueLabel: "What we offer",
    valueHeadline: "More than just job placement",
    valueSub: "We support you from the first conversation to signing the contract — discreet, pressure-free and spam-free.",
    valueProps: [
      { title: "No spam", desc: "We only contact you with positions that genuinely match your stack and goals." },
      { title: "Market-rate compensation", desc: "We know the market and clearly represent your value to companies." },
      { title: "Vetted companies", desc: "Every company in our network is pre-assessed for culture, processes and remote readiness." },
    ],
    requireLabel: "What we look for",
    requireHeadline: "Is MRG right for you?",
    fitTitle: "Perfect match",
    niceTitle: "Nice to have",
    checksFit: ["3+ years of development experience", "Remote work experience", "Autonomous working style", "Communication in German or English"],
    checksNiceToHave: ["Open-source contributions", "Stack flexibility", "Startup experience", "Agile knowledge"],
    seniorityNote: "We work with developers of all seniority levels.",
    processLabel: "The Process",
    processHeadline: "From profile to contract",
    applySteps: [
      { step: "01", title: "Submit your profile", desc: "Short conversation or send your profile — no lengthy application process." },
      { step: "02", title: "Technical interview", desc: "30-minute video interview with someone who actually understands your code." },
      { step: "03", title: "Matchmaking", desc: "Introduction to matching companies — only where it truly fits." },
      { step: "04", title: "Onboarding & support", desc: "Guidance at the start and a point of contact throughout the collaboration." },
    ],
    ctaHeadline1: "Ready for your",
    ctaHeadline2: "next project?",
    ctaSub: "A short conversation is enough — no lengthy application process.",
    ctaBtn: "Apply now",
  },
  contact: {
    label: "Contact",
    headline: "Write to us",
    sub: "We usually respond within 24 hours.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "E-Mail",
    emailPlaceholder: "your@email.com",
    companyLabel: "Company",
    companyOptional: "(optional)",
    companyPlaceholder: "Optional",
    roleLabel: "I am...",
    rolePlaceholder: "Please select",
    messageLabel: "Message",
    messagePlaceholder: "How can we help you?",
    submitSending: "Sending…",
    submitBtn: "Send message",
    successTitle: "Thank you!",
    successMsg: "We've received your message and will be in touch soon.",
    serverError: "Something went wrong. Please try again.",
    trust: ["Reply within 24h", "Free & non-binding"],
    directTitle: "Direct contact",
    calendarText: "Prefer to book a call directly?",
    calendarBtn: "Book a slot",
    roles: [
      { value: "Startup-Gründer", label: "Startup Founder" },
      { value: "CTO/Tech-Lead", label: "CTO / Tech Lead" },
      { value: "HR/Recruiting", label: "HR / Recruiting" },
      { value: "Entwickler auf Jobsuche", label: "Developer looking for a job" },
      { value: "Investor", label: "Investor" },
      { value: "Sonstiges", label: "Other" },
    ],
    nameError: "Name must be at least 2 characters",
    emailError: "Invalid email address",
    messageError: "Message must be at least 20 characters",
  },
};

const translations: Record<Lang, Translations> = { de, en };

export function useT(lang: Lang): Translations {
  return translations[lang];
}
