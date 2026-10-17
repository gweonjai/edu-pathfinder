import React, { useState, useMemo, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { MAJORS_DATA } from '../data/departmentsData';
import { COLLEGES } from '../data/collegesData';
import { DISLIKE_TAGS } from '../data/tendencyData';
import { getCompanySalary } from '../data/companySalaryData';
import { getEasyMajorInfo, getEasyFitHeadline } from '../data/easyLanguageData';
import { getMiddleSchoolInfo } from '../data/middleSchoolData';
import { 
  Building2, Briefcase, GraduationCap, Lock, Sparkles, ArrowRight, 
  CheckCircle2, ArrowLeft, BookmarkCheck, Bookmark, HelpCircle, Layers, BookOpen, ShieldCheck,
  Compass, AlertTriangle, Check, Award, Brain, Target, ShieldAlert
} from 'lucide-react';

export const Step3_DeepReport = ({ onGoToStep2, onGoToStep4 }) => {
  const { childData, updateChildData, activeProfile, isEasyMode, isMiddleMode, isHighMode, educationTier } = useProfile();

  // 대상 후보 학과 추출: 관심 담긴 학과 + 보류 학과
  const bookmarked = useMemo(() => MAJORS_DATA.filter((m) => childData.bookmarkedMajors.includes(m.id)), [childData.bookmarkedMajors]);
  const pending = useMemo(() => MAJORS_DATA.filter((m) => childData.pendingMajors.includes(m.id)), [childData.pendingMajors]);
  const remainingActive = useMemo(() => MAJORS_DATA.filter((m) => !childData.excludedMajors.includes(m.id)), [childData.excludedMajors]);

  // 관심 및 보류 학과 통합 목록
  const allCandidates = useMemo(() => {
    const candidates = [];
    bookmarked.forEach((m) => candidates.push(m));
    pending.forEach((m) => {
      if (!candidates.some((c) => c.id === m.id)) {
        candidates.push(m);
      }
    });
    return candidates;
  }, [bookmarked, pending]);

  const isLocked = allCandidates.length === 0;

  // 기본 선택: 관심 학과 우선, 없으면 보류 학과
  const [selectedMajorId, setSelectedMajorId] = useState(bookmarked[0]?.id || pending[0]?.id || allCandidates[0]?.id || null);

  // 후보 목록 변경 시 selectedMajorId 유효성 동기화
  useEffect(() => {
    if (allCandidates.length > 0 && !allCandidates.some((m) => m.id === selectedMajorId)) {
      setSelectedMajorId(bookmarked[0]?.id || pending[0]?.id || allCandidates[0].id);
    }
  }, [allCandidates, selectedMajorId, bookmarked, pending]);

  // 현재 상세 선택된 학과 객체
  const activeMajor = allCandidates.find((m) => m.id === selectedMajorId) || bookmarked[0] || pending[0] || allCandidates[0];
  const easyActiveInfo = isEasyMode && activeMajor ? getEasyMajorInfo(activeMajor.id) : null;
  const middleActiveInfo = !isEasyMode && activeMajor ? getMiddleSchoolInfo(activeMajor.id) : null;

  // 관심/보류 토글 액션 (Step 3에서 직접 승격 가능)
  const handleToggleBookmark = (majorId) => {
    const isAlreadyBookmarked = childData.bookmarkedMajors.includes(majorId);
    if (isAlreadyBookmarked) {
      updateChildData({
        bookmarkedMajors: childData.bookmarkedMajors.filter((id) => id !== majorId),
        pendingMajors: Array.from(new Set([...childData.pendingMajors, majorId])),
      });
    } else {
      updateChildData({
        bookmarkedMajors: Array.from(new Set([...childData.bookmarkedMajors, majorId])),
        pendingMajors: childData.pendingMajors.filter((id) => id !== majorId),
      });
    }
  };

  // 1단계 생각 스타일(성향) 판별 결과 추출
  const answers = childData.tendencyAnswers || {};
  const answerValues = Object.values(answers);
  const mathCount = answerValues.filter((v) => v === '이과').length;
  const liberalCount = answerValues.filter((v) => v === '문과').length;
  const fusionCount = answerValues.filter((v) => v === '융합').length;
  const totalAnswered = answerValues.length;

  const tendencyAnalysis = useMemo(() => {
    let type = '융합';
    let label = '문·이과 융합형 성향';
    let summaryText = '문과와 이과의 장점을 고루 갖춘 유연한 문제 해결자';
    if (totalAnswered > 0) {
      if (mathCount >= 3 && mathCount > liberalCount) {
        type = '이과';
        label = '이과(자연·공학) 탐구 성향';
        summaryText = '원리를 파고들어 확실한 정답과 시스템을 구축하는 탐구자';
      } else if (liberalCount >= 3 && liberalCount > mathCount) {
        type = '문과';
        label = '문과(인문·사회) 소통 성향';
        summaryText = '사람의 심리와 사회적 맥락을 읽고 소통을 이끄는 기획자';
      }
    }
    return { type, label, summaryText, mathCount, liberalCount, fusionCount, totalAnswered };
  }, [mathCount, liberalCount, fusionCount, totalAnswered]);

  // 1단계 성향 vs 현재 학과 전공 핏(Fit) 정밀 분석
  const majorFitAnalysis = useMemo(() => {
    if (!activeMajor) return null;
    const { type: userType, label: userLabel } = tendencyAnalysis;
    const majorTrack = activeMajor.track;

    if (isEasyMode) {
      const easyFit = getEasyFitHeadline(userType, majorTrack, activeMajor.name);
      return {
        fitScore: easyFit.fitScore,
        matchType: easyFit.matchType,
        fitHeadline: easyFit.headline,
        fitDescription: easyFit.desc
      };
    }

    let fitScore = 95;
    let matchType = '성향 일치';
    let fitHeadline = '';
    let fitDescription = '';

    if (userType === majorTrack) {
      fitScore = 98;
      matchType = '본질 성향 100% 일치';
      if (majorTrack === '이과') {
        fitHeadline = `학생의 [원리 탐구 & 시스템 메커니즘 설계] 성향과 완벽히 부합합니다.`;
        fitDescription = `1단계 6개 질문에서 확인된 원인 역추적 및 논리적 해답 규명 성향이 ${activeMajor.name}의 학술 연구 및 기술 구현 과정과 최상의 조화를 이룹니다. 전공 공부를 할수록 높은 몰입도를 발휘할 수 있습니다.`;
      } else {
        fitHeadline = `학생의 [사람 중심 소통 & 사회적 맥락 통찰] 성향과 완벽히 부합합니다.`;
        fitDescription = `1단계에서 나타난 다각도의 관점 이해와 언어적 정리 능력이 ${activeMajor.name}의 사회과학·인문학적 연구 및 커뮤니케이션 실무와 정확하게 일치합니다. 현상을 입체적으로 해석하는 데 탁월한 강점을 가집니다.`;
      }
    } else if (userType === '융합' || majorTrack === '융합') {
      fitScore = 93;
      matchType = '학제간 융합 시너지';
      fitHeadline = `학생의 [유연한 균형 감각 & 다각도 최적화] 성향과 뛰어난 시너지를 냅니다.`;
      fitDescription = `특정 분야에 치우치지 않고 데이터와 사람의 반응을 골고루 고려하는 균형 감각이 ${activeMajor.name}에서 요구하는 다학제적 문제 해결 능력과 훌륭하게 맞물립니다.`;
    } else {
      fitScore = 88;
      matchType = '차별화 크로스오버(Cross-over)';
      if (userType === '문과' && majorTrack === '이과') {
        fitHeadline = `[문과적 소통력 + ${activeMajor.name} 기술 지식]의 독보적 희소성`;
        fitDescription = `인문·사회적 문해력과 공감 능력을 갖춘 상태에서 이과 전공 지식을 습득하면, 순수 공학자들 사이에서 '기술을 고객과 경영진의 언어로 완벽히 통역하는 최고의 프로덕트 매니저(PM)'로 강력한 차별성을 갖게 됩니다.`;
      } else {
        fitHeadline = `[이과적 정량 분석력 + ${activeMajor.name} 전략 기획]의 독보적 희소성`;
        fitDescription = `논리적 인과 분석과 팩트 중심 사고를 바탕으로 문과 전공을 이수하면, 정성적 논리에 머물지 않고 정량적 데이터로 시장과 비즈니스를 움직이는 '데이터 기반 핵심 전략 기획가'로 두각을 나타냅니다.`;
      }
    }

    return { fitScore, matchType, fitHeadline, fitDescription };
  }, [activeMajor, tendencyAnalysis, isEasyMode]);

  // 1단계 기피/감내 조건 대조 분석
  const dislikeAnalysis = useMemo(() => {
    if (!activeMajor) return { tolerableList: [], avoidedList: [] };

    const tolerableTagIds = childData.tolerableDislikeTags || [];
    const excludeTagIds = childData.selectedDislikeTags || [];

    // 이 학과에 속해 있으면서, 학생이 1단계에서 '감내'하기로 한 기피 태그
    const tolerableList = DISLIKE_TAGS.filter((d) =>
      tolerableTagIds.includes(d.id) && activeMajor.tags.some((t) => d.matchedTags.includes(t))
    );

    // 학생이 1단계에서 '절대 제외'했던 태그 중, 이 학과에는 없는(안전한) 태그들
    const avoidedList = DISLIKE_TAGS.filter((d) =>
      excludeTagIds.includes(d.id) && !activeMajor.tags.some((t) => d.matchedTags.includes(t))
    );

    return { tolerableList, avoidedList };
  }, [activeMajor, childData.tolerableDislikeTags, childData.selectedDislikeTags]);

  if (isLocked) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-2xl mx-auto my-8 space-y-6 animate-in fade-in">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-indigo-100">
          <Star className="w-8 h-8 text-indigo-600 fill-indigo-100" />
        </div>
        <div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-200/60">
            관심 학과 분석 안내
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-3">
            아직 관심 등록된 학과가 없습니다
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            심층 분석 리포트는 내가 찜한 학과의 취업률, 대기업 부서, 연봉 정보를 집중 분석합니다.<br />
            학과 보드에서 마음에 드는 학과에 <strong>[★ 관심]</strong>을 담아주세요!
          </p>
        </div>
        <button
          onClick={onGoToStep2}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition inline-flex items-center space-x-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>학과 보드로 이동하여 관심 학과 담기</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 상단 브리핑 배너 (1·2단계 소거 여정 통합 반영) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isEasyMode
                  ? '🌱 3단계: 초등 5~6학년 눈높이 쉬운 심층 리포트'
                  : isMiddleMode
                  ? '💡 3단계: 중학 1~3학년 실생활 연계 진로 리포트'
                  : '🎓 3단계: 고교학점제 & 대입 심층 분석 리포트'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {activeProfile.name} 님의 전공 탐구 ({allCandidates.length}개 전공)
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              {isEasyMode
                ? `내가 고른 관심 학과(${bookmarked.length}개)와 보류 학과(${pending.length}개)가 대학교에서 어떤 신기한 걸 배우고, 나중에 커서 어떤 멋진 회사에 들어가는지 알기 쉽게 보여줘요!`
                : isMiddleMode
                ? `내가 찜한 전공들(${allCandidates.length}개)이 일상생활 속 어떤 서비스와 제품을 만드는지 확인하고, 고등학교 진학 및 문·이과 선택에 실질적인 힌트를 얻어보세요.`
                : `2단계에서 선별한 관심 후보(${bookmarked.length}개)와 보류 후보(${pending.length}개)의 2022 개정 핵심 이수과목, 학생부 세특 탐구 주제, 대기업 계약학과 취업 타깃을 정밀 분석합니다.`}
            </p>
          </div>
          <button
            onClick={onGoToStep4}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/30 transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>고1 생기부 설계로 이동</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 상단 선택 컨트롤 바: 좌측 관심 전공 카드 안내 / 우측 보류 전공 드롭다운 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-xl flex items-center space-x-1.5">
            <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>★ 관심 전공 카드 ({bookmarked.length}개)</span>
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            카드를 클릭하여 상세 리포트를 확인하세요.
          </span>
        </div>

        {/* 보류 전공 학과 드롭다운 메뉴 */}
        {pending.length > 0 && (
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <label className="text-xs font-bold text-sky-800 shrink-0 flex items-center space-x-1">
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>보류 전공 선택:</span>
            </label>
            <select
              value={pending.some((m) => m.id === selectedMajorId) ? selectedMajorId : ''}
              onChange={(e) => {
                if (e.target.value) setSelectedMajorId(e.target.value);
              }}
              className={`text-xs border rounded-xl px-3 py-2 font-bold cursor-pointer transition w-full sm:w-64 focus:outline-indigo-500 ${
                pending.some((m) => m.id === selectedMajorId)
                  ? 'bg-sky-50 text-sky-900 border-sky-400 ring-2 ring-sky-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <option value="">△ 보류 전공 학과 선택 ({pending.length}개)...</option>
              {pending.map((m) => (
                <option key={m.id} value={m.id}>
                  △ {m.name} ({m.category})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 관심으로 선택한 전공 학과만 카드 형태로 선택 */}
      <div className="flex overflow-x-auto no-scrollbar space-x-2.5 pb-1">
        {bookmarked.map((m) => {
          const isSelected = activeMajor?.id === m.id;
          const easyM = isEasyMode ? getEasyMajorInfo(m.id) : null;
          const label = isEasyMode && easyM?.easyName ? easyM.easyName.split(' (')[0] : m.name;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMajorId(m.id)}
              className={`px-4 py-3 rounded-2xl border text-left transition whitespace-nowrap flex items-center space-x-2.5 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 font-semibold'
              }`}
            >
              <BookmarkCheck className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-amber-500'}`} />
              <span className="text-sm">
                {isEasyMode ? `🌱 ${label}` : m.name}
              </span>

              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                ★ 관심
              </span>

              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isSelected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {m.category}
              </span>
            </button>
          );
        })}

        {bookmarked.length === 0 && (
          <div className="w-full text-xs text-slate-500 py-3 px-4 bg-amber-50/70 rounded-2xl border border-dashed border-amber-200 flex items-center space-x-2">
            <BookmarkCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              아직 2단계에서 [★ 관심]으로 담은 학과가 없습니다. 우측 <strong>[보류 전공 선택] 드롭다운</strong>에서 학과를 확인하고 관심 카드로 승격해 보세요!
            </span>
          </div>
        )}
      </div>

      {/* 현재 보류 학과 심층 리포트를 보고 있을 때 상단 알림 배너 */}
      {childData.pendingMajors.includes(activeMajor?.id) && (
        <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-sky-50 border border-sky-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sky-950 animate-in fade-in">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-200/80 text-sky-800 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <strong className="text-sky-950 font-bold block sm:inline">현재 [△ 보류 전공 학과] 심층 리포트를 조회 중입니다.</strong>{' '}
              <span className="text-sky-700">커리큘럼과 취업 타깃을 확인한 후 마음에 들면 관심 후보 카드로 등록해 보세요.</span>
            </div>
          </div>
          <button
            onClick={() => handleToggleBookmark(activeMajor.id)}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>★ [관심 후보 카드]로 승격하기</span>
          </button>
        </div>
      )}

      {/* 1단계 & 2단계 연동 개인화 분석 대시보드 */}
      {activeMajor && majorFitAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* 1. 생각 스타일 vs 전공 핏(Fit) 분석 카드 */}
          <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-50/70 rounded-bl-full pointer-events-none -z-0" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 block">1단계 성향 연동 분석</span>
                    <h4 className="text-sm font-black text-slate-900">나의 생각 스타일 vs 전공 핏(Fit)</h4>
                  </div>
                </div>
                <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full">
                  {majorFitAnalysis.matchType} ({majorFitAnalysis.fitScore}점)
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3 space-y-1">
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>내 생각 스타일: <strong className="text-slate-800">{tendencyAnalysis.label}</strong></span>
                  <span>전공 계열: <strong className="text-indigo-600">{activeMajor.track}</strong></span>
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {majorFitAnalysis.fitHeadline}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {majorFitAnalysis.fitDescription}
              </p>
            </div>
            
            <div className="text-[11px] text-indigo-600 font-semibold mt-3 pt-2.5 border-t border-slate-100 flex items-center space-x-1">
              <Target className="w-3.5 h-3.5" />
              <span>1단계 6개 질문 응답 데이터 기반 맞춤형 해석</span>
            </div>
          </div>

          {/* 2. 기피 & 감내 조건 리스크 관리 가이드 카드 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-600 block">1단계 기피 조건 연동</span>
                    <h4 className="text-sm font-black text-slate-900">감내 리스크 & 안심 요소 가이드</h4>
                  </div>
                </div>
                {dislikeAnalysis.tolerableList.length > 0 ? (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    <span>감내 요소 {dislikeAnalysis.tolerableList.length}개 발견</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>기피 부담 없음 (안전)</span>
                  </span>
                )}
              </div>

              {/* 감내 요소가 있을 경우 실질적 학습 조언 */}
              {dislikeAnalysis.tolerableList.length > 0 ? (
                <div className="space-y-2 mb-3">
                  {dislikeAnalysis.tolerableList.map((tag) => (
                    <div key={tag.id} className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80">
                      <div className="text-xs font-bold text-amber-900 flex items-center space-x-1.5 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>내가 감내하기로 한 속성: [{tag.shortLabel}]</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        1단계에서 목표를 위해 감내하기로 선택한 영역입니다. {activeMajor.name} 전공 특성상 관련 비중이 있으므로, 고등학교 때 기초 선택과목을 단단히 준비해 두는 것이 학점 방어의 열쇠입니다.
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 mb-3">
                  <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                    1단계에서 [부담되지만 감내] 또는 [절대 제외]로 설정한 비선호 속성이 이 학과에는 존재하지 않습니다. 부담 없이 자신의 장점에 집중할 수 있습니다.
                  </p>
                </div>
              )}

              {/* 안심 요소 피드백 */}
              {dislikeAnalysis.avoidedList.length > 0 && (
                <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <strong className="text-slate-700 font-semibold">✓ 안심 포인트:</strong> 1단계에서 절대 제외했던 [{dislikeAnalysis.avoidedList.map(t => t.shortLabel).join(', ')}] 부담이 이 학과에는 전혀 없습니다.
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400 mt-3 pt-2.5 border-t border-slate-100 flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>선택한 기피 조건과 실제 학과 커리큘럼 간 교차 검증 완료</span>
            </div>
          </div>

        </div>
      )}

      {activeMajor && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 좌측: 전공 학업 및 커리큘럼 분석 (1/3) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* 기본 개요 카드 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full">
                    {activeMajor.category} · {activeMajor.track}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activeMajor.subCategory}
                  </span>
                </div>

                {/* 2단계 상태 표시 및 원클릭 관심/보류 토글 버튼 */}
                <button
                  onClick={() => handleToggleBookmark(activeMajor.id)}
                  className={`inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border transition cursor-pointer ${
                    childData.bookmarkedMajors.includes(activeMajor.id)
                      ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                      : 'bg-sky-50 text-sky-800 border-sky-300 hover:bg-sky-100'
                  }`}
                  title={childData.bookmarkedMajors.includes(activeMajor.id) ? '클릭 시 보류 목록으로 변경' : '클릭 시 최종 관심 후보로 승격'}
                >
                  {childData.bookmarkedMajors.includes(activeMajor.id) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>★ 관심 후보</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5 text-sky-600" />
                      <span>△ 보류 중 (클릭 시 관심 승격)</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                {isEasyMode && easyActiveInfo?.easyName && (
                  <span className="inline-block text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full mb-1">
                    🌱 초등학생 눈높이 쉬운 이름
                  </span>
                )}
                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  {isEasyMode && easyActiveInfo?.easyName ? easyActiveInfo.easyName : activeMajor.name}
                </h3>
                {isEasyMode && easyActiveInfo?.easyName ? (
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    표준 전공명: {activeMajor.name}
                  </div>
                ) : (
                  middleActiveInfo?.realLifeExample && (
                    <div className="mt-1.5 inline-flex items-start text-xs text-indigo-950 bg-indigo-50 border border-indigo-200/90 rounded-lg px-3 py-1.5 leading-snug">
                      <span className="font-black text-indigo-700 shrink-0 mr-1.5">
                        💡 실생활 적용 사례:
                      </span>
                      <span className="font-medium text-slate-700">
                        {middleActiveInfo.realLifeExample}
                      </span>
                    </div>
                  )
                )}

                {/* ★ 대기업 계약학과 눈에 띄는 뱃지 */}
                {activeMajor.contractMajor && (
                  <div className="mt-2 mb-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-sm ring-1 ring-amber-300">
                      <Briefcase className="w-3.5 h-3.5 shrink-0" />
                      <span>{isEasyMode ? '대기업 100% 취직 보장 특별반' : activeMajor.contractMajor.badgeText}</span>
                      <span className="bg-black/25 text-amber-100 text-[10px] px-1.5 py-0.5 rounded font-extrabold">
                        {activeMajor.contractMajor.partnerCompanies.join(' · ')}
                      </span>
                    </div>
                  </div>
                )}

                <p className={`text-xs leading-relaxed mt-2 p-3 rounded-xl border ${
                  isEasyMode ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium' : 'bg-slate-50 border-slate-100 text-slate-600'
                }`}>
                  {isEasyMode && easyActiveInfo?.easySummary ? easyActiveInfo.easySummary : activeMajor.summary}
                </p>
              </div>

              {/* 핵심 커리큘럼 / 대학교에서 배우는 것 */}
              <div>
                <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>{isEasyMode ? '대학교에서 배우는 신기하고 재미있는 공부' : '4년 동안 어떤 공부를 하는가?'}</span>
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  {isEasyMode && easyActiveInfo?.easyWhatWeLearn ? (
                    easyActiveInfo.easyWhatWeLearn.map((item, idx) => (
                      <div key={idx} className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80 font-semibold text-emerald-950 flex items-start space-x-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))
                  ) : (
                    activeMajor.curriculum.map((c, idx) => (
                      <div key={idx} className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70 font-medium">
                        {c}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 개설 대학 풀 */}
              <div>
                <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>서울 주요 20개 대학 개설 현황</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {COLLEGES.filter((c) => activeMajor.colleges.includes(c.id)).map((c) => (
                    <span key={c.id} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-1 rounded-lg border border-slate-200 font-medium">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* 우측: 중견기업 이상 취업 타깃 및 구체적 추천 부서 (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 기업 및 부서 정밀 분석 카드 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h4 className="text-base font-black text-slate-900 flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <span>중견기업 이상 취업 타깃 및 실무 추천 부서</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    해당 전공 졸업 시 진출하기 유리한 우량 중견·대기업 및 핵심 부서 포지션입니다.
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full">
                  {activeMajor.corporateTarget.level}
                </span>
              </div>

              {/* ★ 대기업 계약학과 특별 혜택 및 트랙 안내 카드 */}
              {activeMajor.contractMajor && (
                <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border-2 border-amber-300 rounded-2xl p-4.5 space-y-2.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-xs">
                        <Briefcase className="w-3.5 h-3.5" />
                        {activeMajor.contractMajor.badgeText}
                      </span>
                      <span className="text-xs font-black text-amber-950">
                        협약 기업: {activeMajor.contractMajor.partnerCompanies.join(', ')}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                      100% 입사 채용 보장 & 전액 장학금
                    </span>
                  </div>
                  <div className="text-xs text-slate-800 font-semibold">
                    <strong>개설 대학 및 트랙:</strong> {activeMajor.contractMajor.univsText}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {isEasyMode && easyActiveInfo?.easyContractText ? easyActiveInfo.easyContractText : activeMajor.contractMajor.description}
                  </p>

                  {/* 협약 기업별 대졸 신입 초봉 정보 */}
                  <div className="pt-2 border-t border-amber-200/80">
                    <div className="text-[11px] font-bold text-amber-900 mb-1.5 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>{isEasyMode ? '채용 협약 기업 첫해 받는 돈 (초봉)' : '채용 협약 기업 대졸 신입 초봉 (2024~2025년 최신 공시 기준)'}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeMajor.contractMajor.partnerCompanies.map((comp) => {
                        const s = getCompanySalary(comp);
                        if (!s) return null;
                        return (
                          <div key={comp} className="bg-white/95 rounded-xl p-2.5 border border-amber-200 shadow-2xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-slate-900">{comp}</span>
                              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                성과급 포함 {s.totalSalary}원
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600 flex items-center justify-between">
                              <span>기본 계약 연봉</span>
                              <span className="font-bold text-slate-800">{s.baseSalary}원</span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate" title={s.incentiveNote}>
                              * {s.incentiveNote}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 1. 추천 기업 풀 및 대졸 초봉 */}
              <div>
                <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{isEasyMode ? '나중에 커서 들어갈 수 있는 멋진 회사들과 첫해 월급/연봉' : '주요 진출 목표 기업 및 대졸 신입 초봉 (2024~2025 최신)'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    * 기본 계약급 / 실적 성과급 포함 체감 총액
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {activeMajor.corporateTarget.examples.map((company, cIdx) => {
                    const sal = getCompanySalary(company);
                    return (
                      <div
                        key={cIdx}
                        className="p-3 rounded-xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition flex flex-col justify-between space-y-1.5 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900 truncate group-hover:text-indigo-600 transition" title={company}>
                            {company}
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600 shrink-0 ml-1">
                            대졸 신입
                          </span>
                        </div>
                        {sal && (
                          <div className="space-y-1 pt-1 border-t border-slate-200/60">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-500 font-medium">기본 연봉</span>
                              <span className="font-bold text-slate-800">{sal.baseSalary}원</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-emerald-700 font-semibold">성과급 포함</span>
                              <span className="font-black text-emerald-700 bg-emerald-50 px-1 rounded">
                                {sal.totalSalary}원
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate pt-0.5" title={sal.incentiveNote}>
                              ℹ {sal.incentiveNote}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. 구체적인 실무 부서 및 직무 포지션 */}
              <div>
                <div className="text-xs font-bold text-slate-700 mb-2.5 flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>{isEasyMode ? '회사에서 실제로 맡아서 일하게 될 멋진 팀' : '입사 시 추천하는 구체적 실무 부서(Department)'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {isEasyMode && easyActiveInfo?.easyDepartments ? (
                    easyActiveInfo.easyDepartments.map((dept, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start space-x-2.5"
                      >
                        <div className="w-5 h-5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {dIdx + 1}
                        </div>
                        <div>
                          <div className="text-xs font-black text-emerald-950">
                            {dept.name}
                          </div>
                          <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                            {dept.desc}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    activeMajor.corporateTarget.departments.map((dept, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start space-x-2.5"
                      >
                        <div className="w-5 h-5 rounded-lg bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {dIdx + 1}
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-950">
                            {dept}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            전공 지식을 직접 활용하여 의사결정 및 개발·기획을 주도하는 부서
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 3. 진로 분야 및 커리어 성장 트랙 */}
              <div>
                <div className="text-xs font-bold text-slate-700 mb-2 flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  <span>대표 직무 및 자격증/커리어 트랙</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeMajor.careerPaths.map((path, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-xs bg-slate-100 text-slate-800 font-semibold px-3 py-1.5 rounded-xl border border-slate-200"
                    >
                      {path}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* 하단 다음 단계 유도 배너 */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-indigo-900">
                  고1 입학 전, 어떤 선택과목을 듣고 생기부 세특을 채워야 할까요?
                </div>
                <p className="text-xs text-indigo-700 mt-0.5">
                  2022 개정 교육과정(고교학점제)에 맞춘 <strong>{activeMajor.name} 권장 이수 과목과 고1 세특 탐구 주제</strong>를 확인하세요.
                </p>
              </div>
              <button
                onClick={onGoToStep4}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 shrink-0"
              >
                <span>생기부 로드맵 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
