import { createOpencodeClient } from './node_modules/@opencode-ai/sdk/dist/client.js';

async function test() {
  try {
    const client = createOpencodeClient({
      baseUrl: 'http://localhost:8080', // Default opencode server
      apiKey: process.env.OPENCODE_API_KEY // Might not be needed for local
    });
    
    // Try to list models or run a simple completion
    console.log('Testing opencode client...');
    
    // This would normally connect to a running opencode server
    // Since we don't have one running, let's just test if we can instantiate
    
  } catch (error) {
    console.error('Error:', error);
  }
}

test();