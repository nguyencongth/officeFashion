import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {CartComponent} from "./pages/cart/cart.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {CheckoutLayoutComponent} from "./layout/checkout-layout/checkout-layout.component";
import {OrderComponent} from "./pages/order/order.component";
import {UserInfoComponent} from "./pages/user-info/user-info.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {ProductNewComponent} from "./pages/product-new/product-new.component";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Trang chủ' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Trang chủ' },
      {
        path: 'product',
        loadChildren: () => import('./core/router/product-router.routes')
          .then(mod => mod.PRODUCT_ROUTER)
      },
      { path: 'product-new', component: ProductNewComponent, title: 'Sản phẩm mới' },
      { path: 'login', component: LoginComponent, title: 'Đăng nhập' },
      { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Quên mật khẩu' },
      { path: 'reset-password', component: ResetPasswordComponent, title: 'Đặt lại mật khẩu' },
      { path: 'cart', component: CartComponent, title: 'Giỏ hàng' },
      { path: 'order', component: OrderComponent, title: 'Lịch sử đặt hàng' },
      { path: 'user-info', component: UserInfoComponent, title: 'Thông tin tài khoản' },
    ]
  },
  {
    path: '',
    component: CheckoutLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'checkout', component: CheckoutComponent, title: 'Thanh toán' },
    ]
  },
];
