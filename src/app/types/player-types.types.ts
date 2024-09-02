export interface Player {
  name: string;
  type: playerTypes;
  hasVoted: boolean;
  vote: string | null;
  isAdmin: boolean;
}

export type playerTypes = 'player' | 'spectator';
export type voteDetail = { vote: string; count: number };
