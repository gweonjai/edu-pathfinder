import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, AlertCircle, Bot, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { checkAiStatus, fetchAiDeepReport } from '../services/aiService';

export const AiConsultantReport = ({ activeMajor, tendencyAnalysis, childData, activeProfile, educationTier }) => {
  const [aiStatus, setAiStatus] = useState({ available: false, loading: true });
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // 학과가 바뀌면 기존 보고서 초기화 (새 학과에 대한 진단 유도)
  useEffect(() => {
    setReport(null);
    setError(null);
  }, [activeMajor?.id]);

  // 마운트 시 AI 가능 여부 체크
  useEffect(() => {
    let isMounted = true;
    checkAiStatus().then((status) => {
      if (isMounted) {
        setAiStatus({ ...status, loading: false });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleGenerateReport = async () => {
    if (!activeMajor) return;
    setIsLoading(true);
    setError(null);

    const studentProfile = {
      target: activeProfile?.target || '학생',
      mode: activeProfile?.mode || educationTier,
      tendencyType: tendencyAnalysis.type,
      tendencyLabel: tendencyAnalysis.label,
      mathCount: tendencyAnalysis.mathCount,
      liberalCount: tendencyAnalysis.liberalCount,
      fusionCount: tendencyAnalysis.fusionCount,
      bookmarkedMajors: childData.bookmarkedMajors || [],
      pendingMajors: childData.pendingMajors || [],
      excludedCount: (childData.excludedMajors || []).length
    };

    const majorInfo = {
      name: activeMajor.name,
      category: activeMajor.category,
      track: activeMajor.track,
      keywords: activeMajor.keywords || [],
      colleges: activeMajor.colleges || [],
      highSchoolSubjects: activeMajor.highSchoolSubjects || {},
      careers: activeMajor.careerPaths || [],
      salaryInfo: {
        avgSalary: activeMajor.corporateTarget?.avgSalary,
        topCompany: activeMajor.corporateTarget?.topCompanies?.[0]
      }
    };

    const res = await fetchAiDeepReport(studentProfile, majorInfo);
    setIsLoading(false);

    if (res.success) {
      setReport(res.report);
      setIsExpanded(true);
    } else {
      setError(res.error || '리포트 생성 중 오류가 발생했습니다.');
    }
  };

  if (aiStatus.loading) {
    return null;
  }

  // 1. 단일 HTML 배포 또는 AI 미설정 환경 (Graceful Fallback 뱃지)
  if (!aiStatus.available) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center space-x-2">
          <Bot className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>
            현재 환경은 <strong>기본 정적 분석 모드</strong>입니다. (로컬 개발 서버 <code>npm run dev</code> 실행 시 Gemini LLM 실시간 입시 총평 연동)
          </span>
        </div>
        <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full shrink-0">
          ✨ Google Gemini 2.0 Flash 연동 준비 완료
        </span>
      </div>
    );
  }

  // 2. Vercel / 로컬 AI 활성화 환경
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-indigo-500/20 relative overflow-hidden">
      {/* 배경 장식 광선 */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-700/40 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>AI 입시 수석 컨설턴트 1:1 정밀 진단</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center space-x-2">
            <span>{activeMajor.name} 맞춤형 심층 입시 총평</span>
          </h3>
          <p className="text-xs text-slate-300">
            학생의 1~3단계 진단 기록과 2022 개정 고교학점제·2028 대입 개편안을 결합하여 생성합니다.
          </p>
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center space-x-2 shrink-0">
          {!report ? (
            <button
              onClick={handleGenerateReport}
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/30 transition flex items-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI 분석문 작성 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>✨ AI 심층 총평 분석받기</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleGenerateReport}
                disabled={isLoading}
                title="새로 분석하기"
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 transition flex items-center space-x-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>재분석</span>
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-xl border border-slate-700 transition cursor-pointer"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 에러 상태 */}
      {error && (
        <div className="mt-4 p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* 로딩 상태 스켈레톤 */}
      {isLoading && (
        <div className="mt-5 space-y-3 animate-pulse">
          <div className="h-4 bg-indigo-700/30 rounded-md w-3/4" />
          <div className="h-4 bg-indigo-700/30 rounded-md w-full" />
          <div className="h-4 bg-indigo-700/30 rounded-md w-5/6" />
          <div className="h-4 bg-indigo-700/30 rounded-md w-2/3" />
        </div>
      )}

      {/* 분석 결과 본문 */}
      {report && isExpanded && !isLoading && (
        <div className="mt-5 pt-2 text-slate-200 text-xs sm:text-sm leading-relaxed space-y-4 animate-in fade-in duration-300">
          <div className="bg-slate-950/60 rounded-2xl p-5 border border-indigo-500/20 backdrop-blur-sm whitespace-pre-line font-normal">
            {report}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Gemini AI 엔진 기반 맞춤 생성 완료</span>
            </span>
            <span>최신 2028 개편안 기준 정밀 분석</span>
          </div>
        </div>
      )}

      {/* 미생성 시 가이드 안내 문구 */}
      {!report && !isLoading && (
        <div className="mt-4 text-xs text-slate-400 flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>버튼을 누르면 학생의 생각 스타일({tendencyAnalysis.label})에 맞춘 <strong>{activeMajor.name} 전공의 1:1 맞춤 컨설팅 총평</strong>을 실시간 생성합니다.</span>
        </div>
      )}
    </div>
  );
};
