'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  isScrolled: boolean;
}

export default function SearchBar({ isScrolled }: SearchBarProps) {
  return (
    <div className="transform transition-all duration-300">
      <div
        className={`
          border rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform
          ${isScrolled ? 'h-12 scale-90' : 'h-[66px] scale-100'}
        `}
      >
        <div className="flex items-center justify-between h-full px-6">
          <div
            className={`
            flex items-center divide-x transition-all duration-300
            ${isScrolled ? 'text-sm' : 'text-base'}
          `}
          >
            <div
              className={`transition-all duration-300 ${isScrolled ? 'pr-4' : 'pr-6'}`}
            >
              어디든지
            </div>
            <div
              className={`transition-all duration-300 ${isScrolled ? 'px-4' : 'px-6'}`}
            >
              언제든 일주일
            </div>
            <div
              className={`transition-all duration-300 ${isScrolled ? 'pl-4' : 'pl-6'}`}
            >
              게스트 추가
            </div>
          </div>
          <button
            className={`
              bg-rose-500 rounded-full text-white transition-all duration-300
              ${isScrolled ? 'p-2' : 'p-3'}
            `}
            aria-label="검색"
            type="button"
          >
            <MagnifyingGlassIcon
              className={`
              transition-all duration-300
              ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}
            `}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
