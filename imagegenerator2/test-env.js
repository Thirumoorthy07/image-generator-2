#!/usr/bin/env node

// Simple test script to verify the development environment
import fs from 'fs';
import path from 'path';

console.log('🔧 Checking development environment...');

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ package.json not found. Make sure you\'re in the project directory.');
  process.exit(1);
}

console.log('✅ Found package.json');

// Check if .env exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found. Please create it from .env.example');
  process.exit(1);
}

console.log('✅ Found .env file');

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.error('❌ node_modules not found. Run "npm install" first.');
  process.exit(1);
}

console.log('✅ Found node_modules');

// Check for TypeScript files
const srcPath = path.join(process.cwd(), 'src');
if (!fs.existsSync(srcPath)) {
  console.error('❌ src directory not found.');
  process.exit(1);
}

console.log('✅ Found src directory');

console.log('\n🚀 Environment check complete! You can now run:');
console.log('   npm run dev         - Start development server');
console.log('   npm run build       - Build for production');
console.log('   npm run preview     - Preview production build');

console.log('\n📝 To test the image generation:');
console.log('1. Start the dev server: npm run dev');
console.log('2. Open http://localhost:5173');
console.log('3. Navigate to the "Generate" page');
console.log('4. Enter a prompt like "A magical forest with glowing mushrooms"');
console.log('5. The app will attempt to use Gemini API or show a demo placeholder');
