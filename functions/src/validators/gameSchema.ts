import { z } from 'zod';
import { Game } from '../types/game';

export const PlayersSchema: z.ZodType<Game['players']> = z.object({
  min: z.number(),
  max: z.number().optional(),
});

const BaseGameSchema = z
  .object({
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

export const NewGameSchema = BaseGameSchema.extend({
  id: z.string().optional(),
});

export const GameSchema: z.ZodSchema<Game> = NewGameSchema.extend({
  id: z.string(),
}).strict();
