import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const authdata = localStorage.getItem("authdata");
    if (authdata) {
      const { user, token } = JSON.parse(authdata);
      setAuth({ user, token });
      setLoggedin(true);
    }
  }, []);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loggedin, setLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
}
