'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LanguageProvider } from '@/lib/i18n';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith('/grabsch-hero') || pathname.startsWith('/leads')) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  );
}
