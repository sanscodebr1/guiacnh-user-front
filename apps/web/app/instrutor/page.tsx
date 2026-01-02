"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function InstrutorPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/home" aria-label="Voltar">
          ←
        </Link>
        <div className={styles.headerTitle}>Perfil instrutor</div>
        <button className={styles.menuButton} aria-label="Menu">≡</button>
      </header>

      <section className={styles.profileCard}>
        <div className={styles.avatar} aria-hidden />
        <h1 className={styles.name}>Alberto Silva</h1>
        <p className={styles.meta}>Jundiaí - SP</p>
        <div className={styles.rating}>
          <span aria-hidden>☆</span>
          <span>4,9 (45 avaliações)</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaPill}>8 anos de experiência</span>
          <span className={styles.metaPill}>Instrutor certificado</span>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sobre o instrutor</h2>
        <p className={styles.sectionText}>
          Instrutor com 8 anos de experiência em aulas práticas de direção, especializado em iniciantes e preparação
          para exames do Detran. Método paciente e personalizado.
        </p>
        <h3 className={styles.sectionSubtitle}>Experiência</h3>
        <ul className={styles.list}>
          <li>8 anos de aulas práticas</li>
          <li>Alunos iniciantes e renovação de habilitação</li>
          <li>Certificado de Instrutor de Trânsito</li>
        </ul>
      </section>

      <section className={styles.infoGrid}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Disponibilidade</h2>
          <p className={styles.sectionText}>Seg - Sex, 8h - 18h</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Preço</h2>
          <p className={styles.sectionText}>R$ 80/hora | Pacote de 10 aulas: R$ 750</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Local de Atendimento</h2>
          <p className={styles.sectionText}>Zona Sul de São Paulo (flexível a domicílio ou autoescola parceira)</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Avaliações</h2>
        <div className={styles.reviews}>
          <article className={styles.reviewCard}>
            <div className={styles.reviewTop}>
              <span className={styles.reviewName}>Ana M.</span>
              <span className={styles.reviewStars} aria-label="5 estrelas">★★★★★</span>
            </div>
            <p className={styles.reviewText}>“Excelente instrutor, muito paciente!”</p>
          </article>
          <article className={styles.reviewCard}>
            <div className={styles.reviewTop}>
              <span className={styles.reviewName}>Carlos P.</span>
              <span className={styles.reviewStars} aria-label="5 estrelas">★★★★★</span>
            </div>
            <p className={styles.reviewText}>“Recomendo, me ajudou a passar no exame.”</p>
          </article>
        </div>
      </section>

      <Link className={styles.ctaButton} href="/agendar-aula">Agendar aula</Link>
    </main>
  );
}
