export class Order {
  bookId:string;
  customerId:string;
  price: number;
  quantity:number;
}

export class PastOrder {
  books:Order[];
  customerId:string;
  orderDate:number;
  orderId:string;
}