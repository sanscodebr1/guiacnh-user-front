"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function CadastroPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/login" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Criar conta</h1>
        <div className={styles.headerSpacer} />
      </header>

      <section className={styles.card}>
        <h2 className={styles.title}>Escolha seu perfil</h2>
        <p className={styles.subtitle}>
          Selecione o tipo de conta para continuar o cadastro.
        </p>
        <Link className={styles.primaryButton} href="/cadastro/aluno">
          Sou aluno
        </Link>
        <Link className={styles.secondaryButton} href="/cadastro/instrutor">
          Sou instrutor
        </Link>
      </section>
    </main>
  );
}
