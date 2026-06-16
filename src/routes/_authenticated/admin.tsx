import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  listCategories,
  createCategory,
  deleteCategory,
  listServicesAdmin,
  createService,
  updateService,
  deleteService,
  listServiceMedia,
  registerUploadedMedia,
  deleteServiceMedia,
  checkIsAdmin,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"services" | "categories">("services");

  const checkAdmin = useServerFn(checkIsAdmin);
  const adminQuery = useQuery({ queryKey: ["isAdmin"], queryFn: () => checkAdmin() });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (adminQuery.isLoading) {
    return <div className="p-12 text-center text-muted-foreground">Verificando acesso...</div>;
  }
  if (!adminQuery.data?.isAdmin) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <div className="font-mono-tech text-xs uppercase tracking-widest text-destructive">
          Acesso negado
        </div>
        <h1 className="mt-3 text-2xl font-light">Você não é administrador</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sua conta foi autenticada mas não tem permissão de administrador.
        </p>
        <button
          onClick={signOut}
          className="mt-6 rounded-full border border-border px-4 py-2 font-mono-tech text-xs uppercase tracking-widest hover:bg-accent"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-10 flex items-end justify-between gap-4">
        <div>
          <div className="font-mono-tech text-xs uppercase tracking-widest text-brand">
            [ admin ] painel de controle
          </div>
          <h1 className="mt-2 text-3xl font-light">Gerenciar portfólio de serviços</h1>
        </div>
        <button
          onClick={signOut}
          className="rounded-full border border-border px-4 py-2 font-mono-tech text-[11px] uppercase tracking-widest hover:bg-accent"
        >
          Sair
        </button>
      </header>

      <div className="mb-8 flex gap-1 border-b border-border">
        {(["services", "categories"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 font-mono-tech text-xs uppercase tracking-widest transition-colors ${
              tab === t
                ? "border-brand text-brand"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "services" ? "Serviços" : "Categorias"}
          </button>
        ))}
      </div>

      {tab === "services" ? <ServicesPanel /> : <CategoriesPanel />}

      <div className="mt-12 text-center">
        <Link to="/servicos" className="font-mono-tech text-xs text-muted-foreground hover:text-brand">
          ↗ Ver galeria pública
        </Link>
      </div>
    </section>
  );
}

