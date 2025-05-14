'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error); // 에러 로깅
  return (
    <div className="flex min-h-[700px] flex-col items-center justify-center">
      <h2 className="mb-4 text-xl font-bold">문제가 발생했습니다</h2>
      <button onClick={reset} className="rounded-lg bg-rose-500 px-4 py-2 text-white">
        다시 시도
      </button>
    </div>
  );
}
