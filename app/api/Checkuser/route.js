import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
export async function POST(req) {
  const body = await req.json();
  const email = body?.email?.toLowerCase();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return NextResponse.json({ adminError: error.message }, { status: 500 });
  }
  const exists = data?.users?.some((user) => {
    const userEmail = user.email?.toLowerCase();
    return userEmail === email;
  });

  if (exists) {
    return NextResponse.json({ exists: true }, { status: 500 });
  } else {
    console.log("ok to proceed");
    return NextResponse.json({ exists: false }, { status: 200 });
  }
}
