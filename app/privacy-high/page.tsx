export default function PrivacyHigh() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-green-600 border-b-4 border-green-600 pb-4 mb-6">
          🏫 고등학교 전쟁 개인정보 처리방침
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <p className="text-gray-600 italic mb-4">시행일자: 2026년 2월 25일</p>
          <p className="leading-relaxed">
            하마크래프트 스튜디오(이하 "회사")는 「개인정보 보호법」 제30조에 따라
            정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록
            다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </p>
        </div>

        <div className="space-y-6">
          {/* 섹션 1 */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">📱 1. 서비스 개요</h2>
            <p className="leading-relaxed">
              <strong>고등학교 전쟁</strong>은 전국 고등학생들이 참여하는 실시간 지식 퀴즈 게임입니다.
              학교별로 점수를 경쟁하며, 다양한 과목의 퀴즈를 풀면서 학습할 수 있습니다.
            </p>
          </section>

          {/* 섹션 2 */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">🔍 2. 수집하는 개인정보 항목</h2>

            <h3 className="text-lg font-semibold mt-4 mb-2">가. 회원가입 시 수집 정보</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>필수 항목:</strong> 이메일, 비밀번호, 닉네임, 학교 정보(학교명, 지역)</li>
              <li><strong>선택 항목:</strong> 없음</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">나. 서비스 이용 중 자동 수집 정보</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>퀴즈 점수 및 학습 기록</li>
              <li>학교별 순위 정보</li>
              <li>접속 로그, 접속 IP, 서비스 이용 기록</li>
              <li>광고 식별자(Google AdMob)</li>
              <li>기기 정보(OS 버전, 기기 모델명)</li>
            </ul>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-4">
              <p><strong>⚠️ 주의:</strong> 회사는 만 14세 미만 아동의 개인정보를 수집하지 않습니다. 고등학생을 대상으로 하는 서비스입니다.</p>
            </div>
          </section>

          {/* 섹션 3 */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">🎯 3. 개인정보의 수집 및 이용 목적</h2>

            <h3 className="text-lg font-semibold mt-4 mb-2">가. 회원 관리</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>회원 가입 의사 확인, 회원제 서비스 제공</li>
              <li>본인 확인 및 부정 이용 방지</li>
              <li>고충 처리 및 분쟁 조정을 위한 기록 보존</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">나. 서비스 제공</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>퀴즈 게임 서비스 제공</li>
              <li>학교별 랭킹 및 통계 제공</li>
              <li>일일 미션 및 보상 시스템 운영</li>
              <li>학습 기록 관리 및 분석</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">다. 마케팅 및 광고</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>서비스 개선 및 신규 서비스 개발</li>
              <li>광고 게재 및 맞춤형 광고 제공(Google AdMob)</li>
            </ul>
          </section>

          {/* 섹션 4 */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">📊 4. 광고 서비스 (Google AdMob)</h2>
            <p className="mb-3">본 앱은 Google AdMob을 통해 광고를 제공합니다. 광고 서비스 제공을 위해 다음 정보가 수집될 수 있습니다:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>광고 식별자(Advertising ID)</li>
              <li>기기 정보 및 네트워크 정보</li>
              <li>앱 사용 정보</li>
            </ul>
            <p className="mb-3">
              Google의 광고 개인정보 보호정책은{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                여기
              </a>
              에서 확인할 수 있습니다.
            </p>
            <p>
              <strong>맞춤 광고 거부:</strong> 기기 설정 &gt; 개인정보 보호 &gt; 광고에서 "맞춤 광고 제한"을 활성화할 수 있습니다.
            </p>
          </section>

          {/* 섹션 5 */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">⏰ 5. 개인정보의 보유 및 이용 기간</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><strong>회원 정보:</strong> 회원 탈퇴 시까지 (탈퇴 즉시 삭제)</li>
              <li><strong>학습 기록:</strong> 회원 탈퇴 후 30일 이내 삭제</li>
              <li><strong>부정 이용 방지 기록:</strong> 1년 보관 후 삭제</li>
              <li><strong>법령에 의한 보존:</strong> 관련 법령에 따라 일정 기간 보존</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">법령에 따른 보존 정보</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
              <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
              <li>소비자 불만 또는 분쟁처리 기록: 3년 (전자상거래법)</li>
              <li>접속 로그 기록: 3개월 (통신비밀보호법)</li>
            </ul>
          </section>

          {/* 섹션 6 */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">🔐 6. 개인정보의 파기 절차 및 방법</h2>

            <h3 className="text-lg font-semibold mt-4 mb-2">가. 파기 절차</h3>
            <p className="mb-3">
              이용자의 개인정보는 수집 및 이용 목적이 달성되면 지체 없이 파기됩니다.
              회원 탈퇴 시 즉시 삭제되며, 법령에 따라 보존이 필요한 경우 별도 DB로 이관하여 보관 후 파기합니다.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">나. 파기 방법</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>전자적 파일: 복구 불가능한 방법으로 영구 삭제</li>
              <li>종이 문서: 분쇄기로 분쇄하거나 소각</li>
            </ul>
          </section>

          {/* 섹션 7 */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">👤 7. 정보주체의 권리·의무 및 행사 방법</h2>
            <p className="mb-3">이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>개인정보 열람 요구</li>
              <li>개인정보 정정·삭제 요구</li>
              <li>개인정보 처리 정지 요구</li>
              <li>회원 탈퇴 (앱 내 설정 메뉴)</li>
            </ul>
            <p>권리 행사는 앱 내 설정 메뉴 또는 이메일을 통해 가능하며, 회사는 지체 없이 조치하겠습니다.</p>
          </section>

          {/* 섹션 8 */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">🛡️ 8. 개인정보의 안전성 확보 조치</h2>
            <p className="mb-3">회사는 다음과 같은 기술적·관리적 조치를 취하고 있습니다:</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">가. 기술적 조치</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>개인정보 암호화 (비밀번호 등)</li>
              <li>보안 프로그램 설치 및 주기적 업데이트</li>
              <li>서버 접근 통제 및 침입 차단 시스템 운영</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">나. 관리적 조치</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>개인정보 취급 직원 최소화 및 교육</li>
              <li>개인정보 처리 시스템 접근 권한 관리</li>
              <li>정기적인 자체 감사 실시</li>
            </ul>
          </section>

          {/* 섹션 9 */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">🔄 9. 개인정보 처리방침의 변경</h2>
            <p>
              본 개인정보 처리방침은 법령·정책 또는 보안기술의 변경에 따라 내용이 수정될 수 있으며,
              변경 시 앱 내 공지사항 또는 이메일을 통해 사전 공지합니다.
            </p>
          </section>

          {/* 섹션 10 */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">📞 10. 개인정보 보호책임자 및 담당부서</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="font-semibold mb-3">개인정보 보호책임자</p>
              <ul className="space-y-2 mb-4">
                <li>담당자: 하마크래프트 스튜디오</li>
                <li>이메일: hamacraftstudio@gmail.com</li>
              </ul>

              <p className="mt-6 mb-3">개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다:</p>
              <ul className="space-y-2">
                <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
                <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                <li>대검찰청 사이버범죄수사단: (국번없이) 1301 (www.spo.go.kr)</li>
                <li>경찰청 사이버안전국: (국번없이) 182 (cyberbureau.police.go.kr)</li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-600">
              본 개인정보 처리방침은 2026년 2월 25일부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
