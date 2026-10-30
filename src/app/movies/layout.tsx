import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies",
  description: "Browse popular, top rated, now playing and upcoming movies on CineStream.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
