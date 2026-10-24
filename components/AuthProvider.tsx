"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthUser, User } from "@/types";

interface AuthContextType {
  user: AuthUser | null;
  ready: boolean;
  login: (username: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

const Ctx = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("user");
    if (s) setUser(JSON.parse(s) as AuthUser);
    setReady(true);
  }, []);

  async function login(username: string, password: string): Promise<AuthUser> {
    const r = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.message || "Login xato");
    const full: User = await (await fetch(`https://dummyjson.com/users/${d.id}`)).json();
    const u: AuthUser = { ...full, token: d.accessToken };
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
    return u;
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return <Ctx.Provider value={{ user, ready, login, logout }}>{children}</Ctx.Provider>;
}
