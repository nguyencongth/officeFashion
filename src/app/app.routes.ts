import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProductComponent} from "./pages/product/product.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'product', component: ProductComponent, title: 'Product' },
];
