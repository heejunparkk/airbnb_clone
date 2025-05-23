import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.accommodation.deleteMany({});

  // house 폴더 이미지 파일 목록
  const houseImages = [
    '/images/house/alberto-castillo-q-mx4mSkK9zeo-unsplash.jpg',
    '/images/house/alejandra-cifre-gonzalez-5nYLmG1m5lw-unsplash.jpg',
    '/images/house/alejandra-cifre-gonzalez-ylyn5r4vxcA-unsplash.jpg',
    '/images/house/alexander-andrews-Dr6VBM0KNsw-unsplash.jpg',
    '/images/house/andy-holmes-f6eWKcd8_dA-unsplash.jpg',
    '/images/house/ann-wallace-biepNX5n7r4-unsplash.jpg',
    '/images/house/aubrey-odom-ITzfgP77DTg-unsplash.jpg',
    '/images/house/avi-werde-hHz4yrvxwlA-unsplash.jpg',
    '/images/house/bailey-anselme-Bkp3gLygyeA-unsplash.jpg',
    '/images/house/bernard-hermant-KqOLr8OiQLU-unsplash.jpg',
    '/images/house/daniel-barnes-RKdLlTyjm5g-unsplash.jpg',
    '/images/house/derick-mckinney-rah5oKpjMSY-unsplash.jpg',
    '/images/house/dhruv-saran-mehra-EItAcdPP-kk-unsplash.jpg',
    '/images/house/dillon-kydd-2keCPb73aQY-unsplash.jpg',
    '/images/house/dillon-kydd-3Ignkeds3w8-unsplash.jpg',
    '/images/house/dillon-kydd-XGvwt544g8k-unsplash.jpg',
    '/images/house/emily-campbell-gVG8cRjHF-8-unsplash.jpg',
    '/images/house/florian-schmidinger-b_79nOqf95I-unsplash.jpg',
    '/images/house/floris-bronkhorst-OLFA5DgSIFo-unsplash.jpg',
    '/images/house/greg-rivers-rChFUMwAe7E-unsplash.jpg',
    '/images/house/ian-macdonald--dcznEJPmsk-unsplash.jpg',
    '/images/house/ian-macdonald-pmqTJDVbKdM-unsplash.jpg',
    '/images/house/ibrahim-rifath-wj6Qz24kwUA-unsplash.jpg',
  ];

  // interior 폴더 이미지 파일 목록 (예시)
  const interiorImages = [
    '/images/interior/andrea-davis-fvQ_WLAs5YQ-unsplash.jpg',
    '/images/interior/andy-vult-zwZpdhoTbU0-unsplash.jpg',
    '/images/interior/angelina-cXmER3VNxUA-unsplash.jpg',
    '/images/interior/annie-spratt-Q2QhOxN5enk-unsplash.jpg',
    '/images/interior/annie-spratt-tJ8x4oCQ5jE-unsplash.jpg',
    '/images/interior/arno-smit-iI72r3gSwWY-unsplash.jpg',
    '/images/interior/aranprime-KbytCpI1i5I-unsplash.jpg',
    '/images/interior/beazy-aX1TTOuq83M-unsplash.jpg',
    '/images/interior/beazy-RuCVvjuyNeQ-unsplash.jpg',
    '/images/interior/behzad-ghaffarian-nhWgZNV85LQ-unsplash.jpg',
    '/images/interior/billy-jo-catbagan-HR1x0_5dakE-unsplash.jpg',
    '/images/interior/christian-mackie-cc0Gg3BegjE-unsplash.jpg',
    '/images/interior/christopher-burns-BdVQU-NDtA8-unsplash.jpg',
    '/images/interior/cody-weiss-hEMYwIE6GEY-unsplash.jpg',
  ];

  // 랜덤 이미지 선택 함수
  const getRandomHouseImage = () => {
    return houseImages[Math.floor(Math.random() * houseImages.length)];
  };

  // 중복되지 않는 랜덤 이미지 선택
  const getRandomInteriorImages = (count = 3) => {
    const shuffled = [...interiorImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const accommodations = [
    {
      title: '제주도의 아름다운 한옥',
      location: '제주시, 제주도',
      price: 150000,
      rating: 4.9,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '한옥',
      description: '제주도의 전통 한옥에서 특별한 경험을 해보세요. 아름다운 정원과 편안한 공간이 준비되어 있습니다.',
      bedrooms: 2,
      beds: 3,
      baths: 2,
      maxGuests: 4,
      amenities: ['무료 주차', 'Wi-Fi', '에어컨', '주방', '정원', '전통 온돌'],
    },
    {
      title: '서울의 모던 한옥',
      location: '종로구, 서울',
      price: 200000,
      rating: 4.8,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '한옥',
      description: '현대적으로 개조된 서울 도심 속 한옥에서 특별한 경험을 누려보세요.',
      bedrooms: 3,
      beds: 4,
      baths: 2,
      maxGuests: 6,
      amenities: ['무료 주차', 'Wi-Fi', '에어컨', '주방', '정원', '스마트 홈'],
    },
    {
      title: '부산 해변가 풀빌라',
      location: '해운대구, 부산',
      price: 350000,
      rating: 4.95,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '해변 근처',
      description: '해운대 바다가 보이는 프라이빗 풀빌라에서 특별한 휴가를 보내세요.',
      bedrooms: 4,
      beds: 5,
      baths: 3,
      maxGuests: 8,
      amenities: ['수영장', '무료 주차', 'Wi-Fi', '에어컨', '바베큐', '테라스'],
    },
    {
      title: '강릉 오션뷰 펜션',
      location: '강릉시, 강원도',
      price: 280000,
      rating: 4.7,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '해변 근처',
      description: '강릉 경포대 해변이 보이는 아름다운 펜션에서 완벽한 휴식을 취하세요.',
      bedrooms: 3,
      beds: 4,
      baths: 2,
      maxGuests: 6,
      amenities: ['오션뷰', '무료 주차', 'Wi-Fi', '에어컨', '바베큐', '테라스'],
    },
    {
      title: '일본식 전통 료칸',
      location: '경주시, 경상북도',
      price: 180000,
      rating: 4.85,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '료칸',
      description: '한국에서 즐기는 정통 일본식 료칸 체험. 온천과 다다미방에서 특별한 경험을 해보세요.',
      bedrooms: 2,
      beds: 2,
      baths: 1,
      maxGuests: 4,
      amenities: ['온천', '다다미방', '정원', '전통 조식', 'Wi-Fi', '에어컨'],
    },
    {
      title: '남산뷰 럭셔리 아파트',
      location: '용산구, 서울',
      price: 250000,
      rating: 4.9,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '최고의 전망',
      description: '남산서울타워가 보이는 고급 아파트에서 서울의 야경을 감상하세요.',
      bedrooms: 3,
      beds: 3,
      baths: 2,
      maxGuests: 5,
      amenities: ['시티뷰', '무료 주차', 'Wi-Fi', '에어컨', '피트니스 센터', '보안'],
    },
    {
      title: '설악산 통나무집',
      location: '속초시, 강원도',
      price: 150000,
      rating: 4.75,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '통나무집',
      description: '설악산이 보이는 아늑한 통나무집에서 자연과 함께하는 휴식을 즐기세요.',
      bedrooms: 2,
      beds: 3,
      baths: 1,
      maxGuests: 5,
      amenities: ['벽난로', '무료 주차', 'Wi-Fi', '에어컨', '바베큐', '마운틴뷰'],
    },
    {
      title: '제주 돌담집 독채',
      location: '서귀포시, 제주도',
      price: 170000,
      rating: 4.88,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '한옥',
      description: '제주 전통 돌담으로 둘러싸인 독채 숙소에서 프라이빗한 휴식을 즐기세요.',
      bedrooms: 2,
      beds: 2,
      baths: 1,
      maxGuests: 4,
      amenities: ['정원', '무료 주차', 'Wi-Fi', '에어컨', '주방', '바다전망'],
    },
    {
      title: '인천 작은 섬의 휴양지',
      location: '강화군, 인천',
      price: 220000,
      rating: 4.92,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '섬',
      description: '도시를 벗어나 조용한 섬에서 힐링을 경험해보세요.',
      bedrooms: 2,
      beds: 3,
      baths: 2,
      maxGuests: 5,
      amenities: ['해변접근', '무료 주차', 'Wi-Fi', '에어컨', '바베큐', '자전거'],
    },
    {
      title: '지리산 글램핑장',
      location: '구례군, 전라남도',
      price: 130000,
      rating: 4.7,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '캠핑장',
      description: '럭셔리한 글램핑 시설에서 자연을 편하게 즐기세요.',
      bedrooms: 1,
      beds: 2,
      baths: 1,
      maxGuests: 4,
      amenities: ['캠프파이어', '바베큐', 'Wi-Fi', '에어컨', '취사도구', '샤워실'],
    },
    {
      title: '알프스 스타일 샬레',
      location: '평창군, 강원도',
      price: 400000,
      rating: 4.95,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '스키장',
      description: '알프스의 분위기를 느낄 수 있는 고급 샬레에서 완벽한 스키 휴가를 보내세요.',
      bedrooms: 4,
      beds: 6,
      baths: 3,
      maxGuests: 8,
      amenities: ['스키장 접근', '벽난로', 'Wi-Fi', '에어컨', '사우나', '스키장비보관소'],
    },
    {
      title: '한강뷰 스카이하우스',
      location: '마포구, 서울',
      price: 300000,
      rating: 4.85,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '최고의 전망',
      description: '한강이 내려다보이는 고층 아파트에서 서울의 멋진 전망을 감상하세요.',
      bedrooms: 3,
      beds: 4,
      baths: 2,
      maxGuests: 6,
      amenities: ['한강뷰', '무료 주차', 'Wi-Fi', '에어컨', '피트니스 센터', '루프탑'],
    },
    {
      title: '전주 한옥마을 게스트하우스',
      location: '전주시, 전라북도',
      price: 120000,
      rating: 4.78,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '한옥',
      description: '전주 한옥마을 중심부에 위치한 전통 한옥 게스트하우스입니다.',
      bedrooms: 2,
      beds: 2,
      baths: 1,
      maxGuests: 4,
      amenities: ['한복체험', '무료 주차', 'Wi-Fi', '에어컨', '전통차', '공용주방'],
    },
    {
      title: '태안 비치하우스',
      location: '태안군, 충청남도',
      price: 180000,
      rating: 4.82,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '해변 근처',
      description: '태안 해변가에 위치한 아늑한 비치하우스에서 완벽한 휴가를 보내세요.',
      bedrooms: 3,
      beds: 4,
      baths: 2,
      maxGuests: 6,
      amenities: ['해변접근', '무료 주차', 'Wi-Fi', '에어컨', '바베큐', '테라스'],
    },
    {
      title: '울릉도 바다전망 펜션',
      location: '울릉군, 경상북도',
      price: 160000,
      rating: 4.7,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '섬',
      description: '울릉도의 아름다운 바다를 조망할 수 있는 특별한 펜션입니다.',
      bedrooms: 2,
      beds: 3,
      baths: 1,
      maxGuests: 5,
      amenities: ['오션뷰', '무료 주차', 'Wi-Fi', '에어컨', '취사도구', '테라스'],
    },
    {
      title: '경기도 중세 성채 숙소',
      location: '파주시, 경기도',
      price: 450000,
      rating: 4.92,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '캐슬',
      description: '중세 유럽풍 성채를 모티브로 한 독특한 숙소에서 특별한 경험을 해보세요.',
      bedrooms: 5,
      beds: 7,
      baths: 4,
      maxGuests: 12,
      amenities: ['수영장', '정원', '와인셀러', '무료 주차', 'Wi-Fi', '에어컨', '벽난로'],
    },
    {
      title: '제주 모던 디자인하우스',
      location: '서귀포시, 제주도',
      price: 380000,
      rating: 4.96,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '디자인하우스',
      description: '세계적인 건축가가 디자인한 모던하우스에서 예술적인 시간을 보내세요.',
      bedrooms: 3,
      beds: 3,
      baths: 2,
      maxGuests: 6,
      amenities: ['오션뷰', '개인 정원', '스마트홈', '무료 주차', 'Wi-Fi', '에어컨'],
    },
    {
      title: '양평 숲속 트리하우스',
      location: '양평군, 경기도',
      price: 220000,
      rating: 4.88,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '트리하우스',
      description: '자연 속 나무 위 아늑한 트리하우스에서 특별한 추억을 만드세요.',
      bedrooms: 1,
      beds: 2,
      baths: 1,
      maxGuests: 4,
      amenities: ['포레스트뷰', '바베큐', '해먹', '무료 주차', 'Wi-Fi', '에어컨'],
    },
    {
      title: '춘천 미니멀 타이니하우스',
      location: '춘천시, 강원도',
      price: 120000,
      rating: 4.82,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '초소형 주택',
      description: '미니멀리즘의 정수를 느낄 수 있는 아담한 타이니하우스에서 효율적인 공간 활용을 경험하세요.',
      bedrooms: 1,
      beds: 1,
      baths: 1,
      maxGuests: 2,
      amenities: ['호수뷰', '테라스', '자전거', '무료 주차', 'Wi-Fi', '에어컨'],
    },
    {
      title: '고창 한옥 농장 체험',
      location: '고창군, 전라북도',
      price: 180000,
      rating: 4.9,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '농장',
      description:
        '유기농 농장에서 직접 수확한 식재료로 요리하는 경험을 해보세요. 한옥 스타일의 숙소에서 편안한 휴식을 취하실 수 있습니다.',
      bedrooms: 2,
      beds: 3,
      baths: 1,
      maxGuests: 6,
      amenities: ['농장체험', '정원', '바베큐', '무료 주차', 'Wi-Fi', '에어컨'],
    },
    {
      title: '가평 프라이빗 풀빌라',
      location: '가평군, 경기도',
      price: 320000,
      rating: 4.95,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '수영장',
      description: '사계절 온수 풀과 실내 바베큐를 갖춘 럭셔리한 풀빌라에서 프라이빗한 시간을 보내세요.',
      bedrooms: 3,
      beds: 5,
      baths: 2,
      maxGuests: 8,
      amenities: ['프라이빗풀', '자쿠지', '테라스', '무료 주차', 'Wi-Fi', '에어컨', '바베큐'],
    },
    {
      title: '부산 해운대 럭셔리 펜트하우스',
      location: '해운대구, 부산',
      price: 550000,
      rating: 4.98,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '럭셔리',
      description: '해운대 최고층 펜트하우스에서 바다 전망과 함께하는 최상의 휴가를 경험하세요.',
      bedrooms: 4,
      beds: 4,
      baths: 3,
      maxGuests: 8,
      amenities: ['오션뷰', '인피니티풀', '사우나', '무료 주차', '하우스키핑', 'Wi-Fi', '에어컨'],
    },
    {
      title: '춘천 호수가 보이는 B&B',
      location: '춘천시, 강원도',
      price: 140000,
      rating: 4.86,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: 'B&B',
      description: '아름다운 춘천 호수가 보이는 B&B에서 직접 만든 유기농 조식과 함께 아침을 시작하세요.',
      bedrooms: 2,
      beds: 2,
      baths: 1,
      maxGuests: 4,
      amenities: ['유기농 조식', '호수뷰', '테라스', '무료 주차', 'Wi-Fi', '에어컨'],
    },
    {
      title: '제주 돔하우스 글램핑',
      location: '서귀포시, 제주도',
      price: 190000,
      rating: 4.89,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '기상천외한 숙소',
      description: '투명 돔에서 별을 보며 잠들 수 있는 특별한 글램핑을 경험해보세요.',
      bedrooms: 1,
      beds: 1,
      baths: 1,
      maxGuests: 2,
      amenities: ['스타게이징', '바베큐', '프라이빗 온수샤워', '무료 주차', 'Wi-Fi', '에어컨'],
    },
    {
      title: '평창 럭셔리 프라이빗 빌라',
      location: '평창군, 강원도',
      price: 480000,
      rating: 4.96,
      images: [getRandomHouseImage(), ...getRandomInteriorImages()],
      category: '저택',
      description: '넓은 정원과 파노라마 산악 전망을 갖춘 고급 저택에서 완벽한 휴가를 즐기세요.',
      bedrooms: 5,
      beds: 7,
      baths: 4,
      maxGuests: 10,
      amenities: ['와인셀러', '영화관', '수영장', '무료 주차', 'Wi-Fi', '에어컨', '사우나'],
    },
  ];

  for (const accommodation of accommodations) {
    await prisma.accommodation.create({
      data: accommodation,
    });
  }

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
