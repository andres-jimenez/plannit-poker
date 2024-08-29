import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenName',
  standalone: true,
})
export class ShortenNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value.slice(0, 2).toUpperCase();
  }
}
