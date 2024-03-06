import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlApi = 'https://localhost:7249/api/ProductType';
  constructor(private http: HttpClient) { }

  getCategory():Observable<any> {
    const url = `${this.urlApi}/getProductType`;
    return this.http.get(url);
  }
  getCategoryById(categoryId: number):Observable<any> {
    const url = `${this.urlApi}/getCategoryById?categoryId=${categoryId}`;
    return this.http.get(url);
  }
}
