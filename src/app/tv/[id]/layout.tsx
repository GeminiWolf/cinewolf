import type { Metadata } from "next";
import { detailMetadata } from "@/utils/detailMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return detailMetadata("tv", id);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
