'use client';

import Link from 'next/link';
import { FaGlobe, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';

const Footer = () => {
  const [currency, setCurrency] = useState('KRW');
  const [language, setLanguage] = useState('한국어');

  // 통화 변경 핸들러
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    // 통화 변경 로직 추가
  };

  // 언어 변경 핸들러
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // 언어 변경 로직 추가
  };

  const footerLinks = [
    {
      category: '에어비앤비 지원',
      links: [
        { text: '도움말 센터', url: '/help' },
        { text: '안전 정보', url: '/safety' },
        { text: '예약 취소 옵션', url: '/cancellation-options' },
        { text: '에어비앤비의 코로나19 대응 방안', url: '/covid-19' },
        { text: '장애인 지원', url: '/accessibility' },
        { text: '이웃 민원 신고', url: '/neighbors' },
      ],
    },
    {
      category: '커뮤니티',
      links: [
        { text: '에어비앤비.org: 재난 구호 숙소', url: '/airbnb-org' },
        { text: '차별 철폐를 위한 노력', url: '/against-discrimination' },
        { text: '친구 초대하기', url: '/referrals' },
      ],
    },
    {
      category: '호스팅',
      links: [
        { text: '호스팅 시작하기', url: '/host' },
        { text: '호스팅을 위한 에어커버', url: '/aircover-for-hosts' },
        { text: '호스팅 자료 둘러보기', url: '/hosting-resources' },
        { text: '커뮤니티 포럼 방문하기', url: '/community' },
        { text: '책임감 있는 호스팅', url: '/responsible-hosting' },
      ],
    },
    {
      category: '에어비앤비',
      links: [
        { text: '뉴스룸', url: '/news' },
        { text: '새로운 기능', url: '/features' },
        { text: '채용 정보', url: '/careers' },
        { text: '투자자 정보', url: '/investors' },
        { text: '선물 카드', url: '/giftcards' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200 pt-6 pb-8 mt-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-sm font-semibold mb-4">{section.category}</h3>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx} className="mb-2">
                    <Link href={link.url} className="text-sm text-gray-600 hover:underline">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-gray-200 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="text-sm">© {new Date().getFullYear()} Airbnb, Inc. All rights reserved</div>
            <div className="flex items-center space-x-4">
              <Link href="/terms" className="text-sm text-gray-600 hover:underline">
                개인정보 처리방침
              </Link>
              <span className="text-gray-400">·</span>
              <Link href="/terms" className="text-sm text-gray-600 hover:underline">
                이용약관
              </Link>
              <span className="text-gray-400">·</span>
              <Link href="/sitemaps" className="text-sm text-gray-600 hover:underline">
                사이트맵
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              className="flex items-center text-sm font-medium"
              onClick={() => handleLanguageChange(language === '한국어' ? 'English' : '한국어')}
            >
              <FaGlobe className="mr-2" /> {language}
            </button>
            <button
              className="text-sm font-medium"
              onClick={() => handleCurrencyChange(currency === 'KRW' ? 'USD' : 'KRW')}
            >
              {currency}
            </button>
            <div className="flex items-center space-x-4">
              <Link href="https://facebook.com/airbnb" className="text-gray-700 hover:text-gray-900">
                <FaFacebookF />
              </Link>
              <Link href="https://twitter.com/airbnb" className="text-gray-700 hover:text-gray-900">
                <FaTwitter />
              </Link>
              <Link href="https://instagram.com/airbnb" className="text-gray-700 hover:text-gray-900">
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
