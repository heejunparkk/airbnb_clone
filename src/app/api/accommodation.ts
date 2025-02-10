export async function getCategoryAccommodations(category: string) {
  const response = await fetch(`/api/accommodations?category=${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch accommodations');
  }
  return response.json();
}

export async function getAccommodationDetail(id: string) {
  const response = await fetch(`/api/accommodations/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch accommodation detail');
  }
  return response.json();
}

// 기타 숙소 관련 API 함수들...
