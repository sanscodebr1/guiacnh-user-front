"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function CadastroAlunoPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const passwordsMismatch = confirm.length > 0 && password !== confirm;
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordsMismatch) return;
    window.localStorage.setItem("accessMode", "authenticated");
    router.push("/home");
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/cadastro" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Cadastro aluno</h1>
        <div className={styles.headerSpacer} />
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome</label>
          <input id="nome" placeholder="Digite seu nome" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="sobrenome">Sobrenome</label>
          <input id="sobrenome" placeholder="Digite seu sobrenome" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="nascimento">Data de nascimento</label>
          <input id="nascimento" type="date" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="seu@exemplo.com" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="telefone">Telefone</label>
          <input id="telefone" placeholder="(11) 99999-0000" />
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="cidade">Cidade</label>
            <input id="cidade" placeholder="Cidade" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="estado">Estado</label>
            <input id="estado" placeholder="UF" />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Crie uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={passwordsMismatch}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirmar">Confirmar senha</label>
          <input
            id="confirmar"
            type="password"
            placeholder="Repita a senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-invalid={passwordsMismatch}
          />
          {passwordsMismatch && (
            <span className={styles.errorText}>As senhas nao conferem.</span>
          )}
        </div>
        <label className={styles.checkbox}>
          <input type="checkbox" />
          <span>Li e aceito os termos de uso</span>
        </label>
        <button className={styles.ctaButton} type="submit" disabled={passwordsMismatch}>
          Criar conta
        </button>
      </form>
    </main>
  );
}
