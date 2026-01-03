"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const professionals = [
  { id: 1, name: "Camila Alves", rating: "4,9", lessons: 210, area: "Zona Oeste", avatar: "/avatar2.svg" },
  { id: 2, name: "Felipe Costa", rating: "4,7", lessons: 160, area: "Centro", avatar: "/avatar3.svg" },
  { id: 3, name: "Marina Duarte", rating: "4,8", lessons: 190, area: "Zona Sul", avatar: "/avatar4.svg" },
  { id: 4, name: "Lucas Ribeiro", rating: "4,8", lessons: 120, area: "Zona Sul", avatar: "/avatar1.svg" },
  { id: 5, name: "Maria Sousa", rating: "4,6", lessons: 112, area: "Zona Norte", avatar: "/avatar2.svg" },
  { id: 6, name: "Joao Silva", rating: "4,7", lessons: 98, area: "Centro", avatar: "/avatar3.svg" },
];

export default function ProfissionaisPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/agendar-aula" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Profissionais</h1>
        <div className={styles.headerSpacer} />
      </header>

      <p className={styles.subtitle}>
        Escolha um instrutor credenciado da nossa plataforma para suas aulas praticas.
      </p>

      <section className={styles.list} aria-label="Profissionais credenciados">
        {professionals.map((professional) => (
          <article className={styles.card} key={professional.id}>
            <div className={styles.avatar} aria-hidden>
              <img src={professional.avatar} alt={professional.name} />
            </div>
            <div className={styles.cardBody}>
              <p className={styles.name}>{professional.name}</p>
              <p className={styles.meta}>
                ★ {professional.rating} · {professional.lessons} aulas · {professional.area}
              </p>
              <span className={styles.tag}>Credenciado</span>
            </div>
            <Link className={styles.profileButton} href="/instrutor">
              Ver perfil
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
