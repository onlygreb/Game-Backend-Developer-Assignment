import { Game } from '../../types/game';
import { getFirestore } from './getFirestore';

const col = getFirestore().collection('games');

export const listGames = async (): Promise<Game[]> =>
  (await col.get()).docs.map(d => d.data() as Game);

export const saveGame = async (g: Game) => col.doc(g.id).set(g);

export const deleteGame = async (id: string) => col.doc(id).delete();