import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../core/services/product.service";
import {NgFor} from "@angular/common";
import {RouterModule, Router } from "@angular/router";
import {CartService} from "../../core/services/cart.service";
import {ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NgFor,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any[] = [];
  selectedSize: string = '';
  addToCartForm = this.fb.group({
    quantity: [1],
  })
  selectedQuantity = this.addToCartForm.value.quantity;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private fb: FormBuilder
  ){
    const quantityControl = this.addToCartForm.controls.quantity;
    if(quantityControl) {
      quantityControl.valueChanges.subscribe((value) => {
        this.selectedQuantity = value;
      });
    }
  }
  ngOnInit() {
    this.getProductDetail();
  }


  getProductDetail() {
    this.route.params.subscribe(params => {
      console.log(params)
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe((data:any)=>{
        this.product = data.arrayProduct;
      })
    })
  }

  onSizeChange(size: string): void {
    this.selectedSize = size;
  }
  addToCart(productId: number, quantity: number): void {
    const customerId = Number(localStorage.getItem('user_id'));
    this.productService.getProductById(productId).subscribe(() => {
      this.cartService.addCartItem(customerId, productId, quantity).subscribe((response: any) => {
        if (response) {
          this.router.navigate(['/cart']);
        } else {
          console.log('Failed to add item to cart');
        }
      });
    });
  }

  protected readonly Number = Number;
}
