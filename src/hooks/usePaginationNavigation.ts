import { useEffect } from "react";

interface UsePaginationNavigationOptions {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const usePaginationNavigation = ({
  currentPage,
  onPageChange,
}: UsePaginationNavigationOptions) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentPage, onPageChange]);
};
