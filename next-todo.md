# KOLSS Polska Homepage Content Plan

Updated: 2026-05-07

This file is the next implementation brief for building the KOLSS Polska homepage content. It is based on:

- `kolss-knowledge-base.md`
- the competitor/positioning research PDF: `Ринок виробників кухонь у Польщі та Центрально-Східній Європі для позиціонування KOLSS.pdf`
- the current local homepage at `http://localhost:3000/`

## Fixed Decisions

- Primary domain: `https://kolss.eu`
- Language: Polish only.
- Region logic: Warsaw-first, with KOLSS Polska salon in Legionowo.
- Do not call Legionowo a `showroom`. Use `salon`.
- Use actual contacts from the knowledge base:
  - KOLSS Polska Sp. z o.o.
  - ul. Zegrzyńska 6, 05-119 Legionowo
  - +48 510 700 913
  - biuro@kolss.eu
  - projektant: Sławomir Szewczuk, +48 510 700 889, projektant@kolss.eu
- Do not publicly use unverified claims:
  - financial penalties for delays
  - absolute zero-emission claims
  - fixed delivery times for complex custom projects
  - certified material claims unless certificates are available
  - outdated sample sale inventory

## Strategic Positioning

KOLSS Polska should not try to look like another loud luxury kitchen brand. The strongest market space from the PDF research is:

**quiet premium / warm modern bespoke**

That means:

- premium through material, proportion, finish and process, not through visual excess;
- veneer, wood, lacquer, stone/ceramic and premium hardware as a coherent material system;
- architect-friendly communication: clear specs, upload project, material samples, technical conversation;
- one partner from idea/project to production, delivery and installation;
- regional trust: Warsaw and surrounding areas, with salon in Legionowo.

Recommended positioning sentence:

> KOLSS Polska projektuje i wykonuje kuchnie oraz zabudowy na wymiar dla Warszawy i okolic: od analizy planu i wyceny, przez dopracowanie techniczne, po produkcję, dostawę i montaż.

Shorter marketing version:

> Kuchnie i zabudowy na wymiar z naturalnym charakterem, precyzyjnym wykonaniem i spokojnym procesem od projektu do montażu.

## Target Homepage Job

The homepage should:

1. Explain what KOLSS Polska does in the first viewport.
2. Make the brand feel local enough for Warsaw clients.
3. Show a warmer, more material-led premium direction than generic kitchen makers.
4. Route users into inquiry actions:
   - upload/send a project
   - request preliminary quote
   - book salon consultation
5. Provide enough trust for users to believe KOLSS is real, organized and capable.

The homepage should not try to be a full catalog, blog, about page and process page at once. It should preview those ideas and push the user toward contact.

## Recommended Metadata

Title:

`Kuchnie i zabudowy na wymiar Warszawa | KOLSS Polska`

Description:

`KOLSS Polska projektuje i wykonuje kuchnie oraz zabudowy na wymiar dla Warszawy i okolic. Salon w Legionowie, wycena projektu, produkcja, dostawa i montaż.`

H1:

`Kuchnie i zabudowy na wymiar z naturalnym charakterem`

Primary SEO intent:

`kuchnie na wymiar Warszawa`

Secondary intents:

- `kuchnie fornirowane na wymiar`
- `kuchnie drewniane na wymiar`
- `meble kuchenne premium na wymiar`
- `zabudowy na wymiar Warszawa`
- `salon kuchni Legionowo`
- `meble na wymiar Warszawa i okolice`

## Homepage Structure and Polish Copy

### 1. Hero

Visual direction:

- Full-bleed kitchen image.
- Warm modern interior, visible material quality, not a dark generic stock photo.
- Keep text left aligned over the image.
- Use a dark readability layer only as much as needed.
- First viewport should show a hint of the next section.

Kicker:

`Kuchnie i zabudowy na wymiar | Warszawa i okolice`

H1:

`Kuchnie i zabudowy na wymiar z naturalnym charakterem`

Body:

`Projektujemy i wykonujemy kuchnie oraz zabudowy dopasowane do wnętrza, stylu życia i budżetu. Pracujemy z gotowymi projektami architektów albo zaczynamy od planu, zdjęć i rozmowy o potrzebach. Od pierwszej wyceny do montażu prowadzimy proces w jednym, czytelnym rytmie.`

Primary CTA:

`Otrzymaj wstępną wycenę`

Secondary CTA:

`Umów wizytę w salonie`

Hero trust line:

