"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";

const stepOrder = [
  "comece-por-aqui",
  "abertura-do-processo",
  "curso-teorico",
  "coleta-biometrica",
  "exame-aptidao-1",
  "exame-aptidao-2",
  "aulas-praticas",
  "exame-teorico",
  "prova-direcao",
  "permissao-cnh-definitiva",
];

const stepContent = [
  {
    slug: "comece-por-aqui",
    title: "Comece por aqui",
    intro: "Bem-vindo! Aqui voce encontra tudo o que precisa para dar o primeiro passo na sua habilitacao.",
    videoUrl: "/videos/comece-por-aqui.mp4",
    lead: "",
    stepsDetailed: [
      {
        title: "Separe seus documentos pessoais",
        detail: "Tenha em mãos RG, CPF e comprovante de residência atualizado.",
      },
      {
        title: "Crie ou acesse sua conta gov.br",
        detail: "Ela será usada para iniciar o processo e acompanhar as etapas.",
      },
      {
        title: "Escolha o CFC de sua preferência",
        detail: "Verifique horários, localização e avaliações antes de decidir.",
      },
      {
        title: "Defina a categoria da CNH",
        detail: "Carro (B), moto (A) ou ambas (AB).",
      },
      {
        title: "Pronto para começar",
        detail: "Clique em Concluir para avançar para a abertura do processo.",
      },
    ],
  },
  {
    slug: "abertura-do-processo",
    title: "Abertura do processo",
    intro: "Este é o primeiro passo para realizar a abertura da sua CNH.",
    videoUrl: "/videos/abertura-processo.mp4",
    lead: "Baixe o aplicativo CNH Digital (CNH do Brasil) na Google Play ou App Store.",
    stepsDetailed: [
      {
        text: "Abra o aplicativo e faça login com sua conta gov.br.",
      },
      {
        text: "O sistema identifica automaticamente quem ainda não tem CNH.",
      },
      {
        text: "Na área “Condutor”, toque em “Requerimento da Primeira Habilitação”.",
      },
      {
        text: "Confira seus dados pessoais, que já vêm preenchidos pela conta gov.br, e confirme.",
      },
      {
        text: "Escolha:",
        subitems: [
          "A categoria da CNH (carro, moto ou ambos).",
          "O estado (UF) onde fará os exames e emitirá a habilitação.",
        ],
      },
    ],
    outro: "Pronto! O processo estará aberto.",
  },
  {
    slug: "biometria",
    title: "Biometria",
    intro: "Hora de registrar sua biometria para seguir com o processo.",
    videoUrl: "/videos/biometria.mp4",
    steps: [
      "Agende sua coleta biométrica.",
      "Leve documento original com foto.",
      "Confirme a coleta no sistema do CFC.",
    ],
  },
  {
    slug: "coleta-biometrica",
    title: "Coleta biométrica",
    intro: "Este é o primeiro passo para realizar a abertura da sua CNH",
    videoUrl: "/videos/biometria.mp4",
    lead: "Como agendar exame médico e coleta biométrica no DETRAN",
    stepsDetailed: [
      {
        title: "Acesse o site ou aplicativo do DETRAN do seu estado.",
      },
      {
        title: "Faça o agendamento online do exame médico e da biometria.",
      },
      {
        title: "Escolha a data, horário e local disponíveis.",
      },
      {
        title: "No dia agendado, vá ao local indicado levando:",
        subitems: [
          "RG",
          "CPF",
          "Comprovante de residência",
        ],
      },
      {
        title: "No local, será feita a foto da CNH, a coleta de digitais e a assinatura.",
      },
      {
        title: "Para a foto:",
        subitems: [
          "Use roupa escura",
          "Não use óculos, chapéu ou boné",
        ],
      },
      {
        title: "Pronto! Após isso, o DETRAN continuará o processo da sua CNH.",
      },
    ],
  },
  {
    slug: "exame-aptidao-1",
    title: "Exame aptidão física/mental",
    intro: "Avaliação obrigatória para seguir com o processo.",
    videoUrl: "/videos/exame-medico.mp4",
    steps: [
      "Agende o exame em clínica credenciada.",
      "Leve documento oficial com foto.",
      "Finalize o exame e aguarde o resultado.",
    ],
  },
  {
    slug: "exame-aptidao-2",
    title: "Exame aptidão física/mental",
    intro: "Confirmação da aptidão para dirigir.",
    videoUrl: "/videos/avaliacao-psicologica.mp4",
    steps: [
      "Realize a avaliação psicológica.",
      "Siga as orientações do profissional.",
      "Confirme o resultado no sistema.",
    ],
  },
  {
    slug: "prova-direcao",
    title: "Prova de direção",
    intro: "Prepare-se para a etapa final prática.",
    videoUrl: "/videos/prova-pratica.mp4",
    steps: [
      "Confirme o horário do exame prático.",
      "Chegue com antecedência ao local.",
      "Siga as orientações do examinador.",
    ],
  },
  {
    slug: "permissao-cnh-definitiva",
    title: "Permissão e CNH definitiva",
    intro: "Etapa final para receber sua habilitação.",
    videoUrl: "/videos/cnh-definitiva.mp4",
    steps: [
      "Aguarde a emissão da PPD.",
      "Cumprido o período, solicite a CNH definitiva.",
      "Retire o documento no local indicado.",
    ],
  },
  {
    slug: "exame-medico",
    title: "Exame médico",
    intro: "Verifique sua aptidão física em clínica credenciada.",
    videoUrl: "/videos/exame-medico.mp4",
    steps: [
      "Agende a consulta em clínica credenciada.",
      "Leve documentos e, se usa óculos, leve-os.",
      "Guarde o laudo após a aprovação.",
    ],
  },
  {
    slug: "avaliacao-psicologica",
    title: "Avaliação psicológica",
    intro: "Etapa obrigatória para avaliar sua aptidão psicológica.",
    videoUrl: "/videos/avaliacao-psicologica.mp4",
    steps: [
      "Realize o teste com psicólogo credenciado.",
      "Finalize as etapas presenciais.",
      "Valide o resultado com o CFC.",
    ],
  },
  {
    slug: "curso-teorico",
    title: "Curso teórico",
    intro: "Este é o primeiro passo para realizar a abertura da sua CNH.",
    videoUrl: "/videos/curso-teorico.mp4",
    lead: "Curso teórico gratuito – Passo a passo",
    stepsDetailed: [
      {
        title: "Entre no aplicativo CNH Brasil",
        detail: "Acesse o app CNH Brasil com sua conta gov.br, após abrir o processo da primeira habilitação.",
      },
      {
        title: "Inicie o curso teórico gratuito",
        detail: "O curso teórico já estará disponível no aplicativo e não tem custo.",
      },
      {
        title: "Realize o curso pelo aplicativo",
        detail: "O curso é 100% online e pode ser feito no seu próprio ritmo.",
      },
      {
        title: "Conclua todas as aulas",
        detail: "É necessário finalizar todo o conteúdo para concluir esta etapa.",
      },
      {
        title: "Certificado automático",
        detail: "Ao finalizar o curso, o certificado é emitido automaticamente pelo sistema, sem necessidade de solicitação.",
      },
    ],
  },
  {
    slug: "prova-teorica",
    title: "Prova teórica",
    intro: "Agende e realize a prova teórica no Detran.",
    videoUrl: "/videos/prova-teorica.mp4",
    steps: [
      "Agende a prova no Detran.",
      "Chegue com antecedência.",
      "Guarde o comprovante de aprovação.",
    ],
  },
  {
    slug: "exame-teorico",
    title: "Exame teórico",
    intro: "Este é o passo-a-passo para realizar o seu exame teórico",
    videoUrl: "/videos/prova-teorica.mp4",
    stepsDetailed: [
      {
        title: "Primeiro, conclua a formação exigida pelo Detran.",
      },
      {
        title: "Em seguida, acesse o sistema do Detran e agende o exame teórico.",
      },
      {
        title: "Importante: A prova contém 30 questões de múltipla escolha, e é necessário acertar pelo menos 20 para ser aprovado.",
      },
      {
        title: "Após a realização da prova, o aplicativo atualizará automaticamente o status assim que o resultado for liberado.",
      },
    ],
  },
  {
    slug: "aulas-praticas",
    title: "Aulas práticas",
    intro: "Hora de dirigir e evoluir com seu instrutor.",
    videoUrl: "/videos/aulas-praticas.mp4",
    steps: [
      "Defina o calendário de aulas.",
      "Pratique manobras e direção defensiva.",
      "Anote pontos de melhoria com o instrutor.",
    ],
  },
  {
    slug: "curso-pratico-direcao",
    title: "Curso prático de direção",
    intro: "Obá! Chegou a hora de pegar no volante!",
    videoUrl: "/videos/aulas-praticas.mp4",
    stepsDetailed: [
      {
        title: "Acesse a nossa área de INSTRUTORES CERTIFICADOS e escolha o que melhor se encaixa com o seu perfil.",
      },
      {
        title: "Faça o agendamento e o pagamento de sua hora/aula.",
      },
      {
        title: "PRONTO! Encontre com o seu instrutor e realize as suas horas obrigatórias.",
      },
    ],
  },
  {
    slug: "prova-pratica",
    title: "Prova prática",
    intro: "O momento de demonstrar tudo o que você aprendeu.",
    videoUrl: "/videos/prova-pratica.mp4",
    steps: [
      "Confirme documentação do veículo.",
      "Faça um simulado com o instrutor.",
      "Leve documento com foto no dia.",
    ],
  },
  {
    slug: "permissao-ppd",
    title: "Permissão para dirigir (PPD)",
    intro: "Receba sua permissão e siga as regras do período probatório.",
    videoUrl: "/videos/ppd.mp4",
    steps: [
      "Aguarde a emissão da PPD.",
      "Retire a permissão no local indicado.",
      "Mantenha a PPD sempre com você.",
    ],
  },
  {
    slug: "cnh-definitiva",
    title: "CNH definitiva",
    intro: "Ao fim do período, solicite sua CNH definitiva.",
    videoUrl: "/videos/cnh-definitiva.mp4",
    steps: [
      "Após o período da PPD, solicite a CNH.",
      "Atualize seus dados se necessário.",
      "Retire a CNH definitiva no Detran.",
    ],
  },
];

