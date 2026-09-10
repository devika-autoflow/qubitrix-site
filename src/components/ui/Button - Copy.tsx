import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "chip";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "btn-aurora-border rounded-full bg-obsidian-2/90 px-7 py-3 text-sm text-silver-100 hover:bg-obsidian-3",
  ghost:
    "rounded-full border border-white/10 px-7 py-3 text-sm text-silver-400 hover:text-silver-100 hover:border-white/20",
  chip: "rounded-lg border border-white/8 bg-obsidian-2/60 px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-silver-400 hover:text-silver-100 hover:border-white/16",
};

type ButtonProps = { variant?: Variant; children: ReactNode } & (
  | ({ as?: "button" } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>)
);

export default function Button(props: ButtonProps) {
  const { variant = "primary", children, ...rest } = props;
  const cls = `${base} ${variants[variant]} ${"className" in rest && rest.className ? rest.className : ""}`;

  if (rest.as === "a") {
    const { as: _a, className: _c, ...aProps } = rest;
    return (
      <a {...aProps} className={cls}>
        {children}
      </a>
    );
  }
  const { as: _b, className: _c2, ...bProps } = rest as ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
  return (
    <button {...bProps} className={cls}>
      {children}
    </button>
  );
}
