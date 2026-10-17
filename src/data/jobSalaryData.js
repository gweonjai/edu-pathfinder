// 전공 학과별 주요 진출 직무(Role) 및 최신 대졸 신입 기본 연봉 데이터베이스
// 출처: 잡코리아·사람인·잡플래닛·블라인드 2024~2025 최신 채용 데이터 및 대졸 합격자 초임 취합
// 기준: 세전 연간 고정 기본급 (인센티브·명절상여·복지포인트 제외 기본 계약액)

export const MAJOR_JOB_SALARIES = {
  // ================= 1. 인문 / 어문 / 미디어 =================
  'ad_pr': [
    {
      role: '종합광고대행사 AE (광고기획)',
      baseSalary: '3,800만 ~ 4,300만',
      totalSalary: '4,200만 ~ 5,000만',
      target: '제일기획, 이노션, HS애드, 대홍기획 등',
      desc: '광고주 영입, 캠페인 전략 수립, 예산 및 제작 일정 총괄',
      tier: 'top'
    },
    {
      role: '인하우스 브랜드 마케터',
      baseSalary: '3,500만 ~ 4,000만',
      totalSalary: '3,800만 ~ 4,600만',
      target: '무신사, 배달의민족, 아모레퍼시픽, 소비재 기업',
      desc: '자사 브랜드 기획, 소비자 커뮤니케이션, 프로모션 및 SNS 운영',
      tier: 'mid'
    },
    {
      role: '디지털 / 퍼포먼스 마케터',
      baseSalary: '3,400만 ~ 3,900만',
      totalSalary: '3,700만 ~ 4,400만',
      target: '나스미디어, 메조미디어, 디지털 마케팅 에이전시',
      desc: '데이터 기반 광고 집행, 검색광고(SA/DA), 전환율(CVR) 최적화',
      tier: 'mid'
    }
  ],
  'media_comm': [
    {
      role: '방송/미디어 콘텐츠 PD·기획',
      baseSalary: '3,600만 ~ 4,200만',
      totalSalary: '4,000만 ~ 4,800만',
      target: '지상파/종편 방송사, CJ ENM, 스튜디오드래곤, OTT 제작사',
      desc: '프로그램 및 오리지널 영상 콘텐츠 기획·연출·편집 총괄',
      tier: 'top'
    },
    {
      role: '기업 홍보팀(PR) / 대외협력',
      baseSalary: '4,000만 ~ 4,600만',
      totalSalary: '4,800만 ~ 5,500만',
      target: '주요 대기업 홍보실, 금융사 홍보팀',
      desc: '보도자료 배포, 언론사 대응, 기업 리스크 및 위기관리',
      tier: 'mid'
    },
    {
      role: '뉴미디어 에디터 / 영상 크리에이터',
      baseSalary: '3,300만 ~ 3,800만',
      totalSalary: '3,500만 ~ 4,200만',
      target: 'MCN 기업, 디지털 미디어랩, 플랫폼 기업',
      desc: '숏폼 영상, 웹진, 유튜브 채널 기획 및 채널 브랜딩',
      tier: 'mid'
    }
  ],
  'korean_lit': [
    {
      role: '기업 브랜드 에디터 / 카피라이터',
      baseSalary: '3,400만 ~ 3,900만',
      totalSalary: '3,700만 ~ 4,400만',
      target: '광고대행사, 이커머스 콘텐츠팀, 잡지/출판 미디어',
      desc: '브랜드 스토리텔링, 광고 카피 작성, 제품 상세페이지 기획',
      tier: 'mid'
    },
    {
      role: '출판 기획자 / 도서 편집자',
      baseSalary: '3,100만 ~ 3,600만',
      totalSalary: '3,300만 ~ 3,800만',
      target: '민음사, 문학동네, 웅진씽크빅, 다산북스 등',
      desc: '신간 기획, 저자 섭외, 원고 윤문 및 도서 제작 프로세스 관리',
      tier: 'regular'
    },
    {
      role: '에듀테크 국어 교육 콘텐츠 기획자',
      baseSalary: '3,400만 ~ 4,000만',
      totalSalary: '3,600만 ~ 4,300만',
      target: '메가스터디, 대성마이맥, 교원, 에스티유니타스',
      desc: '수능/내신 문제 출제, 학습 교재 및 온라인 강의 커리큘럼 개발',
      tier: 'mid'
    }
  ],
  'english_lit': [
    {
      role: '해외영업 / 글로벌 사업개발',
      baseSalary: '4,200만 ~ 4,800만',
      totalSalary: '5,000만 ~ 6,000만',
      target: '종합상사, 제조 대기업 해외영업본부, 소비재 글로벌팀',
      desc: '해외 바이어 발굴, 글로벌 수출입 계약, 해외 거점 커뮤니케이션',
      tier: 'top'
    },
    {
      role: '글로벌 커뮤니케이션 / 외자계 마케팅',
      baseSalary: '3,800만 ~ 4,500만',
      totalSalary: '4,200만 ~ 5,000만',
      target: '다국적 기업 한국지사, PR 에이전시',
      desc: '본사 가이드라인 로컬라이징, 글로벌 파트너십 관리',
      tier: 'mid'
    }
  ],

  // ================= 2. 상경 / 경영 / 경제 =================
  'business': [
    {
      role: '대기업 경영기획 / 전략기획',
      baseSalary: '4,500만 ~ 5,200만',
      totalSalary: '5,500만 ~ 6,800만',
      target: '삼성, SK, 현대차, LG 등 주요 그룹사 지주사/기획실',
      desc: '중장기 사업전략 수립, 신사업 투자 검토, 전사 KPI 관리',
      tier: 'top'
    },
    {
      role: '재무 / 회계 / 자금관리',
      baseSalary: '4,300만 ~ 4,900만',
      totalSalary: '5,000만 ~ 6,200만',
      target: '대기업 재경팀, 중견기업 재무실',
      desc: '결산 관리, 세무 신고, 자금 조달 및 현금흐름(Cashflow) 운영',
      tier: 'mid'
    },
    {
      role: '인사(HR) / 조직문화 담당',
      baseSalary: '4,000만 ~ 4,600만',
      totalSalary: '4,800만 ~ 5,800만',
      target: '대기업 인사팀, 유니콘 플랫폼 기업',
      desc: '인재 채용, 평가보상 체계 설계, 사내 교육 및 조직문화 개선',
      tier: 'mid'
    },
    {
      role: '이커머스 MD / 상품기획',
      baseSalary: '3,600만 ~ 4,200만',
      totalSalary: '4,000만 ~ 4,800만',
      target: '쿠팡, 네이버쇼핑, 컬리, 무신사, 백화점 유통사',
      desc: '카테고리별 브랜드 소싱, 매출 분석, 프로모션 및 재고 관리',
      tier: 'mid'
    }
  ],
  'economics': [
    {
      role: '금융공기업 조사역 / 종합기획',
      baseSalary: '4,400만 ~ 4,800만',
      totalSalary: '4,800만 ~ 5,400만',
      target: '한국은행, 금융감독원, 산업은행, 수출입은행',
      desc: '거시경제 동향 조사, 통화금융정책 수립, 금융회사 감독/검사',
      tier: 'top'
    },
    {
      role: '시중은행 기업금융 / 여신심사',
      baseSalary: '5,000만 ~ 5,500만',
      totalSalary: '6,200만 ~ 7,500만',
      target: 'KB국민, 신한, 하나, 우리은행',
      desc: '법인 여신 심사, 기업 신용평가, 금융 포트폴리오 제안',
      tier: 'top'
    },
    {
      role: '증권사 리서치센터 RA (Research Associate)',
      baseSalary: '4,500만 ~ 5,200만',
      totalSalary: '5,500만 ~ 7,000만',
      target: '미래에셋증권, 한국투자증권, NH투자증권',
      desc: '산업 및 기업 분석 리포트 작성 보조, 재무 모델링 구축',
      tier: 'top'
    }
  ],
  'statistics': [
    {
      role: '데이터 사이언티스트 / 비즈니스 분석가',
      baseSalary: '4,500만 ~ 5,300만',
      totalSalary: '5,200만 ~ 6,500만',
      target: '네이버, 카카오, 금융사 빅데이터센터, 통신사',
      desc: '통계적 가설 검정, 고객 행동 분석, 머신러닝 예측 모델링',
      tier: 'top'
    },
    {
      role: '보험계리사 / 리스크 관리(RM)',
      baseSalary: '4,600만 ~ 5,300만',
      totalSalary: '5,500만 ~ 7,000만',
      target: '삼성생명, 삼성화재, 현대해상, 재보험사',
      desc: '보험 상품 위험률 산출, 준비금 부채 평가, 건전성 지표 분석',
      tier: 'top'
    }
  ],

  // ================= 3. 사회과학 / 행정 / 심리 =================
  'psychology': [
    {
      role: 'UX 리서처 / 서비스 기획자',
      baseSalary: '3,800만 ~ 4,400만',
      totalSalary: '4,300만 ~ 5,000만',
      target: '토스, 배달의민족, 네이버, IT 플랫폼',
      desc: '사용자 심리 및 행동 분석, UT(사용성 테스트) 진행, 인터페이스 개선',
      tier: 'mid'
    },
    {
      role: '조직심리 / 인사평가·HR 컨설턴트',
      baseSalary: '3,700만 ~ 4,300만',
      totalSalary: '4,200만 ~ 5,000만',
      target: '인사 컨설팅펌(머서, 콘페리), 대기업 인사연구원',
      desc: '인재 역량 진단 도구 개발, 조직 진단 설문, 평가센터(AC) 설계',
      tier: 'mid'
    },
    {
      role: '임상/상담 심리전문가 (수련·석사 필수)',
      baseSalary: '3,200만 ~ 3,700만',
      totalSalary: '3,400만 ~ 4,000만',
      target: '대학병원 정신건강의학과, 청소년상담복지센터, 사설상담센터',
      desc: '종합심리평가(Full Battery), 1:1 심리상담 치료 진행',
      tier: 'regular'
    }
  ],
  'public_admin': [
    {
      role: '공공기관 / 공기업 일반행정직',
      baseSalary: '3,800만 ~ 4,300만',
      totalSalary: '4,100만 ~ 4,700만',
      target: '한국토지주택공사(LH), 한국전력, 건강보험공단 등',
      desc: '공공 정책 집행, 사업 계획 수립, 예산 회계 및 민원 총괄',
      tier: 'mid'
    },
    {
      role: '대기업 대외협력(CR) / 공공사업팀',
      baseSalary: '4,200만 ~ 4,800만',
      totalSalary: '5,000만 ~ 6,000만',
      target: '통신사, 플랫폼 대기업 대외협력실',
      desc: '정부 입법 동향 모니터링, 규제 리스크 대응, 공공 발주 사업 참여',
      tier: 'mid'
    }
  ],

  // ================= 4. IT / 컴퓨터 / 소프트웨어 =================
  'computer_science': [
    {
      role: '백엔드 / 프론트엔드 SW 개발자',
      baseSalary: '5,000만 ~ 6,000만',
      totalSalary: '6,000만 ~ 7,500만',
      target: '네이버, 카카오, 라인, 쿠팡, 당근 등',
      desc: '대규모 트래픽 분산 처리 시스템 구축, 웹/앱 서비스 개발',
      tier: 'top'
    },
    {
      role: 'IT 서비스 / 시스템 엔지니어 (SI)',
      baseSalary: '4,500만 ~ 5,100만',
      totalSalary: '5,500만 ~ 6,500만',
      target: '삼성SDS, LG CNS, SK C&C, 현대오토에버',
      desc: '엔터프라이즈 ERP/클라우드 시스템 구축, 고객사 솔루션 운영',
      tier: 'mid'
    },
    {
      role: 'AI / 데이터 플랫폼 엔지니어',
      baseSalary: '5,200만 ~ 6,200만',
      totalSalary: '6,500만 ~ 8,000만',
      target: '포털 대기업, AI 스타트업, 반도체 DX 연구소',
      desc: '대규모 데이터 파이프라인(ETL) 구축, 머신러닝 서빙 인프라 운영',
      tier: 'top'
    }
  ],
  'ai_software': [
    {
      role: 'AI 모델 연구원 (ML/DL Engineer)',
      baseSalary: '5,200만 ~ 6,500만',
      totalSalary: '6,500만 ~ 8,500만',
      target: '삼성리서치, 네이버클라우드(하이퍼클로바X), 카카오브레인',
      desc: 'LLM 미세조정, 생성형 AI 서비스 개발, 최신 논문 알고리즘 구현',
      tier: 'top'
    },
    {
      role: '컴퓨터비전 / 음성인식 엔지니어',
      baseSalary: '5,000만 ~ 6,000만',
      totalSalary: '6,000만 ~ 7,500만',
      target: '자율주행 모빌리티, 보안 솔루션, 의료 AI 기업',
      desc: '영상 객체 인식, 음성 합성 및 인식 모델 상용화 개발',
      tier: 'top'
    }
  ],

  // ================= 5. 전기 / 전자 / 반도체 =================
  'electrical_eng': [
    {
      role: '반도체 공정설계 / 회로설계 엔지니어',
      baseSalary: '5,300만',
      totalSalary: '7,500만 ~ 8,800만',
      target: '삼성전자 DS부문, SK하이닉스',
      desc: '메모리(DRAM/NAND/HBM) 회로 레이아웃 설계, 공정 수율 개선',
      tier: 'top'
    },
    {
      role: '전장(전자장비) 시스템 엔지니어',
      baseSalary: '5,100만 ~ 5,300만',
      totalSalary: '6,300만 ~ 7,500만',
      target: '현대모비스, LG전자 VS사업본부, 삼성전기',
      desc: '전기차 전력변환 인버터, 차량용 반도체 제어기 하드웨어 설계',
      tier: 'top'
    }
  ],
  'mechanical_eng': [
    {
      role: '자동차 차체/샤시/의장 설계 엔지니어',
      baseSalary: '5,100만 ~ 5,300만',
      totalSalary: '6,800만 ~ 8,000만',
      target: '현대자동차, 기아, 현대위아, HL만도',
      desc: '차량 구조 강도 해석(CAE), 부품 3D CAD 모델링 및 충돌 안전성 검증',
      tier: 'top'
    },
    {
      role: '로보틱스 / 자동화 기계기구 설계',
      baseSalary: '4,800만 ~ 5,300만',
      totalSalary: '6,000만 ~ 7,200만',
      target: '두산로보틱스, 한화에어로스페이스, 삼성전자 로봇센터',
      desc: '협동로봇 액추에이터 설계, 물류 자동화 스마트팩토리 설비 구축',
      tier: 'top'
    }
  ],
  'chemical_eng': [
    {
      role: '이차전지(배터리) 소재 및 셀 개발',
      baseSalary: '5,150만 ~ 5,300만',
      totalSalary: '6,800만 ~ 8,000만',
      target: 'LG에너지솔루션, 삼성SDI, SK온, 포스코퓨처엠',
      desc: '양극재·음극재 배합 연구, 파우치/원통형 배터리 파일럿 공정 개발',
      tier: 'top'
    },
    {
      role: '정유 / 석유화학 생산공정 관리 엔지니어',
      baseSalary: '5,200만 ~ 5,500만',
      totalSalary: '7,000만 ~ 8,500만',
      target: 'S-OIL, GS칼텍스, SK이노베이션, 롯데케미칼',
      desc: '석유화학 플랜트 증류/분해 반응기 운전, 공정 안전 및 효율 최적화',
      tier: 'top'
    }
  ],

  // ================= 6. 바이오 / 화학 / 환경 =================
  'bio_eng': [
    {
      role: '바이오의약품 공정개발 / 배양정제 (MSAT)',
      baseSalary: '5,000만 ~ 5,300만',
      totalSalary: '6,500만 ~ 7,800만',
      target: '삼성바이오로직스, 셀트리온, SK바이오사이언스',
      desc: '항체 치료제 대량 세포 배양, 정제 스케일업 공정 및 수율 최적화',
      tier: 'top'
    },
    {
      role: '제약 품질관리 / 품질보증 (QC/QA)',
      baseSalary: '4,200만 ~ 4,800만',
      totalSalary: '4,800만 ~ 5,800만',
      target: '유한양행, 한미약품, 대웅제약, GC녹십자',
      desc: '원료 및 완제의약품 GMP 기준 물리화학적 시험 분석, 허가문서 관리',
      tier: 'mid'
    }
  ]
};

