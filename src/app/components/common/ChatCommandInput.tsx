'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { IoSend } from 'react-icons/io5';
import { categories } from '@/app/components/common/Categories';

export default function ChatCommandInput() {
  const router = useRouter();
  const [chatInput, setChatInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInput, setShowInput] = useState(false);

  // ChatGPT API로 명령어 처리 - VoiceCommandButton과 동일한 로직 사용
  const processChatGPT = useCallback(
    async (command: string) => {
      setIsProcessing(true);
      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: command }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API 요청 실패: ${response.status} ${response.statusText}, ${errorText}`);
        }

        const data = await response.json();
        const { result } = data;

        setFeedback(result.message);

        // 네비게이션 액션이면 해당 카테고리로 이동
        if (result.action === 'navigate' && result.category) {
          const targetCategory = categories.find((cat) => cat.name === result.category);

          if (targetCategory) {
            if (targetCategory.name === '인기 급상승') {
              router.push('/');
            } else {
              router.push(`/category/${targetCategory.value}`);
            }
          }
        }
      } catch (error) {
        console.error('API 요청 오류:', error);
        setFeedback('명령을 처리하는 중 오류가 발생했습니다.');
      } finally {
        setIsProcessing(false);
      }
    },
    [router]
  );

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      processChatGPT(chatInput.trim());
      setChatInput(''); // 입력 필드 초기화
    }
  };

  const toggleChatInput = () => {
    setShowInput(!showInput);
    if (!showInput) {
      // 입력창이 표시될 때 피드백 메시지 초기화
      setFeedback('');
    }
  };

  return (
    <div className="relative">
      {/* 채팅 버튼 */}
      <button
        onClick={toggleChatInput}
        className="fixed bottom-6 left-6 z-20 rounded-full bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:bg-gray-100"
        aria-label={showInput ? '채팅 입력 닫기' : '채팅 입력 열기'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 text-gray-700"
        >
          <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
          <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
        </svg>
      </button>

      {/* 채팅 입력 폼 */}
      {showInput && (
        <form onSubmit={handleChatSubmit} className="fixed right-24 bottom-6 left-24 z-20 flex">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="명령어를 입력하세요... (예: 한옥 카테고리 열어줘)"
            className="grow rounded-l-lg border border-gray-300 p-3 focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
            autoFocus
          />
          <button
            type="submit"
            className={`rounded-r-lg p-3 ${
              isProcessing ? 'bg-gray-400' : 'bg-rose-500 hover:bg-rose-600'
            } text-white transition-colors duration-200`}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              <IoSend className="h-6 w-6" />
            )}
          </button>
        </form>
      )}

      {/* 피드백 표시 */}
      {(feedback || isProcessing) && showInput && (
        <div className="fixed bottom-24 left-6 z-20 max-w-xs rounded-lg bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
          {isProcessing ? (
            <div className="flex items-center text-gray-600">
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-rose-500 border-t-transparent"></div>
              처리 중...
            </div>
          ) : (
            <p className="font-medium text-gray-800">{feedback}</p>
          )}
        </div>
      )}
    </div>
  );
}
