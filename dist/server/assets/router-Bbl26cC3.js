import { useQueryClient, QueryClientProvider, useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { useRouter, isRedirect, useNavigate, Link, createRootRouteWithContext, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";
import { s as supabase } from "./client-BAqQwQ8R.js";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "./server-DAVi1gpz.js";
import { z } from "zod";
import { r as requireSupabaseAuth } from "./auth-middleware-BCAtpUCP.js";
function useServerFn(serverFn) {
  const router2 = useRouter();
  return React.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const appCss = "/assets/styles-D3NEB2Pq.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function UserBadge() {
  const [email, setEmail] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const qc = useQueryClient();
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setEmail(data.user?.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    setOpen(false);
    navigate({ to: "/auth", replace: true });
  }
  if (!email) {
    return /* @__PURE__ */ jsx(
      Link,
      {
        to: "/auth",
        className: "rounded-full border border-border px-3 py-1.5 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-brand hover:text-brand",
        children: "Entrar"
      }
    );
  }
  const initial = email[0]?.toUpperCase() ?? "?";
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        className: "flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 py-1 pl-1 pr-3 transition-colors hover:bg-brand/10",
        title: email,
        children: [
          /* @__PURE__ */ jsx("span", { className: "grid size-6 place-items-center rounded-full bg-brand text-[11px] font-medium text-primary-foreground", children: initial }),
          /* @__PURE__ */ jsx("span", { className: "hidden font-mono-tech text-[10px] uppercase tracking-widest text-brand sm:inline", children: email.split("@")[0] })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40", onClick: () => setOpen(false) }),
      /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-background p-3 shadow-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b border-border pb-2", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground", children: "Logado como" }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 truncate text-sm text-foreground", children: email })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: signOut,
            className: "mt-2 w-full rounded-md px-2 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10",
            children: "Sair"
          }
        )
      ] })
    ] })
  ] });
}
const links = [
  { to: "/projetos-engenharia", label: "Engenharia" },
  { to: "/projetos-programacao", label: "Software" },
  { to: "/servicos", label: "Serviços" },
  { to: "/academico", label: "Acadêmico" },
  { to: "/calculadoras", label: "Calculadoras" },
  { to: "/sobre", label: "Sobre" }
];
function SiteNav() {
  return /* @__PURE__ */ jsx("nav", { className: "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-6", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "size-2.5 animate-pulse rounded-full bg-brand", "aria-hidden": true }),
      /* @__PURE__ */ jsxs("span", { className: "font-mono-tech text-sm font-medium uppercase tracking-tighter text-foreground", children: [
        "Diogo Fonseca ",
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "// Terminal" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden gap-7 md:flex", children: links.map((l) => /* @__PURE__ */ jsx(
      Link,
      {
        to: l.to,
        className: "font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand",
        activeProps: { className: "text-brand" },
        children: l.label
      },
      l.to
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/contato",
          className: "rounded-full border border-brand/20 px-4 py-1.5 font-mono-tech text-[11px] uppercase tracking-widest text-brand transition-colors hover:bg-brand/5",
          children: "Contato"
        }
      ),
      /* @__PURE__ */ jsx(UserBadge, {})
    ] })
  ] }) });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxs("footer", { className: "mt-32 border-t border-border", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-xs uppercase tracking-widest text-foreground", children: "Status" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full bg-emerald-400", "aria-hidden": true }),
          "Disponível para novos projetos"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-xs uppercase tracking-widest text-foreground", children: "Contato" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:diogo.coucello@gmail.com",
            className: "block text-sm text-muted-foreground transition-colors hover:text-brand",
            children: "diogo.coucello@gmail.com"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/contato",
            className: "block text-sm text-muted-foreground transition-colors hover:text-brand",
            children: "Solicitar orçamento"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-xs uppercase tracking-widest text-foreground", children: "Stack" }),
        /* @__PURE__ */ jsx("p", { className: "font-mono-tech text-[11px] uppercase leading-relaxed tracking-tighter text-muted-foreground", children: "React / TanStack Start / Tailwind / Lovable Cloud / NBR 5410" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-6 pb-10", children: /* @__PURE__ */ jsxs("div", { className: "font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Diogo Fonseca — Engenharia & Código"
    ] }) })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-xs uppercase tracking-widest text-brand", children: "Error / 404" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-4 text-5xl font-light text-foreground", children: "Página não encontrada" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "A página que você procurou não existe ou foi movida." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full border border-brand/20 bg-brand/5 px-5 py-2 font-mono-tech text-xs uppercase tracking-widest text-brand transition-colors hover:bg-brand/10",
        children: "Voltar ao início"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-xs uppercase tracking-widest text-destructive", children: "System / Error" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-4 text-3xl font-light text-foreground", children: "Algo deu errado" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Tente novamente ou volte ao início." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-full bg-brand px-5 py-2 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90",
          children: "Tentar novamente"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "rounded-full border border-border px-5 py-2 font-mono-tech text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-accent",
          children: "Início"
        }
      )
    ] })
  ] }) });
}
const Route$c = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Diogo Fonseca — Portfólio Técnico" },
      {
        name: "description",
        content: "Portfólio profissional de engenharia elétrica e desenvolvimento de software. Projetos, serviços executados, calculadoras técnicas e produções acadêmicas."
      },
      { name: "author", content: "Diogo Fonseca" },
      { property: "og:title", content: "Diogo Fonseca — Portfólio Técnico" },
      {
        property: "og:description",
        content: "Projetos de engenharia elétrica, software, serviços executados e ferramentas técnicas."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$c.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(SiteNav, {}),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(SiteFooter, {}),
    /* @__PURE__ */ jsx(Toaster, { theme: "dark", position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$a = () => import("./sobre-ByhVbQNP.js");
const Route$b = createFileRoute("/sobre")({
  head: () => ({
    meta: [{
      title: "Sobre — Trajetória & Formação"
    }, {
      name: "description",
      content: "Formação acadêmica, experiência profissional e habilidades técnicas em engenharia elétrica e desenvolvimento de software."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const BASE_URL = "";
const Route$a = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/sobre", changefreq: "monthly", priority: "0.8" },
          { path: "/projetos-engenharia", changefreq: "weekly", priority: "0.9" },
          { path: "/projetos-programacao", changefreq: "weekly", priority: "0.9" },
          { path: "/academico", changefreq: "monthly", priority: "0.7" },
          { path: "/servicos", changefreq: "weekly", priority: "0.9" },
          { path: "/calculadoras", changefreq: "monthly", priority: "0.8" },
          { path: "/contato", changefreq: "monthly", priority: "0.7" }
        ];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$9 = () => import("./servicos-EdG6jDZd.js");
const Route$9 = createFileRoute("/servicos")({
  head: () => ({
    meta: [{
      title: "Galeria de Serviços Executados"
    }, {
      name: "description",
      content: "Histórico cronológico de obras e serviços de engenharia elétrica executados, com busca, filtros, fotos e documentos."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./projetos-programacao-Pod-gZ_1.js");
const Route$8 = createFileRoute("/projetos-programacao")({
  head: () => ({
    meta: [{
      title: "Projetos de Programação & Software"
    }, {
      name: "description",
      content: "Portfólio de software, automações e ferramentas web desenvolvidas para o setor técnico."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./projetos-engenharia-DNUOhCER.js");
const Route$7 = createFileRoute("/projetos-engenharia")({
  head: () => ({
    meta: [{
      title: "Projetos de Engenharia Elétrica"
    }, {
      name: "description",
      content: "Galeria de projetos elétricos executados: subestações, instalações industriais, prediais e automação."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./contato-DIuQS-x0.js");
const Route$6 = createFileRoute("/contato")({
  head: () => ({
    meta: [{
      title: "Contato — Solicitar Orçamento"
    }, {
      name: "description",
      content: "Solicite orçamento ou consultoria em engenharia elétrica e desenvolvimento de software."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./calculadoras-OqH68e_7.js");
const Route$5 = createFileRoute("/calculadoras")({
  head: () => ({
    meta: [{
      title: "Calculadoras Técnicas — Engenharia Elétrica"
    }, {
      name: "description",
      content: "Ferramentas técnicas para queda de tensão, dimensionamento de cabos, fator de potência e demanda elétrica."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./auth-DUQZXeE_.js");
const Route$4 = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Acesso administrativo"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./academico-1v-c77fI.js");
const Route$3 = createFileRoute("/academico")({
  head: () => ({
    meta: [{
      title: "Produções Acadêmicas — Artigos & Pesquisas"
    }, {
      name: "description",
      content: "Artigos científicos, TCCs, relatórios técnicos e publicações em engenharia elétrica."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./route-BFsOu0JM.js");
const Route$2 = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-C_4U4Amq.js");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Diogo Fonseca — Portfólio Técnico"
    }, {
      name: "description",
      content: "Engenheiro eletricista e desenvolvedor full-stack. Projetos elétricos, software técnico, serviços executados e calculadoras de engenharia em um só lugar."
    }, {
      property: "og:title",
      content: "Diogo Fonseca — Portfólio Técnico"
    }, {
      property: "og:description",
      content: "Projetos elétricos, software técnico, serviços executados e calculadoras de engenharia."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const listCategories = createServerFn({
  method: "GET"
}).handler(createSsrRpc("7ed2909c23e3d871a910e9248e60ff5bcc07cced6703e4147025a47f75c0600a"));
const createCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(z.object({
  name: z.string().trim().min(1).max(80),
  sort_order: z.number().int().min(0).max(999).default(0)
})).handler(createSsrRpc("f77583a9471b3a2e1a4f8f9e0e36154211f89aeefebce8723b073255d502548d"));
const deleteCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(z.object({
  id: z.string().uuid()
})).handler(createSsrRpc("f474bf6273f5a18c6cc5ab7a1e03dbbd6091e0cc20a15e2ec3f36e561a6d03af"));
const serviceInput = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2e3).optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  performed_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  location: z.string().trim().max(200).optional().nullable(),
  code: z.string().trim().max(40).optional().nullable(),
  is_published: z.boolean().default(true)
});
const listServicesAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("44a01f434b29a5659d6e39112e6c906e33a178ff1567e236c46b77c5d79055c2"));
const createService = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(serviceInput).handler(createSsrRpc("8a9afb6e1ca1b03397ffc4863ff39b8fa46862949b0b8dcd668410e0a1153f89"));
const updateService = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(serviceInput.extend({
  id: z.string().uuid()
})).handler(createSsrRpc("f794c7dd65be4ac125cb831bfc785502112fd4fdd11439dba579bf1be06cedee"));
const deleteService = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(z.object({
  id: z.string().uuid()
})).handler(createSsrRpc("146b519ad693c72e06b09453d0c13b4b4bbd4f3430079c6fd6cbd31bd297d201"));
const listServiceMedia = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  service_id: z.string().uuid()
})).handler(createSsrRpc("2aae6ea7e41b9a64683f931374695ae00be68fae6f6f71f3c95a0c581fbd3afa"));
const registerUploadedMedia = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(z.object({
  service_id: z.string().uuid(),
  storage_path: z.string().min(1).max(500),
  kind: z.enum(["photo", "document"]),
  mime_type: z.string().max(120).optional().nullable(),
  size_bytes: z.number().int().nonnegative().optional().nullable(),
  caption: z.string().max(200).optional().nullable()
})).handler(createSsrRpc("c7d6d63425652a05ba0d4204d336b38d37d34c46417b4977582f244434ce70d4"));
const deleteServiceMedia = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(z.object({
  id: z.string().uuid()
})).handler(createSsrRpc("e5ca49100a50779c73b5e1ce0241ba6dc7b9c968e378851b9d377ff2997e4f4b"));
const listPublicServices = createServerFn({
  method: "GET"
}).handler(createSsrRpc("44380113e5ca354b7dcf8c54d43f0bdb8f90e8afebe9a672714ac3309ac76e84"));
const checkIsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d7ab752d5c5280d2ee84a9875749b1cba0d95c7bbe892baa67e4f3368bfac36c"));
const $$splitComponentImporter = () => import("./admin-NwK_510F.js");
const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{
      title: "Painel administrativo"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
function CategoriesPanel() {
  const qc = useQueryClient();
  const listFn = useServerFn(listCategories);
  const createFn = useServerFn(createCategory);
  const deleteFn = useServerFn(deleteCategory);
  const q = useQuery({
    queryKey: ["categories"],
    queryFn: () => listFn()
  });
  const [name, setName] = useState("");
  const createMut = useMutation({
    mutationFn: (data) => createFn({
      data
    }),
    onSuccess: () => {
      toast.success("Categoria criada.");
      setName("");
      qc.invalidateQueries({
        queryKey: ["categories"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: (id) => deleteFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("Categoria removida.");
      qc.invalidateQueries({
        queryKey: ["categories"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-[1fr_2fr]", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      if (!name.trim()) return;
      createMut.mutate({
        name: name.trim(),
        sort_order: (q.data?.length ?? 0) + 1
      });
    }, className: "space-y-3 rounded-lg border border-border bg-surface p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-mono-tech text-xs uppercase tracking-widest text-muted-foreground", children: "Nova categoria" }),
      /* @__PURE__ */ jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "ex.: Termografia", className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none" }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: createMut.isPending, className: "w-full rounded-full bg-brand px-4 py-2 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:opacity-50", children: "Criar" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground", children: "Categorias existentes" }),
      /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border rounded-lg border border-border", children: (q.data ?? []).map((c) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between px-4 py-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-foreground", children: c.name }),
          /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-[10px] uppercase text-muted-foreground", children: c.slug })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          if (confirm(`Remover "${c.name}"?`)) delMut.mutate(c.id);
        }, className: "text-xs text-destructive hover:underline", children: "Excluir" })
      ] }, c.id)) })
    ] })
  ] });
}
const emptyForm = {
  title: "",
  description: "",
  category_id: "",
  performed_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  location: "",
  code: "",
  is_published: true
};
function ServicesPanel() {
  const qc = useQueryClient();
  const listSvc = useServerFn(listServicesAdmin);
  const listCats = useServerFn(listCategories);
  const createSvc = useServerFn(createService);
  const updateSvc = useServerFn(updateService);
  const deleteSvc = useServerFn(deleteService);
  const svcQ = useQuery({
    queryKey: ["servicesAdmin"],
    queryFn: () => listSvc()
  });
  const catQ = useQuery({
    queryKey: ["categories"],
    queryFn: () => listCats()
  });
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }
  const saveMut = useMutation({
    mutationFn: async (f) => {
      const payload = {
        title: f.title,
        description: f.description || null,
        category_id: f.category_id || null,
        performed_at: f.performed_at,
        location: f.location || null,
        code: f.code || null,
        is_published: f.is_published
      };
      if (f.id) {
        return updateSvc({
          data: {
            ...payload,
            id: f.id
          }
        });
      }
      return createSvc({
        data: payload
      });
    },
    onSuccess: () => {
      toast.success(editingId ? "Serviço atualizado." : "Serviço criado.");
      resetForm();
      qc.invalidateQueries({
        queryKey: ["servicesAdmin"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const delMut = useMutation({
    mutationFn: (id) => deleteSvc({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("Serviço removido.");
      qc.invalidateQueries({
        queryKey: ["servicesAdmin"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const [mediaServiceId, setMediaServiceId] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-10 lg:grid-cols-[1.2fr_1fr]", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-4 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground", children: [
        "Serviços cadastrados (",
        svcQ.data?.length ?? 0,
        ")"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: (svcQ.data ?? []).map((s) => /* @__PURE__ */ jsx("li", { className: "rounded-lg border border-border bg-surface p-4 transition-colors hover:border-brand/40", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[10px] text-brand", children: s.performed_at?.replace(/-/g, ".") }),
            s.code && /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[10px] uppercase text-muted-foreground", children: s.code }),
            !s.is_published && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-destructive/10 px-2 py-0.5 font-mono-tech text-[9px] uppercase text-destructive", children: "rascunho" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1 text-base font-medium", children: s.title }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 font-mono-tech text-[10px] text-muted-foreground", children: [
            s.service_categories?.name ?? "sem categoria",
            " ·",
            " ",
            s.service_media?.length ?? 0,
            " mídia(s)"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => {
            setForm({
              id: s.id,
              title: s.title ?? "",
              description: s.description ?? "",
              category_id: s.category_id ?? "",
              performed_at: s.performed_at,
              location: s.location ?? "",
              code: s.code ?? "",
              is_published: s.is_published
            });
            setEditingId(s.id);
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }, className: "rounded border border-border px-2 py-1 font-mono-tech text-[10px] uppercase hover:bg-accent", children: "Editar" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setMediaServiceId(s.id), className: "rounded border border-brand/40 px-2 py-1 font-mono-tech text-[10px] uppercase text-brand hover:bg-brand/5", children: "Mídias" }),
          /* @__PURE__ */ jsx("button", { onClick: () => {
            if (confirm(`Excluir "${s.title}"? Todas as mídias serão removidas.`)) delMut.mutate(s.id);
          }, className: "rounded border border-destructive/40 px-2 py-1 font-mono-tech text-[10px] uppercase text-destructive hover:bg-destructive/5", children: "Excluir" })
        ] })
      ] }) }, s.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      saveMut.mutate(form);
    }, className: "sticky top-20 space-y-3 rounded-lg border border-border bg-surface p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-mono-tech text-xs uppercase tracking-widest text-muted-foreground", children: editingId ? "Editar serviço" : "Novo serviço" }),
      /* @__PURE__ */ jsx(Field, { label: "Título *", children: /* @__PURE__ */ jsx("input", { required: true, value: form.title, onChange: (e) => setForm({
        ...form,
        title: e.target.value
      }), className: inputCls }) }),
      /* @__PURE__ */ jsx(Field, { label: "Descrição", children: /* @__PURE__ */ jsx("textarea", { rows: 3, value: form.description, onChange: (e) => setForm({
        ...form,
        description: e.target.value
      }), className: inputCls }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Data *", children: /* @__PURE__ */ jsx("input", { type: "date", required: true, value: form.performed_at, onChange: (e) => setForm({
          ...form,
          performed_at: e.target.value
        }), className: inputCls }) }),
        /* @__PURE__ */ jsx(Field, { label: "Código", children: /* @__PURE__ */ jsx("input", { value: form.code, onChange: (e) => setForm({
          ...form,
          code: e.target.value
        }), placeholder: "SRV-025", className: inputCls }) })
      ] }),
      /* @__PURE__ */ jsx(Field, { label: "Categoria", children: /* @__PURE__ */ jsxs("select", { value: form.category_id, onChange: (e) => setForm({
        ...form,
        category_id: e.target.value
      }), className: inputCls, children: [
        /* @__PURE__ */ jsx("option", { value: "", children: "— sem categoria —" }),
        (catQ.data ?? []).map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
      ] }) }),
      /* @__PURE__ */ jsx(Field, { label: "Local", children: /* @__PURE__ */ jsx("input", { value: form.location, onChange: (e) => setForm({
        ...form,
        location: e.target.value
      }), className: inputCls }) }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: form.is_published, onChange: (e) => setForm({
          ...form,
          is_published: e.target.checked
        }) }),
        "Publicado na galeria"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: saveMut.isPending, className: "flex-1 rounded-full bg-brand px-4 py-2 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:opacity-50", children: editingId ? "Salvar alterações" : "Criar serviço" }),
        editingId && /* @__PURE__ */ jsx("button", { type: "button", onClick: resetForm, className: "rounded-full border border-border px-4 py-2 font-mono-tech text-xs uppercase tracking-widest hover:bg-accent", children: "Cancelar" })
      ] })
    ] }) }),
    mediaServiceId && /* @__PURE__ */ jsx(MediaDialog, { serviceId: mediaServiceId, onClose: () => setMediaServiceId(null) })
  ] });
}
const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none";
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("label", { className: "block space-y-1", children: [
    /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    children
  ] });
}
function MediaDialog({
  serviceId,
  onClose
}) {
  const qc = useQueryClient();
  const listFn = useServerFn(listServiceMedia);
  const registerFn = useServerFn(registerUploadedMedia);
  const deleteFn = useServerFn(deleteServiceMedia);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const q = useQuery({
    queryKey: ["media", serviceId],
    queryFn: () => listFn({
      data: {
        service_id: serviceId
      }
    })
  });
  const delMut = useMutation({
    mutationFn: (id) => deleteFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("Mídia removida.");
      qc.invalidateQueries({
        queryKey: ["media", serviceId]
      });
      qc.invalidateQueries({
        queryKey: ["servicesAdmin"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  async function handleFiles(files) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "bin";
        const path = `${serviceId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const {
          error: upErr
        } = await supabase.storage.from("service-media").upload(path, file, {
          contentType: file.type,
          upsert: false
        });
        if (upErr) throw upErr;
        const kind = file.type.startsWith("image/") ? "photo" : "document";
        await registerFn({
          data: {
            service_id: serviceId,
            storage_path: path,
            kind,
            mime_type: file.type || null,
            size_bytes: file.size,
            caption: null
          }
        });
      }
      toast.success("Upload concluído.");
      qc.invalidateQueries({
        queryKey: ["media", serviceId]
      });
      qc.invalidateQueries({
        queryKey: ["servicesAdmin"]
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha no upload.");
    } finally {
      setUploading(false);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { onClick: (e) => e.stopPropagation(), className: "max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-border bg-background p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-mono-tech text-xs uppercase tracking-widest text-brand", children: "Mídias do serviço" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-muted-foreground hover:text-foreground", children: "✕" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-lg border border-dashed border-border p-6 text-center", children: [
      /* @__PURE__ */ jsx("input", { ref: fileInputRef, type: "file", multiple: true, accept: "image/*,application/pdf", onChange: (e) => handleFiles(e.target.files), disabled: uploading, className: "hidden", id: "media-upload" }),
      /* @__PURE__ */ jsx("label", { htmlFor: "media-upload", className: "inline-flex cursor-pointer rounded-full bg-brand px-5 py-2 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground hover:opacity-90", children: uploading ? "Enviando..." : "Selecionar fotos / PDFs" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Suporta imagens (JPG, PNG) e documentos PDF. Múltiplos arquivos permitidos." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: [
      (q.data ?? []).map((m) => /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden rounded-lg border border-border", children: [
        m.kind === "photo" && m.url ? /* @__PURE__ */ jsx("img", { src: m.url, alt: "", className: "aspect-square w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "grid aspect-square place-items-center bg-surface text-center", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-2xl text-brand", children: "PDF" }),
          /* @__PURE__ */ jsx("a", { href: m.url ?? "#", target: "_blank", rel: "noreferrer", className: "mt-1 text-xs text-muted-foreground hover:text-brand", children: "abrir →" })
        ] }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          if (confirm("Remover esta mídia?")) delMut.mutate(m.id);
        }, className: "absolute right-1 top-1 rounded-full bg-background/90 px-2 py-1 text-[10px] text-destructive opacity-0 transition-opacity group-hover:opacity-100", children: "Excluir" })
      ] }, m.id)),
      q.data?.length === 0 && /* @__PURE__ */ jsx("p", { className: "col-span-full py-6 text-center text-sm text-muted-foreground", children: "Nenhuma mídia ainda." })
    ] })
  ] }) });
}
const SobreRoute = Route$b.update({
  id: "/sobre",
  path: "/sobre",
  getParentRoute: () => Route$c
});
const SitemapDotxmlRoute = Route$a.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$c
});
const ServicosRoute = Route$9.update({
  id: "/servicos",
  path: "/servicos",
  getParentRoute: () => Route$c
});
const ProjetosProgramacaoRoute = Route$8.update({
  id: "/projetos-programacao",
  path: "/projetos-programacao",
  getParentRoute: () => Route$c
});
const ProjetosEngenhariaRoute = Route$7.update({
  id: "/projetos-engenharia",
  path: "/projetos-engenharia",
  getParentRoute: () => Route$c
});
const ContatoRoute = Route$6.update({
  id: "/contato",
  path: "/contato",
  getParentRoute: () => Route$c
});
const CalculadorasRoute = Route$5.update({
  id: "/calculadoras",
  path: "/calculadoras",
  getParentRoute: () => Route$c
});
const AuthRoute = Route$4.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$c
});
const AcademicoRoute = Route$3.update({
  id: "/academico",
  path: "/academico",
  getParentRoute: () => Route$c
});
const AuthenticatedRouteRoute = Route$2.update({
  id: "/_authenticated",
  getParentRoute: () => Route$c
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const AuthenticatedAdminRoute = Route.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AcademicoRoute,
  AuthRoute,
  CalculadorasRoute,
  ContatoRoute,
  ProjetosEngenhariaRoute,
  ProjetosProgramacaoRoute,
  ServicosRoute,
  SitemapDotxmlRoute,
  SobreRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  CategoriesPanel as C,
  ServicesPanel as S,
  listCategories as a,
  createCategory as b,
  checkIsAdmin as c,
  deleteCategory as d,
  listServicesAdmin as e,
  createService as f,
  updateService as g,
  deleteService as h,
  listServiceMedia as i,
  deleteServiceMedia as j,
  router as k,
  listPublicServices as l,
  registerUploadedMedia as r,
  useServerFn as u
};
