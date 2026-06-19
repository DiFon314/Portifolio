import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { s as substationImg } from "./project-substation-BIO43iOQ.js";
import { v as voltflowImg } from "./project-voltflow-CcH-2QmR.js";
const heroImg = "/assets/hero-circuit-BGdHgk5J.jpg";
const hubs = [{
  code: "01",
  to: "/projetos-engenharia",
  eyebrow: "Engenharia Elétrica",
  title: "Projetos elétricos",
  desc: "Subestações, QGBT, SPDA e instalações industriais com memorial, ART e execução.",
  cta: "Ver projetos"
}, {
  code: "02",
  to: "/projetos-programacao",
  eyebrow: "Desenvolvimento",
  title: "Software & automações",
  desc: "Plataformas SaaS, monitoramento IoT e ferramentas web para o setor técnico.",
  cta: "Ver software"
}, {
  code: "03",
  to: "/servicos",
  eyebrow: "Serviços",
  title: "Galeria de serviços",
  desc: "Registro fotográfico de obras, manutenções e inspeções executadas em campo.",
  cta: "Ver galeria"
}, {
  code: "04",
  to: "/calculadoras",
  eyebrow: "Ferramentas",
  title: "Calculadoras técnicas",
  desc: "Queda de tensão, demanda, dimensionamento de cabos e fator de potência no navegador.",
  cta: "Abrir calculadoras"
}];
const stats = [{
  value: "12+",
  label: "Projetos industriais"
}, {
  value: "6",
  label: "Calculadoras NBR"
}, {
  value: "100%",
  label: "Conformidade NR-10"
}, {
  value: "24h",
  label: "Resposta a orçamentos"
}];
const featured = [{
  tag: "Engenharia Elétrica",
  title: "Modernização de Subestação — GTR Industrial",
  year: "2023",
  img: substationImg,
  to: "/projetos-engenharia"
}, {
  tag: "Desenvolvimento",
  title: "VoltFlow — Monitoramento Energético em Tempo Real",
  year: "2024",
  img: voltflowImg,
  to: "/projetos-programacao"
}];
function Home() {
  return /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-6 py-12", children: [
    /* @__PURE__ */ jsx("section", { className: "mb-24", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-12 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("span", { className: "chip-tech", children: "CREA / FULL-STACK" }),
        /* @__PURE__ */ jsx("h1", { className: "text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl", children: "Diogo Fonseca" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-md text-lg font-light text-muted-foreground", children: "Engenheiro eletricista e desenvolvedor full-stack. Projeto sistemas de potência confiáveis e construo infraestrutura digital escalável para o setor técnico." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 pt-2", children: [
          /* @__PURE__ */ jsx(Link, { to: "/projetos-engenharia", className: "rounded-full bg-brand px-5 py-2.5 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90", children: "Ver portfólio" }),
          /* @__PURE__ */ jsx(Link, { to: "/contato", className: "rounded-full border border-border px-5 py-2.5 font-mono-tech text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-accent", children: "Solicitar orçamento" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-surface", children: /* @__PURE__ */ jsx("img", { src: heroImg, alt: "Placa de circuito industrial em close-up com indicadores ciano", width: 1280, height: 960, className: "aspect-[4/3] w-full object-cover" }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute -bottom-6 -left-6 hidden rounded-xl bg-brand p-6 md:block", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-3xl font-bold text-primary-foreground", children: "12+" }),
          /* @__PURE__ */ jsxs("div", { className: "font-mono-tech text-[10px] font-semibold uppercase leading-tight text-primary-foreground", children: [
            "Projetos industriais",
            /* @__PURE__ */ jsx("br", {}),
            "executados"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mb-24 rounded-2xl border border-border bg-surface p-8 md:p-12", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:grid-cols-[1fr_1.4fr]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-[10px] uppercase tracking-[0.3em] text-brand", children: "// Perfil" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-light text-foreground", children: "Resumo profissional" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-base leading-relaxed text-muted-foreground", children: [
        /* @__PURE__ */ jsx("p", { children: "Atuo na interseção entre engenharia elétrica e tecnologia. Executo projetos de instalações industriais e prediais conforme NBR 5410, NBR 14039 e NBR 5419, com emissão de ART, memorial descritivo e acompanhamento de obra." }),
        /* @__PURE__ */ jsx("p", { children: "Paralelamente, desenvolvo software técnico — calculadoras de engenharia, dashboards de monitoramento energético e automações que substituem planilhas pela web. Stack principal: React, TypeScript, Node e PostgreSQL." }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 pt-2 md:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "border-l border-brand/40 pl-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-2xl font-light text-foreground", children: s.value }),
          /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground", children: s.label })
        ] }, s.label)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-[10px] uppercase tracking-[0.3em] text-brand", children: "// Explore" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 text-3xl font-light text-foreground", children: "Áreas do portfólio" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-8 mb-4 hidden h-px flex-1 bg-border md:block" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4", children: hubs.map((h) => /* @__PURE__ */ jsxs(Link, { to: h.to, className: "group flex flex-col bg-background p-6 transition-colors hover:bg-surface", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-mono-tech text-[10px] text-brand", children: [
            "#",
            h.code
          ] }),
          /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[10px] uppercase text-muted-foreground", children: h.eyebrow })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-xl font-medium text-foreground transition-colors group-hover:text-brand", children: h.title }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-sm leading-relaxed text-muted-foreground", children: h.desc }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-xs uppercase tracking-widest text-foreground transition-colors group-hover:text-brand", children: h.cta }),
          /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "font-mono-tech text-brand transition-transform group-hover:translate-x-1", children: "→" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 h-1 w-8 bg-brand-soft transition-all duration-500 group-hover:w-full" })
      ] }, h.code)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "shrink-0 text-3xl font-light text-foreground", children: "Trabalhos Selecionados" }),
        /* @__PURE__ */ jsx("div", { className: "h-px w-full bg-border" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-2", children: featured.map((p) => /* @__PURE__ */ jsxs(Link, { to: p.to, className: "group block", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6 overflow-hidden rounded-2xl border border-border bg-surface", children: /* @__PURE__ */ jsx("img", { src: p.img, alt: p.title, width: 1280, height: 800, loading: "lazy", className: "aspect-video w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-1 font-mono-tech text-[10px] uppercase tracking-widest text-brand", children: p.tag }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium text-foreground transition-colors group-hover:text-brand", children: p.title })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-xs text-muted-foreground", children: p.year })
        ] })
      ] }, p.title)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-12 rounded-2xl border border-brand/30 bg-brand/5 p-8 text-center md:p-12", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-[10px] uppercase tracking-[0.3em] text-brand", children: "// Próximo passo" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-light text-foreground md:text-4xl", children: "Tem um projeto em mente?" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-xl text-muted-foreground", children: "Envie os detalhes do escopo e receba um orçamento técnico em até 24 horas." }),
      /* @__PURE__ */ jsx(Link, { to: "/contato", className: "mt-6 inline-flex rounded-full bg-brand px-6 py-3 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90", children: "Solicitar orçamento →" })
    ] })
  ] });
}
export {
  Home as component
};
