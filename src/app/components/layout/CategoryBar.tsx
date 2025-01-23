'use client';

import { useEffect, useRef, useState } from 'react';
import {
  HomeIcon,
  BuildingOfficeIcon,
  HomeModernIcon,
  CameraIcon,
  FireIcon,
  BeakerIcon,
  BuildingLibraryIcon,
  CakeIcon,
  SunIcon,
  WifiIcon,
  MapIcon,
  GlobeAsiaAustraliaIcon,
  ArrowPathIcon,
  CloudIcon,
  HeartIcon,
  StarIcon,
  TrophyIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { useScrollStore } from '@/store/useScrollStore';
import { useRouter, usePathname } from 'next/navigation';

const categories = [
  { name: '인기 급상승', icon: FireIcon },
  { name: '한옥', icon: HomeModernIcon },
  { name: '해변 근처', icon: WifiIcon },
  { name: '최고의 전망', icon: CameraIcon },
  { name: '료칸', icon: HomeModernIcon },
  { name: '캐슬', icon: BuildingLibraryIcon },
  { name: '열대지역', icon: SunIcon },
  { name: '국립공원', icon: MapIcon },
  { name: '섬', icon: GlobeAsiaAustraliaIcon },
  { name: '수영장', icon: ArrowPathIcon },
  { name: '스키장', icon: CloudIcon },
  { name: '디자인하우스', icon: SparklesIcon },
  { name: '초소형 주택', icon: HomeIcon },
  { name: '신규', icon: SparklesIcon },
  { name: '저택', icon: BuildingOfficeIcon },
  { name: '키즈 친화적', icon: HeartIcon },
  { name: '최고 평점', icon: StarIcon },
  { name: '슈퍼호스트', icon: TrophyIcon },
  { name: '럭셔리', icon: SparklesIcon },
  { name: '트리하우스', icon: MapIcon },
  { name: '통나무집', icon: HomeIcon },
  { name: '캠핑장', icon: MapIcon },
  { name: '농장', icon: HomeModernIcon },
  { name: '북극', icon: CloudIcon },
  { name: '사막', icon: SunIcon },
  { name: '동굴', icon: CloudIcon },
  { name: 'B&B', icon: CakeIcon },
  { name: '우주정거장', icon: SparklesIcon },
  { name: '기상천외한 숙소', icon: BeakerIcon },
];

export default function CategoryBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isScrolled } = useScrollStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 600; // 스크롤 단위 조절
    const targetScroll =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

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
      const isEnd =
        Math.abs(
          container.scrollWidth - container.clientWidth - container.scrollLeft
        ) < 1;
      setIsAtEnd(isEnd);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === '인기 급상승') {
      router.push('/');
    } else {
      const encodedCategory = encodeURIComponent(categoryName);
      router.push(`/category/${encodedCategory}`);
    }
  };

  const isSelected = (categoryName: string) => {
    if (categoryName === '인기 급상승' && pathname === '/') return true;
    return pathname === `/category/${encodeURIComponent(categoryName)}`;
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

  return (
    <div
      className={`fixed px-20 left-0 right-0 bg-white transition-all duration-200 ${
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
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`flex flex-col items-center mt-4 gap-2 min-w-[56px] pb-3 transition-colors
                ${
                  isSelected(category.name)
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
