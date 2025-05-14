'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { IoSearch } from 'react-icons/io5';
import gsap from 'gsap';
import { useSearchStore } from '@/store/useSearchStore';
import { SearchBarProps, TabType } from '@/types/types';
import Divider from '@/app/components/common/Divider';

export default function SearchBar({ isScrolled }: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null); // 전체 컨테이너
  const topButtonsRef = useRef<HTMLDivElement>(null); // 상단 숙소/체험 버튼 컨테이너
  const searchBarShellRef = useRef<HTMLDivElement>(null); // 검색바 외곽 div
  const searchButtonRef = useRef<HTMLButtonElement>(null); // 검색 버튼
  const popupRef = useRef<HTMLDivElement>(null); // 팝업 div

  const { searchMode, setSearchMode } = useSearchStore();
  const [activeTab, setActiveTab] = useState<TabType>(null);
  // const [hoveredLocation, setHoveredLocation] = useState(false);
  // const [hoveredCheckin, setHoveredCheckin] = useState(false);
  // const [hoveredCheckout, setHoveredCheckout] = useState(false);
  // const [hoveredGuest, setHoveredGuest] = useState(false);
  // const [hoveredDate, setHoveredDate] = useState(false);

  // --- GSAP Animations ---

  // isScrolled 상태 변경 시 애니메이션
  useEffect(() => {
    if (searchBarShellRef.current) {
      gsap.to(searchBarShellRef.current, {
        height: isScrolled ? 48 : 66,
        // width 대신 maxWidth 사용 권장 (반응형 유지)
        maxWidth: isScrolled ? 400 : 850,
        duration: 0.4, // 애니메이션 지속 시간
        ease: 'power3.out', // 애니메이션 이징 함수
      });
    }
    // 상단 버튼 애니메이션 (나타나고 사라짐)
    if (topButtonsRef.current) {
      gsap.to(topButtonsRef.current, {
        opacity: isScrolled ? 0 : 1,
        y: isScrolled ? -20 : 0,
        duration: 0.3,
        ease: 'power2.out',
        // isScrolled가 true면 숨김 처리 (레이아웃 영향 방지)
        display: isScrolled ? 'none' : 'flex',
        delay: isScrolled ? 0 : 0.1, // 나타날 때 약간 지연
      });
    }
  }, [isScrolled]);

  // activeTab 상태 변경 시 애니메이션 (검색 버튼 너비, 배경색 등)
  useEffect(() => {
    // 검색 버튼 너비 조절 (isScrolled가 false일 때만)
    if (searchButtonRef.current && !isScrolled) {
      gsap.to(searchButtonRef.current, {
        width: activeTab ? 112 : 48, // 'w-28' -> 112px, 'w-12' -> 48px
        duration: 0.3,
        ease: 'power3.out',
      });
    }
    // 검색바 배경색 변경
    if (searchBarShellRef.current) {
      gsap.to(searchBarShellRef.current, {
        backgroundColor: activeTab ? '#E5E7EB' : '#FFFFFF', // gray-200 : white
        duration: activeTab ? 0 : 0.2, // 활성화될 때는 즉시, 비활성화될 때 천천히
      });
    }
    // 팝업 애니메이션 (선택 사항: 나타날 때 효과)
    if (popupRef.current) {
      gsap.fromTo(popupRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });
    }
  }, [activeTab, isScrolled]);

  // --- Event Handlers & Effects ---

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (activeTab) setActiveTab(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const handleTabClick = useCallback(
    (tab: TabType) => {
      setActiveTab(activeTab === tab ? null : tab);
    },
    [activeTab]
  );

  return (
    <div ref={containerRef} className="flex w-full transform flex-col items-center justify-center">
      <div ref={topButtonsRef} className="mb-4 flex gap-1">
        <button
          onClick={() => setSearchMode('stays')}
          className={`cursor-pointer rounded-full px-3 py-2 text-sm ${
            searchMode === 'stays' ? 'text-black' : 'text-gray-500 hover:bg-gray-100 hover:text-black'
          }`}
        >
          숙소
        </button>
        <button
          onClick={() => setSearchMode('experiences')}
          className={`cursor-pointer rounded-full px-3 py-2 text-sm ${
            searchMode === 'experiences' ? 'text-black' : 'text-gray-500 hover:bg-gray-100 hover:text-black'
          }`}
        >
          체험
        </button>
      </div>

      <div
        ref={searchBarShellRef}
        className={`flex w-full cursor-pointer rounded-full border border-gray-300 shadow-md hover:shadow-lg ${isScrolled ? 'h-12' : 'h-[56px] sm:h-[66px]'} ${activeTab ? 'bg-gray-200' : 'bg-white'}`}
      >
        <div className="flex h-full w-full items-center">
          <div className={`flex w-full items-center justify-center text-sm sm:text-base`}>
            {isScrolled ? (
              <>
                <button
                  type="button"
                  onClick={() => handleTabClick('location')}
                  className="py-2 pr-2 pl-2 whitespace-nowrap sm:py-3 sm:pr-4 sm:pl-4"
                >
                  어디든지
                </button>
                <Divider />
                <button
                  type="button"
                  onClick={() => handleTabClick('checkin')}
                  className="py-2 pr-2 pl-2 whitespace-nowrap sm:py-3 sm:pr-4 sm:pl-4"
                >
                  언제든 일주일
                </button>
                <Divider />
                <button
                  type="button"
                  onClick={() => handleTabClick('guest')}
                  className="py-2 pr-2 pl-2 whitespace-nowrap sm:py-3 sm:pr-4 sm:pl-4"
                >
                  게스트 추가
                </button>
              </>
            ) : (
              <div className="flex w-full items-center">
                {/* 여행지 탭 */}
                <div className="flex w-full rounded-full">
                  <div
                    className={`flex w-full flex-col rounded-full px-8 py-3.5 transition-colors duration-200 ${activeTab === 'location' ? 'bg-white font-medium text-rose-500 shadow-md' : 'hover:bg-gray-100'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('location');
                    }}
                  >
                    <span className="w-full text-xs">여행지</span>
                    <input
                      type="text"
                      placeholder="여행지 검색"
                      className="w-full bg-transparent text-xs text-gray-500 outline-hidden placeholder:text-gray-500 sm:text-sm"
                    />
                  </div>
                </div>

                <Divider
                  className={`${activeTab === 'location' || activeTab === 'checkin' ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                />

                {/* 체크인/체크아웃 또는 날짜 탭 */}
                {searchMode === 'stays' ? (
                  <div className="flex items-center">
                    {/* 체크인 */}
                    <div className="flex rounded-full">
                      <div
                        className={`flex flex-col rounded-full px-8 py-3.5 transition-colors duration-200 ${activeTab === 'checkin' ? 'bg-white font-medium text-rose-500 shadow-md' : 'hover:bg-gray-100'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTabClick('checkin');
                        }}
                      >
                        <span className="text-xs">체크인</span>
                        <span className="truncate text-xs text-gray-500 sm:text-sm">날짜 추가</span>
                      </div>
                    </div>

                    <Divider
                      className={`${activeTab === 'checkin' || activeTab === 'checkout' ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                    />

                    {/* 체크아웃 */}
                    <div className="flex rounded-full">
                      <div
                        className={`flex flex-col rounded-full px-8 py-3.5 transition-colors duration-200 ${activeTab === 'checkout' ? 'bg-white font-medium text-rose-500 shadow-md' : 'hover:bg-gray-100'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTabClick('checkout');
                        }}
                      >
                        <span className="text-xs">체크아웃</span>
                        <span className="truncate text-xs text-gray-500 sm:text-sm">날짜 추가</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // 체험 날짜
                  <div className="flex flex-[1.2]">
                    <div
                      className={`flex flex-col rounded-full px-8 py-3.5 transition-colors duration-200 ${activeTab === 'date' ? 'bg-white font-medium text-rose-500 shadow-md' : 'hover:bg-gray-100'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabClick('date');
                      }}
                    >
                      <span className="text-xs">날짜</span>
                      <span className="truncate text-xs text-gray-500 sm:text-sm">날짜 추가</span>
                    </div>
                  </div>
                )}

                <Divider
                  className={`${activeTab === 'checkout' || activeTab === 'guest' || activeTab === 'date' ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                />

                {/* 여행자 탭 */}
                <div className="flex w-full rounded-full">
                  <div
                    className={`flex w-full flex-col rounded-full px-8 py-3.5 transition-colors duration-200 ${activeTab === 'guest' ? 'bg-white font-medium text-rose-500 shadow-md' : 'hover:bg-gray-100'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabClick('guest');
                    }}
                  >
                    <span className="w-full text-xs">여행자</span>
                    <span className="w-full truncate text-xs text-gray-500 sm:text-sm">게스트 추가</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            ref={searchButtonRef}
            className={`right-0 mr-1 flex items-center justify-center gap-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 sm:mr-2 ${isScrolled ? 'h-9 w-9' : 'absolute h-10 w-10 sm:h-12 sm:w-12'} ${activeTab ? 'w-20 sm:w-28' : ''} `}
            aria-label="검색"
            type="button"
          >
            <IoSearch size={isScrolled ? 16 : 18} />
            {!isScrolled && activeTab && <span className="text-xs font-medium text-nowrap sm:text-base">검색</span>}
          </button>
        </div>
      </div>

      {!isScrolled && activeTab && (
        <div
          ref={popupRef}
          className="search-popup absolute top-full left-0 z-20 mt-3 w-full rounded-3xl border bg-white p-6 shadow-lg"
        >
          {activeTab === 'location' && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">여행지 검색</h3>
            </div>
          )}
          {activeTab === 'checkin' && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">체크인 날짜 선택</h3>
            </div>
          )}
          {activeTab === 'checkout' && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">체크아웃 날짜 선택</h3>
            </div>
          )}
          {activeTab === 'date' && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">날짜 선택</h3>
            </div>
          )}
          {activeTab === 'guest' && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">인원 선택</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
