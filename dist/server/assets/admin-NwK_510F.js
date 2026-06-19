import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { u as useServerFn, a as listCategories, b as createCategory, d as deleteCategory, e as listServicesAdmin, f as createService, g as updateService, h as deleteService, c as checkIsAdmin, i as listServiceMedia, r as registerUploadedMedia, j as deleteServiceMedia } from "./router-Bbl26cC3.js";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { s as supabase } from "./client-BAqQwQ8R.js";
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
function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState("services");
  const checkAdmin = useServerFn(checkIsAdmin);
  const adminQuery = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => checkAdmin()
  });
  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({
      to: "/auth",
      replace: true
    });
  }
  if (adminQuery.isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-muted-foreground", children: "Verificando acesso..." });
  }
  if (!adminQuery.data?.isAdmin) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md px-6 py-20 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-xs uppercase tracking-widest text-destructive", children: "Acesso negado" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 text-2xl font-light", children: "Você não é administrador" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sua conta foi autenticada mas não tem permissão de administrador." }),
      /* @__PURE__ */ jsx("button", { onClick: signOut, className: "mt-6 rounded-full border border-border px-4 py-2 font-mono-tech text-xs uppercase tracking-widest hover:bg-accent", children: "Sair" })
    ] });
  }
  return /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-6 py-16", children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-10 flex items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-xs uppercase tracking-widest text-brand", children: "[ admin ] painel de controle" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-light", children: "Gerenciar portfólio de serviços" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: signOut, className: "rounded-full border border-border px-4 py-2 font-mono-tech text-[11px] uppercase tracking-widest hover:bg-accent", children: "Sair" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-8 flex gap-1 border-b border-border", children: ["services", "categories"].map((t) => /* @__PURE__ */ jsx("button", { onClick: () => setTab(t), className: `-mb-px border-b-2 px-4 py-2 font-mono-tech text-xs uppercase tracking-widest transition-colors ${tab === t ? "border-brand text-brand" : "border-transparent text-muted-foreground hover:text-foreground"}`, children: t === "services" ? "Serviços" : "Categorias" }, t)) }),
    tab === "services" ? /* @__PURE__ */ jsx(ServicesPanel, {}) : /* @__PURE__ */ jsx(CategoriesPanel, {}),
    /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsx(Link, { to: "/servicos", className: "font-mono-tech text-xs text-muted-foreground hover:text-brand", children: "↗ Ver galeria pública" }) })
  ] });
}
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
export {
  CategoriesPanel,
  ServicesPanel,
  AdminPage as component
};
