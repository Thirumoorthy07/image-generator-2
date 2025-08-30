import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { 
  Send, 
  Sparkles, 
  Download, 
  Share, 
  Loader2,
  Monitor,
  User,
  Bot,
  X,
  ZoomIn
} from "lucide-react";
import { toast } from "sonner";
import { generateImage } from "@/services/gemini";
import { handleAPIError } from "@/utils/errors";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
  aspectRatio?: string;
}

const Generate = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);

  const aspectRatios = [
    { value: "1:1", label: "Square (1:1)", width: 512, height: 512 },
    { value: "16:9", label: "Landscape (16:9)", width: 768, height: 432 },
    { value: "9:16", label: "Portrait (9:16)", width: 432, height: 768 },
    { value: "4:3", label: "Standard (4:3)", width: 640, height: 480 },
    { value: "3:4", label: "Portrait (3:4)", width: 480, height: 640 },
  ];

  const handleSendMessage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate an image");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date(),
      aspectRatio: aspectRatio
    };

    setMessages(prev => [...prev, userMessage]);
    const currentPrompt = prompt;
    setPrompt("");
    setIsGenerating(true);

    try {
      // Generate image using Gemini API
      const result = await generateImage({
        prompt: currentPrompt,
        aspectRatio: aspectRatio
      });
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Generated image for: "${currentPrompt}"`,
        timestamp: new Date(),
        imageUrl: result.imageUrl,
        aspectRatio: aspectRatio
      };

      setMessages(prev => [...prev, assistantMessage]);
      toast.success("Image generated successfully!");
      
      // Save to localStorage for history
      const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '[]');
      savedImages.push(assistantMessage);
      localStorage.setItem('generatedImages', JSON.stringify(savedImages));
      
    } catch (error) {
      console.error("Error generating image:", error);
      
      // Show specific error message using error handler
      const errorMessage = handleAPIError(error);
      
      // Only show error toast if it's a real API error, not a placeholder response
      if (error instanceof Error && !error.message.includes('Demo mode')) {
        toast.error(errorMessage);
      } else if (error instanceof Error && error.message.includes('Demo mode')) {
        toast.info("Using demo placeholder - Gemini image generation API is not available yet");
      }
      
      // Don't add error message to chat if we're in demo mode
      // The placeholder image will be shown instead
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `imagegen-${prompt.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
      console.error("Download error:", error);
    }
  };

  const handleShare = async (imageUrl: string, prompt: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Generated Image',
          text: prompt,
          url: imageUrl
        });
      } catch (error) {
        console.error("Share error:", error);
      }
    } else {
      navigator.clipboard.writeText(imageUrl);
      toast.success("Image URL copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 flex flex-col">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto px-4 py-6">
          <div className="h-full flex flex-col">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-6 pb-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-20">
                  <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h2 className="text-2xl font-bold mb-2">Ready to create something amazing?</h2>
                  <p className="text-lg">Type your prompt below to generate an image</p>
                  <p className="text-sm mt-2 opacity-70">Try: "A magical forest with glowing mushrooms at sunset"</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-4">
                    {message.type === 'user' ? (
                      <>
                        <div className="flex-1" />
                        <div className="flex items-start space-x-3 max-w-[80%]">
                          <div className="bg-primary text-primary-foreground rounded-2xl px-4 py-3">
                            <p className="text-sm">{message.content}</p>
                            {message.aspectRatio && (
                              <Badge variant="secondary" className="mt-2 bg-primary-foreground/20 text-primary-foreground">
                                <Monitor className="w-3 h-3 mr-1" />
                                {message.aspectRatio}
                              </Badge>
                            )}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-primary-foreground" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 max-w-[80%]">
                          {message.imageUrl && (
                            <div className="bg-muted/50 rounded-2xl p-4">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <div 
                                    className={`relative overflow-hidden rounded-lg shadow-lg mb-3 cursor-pointer group ${
                                      message.aspectRatio === '1:1' ? 'aspect-square' :
                                      message.aspectRatio === '16:9' ? 'aspect-video' :
                                      message.aspectRatio === '9:16' ? 'aspect-[9/16]' :
                                      message.aspectRatio === '4:3' ? 'aspect-[4/3]' :
                                      message.aspectRatio === '3:4' ? 'aspect-[3/4]' :
                                      'aspect-square'
                                    }`}
                                  >
                                    <img
                                      src={message.imageUrl}
                                      alt="Generated"
                                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    {/* Hover overlay with zoom icon */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <div className="bg-white/90 rounded-full p-3">
                                        <ZoomIn className="w-6 h-6 text-gray-800" />
                                      </div>
                                    </div>
                                  </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
                                  <div className="relative w-full h-full flex items-center justify-center p-4">
                                    <img
                                      src={message.imageUrl}
                                      alt="Generated Image - Full View"
                                      className="max-w-full max-h-full object-contain rounded-lg"
                                    />
                                    {/* Close button */}
                                    <DialogClose asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white"
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </DialogClose>
                                    {/* Image info overlay */}
                                    <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
                                      <p className="text-sm font-medium">{message.content}</p>
                                      {message.aspectRatio && (
                                        <p className="text-xs opacity-75">Aspect Ratio: {message.aspectRatio}</p>
                                      )}
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownload(message.imageUrl!, message.content)}
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleShare(message.imageUrl!, message.content)}
                                >
                                  <Share className="w-4 h-4 mr-1" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
              
              {isGenerating && (
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted/50 rounded-2xl p-4 max-w-[80%]">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span className="text-muted-foreground">Generating your image...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Input Section - Fixed at Bottom */}
      <div className="border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="space-y-3">
            {/* Aspect Ratio Selector */}
            <div className="flex justify-center">
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="w-64 bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aspectRatios.map((ratio) => (
                    <SelectItem key={ratio.value} value={ratio.value}>
                      {ratio.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Prompt Input */}
            <div className="flex space-x-3 items-end">
              <div className="flex-1">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to create..."
                  className="min-h-12 text-base bg-muted/50 border-muted-foreground/20"
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  disabled={isGenerating}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={isGenerating || !prompt.trim()}
                size="lg"
                className="h-12 px-6"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;