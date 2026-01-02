"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function AgendarAulaPage() {
  const [localChoice, setLocalChoice] = useState<"sugerido" | "outro">("sugerido");

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/instrutor" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Agendar aula</h1>
        <button className={styles.menuButton} aria-label="Menu">≡</button>
      </header>

      <section className={styles.instructorCard}>
        <div className={styles.instructorAvatar} aria-hidden />
        <div className={styles.instructorInfo}>
          <p className={styles.instructorName}>Lucas Ribeiro</p>
          <p className={styles.instructorMeta}>4,8 · 120 aulas realizadas</p>
        </div>
        <span className={styles.instructorTag}>Zona Sul</span>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Qual aula voce quer agendar?</h2>
        <div className={styles.optionGroup}>
          {["Aula pratica avulsa", "Pacote 5 aulas", "Simulacao de prova"].map((label, idx) => (
            <label key={label} className={styles.option}>
              <input type="radio" name="tipo" defaultChecked={idx === 0} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Selecione o dia</h2>
        <div className={styles.dayRow}>
          {[
            { label: "Seg", day: "12" },
            { label: "Ter", day: "13" },
            { label: "Qua", day: "14", active: true },
            { label: "Sex", day: "15" },
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
          {["09:00", "10:30", "16:00"].map((time, idx) => (
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
        <h2 className={styles.sectionTitle}>Local da aula</h2>
        <div className={styles.optionGroup}>
          <label className={styles.option}>
            <input
              type="radio"
              name="local"
              checked={localChoice === "sugerido"}
              onChange={() => setLocalChoice("sugerido")}
            />
            <span className={styles.optionLabel}>
              Ponto sugerido pelo instrutor
              <strong className={styles.optionDetail}>Av. Paulista, 1578 - Bela Vista</strong>
            </span>
          </label>
          <label className={styles.option}>
            <input
              type="radio"
              name="local"
              checked={localChoice === "outro"}
              onChange={() => setLocalChoice("outro")}
            />
            <span>Escolher outro local</span>
          </label>
        </div>
        {localChoice === "outro" && (
          <input
            className={styles.addressInput}
            placeholder="Digite o endereco ou marque no mapa"
          />
        )}
      </section>

      <aside className={styles.summaryCard}>
        <h3 className={styles.summaryTitle}>Resumo da aula</h3>
        <div className={styles.summaryRow}>
          <span>Instrutor:</span>
          <strong>Lucas Ribeiro</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Data:</span>
          <strong>15/03</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Horario:</span>
          <strong>14:00</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Duracao:</span>
          <strong>1h</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Local:</span>
          <strong>Zona Sul</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Valor:</span>
          <strong>R$ 80,00</strong>
        </div>
      </aside>

      <Link className={styles.ctaButton} href="/pagamento">Confirmar agendamento</Link>
      <p className={styles.ctaHint}>Pagamento seguro · Cancelamento ate 12h antes</p>
    </main>
  );
}
