"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [p, setP] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`).then(r => r.json()).then((d: Product) => setP(d));
  }, [id]);

  if (!p) return <p>Yuklanmoqda...</p>;
  return (
    <>
      <button className="btn ghost" onClick={() => router.back()}>← Orqaga</button>
      <div className="box detail" style={{ marginTop: 16 }}>
        <img src={p.images?.[0] || p.thumbnail} alt={p.title} style={{ width: "100%", background: "#f3f4f6", borderRadius: 12 }} />
        <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
          <span className="chip" style={{ width: "fit-content" }}>{p.category}</span>
          <h1>{p.title}</h1>
          <p>{p.description}</p>
          <p className="price" style={{ fontSize: 28 }}>${p.price}</p>
          <p>⭐ {p.rating} · Omborda: {p.stock} · Brend: {p.brand || "—"}</p>
          <button className="btn" style={{ width: "fit-content" }}>Savatga qo'shish</button>
        </div>
      </div>
    </>
  );
}
