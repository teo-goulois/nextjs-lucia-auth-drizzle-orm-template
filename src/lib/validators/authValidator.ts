import { z } from "zod";

export const loginValidator = z.object({
  email: z.string().email(),
});
export type LoginValitor = z.infer<typeof loginValidator>;

export const registerValidator = z.object({
  email: z.string().email(),
});
export type RegisterValidator = z.infer<typeof registerValidator>;
