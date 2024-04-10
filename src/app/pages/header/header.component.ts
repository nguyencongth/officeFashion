import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {CategoryService} from "../../core/services/category.service";
import { NgFor, NgIf } from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {CartService} from "../../core/services/cart.service";
import {Subscription} from "rxjs";
import {ProductService} from "../../core/services/product.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgFor,
    NgIf,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  categories: any[] = [];
  cartItems: any[] = [];
  totalItems: number = 0;
  cartItemCountSubscription: Subscription;
  @ViewChild('inputSearch') inputSearch: ElementRef;
  isDisplayBar = false;
  isDisplayNavItem = false;
  isDisplayInfo = false;
  isDisplaySearch = false;
  @ViewChild('desktopHeaderCenter') desktopHeaderCenter: ElementRef;
  constructor(
    private category: CategoryService,
    public authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
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
  ngAfterViewInit() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        this.desktopHeaderCenter.nativeElement.classList.add('sticky');
      } else {
        this.desktopHeaderCenter.nativeElement.classList.remove('sticky');
      }
    });
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
    this.cartService.cartItemCount.next(0);
    this.cartService.cartItemsSubject.next([]);
    this.isDisplayBar = false;
  }
  getCartItems() {
    const customerId = Number(localStorage.getItem('user_id'));
    this.cartService.getCartItems(customerId).subscribe((data:any)=>{
      this.cartItems = data.arrayCart;
      this.cartService.updateCartItemCount();
    })
  }
  searchProduct() {
    const keyword = this.inputSearch.nativeElement.value;
    this.productService.searchProducts(keyword, null, 1, 6).subscribe((data: any) => {
      this.productService.productsSubject.next(data.arrayProduct);
    })
    this.router.navigate(['/product'], {queryParams: {keyword: this.inputSearch.nativeElement.value}});
  }
  toggleBar() {
    this.isDisplayBar = !this.isDisplayBar;
    this.isDisplayNavItem = false;
    this.isDisplayInfo = false;
  }
  toggleNavItem() {
    this.isDisplayNavItem = !this.isDisplayNavItem;
  }
  toggleInfo() {
    this.isDisplayInfo = !this.isDisplayInfo;
  }
  toggleSearch() {
    this.isDisplaySearch = !this.isDisplaySearch;
  }
}
