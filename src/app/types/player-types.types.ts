export interface Player {
  name: string;
  type: playerTypes;
}

export type playerTypes = 'player' | 'spectator';
