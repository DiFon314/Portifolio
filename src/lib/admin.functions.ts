import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden: admin role required");
}

// ===== CATEGORIES =====
export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("service_categories")
    .select("id, name, slug, sort_order")
    .order("sort_order")
    .order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const createCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      name: z.string().trim().min(1).max(80),
      sort_order: z.number().int().min(0).max(999).default(0),
    }),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const slug = data.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const { error } = await context.supabase
      .from("service_categories")
      .insert({ name: data.name, slug, sort_order: data.sort_order });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("service_categories")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ===== SERVICES =====
const serviceInput = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  performed_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  location: z.string().trim().max(200).optional().nullable(),
  code: z.string().trim().max(40).optional().nullable(),
  is_published: z.boolean().default(true),
});

export const listServicesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("services")
      .select(
        "id, code, title, description, performed_at, location, is_published, category_id, service_categories(name), service_media(id)",
      )
      .order("performed_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const createService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(serviceInput)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: inserted, error } = await context.supabase
      .from("services")
      .insert(data)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: inserted.id };
  });

export const updateService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(serviceInput.extend({ id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...patch } = data;
    const { error } = await context.supabase.from("services").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    // also delete media files from storage
    const { data: media } = await context.supabase
      .from("service_media")
      .select("storage_path")
      .eq("service_id", data.id);
    if (media && media.length > 0) {
      await context.supabase.storage
        .from("service-media")
        .remove(media.map((m: { storage_path: string }) => m.storage_path));
    }
    const { error } = await context.supabase.from("services").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ===== MEDIA =====
export const listServiceMedia = createServerFn({ method: "POST" })
  .inputValidator(z.object({ service_id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("service_media")
      .select("id, storage_path, kind, caption, mime_type, sort_order")
      .eq("service_id", data.service_id)
      .order("sort_order");
    if (error) throw new Error(error.message);
    if (!rows || rows.length === 0) return [];
    const { data: signed, error: sErr } = await supabaseAdmin.storage
      .from("service-media")
      .createSignedUrls(
        rows.map((r) => r.storage_path),
        60 * 60,
      );
    if (sErr) throw new Error(sErr.message);
    return rows.map((r, i) => ({ ...r, url: signed?.[i]?.signedUrl ?? null }));
  });

export const registerUploadedMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      service_id: z.string().uuid(),
      storage_path: z.string().min(1).max(500),
      kind: z.enum(["photo", "document"]),
      mime_type: z.string().max(120).optional().nullable(),
      size_bytes: z.number().int().nonnegative().optional().nullable(),
      caption: z.string().max(200).optional().nullable(),
    }),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("service_media").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteServiceMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: row, error: fErr } = await context.supabase
      .from("service_media")
      .select("storage_path")
      .eq("id", data.id)
      .single();
    if (fErr) throw new Error(fErr.message);
    await context.supabase.storage.from("service-media").remove([row.storage_path]);
    const { error } = await context.supabase.from("service_media").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ===== PUBLIC GALLERY =====
export const listPublicServices = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("services")
    .select(
      "id, code, title, description, performed_at, location, category_id, service_categories(name, slug), service_media(id, storage_path, kind)",
    )
    .eq("is_published", true)
    .order("performed_at", { ascending: false });
    if (error) throw new Error(error.message);
    const rows = data ?? [];

    // Generate signed URLs for all media paths in one batch
    const allPaths: string[] = [];
    for (const s of rows) {
      for (const m of s.service_media ?? []) allPaths.push(m.storage_path);
    }
    let urlMap = new Map<string, string>();
    if (allPaths.length > 0) {
      const { data: signed } = await supabaseAdmin.storage
        .from("service-media")
        .createSignedUrls(allPaths, 60 * 60);
      signed?.forEach((s, i) => {
        if (s.signedUrl) urlMap.set(allPaths[i], s.signedUrl);
      });
    }
    return rows.map((s) => ({
      id: s.id,
      code: s.code,
      title: s.title,
      description: s.description,
      performed_at: s.performed_at,
      location: s.location,
      category: (s.service_categories as { name: string; slug: string } | null)?.name ?? null,
      media: (s.service_media ?? []).map((m: { id: string; storage_path: string; kind: string }) => ({
        id: m.id,
        kind: m.kind,
        url: urlMap.get(m.storage_path) ?? null,
      })),
    }));
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: !!data, userId: context.userId };
  });
