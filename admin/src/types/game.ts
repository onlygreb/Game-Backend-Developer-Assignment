export interface Players {
    min: number;
    max?: number;
}

export type GameType = 'BaseGame' | 'Expansion';

export interface Game {
    id: string;
    name: string;
    releaseYear?: number;
    players?: Players;
    publisher: string;
    baseGame?: string;
    expansions?: string[];
    standalone?: boolean;
    type: GameType;
}