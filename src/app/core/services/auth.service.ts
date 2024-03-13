import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private apiUrl = "https://localhost:7249/api/Customers/Login";
  private email: string | null = null;
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    }
    return this.http.post(this.apiUrl, loginData).pipe(
      map((data: any) => {
        console.log(data.statusCode)
        if(data.statusCode === 200) {
          this.loggedIn = true;
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem("email", email);
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
    this.router.navigate(['/login']);
  }
}
