import { Injectable } from '@angular/core';
import { CanMatch, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { LOCAL_STORAGE } from '../constants/local-storage';
import { APP_ROUTES } from '../constants/app-routes';

@Injectable({ providedIn: 'root' })
export class PokerGuard implements CanMatch {
  constructor(
    private authentication: AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canMatch(): MaybeAsync<GuardResult> {
    const userLoginData = this.localStorageService.get(
      LOCAL_STORAGE.userLoginData
    ) as {
      token: string;
    };

    if (userLoginData) {
      if (this.authentication.validateToken(userLoginData.token)) {
        return true;
      } else {
        this.router.navigate([APP_ROUTES.join]);
      }
    } else {
      this.router.navigate([APP_ROUTES.join]);
    }

    return false;
  }
}
