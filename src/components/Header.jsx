import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Users, Plus, Menu, Star } from 'lucide-react';
import { MAJORS_DATA } from '../data/departmentsData';
import { ProfileManagementModal } from './ProfileManagementModal';
import { PathfinderIcon } from './PathfinderIcon';

export const Header = ({ onToggleSidebar }) => {
  const { activeProfile, childData, educationTier, setIsOnboardingOpen } = useProfile();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const bookmarkedCount = childData.bookmarkedMajors?.length || 0;

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-2xs no-print">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* 좌측: 모바일 햄버거 토글 & 사이드바 위 최상단 브랜드 로고 */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 cursor-pointer transition"
              title="사이드 메뉴 열기"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 ring-1 ring-white/20 shrink-0">
                <PathfinderIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5 leading-tight">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                    에듀 패스파인더
                  </span>
                </div>
                <p className="text-[11px] text-indigo-600 font-bold leading-tight">
                  Edu Pathfinder · 2028
                </p>
              </div>
            </div>
          </div>

          {/* 우측: 관심학과, 학년 눈높이(중등실생활), 프로필(문화예술) */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* 1. 관심 학과 */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 shadow-2xs shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span>관심 학과: <strong className="text-amber-900 font-black">{bookmarkedCount}개</strong></span>
            </div>

            {/* 입력된 학생의 학년에 따라 자동 표시되는 교육과정 눈높이 뱃지 */}
            <div className="flex items-center">
              {educationTier === 'elementary' ? (
                <div 
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border bg-emerald-50 text-emerald-900 border-emerald-300 text-xs font-bold shadow-2xs"
                  title="학생 학년(초5~초6)에 맞춰 재미있는 호기심 유발형 쉬운 일상 생활어 설명이 자동 적용됩니다."
                >
                  <span className="text-sm">🌱</span>
                  <span className="hidden sm:inline">초등({activeProfile.grade}) 눈높이</span>
                  <span className="sm:hidden">초등({activeProfile.grade})</span>
                </div>
              ) : educationTier === 'middle' ? (
                <div 
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border bg-indigo-50 text-indigo-900 border-indigo-200 text-xs font-bold shadow-2xs"
                  title="학생 학년(중1~중3)에 맞춰 카카오톡, 넷플릭스 등 실생활 제품·서비스 적용 사례 설명이 자동 적용됩니다."
                >
                  <span className="text-sm">💡</span>
                  <span className="hidden sm:inline">중등({activeProfile.grade}) 실생활</span>
                  <span className="sm:hidden">중등({activeProfile.grade})</span>
                </div>
              ) : (
                <div 
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border bg-slate-100 text-slate-800 border-slate-300 text-xs font-bold shadow-2xs"
                  title="학생 학년(고1~고3)에 맞춰 2022 개정 고교학점제 선택과목 및 대입 표준 설명이 자동 적용됩니다."
                >
                  <span className="text-sm">🎓</span>
                  <span className="hidden sm:inline">고교({activeProfile.grade}) 세특</span>
                  <span className="sm:hidden">고교({activeProfile.grade})</span>
                </div>
              )}
            </div>

            {/* 프로필 선택/관리 트리거 버튼 */}
            <div className="flex items-center space-x-2">
              {!activeProfile ? (
                <button
                  onClick={() => setIsOnboardingOpen(true)}
                  className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl transition text-sm font-bold shadow-sm shadow-indigo-600/30 cursor-pointer"
                  title="사용자 정보 입력 모달 열기"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>사용자 등록</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl transition border border-slate-200 text-sm font-semibold cursor-pointer"
                  title="프로필 전환 및 관리 모달 열기"
                >
                  <div className={`w-3 h-3 rounded-full ${activeProfile.grade?.includes('중') ? 'bg-rose-500' : activeProfile.grade?.includes('초') ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                  <span>{activeProfile.name}</span>
                  <span className="text-xs text-slate-500 bg-white px-1.5 py-0.5 rounded shadow-2xs">
                    {activeProfile.grade}
                  </span>
                  <Users className="w-4 h-4 text-slate-400 ml-1" />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* 최상위 document.body 포털로 렌더링되는 프로필 관리 모달 (z-[9999], 화면 정중앙) */}
      <ProfileManagementModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </header>
  );
};
