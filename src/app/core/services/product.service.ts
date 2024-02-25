import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7249/api/Product';
  constructor(private http: HttpClient) { }

  getProducts(page: number, pageSize: number):Observable<any> {
    const url = `${this.apiUrl}/all`;
    const params = {page: page.toString(), pageSize: pageSize.toString()};
    // return this.http.get(`${this.apiUrl}/all?page=${page}&pageSize=${pageSize}`)
    return this.http.get(url, {params});
  }

}
