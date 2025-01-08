'use client';

import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import SearchBar from '../common/SearchBar';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import NavTabs from '../common/NavTabs';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <Link href="/" className="text-rose-500">
            <Image
              src="/Airbnb_Logo.svg"
              alt="Airbnb"
              width={102}
              height={32}
              priority
            />
          </Link>

          {/* 스크롤 시 보이는 검색바 */}
          {isScrolled ? (
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <SearchBar isScrolled={isScrolled} />
            </div>
          ) : (
            <NavTabs />
          )}

          {/* 사용자 메뉴 */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="hidden md:block hover:bg-gray-100 px-4 py-2 rounded-full"
            >
              당신의 공간을 에어비앤비하세요
            </button>

            <Menu as="div" className="relative inline-block">
              <Menu.Button className="flex items-center gap-3 p-2 border rounded-full hover:shadow-md">
                <UserCircleIcon className="h-6 w-6" />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/login"
                        className={`block px-4 py-2 ${
                          active ? 'bg-gray-100' : ''
                        }`}
                      >
                        로그인
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/signup"
                        className={`block px-4 py-2 ${
                          active ? 'bg-gray-100' : ''
                        }`}
                      >
                        회원가입
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
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
        <div className="hidden md:block">
          <SearchBar isScrolled={isScrolled} />
        </div>
      </div>
    </header>
  );
}
