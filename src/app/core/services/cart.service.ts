import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7249/api/Cart';
  constructor(private http: HttpClient) { }

  addCartItem(customerId: number, productId: number, quantity: number):Observable<any> {
    const url = `${this.apiUrl}/addToCart`;
    const data = {
      id_customer: customerId,
      idsp: productId,
      idloaisp: 0,
      anhsp: "string",
      tensp: "string",
      giaban: 0,
      quantity: quantity,
      dateAdded: "2023-10-20T17:01:46.598Z",
    }
    return this.http.post(url, data).pipe(
      map((data: any) => {
        return data.statusCode === 200;
      })
    );
  }
}
