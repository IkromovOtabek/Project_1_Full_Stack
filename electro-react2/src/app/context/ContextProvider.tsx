import { ReactNode, useState } from "react";
import { User } from "../../lib/types/user";
import { GlobalContext } from "../hooks/useGlobals";
import {
  migrateLegacyMemberToUser,
  USER_STORAGE,
} from "../../services/UserService";

const readStoredUser = (): User | null => {
  migrateLegacyMemberToUser();
  const raw = localStorage.getItem(USER_STORAGE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(readStoredUser());
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  return (
    <GlobalContext.Provider
      value={{ authUser, setAuthUser, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