// ===================== CATEGORIES =====================
export function CategoriesPanel() {
  const qc = useQueryClient();
  const listFn = useServerFn(listCategories);
  const createFn = useServerFn(createCategory);
  const deleteFn = useServerFn(deleteCategory);

  const q = useQuery({ queryKey: ["categories"], queryFn: () => listFn() });
  const [name, setName] = useState("");

  const createMut = useMutation({
    mutationFn: (data: { name: string; sort_order: number }) => createFn({ data }),
    onSuccess: () => {
      toast.success("Categoria criada.");
      setName("");
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const delMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Categoria removida.");
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          createMut.mutate({ name: name.trim(), sort_order: (q.data?.length ?? 0) + 1 });
        }}
        className="space-y-3 rounded-lg border border-border bg-surface p-5"
      >
        <h2 className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">
          Nova categoria
        </h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex.: Termografia"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
        <button
          type="submit"
          disabled={createMut.isPending}
          className="w-full rounded-full bg-brand px-4 py-2 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          Criar
        </button>
      </form>

      <div>
        <h2 className="mb-4 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">
          Categorias existentes
        </h2>
        <ul className="divide-y divide-border rounded-lg border border-border">
          {(q.data ?? []).map((c) => (
            <li key={c.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-sm text-foreground">{c.name}</div>
                <div className="font-mono-tech text-[10px] uppercase text-muted-foreground">
                  {c.slug}
                </div>
              </div>
              <button
                onClick={() => {
                  if (confirm(`Remover "${c.name}"?`)) delMut.mutate(c.id);
                }}
                className="text-xs text-destructive hover:underline"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ===================== SERVICES =====================
type ServiceForm = {
  id?: string;
  title: string;
  description: string;
  category_id: string;
  performed_at: string;
  location: string;
  code: string;
  is_published: boolean;
};

const emptyForm: ServiceForm = {
  title: "",
  description: "",
  category_id: "",
  performed_at: new Date().toISOString().slice(0, 10),
  location: "",
  code: "",
  is_published: true,
};

export function ServicesPanel() {
  const qc = useQueryClient();
  const listSvc = useServerFn(listServicesAdmin);
  const listCats = useServerFn(listCategories);
  const createSvc = useServerFn(createService);
  const updateSvc = useServerFn(updateService);
  const deleteSvc = useServerFn(deleteService);

  const svcQ = useQuery({ queryKey: ["servicesAdmin"], queryFn: () => listSvc() });
  const catQ = useQuery({ queryKey: ["categories"], queryFn: () => listCats() });

  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  const saveMut = useMutation({
    mutationFn: async (f: ServiceForm) => {
      const payload = {
        title: f.title,
        description: f.description || null,
        category_id: f.category_id || null,
        performed_at: f.performed_at,
        location: f.location || null,
        code: f.code || null,
        is_published: f.is_published,
      };
      if (f.id) {
        return updateSvc({ data: { ...payload, id: f.id } });
      }
      return createSvc({ data: payload });
    },
    onSuccess: () => {
      toast.success(editingId ? "Serviço atualizado." : "Serviço criado.");
      resetForm();
      qc.invalidateQueries({ queryKey: ["servicesAdmin"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => deleteSvc({ data: { id } }),
    onSuccess: () => {
      toast.success("Serviço removido.");
      qc.invalidateQueries({ queryKey: ["servicesAdmin"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const [mediaServiceId, setMediaServiceId] = useState<string | null>(null);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <h2 className="mb-4 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">
          Serviços cadastrados ({svcQ.data?.length ?? 0})
        </h2>
        <ul className="space-y-2">
          {(svcQ.data ?? []).map((s: any) => (
            <li
              key={s.id}
              className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-brand/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-[10px] text-brand">
                      {s.performed_at?.replace(/-/g, ".")}
                    </span>
                    {s.code && (
                      <span className="font-mono-tech text-[10px] uppercase text-muted-foreground">
                        {s.code}
                      </span>
                    )}
                    {!s.is_published && (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 font-mono-tech text-[9px] uppercase text-destructive">
                        rascunho
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 text-base font-medium">{s.title}</h3>
                  <div className="mt-1 font-mono-tech text-[10px] text-muted-foreground">
                    {s.service_categories?.name ?? "sem categoria"} ·{" "}
                    {s.service_media?.length ?? 0} mídia(s)
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setForm({
                        id: s.id,
                        title: s.title ?? "",
                        description: s.description ?? "",
                        category_id: s.category_id ?? "",
                        performed_at: s.performed_at,
                        location: s.location ?? "",
                        code: s.code ?? "",
                        is_published: s.is_published,
                      });
                      setEditingId(s.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="rounded border border-border px-2 py-1 font-mono-tech text-[10px] uppercase hover:bg-accent"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setMediaServiceId(s.id)}
                    className="rounded border border-brand/40 px-2 py-1 font-mono-tech text-[10px] uppercase text-brand hover:bg-brand/5"
                  >
                    Mídias
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Excluir "${s.title}"? Todas as mídias serão removidas.`))
                        delMut.mutate(s.id);
                    }}
                    className="rounded border border-destructive/40 px-2 py-1 font-mono-tech text-[10px] uppercase text-destructive hover:bg-destructive/5"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMut.mutate(form);
          }}
          className="sticky top-20 space-y-3 rounded-lg border border-border bg-surface p-5"
        >
          <h2 className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">
            {editingId ? "Editar serviço" : "Novo serviço"}
          </h2>

          <Field label="Título *">
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="Descrição">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Data *">
              <input
                type="date"
                required
                value={form.performed_at}
                onChange={(e) => setForm({ ...form, performed_at: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Código">
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="SRV-025"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Categoria">
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className={inputCls}
            >
              <option value="">— sem categoria —</option>
              {(catQ.data ?? []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Local">
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className={inputCls}
            />
          </Field>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
            />
            Publicado na galeria
          </label>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saveMut.isPending}
              className="flex-1 rounded-full bg-brand px-4 py-2 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {editingId ? "Salvar alterações" : "Criar serviço"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-border px-4 py-2 font-mono-tech text-xs uppercase tracking-widest hover:bg-accent"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {mediaServiceId && (
        <MediaDialog serviceId={mediaServiceId} onClose={() => setMediaServiceId(null)} />
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

// ===================== MEDIA DIALOG =====================
function MediaDialog({ serviceId, onClose }: { serviceId: string; onClose: () => void }) {
  const qc = useQueryClient();
  const listFn = useServerFn(listServiceMedia);
  const registerFn = useServerFn(registerUploadedMedia);
  const deleteFn = useServerFn(deleteServiceMedia);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const q = useQuery({
    queryKey: ["media", serviceId],
    queryFn: () => listFn({ data: { service_id: serviceId } }),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Mídia removida.");
      qc.invalidateQueries({ queryKey: ["media", serviceId] });
      qc.invalidateQueries({ queryKey: ["servicesAdmin"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "bin";
        const path = `${serviceId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("service-media")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (upErr) throw upErr;
        const kind = file.type.startsWith("image/") ? "photo" : "document";
        await registerFn({
          data: {
            service_id: serviceId,
            storage_path: path,
            kind,
            mime_type: file.type || null,
            size_bytes: file.size,
            caption: null,
          },
        });
      }
      toast.success("Upload concluído.");
      qc.invalidateQueries({ queryKey: ["media", serviceId] });
      qc.invalidateQueries({ queryKey: ["servicesAdmin"] });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha no upload.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-border bg-background p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-mono-tech text-xs uppercase tracking-widest text-brand">
            Mídias do serviço
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>

        <div className="mb-6 rounded-lg border border-dashed border-border p-6 text-center">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={uploading}
            className="hidden"
            id="media-upload"
          />
          <label
            htmlFor="media-upload"
            className="inline-flex cursor-pointer rounded-full bg-brand px-5 py-2 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground hover:opacity-90"
          >
            {uploading ? "Enviando..." : "Selecionar fotos / PDFs"}
          </label>
          <p className="mt-2 text-xs text-muted-foreground">
            Suporta imagens (JPG, PNG) e documentos PDF. Múltiplos arquivos permitidos.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {(q.data ?? []).map((m: any) => (
            <div key={m.id} className="group relative overflow-hidden rounded-lg border border-border">
              {m.kind === "photo" && m.url ? (
                <img src={m.url} alt="" className="aspect-square w-full object-cover" />
              ) : (
                <div className="grid aspect-square place-items-center bg-surface text-center">
                  <div>
                    <div className="font-mono-tech text-2xl text-brand">PDF</div>
                    <a
                      href={m.url ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 text-xs text-muted-foreground hover:text-brand"
                    >
                      abrir →
                    </a>
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  if (confirm("Remover esta mídia?")) delMut.mutate(m.id);
                }}
                className="absolute right-1 top-1 rounded-full bg-background/90 px-2 py-1 text-[10px] text-destructive opacity-0 transition-opacity group-hover:opacity-100"
              >
                Excluir
              </button>
            </div>
          ))}
          {q.data?.length === 0 && (
            <p className="col-span-full py-6 text-center text-sm text-muted-foreground">
              Nenhuma mídia ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
