"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function RemarcarAgendamentoPage() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/agendamentos/1" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Remarcar horario</h1>
        <div className={styles.headerSpacer} />
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Selecione o novo dia</h2>
        <div className={styles.dayRow}>
          {[
            { label: "Seg", day: "18" },
            { label: "Ter", day: "19" },
            { label: "Qua", day: "20", active: true },
            { label: "Sex", day: "22" },
          ].map((item) => (
            <button
              key={item.day}
              type="button"
              className={`${styles.dayChip} ${item.active ? styles.dayActive : ""}`}
            >
              <span>{item.label}</span>
              <strong>{item.day}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Horarios disponiveis</h2>
        <div className={styles.timeRow}>
          {["09:00", "11:00", "15:30"].map((time, idx) => (
            <button
              key={time}
              type="button"
              className={`${styles.timeChip} ${idx === 1 ? styles.timeActive : ""}`}
            >
              {time}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Resumo</h2>
        <div className={styles.row}>
          <span>Instrutor</span>
          <strong>Lucas Ribeiro</strong>
        </div>
        <div className={styles.row}>
          <span>Data</span>
          <strong>20/03</strong>
        </div>
        <div className={styles.row}>
          <span>Horario</span>
          <strong>11:00</strong>
        </div>
      </section>

      <button className={styles.ctaButton} type="button" onClick={() => setShowConfirm(true)}>
        Confirmar remarcacao
      </button>
      <Link className={styles.backHint} href="/agendamentos">
        ← Voltar para agendamentos
      </Link>

      {showConfirm && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalCard}>
            <h3 className={styles.modalTitle}>Remarcacao confirmada</h3>
            <p className={styles.modalText}>
              Seu horario foi atualizado com sucesso.
            </p>
            <button className={styles.modalCta} type="button" onClick={() => { window.location.href = "/agendamentos"; }}>
              Voltar para agendamentos
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
