import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterModule, RouterOutlet} from "@angular/router";
import {CategoryService} from "../../core/services/category.service";
import { NgFor, NgIf } from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {CartService} from "../../core/services/cart.service";
import {CartComponent} from "../cart/cart.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgFor,
    NgIf,
    CartComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  cartItems: any[] = [];
  totalItems: number = 0;
  cartItemCountSubscription: Subscription;
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
    this.cartItemCountSubscription = this.cartService.cartItemCount.subscribe((count: number) => {
      this.totalItems = count;
    });
    this.cartService.cartItemsSubject.subscribe((cartItems: any[]) => {
      this.cartItems = cartItems;
    });
    this.getCartItems();
  }
  ngOnDestroy() {
    if (this.cartItemCountSubscription) {
      this.cartItemCountSubscription.unsubscribe();
    }
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
      this.cartService.updateCartItemCount();
    })
  }
}
