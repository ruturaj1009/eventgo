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
    const data = localStorage.getItem("authdata");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loggedin, setLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
}
