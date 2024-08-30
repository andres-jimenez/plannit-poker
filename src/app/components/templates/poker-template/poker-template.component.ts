import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from '../../atoms/user-profile/user-profile.component';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { LOCAL_STORAGE } from '../../../constants/local-storage';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { InviteModalComponent } from '../../organisms/invite-modal/invite-modal.component';

@Component({
  selector: 'app-poker-template',
  standalone: true,
  imports: [
    CommonModule,
    UserProfileComponent,
    ButtonComponent,
    InviteModalComponent,
  ],
  templateUrl: './poker-template.component.html',
  styleUrl: './poker-template.component.scss',
})
export class PokerTemplateComponent implements OnInit {
  title: string = '';
  showInviteModal: boolean = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const gameData = this.localStorageService.get(LOCAL_STORAGE.gameData) as {
      name: string;
    };

    if (!gameData) return;

    this.title = gameData.name;
  }

  onShowInviteModal(value: boolean) {
    this.showInviteModal = value;
  }
}
