import {Component, OnInit} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {OrderService} from "../../core/services/order.service";
import { NgFor, NgIf} from "@angular/common";
import {CurrencyFormatPipe} from "../../core/Pipe/currency-format.pipe";
import { ScrollingModule } from '@angular/cdk/scrolling';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-order',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    CurrencyFormatPipe,
    NgFor,
    NgIf,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  dataSource: any[] = [];
  display = false;
  isLoading = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  customDiameter = 50;
  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.getOrderList();
  }
  getOrderList() {
    const customerId = Number(localStorage.getItem('user_id'));
    this.orderService.getOrderList(customerId).subscribe((data: any) => {
      this.dataSource = data.arrayOrders;
      this.dataSource.forEach((order: any   ) => {
        order.total_amount = new CurrencyFormatPipe().transform(order.total_amount);
        if(order.orderStatus === 0) {
          order.orderStatus = 'Đang chờ xử lý';
        }
        if(order.orderStatus === 1) {
          order.orderStatus = 'Đã xác nhận';
        }
        if(order.orderStatus === 2) {
          order.orderStatus = 'Hoàn thành';
        }
      });
      this.display = true;
      this.isLoading = false;
    });
  }
  columnsToDisplay = ['order_id', 'paymentMethod', 'orderStatus', 'order_date', 'total_amount'];
  expandedElement: any;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'cancel', 'confirm'];
  getColumnLabel(columnKey: string): string {
    switch (columnKey) {
      case 'order_id':
        return 'Mã đơn hàng';
      case 'total_amount':
        return 'Tổng tiền';
      case 'paymentMethod':
        return 'Phương thức thanh toán';
      case 'orderStatus':
        return 'Trạng thái';
      case 'order_date':
        return 'Ngày đặt';
      default:
        return columnKey;
    }
  }
  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId).subscribe(() => {
      this.getOrderList();
    });
  }
  confirmOrder(orderId: number, status: number) {
    this.orderService.confirmOrder(orderId, status).subscribe(() => {
      this.getOrderList();
    });
  }
}
