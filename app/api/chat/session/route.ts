import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const body = await req.json().catch(() => ({}));
  const { sessionToken } = body as { sessionToken?: string };

  if (sessionToken) {
    const { data: existing } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("session_token", sessionToken)
      .single();

    if (existing) {
      return NextResponse.json({ session: existing });
    }
  }

  const newToken = randomUUID();
  const { data: session, error } = await supabase
    .from("chat_sessions")
    .insert({ session_token: newToken, status: "active" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ session });
}
