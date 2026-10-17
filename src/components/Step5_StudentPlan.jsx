import React, { useState, useMemo, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { MAJORS_DATA } from '../data/departmentsData';
import { PREFERENCE_TAGS } from '../data/tendencyData';
import { getEasyMajorInfo } from '../data/easyLanguageData';
import { 
  FileText, Printer, CheckCircle2, BookmarkCheck, Bookmark, Lightbulb, 
  BookMarked, Sparkles, Edit3, Save, School, Award, Compass, Briefcase,
  HelpCircle, Star
} from 'lucide-react';

export const Step5_StudentPlan = () => {
  const { childData, updateChildData, activeProfile, isEasyMode } = useProfile();

  // 최종 후보 학과 리스트 (관심 담긴 학과 & 보류 학과 & 미제외 학과)
  const bookmarked = useMemo(() => MAJORS_DATA.filter((m) => childData.bookmarkedMajors?.includes(m.id)), [childData.bookmarkedMajors]);
  const pending = useMemo(() => MAJORS_DATA.filter((m) => childData.pendingMajors?.includes(m.id)), [childData.pendingMajors]);
  const remainingActive = useMemo(() => MAJORS_DATA.filter((m) => !childData.excludedMajors?.includes(m.id)), [childData.excludedMajors]);

  // 1단계 성향 및 2단계 선호 과목을 종합한 맞춤 추천 학과 계산 (Top 6)
  const recommendedMajors = useMemo(() => {
    const answers = childData.tendencyAnswers || {};
    const answerValues = Object.values(answers);
    const mathCount = answerValues.filter((v) => v === '이과').length;
    const liberalCount = answerValues.filter((v) => v === '문과').length;
    const dominantTrack = mathCount > liberalCount ? '이과' : liberalCount > mathCount ? '문과' : null;

    const preferenceLevels = childData.preferenceLevels || {};
    const activeHigh = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'high');
    const activeMedium = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'medium');
    const activeLow = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'low');
    const activeDislike = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'dislike');

    const highTags = PREFERENCE_TAGS.filter((t) => activeHigh.includes(t.id)).flatMap((t) => t.matchedTags);
    const mediumTags = PREFERENCE_TAGS.filter((t) => activeMedium.includes(t.id)).flatMap((t) => t.matchedTags);
    const lowTags = PREFERENCE_TAGS.filter((t) => activeLow.includes(t.id)).flatMap((t) => t.matchedTags);
    const dislikeTags = PREFERENCE_TAGS.filter((t) => activeDislike.includes(t.id)).flatMap((t) => t.matchedTags);

    const excludedSet = new Set(childData.excludedMajors || []);

    return MAJORS_DATA.filter((major) => {
      if (excludedSet.has(major.id)) return false;
      if (major.tags.some((t) => dislikeTags.includes(t))) return false;
      return true;
    }).map((major) => {
      let score = 0;
      major.tags.forEach((tag) => {
        if (highTags.includes(tag)) score += 3;
        if (mediumTags.includes(tag)) score += 2;
        if (lowTags.includes(tag)) score += 1;
      });
      if (dominantTrack && major.track === dominantTrack) {
        score += 2;
      }
      return { ...major, matchScore: score };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);
  }, [childData.tendencyAnswers, childData.preferenceLevels, childData.excludedMajors]);

  const defaultMajorId = bookmarked[0]?.id || recommendedMajors[0]?.id || remainingActive[0]?.id || null;
  const [selectedMajorId, setSelectedMajorId] = useState(defaultMajorId);

  const activeMajor = useMemo(() => {
    return MAJORS_DATA.find((m) => m.id === selectedMajorId) || bookmarked[0] || recommendedMajors[0] || remainingActive[0];
  }, [selectedMajorId, bookmarked, recommendedMajors, remainingActive]);

  // 관심/보류 토글 액션
  const handleToggleBookmark = (majorId) => {
    const isAlreadyBookmarked = childData.bookmarkedMajors?.includes(majorId);
    if (isAlreadyBookmarked) {
      updateChildData({
        bookmarkedMajors: childData.bookmarkedMajors.filter((id) => id !== majorId),
        pendingMajors: Array.from(new Set([...(childData.pendingMajors || []), majorId])),
      });
    } else {
      updateChildData({
        bookmarkedMajors: Array.from(new Set([...(childData.bookmarkedMajors || []), majorId])),
        pendingMajors: (childData.pendingMajors || []).filter((id) => id !== majorId),
      });
    }
  };

  // 나만의 진로 & 생기부 탐구 메모 상태
  const notesKey = activeMajor?.id || 'general';
  const currentNotes = childData.notes || {};
  const [memoText, setMemoText] = useState(currentNotes[notesKey] || '');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  useEffect(() => {
    if (activeMajor?.id) {
      setMemoText(childData.notes?.[activeMajor.id] || '');
    }
  }, [activeMajor?.id, childData.notes]);

  const handleSaveMemo = () => {
    const nextNotes = { ...currentNotes, [notesKey]: memoText };
    updateChildData({ notes: nextNotes });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const handleSelectMajor = (mId) => {
    setSelectedMajorId(mId);
    setMemoText(currentNotes[mId] || '');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!activeMajor) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center max-w-xl mx-auto my-8">
        <School className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h4 className="text-base font-bold text-slate-700">선택된 관심 학과가 없습니다.</h4>
        <p className="text-xs text-slate-500 mt-1">
          3단계 학과 보드에서 마음에 드는 학과에 [★ 관심 담기]를 먼저 눌러주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-16">
      
      {/* 상단 브리핑 및 인쇄 바 */}
      <div className="bg-gradient-to-r from-slate-100 via-indigo-50/50 to-slate-100 border border-slate-200/90 rounded-2xl p-6 text-slate-800 shadow-xs no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100/90 text-indigo-800 border border-indigo-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>5단계: 2022 개정 교육과정(고교학점제) & 2028 대입 생기부 로드맵</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              {activeProfile.name} 학생의 고1 진학 대비 생기부·과목 선택 전략
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              2028 대입에서는 어떤 선택과목을 이수했는지와 세특의 깊이가 합격을 가릅니다. 학과별 핵심 과목과 탐구 주제를 확인하세요.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="bg-white hover:bg-slate-50 text-indigo-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-indigo-600" />
            <span>생기부 리포트 인쇄 / PDF 저장</span>
          </button>
        </div>
      </div>

      {/* 인쇄 전용 헤더 (화면에서는 숨김, 인쇄 시 출력) */}
      <div className="hidden print-only p-6 border-b border-slate-300 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              에듀 패스파인더 (Edu Pathfinder) 맞춤 진로 & 고1 생기부 설계 리포트
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              학생명: {activeProfile.name} ({activeProfile.grade}) | 기준: 2022 개정 교육과정 & 2028 대입 개편안
            </p>
          </div>
          <div className="text-right text-xs text-slate-400">
            출력일시: {new Date().toLocaleDateString('ko-KR')}
          </div>
        </div>
      </div>

      {/* 통합 전공 선택 대시보드 패널 (선택한 관심 전공 & 1·2단계 추천 학과 한눈 조망 - no-print) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-4 no-print">
        
        {/* 상단 헤더: 현재 분석 및 설계 중인 전공 정보 & 우측 보류 전공 선택 드롭다운 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-3">
          <div className="flex items-center space-x-2.5">
            <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              현재 생기부 설계 전공
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center space-x-2">
              <span>{activeMajor?.name}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                {activeMajor?.category}
              </span>
              {childData.bookmarkedMajors?.includes(activeMajor?.id) && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  ★ 관심 전공
                </span>
              )}
              {activeMajor?.contractMajor && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-indigo-950">
                  계약학과
                </span>
              )}
            </h3>
          </div>

          {/* 우측: 보류 전공 학과 드롭다운 */}
          {pending.length > 0 && (
            <div className="flex items-center space-x-2 shrink-0">
              <label className="text-xs font-bold text-sky-800 shrink-0 flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                <span>보류 학과:</span>
              </label>
              <select
                value={pending.some((m) => m.id === selectedMajorId) ? selectedMajorId : ''}
                onChange={(e) => {
                  if (e.target.value) handleSelectMajor(e.target.value);
                }}
                className={`text-xs border rounded-xl px-2.5 py-1.5 font-bold cursor-pointer transition w-full sm:w-56 focus:outline-indigo-500 ${
                  pending.some((m) => m.id === selectedMajorId)
                    ? 'bg-sky-50 text-sky-900 border-sky-400 ring-2 ring-sky-300'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <option value="">△ 보류 전공 ({pending.length}개)...</option>
                {pending.map((m) => (
                  <option key={m.id} value={m.id}>
                    △ {m.name} ({m.category})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* 1. 내가 선택한 관심 전공 행 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-lg flex items-center space-x-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>★ 내가 담은 관심 전공 ({bookmarked.length}개)</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                카드를 클릭하여 생기부 로드맵을 전환하세요
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {bookmarked.map((m) => {
              const isSelected = activeMajor?.id === m.id;
              const easyM = isEasyMode ? getEasyMajorInfo(m.id) : null;
              const label = isEasyMode && easyM?.easyName ? easyM.easyName.split(' (')[0] : m.name;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelectMajor(m.id)}
                  className={`px-3 py-1.5 rounded-xl border text-left transition-all flex items-center space-x-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-300 font-bold scale-[1.02]'
                      : 'bg-amber-50/70 hover:bg-amber-100/70 text-slate-800 border-amber-200 hover:border-amber-300 font-semibold'
                  }`}
                >
                  <BookmarkCheck className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-amber-600'}`} />
                  <span className="text-xs">
                    {isEasyMode ? `🌱 ${label}` : m.name}
                  </span>
                  {m.contractMajor && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-extrabold shrink-0 ${
                      isSelected ? 'bg-amber-400 text-indigo-950' : 'bg-amber-200 text-amber-900'
                    }`}>
                      계약
                    </span>
                  )}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-600 border border-amber-100'
                  }`}>
                    {m.category}
                  </span>
                </button>
              );
            })}

            {bookmarked.length === 0 && (
              <div className="w-full text-xs text-slate-500 py-2.5 px-3.5 bg-amber-50/50 rounded-xl border border-dashed border-amber-200 flex items-center space-x-2">
                <BookmarkCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  아직 3단계에서 [★ 관심]으로 담은 학과가 없습니다. 아래 <strong>[✨ 맞춤 추천 학과]</strong>에서 마음에 드는 전공을 선택해 보세요!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2. 1·2단계 성향 & 선호 기반 맞춤 추천 학과 행 */}
        {recommendedMajors.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>✨ 1·2단계 적성 맞춤 추천 학과 ({recommendedMajors.length}개)</span>
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  나의 생각 스타일(문/이과) 및 12대 선호 과목 적성 매칭 알고리즘 기반
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {recommendedMajors.map((m) => {
                const isSelected = activeMajor?.id === m.id;
                const isBookmarked = childData.bookmarkedMajors?.includes(m.id);
                const easyM = isEasyMode ? getEasyMajorInfo(m.id) : null;
                const label = isEasyMode && easyM?.easyName ? easyM.easyName.split(' (')[0] : m.name;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelectMajor(m.id)}
                    className={`px-3 py-1.5 rounded-xl border text-left transition-all flex items-center space-x-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-300 font-bold scale-[1.02]'
                        : isBookmarked
                        ? 'bg-amber-50 hover:bg-amber-100/80 text-amber-950 border-amber-300 font-semibold'
                        : 'bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-950 border-emerald-200 hover:border-emerald-300 font-semibold'
                    }`}
                  >
                    <Sparkles className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-200' : 'text-emerald-600'}`} />
                    <span className="text-xs">
                      {isEasyMode ? `🌱 ${label}` : m.name}
                    </span>

                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      +{m.matchScore}점
                    </span>

                    {isBookmarked && (
                      <span className={`text-[9px] px-1 rounded font-bold shrink-0 ${
                        isSelected ? 'text-amber-200' : 'text-amber-800 bg-amber-200/80'
                      }`}>
                        ★ 담김
                      </span>
                    )}

                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                      isSelected ? 'bg-white/10 text-white' : 'bg-white text-slate-600 border border-emerald-100'
                    }`}>
                      {m.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 보류 학과 심층 리포트를 보고 있을 때 알림 배너 (no-print) */}
      {childData.pendingMajors?.includes(activeMajor?.id) && (
        <div className="no-print bg-gradient-to-r from-sky-50 via-indigo-50 to-sky-50 border border-sky-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sky-950 animate-in fade-in">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-200/80 text-sky-800 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <strong className="text-sky-950 font-bold block sm:inline">현재 [△ 보류 전공 학과] 생기부 로드맵을 조회 중입니다.</strong>{' '}
              <span className="text-sky-700">고교학점제 과목과 세특 주제를 확인한 후 관심 후보 카드로 등록해 보세요.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleToggleBookmark(activeMajor.id)}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>★ [관심 후보 카드]로 승격하기</span>
          </button>
        </div>
      )}

      {/* 추천 학과 심층 리포트를 보고 있을 때 알림 배너 (no-print) */}
      {!childData.bookmarkedMajors?.includes(activeMajor?.id) && !childData.pendingMajors?.includes(activeMajor?.id) && recommendedMajors.some((m) => m.id === activeMajor?.id) && (
        <div className="no-print bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-950 animate-in fade-in">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-xs">
              <strong className="text-emerald-950 font-bold block sm:inline">1·2단계 진단 기반 [✨ 맞춤 추천 학과] 생기부 로드맵을 조회 중입니다.</strong>{' '}
              <span className="text-emerald-700">성향 및 선호 과목 적성 점수가 높은 학과입니다. 마음에 들면 관심 후보 카드로 등록해 보세요!</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleToggleBookmark(activeMajor.id)}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
          >
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span>★ [관심 전공 카드]로 등록하기</span>
          </button>
        </div>
      )}

      {/* 학과별 2022 개정 교육과정 권장 과목표 & 생기부 탐구 시트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 좌측: 2022 개정 고교학점제 선택과목 가이드 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  2022 개정 교육과정 이수 체계
                </span>
                {activeMajor.contractMajor && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-2xs">
                    <Briefcase className="w-2.5 h-2.5" />
                    {activeMajor.contractMajor.badgeText} ({activeMajor.contractMajor.partnerCompanies.join('·')})
                  </span>
                )}
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                {activeMajor.name} 권장 이수 과목
              </h3>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-bold border border-indigo-200">
              서울 주요대 발표 기준
            </span>
          </div>

          {/* 핵심 권장 과목 (필수 이수) */}
          <div>
            <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>핵심 권장 과목 (미이수 시 대학 평가 감점 요인)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeMajor.curriculum2022.core.map((subj, idx) => (
                <div
                  key={idx}
                  className="bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>{subj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 일반 권장 과목 (가산점) */}
          <div>
            <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>일반 권장 과목 (계열 적합성 가산점 부여)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeMajor.curriculum2022.recommended.map((subj, idx) => (
                <div
                  key={idx}
                  className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-semibold px-3 py-1.5 rounded-xl"
                >
                  {subj}
                </div>
              ))}
            </div>
          </div>

          {/* 대학별 평가 가이드라인 코멘트 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <div className="font-bold text-slate-800 mb-1 flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>입학사정관 평가 코멘트</span>
            </div>
            <p>{activeMajor.curriculum2022.guidance}</p>
          </div>

        </div>

        {/* 우측: 고1 공통과목 세특(탐구활동) 추천 주제 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                고1 학생부 종합전형 대비
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                고1 공통과목 연계 세특 탐구 아이디어
              </h3>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
              세특 차별화
            </span>
          </div>

          <p className="text-xs text-slate-500">
            고1 때는 모든 학생이 공통과목(국·수·영·통사·통과)을 배웁니다. 이때 아래와 같은 전공 연계 키워드로 보고서를 작성하면 1학년 때부터 일관성 있는 생기부를 완성할 수 있습니다.
          </p>

          {/* 과목별 탐구 주제 카드 */}
          <div className="space-y-3">
            {activeMajor.studentBookIdeas.map((idea, idx) => {
              const [subject, content] = idea.split(': ');
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition"
                >
                  <div className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md mb-1.5">
                    <Lightbulb className="w-3 h-3 text-amber-600" />
                    <span>{subject}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {content}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* 진로 로드맵 & 나만의 생기부 탐구 메모 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Edit3 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              [{activeMajor.name}] 진로 로드맵 & 탐구 메모
            </h3>
          </div>
          <div className="flex items-center space-x-2 no-print">
            {isSavedNotice && (
              <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>저장 완료!</span>
              </span>
            )}
            <button
              onClick={handleSaveMemo}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition flex items-center space-x-1 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>메모 저장</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          진로와 관련하여 계획 중인 이야기, 고등학교 때 가입하고 싶은 동아리, 읽고 싶은 책, 또는 찾아볼 자료 키워드를 자유롭게 적어두세요. (프로필별로 자동 보관됩니다)
        </p>

        <textarea
          rows={4}
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
          placeholder={`예: \n- 고1 때 과학/공학 시사 탐구 동아리 지원하기\n- 추천 도서: <인공지능의 미래>, <청소년을 위한 반도체 특강> 읽고 독서록 작성\n- 수학 시간에 배운 통계 지식으로 우리 학교 학생 선호도 설문조사 수행`}
          className="w-full text-xs p-3.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-indigo-500 focus:bg-white leading-relaxed"
        />
      </div>

    </div>
  );
};
