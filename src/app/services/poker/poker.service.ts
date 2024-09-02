import { Injectable } from '@angular/core';
import { Player, voteDetail } from '../../types/player-types.types';
import { cardScores } from '../../constants/poker';

export const usersInitialState: Player[] = [
  {
    name: 'Pedro',
    type: 'player',
    hasVoted: false,
    vote: null,
    isAdmin: true,
  },
  { name: 'Juan', type: 'player', hasVoted: false, vote: null, isAdmin: false },
  {
    name: 'Ana',
    type: 'spectator',
    hasVoted: false,
    vote: null,
    isAdmin: false,
  },
  {
    name: 'Laura',
    type: 'player',
    hasVoted: false,
    vote: null,
    isAdmin: false,
  },
  {
    name: 'Carlos',
    type: 'player',
    hasVoted: false,
    vote: null,
    isAdmin: false,
  },
  {
    name: 'Maria',
    type: 'spectator',
    hasVoted: false,
    vote: null,
    isAdmin: false,
  },
  { name: 'Luis', type: 'player', hasVoted: false, vote: null, isAdmin: false },
];

@Injectable({
  providedIn: 'root',
})
export class PokerService {
  private users: Player[] = usersInitialState;

  constructor() {}

  getUsers(): Player[] {
    return this.users;
  }

  addUser(user: Player) {
    this.users = [...this.users, user];
  }

  getVotes() {
    this.users = this.users.map((user) => {
      if (user.type === 'spectator') return user;

      return {
        ...user,
        hasVoted: true,
        vote: cardScores[Math.floor(Math.random() * 12)],
      };
    });
  }

  getDetailVotes() {
    let votes: voteDetail[] = [];

    const usersThatVoted = this.users.filter((user) => user.vote);

    usersThatVoted.forEach((user) => {
      if (votes.find((vote) => vote.vote === user.vote)) {
        votes = votes.map((vote) => {
          if (vote.vote === user.vote) {
            return { ...vote, count: vote.count + 1 };
          } else {
            return vote;
          }
        });
      } else {
        votes = [...votes, { vote: user.vote!, count: 1 }];
      }
    });

    return votes;
  }

  getAverageVote() {
    const numericVotes = this.users.filter(
      (user) =>
        user.type === 'player' && user.hasVoted && !isNaN(Number(user.vote))
    );

    const totalVotes = numericVotes.length;
    const sumVotes = numericVotes.reduce(
      (sum, user) => sum + Number(user.vote),
      0
    );
    const average = totalVotes > 0 ? sumVotes / totalVotes : 0;

    return Number.isInteger(average) ? average.toString() : average.toFixed(1);
  }

  resetPoker() {
    this.users = usersInitialState;
  }
}
