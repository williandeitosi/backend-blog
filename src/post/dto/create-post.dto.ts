import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
  created_at: z.string(),
});
export type CreatePostDto = z.infer<typeof CreatePostSchema>;
