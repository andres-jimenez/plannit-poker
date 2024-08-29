import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PlayerCardComponent } from '../../atoms/player-card/player-card.component';
import { PokerService } from '../../../services/poker/poker.service';
import { Player, playerTypes } from '../../../types/player-types.types';
import { Subscription } from 'rxjs';
import { playersPositionsInTable } from '../../../constants/ui';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { LOCAL_STORAGE } from '../../../constants/local-storage';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnDestroy {
  userName: string = '';
  userType: playerTypes = 'player';

  players: Player[] = [];
  playersPositionInTable: string[] = [];

  private userSubscription: Subscription = new Subscription();

  constructor(
    private pokerService: PokerService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const userLoginData = this.localStorageService.get(
      LOCAL_STORAGE.userLoginData
    ) as { userName: string; userType: playerTypes };

    if (!userLoginData) return;

    this.userName = userLoginData.userName;
    this.userType = userLoginData.userType;

    this.userSubscription = this.pokerService.getUsers().subscribe((user) => {
      if (this.players.length < 7) {
        this.players.push(user as Player);
      } else {
        this.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  unsubscribe(): void {
    this.userSubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 1270) {
      this.playersPositionInTable = playersPositionsInTable.mobile;
    } else {
      this.playersPositionInTable = playersPositionsInTable.desktop;
    }
  }

  getPlayerPositionInTable(position: number) {
    return this.playersPositionInTable[position];
  }
}
