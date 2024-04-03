import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, NgIf, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}
  errorMessage: string = '';
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]]
  });
  sendOptEmail() {
    this.router.navigate(['/reset-password']);
    const { email } = this.forgotPasswordForm.value;
    if(email) {
      this.userService.sendOtpEmail(email).subscribe();
    }
  }
}
