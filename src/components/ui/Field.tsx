import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

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

export function SelectField({
  label,
  name,
  error,
  options,
  placeholder,
  ...rest
}: BaseProps & { options: string[]; placeholder?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={name} className="hud-label mb-2 block">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className={`${shared} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%23888%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
        {...rest}
      >
        <option value="" disabled>
          {placeholder ?? "Select an option"}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-obsidian-1 text-silver-100">
            {o}
          </option>
        ))}
      </select>
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
