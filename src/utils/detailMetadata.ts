import type { Metadata } from "next";

// Server-side title lookup for detail pages. Falls back to a generic title
// if TMDB env vars are missing or the request fails.
export async function detailMetadata(
  kind: "movie" | "tv",
  id: string
): Promise<Metadata> {
  const fallback: Metadata = { title: kind === "tv" ? "TV Show" : "Movie" };
  const base = process.env.NEXT_PUBLIC_TMDB_API_URL;
  const token = process.env.NEXT_PUBLIC_TMDB_TOKEN;
  if (!base || !token) return fallback;
  try {
    const res = await fetch(`${base}/${kind}/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return fallback;
    const data: { title?: string; name?: string; overview?: string } =
      await res.json();
    const name = data.title || data.name;
    if (!name) return fallback;
    return {
      title: name,
      description: data.overview?.slice(0, 160) || undefined,
    };
  } catch {
    return fallback;
  }
}
