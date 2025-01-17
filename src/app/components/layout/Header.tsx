'use client';

import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import SearchBar from '../common/SearchBar';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import NavTabs from '../common/NavTabs';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (isMenuOpen && !(e.target as Element).closest('.relative')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [isMenuOpen]);

  return (
    <header
      className={`
        fixed w-full bg-white border-b z-10 transition-all duration-300
        ${isScrolled ? 'h-16' : 'h-[168px]'}
      `}
    >
      {/* 상단 영역 - 고정 높이 */}
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* 로고 */}
          <div className="w-1/3 flex justify-start">
            <Link href="/" className="text-rose-500">
              <Image
                src="/Airbnb_Logo.svg"
                alt="Airbnb"
                width={102}
                height={32}
                priority
              />
            </Link>
          </div>

          {/* 중앙 검색바 */}
          <div className="w-1/3 flex justify-center items-center">
            {isScrolled ? (
              <div className="hidden md:block w-full max-w-2xl mx-auto">
                <SearchBar isScrolled={isScrolled} />
              </div>
            ) : (
              <NavTabs />
            )}
          </div>

          {/* 사용자 메뉴 */}
          <div className="w-1/3 flex justify-end">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="hidden md:block hover:bg-gray-100 px-4 py-2 rounded-full text-sm"
              >
                당신의 공간을 에어비앤비하세요
              </button>

              <div className="relative inline-block">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-3 p-2 border rounded-full hover:shadow-md"
                  aria-label="사용자 메뉴"
                  title="사용자 메뉴"
                >
                  <UserCircleIcon className="h-6 w-6" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsLoginModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        로그인
                      </button>
                      <button
                        onClick={() => {
                          setIsSignupModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        회원가입
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 영역 - 스크롤에 따라 변화 */}
      <div
        className={`
          container mx-auto px-4 transition-all duration-300
          ${isScrolled ? 'hidden' : 'block'}
        `}
      >
        <div className="hidden md:block max-w-2xl mx-auto">
          <SearchBar isScrolled={isScrolled} />
        </div>
      </div>

      {isLoginModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsLoginModalOpen(false);
            }
          }}
        >
          <div
            className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-xl mx-auto 
            min-h-[500px] sm:min-h-[600px] md:min-h-[745px]
            max-h-[745px] overflow-y-auto
            animate-modal relative"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4">로그인</h2>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            {/* 로그인 폼 내용 */}
          </div>
        </div>
      )}

      {isSignupModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSignupModalOpen(false);
            }
          }}
        >
          <div
            className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-xl mx-auto 
            min-h-[500px] sm:min-h-[600px] md:min-h-[745px]
            max-h-[745px] overflow-y-auto
            animate-modal relative"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4">회원가입</h2>
            <button
              onClick={() => setIsSignupModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            {/* 회원가입 폼 내용 */}
          </div>
        </div>
      )}
    </header>
  );
}
