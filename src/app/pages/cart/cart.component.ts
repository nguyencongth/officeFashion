import { Component, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import {CartService} from "../../core/services/cart.service";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterModule,
    NgFor,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    const customerId = Number(localStorage.getItem('user_id'));
    this.cartService.getCartItems(customerId).subscribe((data:any)=>{
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
