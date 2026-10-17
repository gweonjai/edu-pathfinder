import React, { useState, useMemo } from 'react';
import { useProfile } from '../context/ProfileContext';
import { MAJORS_DATA } from '../data/departmentsData';
import { 
  GitFork, Compass, Sparkles, BookOpen, ChevronRight, CheckCircle2, 
  Star, ArrowRight, Lightbulb, Search, Filter, Layers, Brain, Award, Info
} from 'lucide-react';

// 상향식(Bottom-Up) 키워드 풀
const BOTTOM_UP_INTERESTS = [
  { id: 'math_logic', label: '수학 문제 풀기 & 논리 퍼즐', icon: '🔢', tracks: ['이과'], weights: { '수학심화': 3, '논리적사고': 3, '계량분석': 2 } },
  { id: 'coding_tech', label: '컴퓨터·코딩·게임·디지털 기기', icon: '💻', tracks: ['이과', '융합'], weights: { '코딩/SW': 3, '전문개발': 3, '반도체/하드웨어': 2 } },
  { id: 'experiment_nature', label: '과학 실험·동식물 관찰·인체 원리', icon: '🧪', tracks: ['이과'], weights: { '실험실습': 3, '생명과학': 3, '임상/환자': 2 } },
  { id: 'robot_making', label: '기계 만지기·로봇 조립·물리 법칙', icon: '🤖', tracks: ['이과'], weights: { '물리/역학': 3, '현장실습': 2, 'CAD/설계': 2 } },
  { id: 'society_debate', label: '사회 뉴스·시사 토론·정의와 법', icon: '⚖️', tracks: ['문과'], weights: { '시사/토론': 3, '글쓰기/논술': 2, '법률/공공': 3 } },
  { id: 'economy_business', label: '돈의 흐름·주식/경제 뉴스·마케팅', icon: '📈', tracks: ['문과', '융합'], weights: { '데이터/통계': 2, '비즈니스': 3, '재무/금융': 3 } },
  { id: 'people_psychology', label: '사람 마음 관찰·고민 상담·인간관계', icon: '🤝', tracks: ['문과', '융합'], weights: { '대인커뮤니케이션': 3, '심리/상담': 3, '조직관리': 2 } },
  { id: 'language_reading', label: '소설/책 읽기·외국어 배우기·글쓰기', icon: '📚', tracks: ['문과'], weights: { '외국어': 3, '인문학': 3, '글쓰기/논술': 3 } },
  { id: 'media_contents', label: '유튜브·영상/디자인·문화 콘텐츠', icon: '🎬', tracks: ['문과', '융합'], weights: { '창작/디자인': 3, '영상/미디어': 3, '마케팅': 2 } },
  { id: 'health_medical', label: '질병 치료·약품·타인을 돌보는 일', icon: '🩺', tracks: ['이과'], weights: { '임상/환자': 3, '생명과학': 2, '전문자격': 3 } }
];

