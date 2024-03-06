import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7249/api/Product';
  constructor(private http: HttpClient) { }

  getProducts(priceRange: number | null, page: number, pageSize: number):Observable<any> {
    let url = `${this.apiUrl}/all?page=${page}&pageSize=${pageSize}`;
    if (priceRange !== null) {
      url += `&priceRange=${priceRange}`;
    }
    return this.http.get(url);
  }
  getProductById(id: number): Observable<any> {
    const url = `${this.apiUrl}/getProductId?idsp=${id}`;
    return this.http.get(url);
  }

  getProductsByCategoryId(categoryId: number, priceRange: number | null, page: number, pageSize: number):Observable<any> {
    let url = `${this.apiUrl}/getProductByCategoryId?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}`;
    if (priceRange !== null) {
      url += `&priceRange=${priceRange}`;
    }
    return this.http.get(url);
  }
}
