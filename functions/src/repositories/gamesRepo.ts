import admin from 'firebase-admin';
import { Game } from '../types/game';

admin.initializeApp();
const db = admin.firestore();
const col = db.collection('games');

export const listGames = async () =>
    (await col.get()).docs.map(d => d.data() as Game);

export const getGame = async (id: string) =>
    (await col.doc(id).get()).data() as Game | undefined;

export const saveGame = async (g: Game) => col.doc(g.id).set(g);

export const deleteGame = async (id: string) => col.doc(id).delete();
