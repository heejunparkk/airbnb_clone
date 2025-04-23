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
    <div ref={containerRef} className="flex flex-col items-center justify-center transform relative">
      <div ref={topButtonsRef} className="flex gap-1 mb-4">
        <button
          onClick={() => setSearchMode('stays')}
          className={`py-3 px-4 rounded-full ${
            searchMode === 'stays' ? 'text-black' : 'text-gray-500 hover:text-black hover:bg-gray-100'
          }`}
        >
          숙소
        </button>
        <button
          onClick={() => setSearchMode('experiences')}
          className={`py-3 px-4 rounded-full ${
            searchMode === 'experiences' ? 'text-black' : 'text-gray-500 hover:text-black hover:bg-gray-100'
          }`}
        >
          체험
        </button>
      </div>

      <div
        ref={searchBarShellRef}
        className={`
          border border-gray-300 rounded-full shadow-md hover:shadow-lg cursor-pointer w-full overflow-hidden
          ${isScrolled ? 'h-12 max-w-[400px]' : 'h-[66px] max-w-[850px]'}
          ${activeTab ? 'bg-gray-200' : 'bg-white'} // duration-0 제거
        `}
      >
        <div className="flex items-center h-full w-full relative">
          {' '}
          <div
            className={`
              flex items-center w-full
              ${isScrolled ? 'text-sm' : 'text-base'}
            `}
          >
            {isScrolled ? (
              <>
                {/* 스크롤 시 버튼들 */}
                <button
                  type="button"
                  onClick={() => handleTabClick('location')}
                  className="pr-4 pl-4 py-3 whitespace-nowrap"
                >
                  어디든지
                </button>
                <Divider />
                <button
                  type="button"
                  onClick={() => handleTabClick('checkin')}
                  className="pr-4 pl-4 py-3 whitespace-nowrap"
                >
                  언제든 일주일
                </button>
                <Divider />
                <button
                  type="button"
                  onClick={() => handleTabClick('guest')}
                  className="pr-4 pl-4 py-3 whitespace-nowrap"
                >
                  게스트 추가
                </button>
              </>
            ) : (
              // 스크롤 아닐 시 탭 구조
              <div className="flex items-center w-full">
                {/* 여행지 탭 */}
                <div className="flex rounded-full">
                  <div
                    className={`flex flex-col rounded-full py-3.5 pl-8 w-[250px] transition-colors duration-200
                    ${activeTab === 'location' ? 'bg-white text-rose-500 font-medium shadow-md' : 'hover:bg-gray-100'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('location');
                    }}
                  >
                    <span className="text-xs">여행지</span>
                    <input
                      type="text"
                      placeholder="여행지 검색"
                      className={`bg-transparent outline-none w-full placeholder:text-gray-500 text-sm text-gray-500`}
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
                        className={`flex flex-col rounded-full py-3.5 px-5 w-[150px] transition-colors duration-200
                        ${
                          activeTab === 'checkin' ? 'bg-white text-rose-500 font-medium shadow-md' : 'hover:bg-gray-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTabClick('checkin');
                        }}
                      >
                        <span className="text-xs">체크인</span>
                        <span className="text-sm text-gray-500">날짜 추가</span>
                      </div>
                    </div>
                    <Divider
                      className={`${activeTab === 'checkin' || activeTab === 'checkout' ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                    />
                    {/* 체크아웃 */}
                    <div className={`flex rounded-full`}>
                      <div
                        className={`flex flex-col rounded-full py-3.5 px-5 w-[150px] transition-colors duration-200
                        ${
                          activeTab === 'checkout'
                            ? 'bg-white text-rose-500 font-medium shadow-md'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTabClick('checkout');
                        }}
                      >
                        <span className="text-xs">체크아웃</span>
                        <span className="text-sm text-gray-500">날짜 추가</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // 체험 날짜
                  <div className="flex">
                    <div
                      className={`flex flex-col rounded-full px-5 py-3.5 pr-10 w-[301px] transition-colors duration-200
                      ${activeTab === 'date' ? 'bg-white text-rose-500 font-medium shadow-md' : 'hover:bg-gray-100'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabClick('date');
                      }}
                    >
                      <span className="text-xs">날짜</span>
                      <span className="text-sm text-gray-500">날짜 추가</span>
                    </div>
                  </div>
                )}
                <Divider
                  className={`${activeTab === 'checkout' || activeTab === 'guest' || activeTab === 'date' ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                />

                {/* 여행자 탭 */}
                <div className="flex">
                  <div
                    className={`flex flex-col rounded-full pl-5 py-3.5 w-[295px] transition-colors duration-200
                    ${activeTab === 'guest' ? 'bg-white text-rose-500 font-medium shadow-md' : 'hover:bg-gray-100'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabClick('guest');
                    }}
                  >
                    <span className="text-xs">여행자</span>
                    <span className="text-sm text-gray-500">게스트 추가</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            ref={searchButtonRef}
            className={`
              flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full mr-2 absolute right-0 overflow-hidden
              ${isScrolled ? 'h-9 w-9' : 'h-12 w-12'}
              ${activeTab && !isScrolled ? 'w-28' : ''} // GSAP으로 제어하므로 초기 너비만 설정
            `}
            aria-label="검색"
            type="button"
          >
            <IoSearch size={isScrolled ? 16 : 18} />
            <span
              className={`font-medium text-nowrap ${isScrolled ? 'hidden' : ''} ${activeTab ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
            >
              검색
            </span>
          </button>
        </div>
      </div>

      {!isScrolled && activeTab && (
        <div
          ref={popupRef}
          className="search-popup absolute top-full left-0 w-full mt-3 bg-white rounded-3xl shadow-lg border p-6 z-20"
        >
          {activeTab === 'location' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">여행지 검색</h3>
            </div>
          )}
          {activeTab === 'checkin' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">체크인 날짜 선택</h3>
            </div>
          )}
          {activeTab === 'checkout' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">체크아웃 날짜 선택</h3>
            </div>
          )}
          {activeTab === 'date' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">날짜 선택</h3>
            </div>
          )}
          {activeTab === 'guest' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">인원 선택</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
