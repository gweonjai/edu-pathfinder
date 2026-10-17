// 국내 시가총액 상위 50대 핵심 기업별 진출 필요 전공(표준 ID 매핑) 및 우대 사유 전수 데이터베이스
// departmentsData.js 의 표준 학과 ID와 100% 동기화됨

export const COMPANY_MAJOR_REQUIREMENTS = {
  '제일기획': {
    "category": "광고/미디어",
    "recommendedMajors": [
        {
            "id": "advertising_pr",
            "name": "광고홍보학과",
            "reason": "삼성전자 및 글로벌 브랜드 캠페인 기획(AE), 크리에이티브 솔루션 제작"
        },
        {
            "id": "media_communication",
            "name": "미디어커뮤니케이션학과",
            "reason": "디지털 영상 미디어 콘텐츠 기획 및 미디어 플래닝 바잉"
        },
        {
            "id": "business",
            "name": "경영학과",
            "reason": "글로벌 광고 마케팅 전략 수립 및 클라이언트 계정 총괄 관리(AE)"
        },
        {
            "id": "psychology",
            "name": "심리학과",
            "reason": "소비자 인사이트 도출, 행동 데이터 분석 및 브랜드 포지셔닝"
        }
    ],
    "hiringDepartments": [
        "캠페인기획(AE)",
        "크리에이티브 디렉션",
        "디지털 퍼포먼스 마케팅",
        "미디어 플래닝"
    ]
},
  '이노션': {
    "category": "광고/미디어",
    "recommendedMajors": [
        {
            "id": "advertising_pr",
            "name": "광고홍보학과",
            "reason": "현대차그룹 글로벌 신차 런칭 캠페인 기획 및 모빌리티 브랜딩"
        },
        {
            "id": "business",
            "name": "경영학과",
            "reason": "글로벌 브랜드 마케팅 및 스폰서십, 신사업 기획"
        },
        {
            "id": "media_communication",
            "name": "미디어커뮤니케이션학과",
            "reason": "글로벌 디지털 콘텐츠 및 공간 경험(스페이스 마케팅) 기획"
        },
        {
            "id": "industrial_design",
            "name": "산업디자인학과",
            "reason": "모터쇼 공간 브랜딩, 인터랙티브 전시 및 크리에이티브 아트 디렉션"
        }
    ],
    "hiringDepartments": [
        "글로벌 캠페인AE",
        "모빌리티 크리에이티브",
        "스페이스 마케팅",
        "미디어 전략"
    ]
},
  'HS애드': {
    "category": "광고/미디어",
    "recommendedMajors": [
        {
            "id": "advertising_pr",
            "name": "광고홍보학과",
            "reason": "LG전자 등 주요 브랜드 통합 마케팅 커뮤니케이션(IMC) 기획"
        },
        {
            "id": "media_communication",
            "name": "미디어커뮤니케이션학과",
            "reason": "스마트라이프 디지털 콘텐츠 제작 및 소셜 미디어 캠페인"
        },
        {
            "id": "business",
            "name": "경영학과",
            "reason": "브랜드 가치 제고 마케팅 및 B2B 브랜드 솔루션 기획"
        }
    ],
    "hiringDepartments": [
        "IMC 기획(AE)",
        "크리에이티브 카피·아트",
        "디지털 플랫폼 솔루션"
    ]
},
  '대홍기획': {
    "category": "광고/미디어",
    "recommendedMajors": [
        {
            "id": "advertising_pr",
            "name": "광고홍보학과",
            "reason": "롯데그룹 유통·소비재 브랜드 광고 캠페인 기획"
        },
        {
            "id": "business",
            "name": "경영학과",
            "reason": "리테일 마케팅 프로모션 및 소비자 행동 분석"
        },
        {
            "id": "computer_science",
            "name": "컴퓨터공학과",
            "reason": "웹3.0, NFT 및 디지털 마케팅 테크 플랫폼 개발"
        }
    ],
    "hiringDepartments": [
        "광고기획(AE)",
        "디지털 마케팅 테크",
        "BTL 프로모션"
    ]
},
  '미래에셋증권': {
    "category": "금융/증권",
    "recommendedMajors": [
        {
            "id": "business",
            "name": "경영학과",
            "reason": "글로벌 기업공개(IPO), M&A 및 대체투자(부동산/인프라) 투자금융(IB)"
        },
        {
            "id": "economics",
            "name": "경제학과",
            "reason": "글로벌 매크로 분석, 리서치센터 애널리스트 및 채권·파생상품 운용"
        },
        {
            "id": "statistics",
            "name": "통계학과",
            "reason": "금융공학 퀀트 모델링 및 리스크 관리, 알고리즘 트레이딩"
        },
        {
            "id": "computer_science",
            "name": "컴퓨터공학과",
            "reason": "차세대 모바일 트레이딩 시스템(MTS) 및 AI 자산관리 플랫폼 개발"
        }
    ],
    "hiringDepartments": [
        "IB사업부(기업금융/PF)",
        "자산운용(트레이딩)",
        "리서치센터",
        "디지털자산/IT"
    ]
},
  '삼성증권': {
    "category": "금융/증권",
    "recommendedMajors": [
        {
            "id": "business",
            "name": "경영학과",
            "reason": "고액자산가(SNI) 자산관리(WM) 및 구조화금융 IB 솔루션"
        },
        {
            "id": "economics",
            "name": "경제학과",
            "reason": "글로벌 주식 리서치 분석 및 채권 트레이딩"
        },
        {
            "id": "statistics",
            "name": "통계학과",
            "reason": "파생결합증권(ELS/DLS) 헤지 운용 및 퀀트 자산배분"
        },
        {
            "id": "software",
            "name": "소프트웨어학과",
            "reason": "스마트 PB 핀테크 플랫폼 및 클라우드 금융 전산"
        }
    ],
    "hiringDepartments": [
        "자산관리(WM)",
        "기업금융(IB)",
        "리서치센터",
        "파생상품운용"
    ]
},
  '한국투자증권': {
    "category": "금융/증권",
    "recommendedMajors": [
        {
            "id": "business",
            "name": "경영학과",
            "reason": "국내 1위 IPO 주관, M&A 자문 및 대형 프로젝트파이낸싱(PF)"
        },
        {
            "id": "economics",
            "name": "경제학과",
            "reason": "거시경제 및 산업 분석 리서치, 채권 발행(DCM) 인수"
        },
        {
            "id": "statistics",
            "name": "통계학과",
            "reason": "금융 리스크 관리(VaR) 및 장외파생 퀀트 평가"
        },
        {
            "id": "mathematics",
            "name": "수학과",
            "reason": "금융공학 파생 모델링 및 구조화 채권 설계"
        }
    ],
    "hiringDepartments": [
        "IB그룹(IPO/PF/M&A)",
        "홀세일(Wholesale)",
        "리서치본부",
        "리스크관리본부"
    ]
},
  'NH투자증권': {
    "category": "금융/증권",
    "recommendedMajors": [
        {
            "id": "business",
            "name": "경영학과",
            "reason": "국내 최상위 DCM/ECM 인수금융 및 대형 인프라 IB 투자"
        },
        {
            "id": "economics",
            "name": "경제학과",
            "reason": "기업 분석 리서치 및 법인 영업(기관 주식/채권)"
        },
        {
            "id": "statistics",
            "name": "통계학과",
            "reason": "포트폴리오 자산배분 및 퇴직연금 퀀트 분석"
        }
    ],
    "hiringDepartments": [
        "IB사업부",
        "WM사업부",
        "리서치본부",
        "디지털전략"
    ]
},
  '쿠팡': {
    "category": "IT/이커머스",
    "recommendedMajors": [
        {
            "id": "computer_science",
            "name": "컴퓨터공학과",
            "reason": "대규모 분산 트래픽 이커머스 백엔드 및 머신러닝 추천 시스템"
        },
        {
            "id": "industrial_engineering",
            "name": "산업공학과",
            "reason": "로켓배송 풀필먼트 물류 네트워크 최적화 및 공급망 알고리즘"
        },
        {
            "id": "business",
            "name": "경영학과",
            "reason": "로켓그로스 리테일 MD, 브랜드 파트너십 및 카테고리 매니지먼트"
        },
        {
            "id": "statistics",
            "name": "통계학과",
            "reason": "수요 예측 빅데이터 모델링 및 다이내믹 프라이싱"
        }
    ],
    "hiringDepartments": [
        "E-Commerce Tech",
        "물류 네트워크 엔지니어링",
        "리테일 MD",
        "비즈니스 오퍼레이션"
    ]
},
  '무신사': {
    "category": "IT/이커머스",
    "recommendedMajors": [
        {
            "id": "business",
            "name": "경영학과",
            "reason": "K-패션 디자이너 브랜드 발굴 및 이커머스 카테고리 MD"
        },
        {
            "id": "computer_science",
            "name": "컴퓨터공학과",
            "reason": "패션 특화 AI 스타일 추천 엔진 및 글로벌 무신사 플랫폼 개발"
        },
        {
            "id": "advertising_pr",
            "name": "광고홍보학과",
            "reason": "패션 트렌드 콘텐츠 기획, 인플루언서 마케팅 및 스냅 에디터"
        }
    ],
    "hiringDepartments": [
        "패션MD 본부",
        "글로벌 비즈니스",
        "Tech 부문",
        "브랜드 마케팅"
    ]
},
  '배달의민족': {
    "category": "IT/이커머스",
    "recommendedMajors": [
        {
            "id": "computer_science",
            "name": "컴퓨터공학과",
            "reason": "배민 앱 대용량 트랜잭션 분산 서버 및 라이더 실시간 배차 알고리즘"
        },
        {
            "id": "business",
            "name": "경영학과",
            "reason": "외식업 파트너 사업개발(BD) 및 배민B마트 커머스 상품기획"
        },
        {
            "id": "media_communication",
            "name": "미디어커뮤니케이션학과",
            "reason": "배민 특유의 위트 있는 B급 감성 브랜드 브랜딩 및 콘텐츠 기획"
        }
    ],
    "hiringDepartments": [
        "프로덕트 엔지니어링",
        "사업개발(BD)",
        "B마트 상품MD",
        "브랜드 마케팅"
    ]
},
  'CJ제일제당': {
    "category": "소비재/식품",
    "recommendedMajors": [
        {
            "id": "food_nutrition",
            "name": "식품영양학과",
            "reason": "비비고 등 글로벌 K-푸드 신제품 개발 및 메뉴 레시피 연구"
        },
        {
            "id": "biotechnology",
            "name": "생명공학과",
            "reason": "화이트바이오 신소재 및 미생물 발효 아미노산 R&D"
        },
        {
            "id": "business",
            "name": "경영학과",
            "reason": "글로벌 식품 브랜드 마케팅 및 북미/유럽 해외영업"
        },
        {
            "id": "chemical_engineering",
            "name": "화학공학과",
            "reason": "바이오 발효 플랜트 및 식품 스마트공장 공정 엔지니어링"
        }
    ],
    "hiringDepartments": [
        "식품연구소(R&D)",
        "BIO 연구소",
        "글로벌 식품마케팅",
        "식품 생산기술"
    ]
},
  '신세계': {
    "category": "소비재/유통",
    "recommendedMajors": [
        {
            "id": "business",
            "name": "경영학과",
            "reason": "신세계백화점 명품/패션/리빙 바이어(MD) 및 점포 영업관리"
        },
        {
            "id": "advertising_pr",
            "name": "광고홍보학과",
            "reason": "백화점 VIP 마케팅, 문화홀 프로모션 및 브랜드 캠페인"
        },
        {
            "id": "architecture",
            "name": "건축학과",
            "reason": "랜드마크 백화점 복합쇼핑몰 공간 설계 및 인테리어 기획"
        }
    ],
    "hiringDepartments": [
        "상품본부(바이어/MD)",
        "영업전략본부",
        "VIP마케팅",
        "신규점포개발"
    ]
},
  '호텔신라': {
    "category": "소비재/유통",
    "recommendedMajors": [
        {
            "id": "business",
            "name": "경영학과",
            "reason": "신라면세점 글로벌 명품 바잉(MD) 및 호텔 서비스 전략기획"
        },
        {
            "id": "english",
            "name": "영어영문학과",
            "reason": "글로벌 명품 브랜드 바이어 협상 및 해외 면세사업 운영"
        },
        {
            "id": "chinese",
            "name": "중어중문학과",
            "reason": "중화권 VIP 여행사 제휴 및 인바운드 관광객 유치 마케팅"
        }
    ],
    "hiringDepartments": [
        "TR부문(신라면세점 바이어)",
        "호텔&레저부문 마케팅",
        "글로벌 사업개발"
    ]
},
  // ================= 1. 반도체 / IT 전자 =================
  '삼성전자(DS)': {
    category: '반도체/전자',
    recommendedMajors: [
      { id: 'semiconductor-eng', name: '반도체공학과', reason: 'DRAM/NAND 메모리 집적공정 및 차세대 소자 물성 R&D' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: 'DRAM/NAND/파운드리 메모리 및 로직 회로 설계(RTL/Layout)' },
      { id: 'materials-eng', name: '신소재공학과', reason: '차세대 반도체 박막 증착, 고유전율 절연막 및 첨단 패키징 소재' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '극자외선(EUV) 노광, 플라즈마 건식식각 및 고순도 특수가스 공정' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '반도체 설계 자동화(EDA) 툴 및 스마트 팹(Fab) AI 제어 시스템' }
    ],
    hiringDepartments: ['메모리사업부', '파운드리사업부', '시스템LSI사업부', '반도체연구소']
  },
  '삼성전자(DX)': {
    category: '반도체/전자',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: 'Galaxy 온디바이스 AI, One UI 플랫폼 및 스마트싱스(SmartThings) 클라우드 개발' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '스마트폰/스마트TV RF 통신, 전원관리(PMIC), 고화질 영상처리 회로 설계' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '폴더블 스마트폰 힌지 기구 메커니즘, 초경량 슬림 방열 기구 설계' },
      { id: 'business-admin', name: '경영학과', reason: '글로벌 모바일·가전 마케팅, 공급망(SCM) 최적화 및 신제품 상품기획' }
    ],
    hiringDepartments: ['MX(모바일경험)사업부', 'VD(영상디스플레이)사업부', 'DA(생활가전)사업부', '삼성리서치(SR)']
  },
  'SK하이닉스': {
    category: '반도체/전자',
    recommendedMajors: [
      { id: 'semiconductor-eng', name: '반도체공학과', reason: '차세대 고성능 HBM 메모리 소자 설계 및 웨이퍼 수율 고도화' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: 'HBM3E/HBM4 초고속 인터페이스 회로 및 TSV 실리콘 관통전극 설계' },
      { id: 'materials-eng', name: '신소재공학과', reason: 'MR-MUF 액상 에폭시 몰딩 및 방열 어드밴스드 패키징 소재' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '초미세 1b/1c 나노 웨이퍼 공정 클린룸 화학 배합 및 수율 개선' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: 'AI 가속기용 메모리 컨트롤러 펌웨어 및 시스템 소프트웨어' }
    ],
    hiringDepartments: ['HBM개발본부', 'DRAM개발실', 'NAND솔루션', 'P&T(패키징)담당']
  },
  'LG전자': {
    category: '반도체/전자',
    recommendedMajors: [
      { id: 'electronic-eng', name: '전자전기공학부', reason: '가전 인버터 모터 제어회로, VS사업본부 차량용 인포테인먼트(IVI)' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '스마트 가전 열교환 압축기(컴프레서) 및 로봇 구동 기구 설계' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: 'webOS 스마트 TV 플랫폼, 씽큐(ThinQ) 스마트홈 AI 서비스' },
      { id: 'business-admin', name: '경영학과', reason: '글로벌 프리미엄 가전 해외영업 및 SCM 공급망 운영' }
    ],
    hiringDepartments: ['H&A(가전)사업본부', 'VS(전장)사업본부', 'HE(TV)사업본부', 'BS사업본부']
  },
  '삼성전기': {
    category: '반도체/전자',
    recommendedMajors: [
      { id: 'materials-eng', name: '신소재공학과', reason: '초소형 고용량 MLCC(적층세라믹커패시터) 유전체 분말 및 세라믹 소결' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: 'FC-BGA 고부가 서버용 반도체 패키지기판 미세 배선 설계' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '기판 도금/에칭 화학 반응 제어 및 복합수지 바인더 배합' }
    ],
    hiringDepartments: ['컴포넌트사업부(MLCC)', '패키지솔루션사업부', '광학통신솔루션']
  },
  'LG이노텍': {
    category: '반도체/전자',
    recommendedMajors: [
      { id: 'electronic-eng', name: '전자전기공학부', reason: '스마트폰 잠망경 폴디드줌 카메라 모듈 및 센서 구동 액추에이터' },
      { id: 'materials-eng', name: '신소재공학과', reason: '차량용 센싱 카메라 렌즈 코팅 및 고방열 전장 기판' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '초정밀 마이크로 광학 렌즈 조립 공차 제어 및 기구 구조' }
    ],
    hiringDepartments: ['광학솔루션사업부', '기판소재사업부', '전장부품사업부']
  },
  '한미반도체': {
    category: '반도체/전자',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: 'HBM용 듀얼 TC 본더 초정밀 열압착 가압 기구 및 진동 제어' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '반도체 패키징 장비 모션 서보 제어기 및 고정밀 비전 센서' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '초미세 반도체 웨이퍼 절단(Sawing) 비전 검사 소프트웨어' }
    ],
    hiringDepartments: ['본더연구개발실', '비전시스템팀', '장비기구설계실']
  },
  'DB하이텍': {
    category: '반도체/전자',
    recommendedMajors: [
      { id: 'electronic-eng', name: '전자전기공학부', reason: '전력반도체(PMIC/SJ-MOSFET), 이미지센서(CIS) 아날로그 공정' },
      { id: 'materials-eng', name: '신소재공학과', reason: 'SiC/GaN 화합물 전력반도체 에피 웨이퍼 물성 분석' }
    ],
    hiringDepartments: ['파운드리영업실', '공정개발본부', '수율품질혁신실']
  },
  '리노공업': {
    category: '반도체/전자',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: '반도체 IC 테스트 소켓 미세 스프링 핀 초정밀 기계가공' },
      { id: 'materials-eng', name: '신소재공학과', reason: '도금 내마모성 합금 소재 연구 및 초미세 접촉 저항 분석' }
    ],
    hiringDepartments: ['정밀가공기술부', '소켓설계팀', '품질보증부']
  },

  // ================= 2. 2차전지 / 배터리 =================
  'LG에너지솔루션': {
    category: '2차전지/소재',
    recommendedMajors: [
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '리튬이온 파우치/원통형 배터리 전극 코팅 슬러리 및 전해액 배합' },
      { id: 'materials-eng', name: '신소재공학과', reason: '차세대 전고체 배터리 고체전해질 및 리튬메탈 음극재 R&D' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '전기차 배터리관리시스템(BMS) 충방전 진단 알고리즘 개발' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '기가팩토리 롤투롤(Roll-to-Roll) 고속 조립 자동화 설비 설계' }
    ],
    hiringDepartments: ['자동차전지개발센터', '소형전지개발팀', '배터리연구소', '공정기술센터']
  },
  '삼성SDI': {
    category: '2차전지/소재',
    recommendedMajors: [
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '프리미엄 각형 배터리(P5/P6) 젤리롤 전해액 함침 및 화성 공정' },
      { id: 'materials-eng', name: '신소재공학과', reason: 'ASB(전고체 배터리) 무음극(Anode-less) 황화물계 전해질 연구' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '대용량 ESS(에너지저장장치) 모듈 전력변환 및 화재 예방 제어' }
    ],
    hiringDepartments: ['중대형전지사업부', '전자재료사업부', 'SDI연구소']
  },
  'POSCO홀딩스': {
    category: '2차전지/소재',
    recommendedMajors: [
      { id: 'materials-eng', name: '신소재공학과', reason: '친환경 수소환원제철(HyREX) 공법 및 고강도 기가스틸 특수강 R&D' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '염호 리튬 직접추출(DLE) 및 니켈 고순도 습식 정련 공정' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '제철소 고온·고압 연속주조 압연 롤 밀(Mill) 기계 설비 유지보수' },
      { id: 'business-admin', name: '경영학과', reason: '글로벌 철강·자원 트레이딩(해외영업) 및 탄소배출권 전략' }
    ],
    hiringDepartments: ['포스코기술연구원', '철강사업본부', '이차전지소재사업팀', '해외마케팅실']
  },
  '포스코퓨처엠': {
    category: '2차전지/소재',
    recommendedMajors: [
      { id: 'materials-eng', name: '신소재공학과', reason: '하이니켈 NCMA 양극재 단결정 소성 및 실리콘 음극재 코팅' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '전구체 합성 반응기 제어 및 인조흑연 흑연화 열처리 공정' }
    ],
    hiringDepartments: ['에너지소재연구소', '양극재생산본부', '음극재생산본부']
  },
  '에코프로비엠': {
    category: '2차전지/소재',
    recommendedMajors: [
      { id: 'materials-eng', name: '신소재공학과', reason: '니켈 90% 이상 울트라 하이니켈 전구체 배합 및 결정립 크기 제어' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '폐배터리 블랙매스 리사이클링 유가금속(리튬/코발트) 회수 공정' }
    ],
    hiringDepartments: ['양극재연구개발본부', '신소재개발센터', '품질분석실']
  },
  '에코프로': {
    category: '2차전지/소재',
    recommendedMajors: [
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '온실가스 감축 PFC 저감 클린룸 촉매 및 친환경 환경엔지니어링' },
      { id: 'business-admin', name: '경영학과', reason: '배터리 클로즈드 루프 에코시스템 지주사 투자 및 신사업 전략' }
    ],
    hiringDepartments: ['환경사업본부', '미래전략실', '투자운영팀']
  },
  '엘앤에프': {
    category: '2차전지/소재',
    recommendedMajors: [
      { id: 'materials-eng', name: '신소재공학과', reason: '단결정 니켈·코발트·망간·알루미늄(NCMA) 양극활물질 미세구조' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: 'LFP(리튬인산철) 대체 배터리 양극재 합성 수율 고도화' }
    ],
    hiringDepartments: ['연구개발본부', '품질경영실', '생산기술실']
  },

  // ================= 3. 모빌리티 / 운송 =================
  '현대자동차': {
    category: '모빌리티/운송',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: '차체 충돌 안전 해석(CAE), 차량 NVH 소음진동, 샤시 조향장치' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: 'E-GMP 전용 전기차 모터 인버터, 충전 제어기(ICCU) 하드웨어' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: 'SDV 자율주행 라이다/카메라 퓨전 인지 판단, 차량용 인포테인먼트' },
      { id: 'business-admin', name: '경영학과', reason: '북미/유럽 권역별 완성차 판매 전략, 딜러 네트워크 관리, 신차 마케팅' }
    ],
    hiringDepartments: ['남양R&D연구소', 'SDV본부', '전동화개발실', '글로벌사업본부']
  },
  '기아': {
    category: '모빌리티/운송',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: 'PBV(목적기반 모빌리티) 모듈러 차체 설계, 승차감 서스펜션 세팅' },
      { id: 'business-admin', name: '경영학과', reason: '기아 EV 시리즈 글로벌 브랜드 캠페인, 해외 완성차 수출입 통관' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '차량 커넥티드 서비스(기아 커넥트) 백엔드 및 OTA 무선 업데이트' }
    ],
    hiringDepartments: ['특수사업부(PBV)', '국내/해외마케팅본부', '품질보증본부']
  },
  '현대모비스': {
    category: '모빌리티/운송',
    recommendedMajors: [
      { id: 'electronic-eng', name: '전자전기공학부', reason: '레벨3 자율주행 통합제어기(DCU), 차량용 밀리미터파 레이더' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: 'AUTOSAR 표준 전장 소프트웨어 아키텍처 및 기능안전(ISO26262)' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '전동식 조향장치(MDPS), 에어백 전개 모듈 및 제동 캘리퍼 기구' }
    ],
    hiringDepartments: ['전장BU', '전동화BU', '자율주행SW개발센터', '샤시안전BU']
  },
  '현대글로비스': {
    category: '모빌리티/운송',
    recommendedMajors: [
      { id: 'business-admin', name: '경영학과', reason: '완성차 해상운송 자동차전용선(PCTC) 운임 관리, 3자물류(3PL) 영업' },
      { id: 'industrial-eng', name: '산업공학과', reason: '글로벌 공급망(SCM) 컨테이너 적재 최적화 및 풀필먼트 물류 거점' }
    ],
    hiringDepartments: ['해운물류사업부', '종합물류본부', '스마트물류연구소']
  },
  '대한항공': {
    category: '모빌리티/운송',
    recommendedMajors: [
      { id: 'aerospace-eng', name: '항공우주공학과', reason: '항공기 감항인증, 보잉/에어버스 기체 중정비(MRO) 및 군용기 개조' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '제트 터보팬 엔진 분해 검사 및 유압/착륙장치 기계정비' },
      { id: 'business-admin', name: '경영학과', reason: '글로벌 여객 노선 수익 관리(RM), 항공 화물 운송 수주 영업' }
    ],
    hiringDepartments: ['정비본부', '항공우주사업본부', '여객수익관리실', '화물영업본부']
  },

  // ================= 4. 바이오 / 제약 =================
  '삼성바이오로직스': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '초대형 1~5공장 바이오리액터 세포 배양 및 단백질 정제(Downstream)' },
      { id: 'biology-science', name: '생명과학과', reason: '항체 바이오의약품 유전자 클로닝, 단클론 항체 특성 분석' },
      { id: 'industrial-eng', name: '산업공학과', reason: 'cGMP 글로벌 규격 생산 스케줄링 및 무균 배치(Batch) 관리' }
    ],
    hiringDepartments: ['배양팀(Upstream)', '정제팀(Downstream)', '품질관리(QC/QA)', 'MSAT(공정지원)']
  },
  '셀트리온': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'biology-science', name: '생명과학과', reason: '짐펜트라, 램시마 등 자가면역·항암 바이오시밀러 균주 개발' },
      { id: 'pharmacy', name: '약학과', reason: '글로벌 임상 3상 시험 디자인, FDA/EMA 신약 허가(RA)' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '무균 완제의약품(DP) 충전 공정 및 바이오시밀러 생산 스케일업' }
    ],
    hiringDepartments: ['신약연구센터', '임상기획실', '글로벌허가(RA)팀', '생산본부']
  },
  '알테오젠': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'biology-science', name: '생명과학과', reason: '정맥주사(IV)를 피하주사(SC)로 변환하는 인간 히알루로니다제 효소 R&D' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '단백질 의약품 변성 억제 배합 제형 및 효소 정제' }
    ],
    hiringDepartments: ['바이오의약품연구원', '단백질공학랩', '글로벌기술수출(BD)실']
  },
  '유한양행': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'pharmacy', name: '약학과', reason: '렉라자(비소세포폐암 치료제) 표적항암제 약리 기전 및 약동학(PK/PD)' },
      { id: 'chemistry', name: '화학과', reason: '저분자 화합물 후보물질 유기 합성 및 결정 다형체 분석' }
    ],
    hiringDepartments: ['중앙연구소', '신약임상개발팀', '의약영업부']
  },
  '한미약품': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'pharmacy', name: '약학과', reason: '랩스커버리(LAPSCOVERY) 지속형 바이오신약 제제 기술 연구' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '복합신약 개량 서방형 제제 생산 및 GMP 밸리데이션' }
    ],
    hiringDepartments: ['신약연구센터', '제제연구소', '품질경영본부']
  },
  'SK바이오팜': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'pharmacy', name: '약학과', reason: '뇌전증 혁신신약 엑스코프리 글로벌 임상 데이터 및 FDA 인허가' },
      { id: 'chemistry', name: '화학과', reason: '중추신경계(CNS) 투과 합성 화합물 분자 모델링' }
    ],
    hiringDepartments: ['신약개발사업부', '글로벌임상본부', '미국현지마케팅팀']
  },
  '삼천당제약': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'pharmacy', name: '약학과', reason: '경구용 인슐린/GLP-1 캡슐 전달 플랫폼(S-PASS) 제형 설계' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '점안제 무균 제조 및 안과용 바이오시밀러 생산라인 제어' }
    ],
    hiringDepartments: ['R&D센터', '글로벌사업본부', '제제기술팀']
  },

  // ================= 5. IT / 플랫폼 / 인터넷 =================
  'NAVER': {
    category: 'IT/인터넷',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '하이퍼클로바X 생성형 초거대 AI, 분산 검색 엔진, 클라우드 플랫폼' },
      { id: 'ai-data-science', name: '인공지능학부', reason: '대규모 사용자 행동 로그 벡터 검색, 추천 알고리즘 랭킹 모델' },
      { id: 'business-admin', name: '경영학과', reason: '스마트스토어 이커머스 입점 전략, 네이버페이 핀테크 제휴 기획' }
    ],
    hiringDepartments: ['서치CIC', '클라우드개발실', '포레스트CIC(쇼핑)', 'AI랩']
  },
  '카카오': {
    category: 'IT/인터넷',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '카카오톡 대용량 실시간 메시징 소켓 분산 서버, 오픈채팅 아키텍처' },
      { id: 'ai-data-science', name: '인공지능학부', reason: '카카오 비즈니스 퍼포먼스 광고 최적화 및 타깃팅 AI' },
      { id: 'media-comm', name: '미디어커뮤니케이션학과', reason: '카카오 콘텐츠(쇼츠/스토리/이모티콘) 플랫폼 서비스 기획' }
    ],
    hiringDepartments: ['플랫폼개발팀', '카카오페이엔지니어링', '광고사업실', '서비스기획실']
  },
  '크래프톤': {
    category: 'IT/인터넷',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '배틀그라운드 언리얼엔진5 C++ 그래픽스 렌더링, 넷코드 동기화' },
      { id: 'ai-data-science', name: '인공지능학부', reason: '게임 내 지능형 버추얼 프렌드 AI 에이전트, 강화학습 봇' },
      { id: 'business-admin', name: '경영학과', reason: '펍지(PUBG) 글로벌 e스포츠 리그 중계권 및 스폰서십 비즈니스' }
    ],
    hiringDepartments: ['펍지스튜디오', '딥러닝연구실', '글로벌퍼블리싱실']
  },
  '넷마블': {
    category: 'IT/인터넷',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '모바일 RPG 네트워크 동기화, Unity 셰이더 및 클라이언트 최적화' },
      { id: 'business-admin', name: '경영학과', reason: '글로벌 모바일 게임 라이브 서비스 운영, 인앱결제 BM 기획' }
    ],
    hiringDepartments: ['개발자회사(넷마블네오)', '글로벌마케팅본부', 'AI빅데이터센터']
  },
  '엔씨소프트': {
    category: 'IT/인터넷',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '리니지 시리즈 대규모 공성전 MMO 분산 서버 아키텍처' },
      { id: 'ai-data-science', name: '인공지능학부', reason: '바르코(VARCO) 게임 특화 생성형 언어모델 연구' }
    ],
    hiringDepartments: ['MMORPG서버개발팀', 'NC리서치(NLP랩)', '게임아트센터']
  },
  '삼성SDS': {
    category: 'IT/인터넷',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '엔터프라이즈 클라우드 전환, 생성형 AI 브리티 코파일럿 SI 개발' },
      { id: 'industrial-eng', name: '산업공학과', reason: '글로벌 물류 플랫폼 첼로스퀘어(Cello Square) 화물 추적 최적화' }
    ],
    hiringDepartments: ['클라우드서비스사업부', '솔루션사업부', '물류사업부']
  },

  // ================= 6. 조선 / 중공업 / 방산 =================
  'HD현대중공업': {
    category: '중공업/방산',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: '초대형 LNG선 화물창 극저온 단열, 친환경 메탄올 이중연료 엔진' },
      { id: 'materials-eng', name: '신소재공학과', reason: '영하 163도 극저온 버티는 고망간강 및 니켈합금 후판 용접 물성' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '자율운항 선박 전력 추진 모터 제어 및 해상 레이더 센서 통합' }
    ],
    hiringDepartments: ['조선설계본부', '엔진기계사업부', '특수선사업부(군함)', '해양연구소']
  },
  'HD한국조선해양': {
    category: '중공업/방산',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: '스마트 선박 디지털 트윈 시뮬레이션, 수소/암모니아 추진선 R&D' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '선박 자율운항 항로 최적화 알고리즘(아비커스 연계)' }
    ],
    hiringDepartments: ['미래기술연구원', '선박해양연구소', '에너지기술연구소']
  },
  '한화에어로스페이스': {
    category: '중공업/방산',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: 'K9 자주포 포탑 유압 메커니즘, 장갑차 현수장치 구조 동역학' },
      { id: 'aerospace-eng', name: '항공우주공학과', reason: '누리호 우주발사체 75톤급 액체로켓 엔진 조립, 항공 가스터빈' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '레드백 장갑차 능동방호시스템(APS), 정밀 사격통제 컴퓨터' }
    ],
    hiringDepartments: ['지상무기체계연구센터', '항공우주연구소', '정밀유도탄개발실']
  },
  '한화오션': {
    category: '중공업/방산',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: '3000톤급 잠수함 공기불요추진(AIP) 리튬배터리 체계 설계' },
      { id: 'materials-eng', name: '신소재공학과', reason: '심해 고수압 견디는 잠수함용 초고장력 특수강(HY강재) 용접' }
    ],
    hiringDepartments: ['특수선연구소(잠수함/구축함)', '상선설계부', '해양생산기술담당']
  },
  '삼성중공업': {
    category: '중공업/방산',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: '부유식 LNG 액화설비(FLNG) 복합 해양 플랜트 배관/공정 설계' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '원격 자율운항 선박 제어 및 스마트십 사이버보안 체계' }
    ],
    hiringDepartments: ['해양설계팀', '선박해양연구센터', '자율운항연구팀']
  },
  '현대로템': {
    category: '중공업/방산',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: 'K2 흑표 전차 1500마력 파워팩 및 고속철도(KTX-청룡) 차체 대차' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '전차 레이저 거리측정기 및 열상 조준경, 철도 전력변환 인버터' }
    ],
    hiringDepartments: ['디펜스솔루션연구소', '레일솔루션연구소', '생산기술실']
  },
  '두산에너빌리티': {
    category: '중공업/방산',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: '원자로 압력용기 주조/단조 가공, 발전용 대형 가스터빈 블레이드' },
      { id: 'materials-eng', name: '신소재공학과', reason: '소형모듈원전(SMR) 초내열 니켈 합금 단조 및 3D 메탈 프린팅' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '원자력 발전소 계측제어시스템(MMIS) 분산 제어 하드웨어' }
    ],
    hiringDepartments: ['원자력BG', '가스터빈연구소', '신재생에너지센터']
  },

  // ================= 7. 금융 / 지주사 =================
  'KB금융': {
    category: '금융/지주',
    recommendedMajors: [
      { id: 'business-admin', name: '경영학과', reason: '기업금융(여신/외환), 종합자산관리(WM), 리스크관리 모형 검증' },
      { id: 'economics', name: '경제학과', reason: '거시경제 금리 전망에 따른 은행 순이자마진(NIM) 방어 전략' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: 'KB스타뱅킹 모바일 앱 아키텍처 및 코어뱅킹 클라우드 전환' },
      { id: 'statistics', name: '응용통계학과', reason: '신용평가(CSS) 머신러닝 스코어링 모형 및 바젤III 충당금 산출' }
    ],
    hiringDepartments: ['디지털금융본부', 'CIB(기업금융)본부', '자본시장사업부', '리스크관리부']
  },
  '신한지주': {
    category: '금융/지주',
    recommendedMajors: [
      { id: 'business-admin', name: '경영학과', reason: '신한은행/신한카드 글로벌 해외법인 M&A 및 그룹 포트폴리오 관리' },
      { id: 'economics', name: '경제학과', reason: '외환 트레이딩, 채권 포트폴리오 운용 및 거시 거버넌스' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '신한 쏠(SOL) 뱅킹 마이데이터 연동 및 오픈API 뱅킹' }
    ],
    hiringDepartments: ['원신한전략본부', '글로벌사업본부', 'ICT개발본부']
  },
  '하나금융지주': {
    category: '금융/지주',
    recommendedMajors: [
      { id: 'business-admin', name: '경영학과', reason: 'PB(프라이빗 뱅킹) VIP 상속·증여 솔루션, 프로젝트파이낸싱(PF)' },
      { id: 'economics', name: '경제학과', reason: '외국환 전문 은행 해외 외환 딜링 및 파생상품 트레이딩' }
    ],
    hiringDepartments: ['자산관리(WM)그룹', '외환사업단', '투자금융본부']
  },
  '메리츠금융지주': {
    category: '금융/지주',
    recommendedMajors: [
      { id: 'economics', name: '경제학과', reason: '기업 부동산 PF 투자심사, 채권 발행 주관(DCM) 및 파생 운용' },
      { id: 'statistics', name: '응용통계학과', reason: '메리츠화재 IFRS17 보험계리 평가 및 손해율 리스크 통계' }
    ],
    hiringDepartments: ['부동산금융실', '자산운용본부', '리스크관리팀']
  },
  '삼성생명': {
    category: '금융/지주',
    recommendedMajors: [
      { id: 'statistics', name: '응용통계학과', reason: 'IFRS17/K-ICS 신지급여력제도 생명보험 계리 및 사망률 산정' },
      { id: 'economics', name: '경제학과', reason: '수십조 원 규모 장기 자산운용(국공채, 해외 인프라 대체투자)' }
    ],
    hiringDepartments: ['보험계리팀', '자산운용본부', '금융소비자보호실']
  },
  '삼성화재': {
    category: '금융/지주',
    recommendedMajors: [
      { id: 'statistics', name: '응용통계학과', reason: '자동차보험 대물/대인 손해율 빅데이터 예측, 일반보험 요율 산정' },
      { id: 'business-admin', name: '경영학과', reason: '다이렉트 보험 디지털 마케팅 및 GA(법인보험대리점) 영업전략' }
    ],
    hiringDepartments: ['장기업무팀', '자동차보상본부', '디지털본부']
  },
  '카카오뱅크': {
    category: '금융/지주',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '풀 뱅킹 마이크로서비스 아키텍처(MSA), 무중단 배포 시스템' },
      { id: 'statistics', name: '응용통계학과', reason: '대안신용평가(CSS) 카카오 결제 데이터 기반 중저신용자 대출 모형' }
    ],
    hiringDepartments: ['서버개발팀', '데이터인사이트팀', '금융상품기획팀']
  },

  // ================= 8. 화학 / 정유 / 통신 =================
  'LG화학': {
    category: '화학/정유',
    recommendedMajors: [
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: 'NCC 석유화학 나프타 열분해, 고기능성 친환경 플라스틱(PCR-ABS)' },
      { id: 'materials-eng', name: '신소재공학과', reason: '반도체 CMP 패드 및 유기발광다이오드(OLED) 청색 발광 소재' }
    ],
    hiringDepartments: ['석유화학연구소', '첨단소재사업부', '생명과학본부']
  },
  'SK이노베이션': {
    category: '화학/정유',
    recommendedMajors: [
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '원유 상압증류 공정(CDU) 수율 제어, 지속가능 항공유(SAF) 정제' },
      { id: 'business-admin', name: '경영학과', reason: '국제 원유(두바이유/WTI) 트레이딩 및 원자재 헷지 전략' }
    ],
    hiringDepartments: ['원유수급팀', '에너지환경기술원', '정유공정기술실']
  },
  'S-Oil': {
    category: '화학/정유',
    recommendedMajors: [
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '샤힌 프로젝트 초대형 스팀 크래커 가동 및 고순도 에틸렌 생산' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '온산공장 고온·고압 정유 반응기 및 회전 배관 설비 예지보전' }
    ],
    hiringDepartments: ['샤힌프로젝트단', '정유엔지니어링팀', '수출영업부']
  },
  'SK텔레콤': {
    category: '통신/서비스',
    recommendedMajors: [
      { id: 'electronic-eng', name: '전자전기공학부', reason: '5G/6G 기지국 빔포밍 안테나, 네트워크 가상화 코어망' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: 'AI 에이닷(A.) 통화녹음 요약 LLM 파이프라인 개발' },
      { id: 'business-admin', name: '경영학과', reason: '이동통신(MNO) 가입자당 평균매출(ARPU) 증대 및 멤버십 제휴' }
    ],
    hiringDepartments: ['네트워크기술원', 'AI사업단', '엔터프라이즈사업본부']
  },
  'KT': {
    category: '통신/서비스',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '클라우드 IDC 데이터센터 인프라, 미디엄/라마 기반 믿:음 LLM' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '전국 광통신 백본망 유지보수 및 6G 오픈랜(Open-RAN) 시험' }
    ],
    hiringDepartments: ['KT클라우드', 'AI2X랩', '네트워크운용본부']
  },

  // ================= 9. 학과별 대표 우량 중견 / IT / 공기업 / 미디어 =================
  '안랩': {
    category: 'IT/보안',
    recommendedMajors: [
      { id: 'cyber-security', name: '사이버보안학과', reason: '악성코드 분석, 모의해킹 침해대응 및 V3 백신 엔진 코어 R&D' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '엔드포인트 EDR 및 클라우드 보안 플랫폼 아키텍처 개발' }
    ],
    hiringDepartments: ['AhnLab시큐리티연구소', 'CERT침해대응팀', '클라우드개발실', '보안컨설팅본부']
  },
  'SK쉴더스': {
    category: 'IT/보안',
    recommendedMajors: [
      { id: 'cyber-security', name: '사이버보안학과', reason: 'EQST 화이트해커 취약점 분석, 원격 보안관제 AI 자동화' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '무인화 매장 스마트 보안 관제 및 영상인식 AI 알고리즘' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: 'IoT 센서 네트워크 및 물리보안 출입통제 하드웨어 설계' }
    ],
    hiringDepartments: ['EQST보안연구랩', '융합보안사업부', '클라우드보안사업단']
  },
  'HL만도': {
    category: '모빌리티/운송',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: '전자제어 조향장치(EPS), 브레이크-바이-와이어(BBW) 기구' },
      { id: 'electronic-eng', name: '전자전기공학부', reason: '차량용 레이더/카메라 센서 신호처리 및 통합 제어기 회로' },
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '레벨4 자율주행 회피 조향 알고리즘 및 오토사 펌웨어' }
    ],
    hiringDepartments: ['자율주행선행개발실', '섀시R&D센터', '소프트웨어캠퍼스']
  },
  '현대위아': {
    category: '모빌리티/운송',
    recommendedMajors: [
      { id: 'mechanical-eng', name: '기계공학과', reason: '전기차 통합 열관리 모듈(ITM) 및 모빌리티 구동 드라이브샤프트' },
      { id: 'robotics-eng', name: '지능형로봇공학과', reason: '제조 공장 자율주행 물류로봇(AMR) 및 협동로봇 제어기' }
    ],
    hiringDepartments: ['열관리개발실', '로봇선행개발팀', '공작기계R&D센터']
  },
  '한국콜마': {
    category: '화학/바이오',
    recommendedMajors: [
      { id: 'chemistry', name: '화학과', reason: '자외선 차단 선케어 나노 에멀전 및 고밀도 보습 제형 유기 합성' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '기능성 화장품 스마트 대량 생산 공정 및 유화 안정화 기술' },
      { id: 'pharmacy', name: '약학과', reason: '경피 약물전달(DDS) 화장품·개량신약 연구개발' }
    ],
    hiringDepartments: ['스킨케어연구소', '메이크업연구소', '바이오의약품연구센터']
  },
  '코스맥스': {
    category: '화학/바이오',
    recommendedMajors: [
      { id: 'chemistry', name: '화학과', reason: '마이크로바이옴 피부 유익균 화장품 원료 배합 및 결정 분석' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '초미세 파우더 분체 분산 및 글로벌 친환경 비건 화장품 공정' },
      { id: 'business-admin', name: '경영학과', reason: '글로벌 뷰티 브랜드 인디 인큐베이팅 및 해외 수출 영업' }
    ],
    hiringDepartments: ['R&I센터(판교)', '소재랩', '글로벌사업본부']
  },
  '종근당': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'pharmacy', name: '약학과', reason: '이상지질혈증 등 만성질환 신약 및 천안공장 의약품 GMP 품질' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '정제·캡슐제 서방출 타정 공정 및 원료의약품(API) 합성' }
    ],
    hiringDepartments: ['효종연구소', '품질보증부', '병원영업본부']
  },
  '대웅제약': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'pharmacy', name: '약학과', reason: '엔블로(당뇨신약)/펙수클루(위염신약) 국내외 임상 및 인허가' },
      { id: 'biology-science', name: '생명과학과', reason: '보툴리눔 톡신 제제 균주 관리 및 단백질 분리정제' }
    ],
    hiringDepartments: ['신약개발연구소', '글로벌임상센터', '나보타공장']
  },
  'GC녹십자': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'biology-science', name: '생명과학과', reason: '혈장분획제제(알부민/면역글로불린) 면역 기전 및 세포주 R&D' },
      { id: 'chemical-bio-eng', name: '화학생명공학과', reason: '오창/화순 백신 스마트 바이오 플랜트 발효 및 정제 설비' }
    ],
    hiringDepartments: ['목암생명과학연구소', '백신공정개발실', '혈액제제연구팀']
  },
  '오스템임플란트': {
    category: '바이오/제약',
    recommendedMajors: [
      { id: 'bio-medical-eng', name: '바이오의공학부', reason: '3D 구강스캐너 영상 신호처리 및 디지털 임플란트 가이드 SW' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '초정밀 5축 머시닝센터 임플란트 나사선 가공 및 피로도 시험' },
      { id: 'materials-eng', name: '신소재공학과', reason: '티타늄 친수성 표면(SA/CA/SOI) 플라즈마 표면처리 기술' }
    ],
    hiringDepartments: ['임플란트연구소', '의료장비연구소', '디지털덴티스트리실']
  },
  '토스': {
    category: 'IT/인터넷',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '초당 수만 건 트래픽 처리 간편송금/결제 마이크로서비스 백엔드' },
      { id: 'statistics', name: '응용통계학과', reason: '소비자 대안신용평가(CSS) 머신러닝 모형 및 리스크 통계' },
      { id: 'psychology', name: '심리학과', reason: '금융 사각지대 해소를 위한 사용자 경험(UX) 리서치 및 넛지 설계' }
    ],
    hiringDepartments: ['코어뱅킹사일로', '데이터인텔리전스', '프로덕트디자인팀']
  },
  '당근': {
    category: 'IT/인터넷',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '하이퍼로컬 위치기반 GPS 동네 인증 및 대용량 채팅 서버' },
      { id: 'media-comm', name: '미디어커뮤니케이션학과', reason: '지역 상권 동네생활 커뮤니티 콘텐츠 기획 및 바이럴 캠페인' },
      { id: 'advertising-pr', name: '광고홍보학과', reason: '당근 로컬 비즈니스 광고주 타깃팅 및 퍼포먼스 마케팅' }
    ],
    hiringDepartments: ['플랫폼엔지니어링', '로컬비즈니스팀', '동네생활팀']
  },
  'SM엔터테인먼트': {
    category: '엔터/미디어',
    recommendedMajors: [
      { id: 'media-comm', name: '미디어커뮤니케이션학과', reason: 'K-POP 아이돌 뮤직비디오, 세계관 영상 기획 및 자체 OTT 콘텐츠' },
      { id: 'advertising-pr', name: '광고홍보학과', reason: '글로벌 팬덤 바이럴 마케팅 및 브랜드 팝업스토어 런칭 캠페인' },
      { id: 'english-lang-lit', name: '영어영문학과', reason: '해외 투어 및 북미 빌보드 레이블 파트너십 글로벌 커뮤니케이션' }
    ],
    hiringDepartments: ['A&R센터', '비주얼디렉션실', '글로벌사업본부']
  },
  'JYP': {
    category: '엔터/미디어',
    recommendedMajors: [
      { id: 'media-comm', name: '미디어커뮤니케이션학과', reason: '유튜브 숏폼/릴스 댄스 챌린지 및 아티스트 리얼리티 방송 제작' },
      { id: 'english-lang-lit', name: '영어영문학과', reason: '미국 현지화 아이돌 프로젝트(VCHA) 등 글로벌 매니지먼트' },
      { id: 'business-admin', name: '경영학과', reason: '아티스트 음원/음반 유통, 응원봉 MD 상품 기획 및 지주 관리' }
    ],
    hiringDepartments: ['아티스트기획본부', '해외사업팀', 'IP사업부']
  },
  '스튜디오드래곤': {
    category: '엔터/미디어',
    recommendedMajors: [
      { id: 'korean-lang-lit', name: '국어국문학과', reason: '글로벌 OTT K-드라마 대본 극본 개발, 웹툰 원작 영상 각색' },
      { id: 'media-comm', name: '미디어커뮤니케이션학과', reason: '메가히트 드라마 기획 프로듀싱(기획PD) 및 편성 전략' },
      { id: 'history', name: '사학과', reason: '사극 및 시대극 드라마 역사적 고증 자문 및 세계관 구축' }
    ],
    hiringDepartments: ['드라마기획제작국', '스토리콘텐츠랩', '글로벌유통사업팀']
  },
  '한국전력공사': {
    category: '공기업/공공',
    recommendedMajors: [
      { id: 'electronic-eng', name: '전자전기공학부', reason: '765kV 초고압 송전선로, 변전소 SCADA 전력망 제어 및 스마트그리드' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '발전소 터빈 연계 및 송전탑 구조물 역학 구조 엔지니어링' },
      { id: 'public-admin', name: '행정학과', reason: '에너지 요금제 규제 대응, 전력 정책 대관 및 공공 감사' }
    ],
    hiringDepartments: ['송변전운영처', '스마트미터사업단', '전력연구원', '기획조정실']
  },
  '한국토지주택공사': {
    category: '공기업/공공',
    recommendedMajors: [
      { id: 'urban-civil-eng', name: '도시공학과', reason: '3기 신도시 광역교통 마스터플랜, 스마트시티 디지털 트윈 인프라' },
      { id: 'public-admin', name: '행정학과', reason: '공공분양/임대주택 정책 집행 및 토지 보상 행정 절차' },
      { id: 'economics', name: '경제학과', reason: '대규모 공공개발 PF 자금 조달 및 공공채권 발행 관리' }
    ],
    hiringDepartments: ['스마트도시계획처', '공공주택사업본부', '토지보상단']
  },
  '인천국제공항공사': {
    category: '공기업/공공',
    recommendedMajors: [
      { id: 'aerospace-eng', name: '항공우주공학과', reason: '공항 에어사이드 운항 안전, 활주로 계기착륙(ILS) 항행안전시설' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '세계 최정상 수하물처리시스템(BHS) 및 터미널 공조 설비' },
      { id: 'english-lang-lit', name: '영어영문학과', reason: '글로벌 항공사 노선 취항 협상, 해외 공항 운영 컨설팅 수출' },
      { id: 'business-admin', name: '경영학과', reason: '세계 최고 수익 면세점 상업시설 MD 입점 및 공항 마케팅' }
    ],
    hiringDepartments: ['항행처', '수하물운영처', '항공마케팅처', '해외사업처']
  },
  'KOTRA': {
    category: '공기업/공공',
    recommendedMajors: [
      { id: 'english-lang-lit', name: '영어영문학과', reason: '전 세계 80여 개국 해외무역관 파견, 중소기업 수출 바이어 매칭' },
      { id: 'economics', name: '경제학과', reason: '글로벌 무역 장벽(통상 관세, 공급망 재편) 분석 및 통상 리포트' },
      { id: 'political-science', name: '정치외교학과', reason: '각국 정부 고위급 통상 외교 지원 및 외국인 직접투자(FDI) 유치' }
    ],
    hiringDepartments: ['해외무역관', '통상협력실', '외국인투자유치본부(Invest Korea)']
  },
  '금융결제원': {
    category: '금융/지주',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '국가 금융공동망 오픈뱅킹, CD/ATM 분산 실시간 지급결제' },
      { id: 'cyber-security', name: '사이버보안학과', reason: '금융인증서 분산 암호키 관리 및 금융보안 모니터링' },
      { id: 'economics', name: '경제학과', reason: '중앙은행 디지털화폐(CBDC) 실증 및 핀테크 규제 샌드박스 정책' }
    ],
    hiringDepartments: ['금융결제연구소', 'IT개발부', '보안인증센터']
  },
  '한국갤럽': {
    category: '광고/미디어',
    recommendedMajors: [
      { id: 'statistics', name: '응용통계학과', reason: '여론조사 RDD 표본추출 가중치 모델링, 회귀/다변량 통계 검정' },
      { id: 'sociology', name: '사회학과', reason: '사회 갈등 지표 및 계층별 가치관 심층 설문 문항 설계' },
      { id: 'psychology', name: '심리학과', reason: '신제품 블라인드 테스트 소비자 뇌파/감성 반응 인지 리서치' }
    ],
    hiringDepartments: ['정치사회여론조사실', '마케팅리서치본부', '데이터분석연구소']
  },

  // ================= 15. 100대 기업 완성 신규 12개사 =================
  'CJ ENM': {
    category: '광고/미디어',
    recommendedMajors: [
      { id: 'media-communication', name: '미디어커뮤니케이션학과', reason: 'tvN/Mnet 방송 콘텐츠 및 예능·드라마 IP 기획·편성' },
      { id: 'business-admin', name: '경영학과', reason: '글로벌 OTT 콘텐츠 유통 및 미디어 플랫폼 사업 전략' },
      { id: 'advertising-pr', name: '광고홍보학과', reason: 'K-콘텐츠 글로벌 마케팅 및 통합 브랜드 캠페인' },
      { id: 'english-lang-lit', name: '영어영문학과', reason: '해외 스튜디오 공동 제작 및 글로벌 판권(IP) 수출 협상' }
    ],
    hiringDepartments: ['콘텐츠제작본부(PD)', '미디어사업본부', '글로벌유통사업팀', '마케팅전략실']
  },
  '아모레퍼시픽': {
    category: '바이오/소비재',
    recommendedMajors: [
      { id: 'chemical-eng', name: '화학공학과', reason: '스킨케어·기능성 화장품 제형 개발 및 나노 캡슐화 R&D' },
      { id: 'business-admin', name: '경영학과', reason: '설화수·라네즈 글로벌 브랜드 매니저(BM) 및 북미·일본 마케팅' },
      { id: 'chemistry', name: '화학과', reason: '천연물 추출 바이오 액티브 성분 합성 및 분자인지 연구' },
      { id: 'industrial-design', name: '산업디자인학과', reason: '럭셔리 화장품 용기 패키징 및 플래그십 스토어 공간 브랜딩' }
    ],
    hiringDepartments: ['기술연구원(R&I)', '글로벌브랜드디비전(BM)', '디자인센터', '해외영업전략팀']
  },
  'LG생활건강': {
    category: '바이오/소비재',
    recommendedMajors: [
      { id: 'chemical-eng', name: '화학공학과', reason: '후·숨 발효 한방 화장품 및 생활용품 계면활성제 제형 공정' },
      { id: 'business-admin', name: '경영학과', reason: '글로벌 럭셔리 뷰티 마케팅 및 면세·이커머스 채널 영업' },
      { id: 'biological-eng', name: '생명공학과', reason: '피부 마이크로바이옴 및 안티에이징 기능성 바이오 소재 연구' },
      { id: 'chinese-lang-lit', name: '중어중문학과', reason: '중화권 및 아시아 거점 럭셔리 화장품 마케팅 및 수출' }
    ],
    hiringDepartments: ['화장품연구소', '생활용품마케팅부문', '글로벌사업부', 'SCM기획부']
  },
  '하이트진로': {
    category: '유통/커머스',
    recommendedMajors: [
      { id: 'business-admin', name: '경영학과', reason: '테라·켈리·참이슬 통합 주류 마케팅 및 전국 유통망 영업 전략' },
      { id: 'food-eng', name: '식품공학과', reason: '맥주 발효 효모 관리, 증류주 숙성 기술 및 주류 품질 안전 분석' },
      { id: 'advertising-pr', name: '광고홍보학과', reason: '두꺼비 캐릭터 IP 브랜딩 및 팝업스토어 영타깃 프로모션' },
      { id: 'chemical-eng', name: '화학공학과', reason: '주류 양조 생산 라인 공정 최적화 및 친환경 패키징' }
    ],
    hiringDepartments: ['마케팅실', '국내영업본부', '주류개발연구원', '해외사업본부']
  },
  '오리온': {
    category: '유통/커머스',
    recommendedMajors: [
      { id: 'food-eng', name: '식품공학과', reason: '초코파이·꼬북칩 신제품 스낵 개발 및 원료 배합 연구' },
      { id: 'business-admin', name: '경영학과', reason: '중국·베트남·러시아 글로벌 법인 사업 기획 및 브랜드 마케팅' },
      { id: 'chinese-lang-lit', name: '중어중문학과', reason: '중국 현지화 스낵 유통망 영업 및 마케팅 관리' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '스낵 자동화 성형·소성·포장 생산 라인 엔지니어링' }
    ],
    hiringDepartments: ['연구소(글로벌R&D)', '해외사업부', '스낵마케팅팀', '생산기술팀']
  },
  '농심': {
    category: '유통/커머스',
    recommendedMajors: [
      { id: 'food-eng', name: '식품공학과', reason: '신라면·너구리 면발 텍스처 연구, 스프 조미 배합 및 품질 R&D' },
      { id: 'business-admin', name: '경영학과', reason: '미국·유럽 코스트코·월마트 입점 글로벌 영업 및 SCM 관리' },
      { id: 'chemical-eng', name: '화학공학과', reason: '유탕면 자동 튀김 및 건면 열풍 건조 연속 공정 엔지니어링' },
      { id: 'english-lang-lit', name: '영어영문학과', reason: '북미·글로벌 시장 바이어 발굴 및 K-라면 현지화 프로모션' }
    ],
    hiringDepartments: ['R&D센터(면/스프개발)', '국제사업부', '국내영업본부', '생산엔지니어링팀']
  },
  '빙그레': {
    category: '유통/커머스',
    recommendedMajors: [
      { id: 'food-eng', name: '식품공학과', reason: '바나나맛우유·요플레 유산균 발효 및 아이스크림 냉동 제형 연구' },
      { id: 'business-admin', name: '경영학과', reason: '대표 빙과/유제품 브랜드 전략 및 편의점·대형마트 리테일 영업' },
      { id: 'advertising-pr', name: '광고홍보학과', reason: '빙그레우스 세계관 캐릭터 브랜딩 및 디지털 바이럴 마케팅' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '유가공 무균 충전기(Aseptic) 및 냉동 콜드체인 설비 관리' }
    ],
    hiringDepartments: ['식품연구소', '냉장마케팅실', '콜드체인영업부', '품질보증팀']
  },
  '삼양식품': {
    category: '유통/커머스',
    recommendedMajors: [
      { id: 'business-admin', name: '경영학과', reason: '불닭 브랜드 글로벌 수출 전략 및 미주/유럽/동남아 현지 법인 관리' },
      { id: 'food-eng', name: '식품공학과', reason: '불닭 특제 매운맛 소스 배합, 할랄/코셔 글로벌 식품 인증 R&D' },
      { id: 'english-lang-lit', name: '영어영문학과', reason: '글로벌 유통사 벤더 등록 및 해외 바이어 B2B 직수출 무역' },
      { id: 'advertising-pr', name: '광고홍보학과', reason: '틱톡 불닭 챌린지 글로벌 디지털 마케팅 및 팬덤 브랜딩' }
    ],
    hiringDepartments: ['해외영업본부', '식품연구소(소스개발)', '글로벌마케팅본부', 'SCM기획팀']
  },
  '카카오페이': {
    category: 'IT/플랫폼',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '간편결제 대용량 트랜잭션 분산 서버, 백엔드 MSA 아키텍처 개발' },
      { id: 'cyber-security', name: '사이버보안학과', reason: '전자금융 FDS(이상거래탐지), 망분리 및 데이터 암호화' },
      { id: 'business-admin', name: '경영학과', reason: '증권·보험·대출 비교 핀테크 금융 서비스 상품 기획(PO)' },
      { id: 'statistics', name: '응용통계학과', reason: '대안신용평가(CSS) 머신러닝 스코어링 모델링 및 결제 데이터 분석' }
    ],
    hiringDepartments: ['결제플랫폼개발팀', '금융서비스개발팀', '데이터사이언스팀', 'FDS운영팀']
  },
  '키움증권': {
    category: '금융/지주',
    recommendedMajors: [
      { id: 'computer-eng', name: '컴퓨터공학과', reason: '영웅문 HTS/MTS 초저지연 주식 주문 체결 엔진 및 클라우드 전환' },
      { id: 'economics', name: '경제학과', reason: '거시경제 리서치 센터, 주식·채권 매크로 시황 및 섹터 분석' },
      { id: 'business-admin', name: '경영학과', reason: '기업금융(IB) IPO 주관, 메자닌/회사채 인수 및 PF 금융 주선' },
      { id: 'statistics', name: '응용통계학과', reason: '파생상품 퀀트 트레이딩, 옵션 그릭스 리스크 헷지 모델링' }
    ],
    hiringDepartments: ['리테일금융부문', 'IT본부(HTS/MTS개발)', 'IB사업부', '리서치센터']
  },
  '현대건설': {
    category: '건설/중공업',
    recommendedMajors: [
      { id: 'civil-eng', name: '토목공학과', reason: '초대형 교량, 지하 복합환승센터 및 항만 토목 인프라 시공 기술' },
      { id: 'architectural-eng', name: '건축공학과', reason: '디에이치(THE H) 하이엔드 주택 시공 관리 및 BIM 설계' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '사우디 아미랄 대규모 플랜트 배관, 회전기계 및 공조 설비' },
      { id: 'business-admin', name: '경영학과', reason: '해외 메가 프로젝트 수주 견적, 글로벌 계약 관리(EPC Contract)' }
    ],
    hiringDepartments: ['플랜트사업본부', '토목인프라사업부', '건축주택사업본부', '글로벌수주기획팀']
  },
  'GS칼텍스': {
    category: '에너지/화학',
    recommendedMajors: [
      { id: 'chemical-eng', name: '화학공학과', reason: '여수 원유 정제 공정 최적화, 수소 첨가 분해 및 바이오 연료 R&D' },
      { id: 'mechanical-eng', name: '기계공학과', reason: '초고압 반응기·열교환기 설비 건전성 진단 및 스마트 플랜트 엔지니어링' },
      { id: 'business-admin', name: '경영학과', reason: '글로벌 원유 트레이딩, 석유화학 제품 수출 및 신에너지 사업 기획' },
      { id: 'chemistry', name: '화학과', reason: '고기능성 윤활기유(Kixx) 첨가제 합성 및 탄소 포집(CCUS) 연구' }
    ],
    hiringDepartments: ['생산기술부문', '연구개발본부(R&D)', '원유트레이딩팀', '신사업개발실']
  }
};
