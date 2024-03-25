import { Component } from '@angular/core';
import {CheckoutComponent} from "../../pages/checkout/checkout.component";

@Component({
  selector: 'app-checkout-layout',
  standalone: true,
  imports: [CheckoutComponent],
  templateUrl: './checkout-layout.component.html',
  styleUrl: './checkout-layout.component.css'
})
export class CheckoutLayoutComponent {

}
