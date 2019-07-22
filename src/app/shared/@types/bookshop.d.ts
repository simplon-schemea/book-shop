// interface Book {
//   title: string;
//   price: string;
//   authors: string[];
//   publisher: string;
//   pageCount: number;
//   description?: string;
//   identifiers: Map<string, string>;
//   rating?: number;

//   imageLinks: GoogleAPI.ThumbnailMap;

//   language: 'fr' | 'en';
// }

interface Discount {
  name: string;
  uuid: string;
  apply: (value: number) => number;
}

type ISBNType = "ISBN_10" | "ISBN_13";

declare const TweenLite: typeof import("gsap").TweenLite;
declare const Power2: typeof import("gsap").Power2;
