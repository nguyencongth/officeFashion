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
  constructor(private productService: ProductService) { }
  ngOnInit() {
      this.getProductsNew();
  }
  getProductsNew(){
      this.productService.getProductNew().subscribe((data:any)=> {
          this.productsNew = data.arrayProduct;
      });
    }

}
