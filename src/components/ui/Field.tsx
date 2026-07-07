import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const shared =
  "w-full rounded-xl border border-white/10 bg-obsidian-1/80 px-4 py-3 text-sm text-silver-100 placeholder:text-silver-600 transition-colors focus:border-volt/60 focus:outline-none";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
}

export function TextField({
  label,
  name,
  error,
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="hud-label mb-2 block">
        {label}
      </label>
      <input id={name} name={name} className={shared} {...rest} />
      {error && (
        <p className="mt-1.5 text-xs text-err" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextArea({
  label,
  name,
  error,
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={name} className="hud-label mb-2 block">
        {label}
      </label>
      <textarea id={name} name={name} rows={4} className={shared} {...rest} />
      {error && (
        <p className="mt-1.5 text-xs text-err" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
