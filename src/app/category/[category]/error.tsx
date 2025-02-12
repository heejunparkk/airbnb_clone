'use client';

export default function CategoryError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error);
  return (
    <div className="flex flex-col items-center justify-center min-h-[700px]">
      <h2 className="text-xl font-bold mb-4">카테고리를 불러오는데 실패했습니다</h2>
      <button onClick={reset} className="px-4 py-2 bg-rose-500 text-white rounded-lg">
        다시 시도
      </button>
    </div>
  );
}
