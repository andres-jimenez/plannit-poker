import {
  discardPeriodicTasks,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';

import { PokerService } from './poker.service';

describe('PokerService', () => {
  let service: PokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit users in sequence', fakeAsync(() => {
    let emittedValues: any[] = [];

    service.getUsers().subscribe((value) => {
      emittedValues.push(value);
    });

    tick(6000);

    expect(emittedValues.length).toBe(4);

    expect(emittedValues[0]).toEqual({ name: 'Pedro', type: 'player' });
    expect(emittedValues[1]).toEqual({ name: 'Juan', type: 'player' });
    expect(emittedValues[2]).toEqual({ name: 'Ana', type: 'spectator' });

    discardPeriodicTasks();
  }));
});
