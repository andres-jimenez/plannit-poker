import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { LOCAL_STORAGE } from '../../../constants/local-storage';
import { APP_ROUTES } from '../../../constants/app-routes';

@Component({
  selector: 'app-create-poker-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateUserFormComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './create-poker-form.component.html',
  styleUrl: './create-poker-form.component.scss',
})
export class CreatePokerFormComponent {
  gameName: string = '';

  isInvalidGameName: boolean = false;
  errorMessage: string | null = null;

  showCreateUserForm = false;

  constructor(
    private router: Router,
    private validatorsService: ValidatorsService,
    private localStorageService: LocalStorageService
  ) {}

  onGameNameChanges = (value: string) => {
    this.gameNameHasErrors(value);
  };

  gameNameHasErrors(gameName: string): boolean {
    const { isInvalid, errorMessage } =
      this.validatorsService.isInvalidName(gameName);

    this.isInvalidGameName = isInvalid;
    this.errorMessage = errorMessage;

    return isInvalid;
  }

  onSubmit(): void {
    if (!this.gameNameHasErrors(this.gameName)) {
      this.localStorageService.save(LOCAL_STORAGE.gameData, {
        name: this.gameName,
      });

      this.router.navigate([APP_ROUTES.join]);
    }
  }
}
