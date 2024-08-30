import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../../atoms/card/card.component';
import { cardScores } from '../../../constants/poker';

@Component({
  standalone: true,
  selector: 'app-cards',
  imports: [CommonModule, CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() selectedScore: string | null = null;
  @Output() registerLocalPlayerVote: EventEmitter<string> = new EventEmitter();

  scores = cardScores;

  handleSelectCard(score: string) {
    this.registerLocalPlayerVote.emit(score);
  }
}
