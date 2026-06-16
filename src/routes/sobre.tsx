import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Trajetória & Formação" },
      {
        name: "description",
        content:
          "Formação acadêmica, experiência profissional e habilidades técnicas em engenharia elétrica e desenvolvimento de software.",
      },
    ],
  }),
  component: Sobre,
});

const sections = [
  {
    code: "01",
    title: "Formação Acadêmica",
    items: [
      "Engenharia Elétrica — Universidade XYZ (20XX–20XX)",
      "Especialização em Sistemas de Potência — Instituto ABC",
    ],
  },
  {
    code: "02",
    title: "Experiência Profissional",
    items: [
      "Engenheiro Eletricista — Empresa X (20XX–presente)",
      "Desenvolvedor Full-Stack — Freelancer (20XX–presente)",
      "Estagiário em Manutenção Industrial — Indústria Y",
    ],
  },
  {
    code: "03",
    title: "Habilidades Técnicas",
    items: [
      "Projeto elétrico de baixa e média tensão (NBR 5410, NBR 14039)",
      "AutoCAD, Revit MEP, EPLAN",
      "React, TanStack, Node.js, PostgreSQL, Supabase",
      "Automação industrial: CLP Siemens, Modbus",
    ],
  },
  {
    code: "04",
    title: "Certificações & Cursos",
    items: [
      "NR-10 — Segurança em Instalações Elétricas",
      "NR-35 — Trabalho em Altura",
      "Curso avançado de proteção e seletividade",
    ],
  },
];

function Sobre() {
  return (
    <>
      <PageHeader
        eyebrow="[ 00 ] Sobre Mim"
        title="Trajetória entre o diagrama unifilar e o código."
        description="Engenheiro eletricista e desenvolvedor — combinando rigor técnico de projetos elétricos com a agilidade do software moderno."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {sections.map((s) => (
            <div key={s.code} className="bg-background p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono-tech text-xs text-brand">[{s.code}]</span>
                <h2 className="text-xl font-medium text-foreground">{s.title}</h2>
              </div>
              <ul className="space-y-3">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="border-l border-border pl-4 text-sm leading-relaxed text-muted-foreground"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
