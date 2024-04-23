import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {CartService} from "../../core/services/cart.service";
import {NgFor, NgIf} from "@angular/common";
import { FormsModule } from '@angular/forms';
import {CurrencyFormatPipe} from "../../core/Pipe/currency-format.pipe";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-cart',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    RouterModule,
    FormsModule,
    CurrencyFormatPipe,
    MatProgressSpinnerModule,
    NgFor,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  @ViewChildren('quantityInput') quantityInputs: QueryList<ElementRef>;
  cartItems: any[] = [];
  totalAmount: number = 0;
  isDisplayPC = true;
  isDisplayMobile = false;
  isDisplay = false;
  isLoading = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  customDiameter = 50;

  constructor(private cartService: CartService, private router: Router) {
  }

  ngOnInit() {
    this.getCartItems();
    if(window.innerWidth < 769){
      this.isDisplayPC = false;
      this.isDisplayMobile = true;
    }
  }

  getCartItems() {
    const customerId = Number(localStorage.getItem('user_id'));
    this.cartService.getCartItems(customerId).subscribe((data: any) => {
      this.cartItems = data.arrayCart;
      this.calculateTotalAmount();
      this.isDisplay = true;
      this.isLoading = false;
    })
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
  }

  removeCartItem(productId: number) {
    const customerId = Number(localStorage.getItem('user_id'));
    this.cartService.removeCartItem(customerId, productId).subscribe((data: any) => {
      if (data) {
        this.getCartItems();
      }
    })
  }

  updateCartItemQuantity() {
    const customerId = Number(localStorage.getItem('user_id'));
    const data: any[] = [];
    const quantityInputs = this.quantityInputs.toArray();
    quantityInputs.forEach((input, index) => {
      const newQuantity = Number(input.nativeElement.value);
      const productId = this.cartItems[index].productId;
      data.push({productId: productId, newQuantity: newQuantity});
    });
    data.map(item => {
      this.cartService.updateQuantity(customerId, item.productId, item.newQuantity).subscribe(data => {
        if (data) {
          this.getCartItems();
        }
      });
    });
  }
  cartDetail(id: number) {
    this.router.navigate(['/product/detail', id]);
  }
  checkoutBtn() {
    this.router.navigate(['/checkout']);
  }
}
