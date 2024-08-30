import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserFormComponent } from './create-user-form.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { LOCAL_STORAGE } from '../../../constants/local-storage';
import { APP_ROUTES } from '../../../constants/app-routes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SelectComponent } from '../../atoms/select/select.component';

describe('CreateUserFormComponent', () => {
  let component: CreateUserFormComponent;
  let fixture: ComponentFixture<CreateUserFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let validatorsServiceSpy: jasmine.SpyObj<ValidatorsService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', [
      'login',
    ]);
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'save',
    ]);
    validatorsServiceSpy = jasmine.createSpyObj('ValidatorsService', [
      'isInvalidName',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        InputComponent,
        ButtonComponent,
        SelectComponent,
        CreateUserFormComponent,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: ValidatorsService, useValue: validatorsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update userType on onUserTypeChanges call', () => {
    const newUserType = 'admin';
    component.onUserTypeChanges(newUserType);
    expect(component.userType).toBe(newUserType);
  });

  it('should correctly validate userName and update errorMessage', () => {
    validatorsServiceSpy.isInvalidName.and.returnValue({
      isInvalid: true,
      errorMessage: 'Name is invalid',
    });
    component.userName = 'InvalidName';
    const isInvalid = component.userNameHasErrors(component.userName);
    expect(isInvalid).toBeTrue();
    expect(component.isInvalidUserName).toBeTrue();
    expect(component.errorMessage).toBe('Name is invalid');
  });

  it('should correctly validate userName and clear errorMessage', () => {
    validatorsServiceSpy.isInvalidName.and.returnValue({
      isInvalid: false,
      errorMessage: null,
    });
    component.userName = 'ValidName';
    const isInvalid = component.userNameHasErrors(component.userName);
    expect(isInvalid).toBeFalse();
    expect(component.isInvalidUserName).toBeFalse();
    expect(component.errorMessage).toBeNull();
  });

  it('should call save and navigate when userName is valid onSubmit', () => {
    validatorsServiceSpy.isInvalidName.and.returnValue({
      isInvalid: false,
      errorMessage: null,
    });
    authenticationServiceSpy.login.and.returnValue({
      userName: 'TestUser',
      token: 'fakeToken',
    });
    component.userName = 'ValidUser';
    component.userType = 'player';

    component.onSubmit();

    expect(localStorageServiceSpy.save).toHaveBeenCalledWith(
      LOCAL_STORAGE.userLoginData,
      {
        userName: 'TestUser',
        token: 'fakeToken',
        userType: 'player',
      }
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith([APP_ROUTES.poker]);
  });

  it('should not call save or navigate when userName is invalid onSubmit', () => {
    validatorsServiceSpy.isInvalidName.and.returnValue({
      isInvalid: true,
      errorMessage: 'Invalid name',
    });
    component.userName = 'InvalidUser';
    component.userType = 'player';

    component.onSubmit();

    expect(localStorageServiceSpy.save).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should call userNameHasErrors when onUserNameChanges is called', () => {
    validatorsServiceSpy.isInvalidName.and.returnValue({
      isInvalid: false,
      errorMessage: 'Valid name',
    });
    spyOn(component, 'userNameHasErrors').and.callThrough();
    const newUserName = 'TestUser';
    component.onUserNameChanges(newUserName);
    expect(component.userNameHasErrors).toHaveBeenCalledWith(newUserName);
  });
});
