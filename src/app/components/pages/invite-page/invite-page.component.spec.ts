import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePageComponent } from './invite-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { of } from 'rxjs';
import { CreateUserFormComponent } from '../../molecules/create-user-form/create-user-form.component';
import { LOCAL_STORAGE } from '../../../constants/local-storage';
import { APP_ROUTES } from '../../../constants/app-routes';

describe('InvitePageComponent', () => {
  let component: InvitePageComponent;
  let fixture: ComponentFixture<InvitePageComponent>;
  let router: Router;
  let localStorageService: LocalStorageService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'save',
    ]);
    const activatedRouteSpy = { queryParams: of({ gameId: '12345678' }) };

    await TestBed.configureTestingModule({
      imports: [InvitePageComponent, CreateUserFormComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitePageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    localStorageService = TestBed.inject(LocalStorageService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save game data if gameId is 12345678', () => {
    component.ngOnInit();
    expect(localStorageService.save).toHaveBeenCalledWith(
      LOCAL_STORAGE.gameData,
      { name: 'Sprint 5' }
    );
  });

  it('should navigate to home if gameId is not 12345678', () => {
    (activatedRoute as any).queryParams = of({ gameId: 'wrongId' });
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith([APP_ROUTES.home]);
  });
});
