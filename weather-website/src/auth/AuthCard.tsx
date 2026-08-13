import { useState } from "react";
import { Mail, Lock, User, CloudSun } from "lucide-react";

import Tabs from "./Tabs";
import InputField from "./InputField";
import { useAuth } from "../context/AuthContext";

export default function AuthCard() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4 py-10">
      <div className="w-full max-w-md">
        <header className="relative z-10 flex items-center gap-3.5 rounded-2xl bg-linear-to-br from-slate-900 to-blue-500 px-6 py-7">
          <CloudSun size={30} strokeWidth={1.5} className="shrink-0 text-white" />

          <div>
            <h1 className="font-serif text-2xl text-white">Skycast</h1>
            <p className="mt-0.5 text-sm text-white/75">
              Your personal weather companion
            </p>
          </div>
        </header>

        <main className="relative z-20 -mt-9 rounded-2xl bg-white px-6 pb-8 pt-7 shadow-xl shadow-slate-900/10">
          <Tabs active={tab} onChange={setTab} />

          <div className="mt-6">
            {tab === "login" ? (
              <LoginForm onSwitch={() => setTab("register")} />
            ) : (
              <RegisterForm onSwitch={() => setTab("login")} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (error: any) {
      setError(error.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <InputField
        icon={Mail}
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        icon={Lock}
        placeholder="Password"
        isPassword
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="-mt-1 text-right">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 rounded-xl bg-linear-to-br from-slate-900 to-blue-500 py-3.5 text-sm font-bold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in to Skycast"}
      </button>

      <Divider />

      <p className="text-center text-sm text-slate-500">
        New to Skycast?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-bold text-blue-600 hover:underline"
        >
          Create an account
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
    } catch (error: any) {
      setError(error.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <InputField
        icon={User}
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <InputField
        icon={Mail}
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        icon={Lock}
        placeholder="Password"
        isPassword
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <InputField
        icon={Lock}
        placeholder="Confirm password"
        isPassword
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-1 rounded-xl bg-linear-to-br from-slate-900 to-blue-500 py-3.5 text-sm font-bold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <Divider />

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-bold text-blue-600 hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-slate-200" />
      <p className="text-xs text-slate-400">or</p>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}