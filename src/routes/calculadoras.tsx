import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/calculadoras")({
  head: () => ({
    meta: [
      { title: "Calculadoras Técnicas — Engenharia Elétrica" },
      {
        name: "description",
        content:
          "Ferramentas técnicas para queda de tensão, dimensionamento de cabos, fator de potência e demanda elétrica.",
      },
    ],
  }),
  component: Calculadoras,
});

type Calc = {
  slug: string;
  name: string;
  desc: string;
  access: "public" | "private";
  enabled: boolean;
};

const CALCS: Calc[] = [
  { slug: "queda-tensao", name: "Queda de Tensão", desc: "Cálculo percentual conforme NBR 5410.", access: "public", enabled: true },
  { slug: "corrente", name: "Corrente Elétrica", desc: "I = P / (V · cosφ) para circuitos mono e trifásicos.", access: "public", enabled: true },
  { slug: "potencia", name: "Potência Elétrica", desc: "Conversões entre potência ativa, reativa e aparente.", access: "public", enabled: true },
  { slug: "fator-potencia", name: "Fator de Potência", desc: "Dimensionamento de banco de capacitores.", access: "private", enabled: true },
  { slug: "cabos", name: "Dimensionamento de Cabos", desc: "Verificação por capacidade de condução e queda.", access: "private", enabled: true },
  { slug: "demanda", name: "Demanda Elétrica", desc: "Estimativa de carga com fatores de diversidade.", access: "public", enabled: true },
];

function Calculadoras() {
  const active = CALCS.filter((c) => c.enabled);

  return (
    <>
      <PageHeader
        eyebrow="[ 05 ] Calculadoras Técnicas"
        title="Substitua as planilhas. Calcule no navegador."
        description="Ferramentas baseadas em normas técnicas (NBR 5410, NBR 14039) para dimensionamento rápido no campo."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((c, i) => (
            <article
              key={c.slug}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-brand/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono-tech text-[10px] text-brand">
                  #CALC_{String(i + 1).padStart(2, "0")}
                </span>
                {c.access === "private" ? (
                  <span className="font-mono-tech text-[10px] uppercase text-muted-foreground">
                    🔒 Privada
                  </span>
                ) : (
                  <span className="font-mono-tech text-[10px] uppercase text-emerald-400">
                    Pública
                  </span>
                )}
              </div>
              <h3 className="mb-2 text-lg font-medium text-foreground">{c.name}</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <button className="mt-auto inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-foreground transition-colors hover:text-brand">
                Acessar ferramenta <span aria-hidden>→</span>
              </button>
              <div className="mt-4 h-1 w-8 bg-brand-soft transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
