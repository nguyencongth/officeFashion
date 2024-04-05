import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ProductService } from "../../core/services/product.service";
import { NgFor, NgIf, NgClass } from "@angular/common";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {CategoryService} from "../../core/services/category.service";
import {CurrencyFormatPipe} from "../../core/Pipe/currency-format.pipe";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgIf,
    RouterModule,
    CurrencyFormatPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy {
  panelVisible = false;
  selectedPriceRange: number | null = null;
  @Input() productsNew: any[] = [];
  products: any[] = [];
  page = 1;
  pageSize = 6;
  totalItem = 0;
  categoryName: any;
  categoryId: any;
  productSubscription: Subscription;
  queryParamsSubscription: Subscription;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      const keyword = params['keyword'];
      if (this.categoryId) {
        this.categoryService.getCategoryById(this.categoryId).subscribe((data:any)=>{
          this.categoryName = data.arrayProductType[0].tenloaisp;
        });
        this.getProductsByCategory(this.categoryId);
      } else {
        if (this.productsNew.length === 0){
          this.getProducts();
        } else {
          this.products = this.productsNew;
        }
      }
      if(keyword){
        this.productSubscription = this.productService.productsSubject.subscribe((products: any[])=>{
          this.products = products;
        })
      }
    });

    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const keyword = params['keyword'];
      if (keyword) {
        this.searchProduct(keyword);
      }
    });
  }
  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
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
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      if (this.categoryId) {
        this.getProductsByCategory(this.categoryId);
      } else {
        this.getProducts();
      }
    });
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
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      if (this.categoryId) {
        this.getProductsByCategory(this.categoryId);
      } else {
        this.getProducts();
      }
    });
  }
  togglePanel(): void {
    this.panelVisible = !this.panelVisible;
  }
  searchProduct(keyword: string) {
    this.productService.searchProducts(keyword, this.selectedPriceRange, this.page, this.pageSize).subscribe((data: any) => {
      this.products = data.arrayProduct;
      this.totalItem = data.pagination.totalItems;
    });
  }
}
