'use client';

import { useSearchStore } from '@/store/useSearchStore';

export default function NavTabs() {
  const { searchMode, setSearchMode } = useSearchStore();

  return (
    <div className="flex gap-6">
      <button
        onClick={() => setSearchMode('stays')}
        className={`pb-2 ${
          searchMode === 'stays'
            ? 'border-b-2 border-black text-black'
            : 'text-gray-500'
        }`}
      >
        숙소
      </button>
      <button
        onClick={() => setSearchMode('experiences')}
        className={`pb-2 ${
          searchMode === 'experiences'
            ? 'border-b-2 border-black text-black'
            : 'text-gray-500'
        }`}
      >
        체험
      </button>
    </div>
  );
}
