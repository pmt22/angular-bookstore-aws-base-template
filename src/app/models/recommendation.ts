export class Recommendation {
  bookId?:string;
  purchases?: number;
  friendsPurchased?: string[];

  static empty(): Recommendation {
    return new Recommendation();
  }
}