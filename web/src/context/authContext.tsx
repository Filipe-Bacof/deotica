import { ReactNode, createContext, useContext } from "react";

const AuthContext = createContext<undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>
  );
}
