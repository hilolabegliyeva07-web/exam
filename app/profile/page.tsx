"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Profile() {
  const { user, ready } = useAuth();
  const router = useRouter();

  export default function Profile() {
    const { user, ready } = useAuth();
    const router = useRouter()

  useEffect(() => {
    if (ready && !user) router.push("/login");
  }, [ready, user, router]);

  if (!user) return null;

  const rows: [string, string | number | undefined][] = [
    ["Username", user.username], ["Email", user.email], ["Telefon", user.phone],
    ["Yosh", user.age], ["Shahar", user.address?.city], ["Kompaniya", user.company?.name], ["Rol", user.role],
  ];
  return (
    <div className="box" style={{ maxWidth: 500, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
        <img src={user.image} alt="" width={80} style={{ borderRadius: "50%", background: "#eef" }} />
        <h2>{user.firstName} {user.lastName}</h2>
      </div>
      {rows.map(([k, v]) => (
        <p key={k} style={{ padding: "8px 0", borderTop: "1px solid #eee" }}><b>{k}:</b> {v}</p>
      ))}
    </div>
  );
}
