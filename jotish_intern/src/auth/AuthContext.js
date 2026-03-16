import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = (username, password) => {
    if (username === "testuser" && password === "Test123") {
      const userData = { username };
      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};