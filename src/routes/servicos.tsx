import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { listPublicServices, listCategories, checkIsAdmin } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { CategoriesPanel, ServicesPanel } from "@/routes/_authenticated/admin";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Galeria de Serviços Executados" },
      {
        name: "description",
        content:
          "Histórico cronológico de obras e serviços de engenharia elétrica executados, com busca, filtros, fotos e documentos.",
      },
    ],
  }),
  component: Servicos,
});

function useIsAdmin() {
  const [hasSession, setHasSession] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setHasSession(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setHasSession(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);
  const checkFn = useServerFn(checkIsAdmin);
  const q = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => checkFn(),
    enabled: hasSession,
    retry: false,
  });
  return q.data?.isAdmin ?? false;
}

function Servicos() {
  const listFn = useServerFn(listPublicServices);
  const catFn = useServerFn(listCategories);
  const services = useQuery({ queryKey: ["publicServices"], queryFn: () => listFn() });
  const cats = useQuery({ queryKey: ["categories"], queryFn: () => catFn() });

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const isAdmin = useIsAdmin();

  const categories = useMemo(
    () => ["Todos", ...(cats.data ?? []).map((c) => c.name)],
    [cats.data],
  );

  const filtered = useMemo(() => {
    const list = services.data ?? [];
    return list
      .filter((s) => {
        const q = query.toLowerCase().trim();
        const matchQ =
          !q ||
          s.title.toLowerCase().includes(q) ||
          (s.description ?? "").toLowerCase().includes(q) ||
          (s.code ?? "").toLowerCase().includes(q);
        const matchC = category === "Todos" || s.category === category;
        return matchQ && matchC;
      })
      .sort((a, b) =>
        order === "desc"
          ? b.performed_at.localeCompare(a.performed_at)
          : a.performed_at.localeCompare(b.performed_at),
      );
  }, [services.data, query, category, order]);

  const openService = openId ? filtered.find((s) => s.id === openId) : null;

  return (
    <>
      <PageHeader
        eyebrow="[ 04 ] Galeria de Serviços"
        title="Histórico de obras e serviços."
        description="Acervo cronológico organizado por categoria, com busca textual, fotos e documentos técnicos."
      />

      {isAdmin && (
        <section className="mx-auto max-w-7xl px-6">
          <div className="mb-8 rounded-xl border border-brand/30 bg-brand/5">
            <button
              onClick={() => setShowAdmin((v) => !v)}
              className="flex w-full items-center justify-between px-5 py-3 text-left"
            >
              <span className="font-mono-tech text-[11px] uppercase tracking-widest text-brand">
                ⚙ Painel administrativo — gerenciar categorias, serviços e mídias
              </span>
              <span className="font-mono-tech text-xs text-brand">
                {showAdmin ? "fechar ▲" : "abrir ▼"}
              </span>
            </button>
            {showAdmin && (
              <div className="space-y-10 border-t border-brand/20 p-6">
                <div>
                  <h3 className="mb-4 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">
                    Categorias
                  </h3>
                  <CategoriesPanel />
                </div>
                <div>
                  <h3 className="mb-4 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">
                    Serviços
                  </h3>
                  <ServicesPanel />
                </div>
              </div>
            )}
          </div>
        </section>
      )}


      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="search"
            placeholder="Buscar por descrição, código ou palavra-chave..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none md:w-auto"
          />
          <button
            onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
            className="rounded-full border border-border px-4 py-2 font-mono-tech text-[11px] uppercase tracking-widest text-foreground transition-colors hover:bg-accent"
          >
            Data {order === "desc" ? "↓ Recente" : "↑ Antigo"}
          </button>
        </div>

        <div className="flex flex-col gap-12 md:flex-row">
          <aside className="w-full shrink-0 md:w-56">
            <h2 className="mb-6 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">
              Filtrar categoria
            </h2>
            <div className="flex flex-col gap-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`border-l-2 py-1.5 pl-4 text-left text-sm transition-colors ${
                    category === c
                      ? "border-brand text-brand"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1">
            {services.isLoading ? (
              <p className="text-sm text-muted-foreground">Carregando...</p>
            ) : (
              <div className="border-l border-border">
                {filtered.length === 0 ? (
                  <p className="pl-8 text-sm text-muted-foreground">Nenhum serviço encontrado.</p>
                ) : (
                  filtered.map((s) => {
                    const photos = s.media.filter((m) => m.kind === "photo");
                    const docs = s.media.filter((m) => m.kind === "document");
                    return (
                      <article
                        key={s.id}
                        onClick={() => setOpenId(s.id)}
                        className="group flex cursor-pointer flex-col gap-2 border-b border-border bg-background py-6 pl-8 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-3">
                            <span className="font-mono-tech text-[10px] text-brand">
                              {s.performed_at.replace(/-/g, ".")}
                            </span>
                            {s.code && (
                              <span className="font-mono-tech text-[10px] uppercase text-muted-foreground">
                                {s.code}
                              </span>
                            )}
                            {s.category && (
                              <span className="font-mono-tech text-[10px] uppercase text-muted-foreground">
                                · {s.category}
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-medium text-foreground transition-colors group-hover:text-brand">
                            {s.title}
                          </h4>
                          {s.description && (
                            <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-6 pr-4">
                          <span className="font-mono-tech text-[10px] text-muted-foreground">
                            {photos.length} FOTOS · {docs.length} DOCS
                          </span>
                          <span className="grid size-8 place-items-center border border-border font-mono-tech text-xs text-muted-foreground transition-colors group-hover:border-brand group-hover:text-brand">
                            +
                          </span>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {openService && (
        <div
          onClick={() => setOpenId(null)}
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-background/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-border bg-background p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-widest text-brand">
                  {openService.performed_at.replace(/-/g, ".")}{" "}
                  {openService.code && `· ${openService.code}`}
                </div>
                <h2 className="mt-2 text-2xl font-light">{openService.title}</h2>
                {openService.category && (
                  <div className="mt-1 font-mono-tech text-[10px] uppercase text-muted-foreground">
                    {openService.category}
                  </div>
                )}
              </div>
              <button
                onClick={() => setOpenId(null)}
                className="text-2xl text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {openService.description && (
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {openService.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {openService.media
                .filter((m) => m.kind === "photo" && m.url)
                .map((m) => (
                  <a
                    key={m.id}
                    href={m.url!}
                    target="_blank"
                    rel="noreferrer"
                    className="overflow-hidden rounded-lg border border-border"
                  >
                    <img src={m.url!} alt="" className="aspect-square w-full object-cover" />
                  </a>
                ))}
            </div>

            {openService.media.some((m) => m.kind === "document") && (
              <div className="mt-6">
                <h3 className="mb-2 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">
                  Documentos
                </h3>
                <ul className="space-y-1">
                  {openService.media
                    .filter((m) => m.kind === "document")
                    .map((m) => (
                      <li key={m.id}>
                        <a
                          href={m.url ?? "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-brand hover:underline"
                        >
                          📄 Abrir PDF →
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
