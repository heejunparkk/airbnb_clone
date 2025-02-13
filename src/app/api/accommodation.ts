import { Accommodation } from '@/types/accommodation';
import { accommodations } from '@/app/data/data';

// API 함수들
export const accommodationApi = {
  // 전체 숙소 목록 조회
  getAll: async (): Promise<Accommodation[]> => {
    // 실제로는 API 호출하지만, 지금은 더미데이터 사용
    return accommodations;
  },

  // 카테고리별 숙소 조회
  getByCategory: async (category: string): Promise<Accommodation[]> => {
    return accommodations.filter((acc) => acc.category === category);
  },

  // 단일 숙소 상세 조회
  getById: async (id: number): Promise<Accommodation | undefined> => {
    return accommodations.find((acc) => acc.id === id);
  },
};

// export async function getCategoryAccommodations(category: string) {
//   const response = await fetch(`/api/accommodations?category=${category}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch accommodations');
//   }
//   return response.json();
// }

// export async function getAccommodationDetail(id: string) {
//   const response = await fetch(`/api/accommodations/${id}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch accommodation detail');
//   }
//   return response.json();
// }

// 기타 숙소 관련 API 함수들...