`KOLSS od 1995 roku | Salon w Legionowie | Warszawa i okolice | Projekt, produkcja, montaż`

Implementation notes:

- Replace current `Kuchnia stworzona dla Ciebie`.
- Replace `Umów wizytę w showroomie` with `Umów wizytę w salonie`.
- If the current hero image stays temporarily, it is acceptable. It fits warm modern premium better than most placeholder visuals.

### 2. Trust / Orientation Strip

Visual direction:

- Thin full-width band below hero.
- No large cards.
- Four compact facts, separated by vertical rules on desktop and stacked on mobile.

Copy:

`Od 1995 roku`

`Doświadczenie w projektowaniu i produkcji mebli na wymiar.`

`Salon w Legionowie`

`Miejsce spotkań, próbek materiałowych i rozmów o projekcie.`

`Warszawa i okolice`

`Obsługujemy klientów z Warszawy, Legionowa i okolicznych miejscowości.`

`Jeden proces`

`Wycena, dopracowanie techniczne, produkcja, dostawa i montaż.`

### 3. Oferta

Visual direction:

- Replace placeholder `Obszar oferty`.
- Use 4 offer blocks, each with a small image or material detail.
- Keep cards restrained, not decorative. Border radius 8px max.
- Each item should answer: what is it, when is it right, what is the next action.

Section kicker:

`Oferta`

H2:

`Co możemy zaprojektować i wykonać`

Intro:

`KOLSS Polska pomaga zaplanować pojedynczą kuchnię albo kilka zabudów w jednym mieszkaniu. Najważniejsze decyzje podejmujemy na podstawie układu wnętrza, sposobu użytkowania i materiałów, które mają pracować przez lata.`

Offer cards:

1. `Kuchnie na wymiar`

   `Nowoczesne, klasyczne i ciepłe minimalistyczne kuchnie dopasowane do pomieszczenia, sprzętu AGD i codziennego rytmu domowników.`

   CTA: `Omów kuchnię`

2. `Kuchnia + salon`

   `Zabudowy, które łączą kuchnię, wyspę, strefę jadalni i meble dzienne w jednym spójnym języku materiałów.`

   CTA: `Zaplanuj strefę dzienną`

3. `Szafy i garderoby`

   `Systemy przechowywania projektowane pod realne rzeczy, wymiary i sposób korzystania z mieszkania.`

   CTA: `Wyceń zabudowę`

4. `Łazienki i utility`

   `Meble do łazienek, pralni i stref technicznych, gdzie liczy się dokładny wymiar, odporność i łatwe utrzymanie porządku.`

   CTA: `Zapytaj o rozwiązanie`

### 4. Materials / Quiet Premium Block

Visual direction:

- This block should feel more premium than the offer block.
- Use one large material/image panel and one text column.
- Temporary image: use a close-up from current kitchen detail assets or Warsaw Showroom Sales.
- Eventually replace with macro shots of veneer, edge, hardware, stone/ceramic, lacquer.

Kicker:

`Materiały`

H2:

`Premium, który widać w dotyku i detalach`

Body:

`Najlepsze kuchnie nie są tylko "drewniane" albo "nowoczesne". Dobrze działają wtedy, gdy materiały tworzą spójną całość: fornir lub drewno daje wnętrzu ciepło, lakier porządkuje formę, kamień albo blat kompaktowy buduje trwałą powierzchnię roboczą, a okucia odpowiadają za codzienny komfort.`

Bullet points:

- `Fornir i drewno: naturalna głębia, spokojny charakter i indywidualny rysunek materiału.`
- `Lakierowane powierzchnie: czysta forma, szeroka paleta kolorów i łatwiejsze dopasowanie do projektu.`
- `Blaty i panele: elementy, które muszą łączyć estetykę z odpornością w codziennym użytkowaniu.`
- `Okucia i systemy wewnętrzne: detale, które decydują o tym, jak kuchnia działa po latach.`

CTA:

`Porozmawiaj o materiałach`

### 5. Kitchen Slider / Current Carousel Content

Current problem:

- The slider has Polish titles but Ukrainian/Russian placeholder captions.
- It must become fully Polish before any public demo.
- The slider should be material-led, not only model-name-led.

Section H2:

`Kuchnie ze szlachetnych materiałów`

Intro:

`Poniżej pokazujemy kierunki estetyczne, które mogą stać się punktem wyjścia do indywidualnej kuchni. Każdy projekt dopasowujemy do wymiarów, układu wnętrza i wybranej konfiguracji materiałów.`

