import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import useAuthCheck from "../hooks/useAuthCheck";

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  roles: string[],
};

export type AuthCtx = {
  user: User | undefined,
  setUser: Dispatch<User | undefined>,
}

export const AuthContext = createContext<AuthCtx>({
  user: undefined,
  setUser: () => {}
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <AuthContext.Provider value={{
      user, setUser
    }}>
     { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;