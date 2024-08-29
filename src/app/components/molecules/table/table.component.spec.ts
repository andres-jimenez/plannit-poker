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
      { name: 'Jhon', type: 'player' },
      { name: 'Sara', type: 'spectator' },
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

  it('should unsubscribe on component destroy', () => {
    const unsubscribeSpy = spyOn(component['userSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
