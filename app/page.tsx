import Link from "next/link";
import { HomeCatalog } from "@/app/_components/home-catalog";
import { SiteHeader } from "@/app/_components/site-header";
import { contact, faqItems } from "@/app/_content/home";
import { ArchitectsSection } from "@/app/_components/home/ArchitectsSection";
import { ContactSection } from "@/app/_components/home/ContactSection";
import { FaqSection } from "@/app/_components/home/FaqSection";
import { HeroSection } from "@/app/_components/home/HeroSection";
import { MaterialsSection } from "@/app/_components/home/MaterialsSection";
import { OfferSection } from "@/app/_components/home/OfferSection";
import { ProcessSection } from "@/app/_components/home/ProcessSection";
import { ProofSection } from "@/app/_components/home/ProofSection";
import { SalonSection } from "@/app/_components/home/SalonSection";
import { SiteFooter } from "@/app/_components/home/SiteFooter";
import { TrustSection } from "@/app/_components/home/TrustSection";
import { headerNavigation } from "@/lib/site";
import { buildHomeJsonLd, serializeJsonLd } from "@/lib/seo/jsonld";

export default function Home() {
  const jsonLd = buildHomeJsonLd({ contact, faqItems });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />

      <div className="min-h-screen bg-background">
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-background"
        >
          Przejdź do treści
        </Link>

        <SiteHeader
          navigation={headerNavigation}
          quoteHref="#kontakt"
          salonHref="#salon"
        />

        <main id="main-content">
          <HeroSection />
          <TrustSection />
          <OfferSection />
          <MaterialsSection />
          <HomeCatalog />
          <ProofSection />
          <ProcessSection />
          <SalonSection />
          <ArchitectsSection />
          <FaqSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
