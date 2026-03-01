import type { ReactNode } from "react";

export const metadata = {
  title: "Admin - Geeki Blog",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="bg-[#f8f8f8] text-[#333]">{children}</body>
    </html>
  );
}
