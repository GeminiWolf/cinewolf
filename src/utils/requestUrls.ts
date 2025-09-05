export function imageUrl(id: string, path: "tv" | "movie" = "movie") {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${path}/${id}/images`;
}