export const CareerTreeBrowserModal = ({ isOpen, onClose, onSelectMajor }) => {
  const { childData, updateChildData } = useProfile();
  const [activeTab, setActiveTab] = useState('topDown'); // 'topDown' | 'bottomUp'
  const [searchKeyword, setSearchKeyword] = useState('');

  // Top-Down 상태
  const [selectedCategory, setSelectedCategory] = useState('공학계열');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedMajorId, setSelectedMajorId] = useState(null);

  // Bottom-Up 상태
  const [selectedInterestIds, setSelectedInterestIds] = useState(['math_logic', 'coding_tech']);

  // 대계열 목록 추출
  const categories = useMemo(() => {
    const list = Array.from(new Set(MAJORS_DATA.map(m => m.category)));
    return list;
  }, []);

  // 선택된 대계열 하위의 중분류 목록
  const subCategories = useMemo(() => {
    if (!selectedCategory) return [];
    const majorsInCat = MAJORS_DATA.filter(m => m.category === selectedCategory);
    return Array.from(new Set(majorsInCat.map(m => m.subCategory).filter(Boolean)));
  }, [selectedCategory]);

  // 대계열 변경 시 중분류 초기화
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const majorsInCat = MAJORS_DATA.filter(m => m.category === cat);
    const firstSub = majorsInCat[0]?.subCategory || null;
    setSelectedSubCategory(firstSub);
    const firstMajor = majorsInCat.find(m => !firstSub || m.subCategory === firstSub) || majorsInCat[0];
    setSelectedMajorId(firstMajor?.id || null);
  };

  // 중분류 선택
  const handleSubCategorySelect = (sub) => {
    setSelectedSubCategory(sub);
    const firstMajor = MAJORS_DATA.find(m => m.category === selectedCategory && m.subCategory === sub);
    if (firstMajor) setSelectedMajorId(firstMajor.id);
  };

  // Top-Down 필터링된 학과 목록
  const filteredTopDownMajors = useMemo(() => {
    return MAJORS_DATA.filter(m => {
      if (m.category !== selectedCategory) return false;
      if (selectedSubCategory && m.subCategory !== selectedSubCategory) return false;
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase();
        return m.name.toLowerCase().includes(kw) || 
               m.tags.some(t => t.toLowerCase().includes(kw)) ||
               m.summary.toLowerCase().includes(kw);
      }
      return true;
    });
  }, [selectedCategory, selectedSubCategory, searchKeyword]);

  // 현재 상세 보기 중인 학과
  const currentMajor = useMemo(() => {
    if (!selectedMajorId) return filteredTopDownMajors[0] || MAJORS_DATA[0];
    return MAJORS_DATA.find(m => m.id === selectedMajorId) || filteredTopDownMajors[0] || MAJORS_DATA[0];
  }, [selectedMajorId, filteredTopDownMajors]);

  // Bottom-Up: 선택한 흥미 기반 학과 매칭 및 역도출 분석
  const bottomUpAnalysis = useMemo(() => {
    if (selectedInterestIds.length === 0) {
      return { rankedMajors: [], trackRatio: { 이과: 50, 문과: 50 }, dominantCategory: '탐색 대기' };
    }

    const selectedInterests = BOTTOM_UP_INTERESTS.filter(i => selectedInterestIds.includes(i.id));

    // 각 학과별 점수 계산
    const scores = MAJORS_DATA.map(major => {
      let score = 0;
      selectedInterests.forEach(interest => {
        // 태그 가중치 매칭
        Object.entries(interest.weights).forEach(([tagKey, weight]) => {
          if (major.tags.some(t => t.includes(tagKey) || tagKey.includes(t))) {
            score += weight * 2;
          }
        });
        // 트랙 매칭 (문/이과)
        if (interest.tracks.includes(major.track)) {
          score += 1;
        }
      });
      return { major, score };
    });

    scores.sort((a, b) => b.score - a.score);
    const rankedMajors = scores.slice(0, 8).map(s => s.major);

    // 상위 학과들의 트랙 및 계열 비율 계산
    let naturalCount = 0;
    let socialCount = 0;
    const catCounts = {};

    rankedMajors.forEach(m => {
      if (m.track === '이과') naturalCount++;
      else if (m.track === '문과') socialCount++;
      else { naturalCount += 0.5; socialCount += 0.5; }

      catCounts[m.category] = (catCounts[m.category] || 0) + 1;
    });

    const total = (naturalCount + socialCount) || 1;
    const naturalRatio = Math.round((naturalCount / total) * 100);
    const socialRatio = 100 - naturalRatio;

    // 가장 빈도 높은 카테고리
    const dominantCategory = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '공학계열';

    return {
      rankedMajors,
      trackRatio: { natural: naturalRatio, social: socialRatio },
      dominantCategory
    };
  }, [selectedInterestIds]);

  // 북마크 토글
  const isBookmarked = childData.bookmarkedMajors?.includes(currentMajor?.id);
  const handleToggleBookmark = (majorId) => {
    if (!majorId) return;
    let nextList;
    if (childData.bookmarkedMajors.includes(majorId)) {
      nextList = childData.bookmarkedMajors.filter(id => id !== majorId);
    } else {
      nextList = [...childData.bookmarkedMajors, majorId];
    }
    updateChildData({
      bookmarkedMajors: nextList,
      excludedMajors: childData.excludedMajors.filter(id => id !== majorId)
    });
  };

  const handleSelectInterest = (id) => {
    if (selectedInterestIds.includes(id)) {
      if (selectedInterestIds.length > 1) {
        setSelectedInterestIds(selectedInterestIds.filter(item => item !== id));
      }
    } else {
      if (selectedInterestIds.length < 5) {
        setSelectedInterestIds([...selectedInterestIds, id]);
      }
    }
  };

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
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                  진로 카테고리 트리 탐색기
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  중3~고1 맞춤
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                문·이과 성향이 아직 모호할 때, 하향식(대계열 ➔ 학과) 또는 상향식(내 흥미 ➔ 계열 역도출)으로 나만의 길을 찾아보세요.
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

        {/* 탭 네비게이션 & 검색바 */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setActiveTab('topDown')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'topDown'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <GitFork className="w-4 h-4 text-emerald-600 rotate-180" />
              <span>하향식: 대계열부터 좁히기 (Top-Down)</span>
            </button>
            <button
              onClick={() => setActiveTab('bottomUp')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'bottomUp'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>상향식: 내 흥미에서 역도출 (Bottom-Up)</span>
            </button>
          </div>

          {activeTab === 'topDown' && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="학과명, 키워드 검색..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>
          )}
        </div>

        {/* 탭 1: 하향식 (Top-Down) 뷰 */}
        {activeTab === 'topDown' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 pt-4 overflow-hidden min-h-0">
            {/* 좌측: 3단계 트리 내비게이터 (대계열 ➔ 중분류 ➔ 학과 리스트) */}
            <div className="lg:col-span-5 flex flex-col gap-3 overflow-hidden border-r border-slate-100 pr-0 lg:pr-3">
              {/* 1단계: 6대 대계열 선택 */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">1</span>
                  대계열 선택
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {categories.map(cat => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`px-2.5 py-2 rounded-xl text-xs font-bold text-left transition border cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/80'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2단계: 중분류 필터링 */}
              {subCategories.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">2</span>
                    중분류 계열
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {subCategories.map(sub => {
                      const isSelected = selectedSubCategory === sub;
                      return (
                        <button
                          key={sub}
                          onClick={() => handleSubCategorySelect(sub)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition border cursor-pointer ${
                            isSelected
                              ? 'bg-slate-800 text-white border-slate-800'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3단계: 세부 학과 리스트 */}
              <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">3</span>
                    세부 학과 ({filteredTopDownMajors.length}개)
                  </label>
                  <span className="text-[11px] text-slate-400">클릭하여 우측 상세 보기</span>
                </div>
                <div className="flex-1 overflow-y-auto pr-1 space-y-1.5">
                  {filteredTopDownMajors.map(m => {
                    const isSelected = currentMajor?.id === m.id;
                    const bookmarked = childData.bookmarkedMajors?.includes(m.id);
                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMajorId(m.id)}
                        className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20'
                            : 'bg-white hover:bg-slate-50 border-slate-200/80'
                        }`}
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                              m.track === '이과' ? 'bg-sky-100 text-sky-700' : m.track === '문과' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {m.track}
                            </span>
                            <h4 className="text-sm font-bold text-slate-800 truncate">
                              {m.name}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            {m.summary}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {bookmarked && (
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          )}
                          <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-300'}`} />
                        </div>
                      </div>
                    );
                  })}
                  {filteredTopDownMajors.length === 0 && (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      검색 조건에 맞는 학과가 없습니다.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 우측: 학과 상세 & 고교 선택과목 및 세특 가이드 */}
            <div className="lg:col-span-7 flex flex-col overflow-y-auto pl-0 lg:pl-2 space-y-4">
              {currentMajor ? (
                <>
                  {/* 상단 학과 개요 카드 */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-3xl shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-emerald-300">
                            {currentMajor.category} · {currentMajor.subCategory}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">
                            성향: {currentMajor.track}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          {currentMajor.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleToggleBookmark(currentMajor.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-400 text-slate-900 shadow-md'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-slate-900' : ''}`} />
                        <span>{isBookmarked ? '관심 학과 담김' : '관심 학과(★) 추가'}</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                      {currentMajor.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {currentMajor.tags.map(tag => (
                        <span key={tag} className="text-[11px] bg-white/10 px-2 py-0.5 rounded-lg text-slate-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 2022 개정 고교학점제 선택과목 가이드 */}
                  <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-3xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">
                        2022 개정 고교학점제: 추천 과목 설계
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="p-3 bg-white rounded-2xl border border-blue-100 shadow-2xs">
                        <div className="text-xs font-bold text-blue-700 mb-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>필수 권장 과목 (대학 평가 핵심)</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {currentMajor.curriculum2022?.core?.map(subject => (
                            <span key={subject} className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                        <div className="text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                          <PlusCircleIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>추가 권장 과목</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {currentMajor.curriculum2022?.recommended?.map(subject => (
                            <span key={subject} className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-lg">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {currentMajor.curriculum2022?.guidance && (
                      <p className="text-xs text-slate-600 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/50 leading-relaxed">
                        💡 <strong>이수 팁:</strong> {currentMajor.curriculum2022.guidance}
                      </p>
                    )}
                  </div>

                  {/* 고1 공통과목 세특 탐구 아이디어 */}
                  <div className="bg-amber-50/60 border border-amber-200/80 p-4 rounded-3xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">
                        고1 공통과목 세특 탐구 아이디어 예시
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">
                      고1 수업 시간에 배우는 내용에서 다음과 같은 관심사 융합 탐구 보고서를 작성할 수 있습니다.
                    </p>
                    <div className="space-y-2">
                      {currentMajor.studentBookIdeas?.map((idea, idx) => (
                        <div key={idx} className="p-2.5 bg-white rounded-xl border border-amber-100 text-xs text-slate-700 leading-relaxed shadow-2xs flex items-start gap-2">
                          <span className="text-amber-500 font-bold shrink-0">Q{idx + 1}.</span>
                          <span>{idea}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 하단 바로가기 액션 바 */}
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => {
                        handleToggleBookmark(currentMajor.id);
                        onSelectMajor(currentMajor.id, 4);
                      }}
                      className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20 transition cursor-pointer"
                    >
                      <span>이 학과 Step 4 심층 리포트 보기</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center text-slate-400">학위 정보를 선택해주세요.</div>
              )}
            </div>
          </div>
        )}

        {/* 탭 2: 상향식 (Bottom-Up) 뷰 */}
        {activeTab === 'bottomUp' && (
          <div className="flex-1 overflow-y-auto pt-4 space-y-5">
            {/* 상향식 안내 배너 */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-4 sm:p-5 rounded-3xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                    딸아이의 일상적인 흥미와 선호 활동을 2~5개 골라보세요!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    "이과인지 문과인지 잘 모르겠어요"하는 학생들을 위해, 구체적인 관심 활동에서 거꾸로 어울리는 학과와 최적의 대계열을 역도출합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 흥미 키워드 체크리스트 풀 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  관심 활동 키워드 풀 (현재 {selectedInterestIds.length}개 선택됨)
                </label>
                <span className="text-xs text-indigo-600 font-semibold">최대 5개 선택 권장</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {BOTTOM_UP_INTERESTS.map(item => {
                  const isChecked = selectedInterestIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectInterest(item.id)}
                      className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 ring-2 ring-indigo-400/30'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-xs sm:text-sm font-bold leading-snug">
                        {item.label}
                      </div>
                      <div className="mt-2 text-[10px] opacity-80">
                        {item.tracks.join('/')} 성향
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 역도출 분석 인포그래픽 카드 */}
            <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h4 className="text-base font-bold text-white">
                  내 흥미 기반 성향 및 최적 계열 역도출 결과
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 문/이과 비율 바 */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <div className="text-xs text-slate-400 mb-2">문·이과 성향 매칭 비율</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-sky-400">자연·공학 (이과) {bottomUpAnalysis.trackRatio.natural}%</span>
                      <span className="text-amber-400">인문·사회 (문과) {bottomUpAnalysis.trackRatio.social}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-sky-500 h-full transition-all duration-500" 
                        style={{ width: `${bottomUpAnalysis.trackRatio.natural}%` }} 
                      />
                      <div 
                        className="bg-amber-500 h-full transition-all duration-500" 
                        style={{ width: `${bottomUpAnalysis.trackRatio.social}%` }} 
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    {bottomUpAnalysis.trackRatio.natural >= 60 ? '이과(자연·공학·의약) 분야에 높은 적성을 보입니다.' :
                     bottomUpAnalysis.trackRatio.social >= 60 ? '문과(사회과학·인문·경영) 분야에 높은 친화도를 보입니다.' :
                     '문·이과 균형형 융합 인재 성향을 띠고 있습니다.'}
                  </p>
                </div>

                {/* 1순위 추천 대계열 */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <div className="text-xs text-slate-400 mb-1">최우선 추천 대계열</div>
                  <div className="text-2xl font-black text-emerald-400 my-1">
                    {bottomUpAnalysis.dominantCategory}
                  </div>
                  <p className="text-xs text-slate-300">
                    선택하신 활동들이 가장 집중적으로 활용되는 핵심 전공 계열입니다.
                  </p>
                </div>

                {/* 추천 액션 가이드 */}
                <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-400/20 flex flex-col justify-between">
                  <div className="text-xs text-indigo-300 mb-1">고1 추천 행동 팁</div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    아래 매칭 학과 중 2~3개를 찜(★)해두고, <strong>고1 1학기 말 선택과목 가조사</strong> 전까지 교과 수업을 통해 관심도를 검증해 보세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 매칭된 최적 학과 리스트 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>내 흥미와 가장 잘 맞는 추천 학과 TOP 8</span>
                </h4>
                <span className="text-xs text-slate-400">카드를 눌러 관심 학과(★)에 등록하세요</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {bottomUpAnalysis.rankedMajors.map((major, idx) => {
                  const bookmarked = childData.bookmarkedMajors?.includes(major.id);
                  return (
                    <div
                      key={major.id}
                      className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                            매칭 #{idx + 1}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            major.track === '이과' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {major.track}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-800 mb-1 line-clamp-1">
                          {major.name}
                        </h5>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                          {major.summary}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => handleToggleBookmark(major.id)}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer ${
                            bookmarked
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${bookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                          <span>{bookmarked ? '담김' : '관심 담기'}</span>
                        </button>
                        <button
                          onClick={() => {
                            if (!bookmarked) handleToggleBookmark(major.id);
                            onSelectMajor(major.id, 4);
                          }}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                        >
                          <span>리포트</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 보조 아이콘
function PlusCircleIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}
