import { supabase } from "@/lib/supabase";

const BUCKET = "resume-file";

export function getResumeAssetUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export const RESUME_ASSETS = {
  avatar: "avatar.jpg",
  resumeZh: "2025 zijie huang resume zh.pdf",
  resumeEn: "ZIJIE HUANG Resume .pdf",
} as const;
