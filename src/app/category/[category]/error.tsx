'use client';

export default function CategoryError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error);
  return (
    <div className="flex min-h-[700px] flex-col items-center justify-center">
      <h2 className="mb-4 text-xl font-bold">카테고리를 불러오는데 실패했습니다</h2>
      <button onClick={reset} className="rounded-lg bg-rose-500 px-4 py-2 text-white">
        다시 시도
      </button>
    </div>
  );
}
