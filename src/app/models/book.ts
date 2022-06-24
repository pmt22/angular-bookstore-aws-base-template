export class Book {
  id?: string;
  cover?: string;
  price?: number;
  category?: string;
  name?: string;
  rating?: number;
  author?: string;

  static empty(): Book {
    return new Book();
  }
}