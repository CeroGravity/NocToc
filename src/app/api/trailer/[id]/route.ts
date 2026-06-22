import { type NextRequest, NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const type = req.nextUrl.searchParams.get("type") === "tv" ? "tv" : "movie";
  try {
    const data = await tmdb.videos(Number(id), type);
    const yt = data.results.filter((v) => v.site === "YouTube");
    const best =
      yt.find((v) => v.type === "Trailer" && v.official) ??
      yt.find((v) => v.type === "Trailer") ??
      yt.find((v) => v.type === "Teaser") ??
      yt[0];
    return NextResponse.json({ key: best?.key ?? null });
  } catch {
    return NextResponse.json({ key: null });
  }
}
