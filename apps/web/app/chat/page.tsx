"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function ChatPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/agendamentos" aria-label="Voltar">
          ←
        </Link>
        <div className={styles.headerInfo}>
          <h1 className={styles.headerTitle}>Chat com instrutor</h1>
          <p className={styles.headerSubtitle}>Lucas Ribeiro · Online</p>
        </div>
        <button className={styles.menuButton} aria-label="Menu">≡</button>
      </header>

      <section className={styles.messages}>
        <div className={styles.messageLeft}>
          <div className={styles.bubble}>
            Olá! Podemos confirmar o local da aula?
          </div>
          <span className={styles.time}>09:10</span>
        </div>
        <div className={styles.messageRight}>
          <div className={styles.bubble}>
            Claro! Podemos nos encontrar na Av. Paulista, 1578.
          </div>
          <span className={styles.time}>09:12</span>
        </div>
        <div className={styles.messageLeft}>
          <div className={styles.bubble}>
            Perfeito. Chego 10 minutos antes.
          </div>
          <span className={styles.time}>09:13</span>
        </div>
      </section>

      <form className={styles.inputBar}>
        <input
          className={styles.input}
          placeholder="Digite sua mensagem"
          aria-label="Mensagem"
        />
        <button className={styles.sendButton} type="button">Enviar</button>
      </form>
    </main>
  );
}
