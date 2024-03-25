import { Component } from '@angular/core';
import {FooterComponent} from "../../pages/footer/footer.component";
import {FreFooterComponent} from "../../pages/fre-footer/fre-footer.component";
import {HeaderComponent} from "../../pages/header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  standalone: true,
    imports: [
        FooterComponent,
        FreFooterComponent,
        HeaderComponent,
        RouterOutlet
    ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
