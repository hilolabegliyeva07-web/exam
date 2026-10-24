"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Category, Product } from "@/types";

const API = "https://dummyjson.com/products";

export default function Home() {
  const [cats, setCats] = useState<Category[]>([]);
  const [cat, setCat] = useState<string>("all");
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/categories`).then(r => r.json()).then((d: Category[]) => setCats(d));
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = cat === "all" ? `${API}?limit=24` : `${API}/category/${cat}`;
    fetch(url).then(r => r.json()).then((d: { products: Product[] }) => { setItems(d.products); setLoading(false); });
  }, [cat]);

  return (
    <>
      <h1>Mahsulotlar</h1>
      <div className="chips">
        <button className={`chip ${cat === "all" ? "active" : ""}`} onClick={() => setCat("all")}>all</button>
        {cats.slice(0, 14).map(c => (
          <button key={c.slug} className={`chip ${cat === c.slug ? "active" : ""}`} onClick={() => setCat(c.slug)}>{c.name}</button>
        ))}
      </div>
      {loading ? <p>Yuklanmoqda...</p> : (
        <div className="grid">
          {items.map(p => (
            <Link key={p.id} href={`/products/${p.id}`} className="card">
              <img src={p.thumbnail} alt={p.title} />
              <div>
                <p>{p.title}</p>
                <p className="price">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
