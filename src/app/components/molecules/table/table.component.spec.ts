import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TableComponent } from './table.component';
import { playersPositionsInTable } from '../../../constants/ui';
import { PokerService } from '../../../services/poker/poker.service';
import { By } from '@angular/platform-browser';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { voteDetail } from '../../../types/player-types.types';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let pokerServiceSpy: jasmine.SpyObj<PokerService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    pokerServiceSpy = jasmine.createSpyObj('PokerService', [
      'getUsers',
      'getVotes',
      'getDetailVotes',
      'getAverageVote',
      'addUser',
      'resetPoker',
    ]);

    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'get',
    ]);

    localStorageServiceSpy.get.and.returnValue({
      userName: 'TestUser',
      userType: 'player',
      isAdmin: false,
    });

    await TestBed.configureTestingModule({
      imports: [TableComponent],
      providers: [
        { provide: PokerService, useValue: pokerServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
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
      {
        name: 'Jhon',
        type: 'player',
        hasVoted: false,
        vote: null,
        isAdmin: false,
      },
      {
        name: 'Sara',
        type: 'spectator',
        hasVoted: false,
        vote: null,
        isAdmin: true,
      },
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
    component.localPlayer = {
      name: 'Test',
      type: 'player',
      isAdmin: true,
      hasVoted: true,
      vote: '5',
    };

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

  it('should initialize localPlayer from localStorage on ngOnInit', () => {
    expect(component.localPlayer).toEqual({
      name: 'TestUser',
      type: 'player',
      hasVoted: false,
      vote: null,
      isAdmin: false,
    });
  });

  it('should register local player vote and update state', (done) => {
    component.registerLocalPlayerVote('5');

    pokerServiceSpy.getVotes.and.returnValue(undefined);
    pokerServiceSpy.getUsers.and.returnValue([]);

    setTimeout(() => {
      expect(component.localPlayer).toEqual({
        name: 'TestUser',
        type: 'player',
        hasVoted: true,
        vote: '5',
        isAdmin: false,
      });
      expect(pokerServiceSpy.getVotes).toHaveBeenCalled();
      expect(component.allPlayersVoted).toBeTrue();
      done();
    }, 2000);
  });

  it('should get detail votes and average votes correctly', () => {
    const mockDetailVotes: voteDetail[] = [{ vote: '5', count: 3 }];
    const mockAverageVote = '4.5';

    pokerServiceSpy.getDetailVotes.and.returnValue(mockDetailVotes);
    pokerServiceSpy.getAverageVote.and.returnValue(mockAverageVote);

    component.getDetailVotes();
    component.getAverageVotes();

    expect(component.detailVotes).toEqual(mockDetailVotes);
    expect(component.votesAverage).toBe(mockAverageVote);
  });

  it('should reveal all cards and update state', () => {
    pokerServiceSpy.addUser.and.returnValue(undefined);
    pokerServiceSpy.getDetailVotes.and.returnValue([]);
    pokerServiceSpy.getAverageVote.and.returnValue('4.5');

    component.revealAllCards();

    expect(pokerServiceSpy.addUser).toHaveBeenCalledWith(component.localPlayer);
    expect(component.showAllPlayerVotes).toBeTrue();
    expect(component.pokerFinished).toBeTrue();
  });

  it('should reset poker and update state', () => {
    pokerServiceSpy.resetPoker.and.returnValue(undefined);
    pokerServiceSpy.getUsers.and.returnValue([]);

    component.onResetPoker();

    expect(pokerServiceSpy.resetPoker).toHaveBeenCalled();
    expect(component.showAllPlayerVotes).toBeFalse();
    expect(component.detailVotes).toEqual([]);
    expect(component.votesAverage).toBeNull();
    expect(component.pokerFinished).toBeFalse();
    expect(component.allPlayersVoted).toBeFalse();
    expect(component.players).toEqual([]);
    expect(component.localPlayer).toEqual({
      name: 'TestUser',
      type: 'player',
      hasVoted: false,
      vote: null,
      isAdmin: false,
    });
  });

  it('should call simulateGame if player is spectator', () => {
    spyOn(component, 'simulateGame').and.callThrough();

    localStorageServiceSpy.get.and.returnValue({
      userName: 'TestUser',
      userType: 'spectator',
      isAdmin: false,
    });

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.simulateGame).toHaveBeenCalled();
  });
});
