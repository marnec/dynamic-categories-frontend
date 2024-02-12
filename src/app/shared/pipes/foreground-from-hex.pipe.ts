import { Pipe, PipeTransform } from '@angular/core';
import { Hex } from '../functions/hex';

@Pipe({
  name: 'foregroundFromHex',
  standalone: true,
})
export class ForegroundFromHexPipe implements PipeTransform {
  transform(hex: string): 'black' | 'white' {
    return Hex.getForeground(hex);
  }
}
