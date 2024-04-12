import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CartService} from "../../core/services/cart.service";
import {NgFor} from "@angular/common";
import {CurrencyFormatPipe} from "../../core/Pipe/currency-format.pipe";
import {OrderService} from "../../core/services/order.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
    NgFor
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  @ViewChildren('paymentMethods') paymentMethodInputs: QueryList<ElementRef>;
  cartItems: any[] = [];
  totalAmount: number = 0;
  isDisabled: boolean = true;
  productId: number;
  quantitySell: number;
  userInfo = this.fb.group({
    name: {value: '', disabled: this.isDisabled},
    phone: {value: '', disabled: this.isDisabled},
    address: {value: '', disabled: this.isDisabled},
    email: {value: '', disabled: this.isDisabled},
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
            idsp: product.idsp,
            tensp: product.tensp,
            anhsp: product.anhsp,
            giaban: product.giaban,
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
      return acc + item.giaban * item.quantity;
    }, 0)
  }
  getUserInfo() {
    const userId = Number(localStorage.getItem('user_id'));
    this.userService.getUserInfo(userId).subscribe((data: any) => {
      const info = data.arrayCustomer[0];
      this.userInfo.patchValue({
        name: info.fullname,
        phone: info.phonenumber,
        address: info.address,
        email: info.email
      });
    });
  }
  createOrder() {
    const customerId = Number(localStorage.getItem('user_id'));
    const orderItems: any[] = [];
    let selectPaymentMethod = "";
    for(let item of this.cartItems) {
      const orderItem = {
        idsp: item.idsp,
        tensp: item.tensp,
        anhsp: item.anhsp,
        quantity: item.quantity,
        subtotal: 0
      };
      orderItems.push(orderItem);
    }
    const paymentMethodInputs = this.paymentMethodInputs.toArray();
    for(const paymentMethod of paymentMethodInputs) {
      if(paymentMethod.nativeElement.checked) {
        selectPaymentMethod = paymentMethod.nativeElement.value;
      }
    }
    if(selectPaymentMethod === "Ví MoMo") {
      this.orderService.checkoutMomo().subscribe((data: any) => {
        const url = data.payUrl;
        window.location.href = url;
      });
      return;
    }
    this.orderService.createOrder(customerId, selectPaymentMethod, orderItems).subscribe((data: any) => {
      if(data.statusCode === 200) {
        this.removeCart();
        this.router.navigate(['/cart']);
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
