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

  createOrder(
    customerId: number, userName: any, email: any, phoneNumber: any, shippingAddress: any,  paymentMethod: string, orderItems: any[]
  ):Observable<any> {
    const url = `${this.apiUrl}/order`;
    const data = {
      customerId: customerId,
      orderDate: "2023-10-24T16:47:06.563Z",
      totalAmount: 0,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      orderStatus: 0,
      orderItems: orderItems,
    }
    return this.http.post(url, data);
  }
  getOrderList(customerId: number):Observable<any> {
    const url = `${this.apiUrl}/getOrder?customerID=${customerId}`;
    return this.http.get(url);
  }
  cancelOrder(orderId: number):Observable<any> {
    const url = `${this.apiUrl}/deleteOrder?orderID=${orderId}`;
    return this.http.delete(url);
  }
  confirmOrder(orderId: number, status: number):Observable<any> {
    const url = `${this.apiUrl}/updateOrderStatus?orderId=${orderId}&newOrderStatus=${status}`;
    return this.http.patch(url, {});
  }
  checkoutMomo(totalAmount: number, desc: string):Observable<any> {
    const url = `https://thanhnc-officefashion.somee.com/api/Momo/PaymentMomo?totalAmount=${totalAmount}&desc=${desc}`;
    return this.http.get(url);
  }
}
