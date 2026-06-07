"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message || "Identifiants invalides");
      setLoading(false);
      return;
    }

    toast.success("Connexion réussie");
    router.push(next);
    router.refresh();
  }

  return (
    <div>
      <h1 className="font-syne text-2xl font-bold text-center">Connexion</h1>
      <p className="text-gray-500 text-sm text-center mt-2">
        Accédez à vos annonces, vos points et vos analyses de marché.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              className="input pl-11"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Mot de passe
            </label>
            <Link href="/forgot-password" className="text-xs text-emerald hover:text-emerald-400 transition-colors">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input pl-11"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
          Se connecter
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-emerald hover:text-emerald-400 font-medium transition-colors">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
