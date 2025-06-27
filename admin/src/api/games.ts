import { Game } from '../../../functions/src/types/game';
import { z } from 'zod';

const base = import.meta.env.VITE_API_URL as string;

const PlayersSchema = z.object({
    min: z.number(),
    max: z.number().optional(),
});
const GameSchema: z.ZodSchema<Game> = z.object({
    id: z.string(),
    name: z.string(),
    releaseYear: z.number().optional(),
    players: PlayersSchema.optional(),
    publisher: z.string(),
    baseGame: z.string().optional(),
    expansions: z.array(z.string()).optional(),
    standalone: z.boolean().optional(),
    type: z.union([z.literal('BaseGame'), z.literal('Expansion')]),
});

async function safeFetch<T>(
    url: string,
    schema: z.ZodSchema<T>,
    init?: RequestInit,
): Promise<T> {
    const res = await fetch(url, init);
    if (!res.ok) {
        throw new Error(await res.text());
    }
    const json = await res.json();
    return schema.parse(json);
}

export const getGames = () =>
    safeFetch(`${base}/games`, z.array(GameSchema));

export const addGame = (g: Game) =>
    safeFetch(`${base}/games`, GameSchema, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(g),
    });

export const updateGame = (g: Game) =>
    safeFetch(`${base}/games/${g.id}`, GameSchema, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(g),
    });

export const deleteGame = (id: string) =>
    fetch(`${base}/games/${id}`, { method: 'DELETE' }).then(r => {
        if (!r.ok) throw new Error('Failed to delete');
    });
