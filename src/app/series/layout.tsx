import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Shows",
  description: "Browse popular, top rated and currently airing TV shows on CineStream.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
