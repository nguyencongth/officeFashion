import {Component, OnInit} from '@angular/core';
import { RouterModule, RouterOutlet} from "@angular/router";
import {CategoryService} from "../../core/services/category.service";
import { NgFor, NgIf } from "@angular/common";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgFor,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  categories: any[] = [];
  constructor(private category: CategoryService, public authService: AuthService) {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      this.authService.setLoggedIn(true);
    }
  }
  ngOnInit() {
    this.getCategory();
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCategory() {
    this.category.getCategory().subscribe((data: any) => {
        this.categories = data.arrayProductType;
    })
  }

  logout() {
    this.authService.logout();
  }
}
