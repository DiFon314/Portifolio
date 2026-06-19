import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./page-header-DGi_M4Ss.js";
const sections = [{
  code: "01",
  title: "Formação Acadêmica",
  items: ["Engenharia Elétrica — Universidade XYZ (20XX–20XX)", "Especialização em Sistemas de Potência — Instituto ABC"]
}, {
  code: "02",
  title: "Experiência Profissional",
  items: ["Engenheiro Eletricista — Empresa X (20XX–presente)", "Desenvolvedor Full-Stack — Freelancer (20XX–presente)", "Estagiário em Manutenção Industrial — Indústria Y"]
}, {
  code: "03",
  title: "Habilidades Técnicas",
  items: ["Projeto elétrico de baixa e média tensão (NBR 5410, NBR 14039)", "AutoCAD, Revit MEP, EPLAN", "React, TanStack, Node.js, PostgreSQL, Supabase", "Automação industrial: CLP Siemens, Modbus"]
}, {
  code: "04",
  title: "Certificações & Cursos",
  items: ["NR-10 — Segurança em Instalações Elétricas", "NR-35 — Trabalho em Altura", "Curso avançado de proteção e seletividade"]
}];
function Sobre() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "[ 00 ] Sobre Mim", title: "Trajetória entre o diagrama unifilar e o código.", description: "Engenheiro eletricista e desenvolvedor — combinando rigor técnico de projetos elétricos com a agilidade do software moderno." }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-6 pb-24", children: /* @__PURE__ */ jsx("div", { className: "grid gap-px bg-border md:grid-cols-2", children: sections.map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-background p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-mono-tech text-xs text-brand", children: [
          "[",
          s.code,
          "]"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-medium text-foreground", children: s.title })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: s.items.map((it) => /* @__PURE__ */ jsx("li", { className: "border-l border-border pl-4 text-sm leading-relaxed text-muted-foreground", children: it }, it)) })
    ] }, s.code)) }) })
  ] });
}
export {
  Sobre as component
};
