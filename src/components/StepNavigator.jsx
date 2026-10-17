import React from 'react';
import { Brain, Star, Layers, Sparkles, FileText, Lock, CheckCircle2 } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { MAJORS_DATA } from '../data/departmentsData';

export const StepNavigator = ({ currentStep, setCurrentStep }) => {
  const { childData } = useProfile();
  const bookmarkedCount = childData.bookmarkedMajors?.length || 0;
  const pendingCount = childData.pendingMajors?.length || 0;
  const candidateCount = bookmarkedCount + pendingCount;
  const remainingCount = MAJORS_DATA.length - (childData.excludedMajors?.length || 0);

  // Step 4 해금 조건: 관심 또는 보류 학과가 지정되었거나, 전체 남은 학과가 5개 이하로 압축되었을 때
  const isReportUnlocked = candidateCount > 0 || (remainingCount > 0 && remainingCount <= 5);

  const steps = [
    {
      id: 1,
      name: '나의 생각 스타일 진단',
      shortName: '1. 나의 성향',
      desc: '문/이과/융합 문제 해결 방식 6문항',
      icon: Brain,
      unlocked: true,
    },
    {
      id: 2,
      name: '선호 과목 & 관심 분야',
      shortName: '2. 선호 과목',
      desc: '내가 좋아하는 12대 탐구 분야 선택',
      icon: Star,
      unlocked: true,
    },
    {
      id: 3,
      name: '20개 대학 맞춤 학과 보드',
      shortName: '3. 학과 보드',
      desc: '선호도 매칭 랭킹 및 관심(★) 지정',
      icon: Layers,
      unlocked: true,
      badge: bookmarkedCount > 0 ? `관심 ${bookmarkedCount}개` : `${remainingCount}개`,
    },
    {
      id: 4,
      name: 'Top 3~5 심층 분석 리포트',
      shortName: '4. 심층 리포트',
      desc: '커리큘럼, 초봉 및 기업 진출 부서',
      icon: Sparkles,
      unlocked: isReportUnlocked,
      badge: isReportUnlocked ? '열람 가능' : '학과 선택 전',
    },
    {
      id: 5,
      name: '2022 개정 고교학점제 & 생기부',
      shortName: '5. 생기부 로드맵',
      desc: '권장 선택과목 및 고1 공통과목 세특',
      icon: FileText,
      unlocked: isReportUnlocked || bookmarkedCount > 0,
      badge: '2028 대입',
    },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 no-print sticky top-16 sm:top-20 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto no-scrollbar space-x-2 sm:space-x-4 py-2 sm:py-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isUnlocked = step.unlocked;

            return (
              <button
                key={step.id}
                onClick={() => {
                  if (!isUnlocked && (step.id === 4 || step.id === 5)) {
                    alert('관심 학과(★)가 아직 지정되지 않았습니다. 3단계 학과 보드에서 마음에 드는 학과에 [관심★]을 지정해 주세요!');
                    return;
                  }
                  setCurrentStep(step.id);
                }}
                className={`flex-1 min-w-[135px] sm:min-w-[180px] flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 ring-2 ring-indigo-300 ring-offset-1'
                    : isUnlocked
                    ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    : 'bg-slate-100/60 text-slate-400 border-dashed border-slate-200 cursor-not-allowed opacity-80'
                }`}
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <div className={`p-1.5 rounded-lg shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : isUnlocked ? 'bg-white text-indigo-600 shadow-2xs' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {isUnlocked ? <Icon className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold flex items-center space-x-1 truncate">
                      <span>{step.shortName}</span>
                    </div>
                    <div className={`text-[11px] hidden sm:block truncate max-w-[110px] ${
                      isActive ? 'text-indigo-100' : 'text-slate-500'
                    }`}>
                      {step.desc}
                    </div>
                  </div>
                </div>

                {step.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ml-1 shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isUnlocked
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
