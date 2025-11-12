import { z } from "zod";

export const vocabularySchema = z.object({
  question: z.string().min(1, { message: "Vocabulary is required" }),
  answer: z.string().min(1, { message: "Answer is required" }),
});

export type vocabularySchemaType = z.infer<typeof vocabularySchema>;
