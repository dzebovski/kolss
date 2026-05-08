import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBuildingStore,
  IconHammer,
  IconLeaf,
  IconMessageCircle,
  IconRulerMeasure2,
  IconShieldCheck,
  IconToolsKitchen2,
  IconTruckDelivery,
} from "@tabler/icons-react";
import floresMain from "@/assets/images/kitchens/flores/flores-main.desktop.jpg";

export const metadata: Metadata = {
  title: "KOLSS Design System",
  description:
    "Warm premium natural interface system for KOLSS website.",
};

const colors = [
  {
    name: "Lime",
    hex: "#CADC38",
    usage: "Primary CTA / Accent",
    value: "var(--kolss-lime)",
  },
  {
    name: "Charcoal",
    hex: "#1E2421",
    usage: "Main Text / Dark Surface",
    value: "var(--kolss-charcoal)",
  },
  {
    name: "Warm White",
    hex: "#F7F5EF",
    usage: "Main Background",
    value: "var(--kolss-warm-white)",
  },
  {
    name: "Stone",
    hex: "#D8D3C8",
    usage: "Secondary Background",
    value: "var(--kolss-stone)",
  },
  {
    name: "Oak",
    hex: "#B9854F",
    usage: "Natural Accent",
    value: "var(--kolss-oak)",
  },
  {
    name: "Walnut",
    hex: "#6B4A32",
    usage: "Deep Material Accent",
    value: "var(--kolss-walnut)",
  },
  {
    name: "Muted Green",
    hex: "#6F7A5C",
    usage: "Soft Accent",
    value: "var(--kolss-muted-green)",
  },
] as const;

const badges = [
  { label: "NEW", className: "bg-kolss-lime text-kolss-charcoal" },
  {
    label: "BESPOKE",
    className: "border border-border bg-transparent text-kolss-charcoal",
  },
  {
    label: "NATURAL MATERIAL",
    className: "bg-kolss-muted-green text-kolss-warm-white",
  },
  { label: "SHOWROOM", className: "bg-kolss-stone text-kolss-charcoal" },
  {
    label: "WOOD VENEER",
    className: "border border-kolss-oak/36 bg-kolss-oak/14 text-kolss-charcoal",
  },
  {
    label: "SOLID WOOD",
    className:
      "border border-kolss-walnut/30 bg-kolss-walnut/12 text-kolss-charcoal",
  },
] as const;

const uiCards = [
  {
    label: "Material card",
    title: "Oak Natural",
    text: "Warm, tactile and timeless.",
    icon: IconLeaf,
  },
  {
    label: "Showroom card",
    title: "Visit our showroom",
    text: "See materials, fronts and finishes in person.",
    icon: IconBuildingStore,
  },
  {
    label: "Trust card",
    title: "Crafted since 1995",
    text: "Full-cycle production and long-term service.",
    icon: IconShieldCheck,
  },
] as const;

const iconFeatures = [
  {
    title: "Craftsmanship",
    text: "Precise production and refined details.",
    icon: IconHammer,
  },
  {
    title: "Natural materials",
    text: "Wood, veneer and calm material palettes.",
    icon: IconLeaf,
  },
  {
    title: "Showroom",
    text: "Materials and finishes visible in person.",
    icon: IconBuildingStore,
  },
  {
    title: "Consultation",
    text: "Individual planning around the project.",
    icon: IconMessageCircle,
  },
  {
    title: "Delivery / installation",
    text: "Measured, delivered and mounted as one process.",
    icon: IconTruckDelivery,
  },
  {
    title: "Warranty / service",
    text: "Long-term support after installation.",
    icon: IconShieldCheck,
  },
] as const;

type IconComponent = typeof IconLeaf;

