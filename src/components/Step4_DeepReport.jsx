import React, { useState, useMemo, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { MAJORS_DATA } from '../data/departmentsData';
import { COLLEGES } from '../data/collegesData';
import { DISLIKE_TAGS, PREFERENCE_TAGS } from '../data/tendencyData';
import { getCompanySalary } from '../data/companySalaryData';
import { getCompanyHeadcount } from '../data/companyHeadcountData';
import { getMajorJobSalaries } from '../data/jobSalaryData';
import { getEasyMajorInfo, getEasyFitHeadline } from '../data/easyLanguageData';

import { getMiddleSchoolInfo } from '../data/middleSchoolData';
import { 
  Building2, Briefcase, GraduationCap, Lock, Sparkles, ArrowRight, 
  CheckCircle2, ArrowLeft, BookmarkCheck, Bookmark, HelpCircle, Layers, BookOpen, ShieldCheck,
  Compass, AlertTriangle, Check, Award, Brain, Target, ShieldAlert,
  Users, PieChart, Star
} from 'lucide-react';
import { AiConsultantReport } from './AiConsultantReport';
import { AiMajorMentorChat } from './AiMajorMentorChat';
import { CompanySalaryModal } from './CompanySalaryModal';
import { CompanyExplorerView } from './CompanyExplorerView';

export const Step4_DeepReport = ({ onGoToStep3, onGoToStep5, targetMajorId, onOpenCompanyExplorer }) => {
  const { childData, updateChildData, activeProfile, isEasyMode, isMiddleMode, isHighMode, educationTier } = useProfile();
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [selectedModalCompany, setSelectedModalCompany] = useState(null);
  const [viewMode, setViewMode] = useState('majorReport'); // 'majorReport' | 'companyExplorer'

  // 대상 후보 학과 추출: 관심 담긴 학과 + 보류 학과
  const bookmarked = useMemo(() => MAJORS_DATA.filter((m) => childData.bookmarkedMajors.includes(m.id)), [childData.bookmarkedMajors]);
  const pending = useMemo(() => MAJORS_DATA.filter((m) => childData.pendingMajors.includes(m.id)), [childData.pendingMajors]);
  const remainingActive = useMemo(() => MAJORS_DATA.filter((m) => !childData.excludedMajors.includes(m.id)), [childData.excludedMajors]);

  // 1단계 성향 및 2단계 선호 과목을 종합한 맞춤 추천 학과 계산 (Top 6)
  const recommendedMajors = useMemo(() => {
    const answers = childData.tendencyAnswers || {};
    const answerValues = Object.values(answers);
    const mathCount = answerValues.filter((v) => v === '이과').length;
    const liberalCount = answerValues.filter((v) => v === '문과').length;
    const dominantTrack = mathCount > liberalCount ? '이과' : liberalCount > mathCount ? '문과' : null;

    const preferenceLevels = childData.preferenceLevels || {};
    const activeHigh = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'high');
    const activeMedium = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'medium');
    const activeLow = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'low');
    const activeDislike = Object.keys(preferenceLevels).filter((k) => preferenceLevels[k] === 'dislike');

    const highTags = PREFERENCE_TAGS.filter((t) => activeHigh.includes(t.id)).flatMap((t) => t.matchedTags);
    const mediumTags = PREFERENCE_TAGS.filter((t) => activeMedium.includes(t.id)).flatMap((t) => t.matchedTags);
    const lowTags = PREFERENCE_TAGS.filter((t) => activeLow.includes(t.id)).flatMap((t) => t.matchedTags);
    const dislikeTags = PREFERENCE_TAGS.filter((t) => activeDislike.includes(t.id)).flatMap((t) => t.matchedTags);

    const excludedSet = new Set(childData.excludedMajors || []);

    return MAJORS_DATA.filter((major) => {
      if (excludedSet.has(major.id)) return false;
      if (major.tags.some((t) => dislikeTags.includes(t))) return false;
      return true;
    }).map((major) => {
      let score = 0;
      major.tags.forEach((tag) => {
        if (highTags.includes(tag)) score += 3;
        if (mediumTags.includes(tag)) score += 1;
        if (lowTags.includes(tag)) score -= 1;
      });
      // 1단계 문/이과 성향 일치 시 가산점 +2
      if (dominantTrack && major.track === dominantTrack) {
        score += 2;
      }
      return { ...major, matchScore: score };
    })
    .filter((m) => m.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
  }, [childData.tendencyAnswers, childData.preferenceLevels, childData.excludedMajors]);

  // 4단계 대상 학과 목록: 사용자가 직접 관심(★) 등록한 학과 (+ 보류 학과)
  const allCandidates = useMemo(() => {
    const candidates = [];
    bookmarked.forEach((m) => candidates.push(m));
    pending.forEach((m) => {
      if (!candidates.some((c) => c.id === m.id)) {
        candidates.push(m);
      }
    });
    return candidates;
  }, [bookmarked, pending]);

  const isLocked = allCandidates.length === 0;

  // 기본 선택: 관심 학과 우선, 없으면 보류 학과
  const [selectedMajorId, setSelectedMajorId] = useState(bookmarked[0]?.id || pending[0]?.id || null);

  // 기업 역탐색에서 전공 선택 시 처리 (모달 및 풀페이지 공통)
  const handleSelectMajorFromCompany = (majorId) => {
    if (!majorId) return;
    // 만약 아직 관심이나 보류에 등록되지 않은 전공이면 자동으로 관심 전공에 추가
    if (!childData.bookmarkedMajors.includes(majorId)) {
      updateChildData({
        bookmarkedMajors: Array.from(new Set([...childData.bookmarkedMajors, majorId])),
        excludedMajors: childData.excludedMajors.filter((id) => id !== majorId)
      });
    }
    setSelectedMajorId(majorId);
    setViewMode('majorReport');
    setIsCompanyModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 기업 카드 클릭 시 해당 기업 정보 모달 열기
  const handleOpenCompanyModal = (companyName) => {
    setSelectedModalCompany(companyName);
    setIsCompanyModalOpen(true);
  };

  // 후보 목록 변경 시 selectedMajorId 유효성 동기화 (전체 전공 DB에 있는 유효한 전공이면 보존)
  useEffect(() => {
    if (allCandidates.length > 0 && selectedMajorId && !allCandidates.some((m) => m.id === selectedMajorId)) {
      const existsInAll = MAJORS_DATA.some((m) => m.id === selectedMajorId);
      if (!existsInAll) {
        setSelectedMajorId(bookmarked[0]?.id || pending[0]?.id || allCandidates[0].id);
      }
    }
  }, [allCandidates, selectedMajorId, bookmarked, pending]);

  // 상위(App/헤더)에서 targetMajorId가 전달되면 즉시 선택 학과로 활성화
  useEffect(() => {
    if (targetMajorId) {
      setSelectedMajorId(targetMajorId);
      setViewMode('majorReport');
    }
  }, [targetMajorId]);

  // 현재 상세 선택된 학과 객체 (MAJORS_DATA 직접 매칭을 우선하여 비동기 지연 없이 즉시 화면 렌더링)
  const activeMajor = 
    allCandidates.find((m) => m.id === selectedMajorId) ||
    MAJORS_DATA.find((m) => m.id === selectedMajorId) ||
    bookmarked[0] ||
    pending[0] ||
    allCandidates[0];
  const easyActiveInfo = isEasyMode && activeMajor ? getEasyMajorInfo(activeMajor.id) : null;
  const middleActiveInfo = !isEasyMode && activeMajor ? getMiddleSchoolInfo(activeMajor.id) : null;
  const jobSalaries = useMemo(
    () => (activeMajor ? getMajorJobSalaries(activeMajor.id, activeMajor.category) : []),
    [activeMajor]
  );

  // 학과별 대기업 일자리 파이 및 진출 직군 규모 분석
  const majorJobMarketStats = useMemo(() => {
    if (!activeMajor) return null;
    const targetCompanies = activeMajor.corporateTarget?.examples || [];
    
    // 타깃 기업들의 headcount 데이터 취합
    const companyHeadcounts = targetCompanies.map((c) => ({
      name: c,
      data: getCompanyHeadcount(c)
    })).filter((c) => c.data);

    let quotaLevel = '안정적';
    let quotaTag = '🟡 안정적 TO 군';
    let quotaSummary = '전 산업군에 걸쳐 상시 채용 인원이 유지되는 안정적 채용 직군입니다.';
    let mainRoles = [];

    const category = activeMajor.category;
    if (category === '공학') {
      quotaLevel = '대규모';
      quotaTag = '🟢 대규모 채용군 (대기업 전체 TO의 70~80% 집중)';
      quotaSummary = '반도체·배터리·모빌리티 등 국내 시총 50대 주력 제조 대기업의 R&D 및 제조·공정기술 직군으로 매년 수천 명 단위 대규모 일자리가 열립니다.';
      mainRoles = [
        { role: '연구개발(R&D) 및 제품 설계', share: '40 ~ 55%', desc: '신제품 설계, 회로/기구/소재/SW 코어 알고리즘 개발' },
        { role: '제조·공정기술 및 품질 엔지니어링', share: '30 ~ 45%', desc: '생산 수율 최적화, 첨단 Fab 및 스마트공장 공정 제어' }
      ];
    } else if (category === '자연' || category === '의약') {
      if (activeMajor.id === 'computer_science' || activeMajor.id === 'ai') {
        quotaLevel = '대규모';
        quotaTag = '🟢 대규모 채용군 (SW·AI IT 인력 최우선 확보)';
        quotaSummary = '빅테크뿐 아니라 전자·자동차·금융 등 전 대기업의 AI·소프트웨어 전환(DX)으로 채용 일자리 풀이 매우 풍부합니다.';
        mainRoles = [
          { role: '소프트웨어 코어 개발 & 플랫폼', share: '50 ~ 65%', desc: '백엔드/클라우드/온디바이스 시스템 설계 및 배포' },
          { role: '데이터 사이언스 & AI 모델링', share: '20 ~ 30%', desc: '빅데이터 분석 및 초거대 AI 알고리즘 파이프라인 구축' }
        ];
      } else {
        quotaLevel = '안정적';
        quotaTag = '🟡 전문 R&D 직군 중심 채용 (석·박사 연계 우대)';
        quotaSummary = '바이오·소재·화학·분석 분야 기업부설연구소 및 품질관리(QC/QA) 전문 직군으로 꾸준한 채용 규모가 유지됩니다.';
        mainRoles = [
          { role: '첨단 신소재/바이오 기초 R&D', share: '40 ~ 60%', desc: '물질 합성, 약물 스크리닝 및 화학·물리 특성 분석' },
          { role: '품질분석(QC) 및 공정 분석', share: '25 ~ 35%', desc: 'GMP 규격 준수 및 신뢰성 정밀 시험' }
        ];
      }
    } else if (category === '사회' || category === '인문') {
      if (['business', 'economics', 'statistics'].includes(activeMajor.id)) {
        quotaLevel = '안정적';
        quotaTag = '🟡 전 산업군 필수 배치 직군 (상시 채용 풀 확보)';
        quotaSummary = '국내 시총 50대 기업의 글로벌 영업·마케팅, 전략기획, 재무, SCM 직군에 필수 배치되어 매년 채용 기회가 상시 열려 있습니다.';
        mainRoles = [
          { role: '국내외 B2B/B2C 영업 및 마케팅', share: '10 ~ 15%', desc: '해외 시장 개척, 수주 영업 및 글로벌 채널 파트너십' },
          { role: '경영전략·재무회계·인사(HR)', share: '5 ~ 8%', desc: '중장기 사업 전략 수립, 자금 조달 및 조직 운영' }
        ];
      } else {
        quotaLevel = '소수정예';
        quotaTag = '🟠 소수정예 집중 선발 직군 (직무 포트폴리오 중심)';
        quotaSummary = '브랜드 마케팅, 홍보(PR), 콘텐츠 기획, 대외협력 등 본사 스태프 중심의 소수 TO로 선발되므로 인턴 및 실무 역량이 중요합니다.';
        mainRoles = [
          { role: '브랜드 마케팅 & 디지털 커뮤니케이션', share: '3 ~ 6%', desc: '캠페인 기획, 퍼포먼스 마케팅, 미디어 콘텐츠 운영' },
          { role: '홍보·대외협력 & 전략 기획', share: '2 ~ 4%', desc: '언론 홍보, CSR, 대외 공공기관 및 대관 업무' }
        ];
      }
    } else {
      quotaLevel = '소수정예';
      quotaTag = '🟠 전문 포지션 집중 선발 (포트폴리오 중심)';
      quotaSummary = '기업 내 UI/UX 디자인, 브랜드 아이덴티티, 미디어 콘텐츠 등 특화된 전문 디자이너/기획자 포지션으로 채용됩니다.';
      mainRoles = [
        { role: 'UI/UX 및 제품·브랜드 디자인', share: '3 ~ 5%', desc: '사용자 경험 설계 및 브랜드 시각 디자인 시스템' },
        { role: '디지털 콘텐츠 크리에이티브', share: '2 ~ 4%', desc: '영상, 모션그래픽, 인터랙티브 미디어 제작' }
      ];
    }

    return {
      quotaLevel,
      quotaTag,
      quotaSummary,
      mainRoles,
      targetCompaniesCount: targetCompanies.length,
      sampleCompanies: companyHeadcounts.slice(0, 4)
    };
  }, [activeMajor]);


  // 관심/보류 토글 액션 (Step 3에서 직접 승격 가능)
  const handleToggleBookmark = (majorId) => {
    const isAlreadyBookmarked = childData.bookmarkedMajors.includes(majorId);
    if (isAlreadyBookmarked) {
      updateChildData({
        bookmarkedMajors: childData.bookmarkedMajors.filter((id) => id !== majorId),
        pendingMajors: Array.from(new Set([...childData.pendingMajors, majorId])),
      });
    } else {
      updateChildData({
        bookmarkedMajors: Array.from(new Set([...childData.bookmarkedMajors, majorId])),
        pendingMajors: childData.pendingMajors.filter((id) => id !== majorId),
      });
    }
  };

  // 1단계 생각 스타일(성향) 판별 결과 추출
  const answers = childData.tendencyAnswers || {};
  const answerValues = Object.values(answers);
  const mathCount = answerValues.filter((v) => v === '이과').length;
  const liberalCount = answerValues.filter((v) => v === '문과').length;
  const fusionCount = answerValues.filter((v) => v === '융합').length;
  const totalAnswered = answerValues.length;

  const tendencyAnalysis = useMemo(() => {
    let type = '융합';
    let label = '문·이과 융합형 성향';
    let summaryText = '문과와 이과의 장점을 고루 갖춘 유연한 문제 해결자';
    if (totalAnswered > 0) {
      if (mathCount >= 3 && mathCount > liberalCount) {
        type = '이과';
        label = '이과(자연·공학) 탐구 성향';
        summaryText = '원리를 파고들어 확실한 정답과 시스템을 구축하는 탐구자';
      } else if (liberalCount >= 3 && liberalCount > mathCount) {
        type = '문과';
        label = '문과(인문·사회) 소통 성향';
        summaryText = '사람의 심리와 사회적 맥락을 읽고 소통을 이끄는 기획자';
      }
    }
    return { type, label, summaryText, mathCount, liberalCount, fusionCount, totalAnswered };
  }, [mathCount, liberalCount, fusionCount, totalAnswered]);

  // 1단계 성향 vs 현재 학과 전공 핏(Fit) 정밀 분석
  const majorFitAnalysis = useMemo(() => {
    if (!activeMajor) return null;
    const { type: userType, label: userLabel } = tendencyAnalysis;
    const majorTrack = activeMajor.track;

    if (isEasyMode) {
      const easyFit = getEasyFitHeadline(userType, majorTrack, activeMajor.name);
      return {
        fitScore: easyFit.fitScore,
        matchType: easyFit.matchType,
        fitHeadline: easyFit.headline,
        fitDescription: easyFit.desc
      };
    }

    let fitScore = 95;
    let matchType = '성향 일치';
    let fitHeadline = '';
    let fitDescription = '';

    if (userType === majorTrack) {
      fitScore = 98;
      matchType = '본질 성향 100% 일치';
      if (majorTrack === '이과') {
        fitHeadline = `학생의 [원리 탐구 & 시스템 메커니즘 설계] 성향과 완벽히 부합합니다.`;
        fitDescription = `1단계 6개 질문에서 확인된 원인 역추적 및 논리적 해답 규명 성향이 ${activeMajor.name}의 학술 연구 및 기술 구현 과정과 최상의 조화를 이룹니다. 전공 공부를 할수록 높은 몰입도를 발휘할 수 있습니다.`;
      } else {
        fitHeadline = `학생의 [사람 중심 소통 & 사회적 맥락 통찰] 성향과 완벽히 부합합니다.`;
        fitDescription = `1단계에서 나타난 다각도의 관점 이해와 언어적 정리 능력이 ${activeMajor.name}의 사회과학·인문학적 연구 및 커뮤니케이션 실무와 정확하게 일치합니다. 현상을 입체적으로 해석하는 데 탁월한 강점을 가집니다.`;
      }
    } else if (userType === '융합' || majorTrack === '융합') {
      fitScore = 93;
      matchType = '학제간 융합 시너지';
      fitHeadline = `학생의 [유연한 균형 감각 & 다각도 최적화] 성향과 뛰어난 시너지를 냅니다.`;
      fitDescription = `특정 분야에 치우치지 않고 데이터와 사람의 반응을 골고루 고려하는 균형 감각이 ${activeMajor.name}에서 요구하는 다학제적 문제 해결 능력과 훌륭하게 맞물립니다.`;
    } else {
      fitScore = 88;
      matchType = '차별화 크로스오버(Cross-over)';
      if (userType === '문과' && majorTrack === '이과') {
        fitHeadline = `[문과적 소통력 + ${activeMajor.name} 기술 지식]의 독보적 희소성`;
        fitDescription = `인문·사회적 문해력과 공감 능력을 갖춘 상태에서 이과 전공 지식을 습득하면, 순수 공학자들 사이에서 '기술을 고객과 경영진의 언어로 완벽히 통역하는 최고의 프로덕트 매니저(PM)'로 강력한 차별성을 갖게 됩니다.`;
      } else {
        fitHeadline = `[이과적 정량 분석력 + ${activeMajor.name} 전략 기획]의 독보적 희소성`;
        fitDescription = `논리적 인과 분석과 팩트 중심 사고를 바탕으로 문과 전공을 이수하면, 정성적 논리에 머물지 않고 정량적 데이터로 시장과 비즈니스를 움직이는 '데이터 기반 핵심 전략 기획가'로 두각을 나타냅니다.`;
      }
    }

    return { fitScore, matchType, fitHeadline, fitDescription };
  }, [activeMajor, tendencyAnalysis, isEasyMode]);

  // 1단계 기피/감내 조건 대조 분석
  const dislikeAnalysis = useMemo(() => {
    if (!activeMajor) return { tolerableList: [], avoidedList: [] };

    const tolerableTagIds = childData.tolerableDislikeTags || [];
    const excludeTagIds = childData.selectedDislikeTags || [];

    // 이 학과에 속해 있으면서, 학생이 1단계에서 '감내'하기로 한 기피 태그
    const tolerableList = DISLIKE_TAGS.filter((d) =>
      tolerableTagIds.includes(d.id) && activeMajor.tags.some((t) => d.matchedTags.includes(t))
    );

    // 학생이 1단계에서 '절대 제외'했던 태그 중, 이 학과에는 없는(안전한) 태그들
    const avoidedList = DISLIKE_TAGS.filter((d) =>
      excludeTagIds.includes(d.id) && !activeMajor.tags.some((t) => d.matchedTags.includes(t))
    );

    return { tolerableList, avoidedList };
  }, [activeMajor, childData.tolerableDislikeTags, childData.selectedDislikeTags]);

  if (isLocked) {
    const topRecommended = recommendedMajors[0] || MAJORS_DATA[0];

    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-2xl mx-auto my-8 space-y-6 animate-in fade-in">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-indigo-100">
          <Star className="w-8 h-8 text-indigo-600 fill-indigo-100" />
        </div>
        <div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-200/60">
            관심 학과 분석 안내
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-3">
            아직 관심 등록된 학과가 없습니다
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            4단계 심층 분석 리포트는 내가 찜한 학과의 취업률, 대기업 부서, 연봉 정보를 집중 분석합니다.<br />
            <strong>3단계 학과 보드</strong>에서 마음에 드는 학과에 <strong>[★ 관심]</strong>을 담아주세요!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onGoToStep3}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition inline-flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>3단계 학과 보드에서 학과 담기</span>
          </button>
          {topRecommended && (
            <button
              onClick={() => {
                updateChildData({
                  bookmarkedMajors: Array.from(new Set([...(childData.bookmarkedMajors || []), topRecommended.id]))
                });
                setSelectedMajorId(topRecommended.id);
              }}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-5 py-3 rounded-xl border border-slate-300 transition inline-flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>추천 1위 학과({topRecommended.name}) 리포트 바로보기</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 상단 브리핑 배너 (1·2단계 소거 여정 통합 반영) */}
      <div className="bg-gradient-to-r from-slate-100 via-indigo-50/50 to-slate-100 border border-slate-200/90 rounded-2xl p-6 text-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {isEasyMode
                  ? '🌱 4단계: 초등 5~6학년 눈높이 쉬운 심층 리포트'
                  : isMiddleMode
                  ? '💡 4단계: 중학 1~3학년 실생활 연계 진로 리포트'
                  : '🎓 4단계: 고교학점제 & 대입 심층 분석 리포트'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              {activeProfile.name} 님의 전공 탐구 ({allCandidates.length}개 전공)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {isEasyMode
                ? `내가 고른 관심 학과(${bookmarked.length}개)와 보류 학과(${pending.length}개)가 대학교에서 어떤 신기한 걸 배우고, 나중에 커서 어떤 멋진 회사에 들어가는지 알기 쉽게 보여줘요!`
                : isMiddleMode
                ? `내가 찜한 전공들(${allCandidates.length}개)이 일상생활 속 어떤 서비스와 제품을 만드는지 확인하고, 고등학교 진학 및 문·이과 선택에 실질적인 힌트를 얻어보세요.`
                : `2단계에서 선별한 관심 후보(${bookmarked.length}개)와 보류 후보(${pending.length}개)의 2022 개정 핵심 이수과목, 학생부 세특 탐구 주제, 대기업 계약학과 취업 타깃을 정밀 분석합니다.`}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onGoToStep5}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>5단계 생기부 로드맵</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 상단 안내 바 및 기업 역탐색 바로가기 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-indigo-50/80 via-white to-slate-50 border border-indigo-100/90 rounded-2xl p-3.5 sm:px-5 shadow-2xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            4
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
              <span>관심 학과 심층 분석 리포트</span>
              <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                대학별 이수과목 & 진로 역량
              </span>
            </h3>
            <p className="text-xs text-slate-500 hidden sm:block">
              희망 학과의 최적 선택과목 조합, 권장 권역, 졸업 후 진출 산업군 및 직무 연봉을 정밀 분석합니다.
            </p>
          </div>
        </div>

        {onOpenCompanyExplorer ? (
          <button
            onClick={onOpenCompanyExplorer}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-950 text-xs font-bold shadow-2xs transition cursor-pointer self-start sm:self-auto shrink-0 group"
            title="국내 대표 100대 기업 연봉 및 우대 전공 역탐색 창 열기"
          >
            <Building2 className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span>기업별 학과 역탐색</span>
            <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.2 rounded-full font-bold ml-0.5">
              100대 기업
            </span>
          </button>
        ) : (
          <button
            onClick={() => setViewMode(viewMode === 'majorReport' ? 'companyExplorer' : 'majorReport')}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>{viewMode === 'majorReport' ? '50대 기업 역탐색 보기' : '리포트로 복귀'}</span>
          </button>
        )}
      </div>

      {/* 뷰 모드에 따른 조건부 렌더링 */}
      {viewMode === 'companyExplorer' ? (
        <CompanyExplorerView
          onSelectMajor={handleSelectMajorFromCompany}
          onBackToReport={() => setViewMode('majorReport')}
        />
      ) : (
        <>

      {/* 통합 전공 선택 대시보드 패널 (선택한 관심 전공 & 1·2단계 추천 학과 한눈 조망) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-4">
        
        {/* 상단 헤더: 현재 조회 중인 전공 정보 & 우측 보류 전공 선택 드롭다운 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-3">
          <div className="flex items-center space-x-2.5">
            <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              현재 분석 리포트
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center space-x-2">
              <span>{activeMajor?.name}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                {activeMajor?.category}
              </span>
              {childData.bookmarkedMajors.includes(activeMajor?.id) && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  ★ 관심 전공
                </span>
              )}
            </h3>
          </div>

          {/* 우측: 보류 전공 학과 드롭다운 */}
          {pending.length > 0 && (
            <div className="flex items-center space-x-2 shrink-0">
              <label className="text-xs font-bold text-sky-800 shrink-0 flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                <span>보류 학과:</span>
              </label>
              <select
                value={pending.some((m) => m.id === selectedMajorId) ? selectedMajorId : ''}
                onChange={(e) => {
                  if (e.target.value) setSelectedMajorId(e.target.value);
                }}
                className={`text-xs border rounded-xl px-2.5 py-1.5 font-bold cursor-pointer transition w-full sm:w-56 focus:outline-indigo-500 ${
                  pending.some((m) => m.id === selectedMajorId)
                    ? 'bg-sky-50 text-sky-900 border-sky-400 ring-2 ring-sky-300'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <option value="">△ 보류 전공 ({pending.length}개)...</option>
                {pending.map((m) => (
                  <option key={m.id} value={m.id}>
                    △ {m.name} ({m.category})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* 1. 내가 선택한 관심 전공 행 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-lg flex items-center space-x-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>★ 내가 담은 관심 전공 ({bookmarked.length}개)</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                카드를 클릭하여 상세 리포트를 전환하세요
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {bookmarked.map((m) => {
              const isSelected = activeMajor?.id === m.id;
              const easyM = isEasyMode ? getEasyMajorInfo(m.id) : null;
              const label = isEasyMode && easyM?.easyName ? easyM.easyName.split(' (')[0] : m.name;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMajorId(m.id)}
                  className={`px-3 py-1.5 rounded-xl border text-left transition-all flex items-center space-x-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-300 font-bold scale-[1.02]'
                      : 'bg-amber-50/70 hover:bg-amber-100/70 text-slate-800 border-amber-200 hover:border-amber-300 font-semibold'
                  }`}
                >
                  <BookmarkCheck className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-amber-600'}`} />
                  <span className="text-xs">
                    {isEasyMode ? `🌱 ${label}` : m.name}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-600 border border-amber-100'
                  }`}>
                    {m.category}
                  </span>
                </button>
              );
            })}

            {bookmarked.length === 0 && (
              <div className="w-full text-xs text-slate-500 py-2.5 px-3.5 bg-amber-50/50 rounded-xl border border-dashed border-amber-200 flex items-center space-x-2">
                <BookmarkCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  아직 3단계에서 [★ 관심]으로 담은 학과가 없습니다. 아래 <strong>[✨ 맞춤 추천 학과]</strong>에서 마음에 드는 전공을 선택해 보세요!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2. 1·2단계 성향 & 선호 기반 맞춤 추천 학과 행 */}
        {recommendedMajors.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>✨ 1·2단계 적성 맞춤 추천 학과 ({recommendedMajors.length}개)</span>
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  나의 생각 스타일(문/이과) 및 12대 선호 과목 적성 매칭 알고리즘 기반
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {recommendedMajors.map((m) => {
                const isSelected = activeMajor?.id === m.id;
                const isBookmarked = childData.bookmarkedMajors.includes(m.id);
                const easyM = isEasyMode ? getEasyMajorInfo(m.id) : null;
                const label = isEasyMode && easyM?.easyName ? easyM.easyName.split(' (')[0] : m.name;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMajorId(m.id)}
                    className={`px-3 py-1.5 rounded-xl border text-left transition-all flex items-center space-x-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-300 font-bold scale-[1.02]'
                        : isBookmarked
                        ? 'bg-amber-50 hover:bg-amber-100/80 text-amber-950 border-amber-300 font-semibold'
                        : 'bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-950 border-emerald-200 hover:border-emerald-300 font-semibold'
                    }`}
                  >
                    <Sparkles className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-200' : 'text-emerald-600'}`} />
                    <span className="text-xs">
                      {isEasyMode ? `🌱 ${label}` : m.name}
                    </span>

                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      +{m.matchScore}점
                    </span>

                    {isBookmarked && (
                      <span className={`text-[9px] px-1 rounded font-bold shrink-0 ${
                        isSelected ? 'text-amber-200' : 'text-amber-800 bg-amber-200/80'
                      }`}>
                        ★ 담김
                      </span>
                    )}

                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                      isSelected ? 'bg-white/10 text-white' : 'bg-white text-slate-600 border border-emerald-100'
                    }`}>
                      {m.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 현재 보류 학과 심층 리포트를 보고 있을 때 상단 알림 배너 */}
      {childData.pendingMajors.includes(activeMajor?.id) && (
        <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-sky-50 border border-sky-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sky-950 animate-in fade-in">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-200/80 text-sky-800 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <strong className="text-sky-950 font-bold block sm:inline">현재 [△ 보류 전공 학과] 심층 리포트를 조회 중입니다.</strong>{' '}
              <span className="text-sky-700">커리큘럼과 취업 타깃을 확인한 후 마음에 들면 관심 후보 카드로 등록해 보세요.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleToggleBookmark(activeMajor.id)}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>★ [관심 후보 카드]로 승격하기</span>
          </button>
        </div>
      )}

      {/* 현재 추천 학과 심층 리포트를 보고 있을 때 상단 승격 알림 배너 */}
      {!childData.bookmarkedMajors.includes(activeMajor?.id) && !childData.pendingMajors.includes(activeMajor?.id) && recommendedMajors.some((m) => m.id === activeMajor?.id) && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-950 animate-in fade-in">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-xs">
              <strong className="text-emerald-950 font-bold block sm:inline">1·2단계 진단 기반 [✨ 맞춤 추천 학과] 심층 리포트를 조회 중입니다.</strong>{' '}
              <span className="text-emerald-700">성향 및 선호 과목 적성 점수가 높은 학과입니다. 마음에 들면 관심 후보 카드로 등록해 보세요!</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleToggleBookmark(activeMajor.id)}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
          >
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span>★ [관심 전공 카드]로 등록하기</span>
          </button>
        </div>
      )}



      {/* 1단계 & 2단계 연동 개인화 분석 대시보드 */}
      {activeMajor && majorFitAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* 1. 생각 스타일 vs 전공 핏(Fit) 분석 카드 */}
          <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-50/70 rounded-bl-full pointer-events-none -z-0" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 block">1단계 성향 연동 분석</span>
                    <h4 className="text-sm font-black text-slate-900">나의 생각 스타일 vs 전공 핏(Fit)</h4>
                  </div>
                </div>
                <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full">
                  {majorFitAnalysis.matchType} ({majorFitAnalysis.fitScore}점)
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3 space-y-1">
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>내 생각 스타일: <strong className="text-slate-800">{tendencyAnalysis.label}</strong></span>
                  <span>전공 계열: <strong className="text-indigo-600">{activeMajor.track}</strong></span>
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {majorFitAnalysis.fitHeadline}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {majorFitAnalysis.fitDescription}
              </p>
            </div>
            
            <div className="text-[11px] text-indigo-600 font-semibold mt-3 pt-2.5 border-t border-slate-100 flex items-center space-x-1">
              <Target className="w-3.5 h-3.5" />
              <span>1단계 6개 질문 응답 데이터 기반 맞춤형 해석</span>
            </div>
          </div>

          {/* 2. 기피 & 감내 조건 리스크 관리 가이드 카드 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-600 block">1단계 기피 조건 연동</span>
                    <h4 className="text-sm font-black text-slate-900">감내 리스크 & 안심 요소 가이드</h4>
                  </div>
                </div>
                {dislikeAnalysis.tolerableList.length > 0 ? (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    <span>감내 요소 {dislikeAnalysis.tolerableList.length}개 발견</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>기피 부담 없음 (안전)</span>
                  </span>
                )}
              </div>

              {/* 감내 요소가 있을 경우 실질적 학습 조언 */}
              {dislikeAnalysis.tolerableList.length > 0 ? (
                <div className="space-y-2 mb-3">
                  {dislikeAnalysis.tolerableList.map((tag) => (
                    <div key={tag.id} className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80">
                      <div className="text-xs font-bold text-amber-900 flex items-center space-x-1.5 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>내가 감내하기로 한 속성: [{tag.shortLabel}]</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        1단계에서 목표를 위해 감내하기로 선택한 영역입니다. {activeMajor.name} 전공 특성상 관련 비중이 있으므로, 고등학교 때 기초 선택과목을 단단히 준비해 두는 것이 학점 방어의 열쇠입니다.
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 mb-3">
                  <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                    1단계에서 [부담되지만 감내] 또는 [절대 제외]로 설정한 비선호 속성이 이 학과에는 존재하지 않습니다. 부담 없이 자신의 장점에 집중할 수 있습니다.
                  </p>
                </div>
              )}

              {/* 안심 요소 피드백 */}
              {dislikeAnalysis.avoidedList.length > 0 && (
                <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <strong className="text-slate-700 font-semibold">✓ 안심 포인트:</strong> 1단계에서 절대 제외했던 [{dislikeAnalysis.avoidedList.map(t => t.shortLabel).join(', ')}] 부담이 이 학과에는 전혀 없습니다.
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400 mt-3 pt-2.5 border-t border-slate-100 flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>선택한 기피 조건과 실제 학과 커리큘럼 간 교차 검증 완료</span>
            </div>
          </div>

        </div>
      )}

      {activeMajor && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 좌측: 전공 학업 및 커리큘럼 분석 (1/3) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* 기본 개요 카드 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full">
                    {activeMajor.category} · {activeMajor.track}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activeMajor.subCategory}
                  </span>
                </div>

                {/* 2단계 상태 표시 및 원클릭 관심/보류 토글 버튼 */}
                <button
                  onClick={() => handleToggleBookmark(activeMajor.id)}
                  className={`inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border transition cursor-pointer ${
                    childData.bookmarkedMajors.includes(activeMajor.id)
                      ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                      : 'bg-sky-50 text-sky-800 border-sky-300 hover:bg-sky-100'
                  }`}
                  title={childData.bookmarkedMajors.includes(activeMajor.id) ? '클릭 시 보류 목록으로 변경' : '클릭 시 최종 관심 후보로 승격'}
                >
                  {childData.bookmarkedMajors.includes(activeMajor.id) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>★ 관심 후보</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5 text-sky-600" />
                      <span>△ 보류 중 (클릭 시 관심 승격)</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                {isEasyMode && easyActiveInfo?.easyName && (
                  <span className="inline-block text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full mb-1">
                    🌱 초등학생 눈높이 쉬운 이름
                  </span>
                )}
                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  {isEasyMode && easyActiveInfo?.easyName ? easyActiveInfo.easyName : activeMajor.name}
                </h3>
                {isEasyMode && easyActiveInfo?.easyName ? (
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    표준 전공명: {activeMajor.name}
                  </div>
                ) : (
                  middleActiveInfo?.realLifeExample && (
                    <div className="mt-1.5 inline-flex items-start text-xs text-indigo-950 bg-indigo-50 border border-indigo-200/90 rounded-lg px-3 py-1.5 leading-snug">
                      <span className="font-black text-indigo-700 shrink-0 mr-1.5">
                        💡 실생활 적용 사례:
                      </span>
                      <span className="font-medium text-slate-700">
                        {middleActiveInfo.realLifeExample}
                      </span>
                    </div>
                  )
                )}

                {/* ★ 대기업 계약학과 눈에 띄는 뱃지 */}
                {activeMajor.contractMajor && (
                  <div className="mt-2 mb-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-sm ring-1 ring-amber-300">
                      <Briefcase className="w-3.5 h-3.5 shrink-0" />
                      <span>{isEasyMode ? '대기업 100% 취직 보장 특별반' : activeMajor.contractMajor.badgeText}</span>
                      <span className="bg-black/25 text-amber-100 text-[10px] px-1.5 py-0.5 rounded font-extrabold">
                        {activeMajor.contractMajor.partnerCompanies.join(' · ')}
                      </span>
                    </div>
                  </div>
                )}

                <p className={`text-xs leading-relaxed mt-2 p-3 rounded-xl border ${
                  isEasyMode ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium' : 'bg-slate-50 border-slate-100 text-slate-600'
                }`}>
                  {isEasyMode && easyActiveInfo?.easySummary ? easyActiveInfo.easySummary : activeMajor.summary}
                </p>
              </div>

              {/* 핵심 커리큘럼 / 대학교에서 배우는 것 */}
              <div>
                <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>{isEasyMode ? '대학교에서 배우는 신기하고 재미있는 공부' : '4년 동안 어떤 공부를 하는가?'}</span>
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  {isEasyMode && easyActiveInfo?.easyWhatWeLearn ? (
                    easyActiveInfo.easyWhatWeLearn.map((item, idx) => (
                      <div key={idx} className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80 font-semibold text-emerald-950 flex items-start space-x-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))
                  ) : (
                    activeMajor.curriculum.map((c, idx) => (
                      <div key={idx} className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70 font-medium">
                        {c}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 개설 대학 풀 */}
              <div>
                <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>서울 주요 20개 대학 개설 현황</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {COLLEGES.filter((c) => activeMajor.colleges.includes(c.id)).map((c) => (
                    <span key={c.id} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-1 rounded-lg border border-slate-200 font-medium">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* 우측: 중견기업 이상 취업 타깃 및 구체적 추천 부서 (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 기업 및 부서 정밀 분석 카드 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h4 className="text-base font-black text-slate-900 flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <span>중견기업 이상 취업 타깃 및 실무 추천 부서</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    해당 전공 졸업 시 진출하기 유리한 우량 중견·대기업 및 핵심 부서 포지션입니다.
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full">
                  {activeMajor.corporateTarget.level}
                </span>
              </div>

              {/* ★ 대기업 계약학과 특별 혜택 및 트랙 안내 카드 */}
              {activeMajor.contractMajor && (
                <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border-2 border-amber-300 rounded-2xl p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2.5">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-xs">
                        <Briefcase className="w-3.5 h-3.5" />
                        {activeMajor.contractMajor.badgeText}
                      </span>
                      <span className="text-xs font-black text-amber-950">
                        협약 기업: {activeMajor.contractMajor.partnerCompanies.join(', ')}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                      100% 입사 채용 보장 & 전액 장학금
                    </span>
                  </div>
                  <div className="text-xs text-slate-800 font-semibold">
                    <strong>개설 대학 및 트랙:</strong> {activeMajor.contractMajor.univsText}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {isEasyMode && easyActiveInfo?.easyContractText ? easyActiveInfo.easyContractText : activeMajor.contractMajor.description}
                  </p>

                  {/* 협약 기업별 대졸 신입 초봉 정보 */}
                  <div className="pt-3.5 border-t border-amber-200/80">
                    <div className="text-[11px] font-bold text-amber-900 mb-2.5 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>{isEasyMode ? '채용 협약 기업 첫해 받는 돈 (초봉)' : '채용 협약 기업 대졸 신입 초봉 (2024~2025년 최신 공시 기준)'}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeMajor.contractMajor.partnerCompanies.map((comp) => {
                        const s = getCompanySalary(comp);
                        if (!s) return null;
                        return (
                          <div key={comp} className="bg-white/95 rounded-xl p-3.5 border border-amber-200 shadow-2xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-slate-900">{comp}</span>
                              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                성과급 포함 {s.totalSalary}원
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600 flex items-center justify-between">
                              <span>기본 계약 연봉</span>
                              <span className="font-bold text-slate-800">{s.baseSalary}원</span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate" title={s.incentiveNote}>
                              * {s.incentiveNote}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ★ [신설] 학과별 대기업 일자리 파이(채용 규모) 및 진출 직군 분석 */}
              {majorJobMarketStats && (
                <div className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-indigo-100/90 rounded-2xl p-6 sm:p-7 space-y-4.5 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-3.5">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-black text-slate-900">
                        {isEasyMode ? '이 전공을 공부하면 대기업에 얼마나 많은 일자리가 있을까?' : '대기업 취업 시장 일자리 파이(채용 규모) 및 주력 직군'}
                      </h4>
                    </div>
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-white border border-indigo-200 text-indigo-900 shadow-2xs">
                      {majorJobMarketStats.quotaTag}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {majorJobMarketStats.quotaSummary}
                  </p>

                  {/* 주력 진출 직군 및 회사 내 인원 비중 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                    {majorJobMarketStats.mainRoles.map((roleItem, rIdx) => (
                      <div key={rIdx} className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-indigo-950">
                            {roleItem.role}
                          </span>
                          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                            사내 비중 {roleItem.share}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          {roleItem.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 타깃 기업 현황 안내 */}
                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-3 border-t border-slate-200/70 flex-wrap gap-1">
                    <span>
                      🎯 시총 50대 기업 중 <strong>{majorJobMarketStats.targetCompaniesCount}개사</strong>가 이 전공을 타깃 채용 중입니다.
                    </span>
                    <button
                      onClick={() => setIsCompanyModalOpen(true)}
                      className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer flex items-center space-x-0.5"
                    >
                      <span>기업별 임직원/직군 통계 전체보기</span>
                      <ArrowRight className="w-3 h-3 inline" />
                    </button>
                  </div>
                </div>
              )}

              {/* 1. [핵심 신설] 전공 관련 주요 직무(Role)별 대졸 신입 기본 연봉 가이드 */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-200/80 pb-2">
                  <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <span>
                      {isEasyMode
                        ? '이 학과를 졸업하면 일하게 될 멋진 직업들과 첫해 기본 월급/연봉'
                        : '전공 관련 핵심 직무(Role)별 대졸 신입 기본 연봉'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span>2024~2025 최신 채용 포털(잡코리아·잡플래닛·블라인드) 대졸 신입 기준</span>
                  </div>
                </div>

                {/* 직무별 연봉 카드 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {jobSalaries.map((job, jIdx) => (
                    <div
                      key={jIdx}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900 flex items-center space-x-1">
                            <span>{job.role}</span>
                          </span>
                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                            신입 초임
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug line-clamp-2" title={job.desc}>
                          {job.desc}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium shrink-0">대졸 신입</span>
                          <span className="font-extrabold text-indigo-900 shrink-0">{job.baseSalary}원</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 shrink-0">상여금 포함</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                            {job.totalSalary}원
                          </span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 flex items-center space-x-1 pt-1 border-t border-slate-100">
                        <span className="font-semibold text-slate-500 shrink-0">주요 타깃:</span>
                        <span className="text-slate-600 truncate" title={job.target}>
                          {job.target}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. 주요 진출 목표 기업 및 대졸 신입 초봉 (현실화된 데이터) */}
              <div>
                <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{isEasyMode ? '선배들이 많이 취업한 대표 기업들' : '대표 진출 기업 풀 및 대졸 신입 계약급 (기업별 현실 기준)'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    * 비개발/문과/직무별 실제 계약 연봉 기준 (과장 수치 정비 완료)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {activeMajor.corporateTarget.examples.map((company, cIdx) => {
                    const sal = getCompanySalary(company);
                    return (
                      <div
                        key={cIdx}
                        onClick={() => handleOpenCompanyModal(company)}
                        className="p-3 rounded-xl bg-slate-50/90 hover:bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between space-y-1.5 group cursor-pointer relative"
                        title={`${company} 채용·연봉·인원 통계 모달 열기`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900 truncate group-hover:text-indigo-600 transition" title={company}>
                            {company}
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition shrink-0 ml-1">
                            상세 분석 ↗
                          </span>
                        </div>
                        {sal && (
                          <div className="space-y-1 pt-1 border-t border-slate-200/60">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-500 font-medium">대졸 기본급</span>
                              <span className="font-bold text-slate-800">{sal.baseSalary}원</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-emerald-700 font-semibold">성과급 포함</span>
                              <span className="font-black text-emerald-700 bg-emerald-50 px-1 rounded">
                                {sal.totalSalary}원
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate pt-0.5" title={sal.incentiveNote}>
                              ℹ {sal.incentiveNote}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. 구체적인 실무 부서 및 직무 포지션 */}
              <div>
                <div className="text-xs font-bold text-slate-700 mb-2.5 flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>{isEasyMode ? '회사에서 실제로 맡아서 일하게 될 멋진 팀' : '입사 시 추천하는 구체적 실무 부서(Department)'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {isEasyMode && easyActiveInfo?.easyDepartments ? (
                    easyActiveInfo.easyDepartments.map((dept, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start space-x-2.5"
                      >
                        <div className="w-5 h-5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {dIdx + 1}
                        </div>
                        <div>
                          <div className="text-xs font-black text-emerald-950">
                            {dept.name}
                          </div>
                          <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                            {dept.desc}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    activeMajor.corporateTarget.departments.map((dept, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start space-x-2.5"
                      >
                        <div className="w-5 h-5 rounded-lg bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {dIdx + 1}
                        </div>
                        <div>
                          <div className="text-xs font-black text-indigo-950">
                            {dept}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            전공 지식을 직접 활용하여 의사결정 및 개발·기획을 주도하는 부서
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 3. 진로 분야 및 커리어 성장 트랙 */}
              <div>
                <div className="text-xs font-bold text-slate-700 mb-2 flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  <span>대표 직무 및 자격증/커리어 트랙</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeMajor.careerPaths.map((path, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-xs bg-slate-100 text-slate-800 font-semibold px-3 py-1.5 rounded-xl border border-slate-200"
                    >
                      {path}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* [AI 확장] 학과별 실시간 1:1 Q&A 멘토 채팅 (Vercel/로컬 활성화, 단일 HTML 폴백) */}
            {activeMajor && (
              <AiMajorMentorChat
                activeMajor={activeMajor}
                tendencyAnalysis={tendencyAnalysis}
                activeProfile={activeProfile}
                educationTier={educationTier}
              />
            )}

            {/* 하단 다음 단계 유도 배너 */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-indigo-900">
                  고1 입학 전, 어떤 선택과목을 듣고 생기부 세특을 채워야 할까요?
                </div>
                <p className="text-xs text-indigo-700 mt-0.5">
                  2022 개정 교육과정(고교학점제)에 맞춘 <strong>{activeMajor.name} 권장 이수 과목과 고1 세특 탐구 주제</strong>를 확인하세요.
                </p>
              </div>
              <button
                onClick={onGoToStep5}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 shrink-0"
              >
                <span>5단계 생기부 로드맵 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* [AI 확장] 1:1 맞춤형 심층 입시 총평 (Vercel/로컬 활성화, 단일 HTML 폴백 - 리포트 최하단 배치) */}
      {activeMajor && (
        <AiConsultantReport
          activeMajor={activeMajor}
          tendencyAnalysis={tendencyAnalysis}
          childData={childData}
          activeProfile={activeProfile}
          educationTier={educationTier}
        />
      )}
      </>
      )}

      {/* [신규 기능] 목표 기업별 연봉 및 필요 전공 역탐색 모달 */}
      <CompanySalaryModal
        isOpen={isCompanyModalOpen}
        onClose={() => {
          setIsCompanyModalOpen(false);
          setSelectedModalCompany(null);
        }}
        onSelectMajor={handleSelectMajorFromCompany}
        initialCompany={selectedModalCompany}
      />

    </div>
  );
};
