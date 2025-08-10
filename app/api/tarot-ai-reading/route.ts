import { NextRequest, NextResponse } from 'next/server';

interface TarotCard {
  name: string;
  suit: string;
  meaning: string;
  reversed: boolean;
  keywords: string[];
  detailedMeaning: string;
  reversedMeaning: string;
}

interface BirthInfo {
  date: string;
  time: string;
  place: string;
}

interface SpreadInfo {
  name: string;
  description: string;
  positions: string[];
}

interface AIPromptData {
  birthInfo: BirthInfo;
  cards: TarotCard[];
  spread: SpreadInfo;
  question: string;
  aspect: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('🎴 Tarot AI API called');
    const data: AIPromptData = await request.json();
    console.log('📝 Request data received:', { 
      hasCards: !!data.cards, 
      cardsCount: data.cards?.length,
      hasQuestion: !!data.question,
      aiService: process.env.AI_SERVICE 
    });
    
    // Tạo prompt chi tiết cho AI
    const aiPrompt = createDetailedPrompt(data);
    console.log('🔮 AI prompt created, length:', aiPrompt.length);
    
    // Gọi API AI (ví dụ: OpenAI, Claude, hoặc AI khác)
    const aiResponse = await callAIService(aiPrompt);
    console.log('✅ AI response received, length:', aiResponse.length);
    
    return NextResponse.json({
      success: true,
      reading: aiResponse,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error in tarot AI reading:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to generate AI reading',
      reading: 'Có lỗi xảy ra khi tạo phân tích AI. Đang chuyển sang chế độ demo...\n\n' + generateMockAIReading('')
    }, { status: 500 });
  }
}

function createDetailedPrompt(data: AIPromptData): string {
  const { birthInfo, cards, spread, question, aspect } = data;
  
  let prompt = `Bạn là một chuyên gia Tarot có kinh nghiệm 20 năm, đặc biệt giỏi về chiêm tinh học và phân tích tâm lý sâu sắc.

THÔNG TIN NGƯỜI XEM:
- Ngày sinh: ${birthInfo.date}
- Giờ sinh: ${birthInfo.time || 'Không cung cấp'}
- Nơi sinh: ${birthInfo.place || 'Không cung cấp'}

LOẠI XEM TAROT: ${spread.name}
MÔ TẢ: ${spread.description}
${question && question.trim() ? `CÂU HỎI CỤ THỂ: "${question}"` : 'CÂU HỎI CỤ THỂ: Không có câu hỏi cụ thể - hãy đưa ra lời khuyên tổng quát'}
KHÍA CẠNH QUAN TÂM: ${aspect}

CÁC LÁ BÀI ĐÃ BỐC:`;

  cards.forEach((card, index) => {
    const position = spread.positions[index] || `Vị trí ${index + 1}`;
    prompt += `\n${index + 1}. ${position}: ${card.name} (${card.suit})${card.reversed ? ' - Lật ngược' : ''}
   - Ý nghĩa: ${card.meaning}
   - Keywords: ${card.keywords.join(', ')}
   - Chi tiết: ${card.reversed ? card.reversedMeaning : card.detailedMeaning}`;
  });

  prompt += `\n\nYÊU CẦU PHÂN TÍCH:

${question && question.trim() ? 
`⭐ TẬP TRUNG TRỰC TIẾP VÀO CÂU HỎI: "${question}"
- Phân tích các lá bài CHÍNH XÁC liên quan đến câu hỏi này
- Đưa ra lời khuyên CỤ THỂ để giải quyết thắc mắc
- Dự đoán kết quả và hướng phát triển cho tình huống được hỏi

` : ''}1. PHÂN TÍCH CHIÊM TINH:
- Dựa vào ngày sinh, phân tích cung hoàng đạo và ảnh hưởng của nó
- Kết hợp với năng lượng các lá bài để đưa ra insight sâu sắc${question && question.trim() ? ' liên quan đến câu hỏi' : ''}

2. PHÂN TÍCH CÁC LÁ BÀI:
- Giải thích ý nghĩa từng lá trong ngữ cảnh cụ thể của người hỏi${question && question.trim() ? ' và câu hỏi đã đặt' : ''}
- Phân tích mối liên hệ giữa các lá bài
- Chú ý đặc biệt đến Major Arcana (ẩn chính) và Minor Arcana (ẩn phụ)

3. TỔNG HỢP VÀ LỜI KHUYÊN:
- Đưa ra phân tích tổng thể dựa trên tất cả thông tin${question && question.trim() ? ' với câu hỏi làm trọng tâm' : ''}
- Lời khuyên cụ thể cho giai đoạn hiện tại${question && question.trim() ? ' và cách giải quyết thắc mắc' : ''}
- Dự báo xu hướng và cơ hội trong tương lai gần

4. YÊU CẦU ĐỊNH DẠNG:
- Sử dụng markdown formatting (**, ###, etc.)
- Chia thành các phần rõ ràng với tiêu đề
- Ngôn ngữ tiếng Việt, phong cách ấm áp và dễ hiểu
- Độ dài khoảng 800-1200 từ

${question && question.trim() ? 
`🎯 LƯU Ý QUAN TRỌNG: Hãy đảm bảo mọi phân tích đều hướng về việc trả lời câu hỏi "${question}" một cách chi tiết và thực tế.` : 
'Hãy tạo một bài đọc tarot sâu sắc, cá nhân hóa và có ý nghĩa thực tiễn.'}`;

  return prompt;
}