#### Slide 1: Light

Title:

`Light`

Subtitle:

`Jasna baza do nowoczesnych mieszkań i spokojnych, funkcjonalnych wnętrz.`

Main image alt:

`Jasna kuchnia z białymi frontami, drewnianym akcentem i prostą linią zabudowy`

Detail caption 1:

`Gładkie fronty i prosta geometria pomagają utrzymać lekki, uporządkowany charakter kuchni.`

Detail caption 2:

`Blat, uchwyty i panel roboczy można dobrać tak, aby kuchnia była bardziej minimalistyczna albo cieplejsza wizualnie.`

Best for:

`mieszkania, apartamenty, projekty z kontrolowanym budżetem, jasne wnętrza`

#### Slide 2: Flores

Title:

`Flores`

Subtitle:

`Ciepły fornir, ciemniejszy blat i zabudowa, która łączy kuchnię ze strefą dzienną.`

Main image alt:

`Nowoczesna kuchnia z ciepłymi drewnianymi frontami, ciemnym blatem i wyspą`

Detail caption 1:

`Fornir lub drewniany rysunek frontów ociepla wnętrze i dobrze łączy się z matowymi, spokojnymi powierzchniami.`

Detail caption 2:

`Ciemny blat i panel roboczy budują mocniejszy kontrast oraz bardziej architektoniczny charakter kuchni.`

Best for:

`ciepły minimalizm, kuchnia + salon, projekty z wyspą, wnętrza premium bez nadmiaru dekoracji`

#### Slide 3: Nota

Title:

`Nota`

Subtitle:

`Klasyczna inspiracja w bardziej eleganckim, dopracowanym wydaniu.`

Main image alt:

`Elegancka kuchnia z ciemnymi frontami, jasnym blatem i dekoracyjnymi uchwytami`

Detail caption 1:

`Frezowane lub bardziej dekoracyjne fronty nadają kuchni ponadczasowy charakter bez rezygnacji z funkcjonalnego układu.`

Detail caption 2:

`Uchwyty, blat i proporcje zabudowy powinny być dobrane razem, aby klasyka nie stała się przypadkowa.`

Best for:

`klasyczne apartamenty, domy, eleganckie wnętrza, kuchnie z mocniejszą osobowością`

#### Optional next slides from Warsaw Showroom Sales

When adding more temporary images, use assets from:

- `images/Photos - Kitchens/Warsaw Showroom Sales/Web Optimized/Grand/`
- `images/Photos - Kitchens/Warsaw Showroom Sales/Web Optimized/Capri/`
- `images/Photos - Kitchens/Warsaw Showroom Sales/Web Optimized/Madeyra/`
- `images/Photos - Kitchens/Warsaw Showroom Sales/Web Optimized/Flores/`

Suggested future slide:

Title:

`Grand`

Subtitle:

`Jasna klasyka z wyraźnym rysunkiem frontów i kontrastowym blatem.`

Caption:

`Dobre rozwiązanie dla klientów, którzy chcą bardziej eleganckiej kuchni, ale nadal oczekują praktycznej, codziennej funkcji.`

Implementation notes:

- Replace all current captions in `app/_components/home-catalog.tsx`.
- Keep current images temporarily.
- If adding Warsaw Showroom Sales images into the app, copy them into `kolss-polska/assets/images/kitchens/...` and import them statically.
- Do not describe exact materials unless confirmed for the shown model.

### 6. Realizacje / Proof Preview

Current problem:

- Current `Studium przypadku` cards are placeholders.
- Do not call them case studies until there is real case data: location, task, materials, result.

Visual direction:

- Use `Przykłady rozwiązań` for now.
- Use 3 image-led blocks with short, honest labels.
- Do not fake project names.

Kicker:

`Realizacje`

H2:

`Przykłady rozwiązań, które pokazują kierunek pracy`

Intro:

`Na stronie głównej pokazujemy wybrane kierunki estetyczne i funkcjonalne. Pełne studia przypadków warto dodać dopiero wtedy, gdy mamy potwierdzone zdjęcia, opis zadania, materiały i zakres realizacji.`

Temporary card labels:

- `Ciepła kuchnia z wyspą`
- `Jasna klasyczna zabudowa`
- `Nowoczesna zabudowa kuchnia + salon`

Target case template for later:

- `Problem klienta`
- `Rozwiązanie KOLSS`
- `Materiały`
- `Zakres`
- `Efekt`
- `CTA: Chcę podobne rozwiązanie`

