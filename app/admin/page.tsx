"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Product, User } from "@/types";

type Tab = "users" | "products";

export default function Admin() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("users");
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (ready && (!user || user.role !== "admin")) router.push("/");
  }, [ready, user, router]);

  useEffect(() => {
    if (user?.role !== "admin") return;
    fetch("https://dummyjson.com/users?limit=30").then(r => r.json()).then((d: { users: User[] }) => setUsers(d.users));
    fetch("https://dummyjson.com/products?limit=30").then(r => r.json()).then((d: { products: Product[] }) => setProducts(d.products));
  }, [user]);

  if (user?.role !== "admin") return null;
  return (
    <>
      <h1>Admin panel</h1>
      <div className="chips">
        <button className={`chip ${tab === "users" ? "active" : ""}`} onClick={() => setTab("users")}>Barcha userlar ({users.length})</button>
        <button className={`chip ${tab === "products" ? "active" : ""}`} onClick={() => setTab("products")}>Barcha productlar ({products.length})</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        {tab === "users" ? (
          <table>
            <thead><tr><th></th><th>Ism</th><th>Username</th><th>Email</th><th>Rol</th></tr></thead>
            <tbody>{users.map(u => (
              <tr key={u.id}><td><img src={u.image} alt="" /></td><td>{u.firstName} {u.lastName}</td><td>{u.username}</td><td>{u.email}</td><td>{u.role}</td></tr>
            ))}</tbody>
          </table>
        ) : (
          <table>
            <thead><tr><th></th><th>Nomi</th><th>Kategoriya</th><th>Narx</th><th>Ombor</th></tr></thead>
            <tbody>{products.map(p => (
              <tr key={p.id}><td><img src={p.thumbnail} alt="" /></td><td>{p.title}</td><td>{p.category}</td><td>${p.price}</td><td>{p.stock}</td></tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </>
  );
}
