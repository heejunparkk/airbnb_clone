'use client';

import Image from 'next/image';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative aspect-square rounded-xl overflow-hidden group">
      <div
        className="absolute w-full h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="absolute w-full h-full" style={{ left: `${index * 100}%` }}>
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* 이미지가 2장 이상일 때만 화살표 버튼 표시 */}
      {images.length > 1 && (
        <>
          {/* 이전 버튼 */}
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-80 transition-opacity"
            aria-label="이전 이미지"
          >
            <IoIosArrowBack className="w-4 h-4" />
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-80 transition-opacity"
            aria-label="다음 이미지"
          >
            <IoIosArrowForward className="w-4 h-4" />
          </button>

          {/* 인디케이터 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
