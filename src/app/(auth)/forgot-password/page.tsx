"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Send, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/login`,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Une erreur est survenue");
      return;
    }

    setSent(true);
    toast.success("Email de réinitialisation envoyé");
  }

  if (sent) {
    return (
      <div className="text-center">
        <h1 className="font-syne text-2xl font-bold">Vérifiez vos emails</h1>
        <p className="text-gray-500 text-sm mt-3">
          Si un compte existe pour <span className="text-white">{email}</span>, un lien de
          réinitialisation vient de vous être envoyé.
        </p>
        <Link href="/login" className="btn-secondary mt-6 inline-flex">
          <ArrowLeft size={16} />
          Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-syne text-2xl font-bold text-center">Mot de passe oublié</h1>
      <p className="text-gray-500 text-sm text-center mt-2">
        Entrez votre email, nous vous enverrons un lien de réinitialisation.
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

        <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          Envoyer le lien
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        <Link href="/login" className="text-emerald hover:text-emerald-400 font-medium transition-colors">
          Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
