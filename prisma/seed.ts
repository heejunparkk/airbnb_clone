import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.accommodation.deleteMany({});

  const accommodations = [
    {
      title: '강남 럭셔리 아파트',
      location: '서울 강남구',
      price: 150000,
      rating: 5,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      ],
      category: '아파트',
      description: '강남역 도보 5분 거리의 럭셔리 아파트입니다.',
    },
    {
      title: '홍대 아티스트 하우스',
      location: '서울 마포구',
      price: 120000,
      rating: 4,
      images: [
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
        'https://images.unsplash.com/photo-1598928636135-d0f224ca81f7',
      ],
      category: '주택',
      description: '홍대입구역 근처의 아티스틱한 분위기의 숙소입니다.',
    },
    {
      title: '부산 해변 펜션',
      location: '부산 해운대구',
      price: 200000,
      rating: 5,
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      ],
      category: '펜션',
      description: '해운대 해변이 보이는 프리미엄 펜션입니다.',
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
