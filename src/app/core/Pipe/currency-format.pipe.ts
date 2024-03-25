import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value) || value === null || value === undefined) {
      return '';
    }
    return value.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
  }
}
