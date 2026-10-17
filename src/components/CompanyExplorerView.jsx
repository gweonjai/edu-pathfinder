import React, { useState, useMemo } from 'react';
import { 
  Building2, Search, Briefcase, GraduationCap, ChevronRight, 
  Sparkles, CheckCircle2, TrendingUp, Layers, ArrowUpRight, Award,
  Users, ArrowLeft, Filter, AlertTriangle, Info
} from 'lucide-react';
import { COMPANY_SALARY_MAP } from '../data/companySalaryData';
import { COMPANY_MAJOR_REQUIREMENTS } from '../data/companyMajorRequirementsData';
import { getCompanyHeadcount } from '../data/companyHeadcountData';

// 대학생 취업 선호도 우선순위 목록 (국내 대표 100대 기업 전수 반영)
const STUDENT_PREFERENCE_ORDER = [
  '삼성전자(DX)', '삼성전자(DS)', 'NAVER', '카카오', '현대자동차',
  'CJ제일제당', '쿠팡', 'SK하이닉스', '제일기획', '토스',
  '배달의민족', '당근', 'LG전자', '무신사', '대한항공',
  '호텔신라', 'CJ ENM', '카카오페이', '크래프톤', '삼성바이오로직스',
  '신세계', '아모레퍼시픽', 'LG생활건강', '미래에셋증권', '삼성증권',
  '한국투자증권', '키움증권', 'NH투자증권', '기아', 'LG에너지솔루션',
  '카카오뱅크', 'SM엔터테인먼트', 'JYP', '스튜디오드래곤', '엔씨소프트',
  '넷마블', '하이트진로', '오리온', '농심', '빙그레',
  '삼양식품', '삼성SDS', '이노션', 'HS애드', '대홍기획',
  '셀트리온', '알테오젠', '유한양행', '한미약품', '대웅제약',
  '종근당', 'GC녹십자', 'SK바이오팜', '삼천당제약', '오스템임플란트',
  '한국콜마', '코스맥스', 'GS칼텍스', 'SK텔레콤', 'KT',
  '인천국제공항공사', '한국전력공사', '한국토지주택공사', 'KOTRA', '금융결제원',
  '한국갤럽', '안랩', 'SK쉴더스', 'KB금융', '신한지주',
  '하나금융지주', '메리츠금융지주', '삼성생명', '삼성화재', 'POSCO홀딩스',
  '포스코퓨처엠', '현대모비스', '현대글로비스', '한화에어로스페이스', '한화오션',
  '현대로템', '두산에너빌리티', '현대건설', 'HD현대중공업', 'HD한국조선해양',
  '삼성중공업', 'HL만도', '현대위아', 'LG화학', 'SK이노베이션',
  'S-Oil', '삼성SDI', '에코프로비엠', '에코프로', '엘앤에프',
  'LG이노텍', '삼성전기', '한미반도체', 'DB하이텍', '리노공업'
];

// 유사 산업 분야별 인접 정렬 기준
const CATEGORY_ORDER = [
  '전체',
  // IT / 디지털 / 플랫폼 / 통신
  'IT/플랫폼',
  'IT/인터넷',
  'IT/이커머스',
  'IT/보안',
  '통신/서비스',
  // 반도체 / 전기전자 / 배터리소재
  '반도체/전자',
  '2차전지/소재',
  // 모빌리티 / 중공업 / 방산 / 건설
  '모빌리티/운송',
  '중공업/방산',
  '건설/중공업',
  // 에너지 / 화학
  '에너지/화학',
  '화학/정유',
  '화학/바이오',
  // 바이오 / 제약 / 뷰티
  '바이오/제약',
  '바이오/소비재',
  // 유통 / 커머스 / 식품
  '유통/커머스',
  '소비재/식품',
  '소비재/유통',
  // 미디어 / 엔터 / 광고
  '엔터/미디어',
  '광고/미디어',
  // 금융 / 증권 / 지주
  '금융/증권',
  '금융/지주',
  // 공기업 / 공공기관
  '공기업/공공'
];

