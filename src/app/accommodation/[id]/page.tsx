import { accommodationApi } from '@/app/api/query';
import Image from 'next/image';
import AccommodationHeader from './components/AccommodationHeader';

interface AccommodationPageProps {
  params: {
    id: string;
  };
}

export default async function AccommodationPage({ params }: AccommodationPageProps) {
  const accommodation = await accommodationApi.getById(params.id);

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 h-[80px] border-b bg-white">
        <AccommodationHeader />
      </div>
      <main className="mx-auto max-w-7xl px-4 py-8 pt-24 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* 숙소 제목 섹션 */}
          <div>
            <h1 className="text-2xl font-bold">{accommodation?.title}</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center">★ {accommodation?.rating}</span>
              <span>•</span>
              <span>{accommodation?.location}</span>
            </div>
          </div>

          {/* 이미지 갤러리 섹션 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {accommodation?.images.map((image, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src={image}
                  alt={`${accommodation?.title} - ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>

          {/* 숙소 정보 섹션 */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-xl font-semibold">숙소 정보</h2>
              <p className="text-gray-600">{accommodation?.description}</p>
            </div>

            {/* 가격 정보 */}
            <div className="h-fit space-y-4 rounded-xl border p-6">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">₩{accommodation?.price.toLocaleString()}</span>
                <span className="text-gray-500">/박</span>
              </div>
              {/* 여기에 예약 버튼 등 추가 가능 */}
              <button className="bg-primary w-full rounded-lg py-3 text-white">예약하기</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
