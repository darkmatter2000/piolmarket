import { createClient } from "@/lib/supabase/server";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const sessionUser = user
    ? {
        email: user.email ?? "",
        fullName: (user.user_metadata?.full_name as string | undefined) ?? null,
        avatarUrl: (user.user_metadata?.avatar_url as string | undefined) ?? null,
      }
    : null;

  return <HeaderNav user={sessionUser} />;
}
