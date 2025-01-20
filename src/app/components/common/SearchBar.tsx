'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchStore } from '@/store/useSearchStore';

interface SearchBarProps {
  isScrolled: boolean;
}

type TabType = '여행지' | '체크인' | '체크아웃' | '여행자' | null;

export default function SearchBar({ isScrolled }: SearchBarProps) {
  const [activeTab, setActiveTab] = useState<TabType>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { searchMode } = useSearchStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setActiveTab(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (activeTab) {
        setActiveTab(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div
      ref={searchBarRef}
      className="flex justify-center transform transition-all duration-300 relative"
    >
      <div
        className={`
          border rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform
          ${isScrolled ? 'h-12 max-w-[400px]' : 'h-[66px] max-w-[850px]'}
        `}
      >
        <div className="flex items-center justify-between h-full px-6">
          <div
            className={`
              flex items-center divide-x transition-all duration-300
              ${isScrolled ? 'text-sm' : 'text-base'}
            `}
          >
            {isScrolled ? (
              <>
                <button
                  type="button"
                  onClick={() => handleTabClick('여행지')}
                  className={`pr-4 rounded-full px-4 py-2 transition-all duration-300
                    ${activeTab === '여행지' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                >
                  어디든지
                </button>
                <button
                  type="button"
                  onClick={() => handleTabClick('체크인')}
                  className={`rounded-full px-4 py-2 transition-all duration-300
                    ${activeTab === '체크인' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                >
                  언제든
                </button>
                <button
                  type="button"
                  onClick={() => handleTabClick('여행자')}
                  className={`pl-4 rounded-full px-4 py-2 transition-all duration-300
                    ${activeTab === '여행자' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                >
                  게스트 추가
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleTabClick('여행지')}
                  className={`transition-all duration-300 pr-6 rounded-full px-4 py-2
                    ${
                      activeTab === '여행지'
                        ? 'bg-gray-100 text-rose-500 font-medium'
                        : 'hover:bg-gray-50'
                    }`}
                >
                  여행지
                </button>
                {searchMode === 'stays' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleTabClick('체크인')}
                      className={`transition-all duration-300 last:rounded-full px-4 py-2
                        ${
                          activeTab === '체크인'
                            ? 'bg-gray-100 text-rose-500 font-medium'
                            : 'hover:bg-gray-50'
                        }`}
                    >
                      체크인
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabClick('체크아웃')}
                      className={`transition-all duration-300 rounded-full px-4 py-2
                        ${
                          activeTab === '체크아웃'
                            ? 'bg-gray-100 text-rose-500 font-medium'
                            : 'hover:bg-gray-50'
                        }`}
                    >
                      체크아웃
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleTabClick('체크인')}
                    className={`transition-all duration-300 rounded-full px-4 py-2
                      ${
                        activeTab === '체크인'
                          ? 'bg-gray-100 text-rose-500 font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                  >
                    날짜
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleTabClick('여행자')}
                  className={`transition-all duration-300 pl-6 rounded-full px-4 py-2
                    ${
                      activeTab === '여행자'
                        ? 'bg-gray-100 text-rose-500 font-medium'
                        : 'hover:bg-gray-50'
                    }`}
                >
                  여행자
                </button>
              </>
            )}
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

      {/* 팝업 메뉴 */}
      {!isScrolled && activeTab && (
        <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-3xl shadow-lg border p-6">
          {activeTab === '여행지' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">여행지 검색</h3>
              {/* 여여행지 검색 내용 */}
            </div>
          )}
          {activeTab === '체크인' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">체크인 날짜 선택</h3>
              {/* 체크인 달력 */}
            </div>
          )}
          {activeTab === '체크아웃' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">체크아웃 날짜 선택</h3>
              {/* 체크아웃 달력 */}
            </div>
          )}
          {activeTab === '여행자' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">인원 선택</h3>
              {/* 인원 선택 컨트롤 */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
