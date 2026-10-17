import React, { useState, useMemo } from 'react';
import { useProfile } from '../context/ProfileContext';
import { MAJORS_DATA, CATEGORIES } from '../data/departmentsData';
import { COLLEGES } from '../data/collegesData';
import { DISLIKE_TAGS } from '../data/tendencyData';
import { getCompanySalary } from '../data/companySalaryData';
import { getEasyMajorInfo } from '../data/easyLanguageData';
import { getMiddleSchoolInfo } from '../data/middleSchoolData';
import { 
  X, Check, Bookmark, HelpCircle, Sparkles, Filter, Building2, Briefcase, Award,
  RotateCcw, ArrowRight, Eye, ChevronDown, ChevronUp, Search, Info, AlertTriangle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Step2_EliminationBoard = ({ onGoToStep3 }) => {
  const { childData, updateChildData, activeProfile, isEasyMode, isMiddleMode, isHighMode, educationTier } = useProfile();

  // 필터 상태
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [statusFilter, setStatusFilter] = useState('active'); // 'active' | 'bookmarked' | 'pending' | 'excluded'
  const [contractFilter, setContractFilter] = useState('all'); // 'all' | 'contract-only' | '삼성전자' | ...
  const [searchQuery, setSearchQuery] = useState('');
  const [previewMajor, setPreviewMajor] = useState(null); // 간이 미리보기 모달

  const excludedSet = useMemo(() => new Set(childData.excludedMajors), [childData.excludedMajors]);
  const pendingSet = useMemo(() => new Set(childData.pendingMajors), [childData.pendingMajors]);
  const bookmarkedSet = useMemo(() => new Set(childData.bookmarkedMajors), [childData.bookmarkedMajors]);

  // 감내하기로 한 기피 태그 목록 매핑
  const tolerableTags = childData.tolerableDislikeTags || [];
  const tolerableTagInfoList = useMemo(() => {
    return DISLIKE_TAGS.filter((t) => tolerableTags.includes(t.id));
  }, [tolerableTags]);

  // 학과 상태 분류 액션
  const handleExclude = (majorId) => {
    const nextExcluded = Array.from(new Set([...childData.excludedMajors, majorId]));
    const nextPending = childData.pendingMajors.filter((id) => id !== majorId);
    const nextBookmarked = childData.bookmarkedMajors.filter((id) => id !== majorId);
    updateChildData({
      excludedMajors: nextExcluded,
      pendingMajors: nextPending,
      bookmarkedMajors: nextBookmarked,
    });
  };

  const handlePending = (majorId) => {
    const nextExcluded = childData.excludedMajors.filter((id) => id !== majorId);
    const nextPending = Array.from(new Set([...childData.pendingMajors, majorId]));
    const nextBookmarked = childData.bookmarkedMajors.filter((id) => id !== majorId);
    updateChildData({
      excludedMajors: nextExcluded,
      pendingMajors: nextPending,
      bookmarkedMajors: nextBookmarked,
    });
  };

  const handleBookmark = (majorId) => {
    const isAlreadyBookmarked = bookmarkedSet.has(majorId);
    let nextBookmarked;
    if (isAlreadyBookmarked) {
      nextBookmarked = childData.bookmarkedMajors.filter((id) => id !== majorId);
    } else {
      nextBookmarked = Array.from(new Set([...childData.bookmarkedMajors, majorId]));
      // 5개 이하로 도달했을 때 콘페티 효과
      if (nextBookmarked.length <= 5 && nextBookmarked.length >= 1) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      }
    }
    const nextExcluded = childData.excludedMajors.filter((id) => id !== majorId);
    const nextPending = childData.pendingMajors.filter((id) => id !== majorId);

    updateChildData({
      excludedMajors: nextExcluded,
      pendingMajors: nextPending,
      bookmarkedMajors: nextBookmarked,
    });
  };

  // 복구 액션 (제외 해제)
  const handleRestore = (majorId) => {
    updateChildData({
      excludedMajors: childData.excludedMajors.filter((id) => id !== majorId),
    });
  };

  // 대기업 계약학과 수 연산
  const contractMajorsCount = useMemo(() => {
    return MAJORS_DATA.filter((m) => m.contractMajor).length;
  }, []);

  // 필터링된 학과 목록 연산
  const filteredMajors = useMemo(() => {
    return MAJORS_DATA.filter((major) => {
      // 1. 상태 필터
      const isExcluded = excludedSet.has(major.id);
      const isPending = pendingSet.has(major.id);
      const isBookmarked = bookmarkedSet.has(major.id);

      if (statusFilter === 'active' && isExcluded) return false;
      if (statusFilter === 'bookmarked' && !isBookmarked) return false;
      if (statusFilter === 'pending' && !isPending) return false;
      if (statusFilter === 'excluded' && !isExcluded) return false;

      // 2. 대기업 계약학과 필터
      if (contractFilter !== 'all') {
        if (!major.contractMajor) return false;
        if (contractFilter === 'contract-only') {
          // 대기업 계약학과 전체 통과
        } else if (contractFilter === '삼성전자') {
          const matches = major.contractMajor.partnerCompanies?.some((c) => c.includes('삼성전자'));
          if (!matches) return false;
        } else {
          const matches = major.contractMajor.partnerCompanies?.some((c) => c.includes(contractFilter));
          if (!matches) return false;
        }
      }

      // 3. 계열 필터
      if (selectedCategory !== 'all' && major.category !== selectedCategory) return false;

      // 4. 대학 개설 필터
      if (selectedCollege !== 'all' && !major.colleges.includes(selectedCollege)) return false;

      // 5. 검색어
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = major.name.toLowerCase().includes(query);
        const matchTags = major.tags.some((t) => t.toLowerCase().includes(query));
        const matchCompanies = major.contractMajor?.partnerCompanies?.some((c) => c.toLowerCase().includes(query));
        if (!matchName && !matchTags && !matchCompanies) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedCollege, statusFilter, contractFilter, searchQuery, excludedSet, pendingSet, bookmarkedSet]);

  const remainingActiveCount = MAJORS_DATA.length - childData.excludedMajors.length;
  const candidateCount = childData.bookmarkedMajors.length + childData.pendingMajors.length;
  const canUnlockStep3 = candidateCount > 0 || (remainingActiveCount > 0 && remainingActiveCount <= 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 상단 현황 & 5개 압축 달성 축하 배너 */}
      {canUnlockStep3 ? (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-2xl p-5 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                Step 3 심층 분석 리포트 잠금 해제!
              </div>
              <h3 className="text-lg sm:text-xl font-black">
                {activeProfile.name} 학생의 후보 전공이 {candidateCount > 0 ? `총 ${candidateCount}개 (관심 ${childData.bookmarkedMajors.length}개 / 보류 ${childData.pendingMajors.length}개)` : `${remainingActiveCount}개`}로 준비되었습니다!
              </h3>
              <p className="text-xs text-teal-100">
                이제 각 학과의 <strong>중견·대기업 이상 타깃 부서</strong>와 <strong>고1 생기부 과목별 세특 로드맵</strong>을 확인하실 수 있습니다.
              </p>
            </div>
          </div>
          <button
            onClick={onGoToStep3}
            className="w-full sm:w-auto bg-white text-emerald-900 hover:bg-emerald-50 font-black text-sm px-6 py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0"
          >
            <span>심층 리포트 보러가기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 font-black text-sm">
              {remainingActiveCount}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span>남은 후보 학과: {remainingActiveCount}개</span>
                <span className="text-xs text-slate-400 font-normal">/ 전체 {MAJORS_DATA.length}개</span>
              </div>
              <p className="text-xs text-slate-500">
                마음에 들지 않는 학과는 <strong>[✕ 제외]</strong>를 누르고, 마음에 드는 학과는 <strong>[★ 관심 담기]</strong>를 눌러 5개 이하로 좁혀보세요!
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-amber-50 text-amber-800 font-bold px-3 py-1.5 rounded-xl border border-amber-200 flex items-center space-x-1.5">
              <span>관심 담은 학과: {childData.bookmarkedMajors.length}개</span>
              <span className="text-slate-400 font-normal">(목표: 3~5개)</span>
            </span>
          </div>
        </div>
      )}

      {/* 3단계 교육과정 모드 알림 배너 */}
      {isEasyMode ? (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 rounded-2xl p-3.5 flex items-center justify-between text-xs text-emerald-950 shadow-2xs">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl">🌱</span>
            <div>
              <strong className="font-extrabold text-emerald-900 block sm:inline">초등 5~6학년 눈높이 모드 작동 중</strong>{' '}
              <span className="text-emerald-700">어려운 대학 학술 용어 대신 "어떤 물건을 만들고 어떤 재미있는 일을 하는지" 일상 생활어로 알기 쉽게 설명합니다.</span>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-white text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-xl shrink-0 hidden md:inline">
            학생 학년({activeProfile.grade}) 자동 연동
          </span>
        </div>
      ) : isMiddleMode ? (
        <div className="bg-gradient-to-r from-indigo-50 via-sky-50 to-indigo-50 border border-indigo-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-indigo-950 shadow-2xs">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl">💡</span>
            <div>
              <strong className="font-extrabold text-indigo-900 block sm:inline">중학 1~3학년 실생활 연계 모드 작동 중</strong>{' '}
              <span className="text-indigo-700">카카오톡, 넷플릭스, 반도체 등 실생활 제품·서비스 적용 사례를 중심으로 전공을 탐색합니다.</span>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-white text-indigo-800 border border-indigo-200 px-2.5 py-1 rounded-xl shrink-0 hidden md:inline">
            학생 학년({activeProfile.grade}) 자동 연동
          </span>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-slate-50 via-indigo-50 to-slate-50 border border-slate-300 rounded-2xl p-3.5 flex items-center justify-between text-xs text-slate-800 shadow-2xs">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl">🎓</span>
            <div>
              <strong className="font-extrabold text-slate-900 block sm:inline">고교 1~3학년 입시·고교학점제 모드 작동 중</strong>{' '}
              <span className="text-slate-600">2022 개정 고교학점제 선택 과목, 학생부 세특 탐구 주제 및 대학/기업 실무 직무를 정밀 분석합니다.</span>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-white text-slate-700 border border-slate-300 px-2.5 py-1 rounded-xl shrink-0 hidden md:inline">
            학생 학년({activeProfile.grade}) 자동 연동
          </span>
        </div>
      )}

      {/* 필터 툴바 */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        
        {/* 상단 탭: 보기 상태 필터 */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                statusFilter === 'active'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>탐색 후보군</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
                {remainingActiveCount}
              </span>
            </button>
            <button
              onClick={() => setStatusFilter('bookmarked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                statusFilter === 'bookmarked'
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>★ 관심 보관함</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
                {childData.bookmarkedMajors.length}
              </span>
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                statusFilter === 'pending'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>△ 보류 목록</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
                {childData.pendingMajors.length}
              </span>
            </button>
            <button
              onClick={() => setStatusFilter('excluded')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                statusFilter === 'excluded'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>✕ 제외된 학과</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
                {childData.excludedMajors.length}
              </span>
            </button>
          </div>

          {/* 검색창 */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="학과명 또는 키워드 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        {/* 중단: 계열 & 서울 20개 대학 드롭다운 선택기 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          
          {/* 계열 필터 */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">
              7대 계열 필터
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-slate-50 font-medium text-slate-800 focus:outline-indigo-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.desc ? `(${c.desc})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* 서울 주요 20개 대학 개설 필터 */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">
              서울 주요 20개 대학 개설 여부
            </label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-slate-50 font-medium text-slate-800 focus:outline-indigo-500"
            >
              <option value="all">서울 주요 20개 대학 전체</option>
              {COLLEGES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.shortName} · {c.tier})
                </option>
              ))}
            </select>
          </div>

          {/* 대기업 계약학과 필터 (동일한 박스 및 색상 디자인) */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1">
              <label className="text-[11px] font-bold text-slate-600 block">
                대기업 계약학과
              </label>
              <span className="text-[9px] font-black text-white bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 px-1.5 py-0.2 rounded shadow-2xs">
                채용보장
              </span>
            </div>
            <select
              value={contractFilter}
              onChange={(e) => setContractFilter(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-slate-50 font-medium text-slate-800 focus:outline-indigo-500"
            >
              <option value="all">전체 학과 (계약학과 미지정 포함)</option>
              <option value="contract-only">대기업 계약학과만 보기 ({contractMajorsCount}개)</option>
              <option value="삼성전자">삼성전자 전체 (DS + DX)</option>
              <option value="삼성전자(DS)">삼성전자(DS) 반도체부문</option>
              <option value="삼성전자(DX)">삼성전자(DX) AI·통신부문</option>
              <option value="SK하이닉스">SK하이닉스 계약학과</option>
              <option value="현대자동차">현대자동차그룹 계약학과</option>
              <option value="LG디스플레이">LG디스플레이 계약학과</option>
            </select>
          </div>

        </div>

        {/* 표시 중인 학과 수 요약 */}
        <div className="flex justify-end text-xs text-slate-500 pt-1">
          <span>표시 중인 학과: <strong className="text-slate-900">{filteredMajors.length}</strong>개</span>
        </div>

      </div>

      {/* 학과 카드 그리드 */}
      {filteredMajors.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
          <Info className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-700">해당 조건에 일치하는 학과가 없습니다.</h4>
          <p className="text-xs text-slate-400 mt-1">
            필터 조건(계열, 대학, 검색어, 제외 상태)을 변경해 보세요.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMajors.map((major) => {
            const isExcluded = excludedSet.has(major.id);
            const isPending = pendingSet.has(major.id);
            const isBookmarked = bookmarkedSet.has(major.id);

            // 서울 20개 대학 중 개설 대학 리스트
            const openedColleges = COLLEGES.filter((c) => major.colleges.includes(c.id));

            // 이 학과가 보유한 감내 대상 속성 리스트
            const matchedTolerableTags = tolerableTagInfoList.filter((t) =>
              major.tags.some((mt) => t.matchedTags.includes(mt))
            );

            // 초등학생 쉬운 언어 모드 및 중학생 실생활 적용 데이터
            const easyInfo = isEasyMode ? getEasyMajorInfo(major.id) : null;
            const middleInfo = !isEasyMode ? getMiddleSchoolInfo(major.id) : null;

            return (
              <div
                key={major.id}
                className={`rounded-2xl border transition-all flex flex-col justify-between p-5 ${
                  isBookmarked
                    ? 'bg-amber-50/70 border-amber-300 shadow-md ring-2 ring-amber-400/40'
                    : isPending
                    ? 'bg-sky-50/70 border-sky-300'
                    : isExcluded
                    ? 'bg-slate-100/80 border-slate-200 opacity-60'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  
                  {/* 상단 뱃지 라인: 좌측 계열 정보 / 우측 회사 이름 & 상태 */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        major.track === '이과'
                          ? 'bg-sky-100 text-sky-800'
                          : major.track === '문과'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {major.track}
                      </span>
                      <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {major.category}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {major.subCategory}
                      </span>
                    </div>

                    {/* 행 제일 오른쪽: 눈에 확 띄는 알록달록한 그라데이션 배경색 */}
                    <div className="flex items-center space-x-1.5 shrink-0">
                      {major.contractMajor && (
                        <span 
                          className="text-[10px] font-black text-white bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 px-2 py-0.5 rounded-md shadow-xs ring-1 ring-amber-300/40 tracking-tight cursor-help"
                          title={major.contractMajor.partnerCompanies.map((c) => {
                            const s = getCompanySalary(c);
                            return s ? `${c}: 기본 ${s.baseSalary}원 (성과급 포함 시 ${s.totalSalary}원)` : c;
                          }).join(' | ')}
                        >
                          {major.contractMajor.partnerCompanies.join(' · ')}
                        </span>
                      )}
                      {isBookmarked && (
                        <span className="text-[10px] font-black text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-full flex items-center space-x-1">
                          ★ 관심 후보
                        </span>
                      )}
                      {isPending && (
                        <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                          △ 보류 중
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 학과명 및 눈높이별 설명 (초등학생: 쉬운 이름 / 중학생: 실생활 적용 사례) */}
                  <div className="mb-2">
                    {isEasyMode && easyInfo?.easyName ? (
                      <>
                        <span className="inline-block text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full mb-1">
                          🌱 초등학생 쉬운 이름
                        </span>
                        <h4 className="text-base font-black text-slate-900 tracking-tight">
                          {easyInfo.easyName}
                        </h4>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                          표준 학과명: {major.name}
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                          {major.name}
                        </h4>
                        {middleInfo?.realLifeExample && (
                          <div className="mt-1.5 inline-flex items-start text-xs text-indigo-950 bg-indigo-50/80 border border-indigo-200/90 rounded-lg px-2.5 py-1.5 leading-snug">
                            <span className="font-black text-indigo-700 shrink-0 mr-1.5">
                              💡 실생활 예시:
                            </span>
                            <span className="font-medium text-slate-700">
                              {middleInfo.realLifeExample}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* 감내 속성 뱃지 */}
                  {matchedTolerableTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {matchedTolerableTags.map((t) => (
                        <span
                          key={t.id}
                          className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-800 bg-amber-100/90 border border-amber-200 px-1.5 py-0.5 rounded-md"
                          title={t.label}
                        >
                          <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                          <span>{t.shortLabel} 감내</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 1줄 요약 */}
                  <p className={`text-xs leading-relaxed mb-2.5 line-clamp-3 ${
                    isEasyMode ? 'text-emerald-950 font-medium bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/70' : 'text-slate-600'
                  }`}>
                    {isEasyMode && easyInfo?.easySummary ? easyInfo.easySummary : major.summary}
                  </p>

                  {/* 계약학과인 경우 채용 기업 신입 초봉 요약 */}
                  {major.contractMajor && (
                    <div className="text-[10px] font-semibold text-amber-900 bg-amber-50/90 border border-amber-200/90 rounded-xl px-2.5 py-1.5 mb-2.5 flex items-center justify-between flex-wrap gap-1">
                      <span className="text-amber-800 font-bold flex items-center space-x-1 shrink-0">
                        <Briefcase className="w-3 h-3 text-amber-600" />
                        <span>{isEasyMode ? '첫해 받는 돈:' : '채용 초봉:'}</span>
                      </span>
                      <span className="text-slate-800 font-bold">
                        {isEasyMode && easyInfo?.easySalaryNote
                          ? easyInfo.easySalaryNote.split('!')[0] + '!'
                          : major.contractMajor.partnerCompanies.map((c) => {
                              const s = getCompanySalary(c);
                              return s ? `${c.split('(')[0]} 기본 ${s.baseSalary}(영끌 ${s.totalSalary})` : c;
                            }).join(' · ')
                        }
                      </span>
                    </div>
                  )}

                  {/* 특성 태그 */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {major.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* 개설 대학 요약 */}
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl mb-4 border border-slate-100">
                    <div className="font-semibold text-slate-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>개설 대학 (20개 중 {openedColleges.length}개교)</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 text-[10px] text-slate-600">
                      {openedColleges.slice(0, 7).map((c) => (
                        <span key={c.id} className="bg-white border border-slate-200 px-1 py-0.5 rounded">
                          {c.shortName}
                        </span>
                      ))}
                      {openedColleges.length > 7 && (
                        <span className="text-slate-400 self-center">
                          +{openedColleges.length - 7}곳 더보기
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* 하단 인터랙션 액션 버튼군 */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  
                  {isExcluded ? (
                    <button
                      onClick={() => handleRestore(major.id)}
                      className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>제외 취소하고 다시 후보로 복구</span>
                    </button>
                  ) : (
                    <div className="grid grid-cols-3 gap-1.5">
                      {/* 제외 버튼 */}
                      <button
                        onClick={() => handleExclude(major.id)}
                        className="py-2 px-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl text-xs font-semibold transition border border-transparent hover:border-rose-200 flex items-center justify-center space-x-1"
                        title="이 과는 제외하기"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>제외</span>
                      </button>

                      {/* 보류 버튼 */}
                      <button
                        onClick={() => handlePending(major.id)}
                        className={`py-2 px-2 rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-1 ${
                          isPending
                            ? 'bg-sky-600 text-white font-bold'
                            : 'bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600'
                        }`}
                        title="애매하니 나중에 다시 보기"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>보류</span>
                      </button>

                      {/* 관심 담기 버튼 */}
                      <button
                        onClick={() => handleBookmark(major.id)}
                        className={`py-2 px-2 rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-1 ${
                          isBookmarked
                            ? 'bg-amber-500 text-white font-bold shadow-2xs'
                            : 'bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-600'
                        }`}
                        title="최종 후보로 담아두기"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{isBookmarked ? '담김★' : '관심'}</span>
                      </button>
                    </div>
                  )}

                  {/* 상세 미리보기 버튼 */}
                  <button
                    onClick={() => setPreviewMajor(major)}
                    className="w-full py-1 text-[11px] text-slate-400 hover:text-indigo-600 flex items-center justify-center space-x-1 transition"
                  >
                    <Eye className="w-3 h-3" />
                    <span>전공 내용 & 취업 분야 엿보기</span>
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 간이 미리보기 팝업 모달 */}
      {previewMajor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {previewMajor.category} · {previewMajor.track}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {previewMajor.name}
                </h3>
                {getMiddleSchoolInfo(previewMajor.id)?.realLifeExample && (
                  <div className="mt-1 text-xs text-indigo-900 bg-indigo-50 border border-indigo-200/80 rounded-lg px-2.5 py-1">
                    <span className="font-extrabold text-indigo-700 mr-1.5">💡 실생활 적용 사례:</span>
                    <span>{getMiddleSchoolInfo(previewMajor.id).realLifeExample}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setPreviewMajor(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 대기업 계약학과 상세 안내 박스 */}
            {previewMajor.contractMajor && (
              <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-indigo-50 border border-amber-300 p-3.5 rounded-xl space-y-1.5 my-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-black bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-2xs">
                    <Briefcase className="w-3 h-3" />
                    {previewMajor.contractMajor.badgeText}
                  </span>
                  <span className="text-xs font-bold text-amber-950">
                    협약 기업: {previewMajor.contractMajor.partnerCompanies.join(', ')}
                  </span>
                </div>
                <div className="text-xs text-slate-800 font-semibold">
                  <strong>개설 대학 및 트랙:</strong> {previewMajor.contractMajor.univsText}
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {previewMajor.contractMajor.description}
                </p>
              </div>
            )}

            <div className="space-y-4 my-4 text-xs">
              <div>
                <div className="font-bold text-slate-700 mb-1">전공 개요</div>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {previewMajor.summary}
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-700 mb-1">핵심 커리큘럼</div>
                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-600">
                  {previewMajor.curriculum.map((c, i) => (
                    <div key={i}>{c}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-700 mb-1">중견·대기업 타깃 및 추천 부서</div>
                <div className="bg-indigo-50/70 p-3 rounded-xl border border-indigo-100 text-slate-700 space-y-1.5">
                  <div><strong>추천 기업군:</strong> {previewMajor.corporateTarget.examples.join(', ')}</div>
                  <div><strong>대표 실무 부서:</strong> {previewMajor.corporateTarget.departments.join(', ')}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[11px] text-slate-400">
                5개 이하로 좁히면 Step 3에서 비교 분석 리포트로 한눈에 비교됩니다.
              </span>
              <button
                onClick={() => setPreviewMajor(null)}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
