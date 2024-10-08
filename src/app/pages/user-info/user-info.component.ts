import {Component, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {UserService} from "../../core/services/user.service";
import {FormBuilder, Validators, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-user-info',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
  hide = true;
  hide1 = true;
  hide2 = true;
  errorMessage = '';
  isDisplay = false;
  isLoading = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  customDiameter = 50;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {}
  userInfoForm = this.fb.group({
    customerId: [Number(localStorage.getItem('user_id'))],
    fullName: ['', Validators.required],
    email: ['', Validators.required],
    phonenumber: ['', Validators.required],
    password: ['', Validators.required],
    address: ['', Validators.required],
  });
  changePasswordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmNewPassword: ['', Validators.required]
  });
  ngOnInit() {
    this.getUserInfo();
  }
  getUserInfo() {
    const userId = Number(localStorage.getItem('user_id'));
    this.userService.getUserInfo(userId).subscribe((data: any) => {
      const info = data.arrayCustomer[0];
      console.log(info);
      this.userInfoForm.patchValue({
        fullName: info.fullName,
        phonenumber: info.phonenumber,
        address: info.address,
        email: info.email
      });
      this.isDisplay = true;
      this.isLoading = false;
    });
  }
  updateUserInfo() {
    this.userService.updateUserInfo(this.userInfoForm.value).subscribe((data: any) => {
      if(data.statusCode === 200) {
        alert('Cập nhật thông tin thành công');
      } else {
        console.log(data.statusMessage);
      }
    });
  }
  changePassword() {
    const {currentPassword, newPassword, confirmNewPassword} = this.changePasswordForm.value;
    const userId = Number(localStorage.getItem('user_id'));
    this.userService.changePassword(userId, currentPassword, newPassword, confirmNewPassword).subscribe((response: any) => {
      if (response.statusCode === 200) {
        alert('Đổi mật khẩu thành công');
        this.errorMessage = '';
        this.changePasswordForm.reset();
      }
      else if (response.statusCode === 401) {
        this.errorMessage = response.statusMessage;
        this.changePasswordForm.controls.currentPassword.setErrors({ incorrect: true });
      }
      else if (response.statusCode === 400) {
        this.errorMessage = response.statusMessage;
        this.changePasswordForm.controls.confirmNewPassword.setErrors({ invalid: true });
      }
    });
  }
}
