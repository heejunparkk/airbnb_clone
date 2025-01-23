'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchStore } from '@/store/useSearchStore';
import Divider from '../common/Divider';

interface SearchBarProps {
  isScrolled: boolean;
}

type TabType = '여행지' | '체크인' | '체크아웃' | '여행자' | null;

export default function SearchBar({ isScrolled }: SearchBarProps) {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { searchMode, setSearchMode } = useSearchStore();
  const [activeTab, setActiveTab] = useState<TabType>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchBarElement = searchBarRef.current;
      const popupElement = document.querySelector('.search-popup');

      if (
        searchBarElement &&
        !searchBarElement.contains(event.target as Node) &&
        popupElement &&
        !popupElement.contains(event.target as Node)
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
    <div className="flex flex-col items-center justify-center transform transition-all duration-200 relative">
      {!isScrolled && (
        <div ref={searchBarRef} className="flex gap-1 mb-4">
          <button
            onClick={() => setSearchMode('stays')}
            className={`py-3 px-4 rounded-full ${
              searchMode === 'stays'
                ? 'text-black'
                : 'text-gray-500 hover:text-black hover:bg-gray-100'
            }`}
          >
            숙소
          </button>
          <button
            onClick={() => setSearchMode('experiences')}
            className={`py-3 px-4 rounded-full ${
              searchMode === 'experiences'
                ? 'text-black'
                : 'text-gray-500 hover:text-black hover:bg-gray-100'
            }`}
          >
            체험
          </button>
        </div>
      )}
      <div
        className={`
          border border-gray-300 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform
          ${isScrolled ? 'h-12 max-w-[400px]' : 'h-[66px] w-[850px]'}
          ${activeTab ? 'bg-gray-200' : 'bg-white'}
        `}
      >
        <div className="flex items-center justify-between h-full w-full">
          <div
            ref={searchBarRef}
            className={`
              flex items-center transition-all duration-200
              ${isScrolled ? 'text-sm' : 'text-base'}
            `}
          >
            {isScrolled ? (
              <>
                <button
                  type="button"
                  onClick={() => handleTabClick('여행지')}
                  className={`pr-4 rounded-full px-4 py-2 transition-all duration-200
                    ${activeTab === '여행지' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                >
                  어디든지
                </button>
                <Divider />
                <button
                  type="button"
                  onClick={() => handleTabClick('체크인')}
                  className={`rounded-full px-4 py-2 transition-all duration-200
                    ${activeTab === '체크인' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                >
                  언제든
                </button>
                <Divider />
                <button
                  type="button"
                  onClick={() => handleTabClick('여행자')}
                  className={`pl-4 rounded-full px-4 py-2 transition-all duration-200
                    ${activeTab === '여행자' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                >
                  게스트 추가
                </button>
              </>
            ) : (
              <>
                <div
                  className={`flex flex-col transition-all duration-200 rounded-full py-3.5 px-8
                    ${
                      activeTab === '여행지'
                        ? 'bg-white text-rose-500 font-medium shadow-md'
                        : activeTab
                          ? 'bg-gray-200 hover:bg-gray-300'
                          : 'hover:bg-gray-200'
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('여행지');
                  }}
                >
                  <span className="text-xs">여행지</span>
                  <input
                    type="text"
                    placeholder="여행지 검색"
                    className={`bg-transparent outline-none w-full placeholder:text-gray-500 ${
                      isScrolled ? 'hidden' : 'text-sm text-gray-500'
                    }`}
                  />
                </div>
                <Divider />
                {searchMode === 'stays' ? (
                  <>
                    <div
                      className={`flex flex-col transition-all duration-200 rounded-full py-3.5 px-8
                        ${
                          activeTab === '체크인'
                            ? 'bg-white text-rose-500 font-medium shadow-md'
                            : activeTab
                              ? 'bg-gray-200 hover:bg-gray-300'
                              : 'hover:bg-gray-200'
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabClick('체크인');
                      }}
                    >
                      <span className="text-xs">체크인</span>
                      <span className="text-sm text-gray-500">날짜 추가</span>
                    </div>
                    <Divider />
                    <div
                      onClick={() => handleTabClick('체크아웃')}
                      className={`flex flex-col transition-all duration-200 rounded-full px-8 py-3.5
                        ${
                          activeTab === '체크아웃'
                            ? 'bg-white text-rose-500 font-medium shadow-md'
                            : activeTab
                              ? 'bg-gray-200 hover:bg-gray-300'
                              : 'hover:bg-gray-200'
                        }`}
                    >
                      <span className="text-xs">체크아웃</span>
                      <span className="text-sm text-gray-500">날짜 추가</span>
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => handleTabClick('체크인')}
                    className={`flex flex-col transition-all duration-200 rounded-full px-8 py-3.5
                      ${
                        activeTab === '체크인'
                          ? 'bg-white text-rose-500 font-medium shadow-md'
                          : activeTab
                            ? 'bg-gray-200 hover:bg-gray-300'
                            : 'hover:bg-gray-200'
                      }`}
                  >
                    <span className="text-xs">날짜</span>
                    <span className="text-sm text-gray-500">날짜 추가</span>
                  </div>
                )}
                <Divider />
                <div
                  onClick={() => handleTabClick('여행자')}
                  className={`flex flex-col transition-all duration-200 pl-6 rounded-full px-8 py-3.5
                    ${
                      activeTab === '여행자'
                        ? 'bg-white text-rose-500 font-medium shadow-md'
                        : activeTab
                          ? 'bg-gray-200 hover:bg-gray-300'
                          : 'hover:bg-gray-200'
                    }`}
                >
                  <span className="text-xs">여행자</span>
                  <span className="text-sm text-gray-500">게스트 추가</span>
                </div>
              </>
            )}
          </div>
          <button
            className={`
              bg-rose-500 rounded-full text-white transition-all duration-200 mr-2
              ${isScrolled ? 'p-2' : 'p-3'}
            `}
            aria-label="검색"
            type="button"
          >
            <MagnifyingGlassIcon
              className={`
                transition-all duration-200
                ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}
              `}
            />
          </button>
        </div>
      </div>

      {/* 팝업 메뉴 */}
      {!isScrolled && activeTab && (
        <div className="search-popup absolute top-full left-0 w-full mt-3 bg-white rounded-3xl shadow-lg border p-6">
          {activeTab === '여행지' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">여행지 검색</h3>
              {/* 여행지 검색 내용 */}
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
