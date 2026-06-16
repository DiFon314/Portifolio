import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/academico")({
  head: () => ({
    meta: [
      { title: "Produções Acadêmicas — Artigos & Pesquisas" },
      {
        name: "description",
        content:
          "Artigos científicos, TCCs, relatórios técnicos e publicações em engenharia elétrica.",
      },
    ],
  }),
  component: Academico,
});

const works = [
  {
    type: "Artigo",
    title: "Análise comparativa de proteção seletiva em redes industriais",
    date: "2024-03",
    summary: "Estudo de coordenação entre disjuntores de baixa e média tensão em planta de processo.",
  },
  {
    type: "TCC",
    title: "Dimensionamento de geração fotovoltaica para uso comercial",
    date: "2022-12",
    summary: "Trabalho de conclusão de curso com estudo de caso real de 75 kWp.",
  },
  {
    type: "Relatório",
    title: "Auditoria energética em edificação predial",
    date: "2023-08",
    summary: "Análise de demanda, fator de potência e proposta de retrofit de iluminação.",
  },
];

function Academico() {
  return (
    <>
      <PageHeader
        eyebrow="[ 03 ] Construções Acadêmicas"
        title="Artigos, TCCs e relatórios técnicos."
        description="Produções acadêmicas e técnicas disponíveis para visualização e download em PDF."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="border border-border">
          {works.map((w, i) => (
            <article
              key={w.title}
              className={`flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="chip-tech">{w.type}</span>
                  <span className="font-mono-tech text-[10px] text-muted-foreground">{w.date}</span>
                </div>
                <h3 className="text-lg font-medium text-foreground">{w.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{w.summary}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button className="rounded-full border border-border px-4 py-2 font-mono-tech text-[11px] uppercase tracking-widest text-foreground transition-colors hover:bg-accent">
                  Visualizar
                </button>
                <button className="rounded-full bg-brand-soft px-4 py-2 font-mono-tech text-[11px] uppercase tracking-widest text-brand transition-colors hover:bg-brand hover:text-primary-foreground">
                  PDF
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
