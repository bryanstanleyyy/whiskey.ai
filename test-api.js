const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = 'AIzaSyCHF752k13-S9KkBMe0OQxrVy2zOsnjGZQ';
const genAI = new GoogleGenerativeAI(API_KEY);

async function testAPI() {
  console.log('Testing Gemini API key...\n');

  // Try different model names
  const modelsToTry = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-2.0-flash-exp'
  ];

  for (const modelName of modelsToTry) {
    try {
      console.log(`Trying model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const result = await model.generateContent('Say hello in 3 words');
      const response = await result.response;
      const text = response.text();

      console.log(`✅ SUCCESS with ${modelName}`);
      console.log(`Response: ${text}\n`);
      break; // Stop after first success
    } catch (error) {
      console.log(`❌ Failed: ${error.message}\n`);
    }
  }
}

testAPI();
