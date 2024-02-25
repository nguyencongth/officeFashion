import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../core/services/product.service";
import { NgFor, NgIf, NgClass } from "@angular/common";
import { RouterModule, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgIf,
    RouterModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  panelVisible = false;
  selectedPriceRange: number | null = null;
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
    this.productService.getProducts(this.selectedPriceRange, this.page, this.pageSize)
      .subscribe((data: any) => {
        console.log('---------------data=======',data);
        this.products = data.arrayProduct;
        this.totalItem = data.pagination.totalItems;
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

  filterProductsByPrice(priceRange: number) {
    this.selectedPriceRange = priceRange;
    this.page = 1;
    this.getProducts();
  }

  togglePanel(): void {
    this.panelVisible = !this.panelVisible;
  }
}
