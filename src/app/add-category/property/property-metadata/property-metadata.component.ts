import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MetadataForm } from '../../../shared/metadata.interface';
import { Property, PropertyTypes } from '../../../shared/property.interface';
import { PropertyMetadataConstrainedChoiceComponent } from './property-metadata-constrained-choice/property-metadata-constrained-choice.component';
import { PropertyMetadataNumberComponent } from './property-metadata-number/property-metadata-number.component';
import { PropertyMetadataFreeChoiceComponent } from './property-metadata-free-choice/property-metadata-free-choice.component';

@Component({
  selector: 'app-property-metadata',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PropertyMetadataNumberComponent,
    PropertyMetadataConstrainedChoiceComponent,
    PropertyMetadataFreeChoiceComponent
  ],
  templateUrl: './property-metadata.component.html',
  styleUrl: './property-metadata.component.scss',
})
export class PropertyMetadataComponent {
  readonly propertyTypes = Property.types;

  @Input({ required: true }) propertyType?: PropertyTypes | null;
  @Input({ required: true }) metadata?: FormGroup<
    Omit<MetadataForm, 'value' | 'type'>
  >;
}
