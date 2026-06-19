import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./page-header-DGi_M4Ss.js";
import { v as voltflowImg } from "./project-voltflow-CcH-2QmR.js";
const projects = [{
  ref: "SW-2024-A",
  name: "VoltFlow Analytics",
  desc: "Plataforma SaaS de monitoramento de consumo energético em tempo real via IoT.",
  stack: ["React", "TanStack", "Supabase", "Recharts"],
  github: "https://github.com/seuusuario/voltflow",
  img: voltflowImg
}, {
  ref: "SW-2024-B",
  name: "Calc-NBR",
  desc: "Conjunto de calculadoras elétricas baseadas em NBR 5410 e NBR 14039.",
  stack: ["React", "TypeScript"],
  github: "https://github.com/seuusuario/calc-nbr",
  img: voltflowImg
}];
function ProjetosProg() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "[ 02 ] Software", title: "Ferramentas web e automações.", description: "Projetos de software focados em produtividade técnica, monitoramento e cálculos de engenharia." }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-6 pb-24", children: /* @__PURE__ */ jsx("div", { className: "grid gap-px bg-border md:grid-cols-2", children: projects.map((p) => /* @__PURE__ */ jsxs("article", { className: "flex flex-col bg-background p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-mono-tech text-[10px] text-brand", children: [
          "REF: ",
          p.ref
        ] }),
        /* @__PURE__ */ jsx("span", { className: "chip-tech", children: "SOFTWARE" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-6 overflow-hidden rounded-xl border border-border", children: /* @__PURE__ */ jsx("img", { src: p.img, alt: p.name, width: 1280, height: 800, loading: "lazy", className: "aspect-video w-full object-cover" }) }),
      /* @__PURE__ */ jsx("h3", { className: "mb-2 text-2xl font-medium text-foreground", children: p.name }),
      /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm leading-relaxed text-muted-foreground", children: p.desc }),
      /* @__PURE__ */ jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: p.stack.map((t) => /* @__PURE__ */ jsx("span", { className: "bg-surface px-2 py-1 font-mono-tech text-[10px] text-muted-foreground", children: t }, t)) }),
      /* @__PURE__ */ jsxs("a", { href: p.github, target: "_blank", rel: "noreferrer", className: "mt-auto inline-flex w-fit items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-foreground transition-colors hover:text-brand", children: [
        /* @__PURE__ */ jsx("span", { children: "GitHub" }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
      ] })
    ] }, p.ref)) }) })
  ] });
}
export {
  ProjetosProg as component
};