async function callAIService(prompt: string): Promise<string> {
  const aiService = process.env.AI_SERVICE || 'demo';
  
  try {
    switch (aiService) {
      case 'openai':
        return await callOpenAI(prompt);
      case 'google':
        return await callGoogleAI(prompt);
      case 'anthropic':
        return await callAnthropicAI(prompt);
      case 'ollama':
        return await callOllamaAI(prompt);
      case 'demo':
      default:
        return generateMockAIReading(prompt);
    }
  } catch (error) {
    console.error('AI service error:', error);
    return generateMockAIReading(prompt);
  }
}

async function callOpenAI(prompt: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not found');
  }

  console.log('🤖 Calling OpenAI API...');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // Thay đổi từ gpt-4 thành gpt-3.5-turbo
      messages: [
        {
          role: 'system',
          content: 'Bạn là một chuyên gia Tarot và chiêm tinh học có kinh nghiệm sâu sắc, có khả năng phân tích tâm lý và đưa ra lời khuyên thực tế.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    })
  });

  console.log('📞 OpenAI response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ OpenAI API error:', response.status, errorText);
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    console.error('OpenAI API response:', errorText);
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGoogleAI(prompt: string): Promise<string> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('Google API key not found');
  }

  console.log('🤖 Calling Google Gemini API...');
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Bạn là một chuyên gia Tarot và chiêm tinh học có kinh nghiệm sâu sắc.\n\n${prompt}`
        }]
      }],
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7
      }
    })
  });

  console.log('📞 Google Gemini response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Google AI API error:', response.status, errorText);
    throw new Error(`Google AI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    console.error('Invalid Google AI response structure:', data);
    throw new Error('Invalid response from Google AI');
  }
  
  return data.candidates[0].content.parts[0].text;
}

async function callAnthropicAI(prompt: string): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('Anthropic API key not found');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `Bạn là một chuyên gia Tarot và chiêm tinh học có kinh nghiệm sâu sắc.\n\n${prompt}`
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

