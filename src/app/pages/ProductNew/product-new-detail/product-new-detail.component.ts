import {Component, OnInit} from '@angular/core';
import {ProductDetailComponent} from "../../product-detail/product-detail.component";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {ProductService} from "../../../core/services/product.service";

@Component({
  selector: 'app-product-new-detail',
  standalone: true,
  imports: [
    ProductDetailComponent,
    NgIf,
  ],
  templateUrl: './product-new-detail.component.html',
  styleUrl: './product-new-detail.component.css'
})
export class ProductNewDetailComponent implements OnInit{
  productDetail = null;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }
  ngOnInit() {
      this.getProductDetail();
  }
  getProductDetail() {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe((data:any)=>{
        this.productDetail = data.arrayProduct;
      })
    })
  }
}
