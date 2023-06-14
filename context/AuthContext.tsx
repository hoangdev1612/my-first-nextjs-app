"use client";

import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}
interface Sate {
  loading: boolean;
  data: User | null;
  error: string | null;
}
interface AuthSate extends Sate {
  setAuthState: React.Dispatch<React.SetStateAction<Sate>>;
}

export const AuthenticationContext = React.createContext<AuthSate>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [authSate, setAuthState] = React.useState<Sate>({
    loading: false,
    data: null,
    error: null,
  });
  return (
    <AuthenticationContext.Provider value={{ ...authSate, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
