import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: '메시지가 필요합니다' }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 카테고리 정보를 포함한 프롬프트 설정
    const prompt = `
    당신은 에어비앤비 음성 어시스턴트입니다. 사용자의 음성 명령을 처리하여 적절한 카테고리로 안내해야 합니다.
    
    다음은 사용 가능한 카테고리입니다:
    - 인기 급상승: 홈페이지
    - 한옥: 전통 한옥 숙소
    - 해변 근처: 해변 근처 숙소
    - 최고의 전망: 전망이 좋은 숙소
    - 캠핑: 캠핑 숙소
    - 돔하우스: 돔하우스 숙소
    
    사용자 메시지를 분석하고 다음 JSON 형식으로 응답해주세요:
    {
      "action": "navigate" 또는 "respond",
      "category": 이동할 카테고리 이름(action이 navigate인 경우만),
      "message": 사용자에게 보여줄 메시지
    }
    
    사용자 메시지: ${message}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 150,
    });

    const content = response.choices[0].message.content;
    let parsedResponse;

    try {
      parsedResponse = JSON.parse(content || '{}');
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
      parsedResponse = {
        action: 'respond',
        message: '명령을 처리하는 중 오류가 발생했습니다.',
      };
    }

    return NextResponse.json({
      result: parsedResponse,
    });
  } catch (error) {
    console.error('OpenAI API 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
