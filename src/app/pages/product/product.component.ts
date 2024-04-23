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
