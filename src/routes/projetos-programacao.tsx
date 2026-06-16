import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import voltflowImg from "@/assets/project-voltflow.jpg";

export const Route = createFileRoute("/projetos-programacao")({
  head: () => ({
    meta: [
      { title: "Projetos de Programação & Software" },
      {
        name: "description",
        content:
          "Portfólio de software, automações e ferramentas web desenvolvidas para o setor técnico.",
      },
    ],
  }),
  component: ProjetosProg,
});

const projects = [
  {
    ref: "SW-2024-A",
    name: "VoltFlow Analytics",
    desc: "Plataforma SaaS de monitoramento de consumo energético em tempo real via IoT.",
    stack: ["React", "TanStack", "Supabase", "Recharts"],
    github: "https://github.com/seuusuario/voltflow",
    img: voltflowImg,
  },
  {
    ref: "SW-2024-B",
    name: "Calc-NBR",
    desc: "Conjunto de calculadoras elétricas baseadas em NBR 5410 e NBR 14039.",
    stack: ["React", "TypeScript"],
    github: "https://github.com/seuusuario/calc-nbr",
    img: voltflowImg,
  },
];

function ProjetosProg() {
  return (
    <>
      <PageHeader
        eyebrow="[ 02 ] Software"
        title="Ferramentas web e automações."
        description="Projetos de software focados em produtividade técnica, monitoramento e cálculos de engenharia."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.ref} className="flex flex-col bg-background p-8">
              <div className="mb-6 flex items-start justify-between">
                <span className="font-mono-tech text-[10px] text-brand">REF: {p.ref}</span>
                <span className="chip-tech">SOFTWARE</span>
              </div>
              <div className="mb-6 overflow-hidden rounded-xl border border-border">
                <img
                  src={p.img}
                  alt={p.name}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
              </div>
              <h3 className="mb-2 text-2xl font-medium text-foreground">{p.name}</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="bg-surface px-2 py-1 font-mono-tech text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-foreground transition-colors hover:text-brand"
              >
                <span>GitHub</span>
                <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