// 7대 계열별 표준 직무 폴백 데이터
export const CATEGORY_FALLBACK_JOBS = {
  '공학': [
    {
      role: '제조·기술 대기업 엔지니어 (R&D/공정)',
      baseSalary: '4,800만 ~ 5,300만',
      totalSalary: '6,500만 ~ 8,000만',
      target: '국내 주요 10대 제조 대기업',
      desc: '전공 공학 이론을 바탕으로 한 신제품 설계, 생산 기술 및 공정 개선',
      tier: 'top'
    },
    {
      role: '엔지니어링 / 기술 영업 담당',
      baseSalary: '4,200만 ~ 4,800만',
      totalSalary: '5,000만 ~ 6,200만',
      target: '외자계 솔루션 기업, 플랜트 중견기업',
      desc: '고객사에 기술 스펙 제안, 제품 도입 컨설팅 및 수주 영업',
      tier: 'mid'
    }
  ],
  '인문학': [
    {
      role: '기업 홍보(PR) / 브랜드 마케팅',
      baseSalary: '3,600만 ~ 4,200만',
      totalSalary: '4,000만 ~ 4,800만',
      target: '광고대행사, 소비재 기업 브랜드실',
      desc: '인문학적 통찰을 바탕으로 한 브랜드 메시지 기획 및 콘텐츠 제작',
      tier: 'mid'
    },
    {
      role: '콘텐츠 / 출판 / 교육 기획자',
      baseSalary: '3,300만 ~ 3,800만',
      totalSalary: '3,600만 ~ 4,200만',
      target: '에듀테크, 미디어, 출판사',
      desc: '인문 교양 도서 및 이러닝 교육 콘텐츠 기획·편집',
      tier: 'regular'
    }
  ],
  '사회과학': [
    {
      role: '비즈니스 기획 / 공공·대외협력',
      baseSalary: '4,000만 ~ 4,600만',
      totalSalary: '4,800만 ~ 5,800만',
      target: '주요 대기업 기획실, 공공기관',
      desc: '사회 현상 및 시장 트렌드 조사 분석, 신규 프로젝트 기획',
      tier: 'mid'
    },
    {
      role: '데이터 분석가 / 리서처',
      baseSalary: '3,800만 ~ 4,400만',
      totalSalary: '4,300만 ~ 5,200만',
      target: '여론조사기관, 시장조사 전문펌, 플랫폼 기업',
      desc: '통계 소프트웨어를 활용한 설문 데이터 코딩 및 인사이트 도출',
      tier: 'mid'
    }
  ],
  '경영·경제': [
    {
      role: '대기업 경영지원 / 전략·기획',
      baseSalary: '4,300만 ~ 5,000만',
      totalSalary: '5,200만 ~ 6,500만',
      target: '국내 주요 대기업 본사',
      desc: '사업 계획 수립, 재무 손익 분석, 지배구조 및 투자 전략',
      tier: 'top'
    },
    {
      role: '금융기관 영업 / 고객 자산관리',
      baseSalary: '4,800만 ~ 5,300만',
      totalSalary: '6,000만 ~ 7,200만',
      target: '은행, 증권사, 카드사',
      desc: '금융 상품 마케팅, 자산 포트폴리오 상담, 리스크 심사',
      tier: 'top'
    }
  ],
  '자연과학': [
    {
      role: '기업 부설연구소 분석 연구원 (R&D)',
      baseSalary: '4,000만 ~ 4,600만',
      totalSalary: '4,600만 ~ 5,500만',
      target: '바이오, 정밀화학, 제약 회사 연구소',
      desc: '기초 과학 실험, 신소재/물질 성분 기기분석(HPLC, GC 등)',
      tier: 'mid'
    },
    {
      role: '품질분석 및 인허가(RA) 담당',
      baseSalary: '3,800만 ~ 4,300만',
      totalSalary: '4,300만 ~ 5,000만',
      target: '식품, 화장품, 시험검사 전문기관',
      desc: '제품 안전성 검사, 정부 규제 기준 준수 확인 시험',
      tier: 'regular'
    }
  ],
  '사범·교육': [
    {
      role: '공립/사립 중·고등학교 정교사 (호봉제)',
      baseSalary: '3,300만 ~ 3,700만',
      totalSalary: '3,800만 ~ 4,300만',
      target: '전국 국공립 및 사립 중고등학교',
      desc: '교과 수업 진행, 담임 업무, 생활지도 및 학생부 작성',
      tier: 'public'
    },
    {
      role: '에듀테크 교수설계 / 교육 기획자',
      baseSalary: '3,500만 ~ 4,100만',
      totalSalary: '3,900만 ~ 4,600만',
      target: '웅진씽크빅, 비상교육, 천재교육 등',
      desc: '디지털 교과서 개발, 온라인 학습 플랫폼 교육과정 설계',
      tier: 'mid'
    }
  ],
  '예체능': [
    {
      role: '디지털 UI/UX 및 브랜드 디자이너',
      baseSalary: '3,400만 ~ 4,000만',
      totalSalary: '3,800만 ~ 4,600만',
      target: 'IT 플랫폼, 디자인 에이전시, 대기업 디자인센터',
      desc: '디자인 시스템 구축, 서비스 그래픽 및 브랜드 비주얼 총괄',
      tier: 'mid'
    }
  ]
};

