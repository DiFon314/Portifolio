import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import substationImg from "@/assets/project-substation.jpg";

export const Route = createFileRoute("/projetos-engenharia")({
  head: () => ({
    meta: [
      { title: "Projetos de Engenharia Elétrica" },
      {
        name: "description",
        content:
          "Galeria de projetos elétricos executados: subestações, instalações industriais, prediais e automação.",
      },
    ],
  }),
  component: ProjetosEng,
});

const projects = [
  {
    ref: "PRJ-2023-A",
    title: "Subestação 500 kVA Industrial",
    desc: "Projeto completo de entrada de energia, dimensionamento de barramentos e proteção seletiva.",
    category: "Subestação",
    date: "2023",
    tech: ["AutoCAD", "NBR 14039", "ETAP"],
    img: substationImg,
  },
  {
    ref: "PRJ-2024-B",
    title: "Reforma de QGBT — Edifício Ágata",
    desc: "Substituição completa de quadro geral, reordenamento de circuitos e laudo NR-10.",
    category: "Predial",
    date: "2024",
    tech: ["AutoCAD", "NBR 5410"],
    img: substationImg,
  },
  {
    ref: "PRJ-2023-C",
    title: "SPDA — Centro Logístico",
    desc: "Sistema de Proteção contra Descargas Atmosféricas conforme NBR 5419.",
    category: "SPDA",
    date: "2023",
    tech: ["NBR 5419"],
    img: substationImg,
  },
];

function ProjetosEng() {
  return (
    <>
      <PageHeader
        eyebrow="[ 01 ] Projetos de Engenharia"
        title="Projetos elétricos executados."
        description="Cada projeto inclui memorial descritivo, plantas, ART e fotos da execução."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.ref} className="group flex flex-col bg-background p-6">
              <div className="mb-4 flex items-start justify-between">
                <span className="font-mono-tech text-[10px] text-brand">REF: {p.ref}</span>
                <span className="border border-border px-2 py-0.5 font-mono-tech text-[9px] uppercase text-muted-foreground">
                  {p.category}
                </span>
              </div>
              <div className="mb-6 overflow-hidden rounded-lg border border-border">
                <img
                  src={p.img}
                  alt={p.title}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="aspect-video w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                />
              </div>
              <h3 className="mb-2 text-lg font-medium text-foreground transition-colors group-hover:text-brand">
                {p.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-surface px-2 py-1 font-mono-tech text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
