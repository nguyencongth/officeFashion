import {Component, OnInit} from '@angular/core';
import {ProductComponent} from "../../product/product.component";
import {ProductService} from "../../../core/services/product.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-new',
  standalone: true,
  imports: [ProductComponent, NgIf],
  templateUrl: './product-new.component.html',
  styleUrl: './product-new.component.css'
})
export class ProductNewComponent implements OnInit{
  productsNew = null;
  page = 1;
  pageSize = 6;
  totalItem = 0;
  selectedPriceRange: number | null = null;
  title = "SẢN PHẨM MỚI";
  constructor(private productService: ProductService) { }
  ngOnInit() {
      this.getProductsNew();
  }
  getProductsNew(){
      this.productService.getProductNew(this.selectedPriceRange, this.page, this.pageSize).subscribe((data:any)=> {
          this.productsNew = data.arrayProductNew;
          this.totalItem = data.pagination.totalItems;
      });
    }

}
