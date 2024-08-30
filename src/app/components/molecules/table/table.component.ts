import { Component, HostListener, OnInit } from '@angular/core';
import { PlayerCardComponent } from '../../atoms/player-card/player-card.component';
import { PokerService } from '../../../services/poker/poker.service';
import {
  Player,
  playerTypes,
  voteDetail,
} from '../../../types/player-types.types';
import { playersPositionsInTable } from '../../../constants/ui';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { LOCAL_STORAGE } from '../../../constants/local-storage';
import { CardsComponent } from '../cards/cards.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CardComponent } from '../../atoms/card/card.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    PlayerCardComponent,
    CardsComponent,
    ButtonComponent,
    CardComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  localPlayer: Player = {
    name: '',
    type: 'player',
    hasVoted: false,
    vote: null,
  };

  players: Player[] = [];
  allPlayersVoted: boolean = false;
  showAllPlayerVotes: boolean = false;
  detailVotes: voteDetail[] = [];
  votesAverage: string | null = null;
  pokerFinished: boolean = false;
  playersPositionInTable: string[] = [];

  constructor(
    private pokerService: PokerService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const userLoginData = this.localStorageService.get(
      LOCAL_STORAGE.userLoginData
    ) as { userName: string; userType: playerTypes };

    if (!userLoginData) return;

    this.localPlayer = {
      ...this.localPlayer,
      name: userLoginData.userName,
      type: userLoginData.userType,
    };

    this.players = this.pokerService.getUsers();

    if (userLoginData.userType === 'spectator') this.simulateGame();

    this.onResize();
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

  registerLocalPlayerVote(score: string) {
    this.localPlayer = { ...this.localPlayer, hasVoted: true, vote: score };

    setTimeout(() => {
      this.pokerService.getVotes();
      this.players = this.pokerService.getUsers();
      this.allPlayersVoted = true;
    }, 2000);
  }

  getDetailVotes() {
    this.detailVotes = this.pokerService.getDetailVotes();
  }

  getAverageVotes() {
    this.votesAverage = this.pokerService.getAverageVote();
  }

  revealAllCards() {
    this.pokerService.addUser(this.localPlayer);
    this.showAllPlayerVotes = true;
    this.getDetailVotes();
    this.getAverageVotes();
    this.pokerFinished = true;
  }

  onResetPoker() {
    this.pokerService.resetPoker();
    this.showAllPlayerVotes = false;
    this.detailVotes = [];
    this.votesAverage = null;
    this.pokerFinished = false;
    this.allPlayersVoted = false;
    this.players = this.pokerService.getUsers();
    this.localPlayer = { ...this.localPlayer, hasVoted: false, vote: null };
  }

  simulateGame() {
    setInterval(() => {
      setTimeout(() => {
        this.pokerService.getVotes();
        this.players = this.pokerService.getUsers();
        this.allPlayersVoted = true;
      }, 500);

      setTimeout(() => {
        this.revealAllCards();
      }, 2000);

      setTimeout(() => {
        this.onResetPoker();
      }, 7000);
    }, 10000);
  }
}
