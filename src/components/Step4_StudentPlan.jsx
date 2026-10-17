import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { MAJORS_DATA } from '../data/departmentsData';
import { 
  FileText, Printer, CheckCircle2, BookmarkCheck, Lightbulb, 
  BookMarked, Sparkles, Edit3, Save, School, Award, Compass, Briefcase 
} from 'lucide-react';

export const Step4_StudentPlan = () => {
  const { childData, updateChildData, activeProfile } = useProfile();

  // 최종 후보 학과 리스트 (관심 담긴 학과)
  const bookmarked = MAJORS_DATA.filter((m) => childData.bookmarkedMajors.includes(m.id));
  const remainingActive = MAJORS_DATA.filter((m) => !childData.excludedMajors.includes(m.id));
  const targetMajors = bookmarked.length > 0 ? bookmarked : remainingActive.slice(0, 3);

  const [selectedMajorId, setSelectedMajorId] = useState(targetMajors[0]?.id || null);
  const activeMajor = targetMajors.find((m) => m.id === selectedMajorId) || targetMajors[0];

  // 나만의 진로 & 생기부 탐구 메모 상태
  const notesKey = activeMajor?.id || 'general';
  const currentNotes = childData.notes || {};
  const [memoText, setMemoText] = useState(currentNotes[notesKey] || '');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleSaveMemo = () => {
    const nextNotes = { ...currentNotes, [notesKey]: memoText };
    updateChildData({ notes: nextNotes });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const handleMajorTabChange = (mId) => {
    setSelectedMajorId(mId);
    setMemoText(currentNotes[mId] || '');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!activeMajor) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center max-w-xl mx-auto my-8">
        <School className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h4 className="text-base font-bold text-slate-700">선택된 관심 학과가 없습니다.</h4>
        <p className="text-xs text-slate-500 mt-1">
          2단계 학과 보드에서 마음에 드는 학과에 [★ 관심 담기]를 먼저 눌러주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-16">
      
      {/* 상단 브리핑 및 인쇄 바 */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>4단계: 2022 개정 교육과정(고교학점제) & 2028 대입 생기부 로드맵</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {activeProfile.name} 학생의 고1 진학 대비 생기부·과목 선택 전략
            </h2>
            <p className="text-sm text-indigo-200 mt-1">
              2028 대입에서는 어떤 선택과목을 이수했는지와 세특의 깊이가 합격을 가릅니다. 학과별 핵심 과목과 탐구 주제를 확인하세요.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="bg-white hover:bg-slate-100 text-indigo-900 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>생기부 리포트 인쇄 / PDF 저장</span>
          </button>
        </div>
      </div>

      {/* 인쇄 전용 헤더 (화면에서는 숨김, 인쇄 시 출력) */}
      <div className="hidden print-only p-6 border-b border-slate-300 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              에듀 패스파인더 (Edu Pathfinder) 맞춤 진로 & 고1 생기부 설계 리포트
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              학생명: {activeProfile.name} ({activeProfile.grade}) | 기준: 2022 개정 교육과정 & 2028 대입 개편안
            </p>
          </div>
          <div className="text-right text-xs text-slate-400">
            출력일시: {new Date().toLocaleDateString('ko-KR')}
          </div>
        </div>
      </div>

      {/* 타깃 학과 탭 선택기 (no-print) */}
      <div className="no-print flex overflow-x-auto no-scrollbar space-x-2 pb-1">
        {targetMajors.map((m) => {
          const isSelected = activeMajor.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleMajorTabChange(m.id)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center space-x-2 shrink-0 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <BookmarkCheck className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-500'}`} />
              <span>{m.name}</span>
              {m.contractMajor && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  isSelected ? 'bg-amber-400 text-indigo-950' : 'bg-amber-100 text-amber-800'
                }`}>
                  계약학과
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 학과별 2022 개정 교육과정 권장 과목표 & 생기부 탐구 시트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 좌측: 2022 개정 고교학점제 선택과목 가이드 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  2022 개정 교육과정 이수 체계
                </span>
                {activeMajor.contractMajor && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-2xs">
                    <Briefcase className="w-2.5 h-2.5" />
                    {activeMajor.contractMajor.badgeText} ({activeMajor.contractMajor.partnerCompanies.join('·')})
                  </span>
                )}
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                {activeMajor.name} 권장 이수 과목
              </h3>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-bold border border-indigo-200">
              서울 주요대 발표 기준
            </span>
          </div>

          {/* 핵심 권장 과목 (필수 이수) */}
          <div>
            <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>핵심 권장 과목 (미이수 시 대학 평가 감점 요인)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeMajor.curriculum2022.core.map((subj, idx) => (
                <div
                  key={idx}
                  className="bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>{subj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 일반 권장 과목 (가산점) */}
          <div>
            <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>일반 권장 과목 (계열 적합성 가산점 부여)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeMajor.curriculum2022.recommended.map((subj, idx) => (
                <div
                  key={idx}
                  className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-semibold px-3 py-1.5 rounded-xl"
                >
                  {subj}
                </div>
              ))}
            </div>
          </div>

          {/* 대학별 평가 가이드라인 코멘트 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <div className="font-bold text-slate-800 mb-1 flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>입학사정관 평가 코멘트</span>
            </div>
            <p>{activeMajor.curriculum2022.guidance}</p>
          </div>

        </div>

        {/* 우측: 고1 공통과목 세특(탐구활동) 추천 주제 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                고1 학생부 종합전형 대비
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                고1 공통과목 연계 세특 탐구 아이디어
              </h3>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
              세특 차별화
            </span>
          </div>

          <p className="text-xs text-slate-500">
            고1 때는 모든 학생이 공통과목(국·수·영·통사·통과)을 배웁니다. 이때 아래와 같은 전공 연계 키워드로 보고서를 작성하면 1학년 때부터 일관성 있는 생기부를 완성할 수 있습니다.
          </p>

          {/* 과목별 탐구 주제 카드 */}
          <div className="space-y-3">
            {activeMajor.studentBookIdeas.map((idea, idx) => {
              const [subject, content] = idea.split(': ');
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition"
                >
                  <div className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md mb-1.5">
                    <Lightbulb className="w-3 h-3 text-amber-600" />
                    <span>{subject}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {content}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* 진로 로드맵 & 나만의 생기부 탐구 메모 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Edit3 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              [{activeMajor.name}] 진로 로드맵 & 탐구 메모
            </h3>
          </div>
          <div className="flex items-center space-x-2 no-print">
            {isSavedNotice && (
              <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>저장 완료!</span>
              </span>
            )}
            <button
              onClick={handleSaveMemo}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition flex items-center space-x-1 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>메모 저장</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          진로와 관련하여 계획 중인 이야기, 고등학교 때 가입하고 싶은 동아리, 읽고 싶은 책, 또는 찾아볼 자료 키워드를 자유롭게 적어두세요. (프로필별로 자동 보관됩니다)
        </p>

        <textarea
          rows={4}
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
          placeholder={`예: \n- 고1 때 과학/공학 시사 탐구 동아리 지원하기\n- 추천 도서: <인공지능의 미래>, <청소년을 위한 반도체 특강> 읽고 독서록 작성\n- 수학 시간에 배운 통계 지식으로 우리 학교 학생 선호도 설문조사 수행`}
          className="w-full text-xs p-3.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-indigo-500 focus:bg-white leading-relaxed"
        />
      </div>

    </div>
  );
};
