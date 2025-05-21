import { z } from 'zod';

export const pokemonBasicResultSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const pokemonDetailResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
});

export const pokemonBasicSchema = z.object({
  count: z.number(),
  next: z.string(),
  previous: z.string().nullable(),
  results: z.array(pokemonBasicResultSchema),
});

export const pokemonDetailSchema = z.array(pokemonDetailResultSchema);
