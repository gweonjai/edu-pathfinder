/**
 * AI 서비스 연동 유틸리티 (Vercel Serverless Function & 정적 배포 Graceful Fallback)
 */

// AI 지원 여부 캐시
let cachedAiStatus = null;

/**
 * 현재 구동 환경에서 AI 서비스 사용 가능 여부를 판별
 */
export async function checkAiStatus(forceRefresh = false) {
  if (!forceRefresh && cachedAiStatus !== null) {
    return cachedAiStatus;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch('/api/ai-status', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      cachedAiStatus = {
        available: Boolean(data.enabled),
        model: data.model || 'gemini-2.0-flash',
        message: data.message
      };
    } else {
      cachedAiStatus = {
        available: false,
        message: '오프라인 또는 단일 HTML 배포 환경입니다. (정적 룰베이스 모드 동작)'
      };
    }
  } catch (e) {
    // 단일 HTML 로컬 파일 열기나 정적 호스팅에서는 /api/ai-status 요청이 실패하므로 자연스럽게 폴백
    cachedAiStatus = {
      available: false,
      message: '정적 데모 배포 환경입니다. (정적 룰베이스 모드 동작)'
    };
  }

  return cachedAiStatus;
}

/**
 * AI 맞춤형 심층 입시 총평 생성 요청
 */
export async function fetchAiDeepReport(studentProfile, majorInfo) {
  try {
    const res = await fetch('/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        studentProfile,
        majorInfo
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || 'AI 리포트 생성에 실패했습니다.');
    }

    const data = await res.json();
    return {
      success: true,
      report: data.report,
      model: data.model
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

/**
 * AI 학과 멘토 1:1 Q&A 요청
 */
export async function fetchAiMentorAnswer(question, majorInfo, studentProfile) {
  try {
    const res = await fetch('/api/ask-mentor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question,
        majorInfo,
        studentProfile
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || '답변 생성에 실패했습니다.');
    }

    const data = await res.json();
    return {
      success: true,
      answer: data.answer
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}
