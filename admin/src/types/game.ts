export interface Players {
  min: number;
  max?: number;
}

export type GameType = 'BaseGame' | 'Expansion';

export interface Game {
  id: string;
  name: string;
  publisher?: string;
  type: GameType;
  releaseYear?: number;
  players?: Players;
  baseGame?: string;
  expansions?: string[];
  standalone?: boolean;
}
