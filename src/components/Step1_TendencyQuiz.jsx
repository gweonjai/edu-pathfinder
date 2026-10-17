import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { TENDENCY_QUESTIONS } from '../data/tendencyData';
import { 
  Sparkles, ArrowRight, RotateCcw, CheckCircle2, 
  Lightbulb, Brain, Scale, Layers
} from 'lucide-react';

export const Step1_TendencyQuiz = ({ onNextStep, onOpenCareerTree, onOpenAdmissionInfo }) => {
  const { childData, updateChildData, activeProfile, isEasyMode, isMiddleMode, isHighMode } = useProfile();
  const [highlightTrack, setHighlightTrack] = React.useState(null); // null | '이과' | '문과' | '융합'
  
  const answers = childData.tendencyAnswers || {};

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
  let tendencyDesc = '6가지 질문에 답해보면 나의 생각 스타일과 문제 해결 방식을 알 수 있어요.';
  let mainTrack = '융합';

  if (totalAnswered > 0) {
    if (mathCount >= 3 && mathCount > liberalCount) {
      tendencySummary = isEasyMode ? '🔍 원리를 탐구하는 이과 스타일' : '자연·공학 탐구형 성향 (이과 우세)';
      tendencyDesc = isEasyMode 
        ? '원인과 결과를 따져보고, 퀴즈나 퍼즐처럼 딱 들어맞는 정답을 찾을 때 가장 신나는 친구예요!'
        : '논리적 인과관계와 수학·과학적 작동 원리를 규명하는 이공계 학문에서 높은 성취를 보입니다.';
      mainTrack = '이과';
    } else if (liberalCount >= 3 && liberalCount > mathCount) {
      tendencySummary = isEasyMode ? '💬 사람과 소통하는 문과 스타일' : '인문·사회 소통형 성향 (문과 우세)';
      tendencyDesc = isEasyMode 
        ? '사람들의 마음을 잘 헤아리고, 재미있는 이야기나 글로 내 생각을 멋지게 표현하는 친구예요!'
        : '인간과 사회의 상호작용, 언어적 표현과 설득, 사회적 가치를 탐구하는 인문사회 계열에 적합합니다.';
      mainTrack = '문과';
    } else if (fusionCount >= 3 || Math.abs(mathCount - liberalCount) <= 1) {
      tendencySummary = isEasyMode ? '🌟 균형 잡힌 다재다능 융합 스타일' : '균형 잡힌 융합·실용형 성향';
      tendencyDesc = isEasyMode 
        ? '논리도 탄탄하고 친구들 마음도 잘 살펴서, 실제 생활에서 가장 똑똑한 해결책을 찾아내는 친구예요!'
        : '이과적 분석력과 문과적 공감력을 고루 갖추어 데이터사이언스, 경영공학 등 융합 분야에서 강점을 발휘합니다.';
      mainTrack = '융합';
    } else if (mathCount > liberalCount) {
      tendencySummary = '이과 성향에 조금 더 가까워요';
      tendencyDesc = '원리 규명과 규칙적인 분석 활동에 호감을 느끼는 경향이 있습니다.';
      mainTrack = '이과';
    } else {
      tendencySummary = '문과 성향에 조금 더 가까워요';
      tendencyDesc = '이야기 전달과 사람 간의 교감 활동에 호감을 느끼는 경향이 있습니다.';
      mainTrack = '문과';
    }
  }

  const handleResetAnswers = () => {
    if (confirm('성향 진단 답변을 모두 초기화하시겠습니까?')) {
      updateChildData({ tendencyAnswers: {} });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 상단 안내 배너 */}
      <div className="bg-gradient-to-r from-slate-100 via-indigo-50/50 to-slate-100 border border-slate-200/90 rounded-2xl p-6 text-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100/90 text-indigo-800 border border-indigo-200">
                <Brain className="w-3.5 h-3.5 text-indigo-600" />
                <span>1단계: 나의 생각 스타일 알아보기</span>
              </div>
              {isEasyMode ? (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span>🌱 초등 5~6학년 눈높이</span>
                </div>
              ) : isMiddleMode ? (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                  <span>💡 중학 실생활 연계</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300">
                  <span>🎓 고교 학업 성향 분석</span>
                </div>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              {isEasyMode
                ? `${activeProfile?.name || '친구'}의 생각 스타일과 문제 풀 때 습관을 알아봐요!`
                : `${activeProfile?.name || '본인'} 님의 생각 스타일 & 문제 해결 성향을 진단합니다.`}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {isEasyMode
                ? '정답은 없어요! 평소 내 모습과 더 가깝고 편한 방식을 골라보세요. 6문항을 마치면 2단계에서 좋아하는 공부 과목을 직접 선택할 수 있어요.'
                : '일상과 학업에서 문제를 해결할 때 가장 자연스러운 방식을 선택해 보세요. 문/이과/융합 지표를 도출하여 다음 단계 추천에 반영됩니다.'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleResetAnswers}
              className="text-xs bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-xl transition flex items-center space-x-1 border border-slate-200 shadow-2xs font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>진단 초기화</span>
            </button>
            <button
              onClick={onNextStep}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center space-x-1 cursor-pointer"
            >
              <span>2단계 선호 과목 선택</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>


      {/* 진단 종합 결과 카드 (응답 진행 시 실시간 표시) */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/50 rounded-2xl p-5 border border-indigo-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                  성향 진단 결과 ({totalAnswered}/6 응답)
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {totalAnswered === 6 ? '✅ 완료' : '진행 중'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {tendencySummary}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {tendencyDesc}
              </p>
            </div>
          </div>

          {/* 성향 분포 게이지 & 성향별 문항 하이라이트 필터 */}
          <div className="bg-white/90 p-3.5 rounded-xl border border-indigo-100 shadow-2xs min-w-[240px] shrink-0">
            <div className="text-[11px] font-bold text-slate-600 mb-2 flex justify-between items-center">
              <span className="flex items-center space-x-1">
                <span>응답 비율</span>
                <span className="text-[10px] text-slate-400 font-normal">(클릭 시 문항 강조)</span>
              </span>
              <span className="text-indigo-600 font-extrabold">{totalAnswered > 0 ? `${Math.round((totalAnswered / 6) * 100)}%` : '0%'}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <button
                type="button"
                onClick={() => setHighlightTrack((prev) => (prev === '이과' ? null : '이과'))}
                className={`p-2 rounded-xl border transition-all cursor-pointer text-center relative ${
                  highlightTrack === '이과'
                    ? 'bg-sky-100 border-sky-400 ring-2 ring-sky-400 shadow-xs scale-[1.03]'
                    : 'bg-sky-50/80 hover:bg-sky-100/70 border-sky-200 hover:border-sky-300'
                }`}
                title="클릭하여 아래 문제 중 이과 탐구 문항 하이라이트"
              >
                <div className="text-[10px] text-sky-700 font-bold flex items-center justify-center space-x-0.5">
                  <span>이과 탐구</span>
                  {highlightTrack === '이과' && <span className="text-[9px]">✨</span>}
                </div>
                <div className="text-sm font-black text-sky-900 mt-0.5">{mathCount}표</div>
                {highlightTrack === '이과' && (
                  <span className="block text-[8px] font-extrabold text-sky-700 bg-sky-200/80 rounded px-1 mt-0.5">
                    강조 중
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setHighlightTrack((prev) => (prev === '문과' ? null : '문과'))}
                className={`p-2 rounded-xl border transition-all cursor-pointer text-center relative ${
                  highlightTrack === '문과'
                    ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-400 shadow-xs scale-[1.03]'
                    : 'bg-rose-50/80 hover:bg-rose-100/70 border-rose-200 hover:border-rose-300'
                }`}
                title="클릭하여 아래 문제 중 문과 소통 문항 하이라이트"
              >
                <div className="text-[10px] text-rose-700 font-bold flex items-center justify-center space-x-0.5">
                  <span>문과 소통</span>
                  {highlightTrack === '문과' && <span className="text-[9px]">✨</span>}
                </div>
                <div className="text-sm font-black text-rose-900 mt-0.5">{liberalCount}표</div>
                {highlightTrack === '문과' && (
                  <span className="block text-[8px] font-extrabold text-rose-700 bg-rose-200/80 rounded px-1 mt-0.5">
                    강조 중
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setHighlightTrack((prev) => (prev === '융합' ? null : '융합'))}
                className={`p-2 rounded-xl border transition-all cursor-pointer text-center relative ${
                  highlightTrack === '융합'
                    ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-400 shadow-xs scale-[1.03]'
                    : 'bg-emerald-50/80 hover:bg-emerald-100/70 border-emerald-200 hover:border-emerald-300'
                }`}
                title="클릭하여 아래 문제 중 융합 실용 문항 하이라이트"
              >
                <div className="text-[10px] text-emerald-700 font-bold flex items-center justify-center space-x-0.5">
                  <span>융합 실용</span>
                  {highlightTrack === '융합' && <span className="text-[9px]">✨</span>}
                </div>
                <div className="text-sm font-black text-emerald-900 mt-0.5">{fusionCount}표</div>
                {highlightTrack === '융합' && (
                  <span className="block text-[8px] font-extrabold text-emerald-700 bg-emerald-200/80 rounded px-1 mt-0.5">
                    강조 중
                  </span>
                )}
              </button>
            </div>
            {highlightTrack ? (
              <div className="text-[10px] text-center font-bold mt-2 py-1 px-2.5 rounded-lg border flex flex-col sm:flex-row items-center justify-center gap-1 transition-all">
                {(() => {
                  const matchedQNumbers = TENDENCY_QUESTIONS
                    .map((q, idx) => (answers[q.id] === highlightTrack ? `Q${idx + 1}` : null))
                    .filter(Boolean);
                  const trackName = highlightTrack === '이과' ? '이과 탐구' : highlightTrack === '문과' ? '문과 소통' : '융합 실용';
                  const trackColorClass = highlightTrack === '이과'
                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                    : highlightTrack === '문과'
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200';

                  return (
                    <div className={`w-full py-1 px-2 rounded-lg border ${trackColorClass} flex items-center justify-between`}>
                      <span>
                        🔍 <strong>[{trackName}]</strong> 선택 문항: {matchedQNumbers.length > 0 ? (
                          <span className="font-extrabold underline ml-1">{matchedQNumbers.join(', ')}</span>
                        ) : (
                          <span className="font-normal ml-1">선택 내역 없음 (0표)</span>
                        )}
                      </span>
                      <span className="text-[9px] text-slate-400 font-normal shrink-0 ml-1.5">(클릭 시 해제)</span>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="text-[9px] text-center text-slate-400 mt-1.5 font-medium">
                👆 카드를 누르면 내가 해당 성향을 선택한 문항(Q1~Q6)의 테두리가 강조됩니다
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6문항 카드 그리드 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">Q</span>
              <span>{isEasyMode ? '나의 생각 스타일 진단 6문항' : '문제 해결 성향 심층 문항 (6문항)'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEasyMode
                ? '어려운 시험이 아니에요! 각 상황에서 나라면 어떻게 행동할지 가장 끌리는 보기를 콕 집어보세요.'
                : '각 상황에서 가장 먼저 떠오르고 편안한 선택지를 솔직하게 선택해 주세요.'}
            </p>
          </div>
          <div className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {totalAnswered === 6 ? '모든 문항 답변 완료!' : `${6 - totalAnswered}개 문항 남음`}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TENDENCY_QUESTIONS.map((q, idx) => {
            const userAnswerTrack = answers[q.id];
            const isQuestionMatched = highlightTrack && userAnswerTrack === highlightTrack;
            const isQuestionDimmed = highlightTrack && userAnswerTrack && userAnswerTrack !== highlightTrack;

            // 성향 선택 시 해당 문항 전체 외곽 테두리 하이라이트 스타일
            let cardStyle = 'bg-slate-50/70 border-slate-200 hover:border-slate-300';
            let cardTrackBadge = null;

            if (isQuestionMatched) {
              if (highlightTrack === '이과') {
                cardStyle = 'bg-sky-50/80 border-sky-500 ring-2 ring-sky-400 shadow-md scale-[1.01]';
                cardTrackBadge = (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300 flex items-center space-x-1">
                    <span>🔬 내 선택: 이과 탐구</span>
                  </span>
                );
              } else if (highlightTrack === '문과') {
                cardStyle = 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-400 shadow-md scale-[1.01]';
                cardTrackBadge = (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center space-x-1">
                    <span>💬 내 선택: 문과 소통</span>
                  </span>
                );
              } else if (highlightTrack === '융합') {
                cardStyle = 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-400 shadow-md scale-[1.01]';
                cardTrackBadge = (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1">
                    <span>🌟 내 선택: 융합 실용</span>
                  </span>
                );
              }
            } else if (isQuestionDimmed) {
              cardStyle = 'bg-slate-50/40 border-slate-200 opacity-55 hover:opacity-100 transition-opacity';
            }

            return (
              <div 
                key={q.id} 
                className={`p-4 rounded-xl border flex flex-col justify-start transition-all duration-200 ${cardStyle}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1.5">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                        isQuestionMatched
                          ? highlightTrack === '이과' ? 'bg-sky-600 text-white border-sky-600 font-black'
                          : highlightTrack === '문과' ? 'bg-rose-600 text-white border-rose-600 font-black'
                          : 'bg-emerald-600 text-white border-emerald-600 font-black'
                          : 'text-indigo-700 bg-indigo-50 border-indigo-100'
                      }`}>
                        Q{idx + 1}
                      </span>
                      {q.category && (
                        <span className="text-[10px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                          {q.category}
                        </span>
                      )}
                    </div>
                    {cardTrackBadge}
                  </div>
                  <div className="text-xs font-bold text-slate-900 min-h-[36px] flex items-start leading-snug">
                    {isEasyMode && q.easyQuestion ? q.easyQuestion : q.question}
                  </div>
                </div>

                <div className="space-y-2 mt-3">
                  {q.options.map((opt, oIdx) => {
                    const isChosen = answers[q.id] === opt.track;
                    const isChosenThisTrack = isChosen && isQuestionMatched && opt.track === highlightTrack;
                    const optionLabel = isEasyMode && opt.easyText ? opt.easyText : opt.text;

                    // 보기(답변) 스타일: 내가 이과를 선택한 문제라면 그 선택된 보기를 선명하게 테두리와 함께 강조
                    let optionStyle = 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200';
                    if (isChosen) {
                      if (isChosenThisTrack) {
                        optionStyle = highlightTrack === '이과'
                          ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-sm ring-2 ring-sky-300'
                          : highlightTrack === '문과'
                          ? 'bg-rose-600 text-white border-rose-600 font-bold shadow-sm ring-2 ring-rose-300'
                          : 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm ring-2 ring-emerald-300';
                      } else {
                        optionStyle = 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-2xs';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleAnswerQuestion(q.id, opt)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs leading-relaxed transition-all border cursor-pointer flex items-start justify-between ${optionStyle}`}
                      >
                        <span className="flex-1">{optionLabel}</span>
                        {isChosenThisTrack && (
                          <span className="shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded bg-white/20 text-white ml-1.5 inline-flex items-center">
                            ✓ 내 답변
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 이동 안내 */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            {totalAnswered === 6
              ? '🎉 6개 문항을 모두 완료했습니다! 이제 2단계에서 선호하는 공부 과목과 활동을 선택해 보세요.'
              : '문항에 답을 하지 않아도 2단계로 이동할 수 있지만, 6문항을 모두 채우면 훨씬 정교한 추천을 받을 수 있어요.'}
          </p>
          <button
            onClick={onNextStep}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>2단계: 선호 과목·분야 선택하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
