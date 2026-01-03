"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function CadastroInstrutorPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const passwordsMismatch = confirm.length > 0 && password !== confirm;
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordsMismatch) return;
    window.localStorage.setItem("accessMode", "authenticated");
    router.push("/home");
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="/cadastro" aria-label="Voltar">
          ←
        </Link>
        <h1 className={styles.headerTitle}>Cadastro instrutor</h1>
        <div className={styles.headerSpacer} />
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome completo</label>
          <input id="nome" placeholder="Digite seu nome completo" />
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="cpf">CPF</label>
            <input id="cpf" placeholder="000.000.000-00" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="rg">RG</label>
            <input id="rg" placeholder="00.000.000-0" />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="nascimento">Data de nascimento</label>
          <input id="nascimento" type="date" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="seu@exemplo.com" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="telefone">Telefone</label>
          <input id="telefone" placeholder="(11) 99999-0000" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="endereco">Endereco completo</label>
          <input id="endereco" placeholder="Rua, numero, bairro" />
        </div>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="cidade">Cidade</label>
            <input id="cidade" placeholder="Cidade" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="estado">Estado</label>
            <input id="estado" placeholder="UF" />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="credencial">Credencial de Instrutor / cracha</label>
          <input id="credencial" placeholder="Numero da credencial" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="credencialFile">Upload da credencial</label>
          <input id="credencialFile" className={styles.fileInput} type="file" accept=".pdf,.png,.jpg,.jpeg" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="licenca">Licenca de Aprendizagem Veicular</label>
          <input id="licenca" placeholder="Numero da licenca" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="licencaFile">Upload da licenca</label>
          <input id="licencaFile" className={styles.fileInput} type="file" accept=".pdf,.png,.jpg,.jpeg" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="registro">Certificado de Registro</label>
          <input id="registro" placeholder="Numero do certificado" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="registroFile">Upload do certificado</label>
          <input id="registroFile" className={styles.fileInput} type="file" accept=".pdf,.png,.jpg,.jpeg" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="autoescola">Autoescola (opcional)</label>
          <input id="autoescola" placeholder="Nome da autoescola" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Crie uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={passwordsMismatch}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirmar">Confirmar senha</label>
          <input
            id="confirmar"
            type="password"
            placeholder="Repita a senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-invalid={passwordsMismatch}
          />
          {passwordsMismatch && (
            <span className={styles.errorText}>As senhas nao conferem.</span>
          )}
        </div>
        <label className={styles.checkbox}>
          <input type="checkbox" />
          <span>Li e aceito os termos de uso</span>
        </label>
        <button className={styles.ctaButton} type="submit" disabled={passwordsMismatch}>
          Enviar cadastro
        </button>
      </form>
    </main>
  );
}
