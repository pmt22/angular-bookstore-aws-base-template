export class Order {
  bookId?:string;
  customerId?:string;
  price?: number;
  quantity?:number;

  static empty(): Order {
    return new Order();
  }
}

export class PastOrder {
  books?:Order[];
  customerId?:string;
  orderDate?:number;
  orderId?:string;

  static empty(): PastOrder {
    return new PastOrder();
  }
}