async function callOllamaAI(prompt: string): Promise<string> {
  const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  
  const response = await fetch(`${baseUrl}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama2', // hoặc model khác bạn đã cài
      prompt: `Bạn là một chuyên gia Tarot và chiêm tinh học có kinh nghiệm sâu sắc.\n\n${prompt}`,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

function generateMockAIReading(prompt: string): string {
  // Trích xuất câu hỏi từ prompt để phản ánh trong phân tích
  const questionMatch = prompt.match(/CÂU HỎI CỤ THỂ: "([^"]+)"/);
  const userQuestion = questionMatch ? questionMatch[1] : null;
  
  // AI mô phỏng cho demo với phản ánh câu hỏi
  let reading = `## 🌟 Phân Tích Tarot Cá Nhân Hóa

${userQuestion ? `### � Trả Lời Câu Hỏi: "${userQuestion}"
Các lá bài đã bốc mang đến thông điệp rõ ràng về thắc mắc này. Dựa vào năng lượng của các lá bài và thông tin chiêm tinh, vũ trụ đang gửi đến bạn những gợi ý quý báu để giải quyết tình huống này.

` : ''}### �🎭 Phân Tích Chiêm Tinh
Dựa vào thông tin ngày sinh của bạn, năng lượng chiêm tinh hiện tại đang hỗ trợ mạnh mẽ cho những thay đổi tích cực trong cuộc sống${userQuestion ? ' liên quan đến câu hỏi bạn đặt ra' : ''}. Sự kết hợp giữa vị trí các hành tinh và các lá bài bạn đã bốc cho thấy một giai đoạn chuyển đổi quan trọng đang diễn ra.

### 🃏 Ý Nghĩa Các Lá Bài

**Phân tích sâu về từng lá bài trong ngữ cảnh cá nhân:**
- Các lá Major Arcana (ẩn chính) trong spread này cho thấy những bài học tâm linh quan trọng${userQuestion ? ' liên quan đến thắc mắc của bạn' : ''}
- Minor Arcana (ẩn phụ) phản ánh những tình huống thực tế bạn có thể kiểm soát${userQuestion ? ' để giải quyết vấn đề' : ''}

${userQuestion ? `### 💡 Lời Khuyên Cụ Thể Cho Câu Hỏi
**Dựa vào các lá bài đã bốc:**
- **Hành động ngay:** Tin tưởng vào trực giác và thực hiện những bước đi cần thiết
- **Cần tránh:** Đừng để sự hoài nghi cản trở những quyết định đúng đắn  
- **Kết quả dự kiến:** Với sự kiên nhẫn và nỗ lực phù hợp, tình huống sẽ có hướng phát triển tích cực

` : ''}### 💫 Tổng Hợp & Hướng Dẫn

**Thông điệp chính từ vũ trụ:**
Giai đoạn hiện tại của bạn đang mang đến những cơ hội tuyệt vời để phát triển bản thân và đạt được những mục tiêu quan trọng${userQuestion ? ', đặc biệt liên quan đến thắc mắc bạn đã đặt ra' : ''}. Hãy tin tưởng vào trực giác và không ngại thử thách bản thân.

**Lời khuyên cụ thể:**
1. **Ngắn hạn (1-3 tháng):** Tập trung vào việc hoàn thiện các kế hoạch đã bắt đầu${userQuestion ? ' và giải quyết thắc mắc hiện tại' : ''}
2. **Trung hạn (3-6 tháng):** Thời điểm thuận lợi cho những quyết định quan trọng
3. **Dài hạn (6-12 tháng):** Chuẩn bị cho một chu kỳ mới với nhiều thành tựu

### 🎯 Lời Nhắn Đặc Biệt
${userQuestion ? 
`Về câu hỏi "${userQuestion}" - vũ trụ khuyến khích bạn hãy mở lòng và tin tưởng vào quá trình. Mọi thứ đang diễn ra đúng như dự định, và bạn có đủ sức mạnh để vượt qua mọi thử thách.` :
'Vũ trụ đang gửi đến bạn một thông điệp rõ ràng: đây là thời điểm để bạn bước ra khỏi vùng an toàn và theo đuổi những ước mơ lớn lao. Hãy tin tưởng vào năng lực của mình!'}

*Lưu ý: Đây là phân tích mô phỏng. Để có kết quả AI chính xác, cần cấu hình API key cho OpenAI hoặc AI service khác.*`;

  return reading;
}
