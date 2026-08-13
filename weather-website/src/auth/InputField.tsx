import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

type InputFieldProps = {
  icon: LucideIcon;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
};

export default function InputField({
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
  isPassword = false,
}: InputFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative flex items-center">
      <Icon
        size={18}
        strokeWidth={1.75}
        className="pointer-events-none absolute left-3.5 text-slate-400"
      />

      <input
        type={isPassword ? (visible ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full rounded-xl border border-slate-200 bg-slate-50
          py-3.5 pl-11 pr-4 text-sm text-slate-800
          placeholder:text-slate-400
          outline-none transition-colors
          focus:border-blue-500 focus:bg-white
        "
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3.5 text-slate-400 hover:text-slate-600"
        >
          {visible ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
        </button>
      )}
    </div>
  );
}