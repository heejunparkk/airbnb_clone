import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.accommodation.deleteMany({});

  const accommodations = [
    {
      title: '제주도의 아름다운 한옥',
      location: '제주시, 제주도',
      price: 150000,
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227',
        'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4',
        'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff',
      ],
      category: '한옥',
      description: '제주도의 아름다운 한옥',
    },
    {
      title: '서울의 모던 한옥',
      location: '종로구, 서울',
      price: 200000,
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff',
        'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
      ],
      category: '한옥',
      description: '서울의 모던 한옥',
    },
    {
      title: '부산 해변가 풀빌라',
      location: '해운대구, 부산',
      price: 350000,
      rating: 4.95,
      images: [
        'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6',
        'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
      ],
      category: '해변 근처',
      description: '부산 해변가 풀빌라',
    },
    {
      title: '강릉 오션뷰 펜션',
      location: '강릉시, 강원도',
      price: 280000,
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        'https://images.unsplash.com/photo-1564078516393-cf04bd966897',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4',
      ],
      category: '해변 근처',
      description: '강릉 오션뷰 펜션',
    },
    {
      title: '일본식 전통 료칸',
      location: '경주시, 경상북도',
      price: 180000,
      rating: 4.85,
      images: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
      ],
      category: '료칸',
      description: '일본식 전통 료칸',
    },
    {
      title: '남산뷰 럭셔리 아파트',
      location: '용산구, 서울',
      price: 250000,
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
        'https://images.unsplash.com/photo-1591825729269-caeb344f6df2',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      ],
      category: '최고의 전망',
      description: '남산뷰 럭셔리 아파트',
    },
    {
      title: '설악산 통나무집',
      location: '속초시, 강원도',
      price: 150000,
      rating: 4.75,
      images: [
        'https://images.unsplash.com/photo-1501876725168-00c445821c9e',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
        'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6',
      ],
      category: '통나무집',
      description: '설악산 통나무집',
    },
    {
      title: '제주 돌담집 독채',
      location: '서귀포시, 제주도',
      price: 170000,
      rating: 4.88,
      images: [
        'https://images.unsplash.com/photo-1595521624992-48a59aef95e3',
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
        'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa',
        'https://images.unsplash.com/photo-1567636788276-40a47795ba4d',
      ],
      category: '한옥',
      description: '제주 돌담집 독채',
    },
    {
      title: '인천 작은 섬의 휴양지',
      location: '강화군, 인천',
      price: 220000,
      rating: 4.92,
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        'https://images.unsplash.com/photo-1584132905271-512c958d674a',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
        'https://images.unsplash.com/photo-1585779034823-7e9ac8faec70',
      ],
      category: '섬',
      description: '인천 작은 섬의 휴양지',
    },
    {
      title: '지리산 글램핑장',
      location: '구례군, 전라남도',
      price: 130000,
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
        'https://images.unsplash.com/photo-1501876725168-00c445821c9e',
      ],
      category: '캠핑장',
      description: '지리산 글램핑장',
    },
    {
      title: '알프스 스타일 샬레',
      location: '평창군, 강원도',
      price: 400000,
      rating: 4.95,
      images: [
        'https://images.unsplash.com/photo-1647891940243-77a6483a152e',
        'https://images.unsplash.com/photo-1593604572577-1c6c44fa246b',
        'https://images.unsplash.com/photo-1647891941746-fe06f2d7f866',
        'https://images.unsplash.com/photo-1647891940746-ec13738eb404',
      ],
      category: '스키장',
      description: '알프스 스타일 샬레',
    },
    {
      title: '한강뷰 스카이하우스',
      location: '마포구, 서울',
      price: 300000,
      rating: 4.85,
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      ],
      category: '최고의 전망',
      description: '한강뷰 스카이하우스',
    },
    {
      title: '전주 한옥마을 게스트하우스',
      location: '전주시, 전라북도',
      price: 120000,
      rating: 4.78,
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      ],
      category: '한옥',
      description: '전주 한옥마을 게스트하우스',
    },
    {
      title: '태안 비치하우스',
      location: '태안군, 충청남도',
      price: 180000,
      rating: 4.82,
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      ],
      category: '해변 근처',
      description: '태안 비치하우스',
    },
    {
      title: '울릉도 바다전망 펜션',
      location: '울릉군, 경상북도',
      price: 160000,
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      ],
      category: '섬',
      description: '울릉도 바다전망 펜션',
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
