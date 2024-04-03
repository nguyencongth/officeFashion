import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ){}
  errorMessage: string = '';
  resetPasswordForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    otp: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  resetPassword() {
    this.errorMessage = '';
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const {email , otp, newPassword} = this.resetPasswordForm.value;
    this.userService.resetPassword(email, otp, newPassword)
      .subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = res.statusMessage;
        }
      });
  }
}
