import {Component, OnInit} from '@angular/core';
import {ProductComponent} from "../../product/product.component";
import {ProductService} from "../../../core/services/product.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-sale',
  standalone: true,
  imports: [
    ProductComponent,
    NgIf
  ],
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.css'
})
export class ProductSaleComponent implements OnInit {
  productsSale = null;
  page = 1;
  pageSize = 6;
  totalItem = 0;
  selectedPriceRange: number | null = null;
  title = "SALE";
  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.getProductsSale();
  }
  getProductsSale(){
    this.productService.getProductSale(this.selectedPriceRange, this.page, this.pageSize).subscribe((data:any)=> {
      this.productsSale = data.arrayProduct;
      this.totalItem = data.pagination.totalItems;
    });
  }
}
