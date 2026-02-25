export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-orange-600 border-b-4 border-orange-600 pb-4 mb-6">
          🎓 하마스쿨 초등 개인정보 처리방침
        </h1>
        <p className="text-gray-600 text-sm mb-8">최종 업데이트: 2026년 2월 25일</p>

        <div className="space-y-8">
          {/* 섹션 1 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="mb-3">하마스쿨 초등(이하 "앱")은 다음의 목적을 위하여 개인정보를 처리합니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>회원 관리:</strong> 회원 가입 의사 확인, 회원제 서비스 제공, 본인 확인</li>
              <li><strong>서비스 제공:</strong> 학습 진도 관리, 학교별 순위 제공, 통계 데이터 제공</li>
              <li><strong>서비스 개선:</strong> 신규 서비스 개발, 맞춤형 서비스 제공</li>
            </ul>
          </section>

          {/* 섹션 2 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">2. 수집하는 개인정보 항목</h2>
            <p className="mb-3">앱은 회원가입 및 서비스 이용 과정에서 다음의 개인정보를 수집합니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>필수 항목:</strong> 닉네임, 학교명, 학년</li>
              <li><strong>자동 수집 항목:</strong> 서비스 이용 기록, 접속 로그, 기기 정보</li>
              <li><strong>학습 데이터:</strong> 퀴즈 정답률, 학습 진도, 획득 점수</li>
            </ul>
            <p className="mt-3"><strong>※ 민감정보 수집 안 함:</strong> 본 앱은 실명, 이메일, 전화번호, 주소 등의 민감한 개인정보를 수집하지 않습니다.</p>
          </section>

          {/* 섹션 3 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>회원 탈퇴 시:</strong> 즉시 파기</li>
              <li><strong>서비스 미이용 시:</strong> 1년간 미이용 시 사전 안내 후 파기</li>
              <li><strong>법령에 따른 보관:</strong> 관계 법령에 의한 정보보유 사유가 있는 경우 해당 기간 동안 보관</li>
            </ul>
          </section>

          {/* 섹션 4 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="mb-3">앱은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우는 예외로 합니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          {/* 섹션 5 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">5. 개인정보 처리의 위탁</h2>
            <p className="mb-3">앱은 서비스 제공을 위해 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Google Cloud Platform:</strong> 서버 호스팅, 데이터 저장</li>
              <li><strong>Google AdMob:</strong> 광고 서비스 제공</li>
            </ul>
          </section>

          {/* 섹션 6 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">6. 이용자 및 법정대리인의 권리</h2>
            <p className="mb-3">이용자 및 법정대리인은 언제든지 다음의 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>개인정보 조회 및 수정</li>
              <li>개인정보 삭제 요청</li>
              <li>개인정보 처리 정지 요청</li>
              <li>회원 탈퇴 (앱 내 설정에서 가능)</li>
            </ul>
          </section>

          {/* 섹션 7 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">7. 개인정보의 파기</h2>
            <p className="mb-3">앱은 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>파기 절차:</strong> 선정된 개인정보는 개인정보 보호책임자의 승인 하에 파기됩니다.</li>
              <li><strong>파기 방법:</strong> 전자적 파일 형태의 정보는 복원 불가능한 방법으로 영구 삭제합니다.</li>
            </ul>
          </section>

          {/* 섹션 8 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">8. 개인정보 보호를 위한 기술적/관리적 대책</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>암호화:</strong> 비밀번호는 암호화되어 저장 및 관리됩니다.</li>
              <li><strong>보안 서버:</strong> SSL/TLS 암호화 통신을 통한 안전한 데이터 전송</li>
              <li><strong>접근 제한:</strong> 개인정보 처리 시스템에 대한 접근 권한의 부여, 변경, 말소를 통한 접근 통제</li>
              <li><strong>정기적 점검:</strong> 보안 취약점을 확인하기 위한 정기적인 자체 점검 실시</li>
            </ul>
          </section>

          {/* 섹션 9 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">9. 만 14세 미만 아동의 개인정보 보호</h2>
            <p className="mb-3">본 앱은 초등학생을 대상으로 하므로 만 14세 미만 아동의 개인정보를 수집할 수 있습니다. 이 경우 법정대리인의 동의를 받아야 하며, 법정대리인은 아동의 개인정보에 대한 열람, 정정, 삭제를 요청할 수 있습니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>법정대리인은 아동의 개인정보에 대한 처리 정지 또는 동의 철회를 요청할 수 있습니다.</li>
              <li>아래 연락처로 요청하시면 신속히 처리하겠습니다.</li>
            </ul>
          </section>

          {/* 섹션 10 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">10. 광고 서비스</h2>
            <p className="mb-3">본 앱은 Google AdMob을 통해 광고를 제공합니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Google AdMob은 광고 타겟팅을 위해 기기 정보를 수집할 수 있습니다.</li>
              <li>이용자는 기기 설정에서 광고 맞춤설정을 해제할 수 있습니다.</li>
              <li>Google 개인정보 처리방침: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">https://policies.google.com/privacy</a></li>
            </ul>
          </section>

          {/* 섹션 11 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">11. 개인정보 보호책임자</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="mb-2"><strong>개인정보 보호책임자: 하마스쿨 운영팀</strong></p>
              <p className="mb-2">📧 이메일: hamacraftstudio@gmail.com</p>
              <p>💬 문의사항: 앱 내 설정 &gt; 문의하기</p>
            </div>
            <p className="mt-4 mb-3">개인정보 침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관으로 문의하실 수 있습니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
              <li>개인정보분쟁조정위원회 (www.kopico.go.kr / 1833-6972)</li>
              <li>대검찰청 사이버범죄수사단 (www.spo.go.kr / 국번없이 1301)</li>
              <li>경찰청 사이버안전국 (cyberbureau.police.go.kr / 국번없이 182)</li>
            </ul>
          </section>

          {/* 섹션 12 */}
          <section>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">12. 개인정보 처리방침의 변경</h2>
            <p>본 개인정보 처리방침은 법령, 정책 또는 보안 기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 시에는 앱 공지사항을 통해 고지할 것입니다.</p>
          </section>

          {/* Footer */}
          <div className="text-center text-orange-600 font-bold text-lg mt-12 pt-8 border-t-2 border-gray-200">
            🎓 하마스쿨 초등과 함께 안전하고 즐거운 학습을!
          </div>
        </div>
      </div>
    </div>
  );
}
