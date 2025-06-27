import { z } from 'zod';
import { Game, Players } from '../types/game';

export const PlayersSchema: z.ZodType<Players> = z.object({
    min: z.number(),
    max: z.number().optional(),
});

export const GameSchema: z.ZodType<Game> = z
    .object({
        id: z.string(),
        name: z.string(),
        publisher: z.string(),
        type: z.union([z.literal('BaseGame'), z.literal('Expansion')]),
        releaseYear: z.number().optional(),
        players: PlayersSchema.optional(),
        baseGame: z.string().optional(),
        expansions: z.array(z.string()).optional(),
        standalone: z.boolean().optional(),
    })
    .strict();
