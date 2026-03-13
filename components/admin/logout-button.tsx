"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#eee] text-sm text-[#666] hover:bg-[#f8f8f8] hover:text-[#333] disabled:opacity-50 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      {isPending ? "退出中…" : "退出登录"}
    </button>
  );
}
