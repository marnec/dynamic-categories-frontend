import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Property } from '../../shared/property.interface';
import { ItemCardComponent } from '../item-card/item-card.component';
import { PropertyFilterForm } from '../item-filter.dto';
import { PropertyFilterConstrainedChoiceComponent } from './property-filter-constrained-choice/property-filter-constrained-choice.component';
import { PropertyFilterFreeChoiceComponent } from './property-filter-free-choice/property-filter-free-choice.component';
import { PropertyFilterNumberComponent } from './property-filter-number/property-filter-number.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-item-property-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    ItemCardComponent,
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    MatExpansionModule,
    PropertyFilterFreeChoiceComponent,
    PropertyFilterConstrainedChoiceComponent,
    PropertyFilterNumberComponent,
  ],
  templateUrl: './item-property-filter.component.html',
  styleUrl: './item-property-filter.component.scss',
})
export class ItemPropertyFilterComponent {
  readonly propertyTypes = Property.types;

  @Input({ required: true }) property!: Property;
  @Input({ required: true }) propertyFilterForm!: FormGroup<PropertyFilterForm>;

  unsetValue() {
    this.propertyFilterForm.controls.value.setValue(null);
  }
}
