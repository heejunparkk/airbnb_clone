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
  const [isProcessing, setIsProcessing] = useState(false);
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

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 음성 인식 종료
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  // ChatGPT API로 명령어 처리
  const processChatGPT = useCallback(
    async (command: string) => {
      setIsProcessing(true);
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: command }),
        });

        if (!response.ok) {
          throw new Error('API 요청 실패');
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

  const processVoiceCommand = useCallback(
    (command: string) => {
      setTranscript(command);
      processChatGPT(command);
    },
    [processChatGPT]
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
          // 오류 유형에 따른 메시지 설정
          if (event.error === 'no-speech') {
            setFeedback('음성이 감지되지 않았습니다. 다시 시도해주세요.');
          } else if (event.error === 'aborted') {
            setFeedback('음성 인식이 중단되었습니다.');
          } else if (event.error === 'audio-capture') {
            setFeedback('마이크를 사용할 수 없습니다. 마이크 설정을 확인해주세요.');
          } else if (event.error === 'network') {
            setFeedback('네트워크 오류가 발생했습니다.');
          } else {
            setFeedback(`오류가 발생했습니다: ${event.error}`);
          }
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.start();
        setTranscript('');
        // setFeedback('듣고 있습니다... (5초 내에 말씀해주세요)');
        setIsListening(true);

        // 타이머 설정
        const timer = setTimeout(() => {
          if (isListening && recognitionRef.current) {
            setFeedback('시간이 초과되었습니다. 다시 시도해주세요.');
            recognitionRef.current.stop();
          }
        }, 7000); // 7초 후 자동 중지 (실제 인식 시간보다 약간 길게 설정)

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('음성 인식 시작 오류:', error);
        setFeedback('음성 인식을 시작할 수 없습니다.');
      }
    }
  }, [isListening, processVoiceCommand]);

  return (
    <div className="relative">
      <button
        onClick={toggleListening}
        className={`fixed bottom-6 right-6 z-20 p-4 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-all ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-white hover:bg-gray-100'
        }`}
        aria-label={isListening ? '음성 인식 중지' : '음성 인식 시작'}
        disabled={isProcessing}
      >
        {isListening ? <MdMic className="w-6 h-6 text-white" /> : <MdMicOff className="w-6 h-6 text-gray-700" />}
      </button>

      {/* 음성 피드백 표시 */}
      {(isListening || feedback || isProcessing) && (
        <div className="fixed bottom-24 right-6 bg-white p-4 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.2)] max-w-xs z-20">
          {(isListening && <p className="text-blue-500 font-medium">듣고 있습니다... (5초 내에 말씀해주세요)</p>) ||
            (transcript && !isProcessing && <p className="text-gray-700 mt-1">&quot;{transcript}&quot;</p>) ||
            (isProcessing && (
              <div className="flex items-center text-gray-600">
                <div className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
                처리 중...
              </div>
            )) ||
            (feedback && !isProcessing && <p className="text-gray-800 font-medium mt-1">{feedback}</p>)}
        </div>
      )}
    </div>
  );
}
