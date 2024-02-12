import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MetadataForm } from '../../../shared/metadata.interface';
import { Property } from '../../../shared/property.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-item-property-boolean',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './item-property-boolean.component.html',
  styleUrl: './item-property-boolean.component.scss',
})
export class ItemPropertyBooleanComponent {
  @Input({ required: true }) metadata!: FormGroup<MetadataForm>;
  @Input({ required: true }) property!: Property;
}
