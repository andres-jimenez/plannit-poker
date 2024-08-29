import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from '../../atoms/user-profile/user-profile.component';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { LOCAL_STORAGE } from '../../../constants/local-storage';

@Component({
  selector: 'app-poker-template',
  standalone: true,
  imports: [UserProfileComponent],
  templateUrl: './poker-template.component.html',
  styleUrl: './poker-template.component.scss',
})
export class PokerTemplateComponent implements OnInit {
  title: string = '';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const gameData = this.localStorageService.get(LOCAL_STORAGE.gameData) as {
      name: string;
    };

    if (!gameData) return;

    this.title = gameData.name;
  }
}
