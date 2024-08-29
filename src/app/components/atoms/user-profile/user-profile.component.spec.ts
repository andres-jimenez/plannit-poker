import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
