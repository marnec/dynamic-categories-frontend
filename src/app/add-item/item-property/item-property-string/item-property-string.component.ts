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

@Component({
  selector: 'app-item-property-string',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './item-property-string.component.html',
  styleUrl: './item-property-string.component.scss',
})
export class ItemPropertyStringComponent {
  @Input({ required: true }) metadata!: FormGroup<MetadataForm>;
  @Input({ required: true }) property!: Property;
  @Output() unsetValue = new EventEmitter();
}
