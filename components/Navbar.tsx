"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <header className="nav">
      <div className="container">
        <Link href="/" className="logo">🛍 NextShop</Link>
        {user ? (
          <>
            {user.role === "admin" && <Link href="/admin">Admin panel</Link>}
            <Link href="/profile">{user.firstName}</Link>
            <button className="btn ghost" onClick={() => { logout(); router.push("/login"); }}>Logout</button>
          </>
        ) : (
          <Link href="/login" className="btn">Login</Link>
        )}
      </div>
    </header>
  );
}
