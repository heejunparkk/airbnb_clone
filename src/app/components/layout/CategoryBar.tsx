'use client';

import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useScrollStore } from '@/store/useScrollStore';
import { useRouter, usePathname } from 'next/navigation';
import { categories } from '@/app/components/common/Categories';

export default function CategoryBar() {
  const router = useRouter();
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isScrolled } = useScrollStore();
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 600; // 스크롤 단위 조절
    const targetScroll =
      direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setIsAtStart(container.scrollLeft <= 0);
      // 스크롤이 끝에 도달했는지 확인
      const isEnd = Math.abs(container.scrollWidth - container.clientWidth - container.scrollLeft) < 1;
      setIsAtEnd(isEnd);
    }
  };

  const handleCategoryClick = async (categoryName: string, categoryValue: string) => {
    if (categoryName === '인기 급상승') {
      router.push('/');
    } else {
      router.push(`/category/${categoryValue}`);
    }
  };

  const isSelected = (categoryValue: string) => {
    if (categoryValue === 'trending' && pathname === '/') return true;
    return pathname === `/category/${categoryValue}`;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // 초기 상태 체크
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // accommodation 페이지에서는 카테고리바를 숨김
  if (pathname?.startsWith('/accommodation/')) {
    return null;
  }

  return (
    <div
      className={`fixed px-20 left-0 right-0 bg-white transition-all duration-200 z-[1] ${
        isScrolled ? 'shadow-md top-[80px]' : 'top-[168px]'
      }`}
    >
      <div className="relative">
        {/* 왼쪽 화살표 */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 border border-gray-400 bg-white rounded-full p-2 hover:scale-105 transition-all duration-200 ${
            isAtStart ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
          aria-label="Scroll left"
        >
          <IoIosArrowBack className="w-4 h-4" />
        </button>
        {/* 왼쪽 그라데이션 */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white via-white to-transparent pointer-events-none z-[5] transition-all duration-200 ${
            isAtStart ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        />

        {/* 카테고리 컨테이너 */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-8 overflow-x-auto scrollbar-hide scroll-smooth pl-1"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryClick(category.name, category.value)}
              className={`flex flex-col items-center mt-4 gap-2 min-w-[56px] pb-3 transition-colors
                ${
                  isSelected(category.value)
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-700 hover:text-black border-b-2 border-transparent hover:border-gray-300'
                }`}
            >
              <category.icon className="h-6 w-6" />
              <span className="text-xs whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>

        {/* 오른쪽 그라데이션 */}
        <div
          className={`absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white via-white to-transparent pointer-events-none z-[5] transition-all duration-200 ${
            isAtEnd ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        />
        {/* 오른쪽 화살표 */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 border border-gray-400 bg-white rounded-full p-2 hover:scale-105 transition-all duration-200 ${
            isAtEnd ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
          aria-label="Scroll right"
        >
          <IoIosArrowForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
