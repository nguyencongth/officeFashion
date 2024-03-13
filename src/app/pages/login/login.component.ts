import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";

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
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
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
          }
          else {
            this.errorMessage = 'Tài khoản hoặc mật khẩu không chính xác.';
          }
        })
    }

  }
}
