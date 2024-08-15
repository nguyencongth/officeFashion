import { Routes } from "@angular/router";
import {ProductSaleComponent} from "../../pages/productSale/product-sale/product-sale.component";
import {ProductDetailComponent} from "../../pages/product-detail/product-detail.component";

export const PRODUCT_SALE_ROUTER: Routes = [
  { path: '', component: ProductSaleComponent, title: 'Sản phẩm giảm giá' },
  { path: 'product-sale', component: ProductSaleComponent, title: 'Sản phẩm giảm giá' },
  { path: 'detail/:id', component: ProductDetailComponent, title: 'Chi tiết sản phẩm' }
]
