# 에어비앤비 클론(진행중)

🚧 현재 개발 중인 개인 포트폴리오입니다.

Next.js와 기타 최신 웹 기술을 활용하여 제작한 에어비앤비 클론 프로젝트입니다.

## 기술 스택

### 프론트엔드

- [Next.js 15](https://nextjs.org/) - React 프레임워크
- [React 19](https://reactjs.org/) - UI 라이브러리
- [TypeScript](https://www.typescriptlang.org/) - 정적 타입 언어
- [React Query](https://tanstack.com/query/latest) - 서버 상태 관리 라이브러리
- [Zustand](https://zustand-demo.pmnd.rs/) - 상태 관리 라이브러리
- [React Hook Form](https://react-hook-form.com/) - 폼 상태 관리
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 우선 CSS 프레임워크
- [Framer Motion](https://www.framer.com/motion/) - 애니메이션 라이브러리
- [Headless UI](https://headlessui.dev/) - 접근성 있는 UI 컴포넌트
- [React Icons](https://react-icons.github.io/react-icons/) - 아이콘 라이브러리

### 백엔드

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - 서버리스 API
- [NextAuth.js](https://next-auth.js.org/) - 인증 라이브러리
- [Prisma](https://www.prisma.io/) - ORM(Object-Relational Mapping)
- [PostgreSQL](https://www.postgresql.org/) - 데이터베이스
- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) - GraphQL 서버
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs) - 비밀번호 해싱
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JWT 인증
- [Redis](https://redis.io/) - 인메모리 데이터 스토리지

## 주요 기능

- 소셜 로그인 (Google, Facebook, Apple 지원)
- 이메일 가입 및 로그인
- 숙소 검색 및 필터링
- 카테고리 기반 탐색
- 숙소 상세 정보 보기
- 반응형 웹 디자인

## 시작하기

### 필수 요구사항

- Node.js 18 이상
- 데이터베이스 (PostgreSQL 권장)

### 설치

1. 프로젝트 클론

```bash
git clone https://github.com/your-username/airbnb_clone.git
cd airbnb_clone
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정 .env.local 파일을 루트 디렉토리에 생성하고 필요한 환경 변수를 설정하세요.

```
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
APPLE_CLIENT_ID=your_apple_client_id
APPLE_CLIENT_SECRET=your_apple_client_secret
```

4. 데이터베이스 설정

```bash
npx prisma migrate dev
npx prisma db seed
```

5. 개발 서버 실행

```bash
npm run dev
```

6. 브라우저에서 http://localhost:3000으로 접속하세요.

## 프로젝트 구조

```
airbnb_clone/
├── .env.local           # 환경 변수 설정 파일
├── .gitignore           # Git 무시 파일 목록
├── next.config.js       # Next.js 설정 파일
├── package.json         # 프로젝트 의존성 및 스크립트
├── tsconfig.json        # TypeScript 설정
│
├── public/              # 정적 파일
│   ├── images/          # 이미지 파일 저장소
│   ├── favicon.ico      # 사이트 파비콘
│   └── ...
│
├── prisma/              # Prisma 관련 파일
│   ├── schema.prisma    # 데이터베이스 스키마 정의
│   ├── seed.ts          # 초기 데이터 시드 스크립트
│   └── migrations/      # 데이터베이스 마이그레이션 파일
│
└── src/
    ├── app/             # Next.js App Router 구조
    │   ├── layout.tsx   # 기본 레이아웃 컴포넌트
    │   ├── page.tsx     # 메인 페이지
    │   ├── favicon.ico  # 앱별 파비콘
    │   │
    │   ├── api/         # API 라우트 경로
    │   │   ├── auth/    # 인증 관련 API
    │   │   ├── listings/ # 숙소 목록 관련 API
    │   │   └── ...
    │   │
    │   └── (routes)/    # 페이지 라우트 그룹
    │       ├── listings/ # 숙소 관련 페이지
    │       │   ├── [id]/ # 숙소 상세 페이지
    │       │   └── ...
    │       ├── reservations/ # 예약 관련 페이지
    │       ├── trips/   # 여행 관련 페이지
    │       └── ...
    │
    ├── components/      # 재사용 가능한 컴포넌트
    │   ├── ui/          # UI 기본 컴포넌트
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   └── ...
    │   │
    │   ├── modals/      # 모달 컴포넌트
    │   │   ├── LoginModal.tsx
    │   │   ├── RegisterModal.tsx
    │   │   └── ...
    │   │
    │   ├── listings/    # 숙소 관련 컴포넌트
    │   ├── navbar/      # 네비게이션 바 컴포넌트
    │   └── ...
    │
    ├── hooks/           # 커스텀 훅
    │   ├── useLogin.ts
    │   ├── useFavorite.ts
    │   └── ...
    │
    ├── lib/             # 유틸리티 함수 및 라이브러리
    │   ├── prisma.ts    # Prisma 클라이언트
    │   └── utils.ts     # 유틸리티 함수
    │
    ├── types/           # TypeScript 타입 정의
    │   ├── index.ts
    │   └── ...
    │
    └── providers/       # 컨텍스트 프로바이더
        ├── AuthProvider.tsx
        ├── ToastProvider.tsx
        └── ...
```

## 주요 디렉터리 설명

### src/app

Next.js 15의 App Router를 사용한 애플리케이션의 주요 경로 구조가 포함되어 있습니다. 각 폴더는 특정 경로를 나타내며, 해당 폴더 내의 `page.tsx` 파일이 해당 경로의 페이지 컴포넌트입니다.

### src/components

재사용 가능한 React 컴포넌트들이 모여 있습니다. UI, 모달, 리스팅 관련 컴포넌트 등이 체계적으로 분류되어 있습니다.

### src/hooks

애플리케이션 전체에서 사용되는 커스텀 React 훅들을 포함합니다. 로그인, 즐겨찾기 등의 기능에 대한 로직을 캡슐화합니다.

### prisma

데이터베이스 스키마와 마이그레이션을 관리합니다. `schema.prisma` 파일에서 데이터 모델을 정의하고, 마이그레이션을 통해 데이터베이스 구조를 관리합니다.
