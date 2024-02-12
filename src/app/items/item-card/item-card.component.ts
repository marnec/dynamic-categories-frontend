import { Component, Input } from '@angular/core';
import { Item } from '../../shared/item.interface';
import { MatCardModule } from '@angular/material/card';
import { Property } from '../../shared/property.interface';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  readonly viewModes = Property.viewModes;

  @Input({ required: true }) item!: Item;
}
