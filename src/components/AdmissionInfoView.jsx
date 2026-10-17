import React, { useState, useMemo } from 'react';
import { 
  BookOpen, HelpCircle, Calendar, GraduationCap, Sparkles, 
  Search, ChevronRight, CheckCircle2, Clock 
} from 'lucide-react';
import { ADMISSION_CATEGORIES, ADMISSION_ARTICLES } from '../data/admissionGuideData';

export const AdmissionInfoView = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticleId, setSelectedArticleId] = useState(ADMISSION_ARTICLES[0]?.id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return ADMISSION_ARTICLES.filter(art => {
      if (selectedCategory !== 'all' && art.categoryId !== selectedCategory) return false;
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

  const currentArticle = useMemo(() => {
    return ADMISSION_ARTICLES.find(a => a.id === selectedArticleId) || filteredArticles[0] || ADMISSION_ARTICLES[0];
  }, [selectedArticleId, filteredArticles]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 뷰 상단 배너 */}
      <div className="bg-gradient-to-r from-slate-100 via-indigo-50/50 to-slate-100 border border-slate-200/90 text-slate-800 p-6 rounded-3xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              2028 대입 & 고교학점제 필독
            </span>
            <span className="text-xs text-slate-500">
              학부모 & 학생 입시 가이드
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            대입 & 고교 입시 정보 가이드
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            ‘생기부’와 ‘세특’의 차이부터 고1 입학 후 학교에서 진행되는 시기별 진로 조사 일정까지, 대입 준비에 꼭 필요한 필수 정보를 안내합니다.
          </p>
        </div>

        {/* 검색창 */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="입시 주제, 용어 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-400/40 transition"
          />
        </div>
      </div>

      {/* 카테고리 탭 바 */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xs">
        {ADMISSION_CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 2컬럼 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 좌측 아티클 리스트 */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            입시 가이드 목록 ({filteredArticles.length}편)
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredArticles.map(art => {
              const isSelected = currentArticle?.id === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                      : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
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
          </div>
        </div>

        {/* 우측 아티클 상세 내용 */}
        <div className="lg:col-span-8 space-y-5">
          {currentArticle && (
            <>
              {/* 상단 타이틀 카드 */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {currentArticle.badge}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    읽는 시간 약 {currentArticle.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 leading-snug">
                  {currentArticle.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentArticle.summary}
                </p>
              </div>

              {/* 핵심 요약 3줄 */}
              {currentArticle.keyPoints && (
                <div className="bg-blue-50/70 border border-blue-200/80 p-5 rounded-3xl shadow-xs">
                  <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>핵심 포인트 요약</span>
                  </div>
                  <ul className="space-y-2">
                    {currentArticle.keyPoints.map((point, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 고1 학사일정 타임라인 */}
              {currentArticle.timelineData && (
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-4">
                  <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <span>시기별 학교 요청 및 학생/학부모 대응 로드맵</span>
                  </h4>
                  <div className="relative pl-6 space-y-5 border-l-2 border-emerald-200 ml-2 pt-2">
                    {currentArticle.timelineData.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                              {item.period}
                            </span>
                            <span className="text-xs font-bold text-slate-500">
                              {item.party}
                            </span>
                          </div>
                          <h5 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
                            {item.stage}: {item.what}
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 일반 본문 섹션 */}
              {currentArticle.contentSections && (
                <div className="space-y-4">
                  {currentArticle.contentSections.map((sec, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
                      <h4 className="text-base font-bold text-slate-800 mb-2">
                        {sec.heading}
                      </h4>
                      {sec.body && (
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                          {sec.body}
                        </p>
                      )}
                      {sec.highlightBox && (
                        <div className="mt-3 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl">
                          <div className="text-xs font-bold text-indigo-800 mb-1">
                            {sec.highlightBox.title}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-slate-800">
                            {sec.highlightBox.formula}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
