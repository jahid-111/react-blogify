import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context/create-context";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.user ? "User Login" : "User Logout"));
  return useContext(AuthContext);
};

export { useAuth };
