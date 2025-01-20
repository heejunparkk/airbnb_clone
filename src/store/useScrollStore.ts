import { create } from 'zustand';

interface ScrollState {
  isScrolled: boolean;
  setIsScrolled: (scrolled: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  isScrolled: false,
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
}));

// scroll 이벤트 리스너 등록 (앱 시작시 한 번만)
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    useScrollStore.getState().setIsScrolled(window.scrollY > 10);
  });
}
