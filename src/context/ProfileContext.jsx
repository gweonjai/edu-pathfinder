import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext(null);

export const getTargetYear = (grade) => {
  switch (grade) {
    case '초5': return '2032 대입';
    case '초6': return '2031 대입';
    case '중1': return '2030 대입';
    case '중2': return '2029 대입';
    case '중3': return '2028 대입 개편안';
    case '고1': return '2027 대입';
    case '고2': return '2026 대입';
    case '고3': return '2025 대입';
    default: return '대입 준비';
  }
};

export const getEducationTierFromGrade = (grade) => {
  if (!grade) return 'middle';
  if (grade === '초5' || grade === '초6' || grade.includes('초')) return 'elementary'; // Tier 1: 초등 5~6학년 (호기심 유발 쉬운 일상어)
  if (grade.startsWith('중')) return 'middle';                                          // Tier 2: 중학 1~3학년 (실생활 적용 사례 중심)
  return 'high';                                                                      // Tier 3: 고교 1~3학년 및 기타 (2022 개정 고교학점제 & 대입 표준 학술어)
};

export const EDUCATION_TIERS = {
  elementary: {
    id: 'elementary',
    name: '초등 눈높이',
    shortName: '초등',
    gradeLabel: '초5~초6',
    icon: '🌱',
    color: 'emerald',
    description: '대학에서 배우는 신기하고 재미있는 일상 생활어 중심'
  },
  middle: {
    id: 'middle',
    name: '중등 실생활',
    shortName: '중학',
    gradeLabel: '중1~중3',
    icon: '💡',
    color: 'indigo',
    description: '카카오톡, 넷플릭스, 반도체 등 실생활 제품·서비스 적용 사례 중심'
  },
  high: {
    id: 'high',
    name: '고교 입시/직무',
    shortName: '고교',
    gradeLabel: '고1~고3',
    icon: '🎓',
    color: 'slate',
    description: '2022 개정 고교학점제 선택과목, 학생부 세특 및 표준 전공 학술어'
  }
};

