import {
  KitchenCarousel,
  type KitchenCarouselCollection,
} from "@/app/_components/kitchen-carousel";
import floresDetailsOne from "@/assets/images/kitchens/flores/flores-details-1.jpg";
import floresDetailsTwo from "@/assets/images/kitchens/flores/flores-details-2.jpg";
import floresMain from "@/assets/images/kitchens/flores/flores-main.desktop.jpg";
import lightDetailsOne from "@/assets/images/kitchens/light/light-details-1.jpg";
import lightDetailsTwo from "@/assets/images/kitchens/light/light-details-2.jpg";
import lightMain from "@/assets/images/kitchens/light/light-main.desktop.jpg";
import notaDetailsOne from "@/assets/images/kitchens/nota/nota-details-1.jpg";
import notaDetailsTwo from "@/assets/images/kitchens/nota/nota-details-2.jpg";
import notaMain from "@/assets/images/kitchens/nota/nota-main.desktop.jpg";

const kitchenCollections: KitchenCarouselCollection[] = [
  {
    title: "Kolekcja Light",
    subtitle: "Kuchnie modułowe, biała baza.",
    image: lightMain,
    alt: "Jasna kuchnia z drewnianymi górnymi szafkami i białymi frontami",
    details: [
      {
        image: lightDetailsOne,
        alt: "Zbliżenie na biały front kuchenny z czarnym uchwytem",
        caption: "Про фасад, ручки Gola, і надійну фурнітуру Blum.",
      },
      {
        image: lightDetailsTwo,
        alt: "Zbliżenie na drewniany blat i zielone płytki nad kuchenką",
        caption:
          "Про столешницю з натурального дерева як опціональна комплектація",
      },
    ],
  },
  {
    title: "Kolekcja Flores",
    subtitle: "Kuchnia projektowana na zamówienie pod Twoje wymiary.",
    image: floresMain,
    alt: "Nowoczesna kuchnia z drewnianymi frontami i jasną wyspą",
    details: [
      {
        image: floresDetailsOne,
        alt: "Zbliżenie na fornirowane drewniane fronty kuchenne",
        caption:
          "Фасади мдф шпоновні, з ручками скритого монтажу. Повністю дерев’яні ящики, комплектуємо всі кухні. Надійні і витривкі.",
      },
      {
        image: floresDetailsTwo,
        alt: "Zbliżenie na jasny blat kuchenny i płytę grzewczą",
        caption:
          "Про столешницю з Gentas з вбудованою технікою і так далі",
      },
    ],
  },
  {
    title: "Kolekcja Nota",
    subtitle: "Kuchnia projektowana na zamówienie pod Twoje wymiary.",
    image: notaMain,
    alt: "Klasyczna granatowa kuchnia z marmurowym blatem i złotymi uchwytami",
    details: [
      {
        image: notaDetailsOne,
        alt: "Zbliżenie na granatowe fronty kuchenne ze złotymi uchwytami",
        caption:
          "Фасад з натурального масиву дерева, ручки італійські Marela, комплектування Ergobox доступне для всіх кухонь під замовлення і бажання клієнта.",
      },
      {
        image: notaDetailsTwo,
        alt: "Zbliżenie na blat, kuchenkę i granatową zabudowę kuchenną",
        caption:
          "Про столешницю з PFLEIDERER з вбудованою технікою і так далі",
      },
    ],
  },
];

export function HomeCatalog() {
  return (
    <section
      id="katalog-kuchni"
      aria-labelledby="home-catalog-title"
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="max-w-[820px]">
          <h2
            id="home-catalog-title"
            className="section-title max-w-[780px]"
          >
            Drewniane kuchnie na zamówienie
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-[1.45] text-foreground sm:text-base">
            Oto główne typy kuchni, które oferujemy. Korpusy wykonujemy z
            laminowanej płyty, a fronty mogą być laminowane, lakierowane,
            fornirowane lub z naturalnego drewna.
          </p>
        </div>

        <KitchenCarousel collections={kitchenCollections} />
      </div>
    </section>
  );
}
