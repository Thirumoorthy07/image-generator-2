# AI Image Generator

A modern React application for generating images using Google's Gemini AI API.

## Features

- Generate high-quality images from text prompts
- Multiple aspect ratio options (Square, Landscape, Portrait, etc.)
- Real-time chat interface with generated images
- Download and share generated images
- Image generation history
- Responsive design with Tailwind CSS and shadcn/ui components

## Setup Instructions

### 1. Clone and Install

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i
```

### 2. Configure Gemini API Key

1. Copy the example environment file:
```sh
cp .env.example .env
```

2. Open `.env` file and replace `your_api_key_here` with your actual Gemini API key:
```
VITE_GEMINI_API_KEY=AIzaSyAxOWI7-BnhhmMH7kcFLEZ5_u4aSaB8j5Q
```

**Note**: The API key is already configured in the project. The application will attempt to use the Gemini Imagen API for real image generation. If the API endpoints are not available, it will gracefully fall back to demo placeholder images.

### Current Status

� **Updated Implementation Status**: 

The application now uses the **Gemini 2.0 Flash Preview Image Generation** model (`gemini-2.0-flash-preview-image-generation`) which is specifically designed for image generation.

**What's been improved:**
- ✅ **Correct API Model**: Now using `gemini-2.0-flash-preview-image-generation`
- ✅ **Better Error Handling**: Graceful fallbacks with informative messages
- ✅ **Enhanced Placeholders**: Themed placeholder images based on your prompt
- ✅ **Detailed Logging**: Console logs show exactly what's happening
- ✅ **Smart Theming**: Red theme for your Lord Shiva prompt, adaptive colors

**Expected Behavior for your prompt:**
```
"a image of lord shiva in god mode red color theme ,wallpaper ,4k ,hyper detailed"
```

1. **If API Works**: You'll get a real AI-generated image of Lord Shiva
2. **If API is Limited**: You'll get a beautiful red-themed placeholder with divine styling
3. **Either Way**: The app won't crash and you'll get visual feedback

### 3. Start Development Server

```sh
# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

The application will be available at `http://localhost:5173`

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/95909a32-57e1-492e-a441-02d30e5d4e25) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
## What technologies are used for this project?

This project is built with:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: Google Gemini API for image generation
- **State Management**: React Hooks (useState)
- **Notifications**: Sonner for toast messages
- **Icons**: Lucide React
- **Routing**: React Router DOM

## API Integration

The application uses Google's Gemini AI API for image generation:
- **Model**: `gemini-2.0-flash-preview-image-generation`
- **Features**: Text-to-image generation with multiple aspect ratios
- **Safety**: Built-in content filtering and safety settings

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── services/           # API integration (Gemini)
├── utils/              # Utility functions and error handling
├── hooks/              # Custom React hooks
└── lib/                # Library configurations
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/95909a32-57e1-492e-a441-02d30e5d4e25) and click on Share → Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
