import { createContext, useContext } from "react";
import { User } from "../../lib/types/user";

interface GLobalInterface {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;
}

export const GlobalContext = createContext<GLobalInterface | undefined>(
  undefined,
);

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("useGlobals withit Provider");
  return context;
};
