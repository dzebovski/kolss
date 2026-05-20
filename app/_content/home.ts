import type { StaticImageData } from "next/image";

import heroImage from "@/assets/images/home/hero.desktop.jpg";
import floresMain from "@/assets/images/kitchens/flores/flores-main.desktop.jpg";
import lightMain from "@/assets/images/kitchens/light/light-main.desktop.jpg";
import notaMain from "@/assets/images/kitchens/nota/nota-main.desktop.jpg";
import someKitchenImage from "@/assets/images/some-kitchen.desktop.jpg";
import workersOneImage from "@/assets/images/workers-1.dektop.jpg";
import workersThreeImage from "@/assets/images/workers-3.dektop.jpg";
import { contact } from "@/lib/contact";

export { contact } from "@/lib/contact";

export type HomeImageItem = {
  title: string;
  text: string;
  cta?: string;
  image: StaticImageData;
  alt: string;
};

export const homeImages = {
  hero: heroImage,
  someKitchen: someKitchenImage,
  workersOne: workersOneImage,
  workersThree: workersThreeImage,
} as const;

export const trustItems = [
  {
    title: "Od 1995 roku",
    text: "Doświadczenie w projektowaniu i produkcji mebli na wymiar.",
  },
  {
    title: "Salon w Legionowie",
    text: "Miejsce spotkań, próbek materiałowych i rozmów o projekcie.",
  },
  {
    title: "Warszawa i okolice",
    text: "Obsługujemy klientów z Warszawy, Legionowa i okolicznych miejscowości.",
  },
  {
    title: "Jeden proces",
    text: "Wycena, dopracowanie techniczne, produkcja, dostawa i montaż.",
  },
] as const;

export const offerItems: HomeImageItem[] = [
  {
    title: "Kuchnie na wymiar",
    text: "Nowoczesne, klasyczne i ciepłe minimalistyczne kuchnie dopasowane do pomieszczenia, sprzętu AGD i codziennego rytmu domowników.",
    cta: "Omów kuchnię",
    image: lightMain,
    alt: "Jasna kuchnia z prostą linią zabudowy",
  },
  {
    title: "Kuchnia + salon",
    text: "Zabudowy, które łączą kuchnię, wyspę, strefę jadalni i meble dzienne w jednym spójnym języku materiałów.",
    cta: "Zaplanuj strefę dzienną",
    image: floresMain,
    alt: "Kuchnia z wyspą i ciepłymi drewnianymi frontami",
  },
  {
    title: "Szafy i garderoby",
    text: "Systemy przechowywania projektowane pod realne rzeczy, wymiary i sposób korzystania z mieszkania.",
    cta: "Wyceń zabudowę",
    image: heroImage,
    alt: "Zabudowa kuchenna połączona z meblami dziennymi",
  },
  {
    title: "Łazienki i utility",
    text: "Meble do łazienek, pralni i stref technicznych, gdzie liczy się dokładny wymiar, odporność i łatwe utrzymanie porządku.",
    cta: "Zapytaj o rozwiązanie",
    image: workersOneImage,
    alt: "Detal produkcji elementu meblowego na wymiar",
  },
];

export const materialBullets = [
  "Fornir i drewno: naturalna głębia, spokojny charakter i indywidualny rysunek materiału.",
  "Lakierowane powierzchnie: czysta forma, szeroka paleta kolorów i łatwiejsze dopasowanie do projektu.",
  "Blaty i panele: elementy, które muszą łączyć estetykę z odpornością w codziennym użytkowaniu.",
  "Okucia i systemy wewnętrzne: detale, które decydują o tym, jak kuchnia działa po latach.",
] as const;

export const materialSwatches = [
  {
    name: "Oak",
    text: "Warm fronts",
    color: "var(--kolss-oak)",
  },
  {
    name: "Walnut",
    text: "Deep veneer",
    color: "var(--kolss-walnut)",
  },
  {
    name: "Stone",
    text: "Soft panels",
    color: "var(--kolss-stone)",
  },
  {
    name: "Muted green",
    text: "Showroom accent",
    color: "var(--kolss-muted-green)",
  },
] as const;

export const proofItems: HomeImageItem[] = [
  {
    title: "Ciepła kuchnia z wyspą",
    text: "Kierunek dla wnętrz, w których kuchnia jest częścią codziennej strefy dziennej.",
    image: floresMain,
    alt: "Ciepła kuchnia z wyspą i drewnianymi frontami",
  },
  {
    title: "Jasna klasyczna zabudowa",
    text: "Spokojniejsza klasyka z naciskiem na proporcje, detale i praktyczny układ.",
    image: notaMain,
    alt: "Jasna klasyczna zabudowa kuchenna z dekoracyjnymi detalami",
  },
  {
    title: "Nowoczesna zabudowa kuchnia + salon",
    text: "Spójny język materiałów dla kuchni, przechowywania i mebli dziennych.",
    image: someKitchenImage,
    alt: "Nowoczesna kuchnia połączona ze strefą salonu",
  },
];

