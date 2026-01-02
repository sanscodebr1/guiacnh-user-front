"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function PagamentoConfirmadoPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/home" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Pagamento realizado</h1>
        <div className={styles.headerSpacer} />
      </header>

      <section className={styles.successCard}>
        <div className={styles.checkIcon} aria-hidden>✓</div>
        <h2 className={styles.title}>Pagamento concluido!</h2>
        <p className={styles.subtitle}>Aula agendada com sucesso! 🎉</p>
      </section>

      <section className={styles.summaryCard}>
        <h3 className={styles.summaryTitle}>Resumo da Aula</h3>
        <div className={styles.summaryTop}>
          <div className={styles.summaryAvatar} aria-hidden />
          <div>
            <p className={styles.summaryName}>Lucas Ribeiro 👨🏻‍🏫</p>
            <p className={styles.summaryMeta}>Data: 15/03</p>
            <p className={styles.summaryMeta}>Horario: 14:00</p>
            <p className={styles.summaryMeta}>Duracao: 1h</p>
          </div>
        </div>
        <div className={styles.summaryRow}>
          <span>Valor total:</span>
          <strong>R$ 80,00</strong>
        </div>
      </section>

      <section className={styles.infoCard}>
        <p>✅ A aula ja esta na sua agenda 📅</p>
        <p>🔔 Voce recebera um lembrete antes do horario marcado.</p>
      </section>

      <div className={styles.actions}>
        <Link className={styles.secondaryButton} href="/agendamentos">
          Ver minha agenda
        </Link>
        <Link className={styles.primaryButton} href="/minha-jornada">
          Voltar ao progresso
        </Link>
      </div>

      <p className={styles.footerNote}>
        Pagamento processado com sucesso. Confirmacao enviada para seu e-mail.
      </p>
    </main>
  );
}
