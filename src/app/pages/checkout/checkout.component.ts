import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CartService} from "../../core/services/cart.service";
import {NgFor, NgIf} from "@angular/common";
import {CurrencyFormatPipe} from "../../core/Pipe/currency-format.pipe";
import {OrderService} from "../../core/services/order.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user.service";
import {ProductService} from "../../core/services/product.service";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyFormatPipe,
    NgFor,
    NgIf
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  @ViewChildren('paymentMethods') paymentMethodInputs: QueryList<ElementRef>;
  cartItems: any[] = [];
  totalAmount: number = 0;
  // isDisabled: boolean = false;
  productId: number;
  quantitySell: number;
  userInfo = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.maxLength(10)]],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  })
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
      this.quantitySell = params['quantity'];
      if(this.productId && this.quantitySell) {
        this.productService.getProductById(this.productId).subscribe((data: any) => {
          const product = data.arrayProduct[0];
          const cartItem = {
            productId: product.productId,
            productName: product.productName,
            imageProduct: product.imageProduct,
            price: product.price,
            quantity: this.quantitySell
          }
          this.cartItems = [cartItem];
          this.calculateTotalAmount();
        });
      } else {
        this.getCartItems();
      }
    });
    this.getUserInfo();
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
      return acc + item.discountedPrice * item.quantity;
    }, 0)
  }
  getUserInfo() {
    const userId = Number(localStorage.getItem('user_id'));
    this.userService.getUserInfo(userId).subscribe((data: any) => {
      const info = data.arrayCustomer[0];
      this.userInfo.patchValue({
        name: info.fullName,
        phone: info.phonenumber,
        address: info.address,
        email: info.email
      });
    });
  }
  createOrder() {
    if (this.userInfo.invalid) {
      this.userInfo.markAllAsTouched();
      return;
    }
    const customerId = Number(localStorage.getItem('user_id'));
    const orderItems: any[] = [];
    let selectPaymentMethod = "";
    for(let item of this.cartItems) {
      const orderItem = {
        productId: item.productId,
        productName: item.productName,
        imageProduct: item.imageProduct,
        quantity: item.quantity,
        subtotal: 0
      };
      orderItems.push(orderItem);
    }
    const userName = this.userInfo.controls.name.value;
    const email = this.userInfo.controls.email.value;
    const phoneNumber = this.userInfo.controls.phone.value;
    const shippingAddress = this.userInfo.controls.address.value;
    const paymentMethodInputs = this.paymentMethodInputs.toArray();
    for(const paymentMethod of paymentMethodInputs) {
      if(paymentMethod.nativeElement.checked) {
        selectPaymentMethod = paymentMethod.nativeElement.value;
      }
    }
    this.orderService.createOrder(customerId, userName, email, phoneNumber, shippingAddress, selectPaymentMethod, orderItems).subscribe((data: any) => {
      if(data.statusCode === 200) {
        this.removeCart();
        if(selectPaymentMethod !== "Ví MoMo") {
          this.router.navigate(['/order']);
        } else {
          this.orderService.checkoutMomo(this.totalAmount, "product information").subscribe((data: any) => {
            const url = data.payUrl;
            window.location.href = url;
          });
          return;
        }
      }
    })
  }
  removeCart(){
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
      this.quantitySell = params['quantity'];
      if(this.productId && this.quantitySell) {
        return;
      } else {
        const customerId = Number(localStorage.getItem('user_id'));
        this.cartService.removeCart(customerId).subscribe();
      }
    });
  }
}