/**
 * 학과 ID 또는 계열명을 기준으로 진출 직무별 대졸 초봉 리스트를 반환
 */
export function getMajorJobSalaries(majorId, categoryName) {
  if (MAJOR_JOB_SALARIES[majorId]) {
    return MAJOR_JOB_SALARIES[majorId];
  }

  // 매칭되는 학과가 없으면 계열명으로 탐색
  const cleanCategory = (categoryName || '').replace(/계열|학부/g, '').trim();
  for (const [catKey, jobs] of Object.entries(CATEGORY_FALLBACK_JOBS)) {
    if (cleanCategory.includes(catKey) || catKey.includes(cleanCategory)) {
      return jobs;
    }
  }

  // 최후의 기본 폴백 (일반 대졸 기준)
  return [
    {
      role: '기업 본사 경영기획 / 마케팅 / 관리직군',
      baseSalary: '3,800만 ~ 4,400만',
      totalSalary: '4,400만 ~ 5,200만',
      target: '우량 중견기업 및 대기업 계열사',
      desc: '전공 지식을 활용한 기획, 분석, 대외 커뮤니케이션 업무 수행',
      tier: 'mid'
    },
    {
      role: '전문 직무 / 실무 스페셜리스트',
      baseSalary: '3,500만 ~ 4,100만',
      totalSalary: '3,900만 ~ 4,600만',
      target: '업계 전문 에이전시 및 전문 솔루션 기업',
      desc: '전공 관련 실무 프로젝트 기획 및 운영 관리',
      tier: 'regular'
    }
  ];
}
