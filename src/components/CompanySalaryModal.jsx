import React, { useState, useMemo } from 'react';
import { 
  Building2, Search, X, Briefcase, GraduationCap, ChevronRight, 
  Sparkles, CheckCircle2, TrendingUp, Layers, ArrowUpRight, Award,
  Users, PieChart
} from 'lucide-react';
import { COMPANY_SALARY_MAP } from '../data/companySalaryData';
import { getCompanyHeadcount } from '../data/companyHeadcountData';
import { COMPANY_MAJOR_REQUIREMENTS } from '../data/companyMajorRequirementsData';
import { MAJORS_DATA } from '../data/departmentsData';

export const CompanySalaryModal = ({ isOpen, onClose, onSelectMajor, initialCompany }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedCompanyKey, setSelectedCompanyKey] = useState(initialCompany || '삼성전자(DS)');

  // initialCompany 변경 시 자동 선택 동기화
  React.useEffect(() => {
    if (initialCompany) {
      // 정확한 매칭 또는 부분 매칭 찾기
      const matchedKey = Object.keys(COMPANY_MAJOR_REQUIREMENTS).find(
        (k) => k === initialCompany || k.includes(initialCompany) || initialCompany.includes(k)
      );
      if (matchedKey) {
        setSelectedCompanyKey(matchedKey);
        const cat = COMPANY_MAJOR_REQUIREMENTS[matchedKey]?.category;
        if (cat) setSelectedCategory('전체');
      } else {
        setSelectedCompanyKey(initialCompany);
      }
    }
  }, [initialCompany, isOpen]);

  // 회사 목록
  const companyKeys = useMemo(() => {
    return Object.keys(COMPANY_MAJOR_REQUIREMENTS);
  }, []);

  // 카테고리 목록
  const categories = useMemo(() => {
    const set = new Set(['전체']);
    companyKeys.forEach((key) => {
      const cat = COMPANY_MAJOR_REQUIREMENTS[key]?.category;
      if (cat) set.add(cat);
    });
    return Array.from(set);
  }, [companyKeys]);

  // 검색 및 필터링된 회사 목록
  const filteredCompanyKeys = useMemo(() => {
    return companyKeys.filter((key) => {
      const matchSearch = key.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === '전체' || COMPANY_MAJOR_REQUIREMENTS[key]?.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [companyKeys, searchTerm, selectedCategory]);

  const activeCompany = COMPANY_SALARY_MAP[selectedCompanyKey] || {
    company: selectedCompanyKey,
    baseSalary: '4,800만 ~ 5,300만',
    totalSalary: '6,000만 ~ 7,500만',
    incentiveNote: '국내 주요 50대 기업 대졸 신입 표준 기준'
  };

  const activeReq = COMPANY_MAJOR_REQUIREMENTS[selectedCompanyKey] || {
    category: '일반',
    recommendedMajors: [],
    hiringDepartments: []
  };

  const activeHeadcount = useMemo(() => {
    return getCompanyHeadcount(selectedCompanyKey);
  }, [selectedCompanyKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 상단 헤더 */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shadow-inner">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  국내 시총 50대 핵심 기업 역탐색
                </span>
                <span className="text-[10px] bg-indigo-500/40 text-indigo-200 px-2 py-0.5 rounded-full font-medium">
                  총 {companyKeys.length}개 주요 기업
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight mt-0.5">
                주요 기업별 최신 연봉 & 입사 필요 전공(학과) 역탐색
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 메인 2열 레이아웃 */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* 좌측: 기업 리스트 및 검색 패널 */}
          <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50/70 p-4 flex flex-col shrink-0">
            {/* 검색창 */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="기업명 검색 (삼성, 현대, 네이버, 한화)..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs"
              />
            </div>

            {/* 카테고리 필터 칩 */}
            <div className="flex flex-wrap gap-1 mb-3 pb-2 border-b border-slate-200 max-h-24 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] px-2 py-0.5 rounded-lg font-bold transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 기업 목록 스크롤 뷰 */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-60 md:max-h-none">
              {filteredCompanyKeys.map((key) => {
                const isSelected = selectedCompanyKey === key;
                const compData = COMPANY_SALARY_MAP[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCompanyKey(key)}
                    className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/80 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-black truncate max-w-[150px]">
                          {compData?.company || key}
                        </span>
                        {compData?.marketCapRank && (
                          <span className={`text-[9px] font-extrabold px-1 rounded-sm ${
                            isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {compData.marketCapRank}위
                          </span>
                        )}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                        기본급 {compData?.baseSalary}원
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 우측: 선택한 기업의 상세 연봉 & 필요 전공 매핑 카드 */}
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6">
            
            {/* 기업 헤더 및 연봉 카드 */}
            <div className="bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 rounded-2xl p-5 border border-indigo-100 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100/70 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-0.5 rounded-full">
                      {activeReq.category} 분야 핵심 기업
                    </span>
                    {activeCompany.marketCapRank && (
                      <span className="text-[11px] font-extrabold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                        국내 시총 {activeCompany.marketCapRank}위
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mt-1">
                    {activeCompany.company}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">DART 및 채용 포털 취합 대졸 신입</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    성과급 포함 {activeCompany.totalSalary}원
                  </span>
                </div>
              </div>

              {/* 연봉 2개 지표 박스 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium block">대졸 신입 고정 기본급</span>
                  <span className="text-base sm:text-lg font-black text-indigo-950 mt-0.5 block">
                    {activeCompany.baseSalary}원
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    * 비과세 수당·인센티브 제외 순수 계약 연봉
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 shadow-2xs">
                  <span className="text-[11px] text-emerald-800 font-medium block">성과급/상여 포함 체감 총액</span>
                  <span className="text-base sm:text-lg font-black text-emerald-950 mt-0.5 block">
                    {activeCompany.totalSalary}원
                  </span>
                  <span className="text-[10px] text-emerald-700/80 mt-0.5 block truncate" title={activeCompany.incentiveNote}>
                    ℹ {activeCompany.incentiveNote}
                  </span>
                </div>
              </div>

              {/* 주요 채용 사업부 / 부서 */}
              {activeReq.hiringDepartments?.length > 0 && (
                <div className="text-xs text-slate-600 flex items-center space-x-2 pt-1 flex-wrap gap-1">
                  <span className="font-bold text-slate-700 shrink-0 flex items-center space-x-1">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    <span>주요 채용 조직:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeReq.hiringDepartments.map((dept, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px] font-medium">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 직군별 인원 구성 및 채용 규모 (DART 공시 기준) */}
            {activeHeadcount && (
              <div className="bg-slate-50/90 rounded-2xl p-4.5 border border-slate-200/90 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-200 pb-2.5">
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                    <h5 className="text-xs font-black text-slate-900">
                      임직원 규모 및 직군별 인원 구성 (DART 공시 기준)
                    </h5>
                    <span className="text-[11px] font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                      총 임직원: {activeHeadcount.totalEmployees}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                      activeHeadcount.jobQuotaGrade === '대규모'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : activeHeadcount.jobQuotaGrade === '안정적'
                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}>
                      {activeHeadcount.jobQuotaGrade === '대규모' ? '🟢 채용 규모: 대규모 (TO 최상위)' :
                       activeHeadcount.jobQuotaGrade === '안정적' ? '🟡 채용 규모: 안정적 (상시 TO 확보)' :
                       '🟠 채용 규모: 소수정예 (집중 선발)'}
                    </span>
                  </div>
                </div>

                {/* 채용 시장 한 줄 평가 */}
                <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center space-x-2 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-semibold">{activeHeadcount.jobQuotaText}</span>
                </div>

                {/* 다채색 직군별 누적 바 그래프 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                    <span>직군별 인원 비중(%)</span>
                    <span>DART 공시 인원 비중</span>
                  </div>
                  <div className="h-3.5 w-full rounded-full flex overflow-hidden bg-slate-200 shadow-inner">
                    {activeHeadcount.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        style={{ width: `${item.percent}%` }}
                        className={`${item.color} relative group transition-all duration-300 hover:brightness-110 cursor-pointer`}
                        title={`${item.role}: ${item.percent}% (${item.count})`}
                      />
                    ))}
                  </div>
                </div>

                {/* 직군별 세부 카드 그리드 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {activeHeadcount.breakdown.map((item, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-slate-800 truncate" title={item.role}>
                          {item.role}
                        </span>
                        <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                          {item.percent}%
                        </span>
                      </div>
                      <div className="text-xs font-black text-slate-900">
                        {item.count}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate" title={item.majorGroup}>
                        주요 전공: <span className="font-bold text-slate-700">{item.majorGroup}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 핵심: 입사에 필요한 추천 전공(학과) 매핑 카드 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900">
                      {activeCompany.company} 입사 시 핵심 우대 전공(학과)
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      이 회사 공채 및 수시채용에서 가장 선호하는 전공과 구체적인 지원 사유입니다.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-indigo-600 font-bold hidden sm:inline">
                  카드를 클릭하면 해당 전공 심층 리포트로 이동합니다
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {activeReq.recommendedMajors?.map((majorItem, mIdx) => (
                  <div
                    key={mIdx}
                    onClick={() => {
                      if (onSelectMajor && majorItem.id) {
                        onSelectMajor(majorItem.id);
                        onClose();
                      }
                    }}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-black text-indigo-900 group-hover:text-indigo-600 transition flex items-center space-x-1">
                          <span>{majorItem.name}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          우대 전공
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {majorItem.reason}
                      </p>
                    </div>

                    <button
                      className="bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shrink-0 flex items-center justify-center space-x-1"
                    >
                      <span>리포트 보기</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* 모달 하단 푸터 */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>* 본 연봉 및 채용 데이터는 2024~2025 DART 공시, 알리오, 주요 채용 포털(잡코리아·잡플래닛·블라인드)의 직무별 합격자 통계를 바탕으로 구성되었습니다.</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-1.5 rounded-xl transition cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
