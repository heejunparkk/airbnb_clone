'use client';

interface LoadingSkeletonProps {
  count: number;
}

export default function LoadingSkeleton({ count }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="space-y-4 animate-pulse">
          {/* 이미지 스켈레톤 */}
          <div className="aspect-square rounded-lg bg-gray-200" />

          {/* 텍스트 스켈레톤 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-8 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
