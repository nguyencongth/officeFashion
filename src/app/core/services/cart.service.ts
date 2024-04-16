import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {Observable, map, BehaviorSubject} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.api.urlCart;
  cartItemCount = new BehaviorSubject<number>(0);
  cartItemsSubject = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) { }

  addCartItem(customerId: number, productId: number, quantity: number):Observable<any> {
    const url = `${this.apiUrl}/addToCart`;
    const data = {
      customerId: customerId,
      productId: productId,
      categoryId: 0,
      imageProduct: "string",
      productName: "string",
      price: 0,
      quantity: quantity,
      dateAdded: "2023-10-20T17:01:46.598Z",
    }
    return this.http.post(url, data).pipe(
      map((data: any) => {
        if(data.statusCode === 200) {
          this.updateCart();
        }
        return data.statusCode === 200;
      })
    );
  }
  getCartItems(customerId: number):Observable<any> {
    const url = `${this.apiUrl}/showCartItem?customerID=${customerId}`;
    return this.http.get(url);
  }
  removeCartItem(customerId: number, productId: number):Observable<any> {
    const url = `${this.apiUrl}/deleteCartItem?customerID=${customerId}&productID=${productId}`;
    return this.http.delete(url).pipe(
      map((data: any) => {
        if(data.statusCode === 200) {
          this.updateCart();
        }
        return data.statusCode === 200;
      })
    );
  }
  removeCart(customerId: number):Observable<any> {
    const url = `${this.apiUrl}/deleteCart?customerID=${customerId}`;
    return this.http.delete(url).pipe(
      map((data: any) => {
        if(data.statusCode === 200) {
          this.updateCart();
        }
        return data.statusCode === 200;
      })
    );
  }
  updateCartItemCount() {
    const customerId = Number(localStorage.getItem('user_id'));
    this.getCartItems(customerId).subscribe((data:any)=>{
      const cartItems = data.arrayCart;
      const totalItems = cartItems.reduce((acc:any, item:any) => {
        return acc + item.quantity;
      }, 0)
      this.cartItemCount.next(totalItems);
    })
  }
  updateCart() {
    const customerId = Number(localStorage.getItem('user_id'));
    this.getCartItems(customerId).subscribe((data: any) => {
      const cartItems = data.arrayCart;
      this.cartItemsSubject.next(cartItems);
      this.updateCartItemCount();
    });
  }
  updateQuantity(customerId: number, productId: number, newQuantity: number):Observable<any> {
    const url = `${this.apiUrl}/updateCartQuantity?customerID=${customerId}&productID=${productId}&newQuantity=${newQuantity}`;
    return this.http.patch(url, {}).pipe(
      map((data: any) => {
        if(data.statusCode === 200) {
          this.updateCart();
        }
        return data.statusCode === 200;
      })
    );
  }
}
