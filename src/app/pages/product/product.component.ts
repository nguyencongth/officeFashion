import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../core/services/product.service";
import { NgFor, NgClass } from "@angular/common";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  page = 1;
  pageSize = 6;
  totalItem = 0;
  // priceRange?: number;
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts( this.page, this.pageSize)
      .subscribe((data: any) => {
        console.log('---------data---------',data);
        this.products = data.arrayProduct;
        this.totalItem = data.pagination.totalItems;
        console.log("product", this.products);
      })
  }

  onPageChange(pageNumber: number) {
    this.page = pageNumber;
    this.getProducts();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItem / this.pageSize);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}
