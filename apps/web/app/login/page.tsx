"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de chamada; substituir por integração real de API
    await new Promise((r) => setTimeout(r, 600));
    console.log("login:", { email, password });
    window.localStorage.setItem("accessMode", "authenticated");
    setLoading(false);
    router.push("/home");
  };

  const handleGuestAccess = () => {
    window.localStorage.setItem("accessMode", "guest");
    router.push("/home");
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit} aria-label="form-login">
        <h1 className={styles.title}>Entrar</h1>

        <label className={styles.label} htmlFor="email">E-mail</label>
        <input
          id="email"
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="seu@exemplo.com"
        />

        <label className={styles.label} htmlFor="password">Senha</label>
        <input
          id="password"
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />

        <button className={styles.submit} type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <button className={styles.secondary} type="button" onClick={handleGuestAccess}>
          Acessar sem login
        </button>

        <div className={styles.actions}>
          <a className={styles.link} href="#">Esqueci minha senha</a>
          <Link className={styles.link} href="/cadastro">Criar conta</Link>
        </div>
      </form>
    </div>
  );
}
