import { z } from 'zod';

export const pokemonBasicResultSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const pokemonDetailResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  
  sprites: z.object({
    other: z.object({
      'official-artwork': z.object({
        front_default: z.string(),
      }),
    }),
  }),
});

export const pokemonBasicSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(pokemonBasicResultSchema),
});
