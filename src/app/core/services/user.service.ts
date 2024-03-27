import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlApi = environment.api.urlUser;
  constructor(private http: HttpClient) { }

  getUserInfo(userId: number) {
    const url = `${this.urlApi}/getCustomerById?CustomerID=${userId}`;
    return this.http.get(url);
  }
}
