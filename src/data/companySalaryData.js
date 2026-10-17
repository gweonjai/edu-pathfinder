// 국내 시가총액 상위 50대 핵심 기업 및 주요 목표 기업 대졸 신입 초임 데이터베이스 (2024~2025 최신)
// 출처: DART 전자공시(사업보고서), 알리오(ALIO), 잡코리아·사람인·잡플래닛·블라인드 채용 데이터 취합

export const COMPANY_SALARY_MAP = {
  '삼천당제약': {
    "company": "삼천당제약",
    "baseSalary": "4,500만 ~ 5,000만",
    "totalSalary": "5,300만 ~ 6,200만",
    "incentiveNote": "정기 경영성과급 및 제약 R&D 인센티브 지급"
},
  '넷마블': {
    "company": "넷마블",
    "baseSalary": "4,800만 ~ 5,300만",
    "totalSalary": "5,800만 ~ 7,000만",
    "incentiveNote": "신작 게임 흥행 성과에 따른 프로젝트 성과급 지급"
},
  '현대로템': {
    "company": "현대로템",
    "baseSalary": "5,000만 ~ 5,500만",
    "totalSalary": "7,000만 ~ 8,500만",
    "incentiveNote": "현대차그룹 성과급 및 K-방산 수출 호황 격려금 지급"
},
  '카카오뱅크': {
    "company": "카카오뱅크",
    "baseSalary": "5,400만 ~ 6,000만",
    "totalSalary": "7,000만 ~ 9,000만",
    "incentiveNote": "인터넷전문은행 실적 성과급 및 스톡옵션 등 금융 테크 최고 대우"
},
  'S-Oil': {
    "company": "S-Oil",
    "baseSalary": "5,400만 ~ 6,000만",
    "totalSalary": "7,500만 ~ 9,500만",
    "incentiveNote": "정유업계 최고 수준의 정기 상여금 및 유가 실적 연동 성과급"
},
  '미래에셋증권': {
    "company": "미래에셋증권",
    "baseSalary": "5,500만 ~ 6,000만",
    "totalSalary": "7,500만 ~ 1억 1,000만",
    "incentiveNote": "성과급 중심 보상 체계로 IB 및 운용 부서 성과급 비중 매우 높음"
},
  '삼성증권': {
    "company": "삼성증권",
    "baseSalary": "5,500만 ~ 6,000만",
    "totalSalary": "7,500만 ~ 1억 500만",
    "incentiveNote": "삼성그룹 OPI(초과이익성과급) 최대 연봉의 50% 지급 가능"
},
  '한국투자증권': {
    "company": "한국투자증권",
    "baseSalary": "5,500만 ~ 6,200만",
    "totalSalary": "7,500만 ~ 1억 2,000만",
    "incentiveNote": "업계 최상위권 IB 성과급 지급, 개인 역량에 따른 인센티브 격차 큼"
},
  'NH투자증권': {
    "company": "NH투자증권",
    "baseSalary": "5,500만 ~ 6,000만",
    "totalSalary": "7,500만 ~ 1억",
    "incentiveNote": "안정적인 기본급 체계와 농협 계열 금융 복지, IB 성과급 지급"
},
  'CJ제일제당': {
    "company": "CJ제일제당",
    "baseSalary": "4,800만 ~ 5,300만",
    "totalSalary": "5,800만 ~ 6,800만",
    "incentiveNote": "식품 및 바이오 사업부 실적에 따른 경영성과급 지급"
},
  '신세계': {
    "company": "신세계",
    "baseSalary": "4,600만 ~ 5,100만",
    "totalSalary": "5,500만 ~ 6,300만",
    "incentiveNote": "백화점 영업 성과 및 계열사 할인 혜택, 설·추석 상여금"
},
  '호텔신라': {
    "company": "호텔신라",
    "baseSalary": "4,600만 ~ 5,000만",
    "totalSalary": "5,300만 ~ 6,200만",
    "incentiveNote": "삼성그룹 OPI 및 면세점·호텔 실적 기반 성과급 체계"
},
  // ================= 1. 반도체 / IT 전자 제조 =================
  '삼성전자(DS)': {
    company: '삼성전자(DS부문)',
    baseSalary: '5,300만',
    totalSalary: '7,500만 ~ 8,800만',
    incentiveNote: '기본급 5,300만 + TAI(최대 100%) + OPI(최대 50%) 연동',
    badgeType: 'semiconductor',
    marketCapRank: 1
  },
  'SK하이닉스': {
    company: 'SK하이닉스',
    baseSalary: '5,300만',
    totalSalary: '8,500만 ~ 1억',
    incentiveNote: 'HBM 호황 기준 기본급 5,300만 + 초과이익분배금(PS 최대 1,000%)',
    badgeType: 'semiconductor',
    marketCapRank: 2
  },
  '삼성전자(DX)': {
    company: '삼성전자(DX부문)',
    baseSalary: '5,300만',
    totalSalary: '6,600만 ~ 7,800만',
    incentiveNote: '기본급 5,300만 + 모바일/가전 사업부 실적별 OPI(20~40%)',
    badgeType: 'tech',
    marketCapRank: 1
  },
  '삼성전자': {
    company: '삼성전자',
    baseSalary: '5,300만',
    totalSalary: '7,000만 ~ 8,500만',
    incentiveNote: '대졸 공채 기본급 5,300만 원 + 사업부별 OPI/TAI 성과급',
    badgeType: 'tech',
    marketCapRank: 1
  },
  'LG전자': {
    company: 'LG전자',
    baseSalary: '5,120만',
    totalSalary: '6,200만 ~ 7,200만',
    incentiveNote: '기본급 5,120만 원 + H&A·VS(전장) 사업본부별 경영성과급',
    badgeType: 'tech',
    marketCapRank: 22
  },
  '삼성전기': {
    company: '삼성전기',
    baseSalary: '5,100만',
    totalSalary: '6,000만 ~ 7,000만',
    incentiveNote: 'MLCC 및 반도체 패키지기판 실적 연동 OPI',
    badgeType: 'tech',
    marketCapRank: 34
  },
  'LG이노텍': {
    company: 'LG이노텍',
    baseSalary: '5,100만',
    totalSalary: '6,000만 ~ 7,200만',
    incentiveNote: '카메라 모듈 및 모빌리티 전장 부품 실적 성과급',
    badgeType: 'tech',
    marketCapRank: 44
  },
  '한미반도체': {
    company: '한미반도체',
    baseSalary: '4,800만 ~ 5,200만',
    totalSalary: '6,500만 ~ 8,000만',
    incentiveNote: 'HBM용 TC 본더 글로벌 독점 공급에 따른 특별 인센티브',
    badgeType: 'semiconductor',
    marketCapRank: 18
  },
  'DB하이텍': {
    company: 'DB하이텍',
    baseSalary: '4,800만',
    totalSalary: '5,800만 ~ 6,800만',
    incentiveNote: '8인치 파운드리 특화 및 전력반도체 경영성과급',
    badgeType: 'semiconductor',
    marketCapRank: 48
  },
  '리노공업': {
    company: '리노공업',
    baseSalary: '4,600만',
    totalSalary: '5,500만 ~ 6,500만',
    incentiveNote: '반도체 검사용 리노핀/소켓 세계 1위, 영업이익률 40%대 우량주',
    badgeType: 'semiconductor',
    marketCapRank: 42
  },

  // ================= 2. 2차전지 / 배터리 / 신소재 =================
  'LG에너지솔루션': {
    company: 'LG에너지솔루션',
    baseSalary: '5,150만',
    totalSalary: '6,800만 ~ 7,800만',
    incentiveNote: '북미 배터리 실적 기반 성과급 반영 시 7천만 원 초중반',
    badgeType: 'battery',
    marketCapRank: 3
  },
  '삼성SDI': {
    company: '삼성SDI',
    baseSalary: '5,300만',
    totalSalary: '6,800만 ~ 7,800만',
    incentiveNote: '각형 배터리 및 전고체 R&D 실적 연동 OPI',
    badgeType: 'battery',
    marketCapRank: 12
  },
  'POSCO홀딩스': {
    company: '포스코(POSCO)',
    baseSalary: '5,200만',
    totalSalary: '6,500만 ~ 7,500만',
    incentiveNote: '철강 및 이차전지 소재 지주사, 안정적 복리후생',
    badgeType: 'tech',
    marketCapRank: 7
  },
  '포스코퓨처엠': {
    company: '포스코퓨처엠',
    baseSalary: '5,000만',
    totalSalary: '6,000만 ~ 7,000만',
    incentiveNote: '양극재·음극재 종합 배터리 소재 대기업',
    badgeType: 'battery',
    marketCapRank: 15
  },
  '에코프로비엠': {
    company: '에코프로비엠',
    baseSalary: '4,800만',
    totalSalary: '5,800만 ~ 7,000만',
    incentiveNote: '하이니켈 양극재 글로벌 1위, 코스닥 최상위 시총',
    badgeType: 'battery',
    marketCapRank: 16
  },
  '에코프로': {
    company: '에코프로',
    baseSalary: '4,800만',
    totalSalary: '5,600만 ~ 6,800만',
    incentiveNote: '이차전지 지주사, 배터리 밸류체인 구축',
    badgeType: 'battery',
    marketCapRank: 20
  },
  '엘앤에프': {
    company: '엘앤에프',
    baseSalary: '4,600만 ~ 4,900만',
    totalSalary: '5,500만 ~ 6,500만',
    incentiveNote: 'NCMA 하이니켈 양극재 전문 제조사',
    badgeType: 'battery',
    marketCapRank: 40
  },

  // ================= 3. 모빌리티 / 자동차 / 운송 =================
  '현대자동차': {
    company: '현대자동차',
    baseSalary: '5,200만',
    totalSalary: '7,500만 ~ 8,500만',
    incentiveNote: '기본급 5,200만 + 정기상여 + 역대 최대 경영성과급(300%+@)',
    badgeType: 'mobility',
    marketCapRank: 4
  },
  '기아': {
    company: '기아(KIA)',
    baseSalary: '5,200만',
    totalSalary: '7,500만 ~ 8,500만',
    incentiveNote: '영업이익률 12% 돌파, 글로벌 SUV·EV 호황 성과급 반영',
    badgeType: 'mobility',
    marketCapRank: 5
  },
  '현대모비스': {
    company: '현대모비스',
    baseSalary: '5,100만',
    totalSalary: '6,800만 ~ 7,800만',
    incentiveNote: '전동화 및 자율주행 모듈 R&D 인센티브',
    badgeType: 'mobility',
    marketCapRank: 6
  },
  '현대글로비스': {
    company: '현대글로비스',
    baseSalary: '5,000만',
    totalSalary: '6,200만 ~ 7,200만',
    incentiveNote: '완성차 해상운송 및 글로벌 종합물류 SCM',
    badgeType: 'mobility',
    marketCapRank: 28
  },
  '대한항공': {
    company: '대한항공',
    baseSalary: '4,800만 ~ 5,200만',
    totalSalary: '6,000만 ~ 7,200만',
    incentiveNote: '여객/화물 실적 기반 경영성과급(안전장려금 별도)',
    badgeType: 'mobility',
    marketCapRank: 27
  },
  'HMM': {
    company: 'HMM(구 현대상선)',
    baseSalary: '5,000만',
    totalSalary: '6,500만 ~ 7,800만',
    incentiveNote: '국내 최대 원양 컨테이너 선사, 해운 실적 성과급',
    badgeType: 'mobility',
    marketCapRank: 29
  },

  // ================= 4. 방산 / 조선 / 중공업 / 원전 =================
  '한화에어로스페이스': {
    company: '한화에어로스페이스',
    baseSalary: '5,200만',
    totalSalary: '7,500만 ~ 8,800만',
    incentiveNote: 'K9자주포·천무 수출 대박, 글로벌 K-방산 최고 호황 성과급',
    badgeType: 'defense',
    marketCapRank: 10
  },
  'HD현대중공업': {
    company: 'HD현대중공업',
    baseSalary: '5,100만',
    totalSalary: '6,800만 ~ 8,000만',
    incentiveNote: 'LNG선 및 친환경 선박 수주 호황, 조선업 턴어라운드 성과급',
    badgeType: 'heavy',
    marketCapRank: 11
  },
  'HD한국조선해양': {
    company: 'HD한국조선해양',
    baseSalary: '5,200만',
    totalSalary: '7,000만 ~ 8,200만',
    incentiveNote: 'HD현대그룹 조선부문 중간지주사 및 친환경 선박 R&D',
    badgeType: 'heavy',
    marketCapRank: 13
  },
  'HD현대일렉트릭': {
    company: 'HD현대일렉트릭',
    baseSalary: '5,000만',
    totalSalary: '7,200만 ~ 8,500만',
    incentiveNote: '북미 AI 데이터센터 전력망 변압기 슈퍼사이클 수혜',
    badgeType: 'heavy',
    marketCapRank: 14
  },
  '한국항공우주': {
    company: '한국항공우주산업(KAI)',
    baseSalary: '5,000만',
    totalSalary: '6,500만 ~ 7,800만',
    incentiveNote: 'KF-21 보라매 및 FA-50 글로벌 방산 수출 인센티브',
    badgeType: 'defense',
    marketCapRank: 26
  },
  '삼성중공업': {
    company: '삼성중공업',
    baseSalary: '5,000만',
    totalSalary: '6,200만 ~ 7,200만',
    incentiveNote: 'FLNG 해양플랜트 및 고부가가치 LNG선 중심 수주',
    badgeType: 'heavy',
    marketCapRank: 23
  },
  '한화오션': {
    company: '한화오션(구 대우조선해양)',
    baseSalary: '5,100만',
    totalSalary: '6,500만 ~ 7,500만',
    incentiveNote: '특수선(잠수함/수상함) 및 상선 부문 처우 대폭 개선',
    badgeType: 'heavy',
    marketCapRank: 25
  },
  '두산에너빌리티': {
    company: '두산에너빌리티',
    baseSalary: '4,900만',
    totalSalary: '6,000만 ~ 7,200만',
    incentiveNote: '체코 원전 수주 및 SMR(소형모듈원전), 가스터빈 R&D',
    badgeType: 'heavy',
    marketCapRank: 17
  },

  // ================= 5. 바이오 / 제약 / 헬스케어 =================
  '삼성바이오로직스': {
    company: '삼성바이오로직스',
    baseSalary: '5,300만',
    totalSalary: '7,200만 ~ 8,500만',
    incentiveNote: '바이오의약품 CDMO 세계 1위, OPI 최대 50% 지급',
    badgeType: 'bio',
    marketCapRank: 8
  },
  '셀트리온': {
    company: '셀트리온',
    baseSalary: '5,100만',
    totalSalary: '6,500만 ~ 7,800만',
    incentiveNote: '바이오시밀러(짐펜트라 등) 글로벌 직판 확대 인센티브',
    badgeType: 'bio',
    marketCapRank: 9
  },
  '알테오젠': {
    company: '알테오젠',
    baseSalary: '4,800만 ~ 5,300만',
    totalSalary: '6,000만 ~ 7,500만',
    incentiveNote: '피하주사(SC) 플랫폼 머크(MSD) 독점 라이선스 수출 바이오 대장주',
    badgeType: 'bio',
    marketCapRank: 19
  },
  '유한양행': {
    company: '유한양행',
    baseSalary: '4,800만',
    totalSalary: '5,800만 ~ 6,800만',
    incentiveNote: '국산 항암신약 렉라자 FDA 승인, 업계 최고 수준 복지',
    badgeType: 'bio',
    marketCapRank: 31
  },
  '한미약품': {
    company: '한미약품',
    baseSalary: '4,700만',
    totalSalary: '5,600만 ~ 6,500만',
    incentiveNote: '개량신약 및 비만치료제 파이프라인 R&D 중심',
    badgeType: 'bio',
    marketCapRank: 45
  },
  'SK바이오팜': {
    company: 'SK바이오팜',
    baseSalary: '5,000만',
    totalSalary: '6,200만 ~ 7,500만',
    incentiveNote: '뇌전증 혁신신약 엑스코프리 미국 직판 흑자 전환',
    badgeType: 'bio',
    marketCapRank: 39
  },

  // ================= 6. IT / 플랫폼 / 테크 / 게임 =================
  'NAVER': {
    company: '네이버(NAVER)',
    baseSalary: '5,300만 ~ 5,600만',
    totalSalary: '6,500만 ~ 7,800만',
    incentiveNote: '개발직 기준 초봉 5천 중반 + 인센티브 및 스톡그랜트(연 1,000만)',
    badgeType: 'platform',
    marketCapRank: 21
  },
  '카카오': {
    company: '카카오(Kakao)',
    baseSalary: '5,000만 ~ 5,400만',
    totalSalary: '6,000만 ~ 7,200만',
    incentiveNote: '개발 직군 기준 기본 초봉 5천 초중반 + 성과급/복지포인트',
    badgeType: 'platform',
    marketCapRank: 30
  },
  '크래프톤': {
    company: '크래프톤(KRAFTON)',
    baseSalary: '5,500만 ~ 6,000만',
    totalSalary: '7,000만 ~ 8,500만',
    incentiveNote: '배틀그라운드 글로벌 IP 기반, 업계 최고 수준 기본급 및 개발 인센티브',
    badgeType: 'platform',
    marketCapRank: 24
  },
  '엔씨소프트': {
    company: '엔씨소프트',
    baseSalary: '5,000만 ~ 5,500만',
    totalSalary: '5,800만 ~ 6,800만',
    incentiveNote: '개발 직군 초봉 5,500만 원선 + 신작 출시 인센티브',
    badgeType: 'platform',
    marketCapRank: 49
  },
  '삼성SDS': {
    company: '삼성SDS',
    baseSalary: '5,100만',
    totalSalary: '6,200만 ~ 7,000만',
    incentiveNote: '생성형 AI(브리티 코파일럿) 및 클라우드 실적 OPI',
    badgeType: 'tech',
    marketCapRank: 32
  },
  '쿠팡': {
    company: '쿠팡(Coupang)',
    baseSalary: '5,800만 ~ 6,200만',
    totalSalary: '6,500만 ~ 7,500만',
    incentiveNote: '빅테크 수준 개발자 기본 초봉 6천만 원선 + RSU',
    badgeType: 'platform'
  },
  '무신사': {
    company: '무신사(MUSINSA)',
    baseSalary: '3,600만 ~ 3,900만',
    totalSalary: '3,800만 ~ 4,300만',
    incentiveNote: '패션 플랫폼 브랜드 마케팅 및 MD 대졸 신입 (포괄임금)',
    badgeType: 'platform'
  },
  '배달의민족': {
    company: '우아한형제들(배달의민족)',
    baseSalary: '4,000만 ~ 4,400만',
    totalSalary: '4,400만 ~ 4,900만',
    incentiveNote: '우아한형제들 비개발(마케팅/사업운영) 대졸 신입 기준',
    badgeType: 'platform'
  },

  // ================= 7. 통신 / 네트워크 =================
  'SK텔레콤': {
    company: 'SK텔레콤(SKT)',
    baseSalary: '5,300만',
    totalSalary: '7,500만 ~ 8,800만',
    incentiveNote: '기본급 5,300만 + 통신/AI 실적 연동 인센티브(IB)',
    badgeType: 'tech',
    marketCapRank: 33
  },
  'KT': {
    company: 'KT',
    baseSalary: '4,800만 ~ 5,100만',
    totalSalary: '5,800만 ~ 6,800만',
    incentiveNote: 'AICT 혁신 기업 전환, 안정적 복지 및 통신 성과급',
    badgeType: 'tech',
    marketCapRank: 35
  },
  'LG유플러스': {
    company: 'LG유플러스',
    baseSalary: '4,700만 ~ 5,000만',
    totalSalary: '5,600만 ~ 6,500만',
    incentiveNote: '통신 및 B2B 플랫폼 사업 성과급',
    badgeType: 'tech',
    marketCapRank: 50
  },

  // ================= 8. 금융 / 지주 / 보험 =================
  'KB금융': {
    company: 'KB금융지주 / KB국민은행',
    baseSalary: '5,200만 ~ 5,500만',
    totalSalary: '6,800만 ~ 8,200만',
    incentiveNote: '금융 대장주, 은행권 최고 수준 고정급 + 이익배분 성과급',
    badgeType: 'finance',
    marketCapRank: 36
  },
  '신한지주': {
    company: '신한금융지주 / 신한은행',
    baseSalary: '5,200만 ~ 5,500만',
    totalSalary: '6,800만 ~ 8,000만',
    incentiveNote: '글로벌 및 비은행 부문 강화, 경영성과급 연동',
    badgeType: 'finance',
    marketCapRank: 37
  },
  '하나금융지주': {
    company: '하나금융지주 / 하나은행',
    baseSalary: '5,100만 ~ 5,400만',
    totalSalary: '6,600만 ~ 7,800만',
    incentiveNote: '외환·기업금융 강점, 이익연동 성과급',
    badgeType: 'finance',
    marketCapRank: 38
  },
  '우리금융지주': {
    company: '우리금융지주 / 우리은행',
    baseSalary: '5,000만 ~ 5,300만',
    totalSalary: '6,300만 ~ 7,500만',
    incentiveNote: '종합금융그룹 포트폴리오 완성에 따른 성과급',
    badgeType: 'finance',
    marketCapRank: 41
  },
  '메리츠금융지주': {
    company: '메리츠금융지주(화재/증권)',
    baseSalary: '5,200만 ~ 5,600만',
    totalSalary: '7,000만 ~ 8,800만',
    incentiveNote: '철저한 성과주의 보상 체계, 업계 최상위 인센티브',
    badgeType: 'finance',
    marketCapRank: 43
  },
  '삼성물산': {
    company: '삼성물산',
    baseSalary: '5,200만',
    totalSalary: '6,600만 ~ 7,800만',
    incentiveNote: '건설/상사/패션/리조트 종합 지주사, OPI 연동',
    badgeType: 'tech',
    marketCapRank: 46
  },
  '삼성생명': {
    company: '삼성생명',
    baseSalary: '5,200만',
    totalSalary: '6,800만 ~ 8,000만',
    incentiveNote: '국내 1위 생명보험사, 자산운용 및 보험 실적 OPI',
    badgeType: 'finance',
    marketCapRank: 47
  },
  '삼성화재': {
    company: '삼성화재',
    baseSalary: '5,300만',
    totalSalary: '7,500만 ~ 8,800만',
    incentiveNote: '손해보험사 압도적 1위, OPI 최대 50% 지급',
    badgeType: 'finance',
    marketCapRank: 35
  },

  // ================= 9. 화학 / 에너지 / 식음료 =================
  'LG화학': {
    company: 'LG화학',
    baseSalary: '5,150만',
    totalSalary: '6,300만 ~ 7,400만',
    incentiveNote: '석유화학/첨단소재 부문별 성과급 차등 반영',
    badgeType: 'tech',
    marketCapRank: 45
  },
  'S-OIL': {
    company: 'S-OIL(에쓰오일)',
    baseSalary: '5,500만',
    totalSalary: '7,500만 ~ 9,000만',
    incentiveNote: '정유업계 최고 수준 기본급 + 유가/정제마진 성과급',
    badgeType: 'oil'
  },
  'SK이노베이션': {
    company: 'SK이노베이션',
    baseSalary: '5,300만',
    totalSalary: '7,000만 ~ 8,500만',
    incentiveNote: '에너지/화학 종합 지주사, 기본급 5,300만 + 인센티브',
    badgeType: 'oil'
  },
  '고려아연': {
    company: '고려아연',
    baseSalary: '5,100만',
    totalSalary: '6,800만 ~ 8,000만',
    incentiveNote: '비철금속 제련 세계 1위, 신재생·이차전지 소재 확장',
    badgeType: 'heavy'
  },
  'KT&G': {
    company: 'KT&G',
    baseSalary: '5,000만',
    totalSalary: '6,200만 ~ 7,200만',
    incentiveNote: '글로벌 전자담배(NGP) 및 건강기능식품 수출 호황',
    badgeType: 'service'
  },

  // ================= 10. 광고 / 마케팅 / 미디어 =================
  '제일기획': {
    company: '제일기획',
    baseSalary: '4,500만 ~ 4,800만',
    totalSalary: '5,200만 ~ 6,000만',
    incentiveNote: '삼성 계열 국내 1위 종합광고대행사 공채 신입 기준',
    badgeType: 'service'
  },
  '이노션': {
    company: '이노션(INNOCEAN)',
    baseSalary: '4,400만 ~ 4,700만',
    totalSalary: '5,000만 ~ 5,800만',
    incentiveNote: '현대차 계열 종합광고대행사 공채 신입 기준',
    badgeType: 'service'
  },
  'HS애드': {
    company: 'HS애드(HSAD)',
    baseSalary: '4,100만 ~ 4,400만',
    totalSalary: '4,600만 ~ 5,200만',
    incentiveNote: 'LG 계열 종합광고대행사 공채 신입 기준',
    badgeType: 'service'
  },
  '대홍기획': {
    company: '대홍기획',
    baseSalary: '3,700만 ~ 4,000만',
    totalSalary: '4,000만 ~ 4,500만',
    incentiveNote: '롯데 계열 종합광고대행사 공채 신입 기준',
    badgeType: 'service'
  },

  // ================= 11. 학과별 대표 우량 중견 / 전문 IT / 공기업 / 바이오 =================
  '안랩': {
    company: '안랩(AhnLab)',
    baseSalary: '4,100만 ~ 4,500만',
    totalSalary: '4,600만 ~ 5,300만',
    incentiveNote: '국내 1위 정보보안 소프트웨어 대표기업 공채 기준',
    badgeType: 'tech'
  },
  'SK쉴더스': {
    company: 'SK쉴더스',
    baseSalary: '4,100만 ~ 4,500만',
    totalSalary: '4,500만 ~ 5,200만',
    incentiveNote: '정보보안(인포섹) 및 물리보안 융합 선도기업',
    badgeType: 'tech'
  },
  'HL만도': {
    company: 'HL만도',
    baseSalary: '4,900만 ~ 5,200만',
    totalSalary: '5,800만 ~ 6,800만',
    incentiveNote: '글로벌 자율주행 섀시·조향·제동 모빌리티 전문 대기업',
    badgeType: 'mobility'
  },
  '현대위아': {
    company: '현대위아',
    baseSalary: '4,800만 ~ 5,100만',
    totalSalary: '5,600만 ~ 6,500만',
    incentiveNote: '현대차그룹 공작기계·모빌리티 구동 부품 핵심사',
    badgeType: 'mobility'
  },
  '한국콜마': {
    company: '한국콜마',
    baseSalary: '4,100만 ~ 4,400만',
    totalSalary: '4,500만 ~ 5,200만',
    incentiveNote: '국내 1위 화장품 및 제약 ODM 연구개발 전문기업',
    badgeType: 'bio'
  },
  '코스맥스': {
    company: '코스맥스',
    baseSalary: '4,100만 ~ 4,400만',
    totalSalary: '4,500만 ~ 5,200만',
    incentiveNote: '글로벌 1위 화장품 연구개발 생산(ODM) 기업',
    badgeType: 'bio'
  },
  '종근당': {
    company: '종근당',
    baseSalary: '4,300만 ~ 4,600만',
    totalSalary: '4,800만 ~ 5,600만',
    incentiveNote: '전통 상위 제약사 R&D 및 병원영업 기준',
    badgeType: 'bio'
  },
  '대웅제약': {
    company: '대웅제약',
    baseSalary: '4,500만 ~ 4,800만',
    totalSalary: '5,200만 ~ 6,000만',
    incentiveNote: '나보타 글로벌 수출 및 위식도염 신약 호조',
    badgeType: 'bio'
  },
  'GC녹십자': {
    company: 'GC녹십자',
    baseSalary: '4,300만 ~ 4,600만',
    totalSalary: '4,800만 ~ 5,500만',
    incentiveNote: '혈액제제 및 백신 분야 국내 최고 권위',
    badgeType: 'bio'
  },
  '오스템임플란트': {
    company: '오스템임플란트',
    baseSalary: '4,300만 ~ 4,700만',
    totalSalary: '5,000만 ~ 6,000만',
    incentiveNote: '아시아 1위 글로벌 치과의료기기 임플란트 전문',
    badgeType: 'bio'
  },
  '토스': {
    company: '토스(비바리퍼블리카)',
    baseSalary: '5,200만 ~ 5,800만',
    totalSalary: '6,000만 ~ 7,500만',
    incentiveNote: '국내 대표 종합 핀테크 유니콘 기업',
    badgeType: 'tech'
  },
  '당근': {
    company: '당근(당근마켓)',
    baseSalary: '4,800만 ~ 5,300만',
    totalSalary: '5,500만 ~ 6,500만',
    incentiveNote: '국내 최대 지역 기반 하이퍼로컬 플랫폼',
    badgeType: 'tech'
  },
  'SM엔터테인먼트': {
    company: 'SM엔터테인먼트',
    baseSalary: '3,800만 ~ 4,200만',
    totalSalary: '4,200만 ~ 4,800만',
    incentiveNote: 'K-POP 글로벌 아티스트 매니지먼트 및 A&R',
    badgeType: 'service'
  },
  'JYP': {
    company: 'JYP엔터테인먼트',
    baseSalary: '3,800만 ~ 4,200만',
    totalSalary: '4,300만 ~ 5,000만',
    incentiveNote: '글로벌 아이돌 프로듀싱 및 해외 사업',
    badgeType: 'service'
  },
  '스튜디오드래곤': {
    company: '스튜디오드래곤',
    baseSalary: '3,900만 ~ 4,300만',
    totalSalary: '4,400만 ~ 5,200만',
    incentiveNote: 'CJ 계열 글로벌 1위 K-드라마 전문 제작사',
    badgeType: 'service'
  },
  '한국전력공사': {
    company: '한국전력공사(한전)',
    baseSalary: '4,000만 ~ 4,300만',
    totalSalary: '4,200만 ~ 4,700만',
    incentiveNote: '알리오 공시 기준 최대 에너지 공기업 대졸 초임',
    badgeType: 'public'
  },
  '한국토지주택공사': {
    company: '한국토지주택공사(LH)',
    baseSalary: '3,800만 ~ 4,100만',
    totalSalary: '4,000만 ~ 4,500만',
    incentiveNote: '국토 인프라 개발 및 공공주택 공기업 대졸 초임',
    badgeType: 'public'
  },
  '인천국제공항공사': {
    company: '인천국제공항공사',
    baseSalary: '4,500만 ~ 4,800만',
    totalSalary: '4,800만 ~ 5,400만',
    incentiveNote: '공기업 중 최상위권 대졸 신입 초임 및 복지',
    badgeType: 'public'
  },
  'KOTRA': {
    company: 'KOTRA(대한무역투자진흥공사)',
    baseSalary: '4,100만 ~ 4,400만',
    totalSalary: '4,300만 ~ 4,800만',
    incentiveNote: '글로벌 무역 및 해외 투자유치 지원 준정부기관',
    badgeType: 'public'
  },
  '금융결제원': {
    company: '금융결제원',
    baseSalary: '4,700만 ~ 5,000만',
    totalSalary: '5,300만 ~ 6,000만',
    incentiveNote: '국가 핵심 금융전산망 운영 기관 (안정성 최상위)',
    badgeType: 'finance'
  },
  '한국갤럽': {
    company: '한국갤럽',
    baseSalary: '3,800만 ~ 4,100만',
    totalSalary: '4,000만 ~ 4,500만',
    incentiveNote: '국내 최고 권위 여론 및 시장조사 전문기관',
    badgeType: 'service'
  },

  // ================= 15. 100대 기업 완성 신규 12개사 =================
  'CJ ENM': {
    company: 'CJ ENM',
    baseSalary: '4,400만 ~ 4,700만',
    totalSalary: '5,000만 ~ 5,800만',
    incentiveNote: 'CJ그룹 공채 신입 기준 고정 기본급 + 미디어/콘텐츠 성과급',
    badgeType: 'service'
  },
  '아모레퍼시픽': {
    company: '아모레퍼시픽',
    baseSalary: '4,500만 ~ 4,800만',
    totalSalary: '5,200만 ~ 6,000만',
    incentiveNote: '아모레퍼시픽그룹 공채 신입 기준 기본급 + 이익 성과급',
    badgeType: 'consumer'
  },
  'LG생활건강': {
    company: 'LG생활건강',
    baseSalary: '4,600만 ~ 4,900만',
    totalSalary: '5,400만 ~ 6,300만',
    incentiveNote: 'LG그룹 소비재 공채 신입 기준 고정 기본급 + 인센티브',
    badgeType: 'consumer'
  },
  '하이트진로': {
    company: '하이트진로',
    baseSalary: '4,400만 ~ 4,700만',
    totalSalary: '5,000만 ~ 5,800만',
    incentiveNote: '국내 1위 주류 기업 대졸 공채 신입 기본급 + 복리후생',
    badgeType: 'consumer'
  },
  '오리온': {
    company: '오리온',
    baseSalary: '4,300만 ~ 4,600만',
    totalSalary: '4,800만 ~ 5,500만',
    incentiveNote: '글로벌 제과 공채 신입 기준 고정 기본급 + 해외실적 성과급',
    badgeType: 'consumer'
  },
  '농심': {
    company: '농심',
    baseSalary: '4,400만 ~ 4,700만',
    totalSalary: '5,000만 ~ 5,800만',
    incentiveNote: 'K-라면 글로벌 수출 호황 인센티브 + 대졸 공채 기본급',
    badgeType: 'consumer'
  },
  '빙그레': {
    company: '빙그레',
    baseSalary: '4,200만 ~ 4,500만',
    totalSalary: '4,700만 ~ 5,400만',
    incentiveNote: '식음료/유가공 공채 신입 기준 기본급 + 상여금',
    badgeType: 'consumer'
  },
  '삼양식품': {
    company: '삼양식품',
    baseSalary: '4,300만 ~ 4,700만',
    totalSalary: '5,200만 ~ 6,500만',
    incentiveNote: '불닭볶음면 글로벌 메가히트에 따른 역대 최대 특별 성과급 반영',
    badgeType: 'consumer'
  },
  '카카오페이': {
    company: '카카오페이',
    baseSalary: '5,000만 ~ 5,500만',
    totalSalary: '5,800만 ~ 7,000만',
    incentiveNote: '카카오 계열 대표 핀테크 개발 신입 기준 기본급 + 인센티브',
    badgeType: 'it'
  },
  '키움증권': {
    company: '키움증권',
    baseSalary: '5,000만 ~ 5,400만',
    totalSalary: '6,200만 ~ 8,000만',
    incentiveNote: '리테일 주식 점유율 1위 증권사 공채 신입 기본급 + 실적 성과급',
    badgeType: 'finance'
  },
  '현대건설': {
    company: '현대건설',
    baseSalary: '5,100만 ~ 5,400만',
    totalSalary: '6,200만 ~ 7,500만',
    incentiveNote: '현대차 계열 건설 1위 공채 신입 기본급 + 현장수당/성과급',
    badgeType: 'heavy'
  },
  'GS칼텍스': {
    company: 'GS칼텍스',
    baseSalary: '5,400만 ~ 5,800만',
    totalSalary: '7,500만 ~ 9,000만',
    incentiveNote: '정유업계 최고 수준 대졸 초임 기본급 + 정제마진 인센티브',
    badgeType: 'oil'
  }
};

