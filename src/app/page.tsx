export default function Home() {
  return (
    <div className="px-20 pt-[232px]">
      <h1 className="text-3xl font-bold">에어비앤비에서 숙소를 찾아보세요</h1>

      {/* 임시 스크롤 테스트용 컨텐츠 */}
      <div className="mt-10 space-y-20">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold">임시 컨텐츠 {i + 1}</h2>
            <p className="mt-2 text-gray-600">
              스크롤 테스트를 위한 임시 컨텐츠입니다.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
