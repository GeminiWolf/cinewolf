import React from "react";

export const CardGridSkeleton = ({ count = 18 }: { count?: number }) => (
  <div
    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    aria-busy="true"
    aria-label="Loading"
  >
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-[2/3] bg-gray-800" />
        <div className="p-3 space-y-2">
          <div className="h-4 bg-gray-800 rounded w-4/5" />
          <div className="flex justify-between">
            <div className="h-3 bg-gray-800 rounded w-1/4" />
            <div className="h-3 bg-gray-800 rounded w-2/5" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const DetailSkeleton = () => (
  <div className="min-h-screen bg-black text-white" aria-busy="true" aria-label="Loading">
    <section className="relative h-screen bg-gradient-to-br from-gray-900 via-black to-purple-950/40">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full animate-pulse">
          <div className="space-y-6">
            <div className="h-8 w-32 bg-gray-800 rounded-full" />
            <div className="h-14 w-3/4 bg-gray-800 rounded" />
            <div className="h-5 w-1/2 bg-gray-800 rounded" />
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-7 w-20 bg-gray-800 rounded-full" />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded" />
              <div className="h-4 bg-gray-800 rounded w-11/12" />
              <div className="h-4 bg-gray-800 rounded w-4/5" />
            </div>
            <div className="flex gap-4">
              <div className="h-14 w-44 bg-gray-800 rounded-full" />
              <div className="h-14 w-44 bg-gray-800 rounded-full" />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-80 h-[500px] mx-auto bg-gray-800 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export const HeroSkeleton = () => (
  <section
    className="relative h-screen bg-gradient-to-br from-gray-900 via-black to-purple-950/40"
    aria-busy="true"
    aria-label="Loading"
  >
    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="space-y-6 w-full max-w-2xl animate-pulse">
        <div className="h-8 w-36 bg-gray-800 rounded-full" />
        <div className="h-16 w-3/4 bg-gray-800 rounded" />
        <div className="h-5 w-1/2 bg-gray-800 rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded" />
          <div className="h-4 bg-gray-800 rounded w-5/6" />
        </div>
        <div className="flex gap-4">
          <div className="h-14 w-40 bg-gray-800 rounded-full" />
          <div className="h-14 w-36 bg-gray-800 rounded-full" />
        </div>
      </div>
    </div>
  </section>
);
