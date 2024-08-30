import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '../../../constants/local-storage';
import { APP_ROUTES } from '../../../constants/app-routes';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'delete',
      'get',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders just 2 first letters of name in card if player is spectator', () => {
    component.userName = 'Alfredo';

    fixture.detectChanges();

    const cardElement =
      fixture.debugElement.nativeElement.querySelector('span');

    expect(cardElement.textContent.trim()).toBe('AL');
  });

  it('should set userName correctly from localStorage', () => {
    const mockUserLoginData = { userName: 'Andr' };

    localStorageServiceSpy.get.and.returnValue(mockUserLoginData);

    fixture.detectChanges();

    expect(component.userName).toBe('Andr');
  });

  it('should delete user data and navigate to home when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.onUserLogout();

    expect(localStorageServiceSpy.delete).toHaveBeenCalledWith(
      LOCAL_STORAGE.gameData
    );
    expect(localStorageServiceSpy.delete).toHaveBeenCalledWith(
      LOCAL_STORAGE.userLoginData
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith([APP_ROUTES.home]);
  });

  it('should not delete user data or navigate when canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.onUserLogout();

    expect(localStorageServiceSpy.delete).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
