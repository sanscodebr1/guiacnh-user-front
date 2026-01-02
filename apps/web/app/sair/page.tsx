"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function SairPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/perfil" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Sair</h1>
        <div className={styles.headerSpacer} />
      </header>

      <section className={styles.card}>
        <h2 className={styles.title}>Deseja sair da sua conta?</h2>
        <p className={styles.text}>
          Você pode entrar novamente a qualquer momento.
        </p>
      </section>

      <Link className={styles.primaryButton} href="/login">
        Confirmar saída
      </Link>
      <Link className={styles.secondaryButton} href="/perfil">
        Cancelar
      </Link>
    </main>
  );
}
