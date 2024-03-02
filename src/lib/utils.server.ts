import { headers } from "next/headers";
import { ratelimiter } from "./rate-limiting";

export const useRateLimiting = async (identifier?: string) => {
  const headerList = headers();
  const ip = headerList.get("x-real-ip") ?? "127.0.0.1";
  const allowed = await ratelimiter.limit(identifier ?? ip);
  if (!allowed.success) {
    throw new Error("Too many requests");
  }
};
