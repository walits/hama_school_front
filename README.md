# Hama School Frontend

Next.js 기반 Hama School 프론트엔드 애플리케이션

## 기술 스택

- **Framework**: Next.js 16.1.6
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts 3.7.0
- **HTTP Client**: Axios 1.13.4
- **TypeScript**: 5.x

## 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버는 http://localhost:3001 에서 실행됩니다.

### 3. 빌드

```bash
npm run build
```

정적 파일은 `out/` 디렉토리에 생성됩니다.

## 배포

AWS S3 + CloudFront를 사용한 정적 웹사이트 호스팅

자세한 내용은 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참조하세요.

### 빠른 배포

```bash
# 1. Terraform으로 인프라 구축 (최초 1회)
cd terraform
terraform init
terraform apply

# 2. GitHub에 push하면 자동 배포
git push origin main

# 또는 로컬에서 수동 배포
./scripts/deploy.sh
```

## 프로젝트 구조

```
hama_school_front/
├── app/                  # Next.js App Router
│   ├── admin/           # 관리자 페이지
│   └── page.tsx         # 메인 페이지
├── components/          # React 컴포넌트
├── lib/                 # 유틸리티 함수
├── types/              # TypeScript 타입 정의
├── terraform/          # AWS 인프라 설정
│   ├── provider.tf
│   ├── variables.tf
│   ├── s3.tf
│   ├── cloudfront.tf
│   └── outputs.tf
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions 배포 워크플로우
└── scripts/
    └── deploy.sh       # 로컬 배포 스크립트
```

## 스크립트

- `npm run dev` - 개발 서버 시작 (포트 3001)
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 시작
- `npm run lint` - ESLint 실행

## 환경 변수

`.env.example` 파일을 `.env.local`로 복사하여 사용:

```bash
cp .env.example .env.local
```

## 라이선스

Private
