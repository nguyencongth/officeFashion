import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map } from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private apiUrl = environment.api.urlLogin;
  private email: string | null = null;
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    }
    return this.http.post(this.apiUrl, loginData).pipe(
      map((data: any) => {
        if(data.statusCode === 200) {
          this.loggedIn = true;
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem("email", email);
          localStorage.setItem('user_id', data.id_customer);
          return true;
        }
        return false;
      })
    );
  }
  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }
  isLoggedIn() {
    return this.loggedIn;
  }
  getInfo() {
    this.email = localStorage.getItem('email');
    return this.email;
  }
  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.clear();
    this.deleteAllCookies();
    this.router.navigate(['/login']);
  }
  deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}
