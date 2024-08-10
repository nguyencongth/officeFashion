import {Component, OnInit} from '@angular/core';
import {SlickCarouselDirective} from "./slick-carousel.directive";
import {ProductService} from "../../core/services/product.service";
import {NgFor, NgIf} from "@angular/common";
import {CurrencyFormatPipe} from "../../core/Pipe/currency-format.pipe";
import {Router, RouterModule} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SlickCarouselDirective,
    NgFor,
    NgIf,
    CurrencyFormatPipe,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  products: any[] = [];
  productsSale: any[] = [];
  slickConfig1 = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    draggable: false,
    prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="arrow-back-outline"></ion-icon></button>`,
    nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="arrow-forward-outline"></ion-icon></button>`,
    dots: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          infinite: false,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 2000,
  };

  slickConfig2 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    draggable: false,
    prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="arrow-back-outline"></ion-icon></button>`,
    nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="arrow-forward-outline"></ion-icon></button>`,
    dots: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          infinite: false,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 2000,
  };
  display = false;
  displaySale = false;
  ngOnInit() {
    this.getProductsNew();
    this.getProductsSale();
    this.toastr.info("Chào mừng bạn đến với 2T-STORE Thời trang công sở", "Thông báo", {
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });
  }
  getProductsNew(){
    this.productService.getProductNewHome().subscribe((data: any) => {
      this.display = true;
      this.products = data.arrayProduct;
    });
  }
  getProductsSale(){
    this.productService.getProductSaleHome().subscribe((data: any) => {
      this.displaySale = true;
      this.productsSale = data.arrayProduct;
    });
  }
  productDetail(id: number) {
    this.router.navigate(['/product/detail', id]);
  }
}
