import OpenAI from 'openai';

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // 클라이언트 사이드 렌더링을 위한 설정 (실제 프로덕션에서는 서버사이드로 처리 권장)
});

export default openai;
