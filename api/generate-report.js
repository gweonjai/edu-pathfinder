export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured',
      message: '서버에 AI API 키가 설정되지 않았습니다.'
    });
  }

  try {
    const { studentProfile, majorInfo } = req.body || {};

    if (!majorInfo || !majorInfo.name) {
      return res.status(400).json({ error: '학과 정보(majorInfo)가 필요합니다.' });
    }

    const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const prompt = `
당신은 대한민국 최고의 대입·진로 전문 수석 입시 컨설턴트입니다.
2022 개정 교육과정(고교학점제) 및 2028 대입 개편안의 핵심 메커니즘을 완벽히 꿰뚫고 있습니다.

아래 [학생 진단 데이터]와 [분석 대상 학과 팩트 데이터]를 철저히 교차 분석하여, 학생과 학부모가 읽었을 때 눈이 번쩍 뜨일 만큼 실질적이고 구체적인 '맞춤형 심층 입시 총평 리포트'를 작성해 주세요.

---
### [학생 진단 데이터]
- 대상 프로필/호칭: ${studentProfile?.target || '학생'}
- 학교급 모드: ${studentProfile?.mode || '고등학생'}
- 1단계 생각 스타일(성향 판별): ${studentProfile?.tendencyType || '융합'} (${studentProfile?.tendencyLabel || '문·이과 융합형'})
- 세부 응답 통계: 이과 선택 ${studentProfile?.mathCount || 0}개, 문과 선택 ${studentProfile?.liberalCount || 0}개, 융합 선택 ${studentProfile?.fusionCount || 0}개
- 관심 표시 학과들: ${(studentProfile?.bookmarkedMajors || []).join(', ') || '없음'}
- 보류한 학과들: ${(studentProfile?.pendingMajors || []).join(', ') || '없음'}
- 소거(제외)한 학과 수: ${studentProfile?.excludedCount || 0}개

### [분석 대상 학과 팩트 데이터]
- 학과명: ${majorInfo.name} (계열: ${majorInfo.category}, 트랙: ${majorInfo.track})
- 핵심 키워드: ${(majorInfo.keywords || []).join(', ')}
- 주요 개설 대학: ${(majorInfo.colleges || []).slice(0, 7).join(', ')}
- 추천 고교 이수 과목: 일반선택(${(majorInfo.highSchoolSubjects?.general || []).join(', ')}), 진로선택(${(majorInfo.highSchoolSubjects?.career || []).join(', ')})
- 졸업 후 주요 진로: ${(majorInfo.careers || []).join(', ')}
- 첫 직장 및 연봉 전망: 평균 약 ${majorInfo.salaryInfo?.avgSalary || '4,000만원대'} (${majorInfo.salaryInfo?.topCompany || '주요 공기업/대기업'})
---

### [작성 지침 및 형식]
1. 톤앤매너: 전문적이며 따뜻하면서도 날카로운 입시 전문가의 어조 (해요체, 마크다운 형식 활용).
2. 필수 포함 섹션:
   - **🎯 성향-전공 적합성 날카로운 분석**: 학생의 성향(${studentProfile?.tendencyType})과 ${majorInfo.name}의 학문적 특성이 어떻게 맞닿아 있는지, 장점과 주의해야 할 점.
   - **📚 고교학점제 과목 선택 및 학종(학생부) 핵심 전략**: 고교 시절 꼭 챙겨야 할 핵심 과목과 탐구 보고서/세특 주제 추천 아이디어 1~2개.
   - **🚀 미래 진로 확장성과 컨설턴트의 최종 조언**: 취업 시장 및 산업 변화 속에서 이 학과를 선택했을 때 학생이 갖게 될 차별화된 무기.
3. 주의사항:
   - 거짓 정보나 추측을 지양하고, 2022 개정 교육과정의 과목 체계(공통/일반선택/진로선택/융합선택)에 부합하게 작성하십시오.
   - 분량은 읽기 편하도록 핵심 위주 3~4개의 간결한 단락(공백 포함 700~1,000자 내외)으로 작성하십시오.
`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2500
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      return res.status(502).json({
        error: 'Gemini API call failed',
        details: errText
      });
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const generatedText = parts.find((p) => p.text && !p.thought)?.text || parts.find((p) => p.text)?.text || '리포트를 생성하지 못했습니다.';

    return res.status(200).json({
      report: generatedText,
      model: modelName,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Report Generation Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
}