### 7. Process

Visual direction:

- Horizontal timeline on desktop, vertical timeline on mobile.
- Use numbered steps, not decorative icon cards.
- This block should feel organized and technical.

Kicker:

`Proces`

H2:

`Jak wygląda współpraca od pierwszego planu do montażu`

Intro:

`Najlepszy efekt powstaje wtedy, gdy estetyka, technika i budżet są prowadzone razem. Dlatego zaczynamy od analizy danych wejściowych, a dopiero potem przechodzimy do wyceny, pomiaru i produkcji.`

Steps:

1. `Plan lub rozmowa`

   `Wysyłasz rzut, zdjęcia, wizualizację albo krótki opis tego, czego potrzebujesz.`

2. `Wstępna analiza`

   `Sprawdzamy układ, skalę projektu, oczekiwane materiały i zakres prac.`

3. `Wycena`

   `Przygotowujemy orientacyjną lub bardziej szczegółową propozycję na podstawie dostępnych danych.`

4. `Salon i próbki`

   `W salonie w Legionowie można omówić projekt, zobaczyć materiały i doprecyzować kierunek.`

5. `Pomiar i technika`

   `Po decyzji przechodzimy do dokładnych wymiarów, detali konstrukcyjnych i finalnej konfiguracji.`

6. `Produkcja i montaż`

   `Realizujemy zamówienie, dostarczamy meble i montujemy zabudowę na miejscu.`

CTA:

`Wyślij plan do wstępnej analizy`

### 8. Salon in Legionowo

Visual direction:

- This must be a trust/contact block, not a luxury showroom promise.
- Use `salon`.
- Temporary visual: workers image, kitchen image, video still, or exterior/interior photo if available.
- Add map later if needed.

Kicker:

`Salon`

H2:

`Spotkajmy się w salonie KOLSS w Legionowie`

Body:

`Salon w Legionowie to miejsce, w którym można porozmawiać o projekcie, obejrzeć wybrane rozwiązania i przejść przez materiały z projektantem. Jeśli masz już plan, wizualizację albo projekt od architekta, zabierz go ze sobą albo wyślij wcześniej do analizy.`

Contact block:

`KOLSS Polska Sp. z o.o.`

`ul. Zegrzyńska 6, 05-119 Legionowo`

`+48 510 700 913`

`biuro@kolss.eu`

`Projektant: Sławomir Szewczuk`

`+48 510 700 889`

`projektant@kolss.eu`

CTA:

`Umów wizytę w salonie`

### 9. Architects / Designers

Why include on homepage:

The PDF research strongly recommends architect-friendly UX. This does not need to be a large block yet, but the homepage should signal that KOLSS understands designers and technical projects.

Visual direction:

- Calm, technical, layout-driven block.
- Use a plan/sketch/process visual if available.
- No generic handshake photo.

Kicker:

`Dla architektów`

H2:

`Współpracujemy z projektantami i architektami wnętrz`

Body:

`Jeśli pracujesz z gotowym projektem, możemy przeanalizować dokumentację, doprecyzować rozwiązania techniczne i przygotować ofertę wykonawczą. KOLSS może być partnerem dla kuchni, zabudów dziennych, garderób, łazienek i innych elementów stolarskich w jednym wnętrzu.`

Bullets:

- `analiza projektu i wizualizacji`
- `dobór materiałów oraz rozwiązań technicznych`
- `wycena na podstawie dokumentacji`
- `produkcja, dostawa i montaż`

CTA:

`Wyślij projekt do analizy`

### 10. FAQ

Visual direction:

- Use accordion if implemented.
- If not, use clean stacked blocks.
- Keep answers short and factual.

Kicker:

`FAQ`

H2:

`Najczęstsze pytania przed pierwszą wyceną`

Questions:

`Czy KOLSS Polska pracuje w Warszawie?`

`Tak. Komunikację prowadzimy jako Warsaw-first: obsługujemy Warszawę i okolice, a salon KOLSS Polska znajduje się w Legionowie.`

`Czy mogę wysłać gotowy projekt od architekta?`

`Tak. Możesz wysłać wizualizacje, rysunki techniczne, rzut mieszkania albo listę założeń. Na tej podstawie przygotujemy wstępną analizę i dalsze pytania do wyceny.`

`Czy można zacząć bez gotowego projektu?`

`Tak. Wystarczą zdjęcia, podstawowe wymiary, inspiracje i opis potrzeb. Pomożemy ustalić, jakie dane są potrzebne do kolejnego kroku.`

