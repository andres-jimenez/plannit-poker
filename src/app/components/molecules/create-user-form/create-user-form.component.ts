import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SelectComponent } from '../../atoms/select/select.component';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '../../../constants/local-storage';
import { APP_ROUTES } from '../../../constants/app-routes';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
  ],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss',
})
export class CreateUserFormComponent {
  @Input() gameName: string = '';

  userName: string = '';
  userType: string = '';

  isInvalidUserName: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private validatorsService: ValidatorsService,
    private localStorageService: LocalStorageService
  ) {}

  onUserNameChanges = (value: string) => {
    this.userNameHasErrors(value);
  };

  onUserTypeChanges = (value: string) => {
    this.userType = value;
  };

  userNameHasErrors(userName: string): boolean {
    const { isInvalid, errorMessage } =
      this.validatorsService.isInvalidName(userName);

    this.isInvalidUserName = isInvalid;
    this.errorMessage = errorMessage;

    return isInvalid;
  }

  onSubmit(): void {
    const { userName, token } = this.authenticationService.login(this.userName);
    this.localStorageService.save(LOCAL_STORAGE.userLoginData, {
      userName,
      token,
      userType: this.userType,
    });

    this.router.navigate([APP_ROUTES.poker]);
  }
}
