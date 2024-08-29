import { Injectable } from '@angular/core';
import { CanMatch, GuardResult, MaybeAsync, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { LOCAL_STORAGE } from '../constants/local-storage';
import { APP_ROUTES } from '../constants/app-routes';

@Injectable({ providedIn: 'root' })
export class JoinGuard implements CanMatch {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canMatch(): MaybeAsync<GuardResult> {
    const gameData = this.localStorageService.get(LOCAL_STORAGE.gameData) as {
      name: string;
    };

    if (gameData) {
      if (gameData.name) {
        return true;
      } else {
        this.router.navigate([APP_ROUTES.home]);
      }
    } else {
      this.router.navigate([APP_ROUTES.home]);
    }

    return false;
  }
}
