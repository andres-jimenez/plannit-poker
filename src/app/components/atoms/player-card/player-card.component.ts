import { Component, Input } from '@angular/core';
import { playerTypes } from '../../../types/player-types.types';
import { ShortenNamePipe } from '../../../pipes/shorten-name.pipe';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [ShortenNamePipe],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent {
  @Input() playerName: string = '';
  @Input() playerType: playerTypes = 'player';
}
