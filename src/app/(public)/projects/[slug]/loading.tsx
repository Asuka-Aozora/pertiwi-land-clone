export default function Loading() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="relative h-[60vh] md:h-[80vh] bg-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
          <div className="container mx-auto">
            <div className="h-4 w-24 bg-gray-400 rounded mb-4"></div>
            <div className="h-10 w-3/4 md:w-1/2 bg-gray-400 rounded mb-4"></div>
            <div className="h-6 w-1/2 md:w-1/3 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-12 relative z-10 -mt-20">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="space-y-4">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-6 sticky top-24">
                <div className="h-8 w-1/2 bg-gray-200 rounded mx-auto"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                      <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="h-12 w-full bg-gray-300 rounded-lg mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
