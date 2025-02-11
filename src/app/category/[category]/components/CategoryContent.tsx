'use client';

import { useAccommodationsByCategory } from '@/app/hooks/useAccommodations';
import LoadingSkeleton from '@/app/components/common/LoadingSkeleton';
import ImageCarousel from '@/app/components/common/ImageCarousel';

export default function CategoryContent({ category }: { category: string }) {
  const { data: accommodations, isLoading, error } = useAccommodationsByCategory(category);

  if (error) throw error;

  return (
    <main className="pt-[200px] px-20">
      <h1 className="text-2xl font-bold mb-6">{category}</h1>
      {isLoading ? (
        <LoadingSkeleton count={12} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {accommodations?.map((accommodation) => (
            <div key={accommodation.id} className="group cursor-pointer">
              <ImageCarousel images={accommodation.images} alt={accommodation.title} />
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">{accommodation.location}</span>
                  <span className="flex items-center gap-1">★ {accommodation.rating}</span>
                </div>
                <h3 className="text-gray-500 truncate">{accommodation.title}</h3>
                <p>
                  <span className="font-semibold">₩{accommodation.price.toLocaleString()}</span>
                  <span className="text-gray-500"> /박</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
