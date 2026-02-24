import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Deals of Quality'),
    category: z.string(), // e.g. "TV Mounting", "Computers & Tech", "Home Improvement"
    heroImage: z.string().optional(),
    image: z.string().optional(),
    readingTime: z.number().optional(), // minutes
  }),
});

export const collections = {
  blog,
};
