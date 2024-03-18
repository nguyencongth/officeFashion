import {Component, OnInit} from '@angular/core';
import { RouterModule, RouterOutlet} from "@angular/router";
import {CategoryService} from "../../core/services/category.service";
import { NgFor, NgIf } from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {CartService} from "../../core/services/cart.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgFor,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  categories: any[] = [];
  cartItems: any[] = [];
  totalItems: number = 0;
  constructor(
    private category: CategoryService,
    public authService: AuthService,
    private cartService: CartService,
  ) {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      this.authService.setLoggedIn(true);
    }
  }
  ngOnInit() {
    this.getCategory();
    this.getCartItems();
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCategory() {
    this.category.getCategory().subscribe((data: any) => {
        this.categories = data.arrayProductType;
    })
  }

  logout() {
    this.authService.logout();
  }
  getCartItems() {
    const customerId = Number(localStorage.getItem('user_id'));
    this.cartService.getCartItems(customerId).subscribe((data:any)=>{
      this.cartItems = data.arrayCart;
      this.getTotalItems();
    })
  }
  getTotalItems() {
    return this.totalItems = this.cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0)
  }
}
