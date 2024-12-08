import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true,
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.length === 10
      ? value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3') // Formato sem 9 dígito
      : value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Formato com 9 dígito
  }
}
