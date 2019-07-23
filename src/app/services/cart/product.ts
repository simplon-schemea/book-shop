import { Book } from "shared/book";


export class Product {
  name: string;
  price: Price;

  constructor(obj?: Book) {
    if (obj instanceof Book) {
      this.initializeFromBook(obj);
    }
  }

  initializeFromBook(book: Book) {
    this.name = book.title;
    this.price = book.price;
  }

  computeDiscountPrice(discounts: Discount[]) {
    let price = Object.assign({}, this.price);
    for (const discount of discounts) {
      if (discount.target === "product" && discount.validFor(this)) {
        price = discount.discountedPrice(price);
      }
    }
    return price;
  }
}
