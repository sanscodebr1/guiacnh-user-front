"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const appointments = [
  {
    id: 1,
    title: "Aula prática",
    instructor: "Lucas Ribeiro",
    date: "15/03",
    time: "14:00",
    location: "Av. Paulista, 1578",
    status: "Confirmado",
  },
  {
    id: 2,
    title: "Simulação de prova",
    instructor: "Alberto Silva",
    date: "20/03",
    time: "10:30",
    location: "Zona Sul - SP",
    status: "Agendado",
  },
];

export default function AgendamentosPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/home" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Agendamentos</h1>
        <div className={styles.headerSpacer} />
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Próximos agendamentos</h2>
        <div className={styles.list}>
          {appointments.map((item) => (
            <Link key={item.id} className={styles.card} href={`/agendamentos/${item.id}`}>
              <div className={styles.cardTop}>
                <div>
                  <p className={styles.cardTitle}>{item.title}</p>
                  <p className={styles.cardMeta}>Instrutor: {item.instructor}</p>
                </div>
                <span className={styles.cardStatus}>{item.status}</span>
              </div>
              <div className={styles.cardInfo}>
                <span>{item.date}</span>
                <span>{item.time}</span>
                <span>{item.location}</span>
              </div>
              <div className={styles.cardActions}>
                <Link className={styles.chatButton} href="/chat">Falar no chat</Link>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Link className={styles.ctaButton} href="/home">
        Voltar para Home
      </Link>
    </main>
  );
}
