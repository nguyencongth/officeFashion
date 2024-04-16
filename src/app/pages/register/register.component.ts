import { Component } from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phonenumber: ['', Validators.required],
    password: ['',[Validators.required, Validators.minLength(6)]],
    address: ['', Validators.required]
  });
  register() {
    const { fullName, email, phonenumber, password, address } = this.registerForm.value;
    if (fullName && email && phonenumber && password && address) {
      this.userService.register(fullName, email, phonenumber, password, address).subscribe((res) => {
        if(res.statusCode === 100) {
          this.errorMessage = res.statusMessage;
          this.registerForm.controls.email.setErrors({ incorrect: true });
        } else if (res.statusCode === 200) {
          window.alert('Register success!');
          this.router.navigate(['/login']);
        }
      })
    }
  }
}
