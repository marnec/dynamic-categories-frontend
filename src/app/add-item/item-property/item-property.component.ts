import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ItemPropertyForm, Property } from '../../shared/property.interface';
import { ItemPropertyFreeChoiceComponent } from './item-property-free-choice/item-property-free-choice.component';
import { ItemPropertyConstrainedChoiceComponent } from './item-property-constrained-choice/item-property-constrained-choice.component';
import { ItemPropertyStringComponent } from './item-property-string/item-property-string.component';
import { ItemPropertyNumberComponent } from './item-property-number/item-property-number.component';
import { ItemPropertyBooleanComponent } from './item-property-boolean/item-property-boolean.component';

@Component({
  selector: 'app-item-property',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    ItemPropertyFreeChoiceComponent,
    ItemPropertyConstrainedChoiceComponent,
    ItemPropertyStringComponent,
    ItemPropertyNumberComponent,
    ItemPropertyBooleanComponent
  ],
  templateUrl: './item-property.component.html',
  styleUrl: './item-property.component.scss',
})
export class ItemPropertyComponent {
  readonly propertyTypes = Property.types;

  @Input({ required: true }) itemProperty!: FormGroup<ItemPropertyForm>;
  @Input({ required: true }) property!: Property;

  unsetValue() {
    this.itemProperty.controls.metadata.controls.value.reset();
  }
}
