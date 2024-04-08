import { Routes } from "@angular/router";
import {ProductNewComponent} from "../../pages/ProductNew/product-new/product-new.component";
import {ProductNewDetailComponent} from "../../pages/ProductNew/product-new-detail/product-new-detail.component";

export const PRODUCT_NEW_ROUTER: Routes = [
  { path: '', component: ProductNewComponent, title: 'Sản phẩm mới' },
  { path: 'product-new', component: ProductNewComponent, title: 'Sản phẩm mới' },
  { path: 'detail/:id', component: ProductNewDetailComponent, title: 'Chi tiết sản phẩm' }
]
