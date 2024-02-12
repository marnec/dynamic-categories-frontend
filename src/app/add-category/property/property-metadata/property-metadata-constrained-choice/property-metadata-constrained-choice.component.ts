import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MetadataForm } from '../../../../shared/metadata.interface';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSelectModule } from '@angular/material/select';
import { Property } from '../../../../shared/property.interface';

@Component({
  selector: 'app-property-metadata-constrained-choice',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './property-metadata-constrained-choice.component.html',
  styleUrl: './property-metadata-constrained-choice.component.scss',
})
export class PropertyMetadataConstrainedChoiceComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly viewModes = Object.values(Property.viewModes);

  @Input({ required: true }) metadata?: FormGroup<
    Omit<MetadataForm, 'value' | 'type'>
  >;

  get choices(): FormControl<string[] | null> | undefined {
    return this.metadata?.controls.choices;
  }

  addChoice(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (!value) {
      return;
    }

    const choicesControl = this.choices;
    choicesControl?.setValue([...(choicesControl.value || []), value]);
    event.chipInput!.clear();
  }

  removeChoice(optionIndex: number): void {
    const choicesControl = this.choices;
    const choices = [...(choicesControl?.value || [])];

    choices.splice(optionIndex, 1);

    choicesControl?.setValue(choices);
  }

  editChoice(event: MatChipEditedEvent, optionIndex: number) {
    const value = event.value.trim();

    if (!value) {
      this.removeChoice(optionIndex);
      return;
    }

    const choicesControl = this.choices;
    const choices = [...(choicesControl?.value || [])];
    choices[optionIndex] = value;
    choicesControl?.setValue(choices);
  }
}
