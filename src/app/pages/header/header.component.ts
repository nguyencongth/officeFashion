import {Component, OnInit} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {CategoryService} from "../../core/services/category.service";
import { NgFor} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgFor
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  categories: any[] = [];
  constructor(private category: CategoryService) {}
  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.category.getCategory().subscribe((data: any) => {
        console.log(data);
        this.categories = data.arrayProductType;
        console.log(this.categories);
    })
  }
}
