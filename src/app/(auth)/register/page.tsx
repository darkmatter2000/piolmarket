"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message || "Impossible de créer le compte");
      setLoading(false);
      return;
    }

    if (data.session) {
      toast.success("Compte créé avec succès");
      router.push("/");
      router.refresh();
      return;
    }

    toast.success("Compte créé — vérifiez vos emails pour confirmer votre adresse");
    router.push("/login");
  }

  return (
    <div>
      <h1 className="font-syne text-2xl font-bold text-center">Créer un compte</h1>
      <p className="text-gray-500 text-sm text-center mt-2">
        Publiez des annonces, suivez les indices de prix et gagnez des points.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-1.5">
            Nom complet
          </label>
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="full_name"
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jean Mballa"
              className="input pl-11"
            />
          </div>
        </div>

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
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
            Mot de passe
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6 caractères minimum"
              className="input pl-11"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
          Créer mon compte
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Déjà inscrit ?{" "}
        <Link href="/login" className="text-emerald hover:text-emerald-400 font-medium transition-colors">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
