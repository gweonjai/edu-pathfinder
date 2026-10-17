import React, { useState } from 'react';
import { 
  Brain, Compass, Star, Layers, Sparkles, FileText, 
  Building2, BookOpen, Users, LogOut, ChevronRight, X
} from 'lucide-react';
import { PathfinderIcon } from './PathfinderIcon';
import { useProfile } from '../context/ProfileContext';
import { MAJORS_DATA } from '../data/departmentsData';
import { ProfileManagementModal } from './ProfileManagementModal';

export const SIDEBAR_MENU_GROUPS = [
  {
    groupTitle: '진로 & 학과 탐색 (1~5단계)',
    items: [
      {
        id: 'step1',
        label: '1단계: 생각 스타일 진단',
        desc: '문/이과 6문항 스타일 진단',
        icon: Brain,
        badge: null
      },
      {
        id: 'step2',
        label: '2단계: 진로 & 관심 분야 탐색',
        desc: '12대 과목 + 계열 트리 + 역도출',
        icon: Compass,
        badge: '통합'
      },
      {
        id: 'step3',
        label: '3단계: 20개 대학 학과 보드',
        desc: '관심 학과(★) 압축 및 소거',
        icon: Layers,
        badgeKey: 'bookmarkedCount'
      },
      {
        id: 'step4',
        label: '4단계: 학과 심층 리포트',
        desc: '취업률, 초봉, 대기업 부서',
        icon: Sparkles,
        badge: null
      },
      {
        id: 'step5',
        label: '5단계: 생기부 세특 로드맵',
        desc: '2022 개정 권장과목 & 세특',
        icon: FileText,
        badge: '2028 대입'
      }
    ]
  },
  {
    groupTitle: '대입 정보 & 기업 가이드',
    items: [
      {
        id: 'admissionInfo',
        label: '대입 & 고교 입시 정보',
        desc: '생기부 vs 세특 & 학사일정',
        icon: BookOpen,
        badge: '필독'
      },
      {
        id: 'companyExplorer',
        label: '100대 기업 역탐색',
        desc: '시총 상위 기업 우대 전공',
        icon: Building2,
        badge: '100대'
      }
    ]
  }
];

export const Sidebar = ({ currentView, setCurrentView, isMobileOpen, setIsMobileOpen }) => {
  const { activeProfile, childData, educationTier } = useProfile();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const bookmarkedCount = childData.bookmarkedMajors?.length || 0;

  const handleMenuClick = (menuId) => {
    setCurrentView(menuId);
    if (setIsMobileOpen) setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 모바일 배경 오버레이 */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 좌측 사이드바 본체: 모바일은 fixed 드로어, 데스크톱은 헤더 행 아래 sticky 밀착 */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 sm:w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:shrink-0 lg:z-20 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* 모바일 드로어 전용 상단 바 (데스크톱은 최상단 헤더로 대체되므로 lg:hidden) */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100 shrink-0 lg:hidden">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleMenuClick('step1')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 ring-1 ring-white/20 shrink-0">
              <PathfinderIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  에듀 패스파인더
                </span>
              </div>
              <p className="text-[11px] text-indigo-600 font-bold">
                Edu Pathfinder · 2028
              </p>
            </div>
          </div>

          {/* 모바일 닫기 버튼 */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 사이드바 본문: 카테고리별 메뉴 목록 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {SIDEBAR_MENU_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {group.groupTitle}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  const badgeText = item.badgeKey === 'bookmarkedCount' 
                    ? (bookmarkedCount > 0 ? `${bookmarkedCount}개` : null)
                    : item.badge;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600 group-hover:scale-110'
                        }`} />
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold truncate leading-tight">
                            {item.label}
                          </div>
                          <div className={`text-[10px] truncate leading-normal ${
                            isActive ? 'text-indigo-100' : 'text-slate-400'
                          }`}>
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      {badgeText && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-1.5 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badge === '중3·고1'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.badge === '100대'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : item.badgeKey === 'bookmarkedCount'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {badgeText}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 사이드바 하단: 학생 프로필 카드 */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/80 shrink-0">
          <div 
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs transition cursor-pointer group"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white shrink-0 ${
                activeProfile?.grade?.includes('중') ? 'bg-rose-500' : activeProfile?.grade?.includes('초') ? 'bg-emerald-500' : 'bg-indigo-600'
              }`}>
                {activeProfile?.name?.[0] || '학'}
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {activeProfile?.name || '학생'}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                    {activeProfile?.grade || '중3'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  프로필 전환 및 백업
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
          </div>
        </div>
      </aside>

      {/* 최상위 포털 프로필 관리 모달 */}
      <ProfileManagementModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};
