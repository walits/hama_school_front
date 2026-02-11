# 🔐 하마스쿨 API 연동 가이드

## ⚠️ 중요: 프론트엔드는 API를 사용하세요!

프론트엔드에서 DB에 직접 접근하면 안 됩니다!
보안상 **반드시 REST API를 통해 백엔드와 통신**해야 합니다.

---

## 🌐 API 접속 정보 (프론트엔드 사용)

### Base URL
```
https://api.schoolwar.kr
```

### Health Check
```bash
GET https://api.schoolwar.kr/health
```

**응답 예시:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-11T07:34:33.502Z",
  "environment": "production"
}
```

### 안드로이드 앱 설정 예시

```kotlin
object ApiConfig {
    const val BASE_URL = "https://api.schoolwar.kr/"

    // Retrofit 설정
    val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()
}
```

---

## 📋 주요 API 엔드포인트

### 인증
```
POST   /auth/register          # 회원가입
POST   /auth/login             # 로그인
```

### 학교
```
GET    /schools                           # 학교 목록
GET    /schools/ranking/national          # 전국 순위
GET    /schools/ranking/regional          # 지역 순위 (region1)
GET    /schools/ranking/nearby            # 근처 순위 (region2)
GET    /schools/:id                       # 학교 상세
GET    /schools/:id/top-contributors      # 학교별 우수 학생
```

### 중학교
```
GET    /mid-schools/ranking/national      # 중학교 전국 순위
GET    /mid-schools/ranking/regional      # 중학교 지역 순위
GET    /mid-schools/ranking/nearby        # 중학교 근처 순위
GET    /mid-schools/:id/top-contributors  # 중학교별 우수 학생
```

### 고등학교
```
GET    /high-schools/ranking/national     # 고등학교 전국 순위
GET    /high-schools/ranking/regional     # 고등학교 지역 순위
GET    /high-schools/ranking/nearby       # 고등학교 근처 순위
GET    /high-schools/:id/top-contributors # 고등학교별 우수 학생
```

### 진행 상황
```
POST   /progress/submit        # 점수 제출
GET    /progress/me            # 내 진행상황
```

---

## 📱 안드로이드 앱 연동 가이드

### 1. Gradle 의존성 추가

**build.gradle (Module: app)**
```gradle
dependencies {
    // Retrofit
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'

    // OkHttp
    implementation 'com.squareup.okhttp3:logging-interceptor:4.11.0'
}
```

### 2. API 서비스 인터페이스

**ApiService.kt**
```kotlin
interface ApiService {
    @GET("health")
    suspend fun healthCheck(): Response<HealthResponse>

    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>

    @GET("schools/ranking/national")
    suspend fun getNationalRanking(
        @Query("limit") limit: Int = 10
    ): Response<RankingResponse>

    @GET("schools/{id}/top-contributors")
    suspend fun getTopContributors(
        @Path("id") schoolId: Int,
        @Query("limit") limit: Int = 10
    ): Response<TopContributorsResponse>
}

data class HealthResponse(
    val status: String,
    val timestamp: String,
    val environment: String
)

data class RankingResponse(
    val data: List<School>
)

data class School(
    val id: Int,
    val name: String,
    val region1: String,
    val region2: String,
    val totalScore: Int,
    val studentCount: Int,
    val rank: Int,
    val normalizedScore: Int
)

data class TopContributorsResponse(
    val data: List<Student>
)

data class Student(
    val rank: Int,
    val id: Int,
    val nickname: String,
    val totalScore: Int,
    val level: Int
)
```

### 3. Retrofit 클라이언트

**RetrofitClient.kt**
```kotlin
object RetrofitClient {
    private const val BASE_URL = "https://api.schoolwar.kr/"

    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }

    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()

    val apiService: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}
```

### 4. 사용 예시

**MainActivity.kt**
```kotlin
class MainActivity : AppCompatActivity() {
    private val apiService = RetrofitClient.apiService

    private fun checkApiConnection() {
        lifecycleScope.launch {
            try {
                val response = apiService.healthCheck()
                if (response.isSuccessful) {
                    Log.d("API", "연결 성공: ${response.body()}")
                } else {
                    Log.e("API", "에러: ${response.code()}")
                }
            } catch (e: Exception) {
                Log.e("API", "예외 발생", e)
            }
        }
    }

