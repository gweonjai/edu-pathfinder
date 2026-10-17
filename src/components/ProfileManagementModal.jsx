import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useProfile } from '../context/ProfileContext';
import { Users, Plus, Trash2, Download, Upload, ShieldCheck } from 'lucide-react';

export const ProfileManagementModal = ({ isOpen, onClose }) => {
  const { profiles, activeProfile, activeProfileId, setActiveProfileId, addProfile, removeProfile, exportAllData, importAllData } = useProfile();
  const [isAddMode, setIsAddMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('중3');
  const [backupMessage, setBackupMessage] = useState(null);
  const fileInputRef = useRef(null);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addProfile(newName.trim(), newGrade);
    setNewName('');
    setIsAddMode(false);
  };

  const handleExport = () => {
    const res = exportAllData();
    if (res.success) {
      setBackupMessage({ type: 'success', text: '백업 파일(.json)이 다운로드되었습니다.' });
      setTimeout(() => setBackupMessage(null), 3000);
    } else {
      setBackupMessage({ type: 'error', text: '백업 파일 생성 중 오류가 발생했습니다.' });
      setTimeout(() => setBackupMessage(null), 3000);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = importAllData(content);
        if (res.success) {
          setBackupMessage({ type: 'success', text: `총 ${res.count}명의 자녀 데이터가 성공적으로 복원되었습니다!` });
          setTimeout(() => {
            setBackupMessage(null);
            onClose();
          }, 1500);
        } else {
          setBackupMessage({ type: 'error', text: res.error || '복원 실패: 올바른 백업 파일이 아닙니다.' });
          setTimeout(() => setBackupMessage(null), 3500);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-100 relative my-auto max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 상단 헤더 (고정) */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-lg text-slate-900">프로필 관리</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold transition cursor-pointer"
            title="창 닫기 (ESC)"
          >
            ✕
          </button>
        </div>

        {/* 모달 본문 영역 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
          <p className="text-xs text-slate-500">
            프로필을 전환하면 소거한 학과 및 진로 로드맵 데이터가 독립적으로 자동 분기 보관됩니다.
          </p>

          {/* 기존 프로필 목록 */}
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {profiles.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
                등록된 사용자가 없습니다.<br />아래에서 사용자를 추가해 주세요.
              </div>
            ) : (
              profiles.map((p) => {
                const isActive = p.id === activeProfileId;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setActiveProfileId(p.id);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      isActive
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                        p.grade?.includes('중') ? 'bg-rose-500' : 'bg-indigo-600'
                      }`}>
                        {p.grade}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center space-x-1.5">
                          <span>{p.name}</span>
                          {isActive && (
                            <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded font-bold">
                              현재 선택됨
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          {p.targetYear} 대상
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`'${p.name}' 프로필을 삭제하시겠습니까? (저장된 소거 데이터가 삭제됩니다)`)) {
                          removeProfile(p.id);
                        }
                      }}
                      className="text-slate-300 hover:text-rose-500 p-1 rounded transition cursor-pointer"
                      title="프로필 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* 새 프로필 추가 폼 */}
          {isAddMode ? (
            <form onSubmit={handleAddProfile} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-700">새 프로필 추가</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">이름 / 닉네임</label>
                  <input
                    type="text"
                    placeholder="예: 민우, 서연, 탐구자"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white focus:outline-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">현재 학년</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white focus:outline-indigo-500 cursor-pointer"
                  >
                    <option value="초5">초등학교 5학년</option>
                    <option value="초6">초등학교 6학년</option>
                    <option value="중1">중학교 1학년</option>
                    <option value="중2">중학교 2학년</option>
                    <option value="중3">중학교 3학년</option>
                    <option value="고1">고등학교 1학년</option>
                    <option value="고2">고등학교 2학년</option>
                    <option value="고3">고등학교 3학년</option>
                    <option value="기타">기타 / N수생</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddMode(false)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
                >
                  저장하기
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAddMode(true)}
              className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center justify-center space-x-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>새 프로필 추가하기</span>
            </button>
          )}

          {/* 데이터 영구 보관 & 복원 섹션 */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>데이터 백업 & 복원 (PC 보관)</span>
              </span>
              <span className="text-[10px] text-slate-400">앱 삭제 대비</span>
            </div>

            {backupMessage && (
              <div className={`p-2 rounded-lg text-xs font-semibold ${
                backupMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {backupMessage.text}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleExport}
                className="py-2 px-2.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span>백업 파일 저장</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-2 px-2.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>백업 파일 복원</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* 모달 하단 버튼 (고정) */}
        <div className="pt-3 border-t border-slate-100 shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm py-2.5 rounded-2xl cursor-pointer transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
