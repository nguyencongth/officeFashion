import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../core/services/product.service";
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  page = 1;
  pageSize = 9;
  priceRange?: number;
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts(this.page, this.pageSize)
      .subscribe((data: any) => {
        console.log(data);

        this.products = data.arrayProduct;
      })
  }
}
