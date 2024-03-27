import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.api.urlOrder;
  constructor(private http: HttpClient) { }

  createOrder(customerId: number, paymentMethod: string, orderItems: any[]):Observable<any> {
    const url = `${this.apiUrl}/order`;
    const data = {
      id_customer: customerId,
      order_date: "2023-10-24T16:47:06.563Z",
      total_amount: 0,
      paymentMethod: paymentMethod,
      orderStatus: 0,
      orderItems: orderItems,
    }
    return this.http.post(url, data);
  }
}
