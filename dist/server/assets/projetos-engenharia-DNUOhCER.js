import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./page-header-DGi_M4Ss.js";
import { s as substationImg } from "./project-substation-BIO43iOQ.js";
const projects = [{
  ref: "PRJ-2023-A",
  title: "Subestação 500 kVA Industrial",
  desc: "Projeto completo de entrada de energia, dimensionamento de barramentos e proteção seletiva.",
  category: "Subestação",
  date: "2023",
  tech: ["AutoCAD", "NBR 14039", "ETAP"],
  img: substationImg
}, {
  ref: "PRJ-2024-B",
  title: "Reforma de QGBT — Edifício Ágata",
  desc: "Substituição completa de quadro geral, reordenamento de circuitos e laudo NR-10.",
  category: "Predial",
  date: "2024",
  tech: ["AutoCAD", "NBR 5410"],
  img: substationImg
}, {
  ref: "PRJ-2023-C",
  title: "SPDA — Centro Logístico",
  desc: "Sistema de Proteção contra Descargas Atmosféricas conforme NBR 5419.",
  category: "SPDA",
  date: "2023",
  tech: ["NBR 5419"],
  img: substationImg
}];
function ProjetosEng() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "[ 01 ] Projetos de Engenharia", title: "Projetos elétricos executados.", description: "Cada projeto inclui memorial descritivo, plantas, ART e fotos da execução." }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-6 pb-24", children: /* @__PURE__ */ jsx("div", { className: "grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3", children: projects.map((p) => /* @__PURE__ */ jsxs("article", { className: "group flex flex-col bg-background p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-mono-tech text-[10px] text-brand", children: [
          "REF: ",
          p.ref
        ] }),
        /* @__PURE__ */ jsx("span", { className: "border border-border px-2 py-0.5 font-mono-tech text-[9px] uppercase text-muted-foreground", children: p.category })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-6 overflow-hidden rounded-lg border border-border", children: /* @__PURE__ */ jsx("img", { src: p.img, alt: p.title, width: 1280, height: 800, loading: "lazy", className: "aspect-video w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" }) }),
      /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-medium text-foreground transition-colors group-hover:text-brand", children: p.title }),
      /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm leading-relaxed text-muted-foreground", children: p.desc }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto flex flex-wrap gap-2 pt-4", children: p.tech.map((t) => /* @__PURE__ */ jsx("span", { className: "bg-surface px-2 py-1 font-mono-tech text-[10px] text-muted-foreground", children: t }, t)) })
    ] }, p.ref)) }) })
  ] });
}
export {
  ProjetosEng as component
};
