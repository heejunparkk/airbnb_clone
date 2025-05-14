'use client';

import { useAccommodations } from '@/hooks/useAccommodations';
import ImageCarousel from '@/app/components/common/ImageCarousel';
import LoadingSkeleton from '@/app/components/common/LoadingSkeleton';
import Link from 'next/link';

export default function HomePage() {
  const { data: accommodations, isLoading, error } = useAccommodations();

  if (error) throw error;

  return (
    <main className="px-20 pt-[200px]">
      {/* <h1 className="text-2xl font-bold mb-6">인기 급상승</h1> */}
      {isLoading ? (
        <LoadingSkeleton count={12} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {accommodations?.map((accommodation) => (
            <Link
              href={`/accommodation/${accommodation.id}`}
              key={accommodation.id}
              target="_blank"
              // noopener: 새로 열린 페이지가 window.opener 객체를 통해 원본 페이지에 접근하는 것을 방지
              // noreferrer: 새 페이지로 이동할 때 HTTP 리퍼러(referrer) 헤더를 전송하지 않게
              // 보안상의 이유로 target="_blank"를 사용할 때는 항상 rel="noopener noreferrer"를 추가하는 것이 좋음
              // 새 탭에서 열린 페이지가 원본 페이지를 조작하는 보안 취약점(탭나빙 공격)을 방지
              rel="noopener noreferrer"
            >
              <div key={accommodation.id} className="group cursor-pointer space-y-3">
                <ImageCarousel images={accommodation.images} alt={accommodation.title} />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{accommodation.location}</span>
                    <span className="flex items-center gap-1">
                      <span className="text-rose-500">★</span>
                      {accommodation.rating}
                    </span>
                  </div>
                  <h3 className="truncate text-gray-500">{accommodation.title}</h3>
                  <p>
                    <span className="font-semibold">₩{accommodation.price.toLocaleString()}</span>
                    <span className="text-gray-500"> /박</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
