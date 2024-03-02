"use client";

import { validateRequest } from "@/lib/auth";
import { PropsWithChildren, createContext, useContext } from "react";

type ContextType = Awaited<ReturnType<typeof validateRequest>>;

export const SessionContext = createContext<ContextType>({
  session: null,
  user: null,
});

export const SessionProvider = ({
  children,
  session,
}: PropsWithChildren<{ session: ContextType }>) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