function DesignSection({
  id,
  eyebrow,
  title,
  children,
  dark = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`border-b px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20 ${
        dark
          ? "dark-section border-kolss-warm-white/14"
          : "border-border bg-background"
      }`}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <p className="section-kicker">{eyebrow}</p>
        <h2 className="section-title max-w-[760px]">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function ColorCard({
  name,
  hex,
  usage,
  value,
}: {
  name: string;
  hex: string;
  usage: string;
  value: string;
}) {
  return (
    <article className="kolss-card overflow-hidden">
      <div
        className="h-28 border-b border-border"
        style={{ backgroundColor: value }}
        aria-hidden="true"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-tight">{name}</h3>
        <p className="mt-1 font-mono text-sm text-muted">{hex}</p>
        <p className="mt-3 text-sm leading-[1.45] text-muted">{usage}</p>
      </div>
    </article>
  );
}

function IconFeature({
  icon: Icon,
  title,
  text,
}: {
  icon: IconComponent;
  title: string;
  text: string;
}) {
  return (
    <article className="kolss-card p-5">
      <span className="kolss-icon-tile">
        <Icon aria-hidden="true" size={25} stroke={1.7} />
      </span>
      <h3 className="mt-5 text-xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 text-[15px] leading-[1.55] text-muted">{text}</p>
    </article>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-kolss-surface-alt px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-20">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
          <div>
            <p className="section-kicker">Design system</p>
            <h1 className="hero-title max-w-[860px] text-[42px] font-semibold leading-[1.02] text-foreground sm:text-[64px] lg:text-[82px]">
              KOLSS Design System
            </h1>
            <p className="mt-6 max-w-[680px] text-lg leading-[1.6] text-muted">
              Warm premium natural interface system for KOLSS website.
            </p>
            <p className="mt-4 max-w-[760px] text-[15px] leading-[1.65] text-muted sm:text-base">
              The system uses lime as a focused brand accent, supported by warm
              neutrals, charcoal typography, stone surfaces and natural
              wood-inspired tones.
            </p>
            <a href="#ui-components" className="kolss-button kolss-button-primary mt-8">
              View UI Components
              <IconArrowRight aria-hidden="true" size={18} stroke={1.8} />
            </a>
          </div>
          <div className="kolss-panel p-5">
            <div className="grid grid-cols-4 gap-3">
              {colors.slice(0, 4).map((color) => (
                <span
                  key={color.name}
                  className="h-20 rounded-lg border border-border"
                  style={{ backgroundColor: color.value }}
                  aria-label={`${color.name} ${color.hex}`}
                />
              ))}
            </div>
            <p className="mt-5 text-sm leading-[1.55] text-muted">
              Lime appears as a precise interaction color, while warm white,
              stone, oak and walnut carry the material character.
            </p>
          </div>
        </div>
      </section>

      <DesignSection
        eyebrow="Reference"
        title="Visual reference for color usage, UI rhythm and dark/light contrast."
      >
        <figure>
          <Image
            src="/kolss-colors-example.png"
            alt="KOLSS website color system reference"
            width={1491}
            height={1055}
            priority
            className="w-full rounded-[22px] border border-border object-cover shadow-[0_24px_70px_rgba(30,36,33,0.12)]"
          />
          <figcaption className="mt-4 text-sm leading-[1.5] text-muted">
            Visual reference for color usage, UI rhythm and dark/light contrast.
          </figcaption>
        </figure>
      </DesignSection>

      <DesignSection eyebrow="Palette" title="Natural warmth with a focused lime accent.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map((color) => (
            <ColorCard key={color.name} {...color} />
          ))}
        </div>
      </DesignSection>

      <DesignSection eyebrow="Typography" title="Editorial headings, readable body copy.">
        <div className="grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
          <div className="kolss-card p-6">
            <p className="text-sm font-semibold uppercase leading-none text-kolss-muted-green">
              Display Heading
            </p>
            <h2 className="mt-4 font-serif text-[42px] font-semibold leading-[1.02] sm:text-[58px]">
              Bespoke kitchens crafted from natural materials.
            </h2>
          </div>
          <div className="grid gap-5">
            <div className="kolss-card p-6">
              <p className="text-sm font-semibold uppercase leading-none text-kolss-muted-green">
                Section Heading
              </p>
              <h3 className="mt-4 font-serif text-3xl font-semibold leading-[1.08]">
                Materials selected for everyday living.
              </h3>
            </div>
            <div className="kolss-card p-6">
              <h4 className="text-xl font-semibold leading-tight">
                Card Heading
              </h4>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted">
                Body Text: Oak veneer fronts, Blum fittings and 18 mm furniture
                boards create a durable, refined kitchen system.
              </p>
              <p className="mt-3 text-sm leading-[1.5] text-kolss-text-muted">
                Muted Text: Support copy stays calm and secondary.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase leading-none text-kolss-muted-green">
                Small Label
              </p>
            </div>
          </div>
        </div>
      </DesignSection>

      <DesignSection
        id="ui-components"
        eyebrow="Buttons"
        title="Flat controls without gradients."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="kolss-card flex flex-wrap items-center gap-3 p-6">
            <button className="kolss-button kolss-button-primary" type="button">
              Book a Consultation
            </button>
            <button
              className="kolss-button kolss-button-primary"
              style={{ backgroundColor: "var(--kolss-accent-hover)" }}
              type="button"
            >
              Primary hover
            </button>
            <button className="kolss-button kolss-button-secondary" type="button">
              Explore Materials
            </button>
            <button className="kolss-button kolss-button-ghost" type="button">
              Visit Showroom
            </button>
            <a href="#cards" className="kolss-text-link">
              View Collection
            </a>
          </div>
          <div className="dark-section rounded-lg border border-kolss-warm-white/14 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <button className="kolss-button kolss-button-primary" type="button">
                Dark primary
              </button>
              <button className="kolss-button kolss-button-secondary" type="button">
                Dark secondary
              </button>
            </div>
          </div>
        </div>
      </DesignSection>

      <DesignSection eyebrow="Badges" title="Compact tags for collections and materials.">
        <div className="kolss-card flex flex-wrap gap-3 p-6">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className={`rounded-lg px-3 py-2 text-xs font-semibold uppercase leading-none ${badge.className}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </DesignSection>

      <DesignSection id="cards" eyebrow="Cards" title="Material, product and trust cards.">
        <div className="grid gap-5 lg:grid-cols-4">
          {uiCards.map(({ icon: Icon, ...card }) => (
            <article key={card.title} className="kolss-card p-5">
              <p className="text-xs font-semibold uppercase text-kolss-muted-green">
                {card.label}
              </p>
              <span className="kolss-icon-tile mt-5">
                <Icon aria-hidden="true" size={24} stroke={1.7} />
              </span>
              <h3 className="mt-5 text-xl font-semibold leading-tight">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-muted">
                {card.text}
              </p>
            </article>
          ))}

          <article className="kolss-card overflow-hidden">
            <div className="relative aspect-[4/3] bg-muted-surface">
              <Image
                src={floresMain}
                alt="Modern natural KOLSS kitchen"
                sizes="(max-width: 1023px) 100vw, 25vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase text-kolss-muted-green">
                Product / Collection card
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-tight">
                Modern Natural Kitchen
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-muted">
                Oak veneer fronts, stone worktop and clean architectural lines.
              </p>
            </div>
          </article>
        </div>
      </DesignSection>

      <DesignSection eyebrow="Sections" title="Light, stone and dark UI examples.">
        <div className="grid gap-5">
          <section className="rounded-lg border border-border bg-kolss-warm-white p-6">
            <p className="section-kicker">Light section</p>
            <h3 className="font-serif text-3xl font-semibold leading-[1.08]">
              Bespoke furniture designed around the home.
            </h3>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-muted">
              Warm white background, charcoal text and a lime CTA for the main
              action.
            </p>
            <button className="kolss-button kolss-button-primary mt-6" type="button">
              Book a Consultation
            </button>
          </section>

          <section className="rounded-lg border border-border bg-kolss-surface-alt p-6">
            <p className="section-kicker">Stone section</p>
            <div className="grid gap-4 md:grid-cols-3">
              {colors.slice(3, 6).map((color) => (
                <div key={color.name} className="material-swatch bg-background">
                  <div
                    className="material-swatch-chip"
                    style={{ backgroundColor: color.value }}
                    aria-hidden="true"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{color.name}</h3>
                    <p className="mt-1 text-sm text-muted">{color.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dark-section rounded-lg border border-kolss-warm-white/14 p-6">
            <p className="section-kicker">Dark section</p>
            <h3 className="font-serif text-3xl font-semibold leading-[1.08] text-kolss-warm-white">
              Premium contrast for confident CTA moments.
            </h3>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-kolss-warm-white/72">
              Charcoal background, warm white text and lime used only for the
              decisive action.
            </p>
            <button className="kolss-button kolss-button-primary mt-6" type="button">
              Request a Quote
            </button>
          </section>
        </div>
      </DesignSection>

      <DesignSection eyebrow="Forms" title="Warm inputs with visible lime focus states.">
        <form className="kolss-form kolss-card grid gap-5 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-semibold">
              Name
              <input className="min-h-12 px-3 text-base font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Phone
              <input className="min-h-12 px-3 text-base font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Project type
              <select className="min-h-12 px-3 text-base font-normal" defaultValue="">
                <option value="" disabled>
                  Kitchen
                </option>
                <option>Kitchen + living room</option>
                <option>Wardrobe</option>
                <option>Full apartment</option>
              </select>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold">
            Message
            <textarea className="px-3 py-3 text-base font-normal" rows={5} />
          </label>
          <button className="kolss-button kolss-button-primary w-full sm:w-fit" type="button">
            Request a Quote
          </button>
        </form>
      </DesignSection>

      <DesignSection eyebrow="Icons" title="Thin, clear icons for service and quality.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {iconFeatures.map((feature) => (
            <IconFeature key={feature.title} {...feature} />
          ))}
        </div>
      </DesignSection>

      <DesignSection dark eyebrow="Dark UI" title="Dark premium contrast with lime accents.">
        <div className="grid gap-5 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <p className="text-[15px] leading-[1.65] text-kolss-warm-white/72">
              Dark surfaces use charcoal instead of pure black, keeping the
              image premium and warm while preserving strong contrast.
            </p>
            <Link href="/" className="kolss-button kolss-button-primary mt-7">
              Back to website
              <IconArrowRight aria-hidden="true" size={18} stroke={1.8} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-lg border border-kolss-warm-white/14 bg-kolss-warm-white/6 p-5">
              <IconToolsKitchen2
                aria-hidden="true"
                size={28}
                stroke={1.6}
                className="text-kolss-lime"
              />
              <h3 className="mt-5 text-xl font-semibold leading-tight">
                Full-cycle production
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-kolss-warm-white/68">
                Planning, production, delivery and installation in one process.
              </p>
            </article>
            <article className="rounded-lg border border-kolss-warm-white/14 bg-kolss-warm-white/6 p-5">
              <IconRulerMeasure2
                aria-hidden="true"
                size={28}
                stroke={1.6}
                className="text-kolss-lime"
              />
              <h3 className="mt-5 text-xl font-semibold leading-tight">
                Individual fit
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-kolss-warm-white/68">
                Dimensions, materials and functions tailored to the interior.
              </p>
            </article>
          </div>
        </div>
      </DesignSection>
    </main>
  );
}