export const CompanyExplorerView = ({ onSelectMajor, onBackToReport, onClose, initialCompany }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortMode, setSortMode] = useState('preference'); // 'preference' | 'marketCap' | 'category'
  const [selectedCompanyKey, setSelectedCompanyKey] = useState(initialCompany || '삼성전자(DX)');

  // initialCompany 변경 시 자동 선택 동기화
  React.useEffect(() => {
    if (initialCompany) {
      const matchedKey = Object.keys(COMPANY_MAJOR_REQUIREMENTS).find(
        (k) => k === initialCompany || k.includes(initialCompany) || initialCompany.includes(k)
      );
      if (matchedKey) {
        setSelectedCompanyKey(matchedKey);
        setSelectedCategory('전체');
      } else {
        setSelectedCompanyKey(initialCompany);
      }
    }
  }, [initialCompany]);

  // 회사 목록 키
  const companyKeys = useMemo(() => {
    return Object.keys(COMPANY_MAJOR_REQUIREMENTS);
  }, []);

  // 카테고리 목록 (유사 산업 분야 인접 정렬)
  const categories = useMemo(() => {
    const set = new Set(['전체']);
    companyKeys.forEach((key) => {
      const cat = COMPANY_MAJOR_REQUIREMENTS[key]?.category;
      if (cat) set.add(cat);
    });

    return Array.from(set).sort((a, b) => {
      const idxA = CATEGORY_ORDER.indexOf(a);
      const idxB = CATEGORY_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b, 'ko');
    });
  }, [companyKeys]);

  // 검색 및 필터링, 정렬된 회사 목록
  const filteredCompanyKeys = useMemo(() => {
    const list = companyKeys.filter((key) => {
      const matchSearch = key.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === '전체' || COMPANY_MAJOR_REQUIREMENTS[key]?.category === selectedCategory;
      return matchSearch && matchCat;
    });

    return list.sort((a, b) => {
      if (sortMode === 'preference') {
        const idxA = STUDENT_PREFERENCE_ORDER.indexOf(a);
        const idxB = STUDENT_PREFERENCE_ORDER.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b, 'ko');
      } else if (sortMode === 'marketCap') {
        const rankA = COMPANY_SALARY_MAP[a]?.marketCapRank ? parseInt(COMPANY_SALARY_MAP[a].marketCapRank, 10) : 9999;
        const rankB = COMPANY_SALARY_MAP[b]?.marketCapRank ? parseInt(COMPANY_SALARY_MAP[b].marketCapRank, 10) : 9999;
        if (rankA !== rankB) return rankA - rankB;
        return a.localeCompare(b, 'ko');
      } else if (sortMode === 'category') {
        const catA = COMPANY_MAJOR_REQUIREMENTS[a]?.category || '';
        const catB = COMPANY_MAJOR_REQUIREMENTS[b]?.category || '';
        if (catA !== catB) return catA.localeCompare(catB, 'ko');
        const idxA = STUDENT_PREFERENCE_ORDER.indexOf(a);
        const idxB = STUDENT_PREFERENCE_ORDER.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        return a.localeCompare(b, 'ko');
      }
      return 0;
    });
  }, [companyKeys, searchTerm, selectedCategory, sortMode]);

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

  return (
    <div className="flex flex-col lg:h-full lg:min-h-0 space-y-4">
      {/* 상단 와이드 헤더 배너 */}
      <div className="shrink-0 bg-gradient-to-r from-slate-100 via-indigo-50/50 to-slate-100 border border-slate-200/90 rounded-3xl p-5 sm:p-6 text-slate-800 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full uppercase tracking-wider">
                국내 대표 100대 기업 역탐색 대시보드
              </span>
              <span className="text-xs text-slate-500 font-medium">
                DART 공시 연봉 · 직군별 TO · 우대 학과 정밀 분석
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              어느 회사에 가고 싶나요? 목표 기업별 연봉과 필요한 전공을 찾아보세요
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              가고 싶은 회사를 선택하면 <strong>대졸 신입 초임 연봉</strong>, <strong>DART 공시 임직원 규모 및 직군별 인원 비중</strong>, 
              그리고 <strong>그 회사에 들어가기 위해 전공해야 할 핵심 학과</strong>를 한눈에 확인할 수 있습니다.
            </p>
          </div>

          {(onClose || onBackToReport) && (
            <button
              onClick={onClose || onBackToReport}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-2xl transition border border-slate-200 shadow-2xs flex items-center space-x-2 shrink-0 self-start md:self-center cursor-pointer"
              title={onClose ? "창 닫기 (ESC)" : "전공 심층 리포트로 돌아가기"}
            >
              {onClose ? (
                <>
                  <span className="text-sm font-black leading-none">✕</span>
                  <span>창 닫기</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4" />
                  <span>전공 심층 리포트로 돌아가기</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 메인 풀페이지 2열 레이아웃 */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-stretch w-full lg:flex-1 lg:min-h-0">
        
        {/* 좌측: 검색창 및 기업 리스트 탐색 패널 (너비 고정 320~384px, 데스크톱 고정 높이) */}
        <div className="w-full lg:w-80 xl:w-96 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm shrink-0 space-y-4 lg:h-full lg:flex lg:flex-col">
          
          {/* 검색창 */}
          <div className="relative shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="기업명 검색 (삼성, 현대, 네이버, 한화)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          {/* 카테고리 필터 칩 */}
          <div className="flex flex-wrap gap-1 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10.5px] px-2 py-0.5 rounded-lg font-bold leading-tight transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 기업 목록 스크롤 뷰 */}
          <div className="space-y-1.5 max-h-[600px] lg:max-h-none lg:flex-1 lg:min-h-0 overflow-y-auto pr-1 border-t border-slate-100 pt-2.5">
            <div className="flex items-center justify-between text-[11px] px-1 mb-1.5">
              <span className="text-slate-400 font-semibold">총 {filteredCompanyKeys.length}개 대상 기업</span>
              <div className="flex items-center space-x-1.5 text-[11px]">
                <button
                  onClick={() => setSortMode('preference')}
                  className={`font-bold transition cursor-pointer ${
                    sortMode === 'preference'
                      ? 'text-indigo-600 underline underline-offset-2'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  선호순
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => setSortMode('marketCap')}
                  className={`font-bold transition cursor-pointer ${
                    sortMode === 'marketCap'
                      ? 'text-indigo-600 underline underline-offset-2'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  시총순
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => setSortMode('category')}
                  className={`font-bold transition cursor-pointer ${
                    sortMode === 'category'
                      ? 'text-indigo-600 underline underline-offset-2'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  분야별
                </button>
              </div>
            </div>
            {filteredCompanyKeys.map((key) => {
              const isSelected = selectedCompanyKey === key;
              const compData = COMPANY_SALARY_MAP[key];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCompanyKey(key)}
                  className={`w-full text-left p-3 rounded-2xl transition flex items-center justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/80 hover:border-indigo-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black truncate max-w-[150px]">
                        {compData?.company || key}
                      </span>
                      {compData?.marketCapRank && (
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                          isSelected ? 'bg-indigo-500/50 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          시총 {compData.marketCapRank}위
                        </span>
                      )}
                    </div>
                    <div className={`text-[11px] font-medium mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                      대졸 초임 {compData?.baseSalary}원
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition group-hover:translate-x-0.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

        </div>

        {/* 우측: 선택한 기업의 방대한 풀페이지 상세 대시보드 (독립 스크롤) */}
        <div className="flex-1 min-w-0 space-y-6 w-full lg:h-full lg:overflow-y-auto lg:pr-2">
          
          {/* 1. 기업 헤더 및 연봉 카드 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-0.5 rounded-full">
                    {activeReq.category} 분야 핵심 기업
                  </span>
                  {activeCompany.marketCapRank && (
                    <span className="text-xs font-extrabold text-amber-800 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full">
                      국내 시가총액 {activeCompany.marketCapRank}위
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {activeCompany.company}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 block font-medium">DART 공시 및 채용포털 취합 대졸 신입 초임</span>
                <span className="text-sm font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mt-1">
                  성과급 포함 {activeCompany.totalSalary}원
                </span>
              </div>
            </div>

            {/* 연봉 2개 지표 박스 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/80">
                <span className="text-xs text-indigo-900 font-bold block">대졸 신입 고정 기본급</span>
                <span className="text-xl sm:text-2xl font-black text-indigo-950 mt-1 block">
                  {activeCompany.baseSalary}원
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  * 비과세 수당·인센티브를 제외한 순수 고정 계약 연봉
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <span className="text-xs text-emerald-900 font-bold block">성과급/상여 포함 체감 총액</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-950 mt-1 block">
                  {activeCompany.totalSalary}원
                </span>
                <span className="text-[11px] text-emerald-800 mt-1 block font-medium" title={activeCompany.incentiveNote}>
                  ℹ {activeCompany.incentiveNote}
                </span>
              </div>
            </div>

            {/* 주요 채용 사업부 / 부서 */}
            {activeReq.hiringDepartments?.length > 0 && (
              <div className="text-xs text-slate-600 flex items-center space-x-2 pt-1 flex-wrap gap-1.5">
                <span className="font-bold text-slate-800 shrink-0 flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>주요 채용 조직(사업부):</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeReq.hiringDepartments.map((dept, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. 4년제 대졸 진출 직군별 인원 비중 및 채용 규모 (DART 공시 기준) */}
          {activeHeadcount && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2.5 flex-wrap gap-1">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-base font-black text-slate-900">
                        🎓 4년제 대졸 진출 직군별 인원 비중 (DART 공시 기준)
                      </h4>
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-extrabold">
                        대졸 이상 취업 풀
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      대학(학사/석·박사) 졸업생이 공채·수시로 입사하는 직군(R&D, 대졸 엔지니어, 영업, 기획) 기준 100% 비중입니다.
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                    전사 규모: {activeHeadcount.totalEmployees}
                  </span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                    activeHeadcount.jobQuotaGrade === '대규모'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : activeHeadcount.jobQuotaGrade === '안정적'
                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {activeHeadcount.jobQuotaGrade === '대규모' ? '🟢 대규모 채용 (TO 최상위)' :
                     activeHeadcount.jobQuotaGrade === '안정적' ? '🟡 안정적 채용 (상시 TO 확보)' :
                     '🟠 소수정예 채용 (집중 선발)'}
                  </span>
                </div>
              </div>

              {/* 채용 시장 한 줄 평가 */}
              <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold">{activeHeadcount.jobQuotaText}</span>
              </div>

              {/* 다채색 직군별 누적 바 그래프 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span className="flex items-center space-x-1.5">
                    <span>직군별 인원 비중</span>
                    <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded font-bold">
                      대학 졸업생 진출 직군 합계 100%
                    </span>
                  </span>
                  <span>대졸 취업 TO 누적</span>
                </div>
                <div className="h-4 w-full rounded-full flex overflow-hidden bg-slate-100 shadow-inner">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                {activeHeadcount.breakdown.map((item, idx) => (
                  <div key={idx} className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5 hover:bg-white hover:shadow-xs transition">
                    {/* 1행: 직군 분류 태그 & 직군 전체 명칭 */}
                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                      {item.roleType === 'rnd' && (
                        <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-bold shrink-0">
                          연구·설계
                        </span>
                      )}
                      {item.roleType === 'engineer' && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold shrink-0">
                          엔지니어
                        </span>
                      )}
                      {item.roleType === 'biz' && (
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold shrink-0">
                          영업·마케팅
                        </span>
                      )}
                      {item.roleType === 'mgmt' && (
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold shrink-0">
                          경영·전략
                        </span>
                      )}
                      <span className="text-xs font-black text-slate-900 leading-snug">
                        {item.role}
                      </span>
                    </div>

                    {/* 2행: 인원수(명수) 및 우측 퍼센티지(%) 비중 */}
                    <div className="flex items-center space-x-2 pt-0.5">
                      <span className="text-sm font-black text-slate-900">
                        {item.count}
                      </span>
                      <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-lg shadow-2xs">
                        {item.percent}%
                      </span>
                    </div>

                    {/* 3행: 진출 핵심 전공 */}
                    <div className="text-[11px] text-slate-500 truncate pt-0.5" title={item.majorGroup}>
                      진출 전공: <span className="font-bold text-slate-700">{item.majorGroup}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* [신규 기능] 현장 단순 조립·생산 기능직(오퍼레이터) 별도 분리 안내 배너 */}
              {activeHeadcount.operatorInfo && (
                <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mt-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 font-black text-amber-950">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>⚠️ 현장 조립·생산 기능직(오퍼레이터) 분리 집계 안내</span>
                      <span className="text-[10px] bg-amber-200/90 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full font-extrabold">
                        고졸·전문학사 전형
                      </span>
                    </div>
                    <p className="text-amber-800 leading-relaxed font-medium">
                      공시 상 집계되는 <strong>{activeHeadcount.operatorInfo.roleName} ({activeHeadcount.operatorInfo.count})</strong>은 
                      {activeHeadcount.operatorInfo.note || '별도 기술직/생산직 전형으로 선발되며, 4년제 대졸 공채 풀과 구분됩니다.'}
                    </p>
                  </div>
                  <div className="shrink-0 self-start sm:self-center">
                    <span className="text-[11px] font-bold text-amber-900 bg-white border border-amber-300 px-3 py-1.5 rounded-xl shadow-2xs block">
                      대졸 취업 통계에서 분리 완료
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. 핵심: 입사에 필요한 추천 우대 전공(학과) 매핑 카드 목록 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {activeCompany.company} 입사 시 핵심 우대 전공(학과)
                  </h4>
                  <p className="text-xs text-slate-500">
                    이 회사 공채 및 수시채용에서 가장 선호하는 전공과 구체적인 지원 사유입니다.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full self-start sm:self-auto">
                카드의 [리포트 보기]를 누르면 해당 학과의 심층 리포트로 즉시 이동합니다
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {activeReq.recommendedMajors?.map((majorItem, mIdx) => (
                <div
                  key={mIdx}
                  className="p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black text-indigo-950 group-hover:text-indigo-600 transition flex items-center space-x-1">
                        <span>{majorItem.name}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                      </span>
                      <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                        핵심 우대
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {majorItem.reason}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectMajor && majorItem.id) {
                        onSelectMajor(majorItem.id);
                      }
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shrink-0 flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    <span>{majorItem.name} 리포트 보기</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
