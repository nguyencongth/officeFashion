import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../core/services/product.service";
import {NgFor} from "@angular/common";
import {RouterModule, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NgFor,
    RouterModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any[] = [];
  selectedSize: string = '';
  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }
  ngOnInit() {
    this.getProductDetail();
  }

  getProductDetail() {
    this.route.params.subscribe(params => {
      console.log(params)
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe((data:any)=>{
        console.log(data)
        this.product = data.arrayProduct;
        console.log(this.product[0])
      })
    })
  }

  onSizeChange(size: string): void {
    this.selectedSize = size;
  }
}
