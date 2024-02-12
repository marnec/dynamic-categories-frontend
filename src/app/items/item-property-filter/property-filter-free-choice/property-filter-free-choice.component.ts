import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MetadataForm } from '../../../shared/metadata.interface';
import { Property } from '../../../shared/property.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PropertyFilterForm } from '../../item-filter.dto';
import { ForegroundFromHexPipe } from '../../../shared/pipes/foreground-from-hex.pipe';

@Component({
  selector: 'app-property-filter-free-choice',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    ForegroundFromHexPipe
  ],
  templateUrl: './property-filter-free-choice.component.html',
  styleUrl: './property-filter-free-choice.component.scss',
})
export class PropertyFilterFreeChoiceComponent {
  readonly viewModes = Property.viewModes;

  @Input({ required: true }) propertyFilter!: FormGroup<PropertyFilterForm>;
  @Input({ required: true }) property!: Property;
  @Output() unsetValue = new EventEmitter();

  get value(): string[] {
    return this.propertyFilter.controls.value.value as string[] || [];
  }

  toggleOption(choice: string) {
    const value = this.value;

    const indexOfChoice = value.indexOf(choice);

    if (indexOfChoice > -1) {
      value.splice(indexOfChoice, 1);
    } else {
      value.push(choice);
    }

    this.propertyFilter.controls.value.setValue(value);
  }
}
