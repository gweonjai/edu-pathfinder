// 국내 주요 50대 기업 DART 사업보고서 공시 기준 총 직원 수 및 직군별 인원 비중 데이터베이스
// 출처: 2024년 사업보고서(임직원 현황) 및 지속가능경영보고서 인력 통계

export const COMPANY_HEADCOUNT_MAP = {
  '미래에셋증권': {
    "totalEmployees": "약 3,600명 (100% 대졸 이상 금융 전문인력)",
    "breakdown": [
        {
            "role": "IB 투자금융 및 대체투자(부동산/인프라)",
            "percent": 38,
            "count": "약 1,370명",
            "color": "bg-indigo-600",
            "majorGroup": "경영, 경제, 통계",
            "roleType": "biz"
        },
        {
            "role": "리테일 WM 및 자산관리 PB",
            "percent": 32,
            "count": "약 1,150명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 인문, 사회",
            "roleType": "biz"
        },
        {
            "role": "리서치센터 및 파생·채권 운용",
            "percent": 18,
            "count": "약 650명",
            "color": "bg-emerald-600",
            "majorGroup": "경제, 금융공학, 통계, 수학",
            "roleType": "rnd"
        },
        {
            "role": "디지털 트레이딩 IT 및 경영지원",
            "percent": 12,
            "count": "약 430명",
            "color": "bg-slate-400",
            "majorGroup": "컴공, 경영, 법학",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "자기자본 1위 글로벌 증권사로 IB·리서치·WM 인재 대규모 공채"
},
  '삼성증권': {
    "totalEmployees": "약 2,650명 (100% 대졸 이상 금융 전문인력)",
    "breakdown": [
        {
            "role": "고액자산가(SNI) 자산관리(WM) 및 디지털PB",
            "percent": 42,
            "count": "약 1,110명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 사회",
            "roleType": "biz"
        },
        {
            "role": "기업금융(IB) 및 구조화 솔루션",
            "percent": 28,
            "count": "약 740명",
            "color": "bg-indigo-600",
            "majorGroup": "경영, 경제, 회계",
            "roleType": "biz"
        },
        {
            "role": "리서치센터 및 퀀트 자산운용",
            "percent": 18,
            "count": "약 480명",
            "color": "bg-emerald-600",
            "majorGroup": "경제, 통계, 수학, 금융공학",
            "roleType": "rnd"
        },
        {
            "role": "디지털 핀테크 개발 및 경영지원",
            "percent": 12,
            "count": "약 320명",
            "color": "bg-slate-400",
            "majorGroup": "컴공, 경영, 법학",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "삼성그룹 계열 증권사로 WM 및 IB 중심 정기 공채 실시"
},
  '한국투자증권': {
    "totalEmployees": "약 3,100명 (100% 대졸 이상 금융 전문인력)",
    "breakdown": [
        {
            "role": "기업금융(IB: IPO/M&A/PF)",
            "percent": 44,
            "count": "약 1,360명",
            "color": "bg-indigo-600",
            "majorGroup": "경영, 경제, 통계, 법학",
            "roleType": "biz"
        },
        {
            "role": "리테일 브로커리지 및 법인영업",
            "percent": 30,
            "count": "약 930명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 인문",
            "roleType": "biz"
        },
        {
            "role": "리서치본부 및 글로벌 FICC 트레이딩",
            "percent": 16,
            "count": "약 500명",
            "color": "bg-emerald-600",
            "majorGroup": "경제, 금융공학, 통계",
            "roleType": "rnd"
        },
        {
            "role": "경영지원 및 리스크관리",
            "percent": 10,
            "count": "약 310명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제, 법학",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "국내 최고 IB 실적의 증권사로 상경계열 취업 최선호 기업"
},
  'NH투자증권': {
    "totalEmployees": "약 3,050명 (100% 대졸 이상 금융 전문인력)",
    "breakdown": [
        {
            "role": "대형 인수금융 및 인프라 IB 투자",
            "percent": 40,
            "count": "약 1,220명",
            "color": "bg-indigo-600",
            "majorGroup": "경영, 경제, 금융공학",
            "roleType": "biz"
        },
        {
            "role": "WM 자산관리 및 연금영업",
            "percent": 35,
            "count": "약 1,070명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 인문, 사회",
            "roleType": "biz"
        },
        {
            "role": "기업분석 리서치 및 채권 운용",
            "percent": 15,
            "count": "약 460명",
            "color": "bg-emerald-600",
            "majorGroup": "경제, 통계, 경영",
            "roleType": "rnd"
        },
        {
            "role": "경영지원",
            "percent": 10,
            "count": "약 300명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 행정",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "농협금융 산하 대형 증권사로 IB 및 자산관리 인력 정기 채용"
},
  'CJ제일제당': {
    "totalEmployees": "약 8,200명 (대졸 일반/연구직 약 4,200명)",
    "operatorInfo": {
        "roleName": "진천·논산 등 전국 스마트공장 식품가공 기능직",
        "count": "약 4,000명",
        "note": "햇반/비비고 등 식품 생산라인 가동 기능직입니다."
    },
    "breakdown": [
        {
            "role": "식품 및 화이트바이오 신소재 R&D",
            "percent": 42,
            "count": "약 1,760명",
            "color": "bg-indigo-600",
            "majorGroup": "식품영양, 생명공학, 화학, 화공",
            "roleType": "rnd"
        },
        {
            "role": "글로벌 K-푸드 마케팅 및 국내외 영업",
            "percent": 34,
            "count": "약 1,430명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 상경, 식품",
            "roleType": "biz"
        },
        {
            "role": "스마트공장 품질 엔지니어",
            "percent": 14,
            "count": "약 590명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 기계, 식품, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "경영지원 및 재무",
            "percent": 10,
            "count": "약 420명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "글로벌 K-푸드 1위 기업으로 식품·생명공학 및 상경·어문계 대규모 공채"
},
  '신세계': {
    "totalEmployees": "약 2,700명 (100% 대졸 이상 전문 유통인력)",
    "breakdown": [
        {
            "role": "백화점 패션/명품/식품 바이어(MD)",
            "percent": 48,
            "count": "약 1,300명",
            "color": "bg-indigo-600",
            "majorGroup": "경영, 의류, 어문, 식품",
            "roleType": "biz"
        },
        {
            "role": "백화점 영업관리 및 VIP 마케팅",
            "percent": 28,
            "count": "약 750명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 신문방송, 심리, 인문",
            "roleType": "biz"
        },
        {
            "role": "점포 공간 기획 및 신규 프로젝트",
            "percent": 14,
            "count": "약 380명",
            "color": "bg-emerald-600",
            "majorGroup": "건축, 산업디자인, 도시공학",
            "roleType": "engineer"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 10,
            "count": "약 270명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "국내 최고급 백화점 유통사로 바이어(MD) 및 영업관리 인재 정기 채용"
},
  '호텔신라': {
    "totalEmployees": "약 2,100명 (대졸 일반직 약 1,200명)",
    "operatorInfo": {
        "roleName": "호텔 객실/식음(F&B) 현장 서비스직",
        "count": "약 900명",
        "note": "현장 객실 및 연회 서비스직으로 별도 채용됩니다."
    },
    "breakdown": [
        {
            "role": "신라면세점 글로벌 명품 바잉(MD)",
            "percent": 45,
            "count": "약 540명",
            "color": "bg-indigo-600",
            "majorGroup": "경영, 어문, 무역, 패션",
            "roleType": "biz"
        },
        {
            "role": "호텔 서비스 기획 및 법인 판촉영업",
            "percent": 28,
            "count": "약 340명",
            "color": "bg-amber-500",
            "majorGroup": "호텔경영, 관광, 어문, 경영",
            "roleType": "biz"
        },
        {
            "role": "디지털 면세점 마케팅 및 이커머스",
            "percent": 15,
            "count": "약 180명",
            "color": "bg-emerald-600",
            "majorGroup": "광고홍보, 컴공, 미디어",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 재경",
            "percent": 12,
            "count": "약 140명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 회계",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "삼성그룹 프리미엄 서비스사로 어문·상경계 글로벌 인재 핵심 선발"
},
  '삼성전기': {
    "totalEmployees": "약 12,500명 (대졸 일반/연구직 약 7,500명)",
    "operatorInfo": {
        "roleName": "수원·세종·부산 스마트공장 MLCC/기판 생산 기능직",
        "count": "약 5,000명",
        "note": "MLCC 및 반도체 기판 설비 가동 기능직으로 별도 선발됩니다."
    },
    "breakdown": [
        {
            "role": "MLCC 및 차세대 패키지기판(FC-BGA) R&D",
            "percent": 48,
            "count": "약 3,600명",
            "color": "bg-indigo-600",
            "majorGroup": "신소재, 전자, 화학, 기계",
            "roleType": "rnd"
        },
        {
            "role": "공정기술 및 품질 엔지니어",
            "percent": 32,
            "count": "약 2,400명",
            "color": "bg-emerald-600",
            "majorGroup": "신소재, 화공, 기계, 전기",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 IT/전장 부품 마케팅·영업",
            "percent": 13,
            "count": "약 1,000명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 상경",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 재경",
            "percent": 7,
            "count": "약 500명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "AI 서버용 FC-BGA 기판 및 전장용 MLCC 확장으로 신소재·전자 대규모 채용"
},
  'LG이노텍': {
    "totalEmployees": "약 15,000명 (대졸 일반/연구직 약 6,500명)",
    "operatorInfo": {
        "roleName": "구미·파주·광주공장 광학솔루션 조립 기능직",
        "count": "약 8,500명",
        "note": "모바일 카메라모듈 정밀 조립 기능직으로 별도 선발됩니다."
    },
    "breakdown": [
        {
            "role": "모바일 카메라모듈 및 전장센서 R&D",
            "percent": 52,
            "count": "약 3,400명",
            "color": "bg-indigo-600",
            "majorGroup": "전자, 광학, 기계, 컴공",
            "roleType": "rnd"
        },
        {
            "role": "광학 공정기술 및 스마트팩토리 엔지니어",
            "percent": 28,
            "count": "약 1,800명",
            "color": "bg-emerald-600",
            "majorGroup": "기계, 산업공학, 전자",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 빅테크 B2B 기술영업",
            "percent": 12,
            "count": "약 800명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 전기전자",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 8,
            "count": "약 500명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "글로벌 1위 모바일 광학솔루션 기업으로 전자·광학·기계 대거 선발"
},
  '한미반도체': {
    "totalEmployees": "약 650명 (대졸 일반/연구직 약 500명)",
    "operatorInfo": {
        "roleName": "인천 서구 본사 반도체 장비 정밀조립 기능직",
        "count": "약 150명",
        "note": "HBM 본더 장비 기계가공 및 조립 기능직입니다."
    },
    "breakdown": [
        {
            "role": "HBM 듀얼 TC 본더 장비 메카트로닉스 R&D",
            "percent": 55,
            "count": "약 275명",
            "color": "bg-indigo-600",
            "majorGroup": "기계, 전자, 제어, 메카트로닉스",
            "roleType": "rnd"
        },
        {
            "role": "정밀 조립·공정 엔지니어",
            "percent": 25,
            "count": "약 125명",
            "color": "bg-emerald-600",
            "majorGroup": "기계, 산업공학, 전기",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 반도체 장비 기술영업",
            "percent": 15,
            "count": "약 75명",
            "color": "bg-amber-500",
            "majorGroup": "기계, 어문, 경영",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 5,
            "count": "약 25명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 회계",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "소수정예",
    "jobQuotaText": "세계 1위 HBM 열압착(TC) 본더 제조사로 기계·메카트로닉스 핵심 선발"
},
  'DB하이텍': {
    "totalEmployees": "약 2,150명 (대졸 일반/연구직 약 1,450명)",
    "operatorInfo": {
        "roleName": "부천·상우 팹(FAB) 클린룸 장비 오퍼레이터",
        "count": "약 700명",
        "note": "8인치 웨이퍼 가동 기능직으로 전문학사/고졸 별도 선발입니다."
    },
    "breakdown": [
        {
            "role": "파운드리 소자/공정개발 R&D",
            "percent": 48,
            "count": "약 700명",
            "color": "bg-indigo-600",
            "majorGroup": "전자, 반도체, 신소재, 물리",
            "roleType": "rnd"
        },
        {
            "role": "반도체 공정기술·수율(YE) 엔지니어",
            "percent": 32,
            "count": "약 460명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 신소재, 전자, 화학",
            "roleType": "engineer"
        },
        {
            "role": "파운드리 글로벌 수주 기술영업",
            "percent": 12,
            "count": "약 170명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 전자",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 8,
            "count": "약 120명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "8인치 아날로그/전력반도체 파운드리 전문 기업으로 전자·화공 상시 채용"
},
  '리노공업': {
    "totalEmployees": "약 720명 (대졸 일반/연구직 약 520명)",
    "operatorInfo": {
        "roleName": "부산 강서구 초정밀 핀/소켓 가공 기능직",
        "count": "약 200명",
        "note": "초미세 리노핀 정밀 가공 현장 인력입니다."
    },
    "breakdown": [
        {
            "role": "반도체 테스트소켓 및 리노핀 설계 R&D",
            "percent": 40,
            "count": "약 210명",
            "color": "bg-indigo-600",
            "majorGroup": "기계, 신소재, 전자, 물리",
            "roleType": "rnd"
        },
        {
            "role": "초정밀 미세가공 및 품질 엔지니어",
            "percent": 36,
            "count": "약 190명",
            "color": "bg-emerald-600",
            "majorGroup": "기계, 신소재, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 빅테크 반도체 기술영업",
            "percent": 16,
            "count": "약 80명",
            "color": "bg-amber-500",
            "majorGroup": "어문, 경영, 기계",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 8,
            "count": "약 40명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "소수정예",
    "jobQuotaText": "영업이익률 40%의 반도체 검사 소켓 독점 강소기업으로 기계·신소재 중심 선발"
},
  '삼성SDI': {
    "totalEmployees": "약 21,500명 (대졸 일반/연구직 약 11,500명)",
    "operatorInfo": {
        "roleName": "천안·울산 배터리 셀 제조 및 설비 가동 기능직",
        "count": "약 10,000명",
        "note": "배터리 셀 조립 라인 현장 기능직으로 별도 선발됩니다."
    },
    "breakdown": [
        {
            "role": "전고체/초격차 각형 배터리 및 전자재료 R&D",
            "percent": 52,
            "count": "약 6,000명",
            "color": "bg-indigo-600",
            "majorGroup": "화학, 신소재, 화공, 전자",
            "roleType": "rnd"
        },
        {
            "role": "배터리 공정기술 및 설비 엔지니어",
            "percent": 28,
            "count": "약 3,200명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 기계, 신소재, 전기",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 완성차 영업 및 마케팅",
            "percent": 12,
            "count": "약 1,400명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 상경",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 재경",
            "percent": 8,
            "count": "약 900명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제, 행정",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "전고체 배터리 상용화 및 북미 합작사 확대로 화학·신소재·기계 대규모 공채"
},
  'POSCO홀딩스': {
    "totalEmployees": "약 550명 (포스코그룹 지주사, 100% 대졸 이상 전문직)",
    "breakdown": [
        {
            "role": "미래소재(이차전지/수소/철강) 신성장 R&D 전략",
            "percent": 45,
            "count": "약 250명",
            "color": "bg-indigo-600",
            "majorGroup": "금속, 신소재, 화공, 경영",
            "roleType": "rnd"
        },
        {
            "role": "그룹 재무·IR 및 글로벌 M&A",
            "percent": 25,
            "count": "약 140명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 회계",
            "roleType": "biz"
        },
        {
            "role": "글로벌 사업관리 및 공급망(SCM)",
            "percent": 18,
            "count": "약 100명",
            "color": "bg-emerald-600",
            "majorGroup": "무역, 어문, 산업공학",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 대외협력·ESG",
            "percent": 12,
            "count": "약 60명",
            "color": "bg-slate-400",
            "majorGroup": "법학, 행정, 사회과학",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "소수정예",
    "jobQuotaText": "포스코그룹 컨트롤타워로 상경·이공계 최고 스펙 인재 소수정예 선발"
},
  '포스코퓨처엠': {
    "totalEmployees": "약 3,100명 (대졸 일반/연구직 약 1,600명)",
    "operatorInfo": {
        "roleName": "포항·광양 양극재/음극재 소성·제조 기능직",
        "count": "약 1,500명",
        "note": "소재 합성 및 소성로 설비 가동 현장 기능직입니다."
    },
    "breakdown": [
        {
            "role": "차세대 양·음극재 신물질 R&D",
            "percent": 48,
            "count": "약 770명",
            "color": "bg-indigo-600",
            "majorGroup": "신소재, 화학, 화공, 금속",
            "roleType": "rnd"
        },
        {
            "role": "스마트 소재공정기술 및 품질 엔지니어",
            "percent": 32,
            "count": "약 510명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 신소재, 기계, 환경",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 배터리사 소재 수주영업",
            "percent": 12,
            "count": "약 190명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 화학",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 지원",
            "percent": 8,
            "count": "약 130명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "국내 유일 양·음극재 동시 양산 기업으로 신소재·화공 석·학사 대거 채용"
},
  '에코프로비엠': {
    "totalEmployees": "약 1,600명 (대졸 일반/연구직 약 900명)",
    "operatorInfo": {
        "roleName": "오창·포항 하이니켈 양극재 생산 기능직",
        "count": "약 700명",
        "note": "양극재 분쇄 및 포장 설비 현장 기능직입니다."
    },
    "breakdown": [
        {
            "role": "하이니켈 양극재 코어 신물질 R&D",
            "percent": 52,
            "count": "약 470명",
            "color": "bg-indigo-600",
            "majorGroup": "화학, 신소재, 화공",
            "roleType": "rnd"
        },
        {
            "role": "양극재 양산 공정기술 및 품질 엔지니어",
            "percent": 28,
            "count": "약 250명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 기계, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 배터리사 맞춤 영업",
            "percent": 12,
            "count": "약 110명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 신소재",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 재무",
            "percent": 8,
            "count": "약 70명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "하이니켈 양극재 글로벌 1위 기업으로 화학·신소재 전문 연구직 집중 선발"
},
  '에코프로': {
    "totalEmployees": "약 450명 (대졸 일반/연구직 약 380명)",
    "operatorInfo": {
        "roleName": "친환경 필터 및 온실가스 저감장치 조립 기능직",
        "count": "약 70명",
        "note": "환경 설비 현장 가공 인력입니다."
    },
    "breakdown": [
        {
            "role": "친환경 촉매 및 대기오염 방지 R&D",
            "percent": 45,
            "count": "약 170명",
            "color": "bg-indigo-600",
            "majorGroup": "환경공학, 화학, 화공",
            "roleType": "rnd"
        },
        {
            "role": "그룹 투자전략 및 신사업 기획",
            "percent": 28,
            "count": "약 105명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 신소재",
            "roleType": "biz"
        },
        {
            "role": "친환경 소재 기술영업",
            "percent": 15,
            "count": "약 60명",
            "color": "bg-emerald-600",
            "majorGroup": "환경, 경영, 어문",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 인사",
            "percent": 12,
            "count": "약 45명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 행정",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "에코프로그룹 지주회사로 환경공학 및 경영전략 인재 상시 채용"
},
  '엘앤에프': {
    "totalEmployees": "약 1,850명 (대졸 일반/연구직 약 850명)",
    "operatorInfo": {
        "roleName": "대구·구지 양극재 제조 라인 오퍼레이터",
        "count": "약 1,000명",
        "note": "배터리 소재 합성 현장 기능직으로 별도 선발됩니다."
    },
    "breakdown": [
        {
            "role": "NCMA 단결정 양극재 R&D",
            "percent": 50,
            "count": "약 425명",
            "color": "bg-indigo-600",
            "majorGroup": "신소재, 화학, 화공, 물리",
            "roleType": "rnd"
        },
        {
            "role": "소재 공정기술 및 설비 엔지니어",
            "percent": 30,
            "count": "약 255명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 기계, 금속",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 완성차/배터리 수주영업",
            "percent": 12,
            "count": "약 100명",
            "color": "bg-amber-500",
            "majorGroup": "어문, 경영, 신소재",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 8,
            "count": "약 70명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "테슬라 직납 하이니켈 양극재 기업으로 화학·신소재 연구원 대거 선발"
},
  'LG화학': {
    "totalEmployees": "약 14,500명 (대졸 일반/연구직 약 9,000명)",
    "operatorInfo": {
        "roleName": "여수·대산 석유화학 및 전지소재 공장 운전원",
        "count": "약 5,500명",
        "note": "화학 반응기 및 플랜트 설비 현장 가동 기능직입니다."
    },
    "breakdown": [
        {
            "role": "전지소재·친환경소재·신약 R&D",
            "percent": 50,
            "count": "약 4,500명",
            "color": "bg-indigo-600",
            "majorGroup": "화학, 화공, 신소재, 생명",
            "roleType": "rnd"
        },
        {
            "role": "화공 플랜트 엔지니어 및 생산기술",
            "percent": 28,
            "count": "약 2,520명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 기계, 전기, 안전",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 화학소재 기술영업 및 마케팅",
            "percent": 14,
            "count": "약 1,260명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 화공",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 8,
            "count": "약 720명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제, 행정",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "국내 1위 화학기업으로 화공·화학·신소재 전공자 전통적 최다 채용"
},
  'SK이노베이션': {
    "totalEmployees": "약 2,900명 (대졸 일반/연구직 약 2,200명)",
    "operatorInfo": {
        "roleName": "울산 CLX 정유·석유화학 현장 운전원",
        "count": "약 700명",
        "note": "플랜트 운전 기능직으로 별도 채용됩니다."
    },
    "breakdown": [
        {
            "role": "친환경 에너지/배터리 선행기술 R&D",
            "percent": 48,
            "count": "약 1,050명",
            "color": "bg-indigo-600",
            "majorGroup": "화공, 화학, 환경, 신소재",
            "roleType": "rnd"
        },
        {
            "role": "글로벌 자원개발(E&P) 및 원유 트레이딩",
            "percent": 26,
            "count": "약 570명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 자원공학, 어문",
            "roleType": "biz"
        },
        {
            "role": "스마트 플랜트 엔지니어링",
            "percent": 14,
            "count": "약 310명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 기계, 전기",
            "roleType": "engineer"
        },
        {
            "role": "경영기획·ESG·지원",
            "percent": 12,
            "count": "약 270명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 법학, 행정",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "SK 정유·에너지 중간지주사로 화공 및 상경계 최상위 선호"
},
  'S-Oil': {
    "totalEmployees": "약 3,250명 (대졸 일반/연구직 약 1,450명)",
    "operatorInfo": {
        "roleName": "온산 정유·석유화학 복합 플랜트 운전원",
        "count": "약 1,800명",
        "note": "정유 시설 가동 현장 기능직으로 별도 채용됩니다."
    },
    "breakdown": [
        {
            "role": "샤힌 프로젝트 석유화학 플랜트 엔지니어",
            "percent": 42,
            "count": "약 610명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 기계, 전기, 토목",
            "roleType": "engineer"
        },
        {
            "role": "석유화학 신제품 R&D 및 기술개발",
            "percent": 26,
            "count": "약 380명",
            "color": "bg-indigo-600",
            "majorGroup": "화학, 화공, 신소재",
            "roleType": "rnd"
        },
        {
            "role": "국내외 석유 트레이딩 및 영업",
            "percent": 18,
            "count": "약 260명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 경제",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 재무",
            "percent": 14,
            "count": "약 200명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 회계",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "샤힌 프로젝트 9조원 투자로 화공·기계·전기 엔지니어 대거 선발"
},
  'S-OIL': {
    "totalEmployees": "약 3,250명 (대졸 일반/연구직 약 1,450명)",
    "operatorInfo": {
        "roleName": "온산 정유·석유화학 복합 플랜트 운전원",
        "count": "약 1,800명",
        "note": "정유 시설 가동 현장 기능직으로 별도 채용됩니다."
    },
    "breakdown": [
        {
            "role": "샤힌 프로젝트 석유화학 플랜트 엔지니어",
            "percent": 42,
            "count": "약 610명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 기계, 전기, 토목",
            "roleType": "engineer"
        },
        {
            "role": "석유화학 신제품 R&D 및 기술개발",
            "percent": 26,
            "count": "약 380명",
            "color": "bg-indigo-600",
            "majorGroup": "화학, 화공, 신소재",
            "roleType": "rnd"
        },
        {
            "role": "국내외 석유 트레이딩 및 영업",
            "percent": 18,
            "count": "약 260명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 경제",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 재무",
            "percent": 14,
            "count": "약 200명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 회계",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "샤힌 프로젝트 9조원 투자로 화공·기계·전기 엔지니어 대거 선발"
},
  '고려아연': {
    "totalEmployees": "약 1,750명 (대졸 일반/연구직 약 750명)",
    "operatorInfo": {
        "roleName": "온산 제련소 비철금속 제련 설비 가동 기능직",
        "count": "약 1,000명",
        "note": "아연/연 제련로 설비 현장 기능직입니다."
    },
    "breakdown": [
        {
            "role": "신소재 및 이차전지 소재(동박/전구체) R&D",
            "percent": 42,
            "count": "약 315명",
            "color": "bg-indigo-600",
            "majorGroup": "금속, 신소재, 화학, 화공",
            "roleType": "rnd"
        },
        {
            "role": "제련 스마트 공정기술 및 설비 엔지니어",
            "percent": 32,
            "count": "약 240명",
            "color": "bg-emerald-600",
            "majorGroup": "금속, 화공, 기계, 전기",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 비철금속 트레이딩 및 원자재 영업",
            "percent": 16,
            "count": "약 120명",
            "color": "bg-amber-500",
            "majorGroup": "무역, 경영, 어문",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 10,
            "count": "약 75명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "세계 1위 비철금속 제련사로 금속·신소재·화공 전공자 핵심 우대"
},
  '현대모비스': {
    "totalEmployees": "약 11,500명 (대졸 일반/연구직 약 8,500명)",
    "operatorInfo": {
        "roleName": "진천·울산 모듈 및 램프 부품 조립 기능직",
        "count": "약 3,000명",
        "note": "섀시/칵핏 모듈 조립 라인 현장 기능직입니다."
    },
    "breakdown": [
        {
            "role": "자율주행·전동화 전장 시스템 R&D",
            "percent": 58,
            "count": "약 4,930명",
            "color": "bg-indigo-600",
            "majorGroup": "전자, 기계, 컴공, 모빌리티",
            "roleType": "rnd"
        },
        {
            "role": "전장 생산기술 및 글로벌 품질 엔지니어",
            "percent": 22,
            "count": "약 1,870명",
            "color": "bg-emerald-600",
            "majorGroup": "기계, 산업공학, 전기",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 완성차 수주영업 및 부품 SCM",
            "percent": 12,
            "count": "약 1,020명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 산업공학",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 구매",
            "percent": 8,
            "count": "약 680명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "현대차그룹 전장화 R&D 핵심사로 전자·기계·SW 수천 명 선발"
},
  '현대글로비스': {
    "totalEmployees": "약 2,300명 (100% 대졸 이상 전문직 중심, 물류 현장은 협력사 위탁)",
    "breakdown": [
        {
            "role": "완성차 해운 및 글로벌 복합물류 기획",
            "percent": 48,
            "count": "약 1,100명",
            "color": "bg-indigo-600",
            "majorGroup": "물류, 무역, 경영, 해양",
            "roleType": "biz"
        },
        {
            "role": "스마트 물류 자동화 시스템(산업공학)",
            "percent": 26,
            "count": "약 600명",
            "color": "bg-emerald-600",
            "majorGroup": "산업공학, 컴공, 통계",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 벌크/원자재 트레이딩 및 화물 영업",
            "percent": 16,
            "count": "약 370명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 경제",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 10,
            "count": "약 230명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "현대차그룹 글로벌 공급망 총괄로 물류·산업공학·상경계 최우선 채용"
},
  '대한항공': {
    "totalEmployees": "약 18,500명 (대졸 일반/정비기술 약 9,500명)",
    "operatorInfo": {
        "roleName": "객실승무원 및 공항 현장 여객서비스 인력",
        "count": "약 9,000명",
        "note": "객실 승무 및 지상 여객 서비스직으로 별도 채용 트랙입니다."
    },
    "breakdown": [
        {
            "role": "항공기 MRO 정비기술 및 항공우주 R&D",
            "percent": 40,
            "count": "약 3,800명",
            "color": "bg-indigo-600",
            "majorGroup": "항공우주, 기계, 전자, 재료",
            "roleType": "engineer"
        },
        {
            "role": "노선 기획·마케팅 및 여객/화물 영업",
            "percent": 32,
            "count": "약 3,040명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 상경, 사회",
            "roleType": "biz"
        },
        {
            "role": "종합운항통제(OCC) 및 IT 시스템",
            "percent": 16,
            "count": "약 1,520명",
            "color": "bg-emerald-600",
            "majorGroup": "항공교통, 컴공, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "경영기획 및 재무·인사",
            "percent": 12,
            "count": "약 1,140명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제, 행정",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "아시아나 합병으로 국내 최대 항공사, 항공공학·상경계 정기 공채"
},
  'HMM': {
    "totalEmployees": "약 1,850명 (대졸 육상직 약 1,000명)",
    "operatorInfo": {
        "roleName": "해상 선원 및 항해/기관 해기사",
        "count": "약 850명",
        "note": "외항 컨테이너선 승선 인력으로 한국해양대 등 별도 선발입니다."
    },
    "breakdown": [
        {
            "role": "컨테이너선 노선 운임 전략 및 글로벌 영업",
            "percent": 50,
            "count": "약 500명",
            "color": "bg-indigo-600",
            "majorGroup": "무역, 경영, 어문, 해운",
            "roleType": "biz"
        },
        {
            "role": "스마트 선대 운항관리 및 해운 IT",
            "percent": 26,
            "count": "약 260명",
            "color": "bg-emerald-600",
            "majorGroup": "항해, 컴공, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 물류 네트워크(SCM) 기획",
            "percent": 14,
            "count": "약 140명",
            "color": "bg-amber-500",
            "majorGroup": "물류, 산업공학, 경영",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 재무",
            "percent": 10,
            "count": "약 100명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 회계",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "국내 1위 국적 원양선사로 무역·해운물류·상경계 최우선 채용"
},
  '알테오젠': {
    "totalEmployees": "약 150명 (100% 대졸·석박사 바이오 R&D 전문기업)",
    "breakdown": [
        {
            "role": "히알루로니다제 SC 변환 플랫폼 신약 R&D",
            "percent": 65,
            "count": "약 98명",
            "color": "bg-indigo-600",
            "majorGroup": "생명과학, 약학, 바이오, 화학",
            "roleType": "rnd"
        },
        {
            "role": "글로벌 빅파마 기술수출(라이선싱) 사업개발",
            "percent": 20,
            "count": "약 30명",
            "color": "bg-amber-500",
            "majorGroup": "바이오, 약학, 경영, 어문",
            "roleType": "biz"
        },
        {
            "role": "글로벌 임상시험 관리 및 인허가(RA)",
            "percent": 10,
            "count": "약 15명",
            "color": "bg-emerald-600",
            "majorGroup": "약학, 의학, 통계",
            "roleType": "rnd"
        },
        {
            "role": "경영지원 및 IR",
            "percent": 5,
            "count": "약 7명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 회계",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "소수정예",
    "jobQuotaText": "코스닥 시총 1위 바이오 대장주로 바이오·약학 석·박사 최정예 선발"
},
  '유한양행': {
    "totalEmployees": "약 1,950명 (대졸 일반/연구직 약 1,450명)",
    "operatorInfo": {
        "roleName": "오창 cGMP 공장 의약품 포장 기능직",
        "count": "약 500명",
        "note": "정제 및 캡슐 포장 현장 기능직으로 별도 채용입니다."
    },
    "breakdown": [
        {
            "role": "중앙연구소 항암신약 R&D (렉라자 등)",
            "percent": 38,
            "count": "약 550명",
            "color": "bg-indigo-600",
            "majorGroup": "약학, 생명과학, 화학, 의학",
            "roleType": "rnd"
        },
        {
            "role": "전국 병의원 전문의약품(ETC) 영업(MR)",
            "percent": 42,
            "count": "약 610명",
            "color": "bg-amber-500",
            "majorGroup": "전공 무관, 생명, 상경",
            "roleType": "biz"
        },
        {
            "role": "스마트 제약공정 및 품질보증(QA/QC) 엔지니어",
            "percent": 12,
            "count": "약 170명",
            "color": "bg-emerald-600",
            "majorGroup": "약학, 화학, 화공",
            "roleType": "engineer"
        },
        {
            "role": "경영기획 및 지원",
            "percent": 8,
            "count": "약 120명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "국산 1호 글로벌 블록버스터 신약 배출 기업으로 약학·생명·영업 정기 공채"
},
  '한미약품': {
    "totalEmployees": "약 2,350명 (대졸 일반/연구직 약 1,750명)",
    "operatorInfo": {
        "roleName": "팔탄·평택 스마트플랜트 포장 기능직",
        "count": "약 600명",
        "note": "의약품 포장 라인 현장 기능직입니다."
    },
    "breakdown": [
        {
            "role": "국내외 전문의약품 영업(MR) 및 학술마케팅",
            "percent": 48,
            "count": "약 840명",
            "color": "bg-amber-500",
            "majorGroup": "전공 무관, 상경, 생명",
            "roleType": "biz"
        },
        {
            "role": "제약바이오 R&D 연구원",
            "percent": 34,
            "count": "약 600명",
            "color": "bg-indigo-600",
            "majorGroup": "약학, 화학, 생명, 의학",
            "roleType": "rnd"
        },
        {
            "role": "스마트플랜트 공정 및 품질보증(QA/QC) 엔지니어",
            "percent": 12,
            "count": "약 210명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 생명공학, 기계",
            "roleType": "engineer"
        },
        {
            "role": "경영지원",
            "percent": 6,
            "count": "약 100명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 법학",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "국내 제약업계 최대 R&D 투자사로 이공계 연구원 및 영업인력 선발"
},
  'SK바이오팜': {
    "totalEmployees": "약 280명 (100% 대졸/석박사 전문인력)",
    "breakdown": [
        {
            "role": "중추신경계 뇌전증 혁신신약 R&D",
            "percent": 58,
            "count": "약 160명",
            "color": "bg-indigo-600",
            "majorGroup": "약학, 생명과학, 화학, 의학",
            "roleType": "rnd"
        },
        {
            "role": "미국 현지 직판 글로벌 사업개발 및 마케팅",
            "percent": 24,
            "count": "약 70명",
            "color": "bg-amber-500",
            "majorGroup": "바이오, 어문, 경영",
            "roleType": "biz"
        },
        {
            "role": "글로벌 인허가(RA) 및 약물감시(PV)",
            "percent": 10,
            "count": "약 28명",
            "color": "bg-emerald-600",
            "majorGroup": "약학, 보건학, 통계",
            "roleType": "rnd"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 8,
            "count": "약 22명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "소수정예",
    "jobQuotaText": "미국 FDA 신약 독자 상용화 기업으로 약학·바이오·글로벌 비즈니스 선발"
},
  '삼천당제약': {
    "totalEmployees": "약 390명 (대졸 일반/연구직 약 260명)",
    "operatorInfo": {
        "roleName": "점안제 무균 제조 및 포장 기능직",
        "count": "약 130명",
        "note": "무균 주사제/점안제 생산 기능직입니다."
    },
    "breakdown": [
        {
            "role": "경구용 GLP-1 및 안과질환 신약 R&D",
            "percent": 42,
            "count": "약 110명",
            "color": "bg-indigo-600",
            "majorGroup": "약학, 생명과학, 화학",
            "roleType": "rnd"
        },
        {
            "role": "국내외 전문의약품 영업 및 라이선싱",
            "percent": 38,
            "count": "약 100명",
            "color": "bg-amber-500",
            "majorGroup": "생명, 상경, 어문",
            "roleType": "biz"
        },
        {
            "role": "점안제 cGMP 무균공정 품질 엔지니어",
            "percent": 12,
            "count": "약 30명",
            "color": "bg-emerald-600",
            "majorGroup": "화공, 생명, 약학",
            "roleType": "engineer"
        },
        {
            "role": "경영지원",
            "percent": 8,
            "count": "약 20명",
            "color": "bg-slate-400",
            "majorGroup": "경영",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "경구용 인슐린 플랫폼 특화 제약사로 약학·화학 인재 선발"
},
  '크래프톤': {
    "totalEmployees": "약 2,250명 (100% 대졸 이상 전문 테크/크리에이티브 인력)",
    "breakdown": [
        {
            "role": "게임 엔진 개발, 서버 프로그래밍 & AI R&D",
            "percent": 55,
            "count": "약 1,240명",
            "color": "bg-indigo-600",
            "majorGroup": "컴공, AI, 소프트웨어, 전자",
            "roleType": "rnd"
        },
        {
            "role": "게임 기획 및 3D 모델링/원화/아트",
            "percent": 25,
            "count": "약 560명",
            "color": "bg-emerald-600",
            "majorGroup": "게임공학, 디자인, 미술, 애니메이션",
            "roleType": "rnd"
        },
        {
            "role": "배틀그라운드 글로벌 퍼블리싱 & e스포츠",
            "percent": 14,
            "count": "약 315명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 미디어, 스포츠",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 데이터 분석",
            "percent": 6,
            "count": "약 135명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 통계, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "글로벌 게임 배틀그라운드 개발사로 개발자·AI연구원 최우대 채용"
},
  '넷마블': {
    "totalEmployees": "약 820명 (본사 퍼블리싱/사업 기획 중심)",
    "breakdown": [
        {
            "role": "게임 클라이언트/서버 개발 및 AI 엔진",
            "percent": 48,
            "count": "약 390명",
            "color": "bg-indigo-600",
            "majorGroup": "컴공, 정보, 소프트웨어",
            "roleType": "rnd"
        },
        {
            "role": "게임 사업PM 및 글로벌 마케팅",
            "percent": 32,
            "count": "약 260명",
            "color": "bg-emerald-600",
            "majorGroup": "경영, 어문, 미디어, 사회",
            "roleType": "biz"
        },
        {
            "role": "UI/UX 디자인 및 게임 아트",
            "percent": 12,
            "count": "약 100명",
            "color": "bg-amber-500",
            "majorGroup": "디자인, 영상",
            "roleType": "rnd"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 8,
            "count": "약 70명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "모바일 RPG 글로벌 퍼블리싱 1위 기업으로 개발자 및 사업PM 공채"
},
  '엔씨소프트': {
    "totalEmployees": "약 4,800명 (100% 대졸 이상 전문 테크 인력)",
    "breakdown": [
        {
            "role": "MMORPG 엔진 개발 및 코어 AI R&D",
            "percent": 54,
            "count": "약 2,600명",
            "color": "bg-indigo-600",
            "majorGroup": "컴공, AI, 소프트웨어, 전자",
            "roleType": "rnd"
        },
        {
            "role": "게임 시나리오 기획 및 사운드/아트",
            "percent": 26,
            "count": "약 1,250명",
            "color": "bg-emerald-600",
            "majorGroup": "디자인, 문창, 미디어, 영상",
            "roleType": "rnd"
        },
        {
            "role": "글로벌 라이브 비즈니스 및 퍼블리싱",
            "percent": 12,
            "count": "약 580명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 상경",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 8,
            "count": "약 370명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 행정",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "리니지 IP 기반 글로벌 게임사로 컴퓨터공학 및 아트 인력 상시 선발"
},
  '삼성SDS': {
    "totalEmployees": "약 12,000명 (삼성그룹 클라우드/물류 플랫폼)",
    "breakdown": [
        {
            "role": "클라우드 플랫폼 및 생성형 AI 소프트웨어 개발",
            "percent": 58,
            "count": "약 7,000명",
            "color": "bg-indigo-600",
            "majorGroup": "컴공, 소프트웨어, AI, 전자",
            "roleType": "rnd"
        },
        {
            "role": "글로벌 디지털 물류 첼로(Cello) 플랫폼 기획",
            "percent": 22,
            "count": "약 2,640명",
            "color": "bg-emerald-600",
            "majorGroup": "산업공학, 물류, 경영",
            "roleType": "biz"
        },
        {
            "role": "엔터프라이즈 IT 컨설팅 및 솔루션 영업",
            "percent": 12,
            "count": "약 1,440명",
            "color": "bg-amber-500",
            "majorGroup": "컴공, 경영, 인문",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 8,
            "count": "약 920명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "국내 최대 IT 서비스 기업으로 삼성 공채 기반 SW 엔지니어 수천 명 선발"
},
  'HD한국조선해양': {
    "totalEmployees": "약 950명 (HD현대 조선 중간지주사 및 미래 R&D 센터, 100% 석·학사)",
    "breakdown": [
        {
            "role": "자율운항/수소·암모니아 친환경 선박 R&D",
            "percent": 65,
            "count": "약 620명",
            "color": "bg-indigo-600",
            "majorGroup": "조선해양, 기계, 전기전자, 화공",
            "roleType": "rnd"
        },
        {
            "role": "스마트 야드 및 미래 선박 엔지니어링",
            "percent": 18,
            "count": "약 170명",
            "color": "bg-emerald-600",
            "majorGroup": "산업공학, 기계, 제어",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 조선 수주전략 및 라이선싱",
            "percent": 10,
            "count": "약 95명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 무역",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 IR",
            "percent": 7,
            "count": "약 65명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "소수정예",
    "jobQuotaText": "HD현대 조선부문 컨트롤타워로 판교 GRC 조선·기계 석·박사 최우대"
},
  '한화오션': {
    "totalEmployees": "약 9,000명 (대졸 일반/연구직 약 4,200명)",
    "operatorInfo": {
        "roleName": "거제 옥포조선소 용접·선체 가공·도장 기능직",
        "count": "약 4,800명",
        "note": "선박 건조 현장 기능직으로 별도 채용입니다."
    },
    "breakdown": [
        {
            "role": "특수선(잠수함/함정) 및 LNG선 기본설계 R&D",
            "percent": 52,
            "count": "약 2,200명",
            "color": "bg-indigo-600",
            "majorGroup": "조선해양, 기계, 전기, 전자",
            "roleType": "rnd"
        },
        {
            "role": "스마트 조선소 공정기술 및 품질 엔지니어",
            "percent": 24,
            "count": "약 1,000명",
            "color": "bg-emerald-600",
            "majorGroup": "기계, 조선, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 방산 수출 및 해양플랜트 수주영업",
            "percent": 14,
            "count": "약 600명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 국제",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 10,
            "count": "약 400명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "한화그룹 인수 후 잠수함·특수선 방산 확대로 조선·기계 대거 영입"
},
  '삼성중공업': {
    "totalEmployees": "약 9,200명 (대졸 일반/연구직 약 4,000명)",
    "operatorInfo": {
        "roleName": "거제조선소 도크 선체 조립 및 탑재 기능직",
        "count": "약 5,200명",
        "note": "도크 현장 가동 기능직입니다."
    },
    "breakdown": [
        {
            "role": "FLNG(부유식 LNG) 및 친환경 컨테이너선 R&D",
            "percent": 54,
            "count": "약 2,160명",
            "color": "bg-indigo-600",
            "majorGroup": "조선해양, 기계, 화공, 전기",
            "roleType": "rnd"
        },
        {
            "role": "스마트 선박 공정기술 및 품질 엔지니어",
            "percent": 22,
            "count": "약 880명",
            "color": "bg-emerald-600",
            "majorGroup": "조선, 기계, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 오일메이저 해양플랜트 수주영업",
            "percent": 14,
            "count": "약 560명",
            "color": "bg-amber-500",
            "majorGroup": "무역, 경영, 어문",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 10,
            "count": "약 400명",
            "color": "bg-slate-400",
            "majorGroup": "경영",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "세계 FLNG 건조 1위 조선사로 조선해양·화공플랜트 인재 선발"
},
  '현대로템': {
    "totalEmployees": "약 3,850명 (대졸 일반/연구직 약 2,150명)",
    "operatorInfo": {
        "roleName": "창원공장 K2전차 및 KTX 고속철 조립 기능직",
        "count": "약 1,700명",
        "note": "방산/철도 차량 현장 조립 기술직입니다."
    },
    "breakdown": [
        {
            "role": "K2 흑표 전차 방산 및 수소전동차 R&D",
            "percent": 56,
            "count": "약 1,200명",
            "color": "bg-indigo-600",
            "majorGroup": "기계, 전자, 제어, 신소재",
            "roleType": "rnd"
        },
        {
            "role": "철도/방산 시스템 생산기술 및 품질 엔지니어",
            "percent": 22,
            "count": "약 470명",
            "color": "bg-emerald-600",
            "majorGroup": "기계, 전기, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "폴란드 등 글로벌 방산·철도 수주영업",
            "percent": 14,
            "count": "약 300명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 무역",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 구매",
            "percent": 8,
            "count": "약 180명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "K-방산 유럽 수출 잭팟으로 기계·전자 연구원 및 생산기술 대규모 충원"
},
  '두산에너빌리티': {
    "totalEmployees": "약 5,400명 (대졸 일반/연구직 약 3,200명)",
    "operatorInfo": {
        "roleName": "창원 원자력/가스터빈 대형 단조·제관 기능직",
        "count": "약 2,200명",
        "note": "원자로 주기기 제관 및 가공 현장 기능직입니다."
    },
    "breakdown": [
        {
            "role": "SMR(소형원전) 및 국산 대형 가스터빈 R&D",
            "percent": 52,
            "count": "약 1,660명",
            "color": "bg-indigo-600",
            "majorGroup": "원자력, 기계, 신소재, 전기",
            "roleType": "rnd"
        },
        {
            "role": "원자력·발전 플랜트 EPC 공정 엔지니어",
            "percent": 26,
            "count": "약 830명",
            "color": "bg-emerald-600",
            "majorGroup": "원자력, 기계, 화공, 토목",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 원전 및 가스터빈 EPC 영업",
            "percent": 14,
            "count": "약 450명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 어문, 공학",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 8,
            "count": "약 260명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "체코 원전 수주 및 SMR 르네상스로 원자력·기계 엔지니어 대거 선발"
},
  'HD현대일렉트릭': {
    "totalEmployees": "약 2,450명 (대졸 일반/연구직 약 1,450명)",
    "operatorInfo": {
        "roleName": "울산 초고압 변압기·배전반 조립 기능직",
        "count": "약 1,000명",
        "note": "중전기기 현장 권선 및 조립 기능직입니다."
    },
    "breakdown": [
        {
            "role": "초고압 변압기·차단기 전력시스템 R&D",
            "percent": 50,
            "count": "약 725명",
            "color": "bg-indigo-600",
            "majorGroup": "전기, 전자, 기계, 제어",
            "roleType": "rnd"
        },
        {
            "role": "스마트 전력설비 생산기술 및 품질 엔지니어",
            "percent": 26,
            "count": "약 380명",
            "color": "bg-emerald-600",
            "majorGroup": "전기, 기계, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "북미·중동 전력망 인프라 글로벌 수주영업",
            "percent": 16,
            "count": "약 230명",
            "color": "bg-amber-500",
            "majorGroup": "전기, 경영, 어문",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 8,
            "count": "약 115명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "미국 전력망 교체 및 AI 데이터센터 변압기 폭증으로 전기공학 최우대 채용"
},
  '한국항공우주': {
    "totalEmployees": "약 5,200명 (대졸 일반/연구직 약 3,800명)",
    "operatorInfo": {
        "roleName": "사천 본사 항공기 기체 가공·조립 기능직",
        "count": "약 1,400명",
        "note": "KF-21 및 수리온 조립 라인 현장 기능직입니다."
    },
    "breakdown": [
        {
            "role": "KF-21/소형헬기 항공우주 체계종합 R&D",
            "percent": 65,
            "count": "약 2,470명",
            "color": "bg-indigo-600",
            "majorGroup": "항공우주, 기계, 전자, 컴공",
            "roleType": "rnd"
        },
        {
            "role": "비행시험 평가 및 항공 품질 엔지니어",
            "percent": 18,
            "count": "약 680명",
            "color": "bg-emerald-600",
            "majorGroup": "항공우주, 기계, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "FA-50 등 국산 완제기 해외 수출영업",
            "percent": 10,
            "count": "약 380명",
            "color": "bg-amber-500",
            "majorGroup": "어문, 경영, 무역",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 7,
            "count": "약 270명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 행정",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "대한민국 유일 항공기 체계종합 기업으로 항공우주·기계 필수 채용"
},
  '삼성물산': {
    "totalEmployees": "약 9,000명 (건설/상사/패션/리조트 종합 100% 대졸 이상)",
    "breakdown": [
        {
            "role": "하이테크(반도체Fab/공항) 및 플랜트 건축 엔지니어",
            "percent": 45,
            "count": "약 4,050명",
            "color": "bg-emerald-600",
            "majorGroup": "건축, 토목, 기계, 전기",
            "roleType": "engineer"
        },
        {
            "role": "글로벌 종합상사 자원·에너지 트레이딩",
            "percent": 25,
            "count": "약 2,250명",
            "color": "bg-indigo-600",
            "majorGroup": "무역, 경영, 어문, 경제",
            "roleType": "biz"
        },
        {
            "role": "패션 부문 브랜드 기획 및 MD",
            "percent": 18,
            "count": "약 1,620명",
            "color": "bg-amber-500",
            "majorGroup": "의류, 경영, 미디어, 인문",
            "roleType": "biz"
        },
        {
            "role": "경영기획·재무·인사",
            "percent": 12,
            "count": "약 1,080명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "삼성그룹 모태 기업으로 건축·토목 및 상경·어문계 대규모 공채"
},
  '신한지주': {
    "totalEmployees": "약 14,000명 (신한은행 기준, 100% 대졸 전문직)",
    "breakdown": [
        {
            "role": "영업점 개인/기업금융 및 자산관리(WM)",
            "percent": 60,
            "count": "약 8,400명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 인문, 사회",
            "roleType": "biz"
        },
        {
            "role": "CIB 투자금융 및 글로벌 금융시장",
            "percent": 18,
            "count": "약 2,520명",
            "color": "bg-indigo-600",
            "majorGroup": "경제, 경영, 통계, 수학",
            "roleType": "biz"
        },
        {
            "role": "디지털 뱅킹 및 ICT 코어 전산 개발",
            "percent": 15,
            "count": "약 2,100명",
            "color": "bg-emerald-600",
            "majorGroup": "컴공, 정보보안, 통계",
            "roleType": "engineer"
        },
        {
            "role": "경영기획·리스크관리·인사",
            "percent": 7,
            "count": "약 980명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제, 행정",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "리딩금융그룹으로 일반 전공자 리테일 공채 및 디지털·ICT 특화 공채"
},
  '하나금융지주': {
    "totalEmployees": "약 12,500명 (하나은행 기준, 100% 대졸 전문직)",
    "breakdown": [
        {
            "role": "영업점 PB/자산관리 및 리테일 금융",
            "percent": 62,
            "count": "약 7,750명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 사회과학, 인문",
            "roleType": "biz"
        },
        {
            "role": "외환·파생상품 트레이딩 및 IB 투자",
            "percent": 17,
            "count": "약 2,125명",
            "color": "bg-indigo-600",
            "majorGroup": "경제, 경영, 통계",
            "roleType": "biz"
        },
        {
            "role": "디지털 플랫폼 및 하나은행 IT 개발",
            "percent": 14,
            "count": "약 1,750명",
            "color": "bg-emerald-600",
            "majorGroup": "컴공, 소프트웨어, 정보",
            "roleType": "engineer"
        },
        {
            "role": "경영관리 및 리스크",
            "percent": 7,
            "count": "약 875명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "외환/글로벌 1위 금융그룹으로 어문·상경계 최우선 채용"
},
  '우리금융지주': {
    "totalEmployees": "약 13,800명 (우리은행 기준, 100% 대졸 전문직)",
    "breakdown": [
        {
            "role": "영업점 기업금융(기업여신) 및 개인금융",
            "percent": 64,
            "count": "약 8,830명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 법학, 인문",
            "roleType": "biz"
        },
        {
            "role": "IB 투자금융 및 글로벌 네트워크",
            "percent": 16,
            "count": "약 2,200명",
            "color": "bg-indigo-600",
            "majorGroup": "경제, 경영, 통계",
            "roleType": "biz"
        },
        {
            "role": "WON뱅킹 디지털 및 IT 개발",
            "percent": 13,
            "count": "약 1,800명",
            "color": "bg-emerald-600",
            "majorGroup": "컴공, 정보, AI",
            "roleType": "engineer"
        },
        {
            "role": "경영기획 및 준법감시",
            "percent": 7,
            "count": "약 970명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 법학",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "기업금융 전통 강자로 상경·법학계 및 디지털 인재 정기 공채"
},
  '메리츠금융지주': {
    "totalEmployees": "약 2,800명 (메리츠증권/화재 합산 100% 대졸 금융 전문인력)",
    "breakdown": [
        {
            "role": "부동산 PF 및 기업금융(IB) 투자",
            "percent": 48,
            "count": "약 1,340명",
            "color": "bg-indigo-600",
            "majorGroup": "경영, 경제, 부동산, 통계",
            "roleType": "biz"
        },
        {
            "role": "보험 계리 및 리스크 언더라이팅",
            "percent": 28,
            "count": "약 780명",
            "color": "bg-emerald-600",
            "majorGroup": "수학, 통계, 경제",
            "roleType": "engineer"
        },
        {
            "role": "자산운용 및 파생상품 트레이딩",
            "percent": 14,
            "count": "약 390명",
            "color": "bg-amber-500",
            "majorGroup": "경제, 경영, 금융공학",
            "roleType": "biz"
        },
        {
            "role": "경영지원 및 컴플라이언스",
            "percent": 10,
            "count": "약 290명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 법학",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "소수정예",
    "jobQuotaText": "업계 최고 성과급 대우 금융그룹으로 수학·통계·상경계 전문인력 선발"
},
  '삼성생명': {
    "totalEmployees": "약 5,200명 (100% 대졸 이상 전문직)",
    "breakdown": [
        {
            "role": "자산운용 및 대체투자(IB)",
            "percent": 38,
            "count": "약 1,980명",
            "color": "bg-indigo-600",
            "majorGroup": "경영, 경제, 금융공학",
            "roleType": "biz"
        },
        {
            "role": "생명보험 상품개발 및 보험계리/심사",
            "percent": 32,
            "count": "약 1,660명",
            "color": "bg-emerald-600",
            "majorGroup": "통계, 수학, 경제, 경영",
            "roleType": "engineer"
        },
        {
            "role": "디지털 금융 플랫폼 및 마케팅",
            "percent": 18,
            "count": "약 940명",
            "color": "bg-amber-500",
            "majorGroup": "컴공, 경영, 미디어",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 12,
            "count": "약 620명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 행정, 법학",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "국내 1위 생명보험사로 수학·통계(보험계리) 및 자산운용 상경계 선발"
},
  '삼성화재': {
    "totalEmployees": "약 5,800명 (100% 대졸 이상 전문직)",
    "breakdown": [
        {
            "role": "손해보험 상품개발 및 언더라이팅",
            "percent": 35,
            "count": "약 2,030명",
            "color": "bg-indigo-600",
            "majorGroup": "통계, 수학, 경영, 경제",
            "roleType": "engineer"
        },
        {
            "role": "보상기획 및 자동차/일반보험 손해사정",
            "percent": 35,
            "count": "약 2,030명",
            "color": "bg-emerald-600",
            "majorGroup": "법학, 행정, 자동차, 공학",
            "roleType": "biz"
        },
        {
            "role": "자산운용 및 글로벌 비즈니스",
            "percent": 18,
            "count": "약 1,040명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 어문",
            "roleType": "biz"
        },
        {
            "role": "경영기획",
            "percent": 12,
            "count": "약 700명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "국내 1위 손해보험사로 보험계리사 및 자산운용·보상 전문가 공채"
},
  '카카오뱅크': {
    "totalEmployees": "약 1,600명 (100% 대졸 이상 테크/금융 전문인력)",
    "breakdown": [
        {
            "role": "모바일 뱅킹 백엔드/iOS/Android 서버 개발",
            "percent": 54,
            "count": "약 860명",
            "color": "bg-indigo-600",
            "majorGroup": "컴공, 소프트웨어, 정보",
            "roleType": "rnd"
        },
        {
            "role": "금융 프로덕트 기획(여·수신) 및 UX",
            "percent": 24,
            "count": "약 380명",
            "color": "bg-emerald-600",
            "majorGroup": "경영, 경제, 디자인, 심리",
            "roleType": "biz"
        },
        {
            "role": "신용평가모형(CSS) 및 빅데이터 사이언스",
            "percent": 14,
            "count": "약 220명",
            "color": "bg-amber-500",
            "majorGroup": "통계, 수학, AI, 금융공학",
            "roleType": "engineer"
        },
        {
            "role": "금융 보안 및 경영지원",
            "percent": 8,
            "count": "약 140명",
            "color": "bg-slate-400",
            "majorGroup": "정보보안, 법학, 회계",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "인터넷전문은행 1위로 컴퓨터공학 개발자와 통계·데이터 전문가 핵심 채용"
},
  'SK텔레콤': {
    "totalEmployees": "약 5,500명 (AI 피라미드 혁신 중심, 100% 대졸 전문인력)",
    "breakdown": [
        {
            "role": "AI 인프라 및 LLM 모델링 R&D (에이닷 등)",
            "percent": 46,
            "count": "약 2,530명",
            "color": "bg-indigo-600",
            "majorGroup": "컴공, AI, 전자, 통계",
            "roleType": "rnd"
        },
        {
            "role": "차세대 5G/6G 유무선 네트워크 엔지니어링",
            "percent": 28,
            "count": "약 1,540명",
            "color": "bg-emerald-600",
            "majorGroup": "전자, 통신, 컴퓨터, 전기",
            "roleType": "engineer"
        },
        {
            "role": "B2B 엔터프라이즈 AI 솔루션 및 마케팅",
            "percent": 18,
            "count": "약 990명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 미디어, 어문",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 대외정책",
            "percent": 8,
            "count": "약 440명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 법학, 행정",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "글로벌 AI 컴퍼니 도약으로 AI 연구원 및 소프트웨어 개발자 대거 채용"
},
  'KT': {
    "totalEmployees": "약 19,500명 (대졸 일반/네트워크 약 13,500명)",
    "operatorInfo": {
        "roleName": "전국 유선 선로 및 국사 시설 유지보수 기능직",
        "count": "약 6,000명",
        "note": "광케이블 및 통신 선로 현장 개통·유지보수 기술직입니다."
    },
    "breakdown": [
        {
            "role": "AICT 클라우드·소프트웨어 R&D (믿:음 등)",
            "percent": 40,
            "count": "약 5,400명",
            "color": "bg-indigo-600",
            "majorGroup": "컴공, AI, 전자, 소프트웨어",
            "roleType": "rnd"
        },
        {
            "role": "전국 기지국·전송 통신망 엔지니어링",
            "percent": 34,
            "count": "약 4,590명",
            "color": "bg-emerald-600",
            "majorGroup": "전자, 정보통신, 컴퓨터, 전기",
            "roleType": "engineer"
        },
        {
            "role": "엔터프라이즈 B2B 영업 및 마케팅",
            "percent": 18,
            "count": "약 2,430명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 경제, 어문",
            "roleType": "biz"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 8,
            "count": "약 1,080명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "AICT 전문기업 전환으로 소프트웨어·통신 엔지니어 매년 정기 공채"
},
  'LG유플러스': {
    "totalEmployees": "약 10,500명 (100% 대졸 이상 전문직)",
    "breakdown": [
        {
            "role": "AI ixi(익시) 플랫폼 및 클라우드 개발",
            "percent": 42,
            "count": "약 4,410명",
            "color": "bg-indigo-600",
            "majorGroup": "컴공, AI, 전자, 통계",
            "roleType": "rnd"
        },
        {
            "role": "스마트 통신망 품질관리 및 엔지니어링",
            "percent": 32,
            "count": "약 3,360명",
            "color": "bg-emerald-600",
            "majorGroup": "전자, 정보통신, 전기",
            "roleType": "engineer"
        },
        {
            "role": "스마트홈/모바일 마케팅 및 B2B 영업",
            "percent": 18,
            "count": "약 1,890명",
            "color": "bg-amber-500",
            "majorGroup": "경영, 광고홍보, 미디어",
            "roleType": "biz"
        },
        {
            "role": "경영지원",
            "percent": 8,
            "count": "약 840명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "대규모",
    "jobQuotaText": "AX(AI 전환) 컴퍼니로 전자·컴퓨터공학 및 마케팅 인재 집중 선발"
},
  'KT&G': {
    "totalEmployees": "약 4,200명 (대졸 일반/연구직 약 2,400명)",
    "operatorInfo": {
        "roleName": "신탄진·영주공장 담배 궐련 제조 기능직",
        "count": "약 1,800명",
        "note": "담배 권축 및 포장 라인 현장 기능직입니다."
    },
    "breakdown": [
        {
            "role": "글로벌 브랜드 마케팅 및 해외수출 영업",
            "percent": 44,
            "count": "약 1,050명",
            "color": "bg-indigo-600",
            "majorGroup": "어문, 경영, 무역, 상경",
            "roleType": "biz"
        },
        {
            "role": "전자담배(NGP) 및 바이오 신제품 R&D",
            "percent": 26,
            "count": "약 620명",
            "color": "bg-emerald-600",
            "majorGroup": "화학, 기계, 신소재, 생명",
            "roleType": "rnd"
        },
        {
            "role": "스마트팩토리 설비기술 및 품질 엔지니어",
            "percent": 18,
            "count": "약 430명",
            "color": "bg-amber-500",
            "majorGroup": "기계, 전기, 산업공학",
            "roleType": "engineer"
        },
        {
            "role": "경영기획 및 재무",
            "percent": 12,
            "count": "약 300명",
            "color": "bg-slate-400",
            "majorGroup": "경영, 경제",
            "roleType": "mgmt"
        }
    ],
    "jobQuotaGrade": "안정적",
    "jobQuotaText": "글로벌 궐련형 전자담배 수출 폭증으로 어문·상경·기계 전공자 정기 채용"
},
  '삼성전자(DS)': {
    totalEmployees: '약 75,000명',
    operatorInfo: {
      roleName: '현장 FAB 설비·공정 오퍼레이터 (기능직)',
      count: '약 1.5만 명',
      note: '클린룸 내 장비 단순 가동 및 생산 지원 기능직으로, 고졸·전문학사 전형으로 별도 선발됩니다.'
    },
    breakdown: [
      { role: '연구개발(R&D/회로·소자 설계)', percent: 55, count: '약 3.3만 명', color: 'bg-indigo-600', majorGroup: '전자, 컴공, 신소재, 물리', roleType: 'rnd' },
      { role: '공정기술·설비 엔지니어', percent: 33, count: '약 2.0만 명', color: 'bg-emerald-600', majorGroup: '화공, 신소재, 기계, 화학', roleType: 'engineer' },
      { role: '글로벌 영업·마케팅', percent: 7, count: '약 4,200명', color: 'bg-amber-500', majorGroup: '경영, 어문, 상경', roleType: 'biz' },
      { role: '경영지원·재경·인사', percent: 5, count: '약 3,000명', color: 'bg-slate-400', majorGroup: '경영, 경제, 행정', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모', // 대규모 / 안정적 / 소수정예
    jobQuotaText: '국내 단일 사업장 최대 채용 규모 (매년 이공계 대졸 수천 명 선발)'
  },
  '삼성전자(DX)': {
    totalEmployees: '약 50,000명',
    operatorInfo: {
      roleName: '완제품 조립·포장 라인 기능직',
      count: '약 8,000명',
      note: '가전/스마트폰 현장 조립 기능직으로, 4년제 대졸 공채 풀과 별도로 운영됩니다.'
    },
    breakdown: [
      { role: '소프트웨어 및 HW 연구개발(R&D)', percent: 60, count: '약 2.5만 명', color: 'bg-indigo-600', majorGroup: '컴공, AI, 전자, 기계', roleType: 'rnd' },
      { role: '생산기술 및 품질 엔지니어', percent: 20, count: '약 8,400명', color: 'bg-emerald-600', majorGroup: '기계, 산업공학, 전자', roleType: 'engineer' },
      { role: '글로벌 마케팅·해외영업', percent: 14, count: '약 5,900명', color: 'bg-amber-500', majorGroup: '경영, 광고홍보, 어문', roleType: 'biz' },
      { role: '경영지원 및 재무기획', percent: 6, count: '약 2,500명', color: 'bg-slate-400', majorGroup: '경영, 경제', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: 'SW 및 전자·기계 직군 중심 대규모 수시·공채 진행'
  },
  'SK하이닉스': {
    totalEmployees: '약 32,000명',
    operatorInfo: {
      roleName: '반도체 FAB 클린룸 장비 오퍼레이터',
      count: '약 8,000명',
      note: '웨이퍼 라인 장비 가동 기능직으로, 전문학사/고졸 대상 별도 채용 트랙입니다.'
    },
    breakdown: [
      { role: 'HBM·메모리 연구개발(R&D)', percent: 54, count: '약 1.3만 명', color: 'bg-indigo-600', majorGroup: '전자, 신소재, 컴공, 물리', roleType: 'rnd' },
      { role: '공정기술·품질 엔지니어', percent: 34, count: '약 8,200명', color: 'bg-emerald-600', majorGroup: '화공, 신소재, 전자, 화학', roleType: 'engineer' },
      { role: '글로벌 영업·마케팅', percent: 7, count: '약 1,700명', color: 'bg-amber-500', majorGroup: '경영, 어문', roleType: 'biz' },
      { role: '경영전략 및 지원', percent: 5, count: '약 1,200명', color: 'bg-slate-400', majorGroup: '경영, 경제', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: 'HBM 호황으로 공정기술 엔지니어 및 R&D 대규모 충원'
  },
  '현대자동차': {
    totalEmployees: '약 73,000명 (대졸 일반/연구직 약 3.5만 명)',
    operatorInfo: {
      roleName: '울산·아산·전주공장 조립·생산 기능직 (기술직)',
      count: '약 3.8만 명 (전체 인원의 52%)',
      note: '완성차 조립 라인 현장 기능직으로, 고졸/전문대 졸업생 대상 기술직 전형으로 별도 선발됩니다.'
    },
    breakdown: [
      { role: '남양연구소 R&D (차량설계·전동화·SW)', percent: 52, count: '약 1.8만 명', color: 'bg-indigo-600', majorGroup: '기계, 전자, 컴공, 모빌리티', roleType: 'rnd' },
      { role: '플랜트/생산기술 및 품질 엔지니어', percent: 20, count: '약 7,000명', color: 'bg-emerald-600', majorGroup: '기계, 산업공학, 전기', roleType: 'engineer' },
      { role: '국내외 영업 및 브랜드 마케팅', percent: 16, count: '약 5,600명', color: 'bg-amber-500', majorGroup: '경영, 어문, 사회과학', roleType: 'biz' },
      { role: '경영기획 및 구매·지원', percent: 12, count: '약 4,200명', color: 'bg-slate-400', majorGroup: '경영, 경제, 행정', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '기계·전자·SDV 소프트웨어 및 공정 엔지니어 중심 대규모 공채'
  },
  '기아': {
    totalEmployees: '약 36,000명 (대졸 일반/연구직 약 1.5만 명)',
    operatorInfo: {
      roleName: '화성·광명·광주공장 조립·생산 기능직 (기술직)',
      count: '약 2.1만 명 (전체 인원의 58%)',
      note: '차량 조립 및 제조 라인 기능직으로, 고졸/전문대 기술직 별도 채용입니다.'
    },
    breakdown: [
      { role: '차량 R&D 및 기술연구소', percent: 48, count: '약 7,200명', color: 'bg-indigo-600', majorGroup: '기계, 전자, 컴공', roleType: 'rnd' },
      { role: '생산기술 및 품질 엔지니어', percent: 20, count: '약 3,000명', color: 'bg-emerald-600', majorGroup: '기계, 산업공학', roleType: 'engineer' },
      { role: '글로벌 영업마케팅(PBV)', percent: 20, count: '약 3,000명', color: 'bg-amber-500', majorGroup: '경영, 어문', roleType: 'biz' },
      { role: '경영지원 및 구매', percent: 12, count: '약 1,800명', color: 'bg-slate-400', majorGroup: '경영, 경제', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '모빌리티 엔지니어 및 글로벌 비즈니스 직군 중심 선발'
  },
  'LG에너지솔루션': {
    totalEmployees: '약 12,500명 (대졸 일반/연구직 약 8,500명)',
    operatorInfo: {
      roleName: '오창 배터리 기가팩토리 생산 오퍼레이터',
      count: '약 4,000명',
      note: '배터리 셀 조립 라인 현장 기능직으로, 전문학사/고졸 별도 선발입니다.'
    },
    breakdown: [
      { role: '배터리연구소 R&D', percent: 56, count: '약 4,800명', color: 'bg-indigo-600', majorGroup: '화학, 신소재, 전자, 화공', roleType: 'rnd' },
      { role: '배터리 공정·생산기술 엔지니어', percent: 24, count: '약 2,000명', color: 'bg-emerald-600', majorGroup: '화공, 신소재, 기계', roleType: 'engineer' },
      { role: '글로벌 전략영업·SCM', percent: 12, count: '약 1,000명', color: 'bg-amber-500', majorGroup: '경영, 어문, 산업공학', roleType: 'biz' },
      { role: '경영지원·인사·재경', percent: 8, count: '약 700명', color: 'bg-slate-400', majorGroup: '경영, 경제', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '글로벌 기가팩토리 확장으로 화공·신소재·배터리 대규모 채용'
  },
  'LG전자': {
    totalEmployees: '약 35,000명 (대졸 일반/연구직 약 2.6만 명)',
    operatorInfo: {
      roleName: '창원·평택공장 가전/TV 조립 기능직',
      count: '약 9,000명',
      note: '완제품 조립 라인 현장 기능직으로 별도 채용 트랙입니다.'
    },
    breakdown: [
      { role: '연구개발(가전/전장/TV R&D)', percent: 62, count: '약 1.6만 명', color: 'bg-indigo-600', majorGroup: '전자, 컴공, 기계', roleType: 'rnd' },
      { role: '생산기술 및 품질 엔지니어', percent: 18, count: '약 4,700명', color: 'bg-emerald-600', majorGroup: '기계, 산업공학, 전기', roleType: 'engineer' },
      { role: '해외영업 및 브랜드 마케팅', percent: 13, count: '약 3,400명', color: 'bg-amber-500', majorGroup: '경영, 어문, 광고홍보', roleType: 'biz' },
      { role: '경영지원', percent: 7, count: '약 1,900명', color: 'bg-slate-400', majorGroup: '경영, 경제', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '전장(VS) 및 스마트가전 R&D 엔지니어 대규모 수시채용'
  },
  'NAVER': {
    totalEmployees: '약 4,400명',
    breakdown: [
      { role: '소프트웨어 개발 및 AI 엔지니어', percent: 68, count: '약 3,000명', color: 'bg-indigo-600', majorGroup: '컴공, AI, 통계', roleType: 'rnd' },
      { role: '서비스 기획 및 비즈니스(BD)', percent: 20, count: '약 880명', color: 'bg-emerald-600', majorGroup: '경영, 사회과학, 인문', roleType: 'biz' },
      { role: '디자인(UI/UX) 및 리서치', percent: 5, count: '약 220명', color: 'bg-amber-500', majorGroup: '디자인, 심리', roleType: 'rnd' },
      { role: '경영지원·인사·법무', percent: 7, count: '약 300명', color: 'bg-slate-400', majorGroup: '경영, 행정', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '전체 인원의 70%가 테크 직군, 비개발직은 소수정예 선발'
  },
  '카카오': {
    totalEmployees: '약 3,900명',
    breakdown: [
      { role: '개발 및 데이터 엔지니어링', percent: 64, count: '약 2,500명', color: 'bg-indigo-600', majorGroup: '컴공, AI, 소프트웨어', roleType: 'rnd' },
      { role: '비즈니스 및 서비스 기획', percent: 24, count: '약 940명', color: 'bg-emerald-600', majorGroup: '경영, 광고홍보, 사회과학', roleType: 'biz' },
      { role: '브랜드 마케팅 및 디자인', percent: 6, count: '약 230명', color: 'bg-amber-500', majorGroup: '광고홍보, 디자인, 미디어', roleType: 'biz' },
      { role: '경영지원', percent: 6, count: '약 230명', color: 'bg-slate-400', majorGroup: '경영, 경제', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '공채 코딩테스트 중심 개발자 선발, 서비스기획은 수시 중심'
  },
  '쿠팡': {
    totalEmployees: '약 68,000명 (본사 대졸 테크/비즈니스 약 1.2만 명)',
    operatorInfo: {
      roleName: '풀필먼트 물류센터 운영 및 배송직(쿠팡친구)',
      count: '약 5.6만 명 (전체의 82%)',
      note: '물류 입출고 및 배송 현장 오퍼레이션 인력으로, 본사 4년제 대졸 공채 풀과 별도입니다.'
    },
    breakdown: [
      { role: '테크 및 소프트웨어/AI 아키텍트', percent: 45, count: '약 5,400명', color: 'bg-indigo-600', majorGroup: '컴공, AI, 산업공학', roleType: 'rnd' },
      { role: '리테일 MD 및 브랜드 소싱', percent: 25, count: '약 3,000명', color: 'bg-emerald-600', majorGroup: '경영, 어문, 상경', roleType: 'biz' },
      { role: '물류 최적화 시스템 엔지니어', percent: 15, count: '약 1,800명', color: 'bg-amber-500', majorGroup: '산업공학, 통계, 물류', roleType: 'engineer' },
      { role: '경영지원 및 대외정책', percent: 15, count: '약 1,800명', color: 'bg-slate-400', majorGroup: '경영, 행정, 법학', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '개발(SW) 및 물류 최적화(산업공학) 대졸 엔지니어 지속 대규모 채용'
  },
  '무신사': {
    totalEmployees: '약 1,800명',
    breakdown: [
      { role: '브랜드 소싱 MD 및 카테고리 기획', percent: 38, count: '약 680명', color: 'bg-emerald-600', majorGroup: '경영, 패션, 인문' },
      { role: '이커머스 개발 및 데이터/AI', percent: 32, count: '약 580명', color: 'bg-indigo-600', majorGroup: '컴공, 통계' },
      { role: '브랜드 마케팅 및 스냅 에디터', percent: 18, count: '약 320명', color: 'bg-amber-500', majorGroup: '광고홍보, 미디어, 어문' },
      { role: '경영지원 및 물류운영', percent: 12, count: '약 220명', color: 'bg-slate-400', majorGroup: '경영, 산업공학' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '패션 MD 및 개발 직군 중심 정기 충원, 마케팅은 실무 중심'
  },
  '배달의민족': {
    totalEmployees: '약 2,200명',
    breakdown: [
      { role: '개발 및 데이터 사이언스', percent: 45, count: '약 990명', color: 'bg-indigo-600', majorGroup: '컴공, 통계' },
      { role: '사업개발 및 외식업 영업/기획', percent: 30, count: '약 660명', color: 'bg-emerald-600', majorGroup: '경영, 사회과학' },
      { role: '브랜드 마케팅 및 크리에이티브', percent: 15, count: '약 330명', color: 'bg-amber-500', majorGroup: '광고홍보, 미디어, 심리' },
      { role: '경영지원', percent: 10, count: '약 220명', color: 'bg-slate-400', majorGroup: '경영, 행정' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '테크 직군과 커머스 사업기획 중심의 수시 전문 채용'
  },
  '제일기획': {
    totalEmployees: '약 1,450명',
    breakdown: [
      { role: '캠페인 기획(AE) 및 광고영업', percent: 48, count: '약 700명', color: 'bg-indigo-600', majorGroup: '광고홍보, 경영, 미디어, 어문' },
      { role: '크리에이티브(카피·디렉션)', percent: 34, count: '약 490명', color: 'bg-amber-500', majorGroup: '광고홍보, 국문, 미디어, 심리' },
      { role: '디지털 데이터 및 퍼포먼스', percent: 10, count: '약 140명', color: 'bg-emerald-600', majorGroup: '통계, 컴공, 정보' },
      { role: '경영관리 및 지원', percent: 8, count: '약 120명', color: 'bg-slate-400', majorGroup: '경영, 회계' }
    ],
    jobQuotaGrade: '소수정예',
    jobQuotaText: '전국 광고홍보/미디어 전공자들의 최우선 타깃 (매년 수십 명 선발)'
  },
  '이노션': {
    totalEmployees: '약 950명',
    breakdown: [
      { role: '글로벌/모빌리티 캠페인 기획(AE)', percent: 50, count: '약 470명', color: 'bg-indigo-600', majorGroup: '광고홍보, 경영, 어문' },
      { role: '크리에이티브 제작 및 공간 기획', percent: 32, count: '약 300명', color: 'bg-amber-500', majorGroup: '광고홍보, 미디어, 디자인' },
      { role: '미디어 플래닝 및 디지털 바잉', percent: 10, count: '약 100명', color: 'bg-emerald-600', majorGroup: '광고홍보, 통계' },
      { role: '경영지원', percent: 8, count: '약 80명', color: 'bg-slate-400', majorGroup: '경영, 경제' }
    ],
    jobQuotaGrade: '소수정예',
    jobQuotaText: '현대차그룹 글로벌 마케팅 중심 공채 진행 (소수 경쟁 선발)'
  },
  'HS애드': {
    totalEmployees: '약 850명',
    breakdown: [
      { role: '통합마케팅(IMC) 기획(AE)', percent: 52, count: '약 440명', color: 'bg-indigo-600', majorGroup: '광고홍보, 경영, 미디어' },
      { role: '크리에이티브 콘텐츠 제작', percent: 30, count: '약 260명', color: 'bg-amber-500', majorGroup: '광고홍보, 국문, 영상' },
      { role: '디지털 플랫폼 및 솔루션', percent: 10, count: '약 80명', color: 'bg-emerald-600', majorGroup: '통계, 컴공' },
      { role: '경영지원', percent: 8, count: '약 70명', color: 'bg-slate-400', majorGroup: '경영' }
    ],
    jobQuotaGrade: '소수정예',
    jobQuotaText: 'LG 계열 대행사로 매년 하반기 공채 중심 소수 선발'
  },
  '대홍기획': {
    totalEmployees: '약 620명',
    breakdown: [
      { role: '광고 캠페인 기획(AE)', percent: 50, count: '약 310명', color: 'bg-indigo-600', majorGroup: '광고홍보, 경영, 어문' },
      { role: '크리에이티브 제작 및 카피', percent: 30, count: '약 190명', color: 'bg-amber-500', majorGroup: '광고홍보, 국문, 미디어' },
      { role: '마케팅 프로모션 및 BTL', percent: 12, count: '약 70명', color: 'bg-emerald-600', majorGroup: '경영, 신문방송' },
      { role: '경영지원', percent: 8, count: '약 50명', color: 'bg-slate-400', majorGroup: '경영' }
    ],
    jobQuotaGrade: '소수정예',
    jobQuotaText: '롯데그룹 공채 기반 신입 선발 (학과 포트폴리오 필수)'
  },
  'KB금융': {
    totalEmployees: '약 17,000명 (KB국민은행 기준)',
    breakdown: [
      { role: '영업점 개인/기업금융 및 WM', percent: 62, count: '약 1.05만 명', color: 'bg-amber-500', majorGroup: '경영, 경제, 인문, 사회' },
      { role: '본부 기업여신·투자금융(IB)', percent: 16, count: '약 2,700명', color: 'bg-indigo-600', majorGroup: '경제, 경영, 통계' },
      { role: '디지털 뱅킹 및 IT 시스템', percent: 15, count: '약 2,500명', color: 'bg-emerald-600', majorGroup: '컴공, 정보, 통계' },
      { role: '경영기획·리스크·인사', percent: 7, count: '약 1,200명', color: 'bg-slate-400', majorGroup: '경영, 경제, 행정' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '시중은행 중 최대 규모, 일반 전공자 영업점 공채 및 디지털 특화 공채'
  },
  '삼성바이오로직스': {
    totalEmployees: '약 4,500명',
    breakdown: [
      { role: '바이오 배양·정제 공정 생산(Up/Downstream)', percent: 52, count: '약 2,300명', color: 'bg-emerald-600', majorGroup: '생명, 화공, 바이오' },
      { role: '품질분석 및 보증(QC/QA)', percent: 26, count: '약 1,200명', color: 'bg-indigo-600', majorGroup: '생명, 화학, 약학' },
      { role: '공정개발 R&D (MSAT)', percent: 14, count: '약 630명', color: 'bg-amber-500', majorGroup: '바이오, 화공' },
      { role: '경영지원 및 글로벌 영업', percent: 8, count: '약 360명', color: 'bg-slate-400', majorGroup: '어문, 경영' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '송도 4·5공장 증설로 바이오·화공·화학 전공자 역대급 대규모 채용'
  },
  '셀트리온': {
    totalEmployees: '약 2,600명',
    breakdown: [
      { role: '바이오의약품 생산 및 기술지원', percent: 44, count: '약 1,140명', color: 'bg-emerald-600', majorGroup: '생명, 바이오, 화공' },
      { role: '바이오시밀러 R&D 및 임상', percent: 36, count: '약 940명', color: 'bg-indigo-600', majorGroup: '생명, 화학, 약학' },
      { role: '글로벌 직판 해외영업', percent: 12, count: '약 310명', color: 'bg-amber-500', majorGroup: '어문, 경영, 국제' },
      { role: '경영지원', percent: 8, count: '약 210명', color: 'bg-slate-400', majorGroup: '경영, 경제' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '송도 연구소 및 공장 증설에 맞춘 바이오 R&D 중심 채용'
  },
  '한화에어로스페이스': {
    totalEmployees: '약 7,200명 (대졸 일반/연구직 약 4,200명)',
    operatorInfo: {
      roleName: '창원 방산/항공엔진 정밀가공·조립 기능직',
      count: '약 3,000명',
      note: '엔진 및 자주포 조립 현장 기능직으로, 고졸/전문대 기술직으로 별도 선발됩니다.'
    },
    breakdown: [
      { role: '유도무기·항공엔진 연구개발(R&D)', percent: 62, count: '약 2,600명', color: 'bg-indigo-600', majorGroup: '기계, 전자, 신소재, 컴공', roleType: 'rnd' },
      { role: '체계종합 시험평가·품질 엔지니어', percent: 18, count: '약 760명', color: 'bg-emerald-600', majorGroup: '기계, 금속, 산업공학', roleType: 'engineer' },
      { role: '방산 해외수출 및 사업관리', percent: 12, count: '약 500명', color: 'bg-amber-500', majorGroup: '어문, 경영, 무역', roleType: 'biz' },
      { role: '경영지원 및 품질안전', percent: 8, count: '약 340명', color: 'bg-slate-400', majorGroup: '경영, 산업안전', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '글로벌 방산 수출 확대로 기계·전자·신소재 연구원 대규모 증원'
  },
  'HD현대중공업': {
    totalEmployees: '약 13,000명 (대졸 일반/연구직 약 5,500명)',
    operatorInfo: {
      roleName: '울산 조선소 도크 조립·용접·도장 기능직',
      count: '약 7,500명 (전체 직원의 58%)',
      note: '선박 건조 현장 기능직으로, 기술연수원 및 현장 기능직 전형으로 별도 선발됩니다.'
    },
    breakdown: [
      { role: '선박·엔진 설계 및 R&D', percent: 55, count: '약 3,000명', color: 'bg-indigo-600', majorGroup: '기계, 조선, 전자, 신소재', roleType: 'rnd' },
      { role: '스마트 조선소 공정기술·품질 엔지니어', percent: 22, count: '약 1,200명', color: 'bg-emerald-600', majorGroup: '산업공학, 기계, 조선', roleType: 'engineer' },
      { role: '선박 영업 및 사업기획', percent: 15, count: '약 830명', color: 'bg-amber-500', majorGroup: '경영, 어문, 무역', roleType: 'biz' },
      { role: '경영지원', percent: 8, count: '약 470명', color: 'bg-slate-400', majorGroup: '경영', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '친환경 LNG선 슈퍼사이클로 조선·기계 R&D 및 공정 엔지니어 대거 선발'
  },
  '안랩': {
    totalEmployees: '약 1,450명',
    breakdown: [
      { role: '정보보안 SW 및 V3 코어 연구개발', percent: 62, count: '약 900명', color: 'bg-indigo-600', majorGroup: '컴공, 정보보안, 전자', roleType: 'rnd' },
      { role: 'CERT 침해대응 및 보안관제 기술', percent: 22, count: '약 320명', color: 'bg-emerald-600', majorGroup: '정보보안, 컴퓨터, 통신', roleType: 'engineer' },
      { role: '보안 솔루션 기술영업', percent: 10, count: '약 145명', color: 'bg-amber-500', majorGroup: '컴공, 경영, 인문', roleType: 'biz' },
      { role: '경영지원 및 기획', percent: 6, count: '약 85명', color: 'bg-slate-400', majorGroup: '경영, 행정', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '국내 1위 사이버보안 기업으로 컴퓨터·보안 인재 상시 채용'
  },
  'SK쉴더스': {
    totalEmployees: '약 6,500명 (본사 테크/보안컨설팅 약 2,800명)',
    operatorInfo: {
      roleName: '출동 보안 및 현장 경비 오퍼레이션',
      count: '약 3,700명',
      note: '물리 보안 출동 및 기기 설치 현장 인력입니다.'
    },
    breakdown: [
      { role: '화이트해커(EQST) 및 보안 컨설팅', percent: 55, count: '약 1,540명', color: 'bg-indigo-600', majorGroup: '정보보안, 컴공, 전자', roleType: 'rnd' },
      { role: '기업/B2B 보안 솔루션 영업', percent: 25, count: '약 700명', color: 'bg-amber-500', majorGroup: '경영, 사회, 인문', roleType: 'biz' },
      { role: '경영지원 및 전략기획', percent: 20, count: '약 560명', color: 'bg-slate-400', majorGroup: '경영, 경제', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '국내 최대 통합 보안 플랫폼으로 보안 전문 인력 대거 영입'
  },
  'HL만도': {
    totalEmployees: '약 4,100명 (대졸 일반/연구직 약 2,600명)',
    operatorInfo: {
      roleName: '원주·평택공장 섀시 부품 가공·조립 기능직',
      count: '약 1,500명',
      note: '부품 조립 현장 기능직으로, 별도 기술직 채용 트랙입니다.'
    },
    breakdown: [
      { role: '자율주행 제동/조향 전장 R&D', percent: 60, count: '약 1,560명', color: 'bg-indigo-600', majorGroup: '기계, 전자, 컴공, 로봇', roleType: 'rnd' },
      { role: '스마트 생산기술 및 품질 엔지니어', percent: 20, count: '약 520명', color: 'bg-emerald-600', majorGroup: '기계, 자동차, 전기', roleType: 'engineer' },
      { role: '글로벌 완성차 수주 영업', percent: 12, count: '약 310명', color: 'bg-amber-500', majorGroup: '경영, 어문, 무역', roleType: 'biz' },
      { role: '경영지원', percent: 8, count: '약 210명', color: 'bg-slate-400', majorGroup: '경영, 산업공학', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '글로벌 자율주행 전장화로 기계·전자 엔지니어 지속 채용'
  },
  '현대위아': {
    totalEmployees: '약 3,100명 (대졸 일반/연구직 약 1,800명)',
    operatorInfo: {
      roleName: '공작기계 및 모빌리티 구동축 조립 기능직',
      count: '약 1,300명',
      note: '현장 조립 및 가공 기능직으로 별도 채용됩니다.'
    },
    breakdown: [
      { role: '열관리 시스템 및 로봇 R&D', percent: 55, count: '약 990명', color: 'bg-indigo-600', majorGroup: '기계, 전자, 로봇', roleType: 'rnd' },
      { role: '생산기술 및 품질 엔지니어', percent: 23, count: '약 410명', color: 'bg-emerald-600', majorGroup: '기계, 금속, 산업공학', roleType: 'engineer' },
      { role: '국내외 부품 영업', percent: 14, count: '약 250명', color: 'bg-amber-500', majorGroup: '경영, 어문', roleType: 'biz' },
      { role: '경영지원', percent: 8, count: '약 150명', color: 'bg-slate-400', majorGroup: '경영', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '현대차 계열 핵심 구동계 부품사로 기계 전공자 상시 선발'
  },
  '한국콜마': {
    totalEmployees: '약 1,850명 (대졸 일반/연구직 약 1,300명)',
    operatorInfo: {
      roleName: '화장품·제약 스마트팩토리 충진 포장 기능직',
      count: '약 550명',
      note: '화장품 포장 라인 현장 기능직으로 별도 선발됩니다.'
    },
    breakdown: [
      { role: '화장품 및 제약 제형 R&D', percent: 65, count: '약 850명', color: 'bg-indigo-600', majorGroup: '화학, 생명과학, 약학, 화공', roleType: 'rnd' },
      { role: '공정기술 및 품질(QC/QA) 엔지니어', percent: 15, count: '약 200명', color: 'bg-emerald-600', majorGroup: '화공, 산업공학, 기계', roleType: 'engineer' },
      { role: '국내외 뷰티 브랜드 ODM 영업', percent: 12, count: '약 150명', color: 'bg-amber-500', majorGroup: '경영, 어문, 소비자', roleType: 'biz' },
      { role: '경영지원', percent: 8, count: '약 100명', color: 'bg-slate-400', majorGroup: '경영, 회계', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: 'K-뷰티 글로벌 수출 폭증으로 화학·생명 전공 연구원 대거 선발'
  },
  '코스맥스': {
    totalEmployees: '약 1,550명 (대졸 일반/연구직 약 1,150명)',
    operatorInfo: {
      roleName: '화장품 CGMP 제조·포장 기능직',
      count: '약 400명',
      note: '현장 생산/포장 기능직으로 별도 선발됩니다.'
    },
    breakdown: [
      { role: 'R&I(연구혁신) 제형 연구개발', percent: 70, count: '약 800명', color: 'bg-indigo-600', majorGroup: '화학, 생명과학, 화공, 약학', roleType: 'rnd' },
      { role: '품질보증(QA/QC) 및 공정 엔지니어', percent: 14, count: '약 160명', color: 'bg-emerald-600', majorGroup: '화학, 화공, 산업공학', roleType: 'engineer' },
      { role: '글로벌 브랜드 맞춤 수주영업(BM)', percent: 10, count: '약 115명', color: 'bg-amber-500', majorGroup: '어문, 경영, 마케팅', roleType: 'biz' },
      { role: '경영지원', percent: 6, count: '약 75명', color: 'bg-slate-400', majorGroup: '경영', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '글로벌 1위 화장품 ODM사로 이공계 석·학사 연구직 대규모 채용'
  },
  '종근당': {
    totalEmployees: '약 2,450명 (대졸 일반/연구직 약 1,800명)',
    operatorInfo: {
      roleName: '천안 스마트공장 의약품 포장·제조 기능직',
      count: '약 650명',
      note: '정제/캡슐 제조 라인 현장 기능직으로 별도 채용입니다.'
    },
    breakdown: [
      { role: '전국 병의원 전문의약품 영업(MR)', percent: 55, count: '약 1,000명', color: 'bg-amber-500', majorGroup: '전공 무관, 생명, 경영, 인문', roleType: 'biz' },
      { role: '효종연구소 신약 R&D 연구원', percent: 24, count: '약 430명', color: 'bg-indigo-600', majorGroup: '약학, 생명과학, 화학, 의학', roleType: 'rnd' },
      { role: '공정기술 및 품질관리(QC/QA) 엔지니어', percent: 13, count: '약 230명', color: 'bg-emerald-600', majorGroup: '화학, 생명과학, 약학, 화공', roleType: 'engineer' },
      { role: '경영기획 및 지원', percent: 8, count: '약 140명', color: 'bg-slate-400', majorGroup: '경영, 경제, 법학', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '제약 영업 및 품질관리, 신약 연구직군 매년 정기 공채 실시'
  },
  '대웅제약': {
    totalEmployees: '약 1,650명 (대졸 일반/연구직 약 1,350명)',
    operatorInfo: {
      roleName: '오송·향남 스마트공장 생산 라인 기능직',
      count: '약 300명',
      note: '현장 제제 포장 기능직으로 별도 채용입니다.'
    },
    breakdown: [
      { role: '국내외 병원 영업 및 마케팅(MR)', percent: 48, count: '약 650명', color: 'bg-amber-500', majorGroup: '전공 무관, 상경, 생명', roleType: 'biz' },
      { role: '신약 R&D 및 글로벌 임상', percent: 36, count: '약 490명', color: 'bg-indigo-600', majorGroup: '약학, 화학, 생명, 의학', roleType: 'rnd' },
      { role: 'cGMP 공정 및 품질보증(QA/QC) 엔지니어', percent: 10, count: '약 130명', color: 'bg-emerald-600', majorGroup: '화공, 생명공학, 기계', roleType: 'engineer' },
      { role: '경영지원', percent: 6, count: '약 80명', color: 'bg-slate-400', majorGroup: '경영, 법학', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '글로벌 신약 수출 성과로 R&D 및 글로벌 사업 인력 확충'
  },
  'GC녹십자': {
    totalEmployees: '약 2,350명 (대졸 일반/연구직 약 1,550명)',
    operatorInfo: {
      roleName: '오창·화순 혈액제제·백신 제조 기능원',
      count: '약 800명',
      note: '백신 포장 및 제조 라인 현장 기능직으로 별도 선발됩니다.'
    },
    breakdown: [
      { role: '목암생명과학연구소 R&D', percent: 42, count: '약 650명', color: 'bg-indigo-600', majorGroup: '생명과학, 약학, 생화학, 화학', roleType: 'rnd' },
      { role: '병원/의원 전문 치료제 영업(MR)', percent: 34, count: '약 520명', color: 'bg-amber-500', majorGroup: '생명, 상경, 인문', roleType: 'biz' },
      { role: '바이오 배양·정제 공정 및 품질(QC/QA) 엔지니어', percent: 16, count: '약 250명', color: 'bg-emerald-600', majorGroup: '생명공학, 화학, 화공, 기계', roleType: 'engineer' },
      { role: '경영지원', percent: 8, count: '약 130명', color: 'bg-slate-400', majorGroup: '경영, 경제', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '혈액 및 백신 제조 특화로 생명·화학 계열 필수 채용'
  },
  '오스템임플란트': {
    totalEmployees: '약 2,850명 (대졸 일반/연구직 약 2,050명)',
    operatorInfo: {
      roleName: '부산 스마트공장 임플란트 가공·세척 포장 기능직',
      count: '약 800명',
      note: '임플란트 정밀가공 및 포장 현장 기능직으로 별도 선발됩니다.'
    },
    breakdown: [
      { role: '임플란트 및 3D 덴티스트리 R&D', percent: 40, count: '약 820명', color: 'bg-indigo-600', majorGroup: '치의학, 의공학, 기계, 재료', roleType: 'rnd' },
      { role: '국내외 치과 병의원 영업', percent: 34, count: '약 700명', color: 'bg-amber-500', majorGroup: '상경, 어문, 보건', roleType: 'biz' },
      { role: '의료기기 품질관리(QA/RA) 및 생산 엔지니어', percent: 18, count: '약 370명', color: 'bg-emerald-600', majorGroup: '기계, 금속, 신소재, 전자', roleType: 'engineer' },
      { role: '경영지원', percent: 8, count: '약 160명', color: 'bg-slate-400', majorGroup: '경영', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '글로벌 1위 치과 임플란트 기업으로 기계·의공학·영업 대규모 선발'
  },
  '토스': {
    totalEmployees: '약 2,100명',
    breakdown: [
      { role: '소프트웨어 엔지니어링 & 서버개발', percent: 58, count: '약 1,220명', color: 'bg-indigo-600', majorGroup: '컴공, 소프트웨어, 전자' },
      { role: '프로덕트 디자이너 및 UX 기획', percent: 18, count: '약 380명', color: 'bg-emerald-600', majorGroup: '디자인, 심리, 경영' },
      { role: '데이터 사이언스 & 금융 비즈니스', percent: 16, count: '약 340명', color: 'bg-amber-500', majorGroup: '통계, 수학, 경제, 경영' },
      { role: '정보보안 및 경영지원', percent: 8, count: '약 160명', color: 'bg-slate-400', majorGroup: '보안, 법학, 회계' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '국내 최고 대우 핀테크 유니콘으로 IT·통계 최우수 인재 선발'
  },
  '당근': {
    totalEmployees: '약 480명',
    breakdown: [
      { role: '백엔드/클라우드/앱 개발자', percent: 62, count: '약 300명', color: 'bg-indigo-600', majorGroup: '컴공, 소프트웨어' },
      { role: '로컬 비즈니스 & 그로스 마케팅', percent: 22, count: '약 105명', color: 'bg-amber-500', majorGroup: '경영, 미디어, 광고홍보' },
      { role: '프로덕트 디자인 및 UX 리서치', percent: 10, count: '약 48명', color: 'bg-emerald-600', majorGroup: '디자인, 심리학' },
      { role: '피플(HR) 및 경영지원', percent: 6, count: '약 27명', color: 'bg-slate-400', majorGroup: '경영, 사회' }
    ],
    jobQuotaGrade: '소수정예',
    jobQuotaText: '하이퍼로컬 플랫폼 1위로 실력 중심 소수정예 채용'
  },
  'SM엔터테인먼트': {
    totalEmployees: '약 620명',
    breakdown: [
      { role: 'A&R(음악기획) 및 콘텐츠 제작', percent: 42, count: '약 260명', color: 'bg-indigo-600', majorGroup: '실용음악, 미디어, 작곡, 국문' },
      { role: '글로벌 아티스트 마케팅 & PR', percent: 34, count: '약 210명', color: 'bg-amber-500', majorGroup: '광고홍보, 어문, 경영' },
      { role: '아티스트 매니지먼트 및 현장운영', percent: 14, count: '약 90명', color: 'bg-emerald-600', majorGroup: '전공 무관, 사회, 체육' },
      { role: '경영기획 및 재무', percent: 10, count: '약 60명', color: 'bg-slate-400', majorGroup: '경영, 경제, 법학' }
    ],
    jobQuotaGrade: '소수정예',
    jobQuotaText: 'K-POP 1세대 대표 기획사로 미디어·음악·어문 인재 선발'
  },
  'JYP': {
    totalEmployees: '약 360명',
    breakdown: [
      { role: 'A&R 음악 프로듀싱 및 앨범 기획', percent: 44, count: '약 160명', color: 'bg-indigo-600', majorGroup: '음악, 미디어, 어문, 예술' },
      { role: '해외 사업 및 글로벌 퍼블리싱', percent: 32, count: '약 115명', color: 'bg-amber-500', majorGroup: '어문(영/일/중), 경영, 무역' },
      { role: '매니지먼트 & 팬 커뮤니케이션', percent: 14, count: '약 50명', color: 'bg-emerald-600', majorGroup: '전공 무관, 사회' },
      { role: '경영지원', percent: 10, count: '약 35명', color: 'bg-slate-400', majorGroup: '경영, 회계' }
    ],
    jobQuotaGrade: '소수정예',
    jobQuotaText: '아티스트 글로벌 진출 가속화로 어문·미디어 전공 우대'
  },
  '스튜디오드래곤': {
    totalEmployees: '약 210명',
    breakdown: [
      { role: '드라마 기획PD 및 대본 개발', percent: 56, count: '약 120명', color: 'bg-indigo-600', majorGroup: '국어국문, 문예창작, 신문방송, 연출' },
      { role: '글로벌 OTT 판권 유통 및 마케팅', percent: 30, count: '약 60명', color: 'bg-amber-500', majorGroup: '미디어, 어문, 경영' },
      { role: '경영기획 및 제작관리', percent: 14, count: '약 30명', color: 'bg-slate-400', majorGroup: '경영, 경제, 법학' }
    ],
    jobQuotaGrade: '소수정예',
    jobQuotaText: '글로벌 메가히트 K-드라마 전문 제작사로 스토리텔링 최정예 선발'
  },
  '한국전력공사': {
    totalEmployees: '약 23,500명',
    breakdown: [
      { role: '전국 송배전 전력망 운용 및 기술', percent: 66, count: '약 15,500명', color: 'bg-emerald-600', majorGroup: '전기, 전자, 정보통신, 토목' },
      { role: '원전 수출 및 신재생에너지 R&D', percent: 16, count: '약 3,760명', color: 'bg-indigo-600', majorGroup: '전기, 원자력, 기계, 환경' },
      { role: '전력 영업 및 고객 수급 관리', percent: 12, count: '약 2,820명', color: 'bg-amber-500', majorGroup: '경영, 경제, 행정, 법학' },
      { role: '경영기획 및 재무', percent: 6, count: '약 1,420명', color: 'bg-slate-400', majorGroup: '경영, 경제' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '국내 최대 시장형 공기업으로 전기·전자 공학 인재 매년 대규모 공채'
  },
  '한국토지주택공사': {
    totalEmployees: '약 9,200명',
    breakdown: [
      { role: '신도시 택지개발 및 토목/건축', percent: 58, count: '약 5,340명', color: 'bg-emerald-600', majorGroup: '도시공학, 토목, 건축, 조경' },
      { role: '주거복지 및 토지보상 보상행정', percent: 24, count: '약 2,200명', color: 'bg-amber-500', majorGroup: '부동산, 법학, 행정, 사회복지' },
      { role: '도시계획 및 스마트시티 연구', percent: 10, count: '약 920명', color: 'bg-indigo-600', majorGroup: '도시공학, 환경, 통계' },
      { role: '경영지원', percent: 8, count: '약 740명', color: 'bg-slate-400', majorGroup: '경영, 경제' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '국토 인프라 및 스마트시티 주관 공기업으로 도시·토목·행정 대거 채용'
  },
  '인천국제공항공사': {
    totalEmployees: '약 1,850명',
    breakdown: [
      { role: '공항 인프라 토목·기계·전기 제어', percent: 46, count: '약 850명', color: 'bg-emerald-600', majorGroup: '기계, 전기, 토목, 항공' },
      { role: '공항 운항 및 스마트 터미널 운영', percent: 28, count: '약 520명', color: 'bg-indigo-600', majorGroup: '항공교통, 통신, 컴퓨터, 산업공학' },
      { role: '면세점 상업시설 개발 및 항공영업', percent: 18, count: '약 330명', color: 'bg-amber-500', majorGroup: '경영, 경제, 어문, 무역' },
      { role: '경영기획', percent: 8, count: '약 150명', color: 'bg-slate-400', majorGroup: '경영, 행정, 법학' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '대학생 취업 선호도 1위 공기업으로 공학·상경계 최우수 인재 선발'
  },
  'KOTRA': {
    totalEmployees: '약 1,250명',
    breakdown: [
      { role: '해외무역관 글로벌 시장개척/바이어', percent: 64, count: '약 800명', color: 'bg-amber-500', majorGroup: '어문(영/중/스페인/러), 경영, 무역' },
      { role: '통상 전략 및 외국인 투자유치', percent: 20, count: '약 250명', color: 'bg-indigo-600', majorGroup: '국제관계, 경제, 정치외교, 법학' },
      { role: '글로벌 공급망 조사 및 빅데이터', percent: 10, count: '약 125명', color: 'bg-emerald-600', majorGroup: '통계, 산업공학, 컴퓨터' },
      { role: '경영지원', percent: 6, count: '약 75명', color: 'bg-slate-400', majorGroup: '경영, 행정' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '글로벌 무역투자 진흥기관으로 어문·상경·국제정치 인재 정기 채용'
  },
  '금융결제원': {
    totalEmployees: '약 870명',
    breakdown: [
      { role: '국가 핵심 금융전산망 소프트웨어 개발', percent: 68, count: '약 590명', color: 'bg-indigo-600', majorGroup: '컴공, 정보보안, 전자' },
      { role: '지급결제 정책 및 오픈뱅킹 기획', percent: 18, count: '약 160명', color: 'bg-amber-500', majorGroup: '경영, 경제, 통계' },
      { role: '전자금융 침해대응 및 보안인증', percent: 8, count: '약 70명', color: 'bg-emerald-600', majorGroup: '정보보안, 전산' },
      { role: '경영지원', percent: 6, count: '약 50명', color: 'bg-slate-400', majorGroup: '경영, 법학' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '최고의 직업 안정성과 금융 IT 전산 전문성을 갖춘 금융 공익기관'
  },
  '한국갤럽': {
    totalEmployees: '약 320명',
    breakdown: [
      { role: '여론조사 및 시장통계 데이터 분석', percent: 56, count: '약 180명', color: 'bg-indigo-600', majorGroup: '통계학, 사회학, 심리학, 정치' },
      { role: '마케팅 리서치 및 소비자 정성조사', percent: 26, count: '약 83명', color: 'bg-amber-500', majorGroup: '경영, 신문방송, 심리학' },
      { role: '조사 실사(Field) 운영 관리', percent: 12, count: '약 38명', color: 'bg-emerald-600', majorGroup: '사회과학, 행정' },
      { role: '경영지원', percent: 6, count: '약 19명', color: 'bg-slate-400', majorGroup: '경영' }
    ],
    jobQuotaGrade: '소수정예',
    jobQuotaText: '국내 최고 공신력의 여론조사 기관으로 통계·사회학 전공자 핵심 우대'
  },

  // ================= 15. 100대 기업 완성 신규 12개사 =================
  'CJ ENM': {
    totalEmployees: '약 3,450명 (100% 대졸 이상 전문 미디어/엔터 인력)',
    breakdown: [
      { role: '방송/콘텐츠 제작(PD) 및 연출', percent: 45, count: '약 1,550명', color: 'bg-indigo-600', majorGroup: '미디어, 연극영화, 인문' },
      { role: '미디어 사업기획 및 편성/유통', percent: 28, count: '약 960명', color: 'bg-emerald-600', majorGroup: '경영, 어문, 신방' },
      { role: '디지털 광고 및 글로벌 마케팅', percent: 18, count: '약 620명', color: 'bg-amber-500', majorGroup: '광고홍보, 경영, 심리' },
      { role: '경영지원', percent: 9, count: '약 320명', color: 'bg-slate-400', majorGroup: '경영, 법학, 회계' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '국내 1위 종합 콘텐츠 기업으로 PD·콘텐츠 기획자·글로벌 비즈니스 대규모 채용'
  },
  '아모레퍼시픽': {
    totalEmployees: '약 5,200명 (대졸 전문직 및 글로벌 BM 중심)',
    operatorInfo: {
      roleName: '오산 뷰티파크 현장 충진·포장 생산직',
      count: '약 1,100명',
      note: '현장 생산/가동 기능직으로 4년제 대졸 공채 풀과 별도 선발됩니다.'
    },
    breakdown: [
      { role: '브랜드 매니저(BM) 및 글로벌 마케팅', percent: 40, count: '약 1,640명', color: 'bg-indigo-600', majorGroup: '경영, 어문, 미디어' },
      { role: '화장품 제형·바이오 소재 R&D', percent: 32, count: '약 1,310명', color: 'bg-emerald-600', majorGroup: '화학, 화공, 생명, 약학' },
      { role: '패키징·제품 디자인 및 VMD', percent: 16, count: '약 660명', color: 'bg-amber-500', majorGroup: '산업디자인, 시각디자인' },
      { role: '경영지원 및 SCM', percent: 12, count: '약 490명', color: 'bg-slate-400', majorGroup: '경영, 통계, 산업공학' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: 'K-뷰티 대표 기업으로 화장품 연구개발 및 브랜드 매니저(BM) 선호 최상위'
  },
  'LG생활건강': {
    totalEmployees: '약 4,600명 (대졸 연구원 및 럭셔리 마케팅 중심)',
    operatorInfo: {
      roleName: '청주 공장 샴푸·화장품 충진 생산직',
      count: '약 1,200명',
      note: '현장 가동직으로 4년제 대졸 공채 풀과 별도 선발됩니다.'
    },
    breakdown: [
      { role: '화장품·생활화학 R&D 연구개발', percent: 38, count: '약 1,290명', color: 'bg-indigo-600', majorGroup: '화공, 화학, 생명공학' },
      { role: '글로벌 럭셔리 브랜드 마케팅', percent: 34, count: '약 1,160명', color: 'bg-emerald-600', majorGroup: '경영, 어문, 광고홍보' },
      { role: '국내외 리테일·면세점 영업', percent: 18, count: '약 610명', color: 'bg-amber-500', majorGroup: '경영, 사회과학, 어문' },
      { role: '경영지원', percent: 10, count: '약 340명', color: 'bg-slate-400', majorGroup: '경영, 경제, 법학' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '후·숨·오휘 등 럭셔리 뷰티 및 생활화학 R&D/마케팅 전통의 강자'
  },
  '하이트진로': {
    totalEmployees: '약 3,100명 (전국 주류 유통망 및 양조 엔지니어)',
    operatorInfo: {
      roleName: '강원/전주 맥주·소주 공장 병입 현장직',
      count: '약 1,100명',
      note: '공장 생산 가동직으로 4년제 대졸 공채 풀과 별도 선발됩니다.'
    },
    breakdown: [
      { role: '전국 주류 도소매 영업 및 유통 관리', percent: 52, count: '약 1,040명', color: 'bg-indigo-600', majorGroup: '경영, 사회, 인문, 어문' },
      { role: '주류 브랜드 마케팅 및 캐릭터 IP', percent: 22, count: '약 440명', color: 'bg-emerald-600', majorGroup: '광고홍보, 경영, 미디어' },
      { role: '발효 효모·양조 품질관리(QC/QA)', percent: 16, count: '약 320명', color: 'bg-amber-500', majorGroup: '식품공학, 화공, 미생물' },
      { role: '경영지원', percent: 10, count: '약 200명', color: 'bg-slate-400', majorGroup: '경영, 행정, 회계' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '참이슬·테라·켈리의 1위 주류 기업으로 전국 영업망 및 양조 연구직 공채'
  },
  '오리온': {
    totalEmployees: '약 2,300명 (글로벌 R&D 및 스낵 마케팅)',
    operatorInfo: {
      roleName: '익산/청주 제과 공장 라인 조립/포장직',
      count: '약 900명',
      note: '현장 생산직으로 대졸 공채와 별도로 선발됩니다.'
    },
    breakdown: [
      { role: '스낵·파이 신제품 연구개발(R&D)', percent: 36, count: '약 500명', color: 'bg-indigo-600', majorGroup: '식품공학, 생명, 농화학' },
      { role: '글로벌(중국/베트남/러시아) 영업·마케팅', percent: 34, count: '약 480명', color: 'bg-emerald-600', majorGroup: '경영, 중문, 노문, 어문' },
      { role: '자동화 제과 설비 공정 엔지니어', percent: 18, count: '약 250명', color: 'bg-amber-500', majorGroup: '기계, 전기, 화공' },
      { role: '경영지원', percent: 12, count: '약 170명', color: 'bg-slate-400', majorGroup: '경영, 경제, 법학' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '해외 매출 비중 65% 이상의 글로벌 제과 명가로 어문·식품공학 우대'
  },
  '농심': {
    totalEmployees: '약 5,100명 (라면/스낵 글로벌 R&D 및 영업)',
    operatorInfo: {
      roleName: '안성/구미 라면·스낵 생산 포장 라인직',
      count: '약 2,300명',
      note: '현장 공장 가동직으로 대졸 공채 풀과 별도 선발됩니다.'
    },
    breakdown: [
      { role: '면/스프 배합 연구개발 및 품질보증', percent: 38, count: '약 1,060명', color: 'bg-indigo-600', majorGroup: '식품공학, 화공, 화학' },
      { role: '국내외 리테일 영업 및 K-푸드 수출', percent: 35, count: '약 980명', color: 'bg-emerald-600', majorGroup: '경영, 영문, 어문' },
      { role: '연속 유탕/건조 생산기술 엔지니어', percent: 17, count: '약 480명', color: 'bg-amber-500', majorGroup: '기계공학, 화공, 전기' },
      { role: '경영지원', percent: 10, count: '약 280명', color: 'bg-slate-400', majorGroup: '경영, 행정, 회계' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '신라면 글로벌 신화의 K-푸드 선도기업으로 식품공학·해외영업 최우선 선발'
  },
  '빙그레': {
    totalEmployees: '약 1,850명 (유가공/빙과 R&D 및 마케팅)',
    operatorInfo: {
      roleName: '남양주/김해 유제품·아이스크림 충진직',
      count: '약 650명',
      note: '공장 생산 가동직으로 대졸 공채와 별도 선발됩니다.'
    },
    breakdown: [
      { role: '유가공·빙과 신제품 연구개발', percent: 38, count: '약 460명', color: 'bg-indigo-600', majorGroup: '식품공학, 축산, 미생물' },
      { role: '냉동·냉장 콜드체인 전국 유통 영업', percent: 34, count: '약 410명', color: 'bg-emerald-600', majorGroup: '경영, 사회, 인문' },
      { role: '캐릭터 IP 브랜딩 및 디지털 마케팅', percent: 16, count: '약 190명', color: 'bg-amber-500', majorGroup: '광고홍보, 디자인, 미디어' },
      { role: '경영지원', percent: 12, count: '약 140명', color: 'bg-slate-400', majorGroup: '경영, 경제, 법학' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '바나나맛우유·메로나의 독보적 브랜드 파워와 MZ 타깃 캐릭터 마케팅 강자'
  },
  '삼양식품': {
    totalEmployees: '약 2,100명 (글로벌 불닭 수출 및 R&D)',
    operatorInfo: {
      roleName: '원주/밀양 스마트팩토리 라면 포장직',
      count: '약 850명',
      note: '현장 생산 가동직으로 대졸 공채 풀과 별도 선발됩니다.'
    },
    breakdown: [
      { role: '글로벌 수출 무역 및 해외 법인 영업', percent: 42, count: '약 530명', color: 'bg-indigo-600', majorGroup: '경영, 영문, 중문, 국제통상' },
      { role: '불닭 특제 소스 및 K-푸드 신제품 R&D', percent: 28, count: '약 350명', color: 'bg-emerald-600', majorGroup: '식품공학, 화학, 조리' },
      { role: '틱톡 챌린지 글로벌 디지털 마케팅', percent: 18, count: '약 230명', color: 'bg-amber-500', majorGroup: '광고홍보, 미디어, 어문' },
      { role: '경영지원', percent: 12, count: '약 140명', color: 'bg-slate-400', majorGroup: '경영, 회계, 법학' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '해외 수출 비중 75%의 글로벌 K-푸드 대표주자로 어문계열 및 해외영업 대거 채용'
  },
  '카카오페이': {
    totalEmployees: '약 1,150명 (100% 대졸 이상 전문 IT/핀테크 인력)',
    breakdown: [
      { role: '대용량 결제/금융 백엔드·앱 개발', percent: 58, count: '약 670명', color: 'bg-indigo-600', majorGroup: '컴공, 소프트웨어, 정보보안' },
      { role: '금융 상품(대출/증권/보험) PO/기획', percent: 24, count: '약 280명', color: 'bg-emerald-600', majorGroup: '경영, 경제, 산업공학' },
      { role: '데이터 사이언스 및 신용평가(CSS)', percent: 11, count: '약 130명', color: 'bg-amber-500', majorGroup: '통계, 수학, 컴퓨터' },
      { role: '경영지원 및 컴플라이언스', percent: 7, count: '약 70명', color: 'bg-slate-400', majorGroup: '법학, 경영, 경제' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '대표 핀테크 유니콘으로 소프트웨어 개발자 및 금융 서비스 기획자(PO) 상시 채용'
  },
  '키움증권': {
    totalEmployees: '약 1,020명 (온라인 리테일 주식 1위 증권사)',
    breakdown: [
      { role: '영웅문 HTS/MTS 핀테크 시스템 개발', percent: 46, count: '약 470명', color: 'bg-indigo-600', majorGroup: '컴공, 전산, 전자' },
      { role: '리테일 금융 마케팅 및 고객 자산관리', percent: 26, count: '약 270명', color: 'bg-emerald-600', majorGroup: '경영, 경제, 금융' },
      { role: '기업금융(IB) 인수주선 및 PF', percent: 16, count: '약 160명', color: 'bg-amber-500', majorGroup: '경영, 경제, 통계' },
      { role: '리서치센터 및 준법감시', percent: 12, count: '약 120명', color: 'bg-slate-400', majorGroup: '경제, 법학, 경영' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '국내 주식 점유율 연속 1위의 온라인 전문 증권사로 IT 개발과 IB 인재 우대'
  },
  '현대건설': {
    totalEmployees: '약 7,200명 (대졸 기술직 및 글로벌 EPC 엔지니어)',
    operatorInfo: {
      roleName: '국내외 건설 현장 기능·노무직',
      count: '약 15,000명 이상(상시 협력)',
      note: '현장 노무/시공 기능직으로 대졸 정규직 공채 풀과 별도 선발됩니다.'
    },
    breakdown: [
      { role: '플랜트·토목·건축 시공 및 현장 엔지니어', percent: 56, count: '약 4,030명', color: 'bg-indigo-600', majorGroup: '토목, 건축, 기계, 전기' },
      { role: '글로벌 EPC 프로젝트 수주 및 견적', percent: 22, count: '약 1,580명', color: 'bg-emerald-600', majorGroup: '건축, 기계, 토목, 경영' },
      { role: '설계(BIM) 및 구조 안전 기술 연구', percent: 12, count: '약 860명', color: 'bg-amber-500', majorGroup: '건축공학, 토목공학, 환경' },
      { role: '경영지원', percent: 10, count: '약 730명', color: 'bg-slate-400', majorGroup: '경영, 경제, 법학, 행정' }
    ],
    jobQuotaGrade: '대규모',
    jobQuotaText: '현대차그룹 대표 건설사로 사우디 등 대형 해외 플랜트 토목·건축·기계 엔지니어 대규모 공채'
  },
  'GS칼텍스': {
    totalEmployees: '약 3,300명 (정유·화학 엔지니어 및 원유 트레이딩)',
    operatorInfo: {
      roleName: '여수 공장 정유 플랜트 현장 운전원',
      count: '약 1,100명',
      note: '현장 가동 기능직으로 4년제 대졸 공채 풀과 별도 선발됩니다.'
    },
    breakdown: [
      { role: '정유·석유화학 공정기술 엔지니어', percent: 44, count: '약 970명', color: 'bg-indigo-600', majorGroup: '화학공학, 기계, 전기' },
      { role: '글로벌 원유 트레이딩 및 제품 영업', percent: 26, count: '약 570명', color: 'bg-emerald-600', majorGroup: '경영, 경제, 영문, 화학' },
      { role: '차세대 바이오 연료 및 수소 에너지 R&D', percent: 18, count: '약 400명', color: 'bg-amber-500', majorGroup: '화학, 화공, 신소재' },
      { role: '경영지원', percent: 12, count: '약 260명', color: 'bg-slate-400', majorGroup: '경영, 회계, 법학' }
    ],
    jobQuotaGrade: '소수정예',
    jobQuotaText: '국내 최고 수준의 대졸 초임 연봉과 복지를 자랑하는 정유·에너지 대표 기업'
  }
};

// 기본 표준 회사용 직군 분포 폴백
export function getCompanyHeadcount(companyName) {
  if (!companyName) return null;
  const cleanName = companyName.trim();

  if (COMPANY_HEADCOUNT_MAP[cleanName]) {
    return COMPANY_HEADCOUNT_MAP[cleanName];
  }

  // 이름 매칭
  for (const [key, data] of Object.entries(COMPANY_HEADCOUNT_MAP)) {
    if (cleanName.includes(key) || key.includes(cleanName)) {
      return data;
    }
  }

  // 일반 제조 대기업 표준 폴백 (4년제 대졸 공채 진출 직군 기준)
  return {
    totalEmployees: '약 8,000명 ~ 15,000명',
    operatorInfo: {
      roleName: '공장 현장 조립·생산 기능직',
      count: '약 4,000명 ~ 7,000명',
      note: '현장 생산/가동 기능직으로, 4년제 대졸 공채 풀과 별도로 선발됩니다.'
    },
    breakdown: [
      { role: '연구개발(R&D) 및 설계', percent: 55, count: '약 3,500명', color: 'bg-indigo-600', majorGroup: '이공계 전문 전공', roleType: 'rnd' },
      { role: '공정기술·생산기술 엔지니어', percent: 25, count: '약 1,600명', color: 'bg-emerald-600', majorGroup: '공학 전반(기계/전자/화공)', roleType: 'engineer' },
      { role: '국내외 영업 및 마케팅', percent: 12, count: '약 800명', color: 'bg-amber-500', majorGroup: '상경, 어문, 사회', roleType: 'biz' },
      { role: '경영지원(기획/재무/인사)', percent: 8, count: '약 500명', color: 'bg-slate-400', majorGroup: '경영, 경제, 행정', roleType: 'mgmt' }
    ],
    jobQuotaGrade: '안정적',
    jobQuotaText: '국내 주요 대기업 4년제 대졸 표준 채용 규모'
  };
}
