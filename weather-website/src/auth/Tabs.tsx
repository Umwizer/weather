type TabsProps = {
  active: "login" | "register";
  onChange: (tab: "login" | "register") => void;
};

export default function Tabs({ active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
      <button
        type="button"
        onClick={() => onChange("login")}
        className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
          active === "login"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => onChange("register")}
        className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
          active === "register"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Register
      </button>
    </div>
  );
}