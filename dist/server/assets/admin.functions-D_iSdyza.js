import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-DAVi1gpz.js";
import { z } from "zod";
import { r as requireSupabaseAuth } from "./auth-middleware-BCAtpUCP.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@supabase/supabase-js";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
async function assertAdmin(ctx) {
  const {
    data,
    error
  } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin"
  });
  if (error || !data) throw new Error("Forbidden: admin role required");
}
const listCategories_createServerFn_handler = createServerRpc({
  id: "7ed2909c23e3d871a910e9248e60ff5bcc07cced6703e4147025a47f75c0600a",
  name: "listCategories",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listCategories.__executeServer(opts));
const listCategories = createServerFn({
  method: "GET"
}).handler(listCategories_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.js");
  const {
    data,
    error
  } = await supabaseAdmin.from("service_categories").select("id, name, slug, sort_order").order("sort_order").order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});
const createCategory_createServerFn_handler = createServerRpc({
  id: "f77583a9471b3a2e1a4f8f9e0e36154211f89aeefebce8723b073255d502548d",
  name: "createCategory",
  filename: "src/lib/admin.functions.ts"
}, (opts) => createCategory.__executeServer(opts));
const createCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(z.object({
  name: z.string().trim().min(1).max(80),
  sort_order: z.number().int().min(0).max(999).default(0)
})).handler(createCategory_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const slug = data.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const {
    error
  } = await context.supabase.from("service_categories").insert({
    name: data.name,
    slug,
    sort_order: data.sort_order
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const deleteCategory_createServerFn_handler = createServerRpc({
  id: "f474bf6273f5a18c6cc5ab7a1e03dbbd6091e0cc20a15e2ec3f36e561a6d03af",
  name: "deleteCategory",
  filename: "src/lib/admin.functions.ts"
}, (opts) => deleteCategory.__executeServer(opts));
const deleteCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(z.object({
  id: z.string().uuid()
})).handler(deleteCategory_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    error
  } = await context.supabase.from("service_categories").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const serviceInput = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2e3).optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  performed_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  location: z.string().trim().max(200).optional().nullable(),
  code: z.string().trim().max(40).optional().nullable(),
  is_published: z.boolean().default(true)
});
const listServicesAdmin_createServerFn_handler = createServerRpc({
  id: "44a01f434b29a5659d6e39112e6c906e33a178ff1567e236c46b77c5d79055c2",
  name: "listServicesAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listServicesAdmin.__executeServer(opts));
const listServicesAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listServicesAdmin_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    data,
    error
  } = await context.supabase.from("services").select("id, code, title, description, performed_at, location, is_published, category_id, service_categories(name), service_media(id)").order("performed_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const createService_createServerFn_handler = createServerRpc({
  id: "8a9afb6e1ca1b03397ffc4863ff39b8fa46862949b0b8dcd668410e0a1153f89",
  name: "createService",
  filename: "src/lib/admin.functions.ts"
}, (opts) => createService.__executeServer(opts));
const createService = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(serviceInput).handler(createService_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    data: inserted,
    error
  } = await context.supabase.from("services").insert(data).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: inserted.id
  };
});
const updateService_createServerFn_handler = createServerRpc({
  id: "f794c7dd65be4ac125cb831bfc785502112fd4fdd11439dba579bf1be06cedee",
  name: "updateService",
  filename: "src/lib/admin.functions.ts"
}, (opts) => updateService.__executeServer(opts));
const updateService = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(serviceInput.extend({
  id: z.string().uuid()
})).handler(updateService_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    id,
    ...patch
  } = data;
  const {
    error
  } = await context.supabase.from("services").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const deleteService_createServerFn_handler = createServerRpc({
  id: "146b519ad693c72e06b09453d0c13b4b4bbd4f3430079c6fd6cbd31bd297d201",
  name: "deleteService",
  filename: "src/lib/admin.functions.ts"
}, (opts) => deleteService.__executeServer(opts));
const deleteService = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(z.object({
  id: z.string().uuid()
})).handler(deleteService_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    data: media
  } = await context.supabase.from("service_media").select("storage_path").eq("service_id", data.id);
  if (media && media.length > 0) {
    await context.supabase.storage.from("service-media").remove(media.map((m) => m.storage_path));
  }
  const {
    error
  } = await context.supabase.from("services").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const listServiceMedia_createServerFn_handler = createServerRpc({
  id: "2aae6ea7e41b9a64683f931374695ae00be68fae6f6f71f3c95a0c581fbd3afa",
  name: "listServiceMedia",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listServiceMedia.__executeServer(opts));
const listServiceMedia = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  service_id: z.string().uuid()
})).handler(listServiceMedia_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.js");
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("service_media").select("id, storage_path, kind, caption, mime_type, sort_order").eq("service_id", data.service_id).order("sort_order");
  if (error) throw new Error(error.message);
  if (!rows || rows.length === 0) return [];
  const {
    data: signed,
    error: sErr
  } = await supabaseAdmin.storage.from("service-media").createSignedUrls(rows.map((r) => r.storage_path), 60 * 60);
  if (sErr) throw new Error(sErr.message);
  return rows.map((r, i) => ({
    ...r,
    url: signed?.[i]?.signedUrl ?? null
  }));
});
const registerUploadedMedia_createServerFn_handler = createServerRpc({
  id: "c7d6d63425652a05ba0d4204d336b38d37d34c46417b4977582f244434ce70d4",
  name: "registerUploadedMedia",
  filename: "src/lib/admin.functions.ts"
}, (opts) => registerUploadedMedia.__executeServer(opts));
const registerUploadedMedia = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(z.object({
  service_id: z.string().uuid(),
  storage_path: z.string().min(1).max(500),
  kind: z.enum(["photo", "document"]),
  mime_type: z.string().max(120).optional().nullable(),
  size_bytes: z.number().int().nonnegative().optional().nullable(),
  caption: z.string().max(200).optional().nullable()
})).handler(registerUploadedMedia_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    error
  } = await context.supabase.from("service_media").insert(data);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const deleteServiceMedia_createServerFn_handler = createServerRpc({
  id: "e5ca49100a50779c73b5e1ce0241ba6dc7b9c968e378851b9d377ff2997e4f4b",
  name: "deleteServiceMedia",
  filename: "src/lib/admin.functions.ts"
}, (opts) => deleteServiceMedia.__executeServer(opts));
const deleteServiceMedia = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator(z.object({
  id: z.string().uuid()
})).handler(deleteServiceMedia_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    data: row,
    error: fErr
  } = await context.supabase.from("service_media").select("storage_path").eq("id", data.id).single();
  if (fErr) throw new Error(fErr.message);
  await context.supabase.storage.from("service-media").remove([row.storage_path]);
  const {
    error
  } = await context.supabase.from("service_media").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const listPublicServices_createServerFn_handler = createServerRpc({
  id: "44380113e5ca354b7dcf8c54d43f0bdb8f90e8afebe9a672714ac3309ac76e84",
  name: "listPublicServices",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listPublicServices.__executeServer(opts));
const listPublicServices = createServerFn({
  method: "GET"
}).handler(listPublicServices_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.js");
  const {
    data,
    error
  } = await supabaseAdmin.from("services").select("id, code, title, description, performed_at, location, category_id, service_categories(name, slug), service_media(id, storage_path, kind)").eq("is_published", true).order("performed_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  const rows = data ?? [];
  const allPaths = [];
  for (const s of rows) {
    for (const m of s.service_media ?? []) allPaths.push(m.storage_path);
  }
  let urlMap = /* @__PURE__ */ new Map();
  if (allPaths.length > 0) {
    const {
      data: signed
    } = await supabaseAdmin.storage.from("service-media").createSignedUrls(allPaths, 60 * 60);
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
    category: s.service_categories?.name ?? null,
    media: (s.service_media ?? []).map((m) => ({
      id: m.id,
      kind: m.kind,
      url: urlMap.get(m.storage_path) ?? null
    }))
  }));
});
const checkIsAdmin_createServerFn_handler = createServerRpc({
  id: "d7ab752d5c5280d2ee84a9875749b1cba0d95c7bbe892baa67e4f3368bfac36c",
  name: "checkIsAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => checkIsAdmin.__executeServer(opts));
const checkIsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(checkIsAdmin_createServerFn_handler, async ({
  context
}) => {
  const {
    data
  } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin"
  });
  return {
    isAdmin: !!data,
    userId: context.userId
  };
});
export {
  checkIsAdmin_createServerFn_handler,
  createCategory_createServerFn_handler,
  createService_createServerFn_handler,
  deleteCategory_createServerFn_handler,
  deleteServiceMedia_createServerFn_handler,
  deleteService_createServerFn_handler,
  listCategories_createServerFn_handler,
  listPublicServices_createServerFn_handler,
  listServiceMedia_createServerFn_handler,
  listServicesAdmin_createServerFn_handler,
  registerUploadedMedia_createServerFn_handler,
  updateService_createServerFn_handler
};
