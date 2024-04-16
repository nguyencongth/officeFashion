import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.api.urlProduct;
  productsSubject = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) { }

  getProducts(priceRange: number | null, page: number, pageSize: number):Observable<any> {
    let url = `${this.apiUrl}/all?page=${page}&pageSize=${pageSize}`;
    if (priceRange !== null) {
      url += `&priceRange=${priceRange}`;
    }
    return this.http.get(url);
  }
  getProductNew():Observable<any> {
    return this.http.get(`${this.apiUrl}/productNew`);
  }
  getProductById(id: number): Observable<any> {
    const url = `${this.apiUrl}/getProductId?productID=${id}`;
    return this.http.get(url);
  }

  getProductsByCategoryId(categoryId: number, priceRange: number | null, page: number, pageSize: number):Observable<any> {
    let url = `${this.apiUrl}/getProductByCategoryId?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}`;
    if (priceRange !== null) {
      url += `&priceRange=${priceRange}`;
    }
    return this.http.get(url);
  }
  searchProducts(keyword: string, priceRange: number | null, page: number, pageSize: number):Observable<any> {
    let url = `${this.apiUrl}/searchProduct?keyword=${keyword}&page=${page}&pageSize=${pageSize}`;
    if (priceRange !== null) {
      url += `&priceRange=${priceRange}`;
    }
    return this.http.get(url);
  }
}
