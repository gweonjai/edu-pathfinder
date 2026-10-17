import React, { useState, useEffect } from 'react';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OnboardingModal } from './components/OnboardingModal';
import { StepNavigator } from './components/StepNavigator';
import { Step1_TendencyQuiz } from './components/Step1_TendencyQuiz';
import { Step2_PreferenceFilter } from './components/Step2_PreferenceFilter';
import { Step3_MajorBoard } from './components/Step3_MajorBoard';
import { Step4_DeepReport } from './components/Step4_DeepReport';
import { Step5_StudentPlan } from './components/Step5_StudentPlan';
import { CareerTreeView } from './components/CareerTreeView';
import { AdmissionInfoView } from './components/AdmissionInfoView';
import { CompanyExplorerView } from './components/CompanyExplorerView';
import { PathfinderIcon } from './components/PathfinderIcon';


function EduPathfinderApp() {
  const { childData, updateChildData } = useProfile();
  const [currentView, setCurrentView] = useState('step1'); // 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'admissionInfo' | 'companyExplorer'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [targetMajorId, setTargetMajorId] = useState(null);

  // 단계 번호 (Step 1~5인 경우 네비게이터 지원)
  const stepNumber = currentView === 'step1' ? 1 
                   : currentView === 'step2' ? 2 
                   : currentView === 'step3' ? 3 
                   : currentView === 'step4' ? 4 
                   : currentView === 'step5' ? 5 
                   : null;

  // 학과 선택 시 처리 (Step 4 심층 리포트로 이동)
  const handleSelectMajor = (majorId, targetView = 'step4') => {
    if (!majorId) return;
    if (!childData.bookmarkedMajors.includes(majorId)) {
      updateChildData({
        bookmarkedMajors: Array.from(new Set([...childData.bookmarkedMajors, majorId])),
        excludedMajors: childData.excludedMajors.filter((id) => id !== majorId)
      });
    }
    setTargetMajorId(majorId);
    setCurrentView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-800 flex justify-center">
      {/* 0. 온보딩 모달 (최초 진입 시 본인 정보 입력) */}
      <OnboardingModal />

      {/* 화면 전체 기준 중앙 정렬 래퍼 */}
      <div className="w-full max-w-[1440px] min-h-screen flex flex-col bg-slate-50 shadow-sm border-x border-slate-200/80">
        
        {/* 1. 최상단 가로 전체 헤더 행 (사이드바 위에서부터 오른쪽 끝까지 관통) */}
        <Header 
          onToggleSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* 2. 헤더 행 아래: 좌측 사이드바 + 우측 본문 */}
        <div className="flex-1 flex min-w-0">
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            isMobileOpen={isMobileSidebarOpen}
            setIsMobileOpen={setIsMobileSidebarOpen}
          />

          {/* 우측 메인 콘텐츠 영역 (사이드바와 본문이 헤더 아래 나란히 위치) */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* 본문 뷰 렌더링 */}
            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
              {/* 1. 나의 성향 진단 */}
          {currentView === 'step1' && (
            <Step1_TendencyQuiz 
              onNextStep={() => setCurrentView('step2')}
              onOpenCareerTree={() => setCurrentView('step2')}
              onOpenAdmissionInfo={() => setCurrentView('admissionInfo')}
            />
          )}

          {/* 2. 진로 & 관심 분야 탐색 (과목 선호도 + 계열 트리 + 상향식 역도출 일체형) */}
          {currentView === 'step2' && (
            <Step2_PreferenceFilter
              onNextStep={() => setCurrentView('step3')}
              onPrevStep={() => setCurrentView('step1')}
            />
          )}

          {/* 4. 20개 대학 학과 보드 */}
          {currentView === 'step3' && (
            <Step3_MajorBoard
              onGoToStep4={() => setCurrentView('step4')}
              onGoToStep2={() => setCurrentView('step2')}
            />
          )}

          {/* 5. 학과 심층 분석 리포트 */}
          {currentView === 'step4' && (
            <Step4_DeepReport
              onGoToStep3={() => setCurrentView('step3')}
              onGoToStep5={() => setCurrentView('step5')}
              targetMajorId={targetMajorId}
              onOpenCompanyExplorer={() => setCurrentView('companyExplorer')}
            />
          )}

          {/* 6. 생기부 세특 로드맵 */}
          {currentView === 'step5' && (
            <Step5_StudentPlan
              onGoToStep4={() => setCurrentView('step4')}
            />
          )}

          {/* 7. 대입 & 입시 정보 가이드 독립 뷰 */}
          {currentView === 'admissionInfo' && (
            <AdmissionInfoView />
          )}

          {/* 8. 100대 기업 역탐색 독립 뷰 */}
          {currentView === 'companyExplorer' && (
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
              <CompanyExplorerView
                onSelectMajor={(majorId) => handleSelectMajor(majorId, 'step4')}
                onClose={() => setCurrentView('step4')}
              />
            </div>
          )}
        </main>

        {/* 푸터 */}
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 no-print mt-auto">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <div className="flex items-center justify-center space-x-2 font-medium text-slate-600">
              <PathfinderIcon className="w-4 h-4 text-indigo-600" />
              <span>에듀 패스파인더 (Edu Pathfinder) · 2028 대입 및 고교학점제 맞춤 진로 로드맵</span>
            </div>
            <p className="text-[11px] text-slate-400">
              서울 주요 20개 대학 학과 분류 기준 · 2022 개정 교육과정 적용
            </p>
          </div>
        </footer>
      </div>
    </div>
  </div>
</div>
);
}

export default function App() {
  return (
    <ProfileProvider>
      <EduPathfinderApp />
    </ProfileProvider>
  );
}
