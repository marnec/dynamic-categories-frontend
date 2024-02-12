import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { PropertyFilterForm } from '../../item-filter.dto';
import { Property } from '../../../shared/property.interface';
import { IsDefinedPipe } from '../../../shared/pipes/is-defined.pipe';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-property-filter-number',
  standalone: true,
  imports: [
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    IsDefinedPipe,
  ],
  templateUrl: './property-filter-number.component.html',
  styleUrl: './property-filter-number.component.scss',
})
export class PropertyFilterNumberComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input({ required: true }) propertyFilter!: FormGroup<PropertyFilterForm>;
  @Input({ required: true }) property!: Property;
  @Output() unsetValue = new EventEmitter();

  @ViewChild('sliderFrom') sliderFrom?: ElementRef<MatInput>;
  @ViewChild('sliderTo') sliderTo?: ElementRef<MatInput>;

  unsub$ = new Subject();

  ngOnChanges(changes: SimpleChanges): void {
    const { property } = changes;
    if (!property || property.firstChange) {
      return;
    }

    if (this.sliderFrom && this.sliderTo) {
      const max = property.currentValue.metadata.max!;
      const min = property.currentValue.metadata.min!;

      this.sliderFrom.nativeElement.value = null;
      this.sliderFrom.nativeElement.value = null;

      this.propertyFilter.patchValue({
        max,
        min,
      });
    }
  }

  ngOnInit(): void {
    this.propertyFilter.valueChanges
      .pipe(takeUntil(this.unsub$))
      .subscribe((value) => {
        const { max, min } = value;

        if (max === null && min === null) {
          this.propertyFilter.patchValue(
            {
              max: this.property.metadata.max!,
              min: this.property.metadata.min!,
            },
            { emitEvent: false }
          );
        }
      });
  }
  ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }
}
