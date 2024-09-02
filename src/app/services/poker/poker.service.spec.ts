import { TestBed } from '@angular/core/testing';

import { PokerService, usersInitialState } from './poker.service';
import { voteDetail } from '../../types/player-types.types';

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
      isAdmin: false,
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

  it('should return detail votes', () => {
    service.getVotes();
    const detailVotes: voteDetail[] = service.getDetailVotes();

    expect(detailVotes).toEqual(jasmine.any(Array));
    detailVotes.forEach((detail) => {
      expect(typeof detail.vote).toBe('string');
      expect(typeof detail.count).toBe('number');
    });
  });

  it('should return average vote', () => {
    service.getVotes();
    const averageVote = service.getAverageVote();

    expect(averageVote).toMatch(/^\d+(\.\d)?$/);
  });

  it('should reset users to initial state', () => {
    service.getVotes();
    service.resetPoker();
    const users = service.getUsers();

    expect(users).toEqual(usersInitialState);
  });
});