export default function MinhaJornadaStepPage() {
  const router = useRouter();
  const params = useParams();
  const step = Array.isArray(params?.step) ? params.step[0] : params?.step;
  const content = stepContent.find((item) => item.slug === step);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("completedJourneySteps");
    if (!stored) return;
    try {
      setCompletedSteps(JSON.parse(stored));
    } catch {
      setCompletedSteps([]);
    }
  }, []);

  if (!content) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <Link className={styles.backLink} href="/minha-jornada" aria-label="Voltar">
            ←
          </Link>
          <div>
            <h1 className={styles.title}>Etapa nao encontrada</h1>
            <p className={styles.subtitle}>Verifique o link e tente novamente.</p>
          </div>
        </header>
      </main>
    );
  }

  const currentIndex = stepOrder.indexOf(content.slug);
  const prevSlug = currentIndex > 0 ? stepOrder[currentIndex - 1] : "";
  const isPrevDone = !prevSlug || completedSteps.includes(prevSlug);

  const handleFinish = () => {
    const stored = window.localStorage.getItem("completedJourneySteps");
    const list = stored ? JSON.parse(stored) : [];
    if (!list.includes(content.slug)) {
      list.push(content.slug);
      window.localStorage.setItem("completedJourneySteps", JSON.stringify(list));
    }
    router.push("/minha-jornada");
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/minha-jornada" aria-label="Voltar">
          ←
        </Link>
        <div>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.intro}</p>
        </div>
      </header>

      <section className={styles.videoCard} aria-label="Vídeo tutorial">
        <div className={styles.videoFrame}>
          <div className={styles.playButton} aria-hidden />
        </div>
        {content.slug !== "comece-por-aqui" ? (
          <p className={styles.videoLabel}>{content.title}</p>
        ) : (
          <p className={styles.videoLabel}>Assista ao video para entender como iniciar sua jornada.</p>
        )}
      </section>

      <section className={styles.stepsCard} aria-label="Passo a passo">
        {content.slug === "comece-por-aqui" ? (
          <p className={styles.lead}>
            Assista ao video para entender como iniciar sua jornada.
            Vamos explicar cada etapa e o que preparar antes de comecar.
            Estamos aqui para ajudar voce do comeco ao fim.
          </p>
        ) : (
          <>
            {content.lead && <p className={styles.lead}>{content.lead}</p>}
            {content.stepsDetailed ? (
              <ol className={styles.stepsList}>
                {content.stepsDetailed.map((item, idx) => (
                  <li key={`${item.text || item.title}-${idx}`} className={styles.stepItem}>
                    <span className={styles.stepIndex} aria-hidden>{idx + 1}</span>
                    <span className={styles.stepText}>
                      {item.title && <span className={styles.stepTitle}>{item.title}</span>}
                      {item.text && <span className={styles.stepLine}>{item.text}</span>}
                      {item.detail && <span className={styles.stepDesc}>{item.detail}</span>}
                      {item.subitems && (
                        <ul className={styles.subList}>
                          {item.subitems.map((sub) => (
                            <li key={sub} className={styles.subItem}>{sub}</li>
                          ))}
                        </ul>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className={styles.stepsList}>
                {content.steps.map((item, idx) => (
                  <li key={item} className={styles.stepItem}>
                    <span className={styles.stepIndex} aria-hidden>{idx + 1}</span>
                    <span className={styles.stepText}>{item}</span>
                  </li>
                ))}
              </ol>
            )}
            {content.outro && <p className={styles.outro}>{content.outro}</p>}
          </>
        )}
      </section>

      <button
        className={styles.finishButton}
        type="button"
        onClick={handleFinish}
        disabled={!isPrevDone}
      >
        Concluir
      </button>
    </main>
  );
}
