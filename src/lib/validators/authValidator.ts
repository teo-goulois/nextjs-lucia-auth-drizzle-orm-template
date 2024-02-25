import { z } from "zod";

export const loginValidator = z.object({
  email: z.string().email(),
  withoutRedirect: z.boolean().optional(),
});
export type LoginValitor = z.infer<typeof loginValidator>;

export const registerValidator = z.object({
  email: z.string().email(),
});
export type RegisterValidator = z.infer<typeof registerValidator>;

export const verifyEmailValidator = z.object({
  code: z.array(z.string()).length(8),
});
export type VerifyEmailValidator = z.infer<typeof verifyEmailValidator>;
