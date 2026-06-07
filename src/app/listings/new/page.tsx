import { redirect } from "next/navigation";
import { Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function NewListingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/listings/new");
  }

  return (
    <div className="bg-mesh min-h-[calc(100vh-4rem)] py-16">
      <div className="section-container max-w-2xl">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald/15 border border-emerald/20 flex items-center justify-center mx-auto">
            <Building2 size={32} className="text-emerald" />
          </div>
          <h1 className="font-syne text-2xl font-bold mt-4">Publier une annonce</h1>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          <p className="text-gray-500 text-sm mt-6 max-w-md mx-auto">
            Le formulaire de soumission d&apos;annonce arrive bientôt — vous pourrez
            publier votre bien (vente ou location) directement depuis votre compte.
          </p>
        </div>
      </div>
    </div>
  );
}
