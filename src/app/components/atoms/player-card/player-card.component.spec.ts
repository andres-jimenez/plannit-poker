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
    component.playerName = 'Andrés';
    component.playerType = 'player';

    fixture.detectChanges();

    const cardElement =
      fixture.debugElement.nativeElement.querySelector('.card--player');
    const nameElement =
      fixture.debugElement.nativeElement.querySelector('span');

    expect(cardElement).toBeTruthy();
    expect(nameElement.textContent.trim()).toBe('Andrés');
  });

  it('renders just 2 first letters of name in card if player is spectator', () => {
    component.playerName = 'Andrés';
    component.playerType = 'spectator';

    fixture.detectChanges();

    const cardElement =
      fixture.debugElement.nativeElement.querySelector('.card--spectator');

    expect(cardElement.textContent.trim()).toBe('AN');
  });
});
