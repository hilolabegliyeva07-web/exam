"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setU] = useState("hilola");
  const [password, setP] = useState("begliyevahilola");
  const [err, setErr] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(username, password);
      router.push("/");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Xatolik");
    }
  }

  return (
    <form className="form box" onSubmit={submit}>
      <h2>Kirish</h2>
      <input value={username} onChange={e => setU(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setP(e.target.value)} placeholder="Parol" />
      {err && <p className="err">{err}</p>}
      <button className="btn">Kirish</button>
      <small>Admin: hilola / begliyevahilola</small>
    </form>
  );
}
