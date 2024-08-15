import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../core/services/product.service";
import {NgFor, NgIf} from "@angular/common";
import {RouterModule, Router } from "@angular/router";
import {CartService} from "../../core/services/cart.service";
import {ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';
import {CurrencyFormatPipe} from "../../core/Pipe/currency-format.pipe";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NgFor,
    RouterModule,
    FormsModule,
    CurrencyFormatPipe,
    ReactiveFormsModule,
    NgIf,
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
    private fb: FormBuilder,
    private toastr: ToastrService
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
    if(quantity > 10) {
      alert('Số lượng sản phẩm không được vượt quá 10');
      return;
    } else if(quantity < 1) {
      alert('Số lượng sản phẩm không được nhỏ hơn 1');
      return;
    }
    const customerId = Number(localStorage.getItem('user_id'));
    if(!customerId) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
    } else {
      this.productService.getProductById(productId).subscribe(() => {
        this.cartService.addCartItem(customerId, productId, quantity).subscribe((response: any) => {
          if (response) {
            this.toastr.success('Đã thêm sản phẩm vào giỏ hàng', 'Thành công');
            this.router.navigate(['/cart']);
          } else {
            console.log('Failed to add item to cart');
          }
        });
      });
    }
  }
  buyNow(productId: number, quantity: number): void {
    const loggedIn = localStorage.getItem('loggedIn');
    if(!loggedIn) {
      alert('Vui lòng đăng nhập để mua hàng');
    }else {
      this.router.navigate(['/checkout'], { queryParams: { productId: productId, quantity: quantity } });
    }
  }

  protected readonly Number = Number;

}
