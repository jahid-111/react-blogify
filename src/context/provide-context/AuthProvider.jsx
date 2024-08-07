/* eslint-disable react/prop-types */

import { useState } from "react";
import { AuthContext } from "../create-context";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
