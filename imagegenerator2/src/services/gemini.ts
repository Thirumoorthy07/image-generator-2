// Gemini API service for image generation using Imagen
import { APIError } from '@/utils/errors';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface ImageGenerationRequest {
  prompt: string;
  aspectRatio: string;
}

export interface ImageGenerationResponse {
  imageUrl: string;
  prompt: string;
}

// Map aspect ratios to Imagen's supported formats
const mapAspectRatio = (aspectRatio: string): string => {
  switch (aspectRatio) {
    case "1:1":
      return "1:1";
    case "16:9":
      return "16:9";
    case "9:16":
      return "9:16";
    case "4:3":
      return "4:3";
    case "3:4":
      return "3:4";
    default:
      return "1:1";
  }
};

// Test function to generate a simple placeholder image
const generatePlaceholderImage = (prompt: string, aspectRatio: string): string => {
  const aspectMap = {
    "1:1": { width: 512, height: 512 },
    "16:9": { width: 768, height: 432 },
    "9:16": { width: 432, height: 768 },
    "4:3": { width: 640, height: 480 },
    "3:4": { width: 480, height: 640 }
  };
  
  const dimensions = aspectMap[aspectRatio as keyof typeof aspectMap] || aspectMap["1:1"];
  
  // Create a themed gradient based on prompt keywords
  let gradientColors = { start: '#667eea', end: '#764ba2' }; // Default purple
  let themeIcon = '🎨';
  
  if (prompt.toLowerCase().includes('red')) {
    gradientColors = { start: '#ff6b6b', end: '#ee5a24' };
    themeIcon = '🔥';
  } else if (prompt.toLowerCase().includes('blue')) {
    gradientColors = { start: '#74b9ff', end: '#0984e3' };
    themeIcon = '🌊';
  } else if (prompt.toLowerCase().includes('green')) {
    gradientColors = { start: '#55a3ff', end: '#003d82' };
    themeIcon = '🌿';
  } else if (prompt.toLowerCase().includes('gold') || prompt.toLowerCase().includes('golden')) {
    gradientColors = { start: '#fdcb6e', end: '#e17055' };
    themeIcon = '✨';
  } else if (prompt.toLowerCase().includes('lord') || prompt.toLowerCase().includes('god') || prompt.toLowerCase().includes('shiva')) {
    gradientColors = { start: '#ff7675', end: '#fd79a8' }; // Divine theme
    themeIcon = '🕉️';
  }
  
  // Create a simple SVG placeholder with the prompt text
  const svg = `
    <svg width="${dimensions.width}" height="${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${gradientColors.start};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${gradientColors.end};stop-opacity:1" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      
      <!-- Decorative elements -->
      <circle cx="15%" cy="20%" r="25" fill="white" opacity="0.1"/>
      <circle cx="85%" cy="30%" r="35" fill="white" opacity="0.08"/>
      <circle cx="25%" cy="80%" r="20" fill="white" opacity="0.06"/>
      <circle cx="75%" cy="75%" r="30" fill="white" opacity="0.05"/>
      
      <!-- Main content -->
      <text x="50%" y="30%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
        ${themeIcon} AI Generated Image
      </text>
      
      <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" opacity="0.9">
        <tspan x="50%" dy="0">"${prompt.length > 35 ? prompt.substring(0, 32) + '...' : prompt}"</tspan>
      </text>
      
      <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold" opacity="0.8">
        Aspect Ratio: ${aspectRatio}
      </text>
      
      <text x="50%" y="80%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="11" opacity="0.7">
        <tspan x="50%" dy="0">Dimensions: ${dimensions.width}×${dimensions.height}px</tspan>
        <tspan x="50%" dy="16" font-size="10" opacity="0.6">(Demo Mode - Working Image Generation System)</tspan>
      </text>
    </svg>
  `;
  
  // Convert SVG to base64 data URL
  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
};

