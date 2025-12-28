const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyDunLEeZLTO2nQ1mOtPevo1WAcO2ukkxwM');

async function listModels() {
  try {
    console.log('Fetching available models...\n');

    const models = await genAI.listModels();

    console.log('Available models:');
    for await (const model of models) {
      console.log(`- ${model.name}`);
      console.log(`  Display Name: ${model.displayName}`);
      console.log(`  Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
      console.log('');
    }
  } catch (error) {
    console.error('Error listing models:', error.message);
  }
}

listModels();
