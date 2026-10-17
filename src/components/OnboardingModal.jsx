import React, { useState } from 'react';
import { useProfile, getTargetYear } from '../context/ProfileContext';
import { User, Sparkles, ArrowRight, GraduationCap, X } from 'lucide-react';
import { PathfinderIcon } from './PathfinderIcon';

export const OnboardingModal = () => {
  const { isOnboardingOpen, completeOnboarding, skipOnboarding } = useProfile();
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('중3');

  if (!isOnboardingOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('이름 또는 닉네임을 입력해 주세요.');
      return;
    }
    completeOnboarding(name, grade);
  };

  const currentTargetYear = getTargetYear(grade);

  return (
    <div 
      onClick={skipOnboarding}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200 cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 relative overflow-hidden cursor-default"
      >
        {/* 우측 상단 모달 닫기 (X) 버튼 */}
        <button
          type="button"
          onClick={skipOnboarding}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition cursor-pointer z-10"
          title="닫기 (나중에 입력하기)"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* 상단 장식 그라데이션 바 */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500" />

        {/* 헤더 섹션 */}
        <div className="text-center mb-6 pt-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-indigo-700 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white shadow-md shadow-indigo-200/60 ring-1 ring-white/20">
            <PathfinderIcon className="w-7 h-7 text-white" />
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>패스파인더 시작하기</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            본인 정보를 먼저 입력해 주세요
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            나에게 딱 맞는 학과 소거 및 2028 대입 개편안 맞춤 진로 설계를 위해<br className="hidden sm:inline" />
            이름과 현재 학년을 알려주세요.
          </p>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. 이름 / 닉네임 입력 */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>이름 또는 닉네임</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <input
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 민우, 서연, 탐구자"
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              required
            />
          </div>

          {/* 2. 현재 학년 선택 */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              <span>현재 학년</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition cursor-pointer"
            >
              <option value="초5">초등학교 5학년</option>
              <option value="초6">초등학교 6학년</option>
              <option value="중1">중학교 1학년</option>
              <option value="중2">중학교 2학년</option>
              <option value="중3">중학교 3학년 (2028 대입 개편 1기)</option>
              <option value="고1">고등학교 1학년</option>
              <option value="고2">고등학교 2학년</option>
              <option value="고3">고등학교 3학년</option>
              <option value="기타">기타 / N수생 / 학부모</option>
            </select>
          </div>

          {/* 목표 대입 실시간 안내 카드 */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                적용 목표 대입
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                {currentTargetYear} 대상
              </div>
            </div>
            <span className="text-xs bg-indigo-600 text-white font-semibold px-2.5 py-1 rounded-lg shadow-2xs">
              자동 맞춤 설정
            </span>
          </div>

          {/* 제출 버튼 및 나중에 하기 */}
          <div className="space-y-2 pt-1">
            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>패스파인더 시작하기</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={skipOnboarding}
              className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-semibold rounded-xl transition cursor-pointer"
            >
              나중에 입력하고 먼저 둘러보기
            </button>
          </div>
        </form>

        {/* 하단 안내 문구 */}
        <p className="text-[11px] text-slate-400 text-center mt-4">
          입력하신 정보는 브라우저 로컬 저장소에 안전하게 보관되며, 상단 프로필에서 언제든 변경할 수 있습니다.
        </p>

      </div>
    </div>
  );
};
