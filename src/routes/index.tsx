import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-circuit.jpg";
import substationImg from "@/assets/project-substation.jpg";
import voltflowImg from "@/assets/project-voltflow.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diogo Fonseca — Portfólio Técnico" },
      {
        name: "description",
        content:
          "Engenheiro eletricista e desenvolvedor full-stack. Projetos elétricos, software técnico, serviços executados e calculadoras de engenharia em um só lugar.",
      },
      { property: "og:title", content: "Diogo Fonseca — Portfólio Técnico" },
      {
        property: "og:description",
        content:
          "Projetos elétricos, software técnico, serviços executados e calculadoras de engenharia.",
      },
    ],
  }),
  component: Home,
});

const hubs = [
  {
    code: "01",
    to: "/projetos-engenharia" as const,
    eyebrow: "Engenharia Elétrica",
    title: "Projetos elétricos",
    desc: "Subestações, QGBT, SPDA e instalações industriais com memorial, ART e execução.",
    cta: "Ver projetos",
  },
  {
    code: "02",
    to: "/projetos-programacao" as const,
    eyebrow: "Desenvolvimento",
    title: "Software & automações",
    desc: "Plataformas SaaS, monitoramento IoT e ferramentas web para o setor técnico.",
    cta: "Ver software",
  },
  {
    code: "03",
    to: "/servicos" as const,
    eyebrow: "Serviços",
    title: "Galeria de serviços",
    desc: "Registro fotográfico de obras, manutenções e inspeções executadas em campo.",
    cta: "Ver galeria",
  },
  {
    code: "04",
    to: "/calculadoras" as const,
    eyebrow: "Ferramentas",
    title: "Calculadoras técnicas",
    desc: "Queda de tensão, demanda, dimensionamento de cabos e fator de potência no navegador.",
    cta: "Abrir calculadoras",
  },
];

const stats = [
  { value: "12+", label: "Projetos industriais" },
  { value: "6", label: "Calculadoras NBR" },
  { value: "100%", label: "Conformidade NR-10" },
  { value: "24h", label: "Resposta a orçamentos" },
];

const featured = [
  {
    tag: "Engenharia Elétrica",
    title: "Modernização de Subestação — GTR Industrial",
    year: "2023",
    img: substationImg,
    to: "/projetos-engenharia" as const,
  },
  {
    tag: "Desenvolvimento",
    title: "VoltFlow — Monitoramento Energético em Tempo Real",
    year: "2024",
    img: voltflowImg,
    to: "/projetos-programacao" as const,
  },
];

function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* Hero — apresentação profissional */}
      <section className="mb-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <span className="chip-tech">CREA / FULL-STACK</span>
            <h1 className="text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl">
              Diogo Fonseca
            </h1>
            <p className="max-w-md text-lg font-light text-muted-foreground">
              Engenheiro eletricista e desenvolvedor full-stack. Projeto sistemas de potência
              confiáveis e construo infraestrutura digital escalável para o setor técnico.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/projetos-engenharia"
                className="rounded-full bg-brand px-5 py-2.5 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
              >
                Ver portfólio
              </Link>
              <Link
                to="/contato"
                className="rounded-full border border-border px-5 py-2.5 font-mono-tech text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-accent"
              >
                Solicitar orçamento
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              <img
                src={heroImg}
                alt="Placa de circuito industrial em close-up com indicadores ciano"
                width={1280}
                height={960}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-brand p-6 md:block">
              <div className="font-mono-tech text-3xl font-bold text-primary-foreground">12+</div>
              <div className="font-mono-tech text-[10px] font-semibold uppercase leading-tight text-primary-foreground">
                Projetos industriais
                <br />
                executados
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resumo profissional */}
      <section className="mb-24 rounded-2xl border border-border bg-surface p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-brand">
              // Perfil
            </div>
            <h2 className="mt-3 text-3xl font-light text-foreground">Resumo profissional</h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Atuo na interseção entre engenharia elétrica e tecnologia. Executo projetos de
              instalações industriais e prediais conforme NBR 5410, NBR 14039 e NBR 5419, com
              emissão de ART, memorial descritivo e acompanhamento de obra.
            </p>
            <p>
              Paralelamente, desenvolvo software técnico — calculadoras de engenharia, dashboards
              de monitoramento energético e automações que substituem planilhas pela web. Stack
              principal: React, TypeScript, Node e PostgreSQL.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-brand/40 pl-3">
                  <div className="font-mono-tech text-2xl font-light text-foreground">
                    {s.value}
                  </div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hubs de navegação: Engenharia / Software / Serviços / Calculadoras */}
      <section className="mb-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-brand">
              // Explore
            </div>
            <h2 className="mt-2 text-3xl font-light text-foreground">Áreas do portfólio</h2>
          </div>
          <div className="mx-8 mb-4 hidden h-px flex-1 bg-border md:block" />
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {hubs.map((h) => (
            <Link
              key={h.code}
              to={h.to}
              className="group flex flex-col bg-background p-6 transition-colors hover:bg-surface"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono-tech text-[10px] text-brand">#{h.code}</span>
                <span className="font-mono-tech text-[10px] uppercase text-muted-foreground">
                  {h.eyebrow}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-medium text-foreground transition-colors group-hover:text-brand">
                {h.title}
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-mono-tech text-xs uppercase tracking-widest text-foreground transition-colors group-hover:text-brand">
                  {h.cta}
                </span>
                <span
                  aria-hidden
                  className="font-mono-tech text-brand transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
              <div className="mt-4 h-1 w-8 bg-brand-soft transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </section>

      {/* Trabalhos selecionados */}
      <section className="mb-24">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="shrink-0 text-3xl font-light text-foreground">Trabalhos Selecionados</h2>
          <div className="h-px w-full bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {featured.map((p) => (
            <Link key={p.title} to={p.to} className="group block">
              <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-surface">
                <img
                  src={p.img}
                  alt={p.title}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="aspect-video w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-1 font-mono-tech text-[10px] uppercase tracking-widest text-brand">
                    {p.tag}
                  </div>
                  <h3 className="text-xl font-medium text-foreground transition-colors group-hover:text-brand">
                    {p.title}
                  </h3>
                </div>
                <span className="font-mono-tech text-xs text-muted-foreground">{p.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mb-12 rounded-2xl border border-brand/30 bg-brand/5 p-8 text-center md:p-12">
        <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-brand">
          // Próximo passo
        </div>
        <h2 className="mt-3 text-3xl font-light text-foreground md:text-4xl">
          Tem um projeto em mente?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Envie os detalhes do escopo e receba um orçamento técnico em até 24 horas.
        </p>
        <Link
          to="/contato"
          className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
        >
          Solicitar orçamento →
        </Link>
      </section>
    </main>
  );
}
