import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import aiStatusHandler from './api/ai-status.js'
import generateReportHandler from './api/generate-report.js'
import askMentorHandler from './api/ask-mentor.js'

// 로컬 npm run dev 환경에서 Vercel 서버리스 함수(/api)를 그대로 구동하기 위한 개발용 미들웨어 플러그인
function localVercelApiPlugin() {
  return {
    name: 'local-vercel-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || '';
        if (!url.startsWith('/api/')) return next();

        // Express/Vercel 호환 헬퍼 메서드 주입
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        // POST 요청 바디 버퍼링 및 파싱
        if (req.method === 'POST') {
          let rawBody = '';
          req.on('data', (chunk) => { rawBody += chunk; });
          await new Promise((resolve) => req.on('end', resolve));
          try {
            req.body = JSON.parse(rawBody);
          } catch {
            req.body = {};
          }
        }

        try {
          if (url === '/api/ai-status') {
            await aiStatusHandler(req, res);
            return;
          } else if (url === '/api/generate-report') {
            await generateReportHandler(req, res);
            return;
          } else if (url === '/api/ask-mentor') {
            await askMentorHandler(req, res);
            return;
          }
        } catch (apiErr) {
          console.error('[Local API Error]', url, apiErr);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Internal API Error', details: apiErr.message });
          }
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  // .env.local 및 .env 로드하여 process.env에 동기화
  const env = loadEnv(mode, process.cwd(), '');
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  process.env.GEMINI_MODEL = env.GEMINI_MODEL || process.env.GEMINI_MODEL || 'gemini-2.0-flash';

  return {
    plugins: [react(), localVercelApiPlugin()],
    server: {
      port: 3030,
      open: true
    }
  };
});


