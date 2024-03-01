import { SessionContext } from "@/components/auth/SessionProvider";
import React, { useContext } from "react";

export const useCurrentUser = () => {
  const { user } = useContext(SessionContext);
  return { user };
};
