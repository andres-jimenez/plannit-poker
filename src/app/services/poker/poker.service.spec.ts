import { TestBed } from '@angular/core/testing';

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

  it('should return all 7 users', () => {
    const users = service.getUsers();

    expect(users.length).toBe(7);
  });

  it('should add user', () => {
    service.addUser({
      name: 'Test',
      type: 'spectator',
      hasVoted: false,
      vote: null,
    });

    const users = service.getUsers();

    const createdUser = users.find((user) => user.name === 'Test');

    expect(createdUser).toBeTruthy();
  });

  it('should get votes', () => {
    service.getVotes();
    const users = service.getUsers();

    const usersVoted = users.filter(
      (user) => user.type === 'player' && user.hasVoted
    );

    expect(usersVoted.length).toBe(5);
  });
});