    private fun loadNationalRanking() {
        lifecycleScope.launch {
            try {
                val response = apiService.getNationalRanking(limit = 10)
                if (response.isSuccessful) {
                    val schools = response.body()?.data ?: emptyList()
                    Log.d("API", "학교 ${schools.size}개 로드됨")
                    // UI 업데이트
                }
            } catch (e: Exception) {
                Log.e("API", "랭킹 로드 실패", e)
            }
        }
    }
}
```

---

## 🔒 보안 주의사항

### ❌ 절대 하지 말 것

```kotlin
// 🚨 절대 이렇게 하지 마세요!
const val DB_HOST = "hama-school-db.clsmygiua54h..."
const val DB_PASSWORD = "7d50DXD..."
```

### ✅ 올바른 방법

```kotlin
// ✅ API를 통해서만 접근
const val API_BASE_URL = "https://api.schoolwar.kr/"
```

---

## 🗄️ 데이터베이스 접속 정보 (개발/디버깅 전용)

⚠️ **주의: 이 정보는 절대 프론트엔드 코드에 포함하면 안 됩니다!**
- 서버 관리자만 사용
- 디버깅/데이터 확인 용도

### RDS PostgreSQL 정보

```
Host:     hama-school-db.clsmygiua54h.ap-northeast-2.rds.amazonaws.com
Port:     5432
Database: hama_school
Username: postgres
Password: 7d50DXDZppffytqeXecMb8v7wrRxrzre
SSL Mode: require
```

### 연결 방법

#### 1. psql (Command Line)

```bash
PGPASSWORD=7d50DXDZppffytqeXecMb8v7wrRxrzre psql \
  -h hama-school-db.clsmygiua54h.ap-northeast-2.rds.amazonaws.com \
  -U postgres \
  -d hama_school \
  -p 5432
```

#### 2. DBeaver / DataGrip

```
Connection Type: PostgreSQL
Host: hama-school-db.clsmygiua54h.ap-northeast-2.rds.amazonaws.com
Port: 5432
Database: hama_school
User: postgres
Password: 7d50DXDZppffytqeXecMb8v7wrRxrzre
SSL: Require (또는 Verify-CA)
```

#### 3. pgAdmin

```
Hostname: hama-school-db.clsmygiua54h.ap-northeast-2.rds.amazonaws.com
Port: 5432
Maintenance database: hama_school
Username: postgres
Password: 7d50DXDZppffytqeXecMb8v7wrRxrzre
SSL mode: require
```

---

## 📞 문의 사항

### API 문서 필요 시
- Swagger/OpenAPI 문서가 필요하면 백엔드 팀에 요청
- 엔드포인트 목록 및 파라미터 확인 필요

### 개발 중 이슈
- API 응답 에러: 백엔드 로그 확인 가능
- 네트워크 타임아웃: 현재 30초로 설정됨

---

## 🎯 다음 단계

### 1. ✅ API 연결 테스트
```bash
curl https://api.schoolwar.kr/health
```

### 2. 안드로이드 앱 API 연동
- Retrofit 설정
- API 서비스 인터페이스 작성
- 네트워크 권한 추가 (AndroidManifest.xml)

### 3. API 엔드포인트 문서 확인
- 백엔드 팀에 API 명세서 요청
- 또는 Postman Collection 공유

---

## 📋 요약

### 프론트엔드 팀이 사용할 정보

```
API URL: https://api.schoolwar.kr
프로토콜: HTTPS (SSL 인증서 유효)
인증: JWT (필요 시)
Content-Type: application/json
```

### DB 접속 정보 (관리자 전용)

```
⚠️ 절대 프론트엔드에서 사용 금지!
디버깅/데이터 확인 용도로만 사용
```

---

## 🌐 프론트엔드 웹사이트

- **프로덕션**: https://schoolwar.kr
- **대시보드**: https://schoolwar.kr/dashboard

---

## 📝 변경 이력

- 2026-02-11: 초기 문서 작성
- API URL: `https://api.schoolwar.kr` 설정 완료
- SSL 인증서 적용 완료
