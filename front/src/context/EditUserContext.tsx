import { createContext, Dispatch, ReactNode, useReducer, useState } from "react";
import { EditUserActionType, reducer } from "../hooks/editUserReducer";
import { User } from "./AuthContext";

export type EditUserCtx = {
  users: User[],
  dispatch: Dispatch<EditUserActionType>,
}

export const EditUserContext = createContext<EditUserCtx>({
  users: [],
  dispatch: () => {}
});

const EditUserProvider = ({ children }: { children: ReactNode }) => {
  const users: User[] = [];
  const [user, setUser] = useState<User | undefined>(undefined);
  const [state, dispatch] = useReducer(reducer, users);
  
  return (
    <AuthContext.Provider value={{ users: state, dispatch }}>
     { children }
    </AuthContext.Provider>
  )
}

export default EditUserProvider;