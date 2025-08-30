import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share, 
  Search, 
  Trash2, 
  Calendar,
  Sparkles,
  Image,
  Filter
} from "lucide-react";
import { toast } from "sonner";

interface GeneratedImage {
  id: string;
  content: string;
  imageUrl: string;
  timestamp: Date;
  aspectRatio?: string;
}

const History = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState<GeneratedImage[]>([]);

  useEffect(() => {
    // Load images from localStorage
    const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '[]');
    setImages(savedImages.map((img: any) => ({
      ...img,
      timestamp: new Date(img.timestamp)
    })));
  }, []);

  useEffect(() => {
    // Filter images based on search term
    const filtered = images.filter(image =>
      image.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered);
  }, [images, searchTerm]);

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

  const handleDelete = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem('generatedImages', JSON.stringify(updatedImages));
    toast.success("Image deleted from history");
  };

  const clearAllHistory = () => {
    setImages([]);
    localStorage.removeItem('generatedImages');
    toast.success("All history cleared");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Your Creation History
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse and manage all your AI-generated masterpieces
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search your creations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            {images.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={clearAllHistory}
                className="flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6 text-center">
              <Image className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{images.length}</div>
              <div className="text-sm text-muted-foreground">Total Images</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold">
                {images.length > 0 ? new Date().toLocaleDateString() : '-'}
              </div>
              <div className="text-sm text-muted-foreground">Last Created</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{filteredImages.length}</div>
              <div className="text-sm text-muted-foreground">Filtered Results</div>
            </CardContent>
          </Card>
        </div>

        {/* Images Grid */}
        {filteredImages.length === 0 ? (
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-12 text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">
                {images.length === 0 ? "No images yet" : "No results found"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {images.length === 0 
                  ? "Start creating amazing images to see them here!" 
                  : "Try adjusting your search terms"
                }
              </p>
              {images.length === 0 && (
                <Button variant="hero" className="">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Your First Image
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id} 
                className="bg-gradient-card border-border/50 hover:shadow-primary transition-all duration-300 hover:scale-105 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.content}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-foreground mb-2 line-clamp-2">
                    {image.content}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(image.timestamp)}
                      </span>
                    </div>
                    {image.aspectRatio && (
                      <Badge variant="secondary" className="text-xs">
                        {image.aspectRatio}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(image.imageUrl, image.content)}
                      className="flex-1"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare(image.imageUrl, image.content)}
                    >
                      <Share className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;