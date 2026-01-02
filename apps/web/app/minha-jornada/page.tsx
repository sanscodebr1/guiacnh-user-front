"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import {
  BadgeCheck,
  BookOpen,
  Brain,
  Car,
  ClipboardCheck,
  FileText,
  Fingerprint,
  Sparkles,
  Stethoscope,
  CarFront,
} from "lucide-react";

const steps = [
  { title: "Comece por aqui", slug: "comece-por-aqui", icon: Sparkles },
  { title: "Abertura do processo", slug: "abertura-do-processo", icon: FileText },
  { title: "Curso teórico", slug: "curso-teorico", icon: BookOpen },
  { title: "Coleta biométrica", slug: "coleta-biometrica", icon: Fingerprint },
  { title: "Exame aptidão física/mental", slug: "exame-aptidao-1", icon: Stethoscope },
  { title: "Exame aptidão física/mental", slug: "exame-aptidao-2", icon: Brain },
  { title: "Aulas práticas", slug: "aulas-praticas", icon: CarFront },
  { title: "Exame teórico", slug: "exame-teorico", icon: ClipboardCheck },
  { title: "Prova de direção", slug: "prova-direcao", icon: Car },
  { title: "Permissão e CNH definitiva", slug: "permissao-cnh-definitiva", icon: BadgeCheck },
];

export default function MinhaJornadaPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("completedJourneySteps");
    if (stored) {
      try {
        setCompletedSteps(JSON.parse(stored));
      } catch {
        setCompletedSteps([]);
      }
    }
  }, []);

  useEffect(() => {
    const nextIdx = steps.findIndex((step) => !completedSteps.includes(step.slug));
    setActiveStep(nextIdx === -1 ? steps.length - 1 : nextIdx);
  }, [completedSteps]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/home" aria-label="Voltar">
          ←
        </Link>
        <div>
          <p className={styles.eyebrow}>Minha jornada</p>
          <h1 className={styles.title}>Olá, Pedro!</h1>
        </div>
      </header>

      <section className={styles.progressCard} aria-label="Progresso da jornada">
        <div className={styles.progressTop}>
          <span className={styles.progressLabel}>Progresso geral</span>
          <span className={styles.progressValue}>{activeStep + 1} de {steps.length} etapas</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(activeStep / Math.max(1, steps.length - 1)) * 100}%` }}
          />
          <div className={styles.progressPin}>
            <span className={styles.pinLabel}>Próxima etapa</span>
          </div>
        </div>
      </section>

      <section className={styles.timelineCard} aria-label="Linha do tempo das etapas">
        <ol className={styles.timeline} role="list">
          {steps.map((step, idx) => {
            const isDone = completedSteps.includes(step.slug);
            const isCurrent = idx === activeStep;
            const status = isDone ? "Concluída" : isCurrent ? "Em andamento" : "Pendente";
            const Icon = step.icon;
            return (
              <li
                key={step.slug}
                className={`${styles.timelineItem} ${isDone ? styles.itemDone : ""} ${isCurrent ? styles.itemCurrent : ""}`}
              >
                <Link
                  className={styles.itemButton}
                  href={`/minha-jornada/${step.slug}`}
                  onClick={() => setActiveStep(idx)}
                  aria-current={isCurrent}
                >
                  <span className={styles.iconWrap} aria-hidden>
                  <span className={styles.stepBadge}>
                      {isDone ? <span className={styles.checkMark}>✓</span> : <Icon className={styles.stepIcon} strokeWidth={2} />}
                    </span>
                  </span>
                  <span className={styles.itemBody}>
                    <span className={styles.itemTitle}>{step.title}</span>
                    <span className={styles.itemStatus}>{status}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className={styles.ctaCard} aria-label="Ação principal">
        <div className={styles.ctaIcon} aria-hidden>⭐</div>
        <div>
          <p className={styles.ctaTitle}>Buscar professor de direção</p>
          <p className={styles.ctaSub}>Agende sua próxima aula prática</p>
        </div>
      </section>

      <nav className={styles.bottomNav} aria-label="Navegação inferior">
        <Link className={styles.navItem} href="/home" aria-label="Início">
          <img src="/icons/home.svg" alt="" />
        </Link>
        <Link className={styles.navItem} href="/minha-jornada" aria-label="Jornada">
          <img src="/icons/road.svg" alt="" />
        </Link>
        <Link className={styles.navItem} href="/agendamentos" aria-label="Agenda">
          <img src="/icons/calendar.svg" alt="" />
        </Link>
        <Link className={styles.navItem} href="/perfil" aria-label="Perfil">
          <img src="/icons/profile.svg" alt="" />
        </Link>
      </nav>
    </main>
  );
}
