import { redirect } from "next/navigation";
import { UserCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-mesh min-h-[calc(100vh-4rem)] py-16">
      <div className="section-container max-w-2xl">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald/15 border border-emerald/20 flex items-center justify-center mx-auto">
            <UserCircle2 size={32} className="text-emerald" />
          </div>
          <h1 className="font-syne text-2xl font-bold mt-4">
            {user.user_metadata?.full_name ?? "Mon profil"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          <p className="text-gray-500 text-sm mt-6 max-w-md mx-auto">
            Cette page est en construction — vous pourrez bientôt y gérer vos annonces,
            vos points et vos préférences.
          </p>
        </div>
      </div>
    </div>
  );
}
