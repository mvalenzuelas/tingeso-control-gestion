import { useContext } from "react";
import { EditUserContext } from "../context/EditUserContext";

const useEditUser = () => {
  return useContext(EditUserContext);
};

export default useEditUser;
