import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";
import { CartService } from "../../core/services/cart.service";
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
            this.toastr.success('Đăng nhập thành công!');
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000)
            this.getCartItems();
          }
          else {
            this.toastr.error('Đăng nhập thất bại!');
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
