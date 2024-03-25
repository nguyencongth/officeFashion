import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet} from "@angular/router";
import {CartService} from "../../core/services/cart.service";
import {NgFor} from "@angular/common";
import {CurrencyFormatPipe} from "../../core/Pipe/currency-format.pipe";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterModule,
    CurrencyFormatPipe,
    NgFor
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    const customerId = Number(localStorage.getItem('user_id'));
    this.cartService.getCartItems(customerId).subscribe((data: any) => {
      this.cartItems = data.arrayCart;
      this.calculateTotalAmount();
    })
  }
  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((acc, item) => {
      return acc + item.giaban * item.quantity;
    }, 0)
  }
}
