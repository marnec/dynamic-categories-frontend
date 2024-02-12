import { Pipe, PipeTransform } from '@angular/core';
import { isDefined } from '../functions/is-defined';

@Pipe({
  name: 'isDefined',
  standalone: true,
})
export class IsDefinedPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return isDefined(value);
  }
}
