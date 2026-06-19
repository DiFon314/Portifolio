import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./page-header-DGi_M4Ss.js";
const CALCS = [{
  slug: "queda-tensao",
  name: "Queda de Tensão",
  desc: "Cálculo percentual conforme NBR 5410.",
  access: "public",
  enabled: true
}, {
  slug: "corrente",
  name: "Corrente Elétrica",
  desc: "I = P / (V · cosφ) para circuitos mono e trifásicos.",
  access: "public",
  enabled: true
}, {
  slug: "potencia",
  name: "Potência Elétrica",
  desc: "Conversões entre potência ativa, reativa e aparente.",
  access: "public",
  enabled: true
}, {
  slug: "fator-potencia",
  name: "Fator de Potência",
  desc: "Dimensionamento de banco de capacitores.",
  access: "private",
  enabled: true
}, {
  slug: "cabos",
  name: "Dimensionamento de Cabos",
  desc: "Verificação por capacidade de condução e queda.",
  access: "private",
  enabled: true
}, {
  slug: "demanda",
  name: "Demanda Elétrica",
  desc: "Estimativa de carga com fatores de diversidade.",
  access: "public",
  enabled: true
}];
function Calculadoras() {
  const active = CALCS.filter((c) => c.enabled);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "[ 05 ] Calculadoras Técnicas", title: "Substitua as planilhas. Calcule no navegador.", description: "Ferramentas baseadas em normas técnicas (NBR 5410, NBR 14039) para dimensionamento rápido no campo." }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-6 pb-24", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: active.map((c, i) => /* @__PURE__ */ jsxs("article", { className: "group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-brand/40", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-mono-tech text-[10px] text-brand", children: [
          "#CALC_",
          String(i + 1).padStart(2, "0")
        ] }),
        c.access === "private" ? /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[10px] uppercase text-muted-foreground", children: "🔒 Privada" }) : /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[10px] uppercase text-emerald-400", children: "Pública" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-medium text-foreground", children: c.name }),
      /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm leading-relaxed text-muted-foreground", children: c.desc }),
      /* @__PURE__ */ jsxs("button", { className: "mt-auto inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-foreground transition-colors hover:text-brand", children: [
        "Acessar ferramenta ",
        /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 h-1 w-8 bg-brand-soft transition-all duration-500 group-hover:w-full" })
    ] }, c.slug)) }) })
  ] });
}
export {
  Calculadoras as component
};
