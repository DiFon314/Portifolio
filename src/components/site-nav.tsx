import { Link } from "@tanstack/react-router";
import { UserBadge } from "@/components/user-badge";

const links = [
  { to: "/projetos-engenharia", label: "Engenharia" },
  { to: "/projetos-programacao", label: "Software" },
  { to: "/servicos", label: "Serviços" },
  { to: "/academico", label: "Acadêmico" },
  { to: "/calculadoras", label: "Calculadoras" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="size-2.5 animate-pulse rounded-full bg-brand" aria-hidden />
          <span className="font-mono-tech text-sm font-medium uppercase tracking-tighter text-foreground">
            Diogo Fonseca <span className="text-muted-foreground">// Terminal</span>
          </span>
        </Link>

        <div className="hidden gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand"
              activeProps={{ className: "text-brand" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contato"
            className="rounded-full border border-brand/20 px-4 py-1.5 font-mono-tech text-[11px] uppercase tracking-widest text-brand transition-colors hover:bg-brand/5"
          >
            Contato
          </Link>
          <UserBadge />
        </div>
      </div>
    </nav>
  );
}
