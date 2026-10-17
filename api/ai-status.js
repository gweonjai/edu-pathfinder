export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const isAvailable = Boolean(apiKey && apiKey.trim().length > 0);

  return res.status(200).json({
    enabled: isAvailable,
    model: isAvailable ? (process.env.GEMINI_MODEL || 'gemini-2.0-flash') : null,
    message: isAvailable ? 'AI 멘토 서비스가 준비되었습니다.' : 'GEMINI_API_KEY 환경변수가 설정되지 않아 정적 안내 모드로 동작합니다.'
  });
}
