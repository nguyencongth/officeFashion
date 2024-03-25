import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";
import { CartService } from "../../core/services/cart.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = '';
  cartItems: any[] = [];
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private cartService: CartService,
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  login(){
    const { email , password } = this.loginForm.value;
    if(email && password) {
      this.authService.login(email, password)
        .subscribe((res) => {
          if (res) {
            this.router.navigate(['/home']);
            this.getCartItems();
          }
          else {
            this.errorMessage = 'Tài khoản hoặc mật khẩu không chính xác.';
          }
        })
    }
  }
  getCartItems() {
    const customerId = Number(localStorage.getItem('user_id'));
    this.cartService.getCartItems(customerId).subscribe((data:any)=>{
      this.cartItems = data.arrayCart;
      this.cartService.updateCartItemCount();
      this.cartService.updateCart();
    })
  }
}
