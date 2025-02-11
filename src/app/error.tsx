'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error); // 에러 로깅
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-xl font-bold mb-4">문제가 발생했습니다</h2>
      <button onClick={reset} className="px-4 py-2 bg-rose-500 text-white rounded-lg">
        다시 시도
      </button>
    </div>
  );
}
