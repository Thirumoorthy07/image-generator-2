// Test script to verify Gemini API connectivity
import { generateImage } from './src/services/gemini.js';

async function testImageGeneration() {
  console.log('🧪 Testing Gemini API image generation...\n');

  const testPrompts = [
    {
      prompt: 'a image of lord shiva in god mode red color theme, wallpaper, 4k, hyper detailed',
      aspectRatio: '16:9'
    },
    {
      prompt: 'a peaceful mountain landscape with flowing river',
      aspectRatio: '1:1'
    }
  ];

  for (const test of testPrompts) {
    console.log(`Testing prompt: "${test.prompt}"`);
    console.log(`Aspect ratio: ${test.aspectRatio}`);
    
    try {
      const result = await generateImage(test);
      
      if (result.imageUrl.startsWith('data:image/svg+xml')) {
        console.log('✅ Generated placeholder image (API might not be available)');
        console.log(`📝 Response: ${result.prompt}\n`);
      } else if (result.imageUrl.startsWith('data:image/jpeg') || result.imageUrl.startsWith('data:image/png')) {
        console.log('🎉 Successfully generated real AI image!');
        console.log(`📝 Response: ${result.prompt}\n`);
      } else {
        console.log(`📋 Result: ${result.prompt}\n`);
      }
    } catch (error) {
      console.error(`❌ Test failed: ${error.message}\n`);
    }
  }
  
  console.log('🏁 Test completed!');
  console.log('\n💡 To run the full application:');
  console.log('   npm run dev');
  console.log('   Then open http://localhost:5173\n');
}

// Run test if this file is executed directly
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
  testImageGeneration().catch(console.error);
}

export { testImageGeneration };
