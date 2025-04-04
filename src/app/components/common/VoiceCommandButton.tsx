'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MdMic, MdMicOff } from 'react-icons/md';
import { categories } from '@/app/components/common/Categories';

export default function VoiceCommandButton() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // SpeechRecognition 객체 설정
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 타입 단언을 사용하여 TypeScript에게 전역 객체 타입을 알려줍니다
      const SpeechRecognitionAPI =
        window.SpeechRecognition || (window.webkitSpeechRecognition as typeof SpeechRecognition);

      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        recognitionRef.current = recognition;
      }
    }
  }, []);

  const processVoiceCommand = useCallback(
    (command: string) => {
      setTranscript(command);

      // 카테고리 이동 명령어 처리
      for (const category of categories) {
        const regex = new RegExp(`${category.name}.*(?:보여|이동|가|찾아)`, 'i');
        if (regex.test(command)) {
          setFeedback(`${category.name} 카테고리로 이동합니다.`);

          if (category.name === '인기 급상승') {
            router.push('/');
          } else {
            router.push(`/category/${category.value}`);
          }
          return;
        }
      }

      // 홈으로 이동 명령어
      if (/(?:홈|메인).*(?:가|이동|보여)/i.test(command)) {
        setFeedback('홈으로 이동합니다.');
        router.push('/');
        return;
      }

      setFeedback('명령어를 인식하지 못했습니다.');
    },
    [router]
  );

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      setFeedback('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setFeedback('');
    } else {
      try {
        recognitionRef.current.lang = 'ko-KR';
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const command = event.results[0][0].transcript;
          processVoiceCommand(command);
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error', event.error);
          setFeedback(`오류가 발생했습니다: ${event.error}`);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.start();
        setTranscript('');
        setFeedback('듣고 있습니다...');
        setIsListening(true);
      } catch (error) {
        console.error('음성 인식 시작 오류:', error);
        setFeedback('음성 인식을 시작할 수 없습니다.');
      }
    }
  }, [isListening, processVoiceCommand]);

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 음성 인식 종료
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  return (
    <div className="relative">
      <button
        onClick={toggleListening}
        className={`fixed bottom-6 right-6 z-20 p-4 rounded-full shadow-lg transition-all ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-white hover:bg-gray-100'
        }`}
        aria-label={isListening ? '음성 인식 중지' : '음성 인식 시작'}
      >
        {isListening ? <MdMic className="w-6 h-6 text-white" /> : <MdMicOff className="w-6 h-6 text-gray-700" />}
      </button>

      {/* 음성 피드백 표시 */}
      {(isListening || feedback) && (
        <div className="fixed bottom-20 right-6 bg-white p-4 rounded-lg shadow-md max-w-xs z-20">
          {isListening && <p className="text-blue-500 font-medium">듣고 있습니다...</p>}
          {transcript && <p className="text-gray-700 mt-1">&quot;{transcript}&quot;</p>}
          {feedback && <p className="text-gray-800 font-medium mt-1">{feedback}</p>}
        </div>
      )}
    </div>
  );
}
