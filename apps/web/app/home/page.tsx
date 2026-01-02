"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const instructors = [
  { id: 1, name: "Lucas Ribeiro", rating: "4,8", lessons: 120, avatar: "/avatar1.svg", city: "São Paulo", coords: { lat: -23.55052, lon: -46.633308 } },
  { id: 2, name: "Maria Sousa", rating: "4,6", lessons: 112, avatar: "/avatar2.svg", city: "Rio de Janeiro", coords: { lat: -22.906847, lon: -43.172897 } },
  { id: 3, name: "João Silva", rating: "4,7", lessons: 98, avatar: "/avatar3.svg", city: "Belo Horizonte", coords: { lat: -19.916681, lon: -43.934493 } },
  { id: 4, name: "Letícia Lima", rating: "4,8", lessons: 85, avatar: "/avatar4.svg", city: "Curitiba", coords: { lat: -25.428954, lon: -49.27328 } },
];

export default function HomePage() {
  const [city, setCity] = useState("Todas as cidades");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const steps = [
    { title: "Comece por aqui", slug: "comece-por-aqui" },
    { title: "Abertura do processo", slug: "abertura-do-processo" },
    { title: "Curso teórico", slug: "curso-teorico" },
    { title: "Coleta biométrica", slug: "coleta-biometrica" },
    { title: "Exame aptidão física/mental", slug: "exame-aptidao-1" },
    { title: "Exame aptidão física/mental", slug: "exame-aptidao-2" },
    { title: "Aulas práticas", slug: "aulas-praticas" },
    { title: "Exame teórico", slug: "exame-teorico" },
    { title: "Prova de direção", slug: "prova-direcao" },
    { title: "Permissão e CNH definitiva", slug: "permissao-cnh-definitiva" },
  ];

  useEffect(() => {
    const load = () => {
      const stored = window.localStorage.getItem("completedJourneySteps");
      if (!stored) {
        setCompletedSteps([]);
        return;
      }
      try {
        setCompletedSteps(JSON.parse(stored));
      } catch {
        setCompletedSteps([]);
      }
    };
    load();
    const handler = (event: StorageEvent) => {
      if (event.key === "completedJourneySteps") {
        load();
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  useEffect(() => {
    const nextIdx = steps.findIndex((step) => !completedSteps.includes(step.slug));
    setActiveStep(nextIdx === -1 ? steps.length - 1 : nextIdx);
  }, [completedSteps, steps.length]);
  
  return (
    <main className={styles.page}>
      <header className={styles.heroHeader}>
        <div>
          <p className={styles.greeting}>Olá, Pedro</p>
          <p className={styles.subGreeting}>Bem-vindo ao seu painel</p>
        </div>
        <button className={styles.avatarButton} aria-label="Perfil">
          <img src="/avatar1.svg" alt="Pedro" />
        </button>
      </header>

      <div className={styles.topBar}>
        <div className={styles.location}>
          <div className={styles.locationLabel}>Endereço</div>
          <button
            type="button"
            className={styles.locationChip}
            onClick={() => setShowAddressModal(true)}
            aria-haspopup="dialog"
            aria-label="Abrir formulário de endereço"
          >
            {city === 'Todas as cidades' ? 'Localização não definida' : city}
            <span className={styles.chev}>▾</span>
          </button>
        </div>
      </div>


      <section className={styles.progressCard} aria-label="Acompanhamento do aluno">
        <div className={styles.progressHeader}>
          <span className={styles.xpLabel}>Acompanhamento</span>
          <Link className={styles.journeyLink} href="/minha-jornada">
            Ver minha jornada
          </Link>
        </div>
        <div
          className={styles.timelineWrap}
          style={{ "--steps-count": steps.length } as React.CSSProperties}
        >
          <div className={styles.progressTimeline}>
            <div className={styles.progressSteps} role="list">
              <div className={styles.progressTrack} aria-hidden>
                <div
                  className={styles.progressFill}
                  style={{ width: `${(activeStep / Math.max(1, steps.length - 1)) * 100}%` }}
                />
              </div>
              {steps.map((step, idx) => {
                const isDone = completedSteps.includes(step.slug);
                const isCurrent = idx === activeStep;
                const status = isDone ? "completo" : isCurrent ? "em andamento" : "previsto";
                return (
                  <button
                    key={step.slug}
                    type="button"
                    className={`${styles.progressStep} ${isDone ? styles.stepDone : ""} ${isCurrent ? styles.stepCurrent : ""}`}
                    aria-current={isCurrent}
                  >
                    <span className={styles.stepDot} aria-hidden>{isDone ? "OK" : idx + 1}</span>
                    <span className={styles.stepLabel}>{step.title}</span>
                    <span className={styles.stepStatus}>{status}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Instrutores Perto de Você</h3>
        </div>
        <div className={styles.grid}>
          {instructors.filter(i => city === "Todas as cidades" || i.city === city).map((ins) => (
            <article className={styles.card} key={ins.id}>
              <div className={styles.cardTop}>
                <div className={styles.cardAvatar} aria-hidden>
                  <img src={ins.avatar} alt={ins.name} />
                </div>
                <div className={styles.cardMeta}>
                  <strong className={styles.name}>{ins.name}</strong>
                  <div className={styles.meta}>
                    <span className={styles.rating}>★ {ins.rating}</span>
                    <span className={styles.lessons}>{ins.lessons} aulas</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardBottom}>
                <Link className={styles.smallBtn} href="/instrutor">Ver Perfil</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* Recompensas e emblemas removidos conforme solicitado */}

      <nav className={styles.bottomNav} aria-label="Navegação inferior">
        <button className={styles.navItem} aria-label="Início">
          <img src="/icons/home.svg" alt="" />
        </button>
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

      {showAddressModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <h4>Digite sua cidade e estado</h4>
            <div className={styles.inputGroup}>
              <label htmlFor="addrCity">Cidade</label>
              <input id="addrCity" value={addressCity} onChange={(e) => setAddressCity(e.target.value)} className={styles.inputField} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="addrState">Estado</label>
              <input id="addrState" value={addressState} onChange={(e) => setAddressState(e.target.value)} className={styles.inputField} />
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.closeBtn} onClick={() => setShowAddressModal(false)}>Cancelar</button>
              <button
                className={styles.applyBtn}
                onClick={() => {
                  const composed = addressCity.trim() ? (addressState.trim() ? `${addressCity.trim()}, ${addressState.trim()}` : addressCity.trim()) : 'Todas as cidades';
                  setCity(composed || 'Todas as cidades');
                  setShowAddressModal(false);
                }}
              >Aplicar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
