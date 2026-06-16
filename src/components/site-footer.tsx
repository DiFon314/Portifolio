import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div className="space-y-3">
          <div className="font-mono-tech text-xs uppercase tracking-widest text-foreground">Status</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
            Disponível para novos projetos
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono-tech text-xs uppercase tracking-widest text-foreground">Contato</div>
          <a
            href="mailto:diogo.coucello@gmail.com"
            className="block text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            diogo.coucello@gmail.com
          </a>
          <Link
            to="/contato"
            className="block text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            Solicitar orçamento
          </Link>
        </div>

        <div className="space-y-3">
          <div className="font-mono-tech text-xs uppercase tracking-widest text-foreground">Stack</div>
          <p className="font-mono-tech text-[11px] uppercase leading-relaxed tracking-tighter text-muted-foreground">
            React / TanStack Start / Tailwind / Lovable Cloud / NBR 5410
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-10">
        <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Diogo Fonseca — Engenharia & Código
        </div>
      </div>
    </footer>
  );
}