`Co wpływa na cenę kuchni na wymiar?`

`Na cenę wpływają wymiary, układ, fronty, korpusy, blat, okucia, wewnętrzne wyposażenie, sprzęt AGD, zakres montażu i stopień indywidualizacji projektu.`

`Czy wykonujecie tylko kuchnie?`

`Nie. Oprócz kuchni możemy projektować i wykonywać szafy, garderoby, zabudowy dzienne, meble łazienkowe i utility w spójnym języku materiałów.`

`Jak umówić wizytę w salonie?`

`Najprościej zadzwonić, napisać na biuro@kolss.eu albo wysłać formularz z krótkim opisem projektu. Jeśli masz plan lub wizualizację, dołącz je od razu.`

### 11. Final CTA / Contact

Visual direction:

- Strong but restrained final band.
- Contact form and contact details should be visible together.
- Use a compact upload-first form.

H2:

`Wyślij plan, zdjęcia albo projekt do wstępnej analizy`

Body:

`Im więcej danych wyślesz na początku, tym szybciej możemy przygotować sensowną odpowiedź: rzut, wymiary, zdjęcia wnętrza, inspiracje, lista sprzętu AGD albo projekt od architekta.`

Recommended form fields:

- `Imię i nazwisko`
- `Telefon`
- `E-mail`
- `Miasto / lokalizacja inwestycji`
- `Jakiego zakresu dotyczy projekt?` with options:
  - `Kuchnia`
  - `Kuchnia + salon`
  - `Szafy / garderoby`
  - `Łazienka / utility`
  - `Kilka zabudów w mieszkaniu`
  - `Projekt od architekta`
- `Opis projektu`
- `Dodaj plik` for plan, visualisation, photos

CTA:

`Wyślij do wstępnej analizy`

Microcopy:

`Odpowiemy w godzinach pracy. Przesłanie projektu nie zobowiązuje do zamówienia.`

## Immediate Text Fixes in Existing Code

### `lib/site.ts`

Change:

- `url` fallback from `https://kolss.pl` to `https://kolss.eu`
- description from `Oficjalna strona Kolss Polska.` to:

`Kuchnie i zabudowy na wymiar dla Warszawy i okolic. Salon KOLSS Polska w Legionowie, wycena, produkcja, dostawa i montaż.`

Suggested navigation:

- `Start`
- `Oferta`
- `Materiały`
- `Realizacje`
- `Proces`
- `Salon`
- `FAQ`
- `Kontakt`

If the page remains one-page only, all links can be anchors.

### `app/page.tsx`

Replace placeholder arrays:

- `offerItems = ["Obszar oferty", ...]`
- `articleItems = ["Artykuł ekspercki", ...]`
- `faqItems = ["Pytanie klienta", ...]`

with structured data objects, not plain placeholder strings.

Replace hero copy:

- `Kuchnie na zamówienie` -> `Kuchnie i zabudowy na wymiar | Warszawa i okolice`
- `Kuchnia stworzona dla Ciebie` -> `Kuchnie i zabudowy na wymiar z naturalnym charakterem`
- current paragraph -> the hero body from this plan
- `Umów wizytę w showroomie` -> `Umów wizytę w salonie`

Replace sections:

- `Struktura oferty` -> `Co możemy zaprojektować i wykonać`
- `Informacje o marce` -> either remove or turn into process/material proof
- `Dane pomocnicze` -> remove; this is internal placeholder language
- `Studium przypadku` -> `Przykłady rozwiązań` until real case studies exist
- `Baza wiedzy` -> do not use as homepage placeholder unless real articles exist; replace with `Materiały` or `Dla architektów`
- contact placeholder bars -> actual contact details

Update JSON-LD:

- use `https://kolss.eu`
- include `Organization`
- include `LocalBusiness` with Legionowo address
- include visible contact details
- include `FAQPage` only for questions visible on page

### `app/_components/site-header.tsx`

Text change:

- `Umów wizytę w showroomie` -> `Umów wizytę w salonie`

Potential prop rename:

- `showroomHref` -> `salonHref`

This is optional but better for future consistency.

### `app/_components/home-catalog.tsx`

Must fix before public demo:

- Translate all captions to Polish.
- Remove Ukrainian/Russian temporary text.
- Use the slider copy from section `5. Kitchen Slider / Current Carousel Content`.
- Keep material claims careful.
- Consider renaming `Kolekcja Light` to just `Light`, `Kolekcja Flores` to `Flores`, `Kolekcja Nota` to `Nota`.

