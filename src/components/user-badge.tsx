import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export function UserBadge() {
  const [email, setEmail] = useState<string | null>(null);
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
    return (
      <Link
        to="/auth"
        className="rounded-full border border-border px-3 py-1.5 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-brand hover:text-brand"
      >
        Entrar
      </Link>
    );
  }

  const initial = email[0]?.toUpperCase() ?? "?";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 py-1 pl-1 pr-3 transition-colors hover:bg-brand/10"
        title={email}
      >
        <span className="grid size-6 place-items-center rounded-full bg-brand text-[11px] font-medium text-primary-foreground">
          {initial}
        </span>
        <span className="hidden font-mono-tech text-[10px] uppercase tracking-widest text-brand sm:inline">
          {email.split("@")[0]}
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-background p-3 shadow-xl">
            <div className="border-b border-border pb-2">
              <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                Logado como
              </div>
              <div className="mt-1 truncate text-sm text-foreground">{email}</div>
            </div>
            <button
              onClick={signOut}
              className="mt-2 w-full rounded-md px-2 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              Sair
            </button>
          </div>
        </>
      )}
    </div>
  );
}
