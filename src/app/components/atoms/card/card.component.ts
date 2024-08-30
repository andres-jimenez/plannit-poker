import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() isSelected: boolean = false;
  @Input() score: string = '';
  @Output() onSelect: EventEmitter<string> = new EventEmitter();
  @Input() infoText: string = '';

  onCardSelect(score: string) {
    this.onSelect.emit(score);
  }
}