/**
 * 기업명을 입력받아 연봉 데이터를 조회하는 헬퍼 함수
 */
export function getCompanySalary(companyName) {
  if (!companyName) return null;
  const cleanName = companyName.trim();

  // 1. 정확한 매핑
  if (COMPANY_SALARY_MAP[cleanName]) {
    return COMPANY_SALARY_MAP[cleanName];
  }

  // 2. 이름 부분 매칭 규칙
  if (cleanName.includes('삼성전자') && cleanName.includes('DS')) return COMPANY_SALARY_MAP['삼성전자(DS)'];
  if (cleanName.includes('삼성전자') && cleanName.includes('DX')) return COMPANY_SALARY_MAP['삼성전자(DX)'];
  if (cleanName.includes('삼성전자')) return COMPANY_SALARY_MAP['삼성전자'];
  if (cleanName.includes('하이닉스')) return COMPANY_SALARY_MAP['SK하이닉스'];
  if (cleanName.includes('LG에너지솔루션') || cleanName.includes('엔솔')) return COMPANY_SALARY_MAP['LG에너지솔루션'];
  if (cleanName.includes('현대차') || cleanName.includes('현대자동차')) return COMPANY_SALARY_MAP['현대자동차'];
  if (cleanName.includes('기아')) return COMPANY_SALARY_MAP['기아'];
  if (cleanName.includes('현대모비스')) return COMPANY_SALARY_MAP['현대모비스'];
  if (cleanName.includes('현대글로비스')) return COMPANY_SALARY_MAP['현대글로비스'];
  if (cleanName.includes('포스코') && cleanName.includes('퓨처엠')) return COMPANY_SALARY_MAP['포스코퓨처엠'];
  if (cleanName.includes('포스코') || cleanName.includes('POSCO')) return COMPANY_SALARY_MAP['POSCO홀딩스'];
  if (cleanName.includes('에코프로비엠')) return COMPANY_SALARY_MAP['에코프로비엠'];
  if (cleanName.includes('에코프로')) return COMPANY_SALARY_MAP['에코프로'];
  if (cleanName.includes('엘앤에프')) return COMPANY_SALARY_MAP['엘앤에프'];
  if (cleanName.includes('네이버') || cleanName.includes('NAVER')) return COMPANY_SALARY_MAP['NAVER'];
  if (cleanName.includes('카카오')) return COMPANY_SALARY_MAP['카카오'];
  if (cleanName.includes('크래프톤')) return COMPANY_SALARY_MAP['크래프톤'];
  if (cleanName.includes('엔씨소프트')) return COMPANY_SALARY_MAP['엔씨소프트'];
  if (cleanName.includes('삼성SDS')) return COMPANY_SALARY_MAP['삼성SDS'];
  if (cleanName.includes('바이오로직스')) return COMPANY_SALARY_MAP['삼성바이오로직스'];
  if (cleanName.includes('셀트리온')) return COMPANY_SALARY_MAP['셀트리온'];
  if (cleanName.includes('알테오젠')) return COMPANY_SALARY_MAP['알테오젠'];
  if (cleanName.includes('유한양행')) return COMPANY_SALARY_MAP['유한양행'];
  if (cleanName.includes('한미약품')) return COMPANY_SALARY_MAP['한미약품'];
  if (cleanName.includes('SK바이오팜')) return COMPANY_SALARY_MAP['SK바이오팜'];
  if (cleanName.includes('한화에어로스페이스')) return COMPANY_SALARY_MAP['한화에어로스페이스'];
  if (cleanName.includes('HD현대중공업')) return COMPANY_SALARY_MAP['HD현대중공업'];
  if (cleanName.includes('HD한국조선해양')) return COMPANY_SALARY_MAP['HD한국조선해양'];
  if (cleanName.includes('HD현대일렉트릭')) return COMPANY_SALARY_MAP['HD현대일렉트릭'];
  if (cleanName.includes('항공우주') || cleanName.includes('KAI')) return COMPANY_SALARY_MAP['한국항공우주'];
  if (cleanName.includes('삼성중공업')) return COMPANY_SALARY_MAP['삼성중공업'];
  if (cleanName.includes('한화오션')) return COMPANY_SALARY_MAP['한화오션'];
  if (cleanName.includes('두산에너빌리티')) return COMPANY_SALARY_MAP['두산에너빌리티'];
  if (cleanName.includes('대한항공')) return COMPANY_SALARY_MAP['대한항공'];
  if (cleanName.includes('HMM')) return COMPANY_SALARY_MAP['HMM'];
  if (cleanName.includes('SK텔레콤') || cleanName.includes('SKT')) return COMPANY_SALARY_MAP['SK텔레콤'];
  if (cleanName.includes('KT') && !cleanName.includes('KT&G')) return COMPANY_SALARY_MAP['KT'];
  if (cleanName.includes('LG유플러스')) return COMPANY_SALARY_MAP['LG유플러스'];
  if (cleanName.includes('KB') || cleanName.includes('국민은행')) return COMPANY_SALARY_MAP['KB금융'];
  if (cleanName.includes('신한')) return COMPANY_SALARY_MAP['신한지주'];
  if (cleanName.includes('하나은행') || cleanName.includes('하나금융')) return COMPANY_SALARY_MAP['하나금융지주'];
  if (cleanName.includes('우리은행') || cleanName.includes('우리금융')) return COMPANY_SALARY_MAP['우리금융지주'];
  if (cleanName.includes('메리츠')) return COMPANY_SALARY_MAP['메리츠금융지주'];
  if (cleanName.includes('삼성생명')) return COMPANY_SALARY_MAP['삼성생명'];
  if (cleanName.includes('삼성화재')) return COMPANY_SALARY_MAP['삼성화재'];
  if (cleanName.includes('삼성물산')) return COMPANY_SALARY_MAP['삼성물산'];
  if (cleanName.includes('S-OIL') || cleanName.includes('에쓰오일')) return COMPANY_SALARY_MAP['S-OIL'];
  if (cleanName.includes('SK이노베이션')) return COMPANY_SALARY_MAP['SK이노베이션'];
  if (cleanName.includes('고려아연')) return COMPANY_SALARY_MAP['고려아연'];
  if (cleanName.includes('KT&G')) return COMPANY_SALARY_MAP['KT&G'];
  if (cleanName.includes('제일기획')) return COMPANY_SALARY_MAP['제일기획'];
  if (cleanName.includes('이노션')) return COMPANY_SALARY_MAP['이노션'];
  if (cleanName.includes('HS애드') || cleanName.includes('HSAD')) return COMPANY_SALARY_MAP['HS애드'];
  if (cleanName.includes('무신사')) return COMPANY_SALARY_MAP['무신사'];
  if (cleanName.includes('배달의민족') || cleanName.includes('우아한형제들')) return COMPANY_SALARY_MAP['배달의민족'];
  if (cleanName.includes('쿠팡')) return COMPANY_SALARY_MAP['쿠팡'];
  if (cleanName.includes('안랩') || cleanName.includes('AhnLab')) return COMPANY_SALARY_MAP['안랩'];
  if (cleanName.includes('SK쉴더스')) return COMPANY_SALARY_MAP['SK쉴더스'];
  if (cleanName.includes('HL만도') || cleanName.includes('만도')) return COMPANY_SALARY_MAP['HL만도'];
  if (cleanName.includes('현대위아')) return COMPANY_SALARY_MAP['현대위아'];
  if (cleanName.includes('한국콜마')) return COMPANY_SALARY_MAP['한국콜마'];
  if (cleanName.includes('코스맥스')) return COMPANY_SALARY_MAP['코스맥스'];
  if (cleanName.includes('종근당')) return COMPANY_SALARY_MAP['종근당'];
  if (cleanName.includes('대웅제약')) return COMPANY_SALARY_MAP['대웅제약'];
  if (cleanName.includes('녹십자')) return COMPANY_SALARY_MAP['GC녹십자'];
  if (cleanName.includes('오스템')) return COMPANY_SALARY_MAP['오스템임플란트'];
  if (cleanName.includes('토스')) return COMPANY_SALARY_MAP['토스'];
  if (cleanName.includes('당근')) return COMPANY_SALARY_MAP['당근'];
  if (cleanName.includes('SM') || cleanName.includes('에스엠')) return COMPANY_SALARY_MAP['SM엔터테인먼트'];
  if (cleanName.includes('JYP')) return COMPANY_SALARY_MAP['JYP'];
  if (cleanName.includes('스튜디오드래곤')) return COMPANY_SALARY_MAP['스튜디오드래곤'];
  if (cleanName.includes('한전') || cleanName.includes('한국전력')) return COMPANY_SALARY_MAP['한국전력공사'];
  if (cleanName.includes('LH') || cleanName.includes('토지주택공사')) return COMPANY_SALARY_MAP['한국토지주택공사'];
  if (cleanName.includes('인천국제공항공사') || cleanName.includes('인천공항')) return COMPANY_SALARY_MAP['인천국제공항공사'];
  if (cleanName.includes('KOTRA') || cleanName.includes('코트라')) return COMPANY_SALARY_MAP['KOTRA'];
  if (cleanName.includes('금융결제원')) return COMPANY_SALARY_MAP['금융결제원'];
  if (cleanName.includes('갤럽')) return COMPANY_SALARY_MAP['한국갤럽'];
  if (cleanName.includes('ENM')) return COMPANY_SALARY_MAP['CJ ENM'];
  if (cleanName.includes('아모레')) return COMPANY_SALARY_MAP['아모레퍼시픽'];
  if (cleanName.includes('LG생활건강') || cleanName.includes('생활건강')) return COMPANY_SALARY_MAP['LG생활건강'];
  if (cleanName.includes('하이트진로')) return COMPANY_SALARY_MAP['하이트진로'];
  if (cleanName.includes('오리온')) return COMPANY_SALARY_MAP['오리온'];
  if (cleanName.includes('농심')) return COMPANY_SALARY_MAP['농심'];
  if (cleanName.includes('빙그레')) return COMPANY_SALARY_MAP['빙그레'];
  if (cleanName.includes('삼양식품')) return COMPANY_SALARY_MAP['삼양식품'];
  if (cleanName.includes('카카오페이')) return COMPANY_SALARY_MAP['카카오페이'];
  if (cleanName.includes('키움증권') || cleanName.includes('키움')) return COMPANY_SALARY_MAP['키움증권'];
  if (cleanName.includes('현대건설')) return COMPANY_SALARY_MAP['현대건설'];
  if (cleanName.includes('GS칼텍스')) return COMPANY_SALARY_MAP['GS칼텍스'];

  // 3. 업종 및 규모 패턴 기반 현실적 Fallback
  if (cleanName.includes('은행') || cleanName.includes('증권') || cleanName.includes('카드') || cleanName.includes('금융')) {
    return {
      company: cleanName,
      baseSalary: '5,000만 ~ 5,400만',
      totalSalary: '6,200만 ~ 7,500만',
      incentiveNote: '제1금융권/증권사 신입 기준 고정급 및 이익성과급',
      badgeType: 'finance'
    };
  }
  if (cleanName.includes('공사') || cleanName.includes('공단') || cleanName.includes('연구원')) {
    return {
      company: cleanName,
      baseSalary: '3,800만 ~ 4,300만',
      totalSalary: '4,000만 ~ 4,600만',
      incentiveNote: '공공기관 경영정보(알리오) 공시 기준 대졸 신입 초임',
      badgeType: 'public'
    };
  }

  // 4. 일반 대기업/중견기업 대졸 신입 표준 현실적 폴백
  return {
    company: cleanName,
    baseSalary: '3,800만 ~ 4,300만',
    totalSalary: '4,200만 ~ 5,000만',
    incentiveNote: '채용 포털 취합 대졸 신입 평균 기본 계약급 기준 (직무별 상이)',
    badgeType: 'default'
  };
}
