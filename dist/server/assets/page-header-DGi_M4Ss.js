import { jsxs, jsx } from "react/jsx-runtime";
function PageHeader({
  eyebrow,
  title,
  description,
  children
}) {
  return /* @__PURE__ */ jsxs("header", { className: "mx-auto max-w-7xl px-6 pt-16 pb-12", children: [
    /* @__PURE__ */ jsx("div", { className: "font-mono-tech text-xs uppercase tracking-[0.3em] text-brand", children: eyebrow }),
    /* @__PURE__ */ jsx("h1", { className: "mt-4 max-w-3xl text-4xl font-light tracking-tight text-foreground md:text-6xl", children: title }),
    description ? /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-base text-muted-foreground md:text-lg", children: description }) : null,
    children,
    /* @__PURE__ */ jsx("div", { className: "mt-10 h-px w-full bg-border" })
  ] });
}
export {
  PageHeader as P
};
