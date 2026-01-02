"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function PagamentoPage() {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [showPixModal, setShowPixModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const redirectTimer = useRef<number | null>(null);
  const pixCode = "00020126580014br.gov.bcb.pix0136e9d1f3f3-9f70-4d2f-8a6a-1c2e4b7f99ab520400005303986540580.005802BR5920Lucas Ribeiro6009Sao Paulo62290525PixInstrutor-Agendamento6304ABCD";

  const handlePay = () => {
    if (paymentMethod === "pix") {
      setShowPixModal(true);
    }
  };

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      if (redirectTimer.current) {
        window.clearTimeout(redirectTimer.current);
      }
      redirectTimer.current = window.setTimeout(() => {
        window.location.href = "/pagamento-confirmado";
      }, 5000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/agendar-aula" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Pagamentos</h1>
        <div className={styles.headerSpacer} />
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
        <h2 className={styles.sectionTitle}>Escolha como deseja pagar:</h2>
        <div className={styles.optionGroup}>
          <label className={styles.option}>
            <input
              type="radio"
              name="pagamento"
              checked={paymentMethod === "pix"}
              onChange={() => setPaymentMethod("pix")}
            />
            <span>Pagamento via PIX</span>
            <span className={styles.pixBadge}>PIX</span>
          </label>
          <label className={styles.optionCard}>
            <input
              type="radio"
              name="pagamento"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <span>Cartão de crédito</span>
            <div className={styles.cardForm}>
              <div className={styles.cardRow}>
                <input className={styles.input} placeholder="Número do cartão" />
                <span className={styles.cardBrand}>VISA</span>
              </div>
              <div className={styles.cardRow}>
                <input className={styles.inputSmall} placeholder="Validade" />
                <input className={styles.inputSmall} placeholder="MM/AA" />
                <input className={styles.inputSmall} placeholder="CVV" />
              </div>
              <input className={styles.input} placeholder="Nome do titular" />
            </div>
          </label>
        </div>
      </section>

      <section className={styles.summaryCard}>
        <h3 className={styles.summaryTitle}>Resumo da Aula</h3>
        <div className={styles.summaryTop}>
          <div className={styles.summaryAvatar} aria-hidden />
          <div>
            <p className={styles.summaryName}>Lucas Ribeiro 👨🏻‍🏫</p>
            <p className={styles.summaryMeta}>Data: 15/03 · Horário: 14:00</p>
            <p className={styles.summaryMeta}>Duração: 1h</p>
          </div>
        </div>
        <div className={styles.summaryRow}>
          <span>Valor total:</span>
          <strong>R$ 80,00</strong>
        </div>
      </section>

      <button className={styles.ctaButton} type="button" onClick={handlePay}>
        Pagar R$ 80,00
      </button>
      <p className={styles.ctaHint}>Pagamento seguro · Cancelamento até 12h antes</p>

      {showPixModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalCard}>
            <div className={styles.modalIcon} aria-hidden>📱</div>
            <h3 className={styles.modalTitle}>Pedido aguardando pagamento</h3>
            <p className={styles.modalText}>
              Copie o código abaixo para pagar via Pix em qualquer aplicativo habilitado.
            </p>
            <div className={styles.pixCodeWrap}>
              <code className={styles.pixCode}>{pixCode}</code>
              <button className={styles.copyIcon} onClick={handleCopyPix} aria-label="Copiar código">
                ⧉
              </button>
            </div>
            <p className={styles.modalNote}>
              Você tem até 5 minutos para fazer o pagamento. Após esse tempo, o pedido será cancelado.
            </p>
            <div className={styles.copyRow}>
              <button className={styles.modalCta} onClick={handleCopyPix} type="button">
                Copiar código
              </button>
              {copied && <span className={styles.copyToast}>Código copiado</span>}
            </div>
            <button className={styles.modalSecondary} onClick={() => setShowPixModal(false)} type="button">
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
