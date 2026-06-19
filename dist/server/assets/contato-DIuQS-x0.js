import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { P as PageHeader } from "./page-header-DGi_M4Ss.js";
function Contato() {
  const [sent, setSent] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "[ 06 ] Contato", title: "Vamos construir algo sólido?", description: "Disponível para consultoria, projetos elétricos e desenvolvimento de software técnico." }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-6 pb-24", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "mb-1 font-mono-tech text-[10px] uppercase tracking-widest text-brand", children: "E-mail" }),
          /* @__PURE__ */ jsx("a", { href: "mailto:contato@seudominio.com", className: "text-lg text-foreground transition-colors hover:text-brand", children: "contato@seudominio.com" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "mb-1 font-mono-tech text-[10px] uppercase tracking-widest text-brand", children: "Localização" }),
          /* @__PURE__ */ jsx("div", { className: "text-lg text-foreground", children: "São Paulo, BR (atendimento remoto)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "mb-1 font-mono-tech text-[10px] uppercase tracking-widest text-brand", children: "Status" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-emerald-400", "aria-hidden": true }),
            "Aceitando novos projetos"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
      }, className: "space-y-4 rounded-2xl border border-border bg-surface p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx(Field, { label: "Nome", name: "name", required: true }),
          /* @__PURE__ */ jsx(Field, { label: "E-mail", name: "email", type: "email", required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx(Field, { label: "Telefone", name: "phone" }),
          /* @__PURE__ */ jsx(Field, { label: "Tipo de serviço", name: "subject", placeholder: "Projeto elétrico, software, laudo..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground", children: "Mensagem" }),
          /* @__PURE__ */ jsx("textarea", { name: "message", required: true, rows: 6, className: "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full rounded-full bg-brand px-5 py-3 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90", children: "Enviar solicitação" }),
        sent ? /* @__PURE__ */ jsx("p", { className: "font-mono-tech text-[11px] uppercase text-emerald-400", children: "Recebido. Em breve o envio será conectado ao e-mail real." }) : null
      ] })
    ] }) })
  ] });
}
function Field({
  label,
  name,
  type = "text",
  required,
  placeholder
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { className: "mb-1 block font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground", children: [
      label,
      " ",
      required ? /* @__PURE__ */ jsx("span", { className: "text-brand", children: "*" }) : null
    ] }),
    /* @__PURE__ */ jsx("input", { type, name, required, placeholder, className: "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none" })
  ] });
}
export {
  Contato as component
};
