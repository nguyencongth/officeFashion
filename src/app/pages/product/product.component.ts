import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ProductService } from "../../core/services/product.service";
import { NgFor, NgIf, NgClass } from "@angular/common";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {CategoryService} from "../../core/services/category.service";
import {CurrencyFormatPipe} from "../../core/Pipe/currency-format.pipe";
import {Subscription} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-product',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    NgFor,
    NgClass,
    NgIf,
    RouterModule,
    CurrencyFormatPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() productsNew: any[] = [];
  @Input() pageNew: number = 0;
  @Input() pageSizeNew: number = 0;
  @Input() totalItemNew: number = 0;
  @Input() selectedPriceRangeNew: number | null = null;
  @Input() titleNew: string;
  title = "TẤT CẢ SẢN PHẨM"
  panelVisible = false;
  selectedPriceRange: number | null = null;
  products: any[] = [];
  page = 1;
  pageSize = 6;
  totalItem = 0;
  categoryName: any;
  categoryId: any;
  productSubscription: Subscription;
  queryParamsSubscription: Subscription;
  isDisplay = false;
  isLoading = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  customDiameter = 50;
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
          this.categoryName = data.arrayProductType[0].categoryName;
        });
        this.getProductsByCategory(this.categoryId);
      } else {
        if (this.productsNew.length === 0){
          this.getProducts();
        } else {
          this.products = this.productsNew;
          this.totalItem = this.totalItemNew;
          this.page = this.pageNew;
          this.pageSize = this.pageSizeNew;
          this.selectedPriceRange = this.selectedPriceRangeNew;
          this.title = this.titleNew;
          this.isDisplay = true;
          this.isLoading = false;
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
        this.isDisplay = true;
        this.isLoading = false;
      })
  }
  getProductsNew() {
    this.productService.getProductNew(this.selectedPriceRange, this.page, this.pageSize)
      .subscribe((data: any) => {
        this.products = data.arrayProductNew;
        this.totalItem = data.pagination.totalItems;
        this.isDisplay = true;
        this.isLoading = false;
      })
  }
  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategoryId(categoryId, this.selectedPriceRange, this.page, this.pageSize)
      .subscribe((data: any) => {
        this.products = data.arrayProduct;
        this.totalItem = data.pagination.totalItems;
        this.isDisplay = true;
        this.isLoading = false;
      })
  }
  onPageChange(pageNumber: number) {
    this.page = pageNumber;
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      if (this.categoryId) {
        this.getProductsByCategory(this.categoryId);
      } else if (this.productsNew.length === 0) {
        this.getProducts();
      } else {
        this.getProductsNew();
      }
    });
  }
  getTotalPages(): number {
    return Math.ceil(this.totalItem / this.pageSize);
  }
  getPageNumbers(): string[] {
    const totalPages = this.getTotalPages();
    const maxPagesToShow = 3;
    const pages: string[] = [];

    if (this.page <= 2) {
      // Hiển thị từ trang 1 đến trang 3 hoặc ít hơn nếu totalPages nhỏ hơn 3
      for (let i = 1; i <= Math.min(maxPagesToShow, totalPages); i++) {
        pages.push(i.toString());
      }
      if (totalPages > maxPagesToShow) {
        pages.push('...');
        pages.push(totalPages.toString());
      }
    } else if (this.page >= totalPages - 1) {
      // Hiển thị các trang cuối cùng
      if (totalPages > maxPagesToShow) {
        pages.push('...');
      }
      for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
        pages.push(i.toString());
      }
    } else {
      // Hiển thị trang hiện tại và các trang xung quanh
      pages.push('...');
      for (let i = this.page - 1; i <= this.page + 1; i++) {
        pages.push(i.toString());
      }
      if (this.page + 1 < totalPages) {
        //pages.push('...');
        pages.push(totalPages.toString());
      }
    }

    return pages;
  }
  filterProductsByPrice(priceRange: number) {
    this.selectedPriceRange = priceRange;
    this.page = 1;
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      if (this.categoryId) {
        this.getProductsByCategory(this.categoryId);
      } else if (this.productsNew.length === 0) {
        this.getProducts();
      } else {
        this.getProductsNew();
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
  parseInt(value: string): number {
    return parseInt(value);
  }
}
