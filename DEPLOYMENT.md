# Hama School Front 배포 가이드

## 배포 방식
- **인프라**: AWS S3 + CloudFront
- **자동 배포**: GitHub Actions (main 브랜치 push 시)
- **수동 배포**: 로컬 스크립트

## 초기 인프라 구축

### 1. AWS CLI 설정

```bash
# AWS CLI 설치 (Mac)
brew install awscli

# AWS 자격증명 설정
aws configure --profile default
# 또는 특정 프로파일 사용시
aws configure --profile hama-school
```

필요한 정보:
- AWS Access Key ID
- AWS Secret Access Key
- Default region: ap-northeast-2
- Default output format: json

### 2. Terraform으로 인프라 생성

```bash
# terraform 디렉토리로 이동
cd terraform

# Terraform 초기화
terraform init

# 인프라 계획 확인
terraform plan

# 인프라 생성
terraform apply

# 생성된 정보 확인
terraform output
```

생성되는 리소스:
- S3 버킷 (hama-school-front-prod)
- CloudFront 배포
- Origin Access Control (OAC)
- 필요한 IAM 정책

### 3. GitHub Secrets 설정 (자동 배포용)

Repository → Settings → Secrets and variables → Actions → New repository secret

필수 Secrets:
```
AWS_ACCESS_KEY_ID: [AWS Access Key]
AWS_SECRET_ACCESS_KEY: [AWS Secret Key]
S3_BUCKET_NAME: [terraform output s3_bucket_name으로 확인]
CLOUDFRONT_DISTRIBUTION_ID: [terraform output cloudfront_distribution_id으로 확인]
CLOUDFRONT_DOMAIN_NAME: [terraform output cloudfront_domain_name으로 확인]
```

## 자동 배포 (GitHub Actions)

main 브랜치에 push하면 자동으로 배포됩니다.

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

GitHub Actions가 자동으로:
1. Next.js 빌드 (static export)
2. S3에 업로드
3. CloudFront 캐시 무효화

배포 상태는 GitHub Repository → Actions 탭에서 확인

## 수동 배포 (로컬)

### 방법 1: 스크립트 사용 (권장)

```bash
# 실행 권한 부여 (최초 1회)
chmod +x scripts/deploy.sh

# 배포 실행
./scripts/deploy.sh
```

### 방법 2: 단계별 실행

```bash
# 1. 빌드
npm run build

# 2. S3 업로드
BUCKET_NAME=$(cd terraform && terraform output -raw s3_bucket_name)
aws s3 sync out/ s3://$BUCKET_NAME/ --delete

# 3. CloudFront 캐시 무효화
DISTRIBUTION_ID=$(cd terraform && terraform output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"
```

## 배포 확인

```bash
# 배포된 웹사이트 URL 확인
cd terraform
terraform output website_url

# 브라우저에서 열기
open $(terraform output -raw website_url)
```

## 커스텀 도메인 설정 (선택사항)

커스텀 도메인을 사용하려면:

1. **ACM 인증서 생성** (us-east-1 리전에서)
```bash
# AWS Console에서 Certificate Manager로 이동
# us-east-1 리전 선택
# 도메인 인증서 요청 및 검증
```

2. **terraform/variables.tf 수정**
```hcl
variable "domain_name" {
  default = "school.yourdomain.com"
}

variable "acm_certificate_arn" {
  default = "arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERT_ID"
}
```

3. **Terraform 재적용**
```bash
cd terraform
terraform apply
```

4. **DNS 설정**
```
CNAME: school.yourdomain.com → [CloudFront domain name]
```

## 비용 추정

예상 월 비용 (소규모 트래픽 기준):
- **S3 스토리지**: $0.1-0.5 (1-5GB)
- **CloudFront**: $1-5 (트래픽에 따라)
- **총 예상**: $1-10/월

CloudFront 무료 티어 (첫 12개월):
- 50GB 데이터 전송
- 2,000,000 HTTP/HTTPS 요청

## 문제 해결

### 빌드 에러
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json .next out
npm install
npm run build
```

### S3 업로드 실패
```bash
# AWS 자격증명 확인
aws sts get-caller-identity

# S3 버킷 확인
aws s3 ls | grep hama-school
```

### CloudFront 캐시 문제
```bash
# 강제 캐시 무효화
DISTRIBUTION_ID=$(cd terraform && terraform output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"
```

### Terraform 상태 문제
```bash
# 현재 상태 확인
cd terraform
terraform show

# 상태 새로고침
terraform refresh

# 특정 리소스 재생성
terraform taint aws_cloudfront_distribution.website
terraform apply
```

## 인프라 삭제

더 이상 사용하지 않을 경우:

```bash
# S3 버킷 비우기 (버킷 삭제를 위해 필요)
BUCKET_NAME=$(cd terraform && terraform output -raw s3_bucket_name)
aws s3 rm s3://$BUCKET_NAME/ --recursive

# Terraform으로 모든 리소스 삭제
cd terraform
terraform destroy
```

## 보안 체크리스트

- ✅ S3 버킷 퍼블릭 액세스 차단
- ✅ CloudFront OAC로만 S3 접근 허용
- ✅ HTTPS 강제 리다이렉트
- ✅ 버전 관리 활성화
- ✅ AWS 자격증명을 GitHub Secrets에 안전하게 저장

## 추가 최적화

### 캐시 전략 개선
```yaml
# .github/workflows/deploy.yml에서 캐시 설정 조정
# 정적 리소스 (JS, CSS, 이미지): 1년
# HTML, JSON: 즉시 재검증
```

### 모니터링 설정
```bash
# CloudWatch 알람 설정 (선택사항)
# - 높은 에러율
# - 비정상적인 트래픽 증가
```

## 참고 자료

- [AWS S3 공식 문서](https://docs.aws.amazon.com/s3/)
- [CloudFront 공식 문서](https://docs.aws.amazon.com/cloudfront/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
# Deployment Info

- Deployed on: Mon Feb  2 14:49:52 KST 2026
- CloudFront: https://d6h9r23562m58.cloudfront.net
- S3 Bucket: hama-school-front-prod

