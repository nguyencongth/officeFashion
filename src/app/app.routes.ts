import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProductComponent} from "./pages/product/product.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Trang chủ' },
  { path: 'home', component: HomeComponent, title: 'Trang chủ' },
  { path: 'product', component: ProductComponent, title: 'Sản phẩm' },
];
