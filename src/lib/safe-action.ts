import { createSafeActionClient } from "next-safe-action";
import { validateRequest } from "./auth";

export const action = createSafeActionClient({
  handleReturnedServerError(e) {
    return e.message;
  },
});

export const authAction = createSafeActionClient({
  async middleware(parsedInput) {
    const { user } = await validateRequest();
    const userId = user?.id;

    if (!userId) {
      throw new Error("Session is not valid!");
    }

    return { userId };
  },
  handleReturnedServerError(e) {
    return e.message;
  },
});
