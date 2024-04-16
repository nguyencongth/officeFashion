import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlApi = environment.api.urlUser;
  constructor(private http: HttpClient) { }

  register(fullName: string, email: string, phoneNumber: string, password: string, address: string):Observable<any> {
    const formRegister = {
      customerId: 0,
      fullName: fullName,
      email: email,
      phonenumber: phoneNumber,
      password: password,
      address: address,
      otp: 0,
      otpExpiry: "2024-04-16T08:13:29.036Z"
    }
    const url = `${this.urlApi}/register`;
    return this.http.post(url, formRegister);
  }
  getUserInfo(userId: number) {
    const url = `${this.urlApi}/getCustomerById?CustomerID=${userId}`;
    return this.http.get(url);
  }
  updateUserInfo(data: any) {
    const url = `${this.urlApi}/updateInfo?customerID=${data.customerId}`;
    return this.http.patch(url, data);
  }
  changePassword(customerId: number, currentPassword: any, newPassword: any, confirmNewPassword: any) {
    const url = `${this.urlApi}/changePassword?customerID=${customerId}&currentPassword=${currentPassword}&newPassword=${newPassword}&confirmNewPassword=${confirmNewPassword}`;
    return this.http.patch(url, {});
  }
  sendOtpEmail(email: string) {
    const url = `${this.urlApi}/SendPasswordResetOTP?email=${email}`;
    return this.http.post(url, {});
  }
  resetPassword(email: any, otp: any, newPassword: any) {
    const url = `${this.urlApi}/ResetPassword`;
    const data = {
      email,
      otp,
      newPassword
    }
    return this.http.post(url, data);
  }
}
