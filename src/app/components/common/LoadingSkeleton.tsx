'use client';

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="space-y-4">
          {/* 이미지 스켈레톤 */}
          <div className="aspect-square bg-gray-300 rounded-xl animate-pulse" />

          {/* 텍스트 스켈레톤 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-8 bg-gray-300 rounded animate-pulse" />
            </div>

            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
