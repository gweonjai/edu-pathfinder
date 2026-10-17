import React from 'react';

/**
 * 에듀 패스파인더(Edu Pathfinder) 공식 심볼 아이콘
 * 
 * [디자인 철학]
 * - 기존 AI 특유의 뻔한 원형 나침반(Compass with needle)과 불필요한 깜빡임 애니메이션 탈피
 * - 지식의 탐구 경로(Pathway)와 나아갈 목표 지점을 비추는 노스스타(North Star)를
 *   정교하고 미니멀한 기하학적 다이아몬드 형태로 결합한 모던 에듀테크 엠블럼
 */
export const PathfinderIcon = ({ className = 'w-6 h-6', ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* 1. 외곽 기하학 다이아몬드 프레임 (균형과 구조적 안정감) */}
      <path
        d="M12 2.8L14.6 9.4L21.2 12L14.6 14.6L12 21.2L9.4 14.6L2.8 12L9.4 9.4L12 2.8Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* 2. 내부 중심 코어 비콘 (선명한 미래 방향을 비추는 핵심 앵커) */}
      <path
        d="M12 6.8L13.6 10.4L17.2 12L13.6 13.6L12 17.2L10.4 13.6L6.8 12L10.4 10.4L12 6.8Z"
        fill="currentColor"
      />
      {/* 3. 정밀 가이드 포인트 (정북·진로 지향점) */}
      <circle cx="12" cy="12" r="1.2" fill="#ffffff" />
    </svg>
  );
};
