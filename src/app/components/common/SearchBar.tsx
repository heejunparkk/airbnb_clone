"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  isScrolled: boolean;
}

export default function SearchBar({ isScrolled }: SearchBarProps) {
  return (
    <div
      className={`
      border rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer
      ${isScrolled ? "h-12" : "h-[66px]"}
    `}
    >
      <div className="flex items-center justify-between h-full px-6">
        <div
          className={`
          flex items-center divide-x
          ${isScrolled ? "text-sm" : "text-base"}
        `}
        >
          <div className={`${isScrolled ? "pr-4" : "pr-6"}`}>어디든지</div>
          <div className={`${isScrolled ? "px-4" : "px-6"}`}>언제든 일주일</div>
          <div className={`${isScrolled ? "pl-4" : "pl-6"}`}>게스트 추가</div>
        </div>
        <button
          className={`
            bg-rose-500 rounded-full text-white transition-all duration-300
            ${isScrolled ? "p-2" : "p-3"}
          `}
          aria-label="검색"
          type="button"
        >
          <MagnifyingGlassIcon
            className={`
            transition-all duration-300
            ${isScrolled ? "h-4 w-4" : "h-5 w-5"}
          `}
          />
        </button>
      </div>
    </div>
  );
}
