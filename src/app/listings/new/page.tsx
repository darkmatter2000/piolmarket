import { redirect } from "next/navigation";
import { Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { NewListingForm } from "@/components/listings/NewListingForm";

export default async function NewListingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/listings/new");
  }

  return (
    <div className="bg-mesh min-h-[calc(100vh-4rem)] py-12">
      <div className="section-container max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald/15 border border-emerald/20 flex items-center justify-center mx-auto">
            <Building2 size={32} className="text-emerald" />
          </div>
          <h1 className="font-syne text-2xl font-bold mt-4">Publier une annonce</h1>
          <p className="text-gray-500 text-sm mt-1">
            Votre contribution alimente les indices de prix et réduit notre dépendance au scraping.
          </p>
        </div>

        <NewListingForm userId={user.id} />
      </div>
    </div>
  );
}
