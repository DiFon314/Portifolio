import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./page-header-DGi_M4Ss.js";
const works = [{
  type: "Artigo",
  title: "Análise comparativa de proteção seletiva em redes industriais",
  date: "2024-03",
  summary: "Estudo de coordenação entre disjuntores de baixa e média tensão em planta de processo."
}, {
  type: "TCC",
  title: "Dimensionamento de geração fotovoltaica para uso comercial",
  date: "2022-12",
  summary: "Trabalho de conclusão de curso com estudo de caso real de 75 kWp."
}, {
  type: "Relatório",
  title: "Auditoria energética em edificação predial",
  date: "2023-08",
  summary: "Análise de demanda, fator de potência e proposta de retrofit de iluminação."
}];
function Academico() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "[ 03 ] Construções Acadêmicas", title: "Artigos, TCCs e relatórios técnicos.", description: "Produções acadêmicas e técnicas disponíveis para visualização e download em PDF." }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-6 pb-24", children: /* @__PURE__ */ jsx("div", { className: "border border-border", children: works.map((w, i) => /* @__PURE__ */ jsxs("article", { className: `flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between ${i > 0 ? "border-t border-border" : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "chip-tech", children: w.type }),
          /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[10px] text-muted-foreground", children: w.date })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-foreground", children: w.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 max-w-2xl text-sm text-muted-foreground", children: w.summary })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 gap-2", children: [
        /* @__PURE__ */ jsx("button", { className: "rounded-full border border-border px-4 py-2 font-mono-tech text-[11px] uppercase tracking-widest text-foreground transition-colors hover:bg-accent", children: "Visualizar" }),
        /* @__PURE__ */ jsx("button", { className: "rounded-full bg-brand-soft px-4 py-2 font-mono-tech text-[11px] uppercase tracking-widest text-brand transition-colors hover:bg-brand hover:text-primary-foreground", children: "PDF" })
      ] })
    ] }, w.title)) }) })
  ] });
}
export {
  Academico as component
};
