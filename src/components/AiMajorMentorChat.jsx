import React, { useState, useEffect } from 'react';
import { MessageSquareText, Send, Sparkles, RefreshCw, Bot, User, HelpCircle } from 'lucide-react';
import { checkAiStatus, fetchAiMentorAnswer } from '../services/aiService';

export const AiMajorMentorChat = ({ activeMajor, tendencyAnalysis, activeProfile, educationTier }) => {
  const [aiStatus, setAiStatus] = useState({ available: false, loading: true });
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 학과가 바뀌면 기본 대화 초기화 및 추천 질문 갱신
  useEffect(() => {
    setMessages([]);
    setQuestion('');
  }, [activeMajor?.id]);

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

  // 학과별 맞춤 추천 질문 목록
  const suggestedQuestions = [
    `고등학교 때 꼭 들어야 하는 핵심 선택과목은 무엇인가요?`,
    `${activeMajor?.name} 졸업 후 가장 선호되는 진로와 기업 분야는 어디인가요?`,
    `문·이과 성향(${tendencyAnalysis.type}) 입장에서 이 학과에 입학했을 때 어려운 점이 있을까요?`,
    `학생부 종합전형(학종) 세특 탐구 보고서로 쓰기 좋은 주제 1가지만 추천해 주세요.`
  ];

  const handleAsk = async (queryText) => {
    const targetQuestion = (queryText || question).trim();
    if (!targetQuestion || isLoading) return;

    const userMessage = { role: 'user', text: targetQuestion };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    const studentProfile = {
      target: activeProfile?.target || '학생',
      mode: activeProfile?.mode || educationTier,
      tendencyLabel: tendencyAnalysis.label
    };

    const majorInfo = {
      name: activeMajor.name,
      category: activeMajor.category,
      track: activeMajor.track,
      keywords: activeMajor.keywords || [],
      careers: activeMajor.careerPaths || [],
      highSchoolSubjects: activeMajor.highSchoolSubjects || {}
    };

    const res = await fetchAiMentorAnswer(targetQuestion, majorInfo, studentProfile);
    setIsLoading(false);

    if (res.success) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: res.answer }
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: `죄송합니다. ${res.error || '답변 생성 중 오류가 발생했습니다.'}` }
      ]);
    }
  };

  if (aiStatus.loading) return null;

  // 오프라인 / 단일 HTML 환경 (Graceful Fallback)
  if (!aiStatus.available) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
          <MessageSquareText className="w-3.5 h-3.5 text-indigo-500" />
          <span>{activeMajor.name} 전공 1:1 질의응답 (Q&A)</span>
        </div>
        <p className="text-xs text-slate-500">
          실시간 AI 진로 멘토 질의응답은 온라인 웹 서비스 환경에서 지원됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center space-x-2">
              <span>{activeMajor.name} AI 진로 멘토에게 물어보기</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                실시간 답변
              </span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              학과 커리큘럼, 고교학점제 과목 선택, 취업 현실 등 무엇이든 물어보세요.
            </p>
          </div>
        </div>
      </div>

      {/* 추천 질문 칩 */}
      {messages.length === 0 && (
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 flex items-center space-x-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>자주 묻는 추천 질문 (클릭 시 즉시 답변)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(q)}
                disabled={isLoading}
                className="text-xs bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-medium px-3 py-1.5 rounded-xl border border-slate-200 transition text-left cursor-pointer disabled:opacity-50"
              >
                💡 {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 대화 내역 (스크롤 영역) */}
      {messages.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-tr-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* AI 응답 대기 로딩 */}
          {isLoading && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              <span>진로 멘토가 답변을 작성 중입니다...</span>
            </div>
          )}
        </div>
      )}

      {/* 질문 입력 폼 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk();
        }}
        className="flex items-center space-x-2 pt-2"
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={`${activeMajor.name}에 대해 궁금한 점을 입력해 주세요...`}
          disabled={isLoading}
          className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none transition"
        />
        <button
          type="submit"
          disabled={!question.trim() || isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition shadow-sm cursor-pointer disabled:cursor-not-allowed shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
