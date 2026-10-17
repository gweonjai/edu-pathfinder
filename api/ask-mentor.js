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
    const { question, majorInfo, studentProfile, chatHistory = [] } = req.body || {};

    if (!question || !question.trim()) {
      return res.status(400).json({ error: '질문 내용(question)이 필요합니다.' });
    }

    const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const systemInstruction = `
당신은 대한민국 진로·진학 전문 AI 수석 멘토입니다.
현재 대화 중인 학생의 진단 성향과 상담 대상 학과 정보는 다음과 같습니다:

[상담 대상 학과 정보]
- 학과명: ${majorInfo?.name || '진로 학과'} (계열: ${majorInfo?.category || '일반'}, 트랙: ${majorInfo?.track || '융합'})
- 주요 진로 및 키워드: ${(majorInfo?.keywords || []).join(', ')} / ${(majorInfo?.careers || []).join(', ')}
- 권장 고교 과목: 일반선택(${(majorInfo?.highSchoolSubjects?.general || []).join(', ')}), 진로선택(${(majorInfo?.highSchoolSubjects?.career || []).join(', ')})

[학생 정보]
- 성향: ${studentProfile?.tendencyLabel || '성향 진단 완료'}
- 학교급: ${studentProfile?.mode || '고등학생'}

[응답 가이드라인]
1. 학생의 질문에 대해 친절하면서도 객관적인 팩트와 입시 전문가의 현실적인 인사이트를 담아 명쾌하게 답변하세요.
2. 2022 개정 교육과정 및 고교학점제, 최신 대입(2028 개편안) 상황에 맞추어 실천 가능한 조언을 제공하세요.
3. 너무 장황하지 않게 핵심을 두괄식으로 정리하고, 글머리 기호(마크다운)를 적절히 활용해 읽기 쉽게 500자 내외로 답변하세요.
`;

    // 이전 대화 내역이 있다면 결합
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\n질문: ${question}` }]
      }
    ];

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini Mentor API Error:', errText);
      return res.status(502).json({
        error: 'Gemini API call failed',
        details: errText
      });
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const answer = parts.find((p) => p.text && !p.thought)?.text || parts.find((p) => p.text)?.text || '답변을 생성하지 못했습니다.';

    return res.status(200).json({
      answer,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Mentor API Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
}
