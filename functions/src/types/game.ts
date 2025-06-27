export interface Players {
  min: number;
  max?: number | undefined;
}

export type GameType = 'BaseGame' | 'Expansion';

export interface Game {
  id: string;
  name: string;
  publisher?: string | undefined;
  type: GameType;
  releaseYear?: number | undefined;
  players?: Players | undefined;
  baseGame?: string | undefined;
  expansions?: string[] | undefined;
  standalone?: boolean | undefined;
}