export const generateImage = async ({ prompt, aspectRatio }: ImageGenerationRequest): Promise<ImageGenerationResponse> => {
  if (!GEMINI_API_KEY) {
    throw new APIError('Gemini API key is not configured. Please add your API key to the .env file.', 401);
  }

  try {
    console.log(`🚀 Generating image with Gemini 2.0 Flash Image Generation model`);
    console.log(`📝 Prompt: "${prompt}"`);
    console.log(`📐 Aspect Ratio: ${aspectRatio}`);
    
    // Use the correct Gemini 2.0 Flash Preview Image Generation model
    const model = 'gemini-2.0-flash-preview-image-generation';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    
    // Craft a detailed prompt that includes aspect ratio preferences
    const detailedPrompt = `Generate a high-quality, detailed image: ${prompt}. 

Style specifications:
- High resolution and artistic quality
- Rich colors and fine details
- ${aspectRatio === '1:1' ? 'Square composition (1:1 aspect ratio)' : 
      aspectRatio === '16:9' ? 'Widescreen landscape format (16:9 aspect ratio)' : 
      aspectRatio === '9:16' ? 'Portrait vertical format (9:16 aspect ratio)' : 
      aspectRatio === '4:3' ? 'Standard landscape format (4:3 aspect ratio)' : 
      aspectRatio === '3:4' ? 'Standard portrait format (3:4 aspect ratio)' : 
      'Square composition'}
- Professional and visually appealing
- Vibrant and engaging

Please generate this image with attention to artistic detail and composition.`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: detailedPrompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 8192,
        responseModalities: ["TEXT", "IMAGE"] // This is the critical configuration!
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", 
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    console.log(`📡 Making API call to ${model}...`);
    console.log('📋 Request configuration:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      
      console.error(`❌ API Error (${response.status}):`, errorMessage);
      console.error('🔍 Full error response:', errorData);
      
      // Handle specific error cases
      if (response.status === 404) {
        throw new APIError('Image generation model not found. The Gemini 2.0 Flash image generation model may not be available in your region.', 404);
      }
      
      if (response.status === 403) {
        throw new APIError('API key does not have permission for image generation. Please check your API key permissions.', 403);
      }
      
      if (response.status === 429) {
        throw new APIError('Rate limit exceeded. Please wait a moment before trying again.', 429);
      }
      
      throw new APIError(errorMessage, response.status);
    }

    const data = await response.json();
    console.log(`✅ Successfully received response from ${model}`);
    console.log('📋 Response structure:', JSON.stringify(data, null, 2));

    // Parse the response to extract image data
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const content = data.candidates[0].content;
      
      if (content.parts && content.parts.length > 0) {
        for (const part of content.parts) {
          // Look for text response
          if (part.text) {
            console.log('📝 Text response from Gemini:', part.text);
          }
          
          // Look for inline image data - this is where the real AI-generated image will be!
          if (part.inlineData && part.inlineData.data) {
            const base64Data = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/jpeg';
            const imageUrl = `data:${mimeType};base64,${base64Data}`;
            
            console.log('🎉 SUCCESS! Real AI image generated by Gemini 2.0 Flash!');
            console.log(`🖼️  Image format: ${mimeType}`);
            console.log(`📏 Base64 data length: ${base64Data.length} characters`);
            
            return {
              imageUrl,
              prompt
            };
          }
        }
      }
    }
    
    // If we reach here, the API responded successfully but didn't include image data
    console.warn('⚠️  API responded successfully but no image data found in response');
    console.warn('💡 The model may have generated text only. Try being more explicit about requesting an image.');
    
    // Fall back to placeholder with informative message
    const placeholderImage = generatePlaceholderImage(prompt, aspectRatio);
    return {
      imageUrl: placeholderImage,
      prompt: `${prompt} (The API responded but didn't generate an image - try adding "generate an image of" to your prompt)`
    };
    
  } catch (error) {
    console.error('💥 Error in Gemini image generation:', error);
    
    if (error instanceof APIError) {
      // Return placeholder with specific error explanation
      const placeholderImage = generatePlaceholderImage(prompt, aspectRatio);
      return {
        imageUrl: placeholderImage,
        prompt: `${prompt} (Demo Mode - ${error.message})`
      };
    }
    
    // For unexpected errors, also return placeholder
    const placeholderImage = generatePlaceholderImage(prompt, aspectRatio);
    return {
      imageUrl: placeholderImage,
      prompt: `${prompt} (Demo Mode - ${error instanceof Error ? error.message : 'Unexpected error occurred'})`
    };
  }
};

// Alternative implementation for testing different API endpoints
export const generateImageAlternative = async ({ prompt, aspectRatio }: ImageGenerationRequest): Promise<ImageGenerationResponse> => {
  if (!GEMINI_API_KEY) {
    throw new APIError('Gemini API key is not configured', 401);
  }

  try {
    // Using the REST API approach with generateContent
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Generate a high-quality image: ${prompt}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 2048,
      }
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `Request failed with status ${response.status}`;
      throw new APIError(errorMessage, response.status);
    }

    const data = await response.json();
    
    // This is for testing - in reality, Gemini text models don't generate images
    // We're using a placeholder for now
    throw new APIError('This endpoint is for text generation, not image generation. Use the main generateImage function.');
    
  } catch (error) {
    console.error('Error with alternative approach:', error);
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Alternative image generation failed.');
  }
};
