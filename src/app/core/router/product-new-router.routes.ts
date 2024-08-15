import { Routes } from "@angular/router";
import {ProductNewComponent} from "../../pages/ProductNew/product-new/product-new.component";
import {ProductDetailComponent} from "../../pages/product-detail/product-detail.component";

export const PRODUCT_NEW_ROUTER: Routes = [
  { path: '', component: ProductNewComponent, title: 'Sản phẩm mới' },
  { path: 'product-new', component: ProductNewComponent, title: 'Sản phẩm mới' },
  { path: 'detail/:id', component: ProductDetailComponent, title: 'Chi tiết sản phẩm' }
]
