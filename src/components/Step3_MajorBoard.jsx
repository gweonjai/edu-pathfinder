import React, { useState, useMemo } from 'react';
import { useProfile } from '../context/ProfileContext';
import { MAJORS_DATA, CATEGORIES } from '../data/departmentsData';
import { COLLEGES } from '../data/collegesData';
import { PREFERENCE_TAGS, DISLIKE_TAGS } from '../data/tendencyData';
import { getEasyMajorInfo } from '../data/easyLanguageData';
import { getMiddleSchoolInfo } from '../data/middleSchoolData';
import { 
  X, Check, Bookmark, HelpCircle, Sparkles, Filter, Award,
  RotateCcw, ArrowRight, Eye, ChevronDown, ChevronUp, Search, Info, AlertTriangle,
  Star, ThumbsUp, ArrowUpDown, Layers, MessageCircleQuestion
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Step3_MajorBoard = ({ onGoToStep4, onGoToStep2 }) => {
  const { childData, updateChildData, activeProfile, isEasyMode, isMiddleMode, isHighMode, educationTier } = useProfile();

  // 필터 및 정렬 상태
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [statusFilter, setStatusFilter] = useState('active'); // 'active' | 'bookmarked' | 'pending' | 'excluded'
  const [contractFilter, setContractFilter] = useState('all'); // 'all' | 'contract-only' | '삼성전자' | ...
  const [sortBy, setSortBy] = useState('match'); // 'match' | 'name' | 'category'
  const [searchQuery, setSearchQuery] = useState('');
  const [previewMajor, setPreviewMajor] = useState(null); // 간이 미리보기 모달

  const excludedSet = useMemo(() => new Set(childData.excludedMajors || []), [childData.excludedMajors]);
  const pendingSet = useMemo(() => new Set(childData.pendingMajors || []), [childData.pendingMajors]);
  const bookmarkedSet = useMemo(() => new Set(childData.bookmarkedMajors || []), [childData.bookmarkedMajors]);
  const needExplainSet = useMemo(() => new Set(childData.needExplainMajors || []), [childData.needExplainMajors]);

  // 2단계에서 설정된 선호 레벨 매핑
  const preferenceLevels = childData.preferenceLevels || {};
  const activeHigh = useMemo(() => Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'high'), [preferenceLevels]);
  const activeMedium = useMemo(() => Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'medium'), [preferenceLevels]);
  const activeLow = useMemo(() => Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'low'), [preferenceLevels]);

  const highTags = useMemo(() => PREFERENCE_TAGS.filter((t) => activeHigh.includes(t.id)).flatMap((t) => t.matchedTags), [activeHigh]);
  const mediumTags = useMemo(() => PREFERENCE_TAGS.filter((t) => activeMedium.includes(t.id)).flatMap((t) => t.matchedTags), [activeMedium]);
  const lowTags = useMemo(() => PREFERENCE_TAGS.filter((t) => activeLow.includes(t.id)).flatMap((t) => t.matchedTags), [activeLow]);

  // 학과 상태 분류 액션
  const handleExclude = (majorId) => {
    const nextExcluded = Array.from(new Set([...(childData.excludedMajors || []), majorId]));
    const nextPending = (childData.pendingMajors || []).filter((id) => id !== majorId);
    const nextBookmarked = (childData.bookmarkedMajors || []).filter((id) => id !== majorId);
    const nextNeedExplain = (childData.needExplainMajors || []).filter((id) => id !== majorId);
    updateChildData({
      excludedMajors: nextExcluded,
      pendingMajors: nextPending,
      bookmarkedMajors: nextBookmarked,
      needExplainMajors: nextNeedExplain,
    });
  };

  const handlePending = (majorId) => {
    const nextExcluded = (childData.excludedMajors || []).filter((id) => id !== majorId);
    const nextPending = Array.from(new Set([...(childData.pendingMajors || []), majorId]));
    const nextBookmarked = (childData.bookmarkedMajors || []).filter((id) => id !== majorId);
    const nextNeedExplain = (childData.needExplainMajors || []).filter((id) => id !== majorId);
    updateChildData({
      excludedMajors: nextExcluded,
      pendingMajors: nextPending,
      bookmarkedMajors: nextBookmarked,
      needExplainMajors: nextNeedExplain,
    });
  };

  const handleBookmark = (majorId) => {
    const isAlreadyBookmarked = bookmarkedSet.has(majorId);
    let nextBookmarked;
    if (isAlreadyBookmarked) {
      nextBookmarked = (childData.bookmarkedMajors || []).filter((id) => id !== majorId);
    } else {
      nextBookmarked = Array.from(new Set([...(childData.bookmarkedMajors || []), majorId]));
      // 5개 이하로 도달했을 때 콘페티 효과
      if (nextBookmarked.length <= 5 && nextBookmarked.length >= 1) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      }
    }
    const nextExcluded = (childData.excludedMajors || []).filter((id) => id !== majorId);
    const nextPending = (childData.pendingMajors || []).filter((id) => id !== majorId);
    const nextNeedExplain = (childData.needExplainMajors || []).filter((id) => id !== majorId);

    updateChildData({
      excludedMajors: nextExcluded,
      pendingMajors: nextPending,
      bookmarkedMajors: nextBookmarked,
      needExplainMajors: nextNeedExplain,
    });
  };

  // 설명 필요 / 질문 요청 액션
  const handleNeedExplain = (majorId) => {
    const isAlready = needExplainSet.has(majorId);
    let nextNeedExplain;
    if (isAlready) {
      nextNeedExplain = (childData.needExplainMajors || []).filter((id) => id !== majorId);
    } else {
      nextNeedExplain = Array.from(new Set([...(childData.needExplainMajors || []), majorId]));
    }
    const nextExcluded = (childData.excludedMajors || []).filter((id) => id !== majorId);
    const nextPending = (childData.pendingMajors || []).filter((id) => id !== majorId);
    const nextBookmarked = (childData.bookmarkedMajors || []).filter((id) => id !== majorId);

    updateChildData({
      excludedMajors: nextExcluded,
      pendingMajors: nextPending,
      bookmarkedMajors: nextBookmarked,
      needExplainMajors: nextNeedExplain,
    });
  };

  // 복구 액션 (제외 해제)
  const handleRestore = (majorId) => {
    updateChildData({
      excludedMajors: (childData.excludedMajors || []).filter((id) => id !== majorId),
    });
  };

  // 대기업 계약학과 수 연산
  const contractMajorsCount = useMemo(() => {
    return MAJORS_DATA.filter((m) => m.contractMajor).length;
  }, []);

  // 각 학과의 선호 매칭 점수 연산
  const majorsWithScores = useMemo(() => {
    return MAJORS_DATA.map((major) => {
      let score = 0;
      major.tags.forEach((tag) => {
        if (highTags.includes(tag)) score += 3;
        if (mediumTags.includes(tag)) score += 1;
        if (lowTags.includes(tag)) score -= 1;
      });
      return { ...major, matchScore: score };
    });
  }, [highTags, mediumTags, lowTags]);

  // 필터링 및 정렬된 학과 목록 연산
  const filteredMajors = useMemo(() => {
    return majorsWithScores.filter((major) => {
      // 1. 상태 필터
      const isExcluded = excludedSet.has(major.id);
      const isPending = pendingSet.has(major.id);
      const isBookmarked = bookmarkedSet.has(major.id);
      const isNeedExplain = needExplainSet.has(major.id);

      if (statusFilter === 'active' && isExcluded) return false;
      if (statusFilter === 'bookmarked' && !isBookmarked) return false;
      if (statusFilter === 'pending' && !isPending) return false;
      if (statusFilter === 'needExplain' && !isNeedExplain) return false;
      if (statusFilter === 'excluded' && !isExcluded) return false;

      // 2. 계열 필터
      if (selectedCategory !== 'all' && major.category !== selectedCategory) return false;

      // 3. 대학 필터
      if (selectedCollege !== 'all' && !major.colleges.includes(selectedCollege)) return false;

      // 4. 채용조건형 계약학과 필터
      if (contractFilter === 'contract-only' && !major.contractMajor) return false;
      if (contractFilter !== 'all' && contractFilter !== 'contract-only') {
        const hasPartner = major.contractMajor?.partnerCompanies?.some(
          c => c.includes(contractFilter)
        );
        if (!hasPartner) return false;
      }

      // 5. 검색어 필터
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchName = major.name.toLowerCase().includes(query);
        const matchTags = major.tags.some((t) => t.toLowerCase().includes(query));
        const matchSummary = major.summary.toLowerCase().includes(query);
        const matchCareers = (major.careerPaths || []).some((c) => c.toLowerCase().includes(query));
        const matchCompanies = (major.corporateTarget?.examples || []).some((c) => c.toLowerCase().includes(query));
        const matchContractPartner = (major.contractMajor?.partnerCompanies || []).some((c) => c.toLowerCase().includes(query));

        if (!matchName && !matchTags && !matchSummary && !matchCareers && !matchCompanies && !matchContractPartner) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'match') {
        // 매칭 점수 높은 순 -> 가나다순 (선택 시에도 카드가 최상단으로 갑자기 점프하여 스크롤이 튀지 않도록 안정적 정렬 유지)
        if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
        return a.name.localeCompare(b.name, 'ko');
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'ko');
      }
      if (sortBy === 'category') {
        return a.category.localeCompare(b.category, 'ko');
      }
      return 0;
    });
  }, [majorsWithScores, statusFilter, selectedCategory, selectedCollege, contractFilter, searchQuery, sortBy, excludedSet, pendingSet, bookmarkedSet, needExplainSet]);

  const bookmarkedCount = childData.bookmarkedMajors?.length || 0;
  const pendingCount = childData.pendingMajors?.length || 0;
  const needExplainCount = childData.needExplainMajors?.length || 0;
  const excludedCount = childData.excludedMajors?.length || 0;
  const activeCount = MAJORS_DATA.length - excludedCount;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. 상단 안내 헤더 */}
      <div className="bg-gradient-to-r from-slate-100 via-indigo-50/50 to-slate-100 border border-slate-200/90 rounded-2xl p-6 text-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100/90 text-indigo-800 border border-indigo-200">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>3단계: 나의 맞춤 학과 보드</span>
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
                ? `${activeProfile?.name || '친구'}의 마음에 드는 학과에 노란 별(★)을 달아보세요!`
                : `${activeProfile?.name || '본인'} 님의 선호 과목이 반영된 맞춤 대학 학과 보드`}
            </h2>

            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {isEasyMode
                ? '앞서 선택한 재미있는 공부와 가장 잘 맞는 학과들이 위쪽에 먼저 나와요. 꼭 가고 싶은 학과는 [관심★], 고민되면 [보류△], 잘 모르겠는 건 [물어볼래요❓]를 눌러보세요.'
                : '1·2단계 선호도 점수가 가산된 학과 랭킹입니다. 관심(★)과 보류(△), 설명 필요(❓)로 분류하여 학과를 효과적으로 압축할 수 있습니다.'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onGoToStep2}
              className="text-xs bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2.5 rounded-xl transition flex items-center space-x-1 border border-slate-200 shadow-2xs font-semibold cursor-pointer"
            >
              <span>← 2단계 선호 과목 수정</span>
            </button>
            <button
              onClick={onGoToStep4}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center space-x-1 cursor-pointer"
            >
              <span>4단계 심층 리포트</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. 컨트롤 바 (상태 탭, 계열 필터, 정렬, 검색) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        
        {/* 상태 탭 & 정렬 옵션 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                statusFilter === 'active'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              전체 학과 ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter('bookmarked')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer ${
                statusFilter === 'bookmarked'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>관심 ({bookmarkedCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer ${
                statusFilter === 'pending'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>보류 ({pendingCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('needExplain')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer ${
                statusFilter === 'needExplain'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              <MessageCircleQuestion className="w-3.5 h-3.5" />
              <span>❓ 설명 필요 ({needExplainCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('excluded')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer ${
                statusFilter === 'excluded'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <X className="w-3.5 h-3.5" />
              <span>제외 목록 ({excludedCount})</span>
            </button>
          </div>

          {/* 정렬 순서 */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium flex items-center space-x-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>정렬:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-700 cursor-pointer focus:ring-2 focus:ring-indigo-400"
            >
              <option value="match">✨ 선호도 매칭순</option>
              <option value="name">가나다순</option>
              <option value="category">계열순</option>
            </select>
          </div>
        </div>

        {/* 2차 필터: 계열, 대학, 검색 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* 계열 선택 */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-700 cursor-pointer focus:ring-2 focus:ring-indigo-400"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* 대학 선택 */}
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-700 cursor-pointer focus:ring-2 focus:ring-indigo-400"
          >
            <option value="all">전체 20개 대학</option>
            {COLLEGES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.type})
              </option>
            ))}
          </select>

          {/* 계약학과 필터 */}
          <select
            value={contractFilter}
            onChange={(e) => setContractFilter(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-700 cursor-pointer focus:ring-2 focus:ring-indigo-400"
          >
            <option value="all">계약학과 전체 포함</option>
            <option value="contract-only">⭐ 대기업 채용보장 계약학과만</option>
            <option value="삼성전자">삼성전자 계약학과</option>
            <option value="SK하이닉스">SK하이닉스 계약학과</option>
            <option value="LG">LG에너지솔루션 배터리 트랙</option>
            <option value="국방부">국방부 사이버국방 트랙</option>
          </select>

          {/* 검색창 */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="학과명, 태그, 진출 기업 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
      </div>

      {/* 3. 학과 카드 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMajors.map((major) => {
          const isExcluded = excludedSet.has(major.id);
          const isPending = pendingSet.has(major.id);
          const isBookmarked = bookmarkedSet.has(major.id);
          const isNeedExplain = needExplainSet.has(major.id);

          const easyInfo = getEasyMajorInfo(major.id);
          const middleInfo = getMiddleSchoolInfo(major.id);

          return (
            <div
              key={major.id}
              className={`rounded-2xl border transition-all p-5 flex flex-col justify-between ${
                isBookmarked
                  ? 'bg-amber-50/70 border-amber-300 shadow-md ring-2 ring-amber-400/40'
                  : isPending
                  ? 'bg-sky-50/70 border-sky-300 shadow-xs ring-1 ring-sky-300/40'
                  : isNeedExplain
                  ? 'bg-purple-50/70 border-purple-300 shadow-xs ring-1 ring-purple-300/40'
                  : isExcluded
                  ? 'bg-slate-100/70 border-slate-200 opacity-60'
                  : 'bg-white hover:bg-slate-50/60 border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                {/* 상단 뱃지 행 */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {major.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      major.track === '이과'
                        ? 'bg-sky-100 text-sky-700 border border-sky-200'
                        : 'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}>
                      {major.track}
                    </span>
                    {major.contractMajor?.partnerCompanies && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300 flex items-center space-x-1">
                        <Award className="w-3 h-3 text-amber-600" />
                        <span>{major.contractMajor.partnerCompanies.join(' · ')}</span>
                      </span>
                    )}
                  </div>

                  {/* 선호도 매칭 점수 뱃지 */}
                  {major.matchScore > 0 && (
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-300 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      <span>선호 매칭 +{major.matchScore}</span>
                    </span>
                  )}
                </div>

                {/* 학과명 */}
                <h3 className="text-base font-black text-slate-900 leading-snug mb-1">
                  {major.name}
                </h3>

                {/* 학년별 눈높이 설명 (초등 / 중등 / 고교) */}
                {isEasyMode && easyInfo ? (
                  <div className="mt-2 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-950 font-medium leading-relaxed flex items-start space-x-1.5">
                    <span className="text-sm shrink-0">🌱</span>
                    <span>{easyInfo.easySummary}</span>
                  </div>
                ) : isMiddleMode && middleInfo ? (
                  <div className="mt-2 p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-200/80 text-xs text-indigo-950 font-medium leading-relaxed flex items-start space-x-1.5">
                    <span className="text-sm shrink-0">💡</span>
                    <span>{middleInfo.realLifeExample}</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {major.summary}
                  </p>
                )}
              </div>

              {/* 하단 분류 액션 버튼 (관심 ★ / 보류 △ / 학과 제외 ✕ / 설명 필요 ?) */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                {/* 1. 관심 등록 버튼 */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleBookmark(major.id);
                  }}
                  className={`flex-1 py-1.5 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer whitespace-nowrap ${
                    isBookmarked
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200'
                  }`}
                  title={isBookmarked ? '관심 학과 등록 해제' : '관심 학과(★)로 등록'}
                >
                  <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
                  <span>{isBookmarked ? '관심' : '관심(★)'}</span>
                </button>

                {/* 2. 보류 버튼 */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePending(major.id);
                  }}
                  className={`flex-1 py-1.5 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer whitespace-nowrap ${
                    isPending
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200'
                  }`}
                  title={isPending ? '보류 해제' : '판단 보류(△)로 설정'}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isPending ? '보류 중' : '보류(△)'}</span>
                </button>

                {/* 3. 학과 제외 / 복구 버튼 */}
                {isExcluded ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRestore(major.id);
                    }}
                    className="flex-1 py-1.5 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 transition cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap"
                    title="제외 해제(복구)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>복구</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleExclude(major.id);
                    }}
                    className="flex-1 py-1.5 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold text-rose-700 bg-rose-50/80 hover:bg-rose-100 border border-rose-200 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                    title="이 학과 목록에서 제외하기"
                  >
                    <X className="w-3.5 h-3.5 text-rose-600" />
                    <span>학과 제외</span>
                  </button>
                )}

                {/* 4. 설명 필요 (? 아이콘만 단독 표시하여 두 줄 깨짐 방지) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleNeedExplain(major.id);
                  }}
                  className={`w-8 h-8 rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer ${
                    isNeedExplain
                      ? 'bg-purple-600 text-white shadow-xs ring-2 ring-purple-400'
                      : 'bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-800 border border-slate-200'
                  }`}
                  title={isNeedExplain ? '설명 필요 표시 해제' : '설명 필요 / 부모님·선생님께 질문하기'}
                >
                  <MessageCircleQuestion className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMajors.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <Info className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">해당 조건에 맞는 학과가 없습니다.</h3>
          <p className="text-xs text-slate-500">
            선택된 필터를 완화하거나 상단 검색어를 확인해 보세요.
          </p>
        </div>
      )}

      {/* 4. 하단 단계 이동 버튼 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            {bookmarkedCount > 0
              ? `현재 ${bookmarkedCount}개의 관심 학과(★)가 지정되었습니다.`
              : '마음에 드는 학과 3~5개를 [관심★]으로 지정해 보세요.'}
          </h4>
          <p className="text-xs text-slate-500">
            관심 학과를 지정하면 4단계 심층 리포트에서 커리큘럼과 취업 분석을 한눈에 볼 수 있습니다.
          </p>
        </div>

        <button
          onClick={onGoToStep4}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <span>4단계: 심층 리포트 보기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
