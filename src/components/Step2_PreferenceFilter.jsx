import React, { useState, useMemo } from 'react';
import { useProfile } from '../context/ProfileContext';
import { PREFERENCE_TAGS } from '../data/tendencyData';
import { MAJORS_DATA } from '../data/departmentsData';
import { 
  Calculator, Atom, HeartPulse, Code, FlaskConical, Users, Globe, GraduationCap, 
  Wrench, Cpu, LineChart, BookOpen, Scale, Star, ThumbsUp, ThumbsDown, X, 
  Sparkles, ArrowRight, ArrowLeft, RotateCcw, AlertTriangle, Layers, CheckCircle2,
  GitFork, Compass, Search, ChevronRight, Brain, Award, Lightbulb
} from 'lucide-react';

const ICON_MAP = {
  Calculator, Atom, HeartPulse, Code, FlaskConical, Users, Globe, GraduationCap,
  Wrench, Cpu, LineChart, BookOpen, Scale
};

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

export const Step2_PreferenceFilter = ({ onNextStep, onPrevStep }) => {
  const { childData, updateChildData, activeProfile, isEasyMode, isMiddleMode, isHighMode } = useProfile();
  const [activeTab, setActiveTab] = useState('preference'); // 'preference' | 'tree' | 'bottomUp'

  // 1. 과목 선호도 상태
  const preferenceLevels = childData.preferenceLevels || {};

  const handleSetPreferenceLevel = (tagId, targetLevel) => {
    const current = preferenceLevels[tagId];
    const nextLevels = { ...preferenceLevels };

    if (current === targetLevel) {
      delete nextLevels[tagId];
    } else {
      nextLevels[tagId] = targetLevel;
    }

    const dislikeTagIds = Object.keys(nextLevels).filter((k) => nextLevels[k] === 'dislike');
    const matchedDislikeTags = PREFERENCE_TAGS
      .filter((t) => dislikeTagIds.includes(t.id))
      .flatMap((t) => t.matchedTags);

    const majorsToExclude = MAJORS_DATA.filter((major) =>
      major.tags.some((tagItem) => matchedDislikeTags.includes(tagItem))
    ).map((m) => m.id);

    const all12Tags = PREFERENCE_TAGS.flatMap((t) => t.matchedTags);
    const otherManualExcluded = (childData.excludedMajors || []).filter(
      (id) => !MAJORS_DATA.find((m) => m.id === id)?.tags.some((t) => all12Tags.includes(t))
    );

    const mergedExcluded = Array.from(new Set([...otherManualExcluded, ...majorsToExclude]));

    updateChildData({
      preferenceLevels: nextLevels,
      excludedMajors: mergedExcluded,
    });
  };

  const matchedMajorsRanking = useMemo(() => {
    const activeHigh = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'high');
    const activeMedium = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'medium');
    const activeLow = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'low');
    const activeDislike = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'dislike');

    const highTags = PREFERENCE_TAGS.filter((t) => activeHigh.includes(t.id)).flatMap((t) => t.matchedTags);
    const mediumTags = PREFERENCE_TAGS.filter((t) => activeMedium.includes(t.id)).flatMap((t) => t.matchedTags);
    const lowTags = PREFERENCE_TAGS.filter((t) => activeLow.includes(t.id)).flatMap((t) => t.matchedTags);
    const dislikeTags = PREFERENCE_TAGS.filter((t) => activeDislike.includes(t.id)).flatMap((t) => t.matchedTags);

    return MAJORS_DATA.map((major) => {
      if (major.tags.some((t) => dislikeTags.includes(t))) return null;
      let score = 0;
      major.tags.forEach((tag) => {
        if (highTags.includes(tag)) score += 3;
        if (mediumTags.includes(tag)) score += 1;
        if (lowTags.includes(tag)) score -= 1;
      });
      return { ...major, matchScore: score };
    })
    .filter((m) => m !== null && m.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
  }, [preferenceLevels]);

  const totalRated = Object.keys(preferenceLevels).length;
  const handleResetPreferences = () => {
    if (confirm('선택한 선호 과목 및 분야를 모두 초기화하시겠습니까?')) {
      updateChildData({ preferenceLevels: {}, excludedMajors: [] });
    }
  };

  // 2. 하향식 계열 트리 상태
  const [selectedCategory, setSelectedCategory] = useState('공학계열');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedMajorId, setSelectedMajorId] = useState(null);
  const [treeSearch, setTreeSearch] = useState('');

  const categories = useMemo(() => Array.from(new Set(MAJORS_DATA.map(m => m.category))), []);
  const subCategories = useMemo(() => {
    if (!selectedCategory) return [];
    const majorsInCat = MAJORS_DATA.filter(m => m.category === selectedCategory);
    return Array.from(new Set(majorsInCat.map(m => m.subCategory).filter(Boolean)));
  }, [selectedCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const majorsInCat = MAJORS_DATA.filter(m => m.category === cat);
    const firstSub = majorsInCat[0]?.subCategory || null;
    setSelectedSubCategory(firstSub);
    const firstMajor = majorsInCat.find(m => !firstSub || m.subCategory === firstSub) || majorsInCat[0];
    setSelectedMajorId(firstMajor?.id || null);
  };

  const filteredTreeMajors = useMemo(() => {
    return MAJORS_DATA.filter(m => {
      if (m.category !== selectedCategory) return false;
      if (selectedSubCategory && m.subCategory !== selectedSubCategory) return false;
      if (treeSearch.trim()) {
        const kw = treeSearch.toLowerCase();
        return m.name.toLowerCase().includes(kw) || m.summary.toLowerCase().includes(kw);
      }
      return true;
    });
  }, [selectedCategory, selectedSubCategory, treeSearch]);

  const currentTreeMajor = useMemo(() => {
    if (!selectedMajorId) return filteredTreeMajors[0] || MAJORS_DATA[0];
    return MAJORS_DATA.find(m => m.id === selectedMajorId) || filteredTreeMajors[0] || MAJORS_DATA[0];
  }, [selectedMajorId, filteredTreeMajors]);

  // 3. 상향식 역도출 상태
  const [selectedInterestIds, setSelectedInterestIds] = useState(['math_logic', 'coding_tech']);

  const bottomUpAnalysis = useMemo(() => {
    if (selectedInterestIds.length === 0) {
      return { rankedMajors: [], trackRatio: { natural: 50, social: 50 }, dominantCategory: '탐색 대기' };
    }
    const selectedInterests = BOTTOM_UP_INTERESTS.filter(i => selectedInterestIds.includes(i.id));
    const scores = MAJORS_DATA.map(major => {
      let score = 0;
      selectedInterests.forEach(interest => {
        Object.entries(interest.weights).forEach(([tagKey, weight]) => {
          if (major.tags.some(t => t.includes(tagKey) || tagKey.includes(t))) score += weight * 2;
        });
        if (interest.tracks.includes(major.track)) score += 1;
      });
      return { major, score };
    });
    scores.sort((a, b) => b.score - a.score);
    const rankedMajors = scores.slice(0, 8).map(s => s.major);

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
    const dominantCategory = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '공학계열';

    return {
      rankedMajors,
      trackRatio: { natural: naturalRatio, social: socialRatio },
      dominantCategory
    };
  }, [selectedInterestIds]);

  // 북마크 토글 공통 핸들러
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

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 2단계 상단 통합 안내 배너 */}
      <div className="bg-gradient-to-r from-slate-100 via-indigo-50/50 to-slate-100 border border-slate-200/90 rounded-3xl p-6 text-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100/90 text-indigo-800 border border-indigo-200">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                <span>2단계: 진로 & 관심 분야 맞춤 탐색</span>
              </div>
              <span className="text-xs text-slate-500">
                선호도 설정 · 계열 트리 · 흥미 역도출 일체형
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              {activeProfile?.name ? `${activeProfile.name} 님의 관심 진로 및 과목 탐색` : '나의 관심 진로 및 과목 탐색'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              12대 교과 분야의 호불호를 설정하거나, 대계열 트리 브라우징 또는 일상 흥미 활동 역도출을 통해 나에게 딱 맞는 전공 방향을 탐색하세요.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {onPrevStep && (
              <button
                onClick={onPrevStep}
                className="text-xs bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2.5 rounded-xl transition flex items-center space-x-1 border border-slate-200 shadow-2xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                <span>1단계 성향으로</span>
              </button>
            )}
            <button
              onClick={onNextStep}
              className="text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 cursor-pointer"
            >
              <span>3단계 학과 보드로</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2단계: 3가지 탐색 방법 일체형 폴더 탭 컨테이너 (세로 스크롤바 원천 차단) */}
      <div className="space-y-0 overflow-y-hidden">
        {/* 상단 탭 헤더 바: pl-0으로 설정하여 첫 번째 탭의 왼쪽 세로선이 아래 박스 왼쪽 세로선과 완벽 일치 */}
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 pl-0 pr-2 sm:pr-4 pt-2 overflow-y-hidden transition-colors ${
          activeTab === 'tree' ? 'border-emerald-600' : activeTab === 'bottomUp' ? 'border-purple-600' : 'border-indigo-600'
        }`}>
          {/* 3대 탭 버튼 그룹 (overflow-y-hidden 및 웹킷 스크롤바 완전 숨김) */}
          <div className="flex items-end gap-1.5 sm:gap-2 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* 탭 1: 12대 교과 선호도 (왼쪽 세로선이 아래 본문 박스 왼쪽 선과 완벽하게 일직선 정렬) */}
            <button
              type="button"
              onClick={() => setActiveTab('preference')}
              className={`group relative flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap border-t-2 border-x-2 ${
                activeTab === 'preference'
                  ? 'bg-white text-indigo-700 border-indigo-600 shadow-xs -mb-[2px] z-10'
                  : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 border-slate-200/80'
              }`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                activeTab === 'preference' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
              }`}>
                <Star className={`w-4 h-4 ${activeTab === 'preference' ? 'fill-indigo-600' : ''}`} />
              </span>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    방법 1
                  </span>
                  <span className="font-black text-slate-900">12대 교과 선호도</span>
                </div>
                <p className="text-[11px] font-normal text-slate-500 hidden md:block">
                  과목 호불호가 비교적 분명할 때
                </p>
              </div>
            </button>

            {/* 탭 2: 6대 계열 트리 */}
            <button
              type="button"
              onClick={() => setActiveTab('tree')}
              className={`group relative flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap border-t-2 border-x-2 ${
                activeTab === 'tree'
                  ? 'bg-white text-emerald-700 border-emerald-600 shadow-xs -mb-[2px] z-10'
                  : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 border-slate-200/80'
              }`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                activeTab === 'tree' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
              }`}>
                <GitFork className="w-4 h-4 rotate-180" />
              </span>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    방법 2
                  </span>
                  <span className="font-black text-slate-900">6대 계열 트리</span>
                </div>
                <p className="text-[11px] font-normal text-slate-500 hidden md:block">
                  전공 바운더리부터 좁혀갈 때
                </p>
              </div>
            </button>

            {/* 탭 3: 일상 흥미 역도출 */}
            <button
              type="button"
              onClick={() => setActiveTab('bottomUp')}
              className={`group relative flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-t-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap border-t-2 border-x-2 ${
                activeTab === 'bottomUp'
                  ? 'bg-white text-purple-700 border-purple-600 shadow-xs -mb-[2px] z-10'
                  : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 border-slate-200/80'
              }`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                activeTab === 'bottomUp' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
              }`}>
                <Brain className="w-4 h-4" />
              </span>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/60">
                    방법 3
                  </span>
                  <span className="font-black text-slate-900">일상 흥미 역도출</span>
                </div>
                <p className="text-[11px] font-normal text-slate-500 hidden md:block">
                  문/이과도 모호하고 막막할 때
                </p>
              </div>
            </button>
          </div>

          {/* 우측 상단 가이드 팁 */}
          <div className="text-xs text-slate-500 pb-2 hidden lg:flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>원하는 탭을 누르면 아래 상세 탐색 화면이 즉시 전환됩니다</span>
          </div>
        </div>

        {/* 탭과 바로 맞닿는 일체형 본문 패널 컨테이너 */}
        <div className={`bg-white border-x-2 border-b-2 rounded-b-3xl p-5 sm:p-7 shadow-xs transition-colors ${
          activeTab === 'tree' ? 'border-emerald-600' : activeTab === 'bottomUp' ? 'border-purple-600' : 'border-indigo-600'
        }`}>

      {/* 탭 1: 12대 탐구 분야 선호도 4점 척도 (기존 Step 2 기능) */}
      {activeTab === 'preference' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                12대 주요 학문·탐구 분야 선호도 (4점 평가)
              </h3>
              <p className="text-xs text-slate-500">
                ‘너무 싫어(✕)’를 선택하면 해당 분야가 포함된 학과가 3단계 보드에서 자동 소거됩니다.
              </p>
            </div>
            <button
              onClick={handleResetPreferences}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>선호도 초기화</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PREFERENCE_TAGS.map((tag) => {
              const IconComponent = ICON_MAP[tag.icon] || BookOpen;
              const currentLevel = preferenceLevels[tag.id];
              const displayTitle = isEasyMode ? (tag.easyShortLabel || tag.shortLabel || tag.label) : (tag.shortLabel || tag.label);
              const displayDesc = isEasyMode ? (tag.easyDescription || tag.description) : tag.description;

              return (
                <div
                  key={tag.id}
                  className={`bg-white rounded-2xl p-4 border transition-all ${
                    currentLevel === 'high' ? 'border-amber-400 bg-amber-50/20 shadow-xs' :
                    currentLevel === 'dislike' ? 'border-rose-300 bg-rose-50/30 opacity-75' :
                    'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      currentLevel === 'high' ? 'bg-amber-100 text-amber-700' :
                      currentLevel === 'dislike' ? 'bg-rose-100 text-rose-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-slate-900 truncate">
                        {displayTitle}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {displayDesc}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleSetPreferenceLevel(tag.id, 'high')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                        currentLevel === 'high' ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>최고</span>
                    </button>
                    <button
                      onClick={() => handleSetPreferenceLevel(tag.id, 'medium')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                        currentLevel === 'medium' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      좋아
                    </button>
                    <button
                      onClick={() => handleSetPreferenceLevel(tag.id, 'low')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                        currentLevel === 'low' ? 'bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      보통
                    </button>
                    <button
                      onClick={() => handleSetPreferenceLevel(tag.id, 'dislike')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-0.5 ${
                        currentLevel === 'dislike' ? 'bg-rose-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      <X className="w-3 h-3" />
                      <span>싫어</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 실시간 매칭 프리뷰 */}
          {matchedMajorsRanking.length > 0 && (
            <div className="p-5 bg-gradient-to-r from-indigo-50 via-white to-emerald-50 rounded-3xl border border-indigo-100 shadow-xs">
              <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>현재 선호도 기반 추천 학과 프리뷰 TOP 5</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedMajorsRanking.map((m) => (
                  <span key={m.id} className="text-xs font-bold px-3 py-1.5 bg-white border border-indigo-200 rounded-xl shadow-2xs text-slate-800">
                    {m.name} (+{m.matchScore}점)
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 탭 2: 6대 대계열 트리 (하향식 탐색) */}
      {activeTab === 'tree' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="학과명 검색..."
                value={treeSearch}
                onChange={(e) => setTreeSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                대계열 선택
              </label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                      selectedCategory === cat ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {subCategories.length > 0 && (
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                  중분류
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {subCategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubCategory(sub)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer ${
                        selectedSubCategory === sub ? 'bg-slate-800 text-white' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                학과 목록 ({filteredTreeMajors.length}개)
              </label>
              <div className="max-h-80 overflow-y-auto space-y-1.5 pr-1">
                {filteredTreeMajors.map(m => {
                  const isSelected = currentTreeMajor?.id === m.id;
                  const isBookmarked = childData.bookmarkedMajors?.includes(m.id);
                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMajorId(m.id)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                        isSelected ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20' : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold text-slate-900 truncate">{m.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{m.summary}</div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {isBookmarked && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                        <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-600' : 'text-slate-300'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {currentTreeMajor && (
              <>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-3xl shadow-lg">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="text-xs text-emerald-300 font-bold mb-1">
                        {currentTreeMajor.category} · {currentTreeMajor.subCategory}
                      </div>
                      <h4 className="text-xl font-black text-white">{currentTreeMajor.name}</h4>
                    </div>
                    <button
                      onClick={() => handleToggleBookmark(currentTreeMajor.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition ${
                        childData.bookmarkedMajors?.includes(currentTreeMajor.id)
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{childData.bookmarkedMajors?.includes(currentTreeMajor.id) ? '관심 등록됨' : '관심 담기'}</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{currentTreeMajor.summary}</p>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-3xl space-y-3">
                  <div className="text-xs font-bold text-blue-700 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>2022 개정 필수 권장 선택과목</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentTreeMajor.curriculum2022?.core?.map(s => (
                      <span key={s} className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
                        {s}
                      </span>
                    ))}
                  </div>
                  {currentTreeMajor.curriculum2022?.guidance && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                      💡 {currentTreeMajor.curriculum2022.guidance}
                    </p>
                  )}
                </div>

                <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-3xl space-y-2">
                  <div className="text-xs font-bold text-amber-800 flex items-center gap-1">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>고1 공통과목 세특 탐구 아이디어</span>
                  </div>
                  {currentTreeMajor.studentBookIdeas?.map((idea, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl text-xs text-slate-700 border border-amber-100">
                      {idea}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 탭 3: 일상 흥미 역도출 (상향식 탐색) */}
      {activeTab === 'bottomUp' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-800">
              좋아하는 일상 활동 및 관심사 키워드 (2~5개 선택)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {BOTTOM_UP_INTERESTS.map(item => {
                const isChecked = selectedInterestIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (selectedInterestIds.includes(item.id)) {
                        if (selectedInterestIds.length > 1) setSelectedInterestIds(selectedInterestIds.filter(i => i !== item.id));
                      } else {
                        if (selectedInterestIds.length < 5) setSelectedInterestIds([...selectedInterestIds, item.id]);
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                      isChecked ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs font-bold">{item.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-xs text-slate-400 mb-2">문·이과 적성 매칭 비율</div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-sky-400">이과 {bottomUpAnalysis.trackRatio.natural}%</span>
                <span className="text-amber-400">문과 {bottomUpAnalysis.trackRatio.social}%</span>
              </div>
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden flex">
                <div className="bg-sky-500 h-full" style={{ width: `${bottomUpAnalysis.trackRatio.natural}%` }} />
                <div className="bg-amber-500 h-full" style={{ width: `${bottomUpAnalysis.trackRatio.social}%` }} />
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-xs text-slate-400 mb-1">최우선 추천 대계열</div>
              <div className="text-2xl font-black text-emerald-400">{bottomUpAnalysis.dominantCategory}</div>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-400/20">
              <div className="text-xs text-purple-300 mb-1">추천 활용법</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                도출된 학과를 관심(★) 등록한 후 <strong>3단계 학과 보드</strong>로 이동하여 20개 대학 전공을 압축하세요.
              </p>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              추천 학과 TOP 8
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {bottomUpAnalysis.rankedMajors.map((major) => {
                const bookmarked = childData.bookmarkedMajors?.includes(major.id);
                return (
                  <div key={major.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 truncate mb-1">{major.name}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-2 mb-3">{major.summary}</div>
                    </div>
                    <button
                      onClick={() => handleToggleBookmark(major.id)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 ${
                        bookmarked ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{bookmarked ? '관심 등록됨' : '관심 담기'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
        </div>
      </div>

      {/* 하단 네비게이션 액션 바 */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        {onPrevStep ? (
          <button
            onClick={onPrevStep}
            className="px-5 py-3 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>1단계: 생각 스타일 진단</span>
          </button>
        ) : <div />}

        <button
          onClick={onNextStep}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer transition"
        >
          <span>3단계: 20개 대학 맞춤 학과 보드로 이동</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
