import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSettings, saveSettings, type StoreSettings } from "@/lib/store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as StoreSettings;
  if (!body.company || !body.email) {
    return NextResponse.json(
      { error: "Company and email are required" },
      { status: 400 },
    );
  }
  await saveSettings(body);
  return NextResponse.json({ ok: true });
}
