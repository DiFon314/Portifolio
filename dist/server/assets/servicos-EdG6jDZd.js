import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { u as useServerFn, C as CategoriesPanel, S as ServicesPanel, l as listPublicServices, a as listCategories, c as checkIsAdmin } from "./router-Bbl26cC3.js";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { P as PageHeader } from "./page-header-DGi_M4Ss.js";
import { s as supabase } from "./client-BAqQwQ8R.js";
import "@tanstack/react-router";
import "sonner";
import "./server-DAVi1gpz.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
import "./auth-middleware-BCAtpUCP.js";
import "@supabase/supabase-js";
function useIsAdmin() {
  const [hasSession, setHasSession] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({
      data
    }) => setHasSession(!!data.user));
    const {
      data: sub
    } = supabase.auth.onAuthStateChange((_e, s) => setHasSession(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);
  const checkFn = useServerFn(checkIsAdmin);
  const q = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => checkFn(),
    enabled: hasSession,
    retry: false
  });
  return q.data?.isAdmin ?? false;
}
function Servicos() {
  const listFn = useServerFn(listPublicServices);
  const catFn = useServerFn(listCategories);
  const services = useQuery({
    queryKey: ["publicServices"],
    queryFn: () => listFn()
  });
  const cats = useQuery({
    queryKey: ["categories"],
    queryFn: () => catFn()
  });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [order, setOrder] = useState("desc");
  const [openId, setOpenId] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const isAdmin = useIsAdmin();
  const categories = useMemo(() => ["Todos", ...(cats.data ?? []).map((c) => c.name)], [cats.data]);
  const filtered = useMemo(() => {
    const list = services.data ?? [];
    return list.filter((s) => {
      const q = query.toLowerCase().trim();
      const matchQ = !q || s.title.toLowerCase().includes(q) || (s.description ?? "").toLowerCase().includes(q) || (s.code ?? "").toLowerCase().includes(q);
      const matchC = category === "Todos" || s.category === category;
      return matchQ && matchC;
    }).sort((a, b) => order === "desc" ? b.performed_at.localeCompare(a.performed_at) : a.performed_at.localeCompare(b.performed_at));
  }, [services.data, query, category, order]);
  const openService = openId ? filtered.find((s) => s.id === openId) : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "[ 04 ] Galeria de Serviços", title: "Histórico de obras e serviços.", description: "Acervo cronológico organizado por categoria, com busca textual, fotos e documentos técnicos." }),
    isAdmin && /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-xl border border-brand/30 bg-brand/5", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowAdmin((v) => !v), className: "flex w-full items-center justify-between px-5 py-3 text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[11px] uppercase tracking-widest text-brand", children: "⚙ Painel administrativo — gerenciar categorias, serviços e mídias" }),
        /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-xs text-brand", children: showAdmin ? "fechar ▲" : "abrir ▼" })
      ] }),
      showAdmin && /* @__PURE__ */ jsxs("div", { className: "space-y-10 border-t border-brand/20 p-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground", children: "Categorias" }),
          /* @__PURE__ */ jsx(CategoriesPanel, {})
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground", children: "Serviços" }),
          /* @__PURE__ */ jsx(ServicesPanel, {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-6 pb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsx("input", { type: "search", placeholder: "Buscar por descrição, código ou palavra-chave...", value: query, onChange: (e) => setQuery(e.target.value), className: "w-full max-w-md rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none md:w-auto" }),
        /* @__PURE__ */ jsxs("button", { onClick: () => setOrder(order === "desc" ? "asc" : "desc"), className: "rounded-full border border-border px-4 py-2 font-mono-tech text-[11px] uppercase tracking-widest text-foreground transition-colors hover:bg-accent", children: [
          "Data ",
          order === "desc" ? "↓ Recente" : "↑ Antigo"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-12 md:flex-row", children: [
        /* @__PURE__ */ jsxs("aside", { className: "w-full shrink-0 md:w-56", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground", children: "Filtrar categoria" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: categories.map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setCategory(c), className: `border-l-2 py-1.5 pl-4 text-left text-sm transition-colors ${category === c ? "border-brand text-brand" : "border-transparent text-muted-foreground hover:text-foreground"}`, children: c }, c)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: services.isLoading ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : /* @__PURE__ */ jsx("div", { className: "border-l border-border", children: filtered.length === 0 ? /* @__PURE__ */ jsx("p", { className: "pl-8 text-sm text-muted-foreground", children: "Nenhum serviço encontrado." }) : filtered.map((s) => {
          const photos = s.media.filter((m) => m.kind === "photo");
          const docs = s.media.filter((m) => m.kind === "document");
          return /* @__PURE__ */ jsxs("article", { onClick: () => setOpenId(s.id), className: "group flex cursor-pointer flex-col gap-2 border-b border-border bg-background py-6 pl-8 md:flex-row md:items-center md:justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[10px] text-brand", children: s.performed_at.replace(/-/g, ".") }),
                s.code && /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[10px] uppercase text-muted-foreground", children: s.code }),
                s.category && /* @__PURE__ */ jsxs("span", { className: "font-mono-tech text-[10px] uppercase text-muted-foreground", children: [
                  "· ",
                  s.category
                ] })
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-foreground transition-colors group-hover:text-brand", children: s.title }),
              s.description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: s.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-6 pr-4", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-mono-tech text-[10px] text-muted-foreground", children: [
                photos.length,
                " FOTOS · ",
                docs.length,
                " DOCS"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "grid size-8 place-items-center border border-border font-mono-tech text-xs text-muted-foreground transition-colors group-hover:border-brand group-hover:text-brand", children: "+" })
            ] })
          ] }, s.id);
        }) }) })
      ] })
    ] }),
    openService && /* @__PURE__ */ jsx("div", { onClick: () => setOpenId(null), className: "fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-background/85 p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { onClick: (e) => e.stopPropagation(), className: "max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-border bg-background p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "font-mono-tech text-[10px] uppercase tracking-widest text-brand", children: [
            openService.performed_at.replace(/-/g, "."),
            " ",
            openService.code && `· ${openService.code}`
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 text-2xl font-light", children: openService.title }),
          openService.category && /* @__PURE__ */ jsx("div", { className: "mt-1 font-mono-tech text-[10px] uppercase text-muted-foreground", children: openService.category })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setOpenId(null), className: "text-2xl text-muted-foreground hover:text-foreground", children: "✕" })
      ] }),
      openService.description && /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm leading-relaxed text-muted-foreground", children: openService.description }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: openService.media.filter((m) => m.kind === "photo" && m.url).map((m) => /* @__PURE__ */ jsx("a", { href: m.url, target: "_blank", rel: "noreferrer", className: "overflow-hidden rounded-lg border border-border", children: /* @__PURE__ */ jsx("img", { src: m.url, alt: "", className: "aspect-square w-full object-cover" }) }, m.id)) }),
      openService.media.some((m) => m.kind === "document") && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-2 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground", children: "Documentos" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: openService.media.filter((m) => m.kind === "document").map((m) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: m.url ?? "#", target: "_blank", rel: "noreferrer", className: "text-sm text-brand hover:underline", children: "📄 Abrir PDF →" }) }, m.id)) })
      ] })
    ] }) })
  ] });
}
export {
  Servicos as component
};
