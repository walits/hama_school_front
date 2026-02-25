export default function PrivacyMiddle() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-blue-500 pb-4 mb-6">
          개인정보 처리방침 - 중학교 전쟁
        </h1>
        <p className="text-gray-600 text-sm italic mb-8">시행일자: 2026년 2월 25일</p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p><strong>🛡️ 만 14세 미만 아동 보호</strong></p>
          <p className="mt-2">본 앱은 중학생을 대상으로 하며, 만 14세 미만 아동의 개인정보를 보호하기 위해 법정대리인의 동의를 받고 있습니다.</p>
        </div>

        <div className="space-y-8">
          {/* 섹션 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
              1. 개인정보의 수집 및 이용 목적
            </h2>
            <p className="mb-3">중학교 전쟁("앱")은 다음의 목적을 위하여 개인정보를 처리합니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>회원 가입 및 관리</strong>: 회원 식별, 서비스 부정이용 방지</li>
              <li><strong>학습 서비스 제공</strong>: 퀴즈 기록 저장, 통계 제공, 랭킹 서비스</li>
              <li><strong>서비스 개선</strong>: 신규 서비스 개발, 콘텐츠 개선</li>
              <li><strong>광고 제공</strong>: Google AdMob을 통한 맞춤형 광고</li>
            </ul>
          </section>

          {/* 섹션 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
              2. 수집하는 개인정보 항목
            </h2>
            <ul className="space-y-3">
              <li>
                <strong>필수 항목</strong>
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li>이메일 주소</li>
                  <li>비밀번호 (암호화 저장)</li>
                  <li>학교 정보 (학교명, 지역)</li>
                </ul>
              </li>
              <li>
                <strong>자동 수집 항목</strong>
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li>퀴즈 풀이 기록 (정답/오답, 점수)</li>
                  <li>앱 사용 기록 (접속 시간, 이용 통계)</li>
                  <li>기기 정보 (OS 버전, 기기 모델, 광고 ID)</li>
                </ul>
              </li>
            </ul>
          </section>

          {/* 섹션 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
              3. 개인정보의 보유 및 이용 기간
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>회원 탈퇴 시</strong>: 즉시 삭제 (법령에 따라 보관이 필요한 경우 예외)</li>
              <li><strong>장기 미사용 계정</strong>: 1년간 미접속 시 별도 분리 보관 후 삭제</li>
              <li>
                <strong>법령에 따른 보관</strong>
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li>계약 또는 청약철회 기록: 5년 (전자상거래법)</li>
                  <li>소비자 불만 또는 분쟁처리 기록: 3년 (전자상거래법)</li>
                </ul>
              </li>
            </ul>
          </section>

          {/* 섹션 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
              4. 개인정보의 제3자 제공
            </h2>
            <p className="mb-3">본 앱은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우 예외로 합니다:</p>

            <h3 className="text-xl font-semibold mt-4 mb-2">4.1 Google AdMob (광고 서비스)</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>제공받는 자</strong>: Google LLC</li>
              <li><strong>제공 목적</strong>: 맞춤형 광고 제공</li>
              <li><strong>제공 항목</strong>: 광고 ID, 기기 정보, 앱 사용 통계</li>
              <li><strong>보유 기간</strong>: Google 개인정보 처리방침에 따름</li>
              <li><strong>상세 정보</strong>: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">Google 개인정보처리방침</a></li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
              <p><strong>📢 광고 맞춤 설정</strong></p>
              <p className="mt-2">Google 광고 설정에서 맞춤형 광고를 끄거나 광고 ID를 재설정할 수 있습니다.</p>
              <p className="mt-1">Android: 설정 &gt; Google &gt; 광고 &gt; 광고 맞춤설정 삭제</p>
            </div>
          </section>

          {/* 섹션 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
              5. 만 14세 미만 아동의 개인정보 보호
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>만 14세 미만 아동의 회원가입 시 법정대리인의 동의를 받습니다</li>
              <li>법정대리인은 아동의 개인정보 열람, 정정, 삭제를 요청할 수 있습니다</li>
              <li>아동의 개인정보는 엄격하게 관리되며, 최소한으로만 수집됩니다</li>
            </ul>
          </section>

          {/* 섹션 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
              6. 이용자의 권리와 행사 방법
            </h2>
            <p className="mb-3">이용자는 언제든지 다음의 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>개인정보 열람 요구</li>
              <li>개인정보 정정·삭제 요구</li>
              <li>개인정보 처리 정지 요구</li>
              <li>회원 탈퇴 (앱 내 설정 &gt; 계정 관리)</li>
            </ul>
          </section>

          {/* 섹션 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
              7. 개인정보의 안전성 확보 조치
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>암호화</strong>: 비밀번호는 암호화하여 저장</li>
              <li><strong>접근 제한</strong>: 개인정보 처리 시스템에 대한 접근 권한 최소화</li>
              <li><strong>보안 프로그램</strong>: 해킹 등 외부 침입에 대비한 보안 시스템 운영</li>
            </ul>
          </section>

          {/* 섹션 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
              8. 개인정보 처리방침의 변경
            </h2>
            <p>본 개인정보 처리방침은 법령, 정책 또는 보안 기술의 변경에 따라 내용이 추가, 삭제 및 수정될 수 있습니다. 변경 시 앱 내 공지사항 또는 이메일을 통해 안내합니다.</p>
          </section>

          {/* 섹션 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
              9. 개인정보 보호책임자 및 연락처
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="mb-3">개인정보 처리에 관한 문의, 불만 처리, 피해 구제 등은 아래로 연락해주시기 바랍니다.</p>
              <ul className="space-y-2">
                <li><strong>개인정보 보호책임자</strong>: [이름]</li>
                <li><strong>이메일</strong>: hamacraftstudio@gmail.com</li>
                <li><strong>처리 시간</strong>: 평일 09:00 - 18:00 (주말 및 공휴일 제외)</li>
              </ul>
            </div>
          </section>

          {/* 섹션 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
              10. 권익침해 구제 방법
            </h2>
            <p className="mb-3">개인정보 침해로 인한 신고나 상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>개인정보 침해신고센터</strong>: (국번없이) 118 / <a href="https://privacy.kisa.or.kr" className="text-blue-600 hover:underline">privacy.kisa.or.kr</a></li>
              <li><strong>대검찰청 사이버수사과</strong>: (국번없이) 1301 / <a href="https://www.spo.go.kr" className="text-blue-600 hover:underline">www.spo.go.kr</a></li>
              <li><strong>경찰청 사이버안전국</strong>: (국번없이) 182 / <a href="https://ecrm.police.go.kr" className="text-blue-600 hover:underline">ecrm.police.go.kr</a></li>
            </ul>
          </section>

          {/* Footer */}
          <hr className="my-12 border-gray-300" />
          <p className="text-gray-600 text-sm italic">최종 수정일: 2026년 2월 25일</p>
          <p className="text-center text-gray-400 mt-4">© 2026 중학교 전쟁. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
