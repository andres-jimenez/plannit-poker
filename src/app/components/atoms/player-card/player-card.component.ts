import { Component, Input } from '@angular/core';
import { Player, playerTypes } from '../../../types/player-types.types';
import { ShortenNamePipe } from '../../../pipes/shorten-name.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule, ShortenNamePipe],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent {
  @Input() player: Player = {
    name: '',
    type: 'player',
    hasVoted: false,
    vote: null,
  };
  @Input() showScore: boolean = false;
}
