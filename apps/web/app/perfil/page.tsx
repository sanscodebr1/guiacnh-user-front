"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function PerfilPage() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/home" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Meu perfil</h1>
        <div className={styles.headerSpacer} />
      </header>

      <section className={styles.profileCard}>
        <div className={styles.avatar} aria-hidden />
        <h2 className={styles.name}>Pedro Santos</h2>
        <p className={styles.meta}>pedro@email.com · (11) 99999-0000</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Dados pessoais</h3>
        <div className={styles.row}>
          <span>CPF</span>
          <strong>***.***.***-**</strong>
        </div>
        <div className={styles.row}>
          <span>Cidade</span>
          <strong>Sao Paulo - SP</strong>
        </div>
        <div className={styles.row}>
          <span>Categoria</span>
          <strong>AB</strong>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Preferencias</h3>
        <div className={styles.row}>
          <span>Notificacoes</span>
          <strong>Ativas</strong>
        </div>
        <div className={styles.row}>
          <span>Localizacao</span>
          <strong>Zona Sul</strong>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Seguranca</h3>
        <button className={styles.outlineButton} type="button" onClick={() => setShowPasswordModal(true)}>
          Alterar senha
        </button>
        <Link className={styles.outlineButton} href="/sair">Sair</Link>
      </section>

      {showPasswordModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalCard}>
            <h3 className={styles.modalTitle}>Alterar senha</h3>
            <p className={styles.modalText}>Informe sua senha atual e defina uma nova.</p>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="currentPass">Senha atual</label>
              <input id="currentPass" className={styles.input} type="password" placeholder="Digite sua senha" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="newPass">Nova senha</label>
              <input id="newPass" className={styles.input} type="password" placeholder="Nova senha" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="confirmPass">Confirmar nova senha</label>
              <input id="confirmPass" className={styles.input} type="password" placeholder="Repita a nova senha" />
            </div>
            <button className={styles.modalCta} type="button">Salvar nova senha</button>
            <button className={styles.modalSecondary} type="button" onClick={() => setShowPasswordModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
