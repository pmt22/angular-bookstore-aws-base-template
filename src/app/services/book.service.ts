import { Injectable } from "@angular/core";
import { Book } from "../models/book";
import { API } from "aws-amplify";
import { Recommendation } from "../models/recommendation";
import { Order, PastOrder } from "../models/order";

@Injectable({providedIn:"root"})
export class Bookservice {
  public listBook(category:string): Promise<Book[]> {
    return API.get("books", `/books?category=${category}`, Book.empty());
  }

  public getBook(bookId:string):Promise<Book> {
    return API.get("books", `/books/${bookId}`, Book.empty());
  }

  public search(query:string):Promise<Book[]> {
    return API.get("search", `/search?q=${query}`, Book.empty());
  }

  public getFriendRecommendations(): Promise<Recommendation[]> {
    return API.get("recommendations", "/recommendations", Recommendation.empty());
  }

  public getBestSellers(): Promise<string[]> {
    return API.get("bestsellers", "/bestsellers", {});
  }

  public async addToCart(bookId:string, price:number) {
    const bookInCart = await API.get("cart", `/cart/${bookId}`, {});
    // if the book already exists in the cart, increase the quantity
    if (bookInCart) {
      return API.put("cart", "/cart", {
        body: {
          bookId: bookId,
          quantity: bookInCart.quantity + 1
        }
      });
    }

    // if the book does not exist in the cart, add it
    else {
      return API.post("cart", "/cart", {
        body: {
          bookId: bookId,
          price: price,
          quantity: 1,
        }
      });
    }
  }

  public async removeFromCart(bookId:string) {
    return await API.del("cart", "/cart", {
      body: {
        bookId: bookId,
      }
    });
  }

  public async listOrderInCart():Promise<Order[]> {
    return API.get("cart", "/cart", Order.empty());
  }

  public async checkout(orders: Order[]) {
    return await API.post("orders", "/orders", {
      body: {
        books: orders
      }
    });
  }

  public getPastOrders(): Promise<PastOrder[]>{
    return API.get("orders", "/orders", PastOrder.empty());
  }
}