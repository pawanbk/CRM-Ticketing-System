import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const authState = localStorage.getItem("authState");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return authState ? JSON.parse(authState) : false;
  });

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
}
