import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardComponent } from './player-card.component';

describe('PlayerCardComponent', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the player card correctly', () => {
    component.player = {
      name: 'Andrés',
      type: 'player',
      hasVoted: false,
      vote: null,
      isAdmin: false,
    };

    fixture.detectChanges();

    const cardElement =
      fixture.debugElement.nativeElement.querySelector('.card--player');
    const nameElement =
      fixture.debugElement.nativeElement.querySelector('span');

    expect(cardElement).toBeTruthy();
    expect(nameElement.textContent.trim()).toBe('Andrés');
  });

  it('renders just 2 first letters of name in card if player is spectator', () => {
    component.player = {
      name: 'Andrés',
      type: 'spectator',
      hasVoted: false,
      vote: null,
      isAdmin: false,
    };

    fixture.detectChanges();

    const cardElement =
      fixture.debugElement.nativeElement.querySelector('.card--spectator');

    expect(cardElement.textContent.trim()).toBe('AN');
  });

  it('should render voted card if player has voted', () => {
    component.player = {
      name: 'Andrés',
      type: 'player',
      hasVoted: true,
      vote: '5',
      isAdmin: false,
    };

    fixture.detectChanges();

    const cardElement = fixture.debugElement.nativeElement.querySelector(
      '.card--player--voted'
    );

    expect(cardElement).toBeTruthy();
  });

  it('should show score if showScore is true', () => {
    component.player = {
      name: 'Andrés',
      type: 'player',
      hasVoted: true,
      vote: '5',
      isAdmin: false,
    };
    component.showScore = true;

    fixture.detectChanges();

    const cardElement = fixture.debugElement.nativeElement.querySelector(
      '.card--player--revealed'
    );

    expect(cardElement.textContent.trim()).toBe('5');
  });
});
