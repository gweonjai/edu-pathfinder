import React, { useMemo } from 'react';
import { useProfile } from '../context/ProfileContext';
import { DISLIKE_TAGS, TENDENCY_QUESTIONS } from '../data/tendencyData';
import { MAJORS_DATA } from '../data/departmentsData';
import { 
  Calculator, Atom, HeartPulse, Code, FlaskConical, Users, Globe, GraduationCap, 
  Wrench, Cpu, LineChart, BookOpen, Scale,
  CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, AlertCircle, AlertTriangle, X 
} from 'lucide-react';

const ICON_MAP = {
  Calculator, Atom, HeartPulse, Code, FlaskConical, Users, Globe, GraduationCap,
  Wrench, Cpu, LineChart, BookOpen, Scale
};

export const Step1_TendencyFilter = ({ onNextStep }) => {
  const { childData, updateChildData, activeProfile, isEasyMode, isMiddleMode, isHighMode, educationTier } = useProfile();
  
  // childData.tendencyAnswers에 직접 바인딩하여 동기화 누락 방지
  const answers = childData.tendencyAnswers || {};

  // 기피 태그 레벨 핸들러 (3단계: none -> tolerable -> exclude)
  // 이전 데이터(selectedDislikeTags, tolerableDislikeTags) 자동 복원 Fallback 보장
  const dislikeLevels = useMemo(() => {
    if (childData.dislikeLevels && Object.keys(childData.dislikeLevels).length > 0) {
      return childData.dislikeLevels;
    }
    const restored = {};
    (childData.selectedDislikeTags || []).forEach((tagId) => {
      restored[tagId] = 'exclude';
    });
    (childData.tolerableDislikeTags || []).forEach((tagId) => {
      restored[tagId] = 'tolerable';
    });
    return restored;
  }, [childData.dislikeLevels, childData.selectedDislikeTags, childData.tolerableDislikeTags]);

  const handleSetDislikeLevel = (tagId, targetLevel) => {
    const currentLevel = dislikeLevels[tagId];
    const nextDislikeLevels = { ...dislikeLevels };

    if (currentLevel === targetLevel) {
      delete nextDislikeLevels[tagId]; // 이미 선택된 버튼 다시 누르면 해제
    } else {
      nextDislikeLevels[tagId] = targetLevel;
    }

    const excludeTags = Object.keys(nextDislikeLevels).filter(
      (k) => nextDislikeLevels[k] === 'exclude'
    );
    const tolerableTags = Object.keys(nextDislikeLevels).filter(
      (k) => nextDislikeLevels[k] === 'tolerable'
    );

    // '절대 제외'인 태그에 매칭되는 학과만 소거
    const allExcludeMatched = DISLIKE_TAGS
      .filter((t) => excludeTags.includes(t.id))
      .flatMap((t) => t.matchedTags);

    const majorsToExclude = MAJORS_DATA.filter((major) =>
      major.tags.some((tagItem) => allExcludeMatched.includes(tagItem))
    ).map((m) => m.id);

    // 기존 수동 제외 목록(기피 태그 소거와 무관한 학과들) 유지
    const otherManualExcluded = (childData.excludedMajors || []).filter(
      (id) => !MAJORS_DATA.find((m) => m.id === id)?.tags.some((t) =>
        DISLIKE_TAGS.flatMap((d) => d.matchedTags).includes(t)
      )
    );

    const mergedExcluded = Array.from(new Set([...otherManualExcluded, ...majorsToExclude]));

    updateChildData({
      dislikeLevels: nextDislikeLevels,
      selectedDislikeTags: excludeTags,
      tolerableDislikeTags: tolerableTags,
      excludedMajors: mergedExcluded,
    });
  };

  // 문이과 퀴즈 답변 핸들러
  const handleAnswerQuestion = (qId, option) => {
    const nextAnswers = { ...answers, [qId]: option.track };
    updateChildData({ tendencyAnswers: nextAnswers });
  };

  // 문이과 성향 통계 계산 (6문항 정밀 판별)
  const answerValues = Object.values(answers);
  const mathCount = answerValues.filter((v) => v === '이과').length;
  const liberalCount = answerValues.filter((v) => v === '문과').length;
  const fusionCount = answerValues.filter((v) => v === '융합').length;
  const totalAnswered = answerValues.length;

  let tendencySummary = '성향 진단 대기 중 (6문항)';
  let tendencyDetail = '';
  if (totalAnswered > 0) {
    if (mathCount >= 3 && mathCount > liberalCount) {
      tendencySummary = '이과(자연·공학) 탐구 성향이 더 잘 맞아요';
      tendencyDetail = `이과 ${mathCount} / 문과 ${liberalCount} / 융합 ${fusionCount}`;
    } else if (liberalCount >= 3 && liberalCount > mathCount) {
      tendencySummary = '문과(인문·사회) 소통 성향이 더 잘 맞아요';
      tendencyDetail = `문과 ${liberalCount} / 이과 ${mathCount} / 융합 ${fusionCount}`;
    } else if (fusionCount >= 3 || Math.abs(mathCount - liberalCount) <= 1) {
      tendencySummary = '문·이과 골고루 갖춘 융합형 성향이에요';
      tendencyDetail = `융합 ${fusionCount} / 이과 ${mathCount} / 문과 ${liberalCount}`;
    } else if (mathCount > liberalCount) {
      tendencySummary = '이과 성향에 조금 더 가까워요';
      tendencyDetail = `이과 ${mathCount} / 문과 ${liberalCount} / 융합 ${fusionCount}`;
    } else {
      tendencySummary = '문과 성향에 조금 더 가까워요';
      tendencyDetail = `문과 ${liberalCount} / 이과 ${mathCount} / 융합 ${fusionCount}`;
    }
  }

  // 문과 전체 또는 이과 전체 일괄 소거 기능
  const handleExcludeTrack = (trackToExclude) => {
    const majorsOfTrack = MAJORS_DATA.filter((m) => m.track === trackToExclude).map((m) => m.id);
    const merged = Array.from(new Set([...childData.excludedMajors, ...majorsOfTrack]));
    updateChildData({ excludedMajors: merged });
  };

  // 소거 초기화
  const handleResetFilters = () => {
    if (confirm('현재 프로필의 기피 태그 및 소거 내역을 모두 초기화하시겠습니까?')) {
      updateChildData({
        dislikeLevels: {},
        selectedDislikeTags: [],
        tolerableDislikeTags: [],
        excludedMajors: [],
        pendingMajors: [],
        bookmarkedMajors: [],
        tendencyAnswers: {}
      });
      setAnswers({});
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 상단 안내 배너 */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isEasyMode
                    ? '🌱 1단계: 나에게 맞지 않는 것 지우기 (소거법)'
                    : isMiddleMode
                    ? '💡 1단계: 실생활 흥미 기반 기피 소거 (자유학기제 연계)'
                    : '🎓 1단계: 2022 개정 과목 기반 대입 전공 소거'}
                </span>
              </div>
              {isEasyMode ? (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  <span>🌱 초등 5~6학년 눈높이 모드</span>
                </div>
              ) : isMiddleMode ? (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/40 text-indigo-200 border border-indigo-400/40">
                  <span>💡 중학 1~3학년 실생활 연계 모드</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-500/40 text-slate-200 border border-slate-400/40">
                  <span>🎓 고교 1~3학년 입시·고교학점제 모드</span>
                </div>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {isEasyMode
                ? `${activeProfile?.name || '친구'}의 "절대 하기 싫은 공부"부터 쏙쏙 빼보세요!`
                : isMiddleMode
                ? `${activeProfile?.name || '친구'}에게 맞지 않는 "실생활 활동 & 공부 유형"을 덜어내세요!`
                : `${activeProfile?.name || '본인'} 님의 학업 역량과 맞지 않는 전공 조건을 먼저 배제하세요!`}
            </h2>
            <p className="text-sm text-indigo-200 mt-1 max-w-2xl leading-relaxed">
              {isEasyMode
                ? '어떤 대학교 학과를 가고 싶은지 지금 당장 고르기는 어렵지만, "이런 공부나 활동은 정말 하기 싫다"는 건 쉽게 알 수 있어요. 싫은 조건을 콕 집어 누르면 관련 학과들이 알아서 쏙 지워집니다!'
                : isMiddleMode
                ? '코딩, 복잡한 계산, 피/해부, 암기 등 내가 꺼려지는 학업 활동을 선택하면, 고교 선택 및 문·이과 계열에 맞춰 맞지 않는 학과들이 자동으로 정리됩니다.'
                : '2022 개정 고교학점제 핵심 이수 과목과 대학 전공 기초 역량을 분석하여, 나의 강점을 살리기 어려운 학과들을 합리적으로 소거합니다.'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleResetFilters}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl transition flex items-center space-x-1 border border-white/20 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>전체 초기화</span>
            </button>
            <button
              onClick={onNextStep}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/30 transition flex items-center space-x-1 cursor-pointer"
            >
              <span>학과 보드로 이동</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 1. 간이 문/이과 성향 체크 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">1</span>
              <span>{isEasyMode ? '나의 생각 스타일 & 문제 풀 때 성향 알아보기 (6문항)' : '나의 생각 스타일 & 문제 해결 성향 알아보기 (6문항)'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEasyMode 
                ? '정답은 없어요! 평소 내 모습과 더 가깝고 편한 방식을 솔직하게 골라보세요.' 
                : '정답이 없으니, 평소 나에게 더 자연스럽고 편한 방식을 솔직하게 골라보세요.'}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <div className="flex items-center sm:justify-end space-x-2">
              <span className="text-[11px] font-semibold text-slate-400">
                {totalAnswered}/6문항 응답
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {tendencySummary}
              </span>
            </div>
            {tendencyDetail && (
              <div className="text-[10px] text-slate-400 mt-1 font-medium">
                {tendencyDetail}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TENDENCY_QUESTIONS.map((q, idx) => (
            <div key={q.id} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    Q{idx + 1}
                  </span>
                  {q.category && (
                    <span className="text-[10px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      {q.category}
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-slate-900 mb-3 leading-snug">
                  {isEasyMode && q.easyQuestion ? q.easyQuestion : q.question}
                </div>
              </div>

              <div className="space-y-2 mt-2">
                {q.options.map((opt, oIdx) => {
                  const isChosen = answers[q.id] === opt.track;
                  const optionLabel = isEasyMode && opt.easyText ? opt.easyText : opt.text;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerQuestion(q.id, opt)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs leading-relaxed transition border cursor-pointer ${
                        isChosen
                          ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-2xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {optionLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 문/이과 계열 일괄 소거 단축 버튼 */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-500">
            {isEasyMode
              ? '내 성향이 뚜렷하다면 문과나 이과 학과들을 한꺼번에 뺄 수도 있어요:'
              : '성향이 확실하다면 계열 단위로 먼저 대량 소거할 수 있습니다:'}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExcludeTrack('문과')}
              className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium transition cursor-pointer"
            >
              {isEasyMode ? '✕ 문과(인문·사회) 학과 몽땅 빼기' : '✕ 문과(인문·사회) 전체 제외하기'}
            </button>
            <button
              onClick={() => handleExcludeTrack('이과')}
              className="px-3 py-1.5 rounded-lg border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 font-medium transition cursor-pointer"
            >
              {isEasyMode ? '✕ 이과(자연·공학) 학과 몽땅 빼기' : '✕ 이과(자연·공학) 전체 제외하기'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. 기피 조건 소거 태그 카드 12종 (3단계 감내 시스템) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 text-xs font-black flex items-center justify-center">2</span>
              <span>{isEasyMode ? '내가 싫어하거나 힘든 공부 덜어내기 (12가지 기피 조건)' : '기피 조건(비선호 속성) 12개 정교화 3단계 감내 소거'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEasyMode
                ? '무조건 다 빼기보다, "조금 힘들어도 참을 수 있는 것"과 "정말 너무 싫어서 절대 못 하는 것"을 구분해서 골라보세요.'
                : '무조건 지우기보다, \'부담되지만 필요시 감내할 조건\'과 \'절대 감내할 수 없는 조건\'을 구분하여 합리적으로 소거해 보세요.'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              {isEasyMode ? `절대 싫어요: ${childData.excludedMajors.length}개 학과 제외됨` : `절대 제외: ${childData.excludedMajors.length}개 학과`}
            </div>
            {childData.tolerableDislikeTags?.length > 0 && (
              <div className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {isEasyMode ? `조금 부담: ${childData.tolerableDislikeTags.length}개 조건` : `감내 주의: ${childData.tolerableDislikeTags.length}개 속성`}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DISLIKE_TAGS.map((tag) => {
            const currentLevel = dislikeLevels[tag.id];
            const isExclude = currentLevel === 'exclude';
            const isTolerable = currentLevel === 'tolerable';
            const Icon = ICON_MAP[tag.icon] || AlertCircle;

            // 해당 태그로 영향받는 학과 개수
            const matchedMajorsCount = MAJORS_DATA.filter((m) =>
              m.tags.some((t) => tag.matchedTags.includes(t))
            ).length;

            const displayShortLabel = (isEasyMode && tag.easyShortLabel) ? tag.easyShortLabel : tag.shortLabel;
            const displayLabel = (isEasyMode && tag.easyLabel) ? tag.easyLabel : tag.label;

            return (
              <div
                key={tag.id}
                className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                  isExclude
                    ? 'bg-rose-50/70 border-rose-300 shadow-md ring-2 ring-rose-400/40'
                    : isTolerable
                    ? 'bg-amber-50/70 border-amber-300 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl ${
                      isExclude
                        ? 'bg-rose-600 text-white'
                        : isTolerable
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isExclude ? (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-200/80 px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <X className="w-3 h-3" />
                        <span>{isEasyMode ? '절대 싫어요' : isMiddleMode ? '완전 제외' : '절대 제외'}</span>
                      </span>
                    ) : isTolerable ? (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{isEasyMode ? '조금 부담' : isMiddleMode ? '감내 가능' : '감내하며 유지'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">
                        {isEasyMode ? '괜찮아요' : '상관없음'}
                      </span>
                    )}
                  </div>

                  <h4 className={`text-sm font-bold leading-snug mb-1.5 ${
                    isExclude
                      ? 'text-rose-950 font-extrabold'
                      : isTolerable
                      ? 'text-amber-950 font-extrabold'
                      : 'text-slate-800'
                  }`}>
                    {displayShortLabel}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {displayLabel}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>관련 학과: {matchedMajorsCount}개</span>
                    {isTolerable && (
                      <span className="text-amber-600 font-bold text-[10px]">
                        {isEasyMode ? '보드에서 ⚠ 부담 표시' : '보드에서 ⚠ 뱃지 표시'}
                      </span>
                    )}
                    {isExclude && (
                      <span className="text-rose-600 font-bold text-[10px]">
                        {isEasyMode ? '보드에서 완전 지움' : '보드에서 완전 소거'}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSetDislikeLevel(tag.id, 'tolerable')}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition flex items-center justify-center space-x-1 border cursor-pointer ${
                        isTolerable
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-700 border-slate-200'
                      }`}
                      title={isEasyMode ? "힘들더라도 참으면서 공부해볼 만하다면 선택" : "부담되지만 목표를 위해 감내할 수 있다면 선택"}
                    >
                      <span>{isEasyMode ? '△ 조금 부담돼요' : isMiddleMode ? '⚠ 감내 가능' : '⚠ 필요시 감내'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetDislikeLevel(tag.id, 'exclude')}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition flex items-center justify-center space-x-1 border cursor-pointer ${
                        isExclude
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border-slate-200'
                      }`}
                      title={isEasyMode ? "정말 너무 싫어서 절대 공부하기 싫다면 목록에서 빼기" : "어떤 경우에도 감내할 수 없다면 학과 목록에서 제외"}
                    >
                      <span>{isEasyMode ? '✕ 절대 싫어요' : isMiddleMode ? '✕ 완전 제외' : '✕ 절대 제외'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 보드로 넘어가기 버튼 */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onNextStep}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-200 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>
              {isEasyMode
                ? `2단계: 남은 ${MAJORS_DATA.length - childData.excludedMajors.length}개 학과 보러 가기`
                : `2단계: 남은 ${MAJORS_DATA.length - childData.excludedMajors.length}개 학과 보드에서 분류하기`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