export const ProfileProvider = ({ children }) => {
  // 1. 프로필 목록 로드 (로컬스토리지에 저장된 사용자 목록 조회)
  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem('pathfinder_profiles');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // 온보딩 모달 열림 여부: 사용자가 한 명도 입력되어 있지 않을 때(0명)만 자동으로 오픈
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('pathfinder_profiles');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return false; // 이미 1명 이상 등록된 사용자가 있으면 절대 자동 오픈하지 않음
        }
      }
      return true; // 등록된 사용자가 한 명도 없을 때만 자동으로 띄움
    } catch {
      return true;
    }
  });

  // 2. 현재 선택된 활성 프로필 ID
  const [activeProfileId, setActiveProfileId] = useState(() => {
    try {
      const saved = localStorage.getItem('pathfinder_active_profile_id');
      return saved || profiles[0]?.id || '';
    } catch {
      return '';
    }
  });

  // 3. 현재 프로필의 데이터 (소거 내역, 관심 목록, 기피 태그 등)
  const [childData, setChildData] = useState(() => {
    try {
      const savedId = localStorage.getItem('pathfinder_active_profile_id') || profiles[0]?.id || '';
      if (savedId) {
        const saved = localStorage.getItem(`pathfinder_data_${savedId}`);
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse initial childData', e);
    }
    return {
      excludedMajors: [],      // 소거(제외)된 학과 IDs
      pendingMajors: [],       // 보류된 학과 IDs
      bookmarkedMajors: [],    // 관심(최종후보) 학과 IDs
      needExplainMajors: [],   // 내용 이해가 어려워 설명 요청/질문표가 붙은 학과 IDs
      selectedDislikeTags: [], // 선택된 기피 태그 IDs
      tolerableDislikeTags: [], // 감내하기로 한 태그 IDs
      dislikeLevels: {},       // 기피 태그 레벨 { [tagId]: 'exclude' | 'tolerable' }
      preferenceLevels: {},    // 선호 태그 레벨 { [tagId]: 'high' | 'medium' | 'low' | 'dislike' }
      tendencyAnswers: {},     // 문이과 진단 응답
      notes: {},               // 생기부/진로 메모
    };
  });

  // 활성 프로필 변경 시 해당 프로필 데이터 불러오기
  useEffect(() => {
    if (!activeProfileId) return;
    try {
      const key = `pathfinder_data_${activeProfileId}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        setChildData(JSON.parse(saved));
      } else {
        setChildData({
          excludedMajors: [],
          pendingMajors: [],
          bookmarkedMajors: [],
          needExplainMajors: [],
          selectedDislikeTags: [],
          tolerableDislikeTags: [],
          dislikeLevels: {},
          preferenceLevels: {},
          tendencyAnswers: {},
          notes: {},
        });
      }
      localStorage.setItem('pathfinder_active_profile_id', activeProfileId);
    } catch (e) {
      console.error('Failed to load profile data', e);
    }
  }, [activeProfileId]);

  // 프로필 데이터 변경 시 로컬스토리지에 저장
  const updateChildData = (newDataOrFn) => {
    setChildData((prev) => {
      const updated = typeof newDataOrFn === 'function' ? newDataOrFn(prev) : { ...prev, ...newDataOrFn };
      try {
        if (activeProfileId) {
          localStorage.setItem(`pathfinder_data_${activeProfileId}`, JSON.stringify(updated));
        }
      } catch (e) {
        console.error('Failed to save profile data', e);
      }
      return updated;
    });
  };

  // 프로필 목록 영구 저장
  useEffect(() => {
    if (profiles.length > 0) {
      try {
        localStorage.setItem('pathfinder_profiles', JSON.stringify(profiles));
      } catch (e) {
        console.error('Failed to save profiles list', e);
      }
    }
  }, [profiles]);

  // 온보딩 완료 처리 (본인 정보 최초 등록 및 기존 프로필 보존 방어)
  const completeOnboarding = (name, grade) => {
    const newId = `user-${Date.now()}`;
    const initialProfile = {
      id: newId,
      name: name.trim() || '본인',
      grade: grade || '중3',
      targetYear: getTargetYear(grade || '중3'),
      color: 'indigo'
    };
    setProfiles((prev) => {
      const exists = prev.some((p) => p.name === initialProfile.name);
      const updated = exists ? prev : (prev.length > 0 ? [...prev, initialProfile] : [initialProfile]);
      try {
        localStorage.setItem('pathfinder_profiles', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    setActiveProfileId(newId);
    setIsOnboardingOpen(false);
    try {
      localStorage.setItem('pathfinder_onboarded', 'true');
      localStorage.setItem('pathfinder_active_profile_id', newId);
    } catch (e) {
      console.error(e);
    }
  };

  // 전체 데이터 백업 파일(JSON) 내보내기 (PC 파일 저장)
  const exportAllData = () => {
    try {
      const backupData = {
        app: 'Edu Pathfinder',
        version: '1.0',
        exportedAt: new Date().toISOString(),
        profiles: profiles,
        activeProfileId: activeProfileId,
        profilesData: {}
      };

      // 모든 프로필별 세부 데이터 수집
      profiles.forEach((p) => {
        const key = `pathfinder_data_${p.id}`;
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            backupData.profilesData[p.id] = JSON.parse(raw);
          } catch {
            backupData.profilesData[p.id] = raw;
          }
        }
      });

      // 현재 활성 프로필의 최신 메모리 데이터도 확실히 동기화
      if (activeProfileId && childData) {
        backupData.profilesData[activeProfileId] = childData;
      }

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      a.href = url;
      a.download = `edu_pathfinder_backup_${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return { success: true };
    } catch (e) {
      console.error('Failed to export backup data', e);
      return { success: false, error: e.message };
    }
  };

  // 백업 파일(JSON) 가져오기 및 복원
  const importAllData = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('유효하지 않은 백업 데이터 형식입니다.');
      }

      const importedProfiles = parsed.profiles;
      if (!Array.isArray(importedProfiles) || importedProfiles.length === 0) {
        throw new Error('백업 파일에 저장된 프로필 정보가 없습니다.');
      }

      // 1. 프로필 목록 저장
      localStorage.setItem('pathfinder_profiles', JSON.stringify(importedProfiles));
      setProfiles(importedProfiles);

      // 2. 각 프로필별 데이터 저장
      if (parsed.profilesData && typeof parsed.profilesData === 'object') {
        Object.entries(parsed.profilesData).forEach(([pid, pData]) => {
          localStorage.setItem(`pathfinder_data_${pid}`, JSON.stringify(pData));
        });
      }

      // 3. 활성 프로필 복원
      const targetActiveId = parsed.activeProfileId && importedProfiles.some((p) => p.id === parsed.activeProfileId)
        ? parsed.activeProfileId
        : importedProfiles[0].id;

      setActiveProfileId(targetActiveId);
      localStorage.setItem('pathfinder_active_profile_id', targetActiveId);
      localStorage.setItem('pathfinder_onboarded', 'true');
      setIsOnboardingOpen(false);

      // 현재 childData 즉시 갱신
      if (parsed.profilesData && parsed.profilesData[targetActiveId]) {
        setChildData(parsed.profilesData[targetActiveId]);
      } else {
        const saved = localStorage.getItem(`pathfinder_data_${targetActiveId}`);
        if (saved) {
          setChildData(JSON.parse(saved));
        }
      }

      return { success: true, count: importedProfiles.length };
    } catch (e) {
      console.error('Failed to import backup data', e);
      return { success: false, error: e.message };
    }
  };

  // 온보딩 건너뛰기 / 나중에 입력하기 (모달 닫기)
  const skipOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  // 신규 프로필 추가
  const addProfile = (name, grade) => {
    const newId = `profile-${Date.now()}`;
    const newProfile = {
      id: newId,
      name: name.trim() || '새 프로필',
      grade: grade || '중3',
      targetYear: getTargetYear(grade || '중3'),
      color: profiles.length % 2 === 0 ? 'rose' : 'indigo'
    };
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newId);
  };

  // 프로필 정보 수정
  const updateProfile = (id, updatedFields) => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updatedFields };
          if (updatedFields.grade) {
            updated.targetYear = getTargetYear(updatedFields.grade);
          }
          return updated;
        }
        return p;
      })
    );
  };

  // 프로필 삭제 (모든 사용자가 삭제되어 0명이 되면 다시 입력 모달 자동 오픈)
  const removeProfile = (id) => {
    const filtered = profiles.filter((p) => p.id !== id);
    setProfiles(filtered);
    if (filtered.length === 0) {
      setActiveProfileId('');
      setIsOnboardingOpen(true);
      try {
        localStorage.removeItem('pathfinder_profiles');
        localStorage.removeItem('pathfinder_active_profile_id');
      } catch (e) {
        console.error(e);
      }
    } else if (activeProfileId === id) {
      setActiveProfileId(filtered[0].id);
    }
    try {
      localStorage.removeItem(`pathfinder_data_${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  // 현재 활성 프로필 객체 (없을 시 기본 템플릿)
  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0] || {
    id: 'user-default',
    name: '미등록',
    grade: '중3',
    targetYear: '2028 대입 개편안',
    color: 'indigo'
  };

  // 3단계 교육과정 모드: 학생의 프로필 학년에 따라 100% 자동 결정 (단일 진실 공급원)
  const educationTier = getEducationTierFromGrade(activeProfile?.grade);
  const isEasyMode = educationTier === 'elementary';
  const isMiddleMode = educationTier === 'middle';
  const isHighMode = educationTier === 'high';

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        activeProfile,
        activeProfileId,
        setActiveProfileId,
        childData,
        updateChildData,
        addProfile,
        updateProfile,
        removeProfile,
        isOnboardingOpen,
        setIsOnboardingOpen,
        completeOnboarding,
        skipOnboarding,
        getTargetYear,
        educationTier,
        isEasyMode,
        isMiddleMode,
        isHighMode,
        exportAllData,
        importAllData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

