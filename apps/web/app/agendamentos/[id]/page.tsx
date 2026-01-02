"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function AgendamentoDetalhePage() {
  const [showCancel, setShowCancel] = useState(false);
  const [selectedReason, setSelectedReason] = useState("Nao poderei comparecer");
  const [cancelStep, setCancelStep] = useState<"select" | "confirm" | "done">("select");
  const [redirecting, setRedirecting] = useState(false);
  const reasonDetails: Record<string, { title: string; message: string }> = {
    "Nao poderei comparecer": {
      title: "Cancelamento por ausencia",
      message: "Sem problemas. Seu agendamento sera cancelado e o valor sera devolvido integralmente.",
    },
    "Problema de horario": {
      title: "Horario indisponivel",
      message: "Cancelamos este horario para voce escolher outro. O valor sera devolvido integralmente.",
    },
    "Outro motivo": {
      title: "Cancelamento solicitado",
      message: "Seu agendamento sera cancelado e o valor sera devolvido integralmente.",
    },
  };

  const handleConfirmCancel = () => {
    setCancelStep("done");
    setRedirecting(true);
    window.setTimeout(() => {
      window.location.href = "/agendamentos";
    }, 3000);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/agendamentos" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Detalhes do agendamento</h1>
        <div className={styles.headerSpacer} />
      </header>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Aula prática</h2>
        <p className={styles.cardMeta}>Status: Confirmado</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Instrutor</h2>
        <div className={styles.row}>
          <span>Nome</span>
          <strong>Lucas Ribeiro</strong>
        </div>
        <div className={styles.row}>
          <span>Contato</span>
          <strong>(11) 99999-1234</strong>
        </div>
        <Link className={styles.chatButton} href="/chat">Falar no chat</Link>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Data e horário</h2>
        <div className={styles.row}>
          <span>Data</span>
          <strong>15/03</strong>
        </div>
        <div className={styles.row}>
          <span>Horário</span>
          <strong>14:00</strong>
        </div>
        <div className={styles.row}>
          <span>Duração</span>
          <strong>1h</strong>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Local</h2>
        <p className={styles.sectionText}>Av. Paulista, 1578 - Bela Vista</p>
        <p className={styles.sectionHint}>Chegue com 10 minutos de antecedência.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Pagamento</h2>
        <div className={styles.row}>
          <span>Valor</span>
          <strong>R$ 80,00</strong>
        </div>
        <div className={styles.row}>
          <span>Método</span>
          <strong>Pix</strong>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Observações</h2>
        <p className={styles.sectionText}>Leve documento com foto e confirme o local com o instrutor.</p>
      </section>

      <button className={styles.ctaButton} type="button" onClick={() => { setShowCancel(true); setCancelStep("select"); }}>
        Cancelar agendamento
      </button>
      <Link className={styles.secondaryCta} href="/remarcar-agendamento/1">
        Remarcar horario
      </Link>

      {showCancel && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalCard}>
            {cancelStep === "select" ? (
              <>
                <h3 className={styles.modalTitle}>Cancelar agendamento</h3>
                <p className={styles.modalText}>
                  Selecione o motivo e avance para confirmar o cancelamento.
                </p>
                <div className={styles.reasonList}>
                  {[
                    "Nao poderei comparecer",
                    "Problema de horario",
                    "Outro motivo",
                  ].map((reason) => (
                    <label key={reason} className={styles.reasonOption}>
                      <input
                        type="radio"
                        name="reason"
                        checked={selectedReason === reason}
                        onChange={() => setSelectedReason(reason)}
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>
                <button className={styles.modalCta} type="button" onClick={() => setCancelStep("confirm")}>
                  Continuar
                </button>
                <button className={styles.modalSecondary} type="button" onClick={() => setShowCancel(false)}>
                  Voltar
                </button>
              </>
            ) : cancelStep === "confirm" ? (
              <>
                <h3 className={styles.modalTitle}>{reasonDetails[selectedReason].title}</h3>
                <p className={styles.modalText}>{reasonDetails[selectedReason].message}</p>
                <div className={styles.refundBox}>
                  <span>Reembolso integral</span>
                  <strong>R$ 80,00</strong>
                </div>
                <button className={styles.modalCta} type="button" onClick={handleConfirmCancel}>
                  Confirmar cancelamento
                </button>
                <button className={styles.modalSecondary} type="button" onClick={() => setCancelStep("select")}>
                  Voltar
                </button>
              </>
            ) : (
              <>
                <h3 className={styles.modalTitle}>Cancelamento confirmado</h3>
                <p className={styles.modalText}>
                  Seu agendamento foi cancelado e o reembolso integral sera processado.
                </p>
                <div className={styles.refundBox}>
                  <span>Reembolso integral</span>
                  <strong>R$ 80,00</strong>
                </div>
                <p className={styles.modalNote}>
                  {redirecting ? "Redirecionando para agendamentos..." : "Voce sera redirecionado em instantes."}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
