import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './constants/app-routes';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let locationSpy: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    locationSpy = jasmine.createSpyObj('Location', ['path']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: Location, useValue: locationSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    locationSpy.path.and.returnValue(APP_ROUTES.poker);
    fixture.detectChanges();

    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render app container', () => {
    locationSpy.path.and.returnValue(APP_ROUTES.poker);
    fixture.detectChanges();

    const containerElement =
      fixture.debugElement.nativeElement.querySelector('.container');

    expect(containerElement).toBeTruthy();
  });

  it('should set isInPokerTable to true if is in poker', () => {
    locationSpy.path.and.returnValue(APP_ROUTES.poker);
    fixture.detectChanges();

    expect(component.isInPokerTable).toBeTrue();
  });

  it('should set isInPokerTable to false if is not in poker', () => {
    locationSpy.path.and.returnValue(APP_ROUTES.join);
    fixture.detectChanges();

    expect(component.isInPokerTable).toBeFalse();
  });
});
