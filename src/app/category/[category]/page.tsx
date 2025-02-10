// import { getCategoryAccommodations } from '@/app/api';
import { Suspense } from 'react';
import LoadingSkeleton from '@/app/components/common/LodingSceleton';
import { accommodations } from '@/app/data/data';
import { Accommodation } from '@/app/types/accommodation';
import ImageCarousel from '@/app/components/common/ImageCarousel';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const decodedCategory = decodeURIComponent(params.category);
  // const accommodations = await getCategoryAccommodations(params.category);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <main className="pt-[250px] px-20">
        <h1 className="text-2xl font-bold mb-6">{decodedCategory}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {accommodations.map((accommodation: Accommodation) => (
            <div key={accommodation.id} className="group cursor-pointer">
              <ImageCarousel images={accommodation.images} alt={accommodation.title} />

              {/* 숙소 정보 */}
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
      </main>
    </Suspense>
  );
}
