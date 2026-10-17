import React, { useState, useMemo } from 'react';
import { 
  BookOpen, HelpCircle, Calendar, GraduationCap, Sparkles, 
  Search, ChevronRight, CheckCircle2, AlertCircle, Clock, ExternalLink 
} from 'lucide-react';
import { ADMISSION_CATEGORIES, ADMISSION_ARTICLES } from '../data/admissionGuideData';

export const AdmissionInfoModal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticleId, setSelectedArticleId] = useState(ADMISSION_ARTICLES[0]?.id);
  const [searchQuery, setSearchQuery] = useState('');

  // 필터링된 아티클 목록
  const filteredArticles = useMemo(() => {
    return ADMISSION_ARTICLES.filter(art => {
      if (selectedCategory !== 'all' && art.categoryId !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          art.title.toLowerCase().includes(query) ||
          art.summary.toLowerCase().includes(query) ||
          art.keyPoints.some(k => k.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // 현재 선택된 아티클
  const currentArticle = useMemo(() => {
    return ADMISSION_ARTICLES.find(a => a.id === selectedArticleId) || filteredArticles[0] || ADMISSION_ARTICLES[0];
  }, [selectedArticleId, filteredArticles]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-7xl w-full max-h-[94vh] lg:h-[92vh] flex flex-col p-4 sm:p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 상단 헤더 */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                  대입 & 고교 입시 정보 가이드
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  2028 대입 개편안 반영
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                생기부·세특 핵심 개념부터 고1 학사일정별 진로 조사 시기까지, 학부모와 학생이 꼭 알아야 할 입시 가이드입니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-black transition cursor-pointer"
            title="창 닫기 (ESC)"
          >
            ✕
          </button>
        </div>

        {/* 카테고리 탭 & 검색창 */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-slate-100 rounded-2xl">
            {ADMISSION_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="입시 주제, 용어 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* 본문 2컬럼 레이아웃 */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 pt-4 overflow-hidden min-h-0">
          {/* 좌측 아티클 리스트 */}
          <div className="lg:col-span-4 flex flex-col overflow-y-auto pr-1 space-y-2 border-r border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              안내 주제 ({filteredArticles.length}개)
            </div>
            {filteredArticles.map(art => {
              const isSelected = currentArticle?.id === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {art.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {art.summary}
                  </p>
                </div>
              );
            })}
            {filteredArticles.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                검색된 입시 정보가 없습니다.
              </div>
            )}
          </div>

          {/* 우측 아티클 상세 내용 */}
          <div className="lg:col-span-8 flex flex-col overflow-y-auto pl-0 lg:pl-3 space-y-5">
            {currentArticle ? (
              <>
                {/* 아티클 제목 & 요약 배너 */}
                <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 rounded-3xl shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500 text-white">
                      {currentArticle.badge}
                    </span>
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      읽는 시간 {currentArticle.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug">
                    {currentArticle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentArticle.summary}
                  </p>
                </div>

                {/* 핵심 포인트 요약 카드 */}
                {currentArticle.keyPoints && (
                  <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-3xl">
                    <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span>핵심 3줄 요약</span>
                    </div>
                    <ul className="space-y-1.5">
                      {currentArticle.keyPoints.map((point, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 타임라인 형식 아티클인 경우 (고1 학사일정) */}
                {currentArticle.timelineData && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>시기별 학교 요청 및 대응 로드맵</span>
                    </h4>
                    <div className="relative pl-6 space-y-4 border-l-2 border-emerald-200 ml-2">
                      {currentArticle.timelineData.map((item, idx) => (
                        <div key={idx} className="relative">
                          {/* 동그라미 노드 */}
                          <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-2xs">
                            <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                                {item.period}
                              </span>
                              <span className="text-[11px] font-bold text-slate-400">
                                {item.party}
                              </span>
                            </div>
                            <h5 className="text-sm font-bold text-slate-800 mb-1">
                              {item.stage}: {item.what}
                            </h5>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {item.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 일반 섹션 내용 */}
                {currentArticle.contentSections && (
                  <div className="space-y-4">
                    {currentArticle.contentSections.map((sec, idx) => (
                      <div key={idx} className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-2xs">
                        <h4 className="text-sm sm:text-base font-bold text-slate-800 mb-2">
                          {sec.heading}
                        </h4>
                        {sec.body && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                            {sec.body}
                          </p>
                        )}
                        {sec.highlightBox && (
                          <div className="mt-3 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl">
                            <div className="text-xs font-bold text-indigo-800 mb-1">
                              {sec.highlightBox.title}
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-slate-800">
                              {sec.highlightBox.formula}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
