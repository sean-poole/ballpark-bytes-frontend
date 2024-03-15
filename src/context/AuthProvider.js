import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [isTester, setIsTester] = useState(false);

  useEffect(() => {
    if (auth && auth.token && auth.email === "tester@tester.com") {
      setIsTester(true);
    } else {
      setIsTester(false);
    }
  }, [auth]);

  const logout = () => setAuth(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isTester, logout }}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthContext;
