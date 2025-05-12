'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { signIn as nextAuthSignIn } from 'next-auth/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signUp, signIn } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isLogin) {
        // 회원가입
        await signUp({
          email,
          password,
          name,
          phoneNumber,
        });
        onClose();
      } else {
        // 로그인
        await signIn({
          email,
          password,
        });
        onClose();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      // 소셜 로그인 구현
      const result = await nextAuthSignIn(provider, { callbackUrl: '/' });
      if (result?.error) {
        toast.error('로그인 중 오류가 발생했습니다.');
      }
      // 성공 시 모달 닫기
      if (result?.ok) {
        onClose();
      }
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error);
      toast.error('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="animate-modal w-full max-w-xl transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <div className="flex items-center justify-between border-b pb-4">
            <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100" aria-label="닫기">
              <XMarkIcon className="h-5 w-5" />
            </button>
            <span className="text-md font-semibold">로그인 또는 회원가입</span>
            <div className="w-5" />
          </div>

          <div className="pt-6 pb-4">
            <span className="text-xl">에어비앤비에 오신 것을 환영합니다.</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="이메일을 입력하세요"
                aria-label="이메일"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="비밀번호를 입력하세요"
                aria-label="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    이름
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    placeholder="이름을 입력하세요"
                    aria-label="이름"
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    전화번호
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    placeholder="전화번호를 입력하세요"
                    aria-label="전화번호"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-hidden"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-lg bg-rose-500 px-4 py-2 text-white hover:bg-rose-600 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {isLoading ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
            </button>

            <div className="text-center text-sm">
              {isLogin ? (
                <p>
                  계정이 없으신가요?{' '}
                  <button type="button" onClick={() => setIsLogin(false)} className="text-rose-500 hover:underline">
                    회원가입
                  </button>
                </p>
              ) : (
                <p>
                  이미 계정이 있으신가요?{' '}
                  <button type="button" onClick={() => setIsLogin(true)} className="text-rose-500 hover:underline">
                    로그인
                  </button>
                </p>
              )}
            </div>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">또는</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <button
              onClick={() => handleSocialLogin('naver')}
              className="relative flex w-full items-center justify-start rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <div className="absolute left-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{ display: 'block', height: '20px', width: '20px' }}
                >
                  <path fill="#03c75a" d="M19.92 16.77 11.76 5H5v22h7.08V15.22L20.24 27H27V5h-7.08z"></path>
                </svg>
              </div>
              <div className="grow text-center">네이버로 로그인하기</div>
            </button>

            <button
              onClick={() => handleSocialLogin('google')}
              className="relative flex w-full items-center justify-start rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <div className="absolute left-6">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{ display: 'block', height: '20px', width: '20px' }}
                >
                  <g fill="none" fillRule="nonzero">
                    <path
                      d="m31.36 16.36368c0-1.13456-.10176-2.22544-.29088-3.2728h-15.06912v6.18912h8.61088c-.37088 2-1.49808 3.69456-3.19264 4.82912v4.01456h5.17088c3.02544-2.78544 4.77088-6.88736 4.77088-11.76z"
                      fill="#4285f4"
                    ></path>
                    <path
                      d="m16 32c4.32 0 7.94176-1.4328 10.58896-3.87632l-5.17088-4.01456c-1.43264.96-3.26544 1.5272-5.41808 1.5272-4.16736 0-7.69456-2.81456-8.9528-6.59632h-5.34544v4.14544c2.6328 5.22912 8.04368 8.81456 14.29824 8.81456z"
                      fill="#34a853"
                    ></path>
                    <path
                      d="m7.0472 19.04c-.32-.96-.50176-1.98544-.50176-3.04s.18176-2.08.50176-3.04v-4.14544h-5.34544c-1.08352 2.16-1.70176 4.60368-1.70176 7.18544s.61824 5.02544 1.70176 7.18544z"
                      fill="#fbbc04"
                    ></path>
                    <path
                      d="m16 6.36368c2.34896 0 4.45808.8072 6.11632 2.39264l4.58912-4.58912c-2.77088-2.58176-6.3928-4.1672-10.70544-4.1672-6.25456 0-11.66544 3.58544-14.29824 8.81456l5.34544 4.14544c1.25824-3.78176 4.78544-6.59632 8.9528-6.59632z"
                      fill="#e94235"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="grow text-center">구글로 로그인하기</div>
            </button>

            <button
              onClick={() => handleSocialLogin('apple')}
              className="relative flex w-full items-center justify-start rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <div className="absolute left-6">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="presentation"
                  aria-hidden="true"
                  focusable="false"
                  style={{ display: 'block', height: '20px', width: '20px', fill: 'currentcolor' }}
                >
                  <path d="m13.3 2.1a5.1 5.1 0 0 1 3.8-2.1 5.1 5.1 0 0 1 -1.2 3.8 4.1 4.1 0 0 1 -3.6 1.7 4.5 4.5 0 0 1 1-3.4zm-5 3.7c-2.8 0-5.8 2.5-5.8 7.3 0 4.9 3.5 10.9 6.3 10.9 1 0 2.5-1 4-1s2.6.9 4 .9c3.1 0 5.3-6.4 5.3-6.4a5.3 5.3 0 0 1 -3.2-4.9 5.2 5.2 0 0 1 2.6-4.5 5.4 5.4 0 0 0 -4.7-2.4c-2 0-3.5 1.1-4.3 1.1-.9 0-2.4-1-4.2-1z"></path>
                </svg>
              </div>
              <div className="grow text-center">애플로 로그인하기</div>
            </button>

            <button
              onClick={() => handleSocialLogin('email')}
              className="relative flex w-full items-center justify-start rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <div className="absolute left-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{ display: 'block', height: '20px', width: '20px', fill: 'currentcolor' }}
                >
                  <path d="M30.51 5.88A5.06 5.06 0 0 0 26 3H6a5.06 5.06 0 0 0-4.51 2.88A4.94 4.94 0 0 0 1 8v16a5 5 0 0 0 5 5h20a5 5 0 0 0 5-5V8a4.94 4.94 0 0 0-.49-2.12ZM6 5h20a2.97 2.97 0 0 1 1.77.6L17.95 14a2.98 2.98 0 0 1-3.9 0L4.23 5.6A2.97 2.97 0 0 1 6 5Zm23 19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a2.97 2.97 0 0 1 .1-.74l9.65 8.27a4.97 4.97 0 0 0 6.5 0l9.65-8.27A2.97 2.97 0 0 1 29 8Z"></path>
                </svg>
              </div>
              <div className="grow text-center">이메일로 로그인하기</div>
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              className="relative flex w-full items-center justify-start rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <div className="absolute left-6">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="presentation"
                  aria-hidden="true"
                  focusable="false"
                  style={{ display: 'block', height: '20px', width: '20px', fill: '#1877F2' }}
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </div>
              <div className="grow text-center">페이스북으로 로그인하기</div>
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
