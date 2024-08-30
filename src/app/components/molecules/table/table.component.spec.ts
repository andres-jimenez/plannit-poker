import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { playersPositionsInTable } from '../../../constants/ui';
import { of } from 'rxjs';
import { PokerService } from '../../../services/poker/poker.service';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    const pokerServiceSpy = jasmine.createSpyObj('PokerService', ['getUsers']);

    await TestBed.configureTestingModule({
      imports: [TableComponent],
      providers: [{ provide: PokerService, useValue: pokerServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all players included the local player', () => {
    component.players = [
      { name: 'Jhon', type: 'player', hasVoted: false, vote: null },
      { name: 'Sara', type: 'spectator', hasVoted: false, vote: null },
    ];

    fixture.detectChanges();

    const playersElements = fixture.debugElement.queryAll(
      By.css('.playersGrid__item')
    );

    expect(playersElements.length).toBe(3);
  });

  it('should handle resizing of the window', () => {
    spyOn(component, 'getPlayerPositionInTable').and.callThrough();

    window.innerWidth = 1200;
    component.onResize();
    expect(component.playersPositionInTable).toBe(
      playersPositionsInTable.mobile
    );

    window.innerWidth = 1300;
    component.onResize();
    expect(component.playersPositionInTable).toBe(
      playersPositionsInTable.desktop
    );
  });

  it('should render reveal card button if all players voted and reset game button if poker finished', () => {
    component.allPlayersVoted = true;

    fixture.detectChanges();

    let buttonElement =
      fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement.textContent.trim()).toBe('Revelar cartas');

    component.pokerFinished = true;

    fixture.detectChanges();

    buttonElement = fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement.textContent.trim()).toBe('Nueva votación');
  });

  it('should show votes average', () => {
    component.showAllPlayerVotes = true;
    component.votesAverage = '5.4';

    fixture.detectChanges();

    const averageElement =
      fixture.debugElement.nativeElement.querySelector('.average__value');

    expect(averageElement.textContent).toBe('5.4');
  });

  it('should render card votes details', () => {
    component.showAllPlayerVotes = true;
    component.detailVotes = [{ vote: '5', count: 3 }];

    fixture.detectChanges();

    const cardDetailsElement = fixture.debugElement.nativeElement.querySelector(
      '.details__cardContainer'
    );

    expect(cardDetailsElement).toBeTruthy();
  });
});
