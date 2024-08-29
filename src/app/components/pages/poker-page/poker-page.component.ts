import { Component } from '@angular/core';
import { CardsComponent } from '../../molecules/cards/cards.component';
import { TableComponent } from '../../molecules/table/table.component';
import { PokerTemplateComponent } from '../../templates/poker-template/poker-template.component';

@Component({
  standalone: true,
  imports: [CardsComponent, TableComponent, PokerTemplateComponent],
  templateUrl: './poker-page.component.html',
  styleUrl: `./poker-page.component.scss`,
})
export class PokerPageComponent {}
