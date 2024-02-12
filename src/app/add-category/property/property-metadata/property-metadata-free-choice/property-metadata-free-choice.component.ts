import { Component, Input } from '@angular/core';
import { MetadataForm } from '../../../../shared/metadata.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Property } from '../../../../shared/property.interface';

@Component({
  selector: 'app-property-metadata-free-choice',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule],
  templateUrl: './property-metadata-free-choice.component.html',
  styleUrl: './property-metadata-free-choice.component.scss',
})
export class PropertyMetadataFreeChoiceComponent {
  readonly viewModes = Object.values(Property.viewModes);

  @Input({ required: true }) metadata?: FormGroup<
    Omit<MetadataForm, 'value' | 'type'>
  >;
}
