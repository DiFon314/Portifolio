import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-BAqQwQ8R.js";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import { toast } from "sonner";
import "@supabase/supabase-js";
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({
      data
    }) => {
      if (data.user) navigate({
        to: "/admin"
      });
    });
  }, [navigate]);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("Sessão iniciada.");
        navigate({
          to: "/admin"
        });
      } else {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`
          }
        });
        if (error) throw error;
        toast.success("Conta criada. Você já pode entrar.");
        setMode("login");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha na autenticação.");
    } finally {
      setLoading(false);
    }
  }
  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/admin`
    });
    if (result.error) {
      toast.error("Falha no login com Google.");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({
      to: "/admin"
    });
  }
  return /* @__PURE__ */ jsxs("section", { className: "mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16", children: [
    /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-xs uppercase tracking-widest text-brand", children: "[ admin ] acesso restrito" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-3 text-3xl font-light text-foreground", children: mode === "login" ? "Entrar no painel" : "Criar conta" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Área administrativa do portfólio. Apenas administradores autorizados podem gerenciar serviços e mídias." }),
    /* @__PURE__ */ jsxs("button", { type: "button", onClick: handleGoogle, disabled: loading, className: "mt-8 flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", className: "size-4", "aria-hidden": true, children: [
        /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M22.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h5.9c-.3 1.4-1 2.5-2.2 3.3v2.8h3.5c2.1-1.9 3.3-4.7 3.3-8.3z" }),
        /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M12 23c2.9 0 5.4-1 7.2-2.6l-3.5-2.8c-1 .7-2.3 1.1-3.7 1.1-2.8 0-5.3-1.9-6.1-4.5H2.3v2.8C4.1 20.6 7.8 23 12 23z" }),
        /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M5.9 14.2c-.2-.6-.3-1.3-.3-2.2s.1-1.5.3-2.2V7H2.3C1.5 8.5 1 10.2 1 12s.5 3.5 1.3 5l3.6-2.8z" }),
        /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M12 5.4c1.6 0 3 .5 4.1 1.6l3.1-3.1C17.4 2.1 14.9 1 12 1 7.8 1 4.1 3.4 2.3 7l3.6 2.8C6.7 7.3 9.2 5.4 12 5.4z" })
      ] }),
      "Continuar com Google"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "my-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-border" }),
      /* @__PURE__ */ jsx("span", { className: "font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground", children: "ou e-mail" }),
      /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-border" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx("label", { className: "font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground", children: "E-mail" }),
      /* @__PURE__ */ jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none" }),
      /* @__PURE__ */ jsx("label", { className: "mt-2 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground", children: "Senha" }),
      /* @__PURE__ */ jsx("input", { type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), className: "rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none" }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "mt-4 rounded-full bg-brand px-5 py-2.5 font-mono-tech text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50", children: loading ? "Aguarde..." : mode === "login" ? "Entrar →" : "Criar conta →" })
    ] }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setMode(mode === "login" ? "signup" : "login"), className: "mt-6 text-center text-xs text-muted-foreground transition-colors hover:text-brand", children: mode === "login" ? "Não tem conta? Criar →" : "Já tem conta? Entrar →" })
  ] });
}
export {
  AuthPage as component
};
