import { Routes } from "@angular/router";
import {ProductComponent} from "../../pages/product/product.component";
import {ProductDetailComponent} from "../../pages/product-detail/product-detail.component";

export const PRODUCT_ROUTER: Routes = [
  { path: '', component: ProductComponent, title: 'Sản phẩm' },
  { path: 'product', component: ProductComponent, title: 'Sản phẩm' },
  { path: 'detail/:id', component: ProductDetailComponent, title: 'Chi tiết sản phẩm' }
]
