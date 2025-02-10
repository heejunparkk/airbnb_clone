'use client';

import { useState, useEffect, useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useSearchStore } from '@/store/useSearchStore';
import Divider from '../common/Divider';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  isScrolled: boolean;
}

type TabType = '여행지' | '체크인' | '체크아웃' | '여행자' | '날짜' | null;

export default function SearchBar({ isScrolled }: SearchBarProps) {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { searchMode, setSearchMode } = useSearchStore();

  const [activeTab, setActiveTab] = useState<TabType>(null);
  const [hoveredLocation, setHoveredLocation] = useState(false);
  const [hoveredCheckin, setHoveredCheckin] = useState(false);
  const [hoveredCheckout, setHoveredCheckout] = useState(false);
  const [hoveredGuest, setHoveredGuest] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(false);

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
      if (!isScrolled && activeTab) {
        setActiveTab(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab, isScrolled]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div className="flex flex-col items-center justify-center transform relative">
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            ref={searchBarRef}
            className="flex gap-1 mb-4"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        className={`
          border border-gray-300 rounded-full shadow-md hover:shadow-lg cursor-pointer
          ${isScrolled ? 'h-12 max-w-[400px]' : 'h-[66px] w-[850px]'}
          ${activeTab ? 'bg-gray-200 duration-0' : 'bg-white'}
        `}
        animate={{
          height: isScrolled ? 48 : 66,
          width: isScrolled ? 400 : 850,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 30,
        }}
      >
        <motion.div layout className="flex items-center h-full w-full">
          <div
            ref={searchBarRef}
            className={`
              flex items-center
              ${isScrolled ? 'text-sm' : 'text-base'}
            `}
          >
            {isScrolled ? (
              <>
                <button type="button" onClick={() => handleTabClick('여행지')} className="pr-4 pl-4 py-3">
                  어디든지
                </button>
                <Divider />
                <button type="button" onClick={() => handleTabClick('체크인')} className="px-4 py-3">
                  언제든 일주일
                </button>

                <Divider />
                <button type="button" onClick={() => handleTabClick('여행자')} className="px-4 py-3">
                  게스트 추가
                </button>
              </>
            ) : (
              <div className="flex items-center">
                <div className={`flex rounded-full py-3.5 w-[250px] grow-[25vw]`}>
                  <div
                    className={`flex flex-col rounded-full py-3.5 pl-8 pr-10
                    ${
                      activeTab === '여행지'
                        ? 'bg-white text-rose-500 font-medium shadow-md'
                        : activeTab === '체크인'
                          ? 'hover:bg-gray-300'
                          : activeTab === '체크아웃' || activeTab === '여행자'
                            ? 'hover:bg-gray-300'
                            : 'hover:bg-gray-200'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('여행지');
                    }}
                    onMouseEnter={() => setHoveredLocation(true)}
                    onMouseLeave={() => setHoveredLocation(false)}
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
                </div>

                <Divider
                  className={`${
                    !hoveredLocation &&
                    !hoveredCheckin &&
                    !hoveredDate &&
                    activeTab !== '여행지' &&
                    activeTab !== '체크인' &&
                    activeTab !== '날짜'
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                />

                {searchMode === 'stays' ? (
                  <div className="flex items-center">
                    <div className={`flex rounded-full`}>
                      <div
                        className={`flex flex-col rounded-full py-3.5 px-5 w-[150px]
                        ${
                          activeTab === '체크인'
                            ? 'bg-white text-rose-500 font-medium shadow-md'
                            : activeTab === '여행지'
                              ? 'hover:bg-gray-300'
                              : activeTab === '체크아웃' || activeTab === '여행자'
                                ? 'hover:bg-gray-300'
                                : 'hover:bg-gray-200'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTabClick('체크인');
                        }}
                        onMouseEnter={() => setHoveredCheckin(true)}
                        onMouseLeave={() => setHoveredCheckin(false)}
                      >
                        <span className="text-xs">체크인</span>
                        <span className="text-sm text-gray-500">날짜 추가</span>
                      </div>
                    </div>

                    <Divider
                      className={`${
                        !hoveredCheckin && !hoveredCheckout && activeTab !== '체크인' && activeTab !== '체크아웃'
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    />

                    <div className={`flex rounded-full`}>
                      <div
                        className={`flex flex-col rounded-full py-3.5 px-5 w-[150px]
                        ${
                          activeTab === '체크아웃'
                            ? 'bg-white text-rose-500 font-medium shadow-md'
                            : activeTab
                              ? 'bg-gray-200 hover:bg-gray-300'
                              : 'hover:bg-gray-200'
                        }`}
                        onClick={() => handleTabClick('체크아웃')}
                        onMouseEnter={() => setHoveredCheckout(true)}
                        onMouseLeave={() => setHoveredCheckout(false)}
                      >
                        <span className="text-xs">체크아웃</span>
                        <span className="text-sm text-gray-500">날짜 추가</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div
                      className={`flex flex-col rounded-full px-5 py-3.5 pr-10 w-[300px]
                    ${
                      activeTab === '날짜'
                        ? 'bg-white text-rose-500 font-medium shadow-md'
                        : activeTab
                          ? 'bg-gray-200 hover:bg-gray-300'
                          : 'hover:bg-gray-200'
                    }`}
                      onClick={() => handleTabClick('날짜')}
                      onMouseEnter={() => setHoveredDate(true)}
                      onMouseLeave={() => setHoveredDate(false)}
                    >
                      <span className="text-xs">날짜</span>
                      <span className="text-sm text-gray-500">날짜 추가</span>
                    </div>
                  </div>
                )}

                <Divider
                  className={`${
                    !hoveredCheckout &&
                    !hoveredGuest &&
                    !hoveredDate &&
                    activeTab !== '체크아웃' &&
                    activeTab !== '여행자' &&
                    activeTab !== '날짜'
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                />

                <div className="flex">
                  <div
                    className={`flex flex-col rounded-full pl-5 py-3.5 w-[295px]
                    ${
                      activeTab === '여행자'
                        ? 'bg-white text-rose-500 font-medium shadow-md'
                        : activeTab
                          ? 'bg-gray-200 hover:bg-gray-300'
                          : 'hover:bg-gray-200'
                    }`}
                    onClick={() => handleTabClick('여행자')}
                    onMouseEnter={() => setHoveredGuest(true)}
                    onMouseLeave={() => setHoveredGuest(false)}
                  >
                    <span className="text-xs">여행자</span>
                    <span className="text-sm text-gray-500">게스트 추가</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className={`
            flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-all mr-2 absolute right-0
            ${isScrolled ? 'h-9 w-9' : 'h-12 w-12'}
            ${activeTab ? 'w-28' : ''}
          `}
            aria-label="검색"
            type="button"
          >
            <IoSearch size={isScrolled ? 16 : 18} />
            {!isScrolled && activeTab && <span className="font-medium text-nowrap">검색</span>}
          </button>
        </motion.div>
      </motion.div>

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
          {activeTab === '날짜' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">날짜 선택</h3>
              {/* 날짜 선택 달력 */}
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
