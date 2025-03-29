'use client';

import { useAccommodationsByCategory } from '@/hooks/useAccommodations';
import LoadingSkeleton from '@/app/components/common/LoadingSkeleton';
import ImageCarousel from '@/app/components/common/ImageCarousel';
import Link from 'next/link';
import { Accommodation } from '@/types/types';

interface CategoryContentProps {
  category: string;
}

export default function CategoryContent({ category }: CategoryContentProps) {
  // 서버에서 미리 가져온 데이터를 사용
  const { data: accommodations, isLoading, error } = useAccommodationsByCategory(category);

  if (error) throw error;

  // 서버에서 데이터를 이미 가져왔다면 isLoading은 일반적으로 false이지만,
  // 클라이언트 측에서 다시 조회하는 경우를 대비해 유지
  if (isLoading) {
    return <LoadingSkeleton count={12} />;
  }

  const renderAccommodationCard = (accommodation: Accommodation) => (
    <Link href={`/accommodation/${accommodation.id}`} key={accommodation.id} target="_blank" rel="noopener noreferrer">
      <div className="group cursor-pointer space-y-3">
        <ImageCarousel images={accommodation.images} alt={accommodation.title} />
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">{accommodation.location}</span>
            <span className="flex items-center gap-1">
              <span className="text-rose-500">★</span>
              {accommodation.rating}
            </span>
          </div>
          <h3 className="text-gray-500 truncate">{accommodation.title}</h3>
          <p className="flex items-center gap-1">
            <span className="font-semibold">₩{accommodation.price.toLocaleString()}</span>
            <span className="text-gray-500">/박</span>
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <main className="pt-[200px] px-20">
      <h1 className="text-2xl font-bold mb-8 capitalize">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {accommodations?.map(renderAccommodationCard)}
      </div>
    </main>
  );
}
