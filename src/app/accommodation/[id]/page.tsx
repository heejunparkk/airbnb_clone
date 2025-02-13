import { accommodationApi } from '@/app/api/accommodation';
import Image from 'next/image';

interface AccommodationPageProps {
  params: {
    id: string;
  };
}

export default async function AccommodationPage({ params }: AccommodationPageProps) {
  const accommodation = await accommodationApi.getById(Number(params.id));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accommodation?.images.map((image, index) => (
            <div key={index} className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={image}
                alt={`${accommodation?.title} - ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* 숙소 정보 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">숙소 정보</h2>
            <p className="text-gray-600">{accommodation?.description}</p>
          </div>

          {/* 가격 정보 */}
          <div className="border rounded-xl p-6 space-y-4 h-fit">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">₩{accommodation?.price.toLocaleString()}</span>
              <span className="text-gray-500">/박</span>
            </div>
            {/* 여기에 예약 버튼 등 추가 가능 */}
            <button className="w-full bg-primary text-white py-3 rounded-lg">예약하기</button>
          </div>
        </div>
      </div>
    </main>
  );
}
