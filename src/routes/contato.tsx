import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Solicitar Orçamento" },
      {
        name: "description",
        content:
          "Solicite orçamento ou consultoria em engenharia elétrica e desenvolvimento de software.",
      },
    ],
  }),
  component: Contato,
});

function Contato() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="[ 06 ] Contato"
        title="Vamos construir algo sólido?"
        description="Disponível para consultoria, projetos elétricos e desenvolvimento de software técnico."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <div className="mb-1 font-mono-tech text-[10px] uppercase tracking-widest text-brand">
                E-mail
              </div>
              <a
                href="mailto:contato@seudominio.com"
                className="text-lg text-foreground transition-colors hover:text-brand"
              >
                contato@seudominio.com
              </a>
            </div>
            <div>
              <div className="mb-1 font-mono-tech text-[10px] uppercase tracking-widest text-brand">
                Localização
              </div>
              <div className="text-lg text-foreground">São Paulo, BR (atendimento remoto)</div>
            </div>
            <div>
              <div className="mb-1 font-mono-tech text-[10px] uppercase tracking-widest text-brand">
                Status
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
                Aceitando novos projetos
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: conectar Lovable Cloud + Resend na próxima fase
              setSent(true);
            }}
            className="space-y-4 rounded-2xl border border-border bg-surface p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome" name="name" required />
              <Field label="E-mail" name="email" type="email" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Telefone" name="phone" />
              <Field label="Tipo de serviço" name="subject" placeholder="Projeto elétrico, software, laudo..." />
            </div>
            <div>
              <label className="mb-1 block font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                Mensagem
              </label>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-5 py-3 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
            >
              Enviar solicitação
            </button>
            {sent ? (
              <p className="font-mono-tech text-[11px] uppercase text-emerald-400">
                Recebido. Em breve o envio será conectado ao e-mail real.
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
        {label} {required ? <span className="text-brand">*</span> : null}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none"
      />
    </div>
  );
}
