// Test API key OpenAI
async function testOpenAIKey() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.log('❌ No API key found');
    return false;
  }
  
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API key valid, available models:', data.data?.length || 0);
      console.log('Available models:', data.data?.slice(0, 5).map(m => m.id) || []);
      return true;
    } else {
      console.log('❌ API key invalid:', response.status, await response.text());
      return false;
    }
  } catch (error) {
    console.log('❌ Error testing API key:', error);
    return false;
  }
}

// Chạy test
testOpenAIKey();
