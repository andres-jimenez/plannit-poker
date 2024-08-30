import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { LOCAL_STORAGE } from '../../../constants/local-storage';
import { ShortenNamePipe } from '../../../pipes/shorten-name.pipe';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../constants/app-routes';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ShortenNamePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userName: string = '';

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userLoginData = this.localStorageService.get(
      LOCAL_STORAGE.userLoginData
    ) as { userName: string };

    if (!userLoginData) return;

    this.userName = userLoginData.userName;
  }

  onUserLogout() {
    const decision = confirm('¿Deseas salir del Plannit Poker?');

    if (decision) {
      this.localStorageService.delete(LOCAL_STORAGE.gameData);
      this.localStorageService.delete(LOCAL_STORAGE.userLoginData);

      this.router.navigate([APP_ROUTES.home]);
    }
  }
}
