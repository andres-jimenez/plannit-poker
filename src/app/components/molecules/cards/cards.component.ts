import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../../atoms/card/card.component';

@Component({
  standalone: true,
  selector: 'app-cards',
  imports: [CommonModule, CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  scores = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'];
}
