import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MetadataForm } from '../../shared/metadata.interface';
import {
  Property,
  PropertyForm
} from '../../shared/property.interface';
import { PropertyMetadataComponent } from './property-metadata/property-metadata.component';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    TranslateModule,
    PropertyMetadataComponent,
  ],
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss',
})
export class PropertyComponent {
  readonly propertyTypes = Property.types;

  @Input({ required: true }) isLastProperty!: boolean;
  @Input({ required: true }) property!: FormGroup<PropertyForm>;
  @Output() remove = new EventEmitter();

  get metadata(): FormGroup<Omit<MetadataForm, 'value' | 'type'>> {
    return this.property!.controls.metadata;
  }

  removePropertyAt() {
    this.remove.emit();
  }
}
