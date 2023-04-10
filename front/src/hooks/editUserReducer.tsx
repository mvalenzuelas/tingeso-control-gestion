import { User } from "../context/AuthContext";

export type EditUserActionType = { type: 'editRole', payload: { userId: number, add: boolean, roleName: string }} 
| { type: '', payload: {} };

export function reducer(state: User[], action: EditUserActionType) {
  switch (action.type) {
    case 'editRole': {
      const { userId, add, roleName } = action.payload;
      const users = [...state];
      const idx = state.map(u => u.id).indexOf(userId);
      const user = users[idx];

      if (add) {
        user.roles.push(roleName);
      } else {
        user.roles.filter(role => role !== roleName);
      }

      return users;

    }
    
    default:
      return state;
  }
}