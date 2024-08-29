import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_ROUTES } from './constants/app-routes';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isInPokerTable: boolean = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    if (this.location.path() === APP_ROUTES.poker) {
      this.isInPokerTable = true;
    } else {
      this.isInPokerTable = false;
    }
  }
}