Current section title:

`Drewniane kuchnie na zamówienie`

Recommended replacement:

`Kuchnie ze szlachetnych materiałów`

Current intro:

`Oto główne typy kuchni, które oferujemy...`

Recommended replacement:

`Poniżej pokazujemy kierunki estetyczne, które mogą stać się punktem wyjścia do indywidualnej kuchni. Każdy projekt dopasowujemy do wymiarów, układu wnętrza i wybranej konfiguracji materiałów.`

## Visual Recommendations by Block

### Hero

- Full-bleed image, no framed card.
- Text over image, not split layout.
- Use warm neutral overlay, not blue/purple gradients.
- Avoid huge empty hero height. Next section should peek into the first viewport.
- Temporary image: `assets/images/home/hero.desktop.jpg`.

### Trust strip

- Dense, editorial, compact.
- White or off-white background.
- Small uppercase labels and short explanatory text.
- No icons needed unless they are very restrained.

### Offer

- Four clean cards or a 2x2 editorial grid.
- Each card should have either a small image crop or a material detail.
- Avoid skeleton placeholder bars.
- Keep card radius <= 8px.

### Materials

- Strong image-led block.
- Use macro or close-up photography.
- This is where KOLSS should feel more premium than generic Warsaw furniture makers.
- Best future images: veneer grain, lacquer edge, drawer system, stone/blat detail, joinery close-up.

### Slider

- Keep the current carousel pattern: one main image + two details.
- Use captions as educational proof, not decorative text.
- Make each slide explain why the material/shape matters.
- For mobile, captions must stay under images and never overlay busy photos.

### Process

- Use a technical timeline.
- Numbers should be clear.
- The block should reduce anxiety: the user understands what happens after sending a plan.

### Salon

- Use `salon`, never `showroom`.
- This block must build local trust, not oversell the space.
- Temporary visual can be a kitchen/salon image.
- Later add map and real salon photos if available.

### Architects

- Use more technical rhythm: clean grid, plan/document visual, upload CTA.
- Avoid decorative imagery.
- This block can be small on homepage but should link to a future dedicated page.

### FAQ

- Accordion on mobile.
- Keep answers short.
- Mirror the FAQ questions in JSON-LD.

### Final Contact

- The form should feel like an easy project submission, not a generic contact form.
- Primary action: send plan/project for preliminary analysis.
- Keep phone and email visible next to the form.

## Asset Plan

Use temporary images now:

- hero: `kolss-polska/assets/images/home/hero.desktop.jpg`
- current carousel: `kolss-polska/assets/images/kitchens/light/*`, `flores/*`, `nota/*`
- process/team: `kolss-polska/assets/images/workers-*.dektop.jpg`
- optional Polish direction: copy selected files from `images/Photos - Kitchens/Warsaw Showroom Sales/Web Optimized/`

Later replace with:

- real salon photos from Legionowo
- macro material photos
- real installed kitchens
- before/after or plan-to-result comparisons
- short video stills from `video/kolss-poznan.mov`

## Implementation Order

1. Update `lib/site.ts` for `kolss.eu`, description and navigation.
2. Replace hero text and all `showroom` wording with `salon`.
3. Replace placeholder arrays in `app/page.tsx` with real structured homepage content.
4. Update `HomeCatalog` copy and translate all slider captions.
5. Replace `Oferta`, `Realizacje`, `FAQ`, `Kontakt` placeholders with real Polish copy.
6. Add the `Materiały`, `Proces`, `Salon`, and `Dla architektów` sections.
7. Update JSON-LD to match visible content.
8. Verify mobile layout in the in-app browser.
9. Run lint/build.
10. After content is stable, improve image selection and add real form/upload flow.

## Acceptance Checklist

- [ ] Domain fallback is `https://kolss.eu`.
- [ ] No public text says `showroom`; all relevant text says `salon`.
- [ ] Contacts are visible and match the knowledge base.
- [ ] Homepage has no placeholder text.
- [ ] Slider captions are fully Polish.
- [ ] No unverified certification/SLA/penalty claims.
- [ ] Hero communicates Warsaw-first and KOLSS Polska clearly.
- [ ] Page explains materials, process, salon and next action.
- [ ] FAQ is visible and reflected in JSON-LD.
- [ ] Mobile first viewport includes H1 and primary CTA.
- [ ] Browser screenshot looks premium, calm and not like a generic template.
