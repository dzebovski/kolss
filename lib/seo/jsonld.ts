import { absoluteUrl, siteConfig } from "@/lib/site";

export type HomeFaqItem = {
  question: string;
  answer: string;
};

type JsonLdRoot = {
  "@context": "https://schema.org";
  "@graph": unknown[];
};

function jsonLdIds() {
  const base = absoluteUrl();

  return {
    organizationId: `${base}#organization`,
    localBusinessId: `${base}#local-business`,
    websiteId: `${base}#website`,
    webpageId: `${base}#webpage`,
    faqId: `${base}#faq`,
  } as const;
}

export function buildHomeJsonLd(input: {
  contact: {
    company: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    phone: string;
    email: string;
  };
  faqItems: readonly HomeFaqItem[];
}): JsonLdRoot {
  const { organizationId, localBusinessId, websiteId, webpageId, faqId } =
    jsonLdIds();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: input.contact.company,
        url: absoluteUrl(),
        telephone: input.contact.phone,
        email: input.contact.email,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: input.contact.phone,
            email: input.contact.email,
            contactType: "customer service",
            areaServed: "PL",
            availableLanguage: ["pl"],
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": localBusinessId,
        name: input.contact.company,
        url: absoluteUrl(),
        telephone: input.contact.phone,
        email: input.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: input.contact.streetAddress,
          postalCode: input.contact.postalCode,
          addressLocality: input.contact.city,
          addressCountry: "PL",
        },
        areaServed: ["Warszawa", "Legionowo", "okolice Warszawy"],
        parentOrganization: {
          "@id": organizationId,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: absoluteUrl(),
        inLanguage: siteConfig.language,
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        name: siteConfig.title,
        url: absoluteUrl(),
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": localBusinessId,
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: input.faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
        isPartOf: {
          "@id": webpageId,
        },
      },
    ],
  };
}

export function serializeJsonLd(jsonLd: unknown): string {
  // Prevent `<script>` breaking out via closing tags like `</script>`
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}