export const processSteps = [
  {
    title: "Rozmowa i potrzeby",
    text: "Poznajemy Twoje potrzeby, styl życia i oczekiwania. Możesz przesłać plan, zdjęcia lub inspiracje.",
    icon: "IconMessageCircle",
  },
  {
    title: "Wstępna analiza przestrzeni",
    text: "Sprawdzamy układ, wymiary i możliwości techniczne, aby zaproponować właściwy kierunek projektu.",
    icon: "IconRulerMeasure",
  },
  {
    title: "Materiały, kierunek i wycena",
    text: "Dobieramy estetykę, materiały i konfigurację. Przygotowujemy orientacyjną wycenę na podstawie ustaleń.",
    icon: "IconLayers",
  },
  {
    title: "Umowa i przedpłata",
    text: "Po akceptacji wszystkich szczegółów podpisujemy umowę, a Klient dokonuje przedpłaty. Dzięki temu możemy zarezerwować materiały i rozpocząć realizację.",
    icon: "IconFileCheck",
  },
  {
    title: "Pomiar i przygotowanie produkcji",
    text: "Wykonujemy dokładny pomiar i finalizujemy rozwiązania techniczne. Przygotowujemy projekt do produkcji.",
    icon: "IconTapeMeasure",
  },
  {
    title: "Produkcja, montaż i opieka",
    text: "Realizujemy zamówienie, montujemy zabudowę i pozostajemy do Twojej dyspozycji po zakończeniu prac.",
    icon: "IconHammer",
  },
] as const;

export const architectBullets = [
  "analiza projektu i wizualizacji",
  "dobór materiałów oraz rozwiązań technicznych",
  "wycena na podstawie dokumentacji",
  "produkcja, dostawa i montaż",
] as const;

export const faqItems = [
  {
    question: "Czy KOLSS Polska pracuje w Warszawie?",
    answer:
      "Tak. Obsługujemy Warszawę i okolice, a salon KOLSS Polska znajduje się w Legionowie.",
  },
  {
    question: "Czy mogę wysłać gotowy projekt od architekta?",
    answer:
      "Tak. Możesz wysłać wizualizacje, rysunki techniczne, rzut mieszkania albo listę założeń. Na tej podstawie przygotujemy wstępną analizę i dalsze pytania do wyceny.",
  },
  {
    question: "Czy można zacząć bez gotowego projektu?",
    answer:
      "Tak. Wystarczą zdjęcia, podstawowe wymiary, inspiracje i opis potrzeb. Pomożemy ustalić, jakie dane są potrzebne do kolejnego kroku.",
  },
  {
    question: "Co wpływa na cenę kuchni na wymiar?",
    answer:
      "Na cenę wpływają wymiary, układ, fronty, korpusy, blat, okucia, wewnętrzne wyposażenie, sprzęt AGD, zakres montażu i stopień indywidualizacji projektu.",
  },
  {
    question: "Czy wykonujecie tylko kuchnie?",
    answer:
      "Nie. Oprócz kuchni możemy projektować i wykonywać szafy, garderoby, zabudowy dzienne, meble łazienkowe i utility w spójnym języku materiałów.",
  },
  {
    question: "Jak umówić wizytę w salonie?",
    answer:
      "Najprościej zadzwonić, napisać na biuro@kolss.eu albo wysłać formularz z krótkim opisem projektu. Jeśli masz plan lub wizualizację, dołącz je od razu.",
  },
] as const;

export const projectTypes = [
  "Kuchnia",
  "Kuchnia + salon",
  "Szafy / garderoby",
  "Łazienka / utility",
  "Kilka zabudów w mieszkaniu",
  "Projekt od architekta",
] as const;

export const contactCards = [
  {
    title: "Salon i adres",
    details: [
      {
        label: "Salon",
        value: contact.company,
        icon: "buildingStore",
      },
      {
        label: "Adres",
        value: `${contact.streetAddress}, ${contact.postalCode} ${contact.city}`,
        icon: "mapPin",
      },
    ],
  },
  {
    title: "Telefon i e-mail",
    details: [
      {
        label: "Telefon",
        value: contact.phone,
        href: contact.phoneHref,
        icon: "phone",
      },
      {
        label: "E-mail",
        value: contact.email,
        href: contact.emailHref,
        icon: "mail",
      },
    ],
  },
] as const;

export type ContactCardDetailIcon =
  | "buildingStore"
  | "mapPin"
  | "phone"
  | "mail";
