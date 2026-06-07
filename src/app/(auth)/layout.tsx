import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-mesh min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,196,140,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,140,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-20 left-1/3 w-72 h-72 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-lg bg-emerald/20 rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald to-emerald-600 flex items-center justify-center">
                <span className="text-dark-bg font-syne font-bold text-sm">MP</span>
              </div>
            </div>
            <span className="font-syne font-bold text-white text-lg leading-none">
              Money<span className="text-gradient-emerald">Piol</span>
            </span>
          </Link>
        </div>

        <div className="card p-8">{children}</div>
      </div>
    </div>
  );
}
