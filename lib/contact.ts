export const contact = {
  company: "KOLSS Polska Sp. z o.o.",
  streetAddress: "ul. Zegrzyńska 6",
  postalCode: "05-119",
  city: "Legionowo",
  phone: "+48 510 700 913",
  phoneHref: "tel:+48510700913",
  email: "biuro@kolss.eu",
  emailHref: "mailto:biuro@kolss.eu",
} as const;

export const salonRouteHref =
  "https://www.google.com/maps/dir/?api=1&destination=52.401807098688344%2C20.948270951456184";

export const salonMapSrc =
  "https://www.google.com/maps?q=52.401807098688344%2C20.948270951456184&output=embed";

export const openingHours = [
  ["Poniedziałek", "10:00-19:00"],
  ["Wtorek", "10:00-19:00"],
  ["Środa", "10:00-19:00"],
  ["Czwartek", "10:00-19:00"],
  ["Piątek", "10:00-19:00"],
  ["Sobota", "10:00-15:00"],
  ["Niedziela", "zamknięte"],
] as const;

export const compactOpeningHours = [
  ["Pon.-Pt.", "10:00-19:00"],
  ["Sobota", "10:00-15:00"],
  ["Niedziela", "zamknięte"],
] as const;
