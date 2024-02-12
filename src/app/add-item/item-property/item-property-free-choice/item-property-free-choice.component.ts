import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MetadataForm } from '../../../shared/metadata.interface';
import { Property } from '../../../shared/property.interface';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
  NgxMatColorPickerComponent,
  Color,
  NgxMatColorPickerInputEvent,
} from '@angular-material-components/color-picker';
import { Hex } from '../../../shared/functions/hex';

@Component({
  selector: 'app-item-property-free-choice',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxMatColorPickerModule,
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  templateUrl: './item-property-free-choice.component.html',
  styleUrl: './item-property-free-choice.component.scss',
})
export class ItemPropertyFreeChoiceComponent {
  readonly viewModes = Property.viewModes;

  @Input({ required: true }) metadata!: FormGroup<MetadataForm>;
  @Input({ required: true }) property!: Property;
  @Output() unsetValue = new EventEmitter();
  @ViewChild('picker') picker?: NgxMatColorPickerComponent;

  pickColor(color: string) {
    const hex = Hex.ToRgb(color);

    if (!hex) {
      return;
    }

    const { r, g, b } = hex;
    this.picker?.select(new Color(r, g, b));
    this.metadata.patchValue({ value: color });
  }

  setColor(event: NgxMatColorPickerInputEvent) {
    this.metadata.patchValue({ value: event.value?.hex || null });
  }
}
