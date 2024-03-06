import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../core/services/product.service";
import { NgFor, NgIf, NgClass } from "@angular/common";
import {ActivatedRoute, RouterModule, RouterOutlet} from "@angular/router";
import {CategoryService} from "../../core/services/category.service";

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
  categoryName: any;
  constructor(private productService: ProductService, private route: ActivatedRoute, private categoryService: CategoryService) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.categoryService.getCategoryById(categoryId).subscribe((data:any)=>{
          console.log(data);
          this.categoryName = data.arrayProductType[0].tenloaisp;
          console.log(this.categoryName)
        });
        this.getProductsByCategory(categoryId);
      } else {
        this.getProducts();
      }
    });
  }
  getProducts() {
    this.productService.getProducts(this.selectedPriceRange, this.page, this.pageSize)
      .subscribe((data: any) => {
        this.products = data.arrayProduct;
        this.totalItem = data.pagination.totalItems;
      })
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategoryId(categoryId, this.selectedPriceRange, this.page, this.pageSize)
      .subscribe((data: any) => {
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
