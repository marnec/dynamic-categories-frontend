import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MetadataForm } from '../../../../shared/metadata.interface';

@Component({
  selector: 'app-property-metadata-number',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './property-metadata-number.component.html',
  styleUrl: './property-metadata-number.component.scss',
})
export class PropertyMetadataNumberComponent {
  @Input({ required: true }) metadata?: FormGroup<
    Omit<MetadataForm, 'value' | 'type'>
  >;
}
