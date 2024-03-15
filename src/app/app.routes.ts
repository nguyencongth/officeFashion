import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {CartComponent} from "./pages/cart/cart.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Trang chủ' },
  { path: 'home', component: HomeComponent, title: 'Trang chủ' },
  {
    path: 'product',
    loadChildren: () => import('./core/router/product-router.routes')
      .then(mod => mod.PRODUCT_ROUTER)
  },
  { path: 'login', component: LoginComponent, title: 'Đăng nhập' },
  { path: 'cart', component: CartComponent, title: 'Giỏ hàng' },
];
