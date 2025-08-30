import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  Sparkles, 
  Palette, 
  Download, 
  Share, 
  Cpu,
  ArrowRight,
  Star
} from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const Home = () => {
  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate stunning images in seconds with our advanced AI technology"
    },
    {
      icon: Palette,
      title: "Unlimited Creativity",
      description: "Turn your wildest ideas into beautiful visual art with simple text prompts"
    },
    {
      icon: Download,
      title: "High Quality",
      description: "Download your creations in high resolution, perfect for any use case"
    },
    {
      icon: Share,
      title: "Easy Sharing",
      description: "Share your masterpieces with the world or keep them private"
    },
    {
      icon: Cpu,
      title: "AI Powered",
      description: "Powered by cutting-edge artificial intelligence models"
    },
    {
      icon: Star,
      title: "Unlimited Usage",
      description: "No limits on creativity - generate as many images as you want"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Create Stunning Images
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your imagination into breathtaking visual art with our powerful AI image generator. 
              No design skills required - just describe what you want!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/generate">
                <Button variant="hero" size="xl" className="">
                  Start Creating <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/history">
                <Button variant="outline" size="xl">
                  View Gallery <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-scrolling Gallery */}
      <section className="py-16 overflow-hidden">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Endless Possibilities
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our AI can create with just a few words
          </p>
        </div>
        
        <div className="relative">
          <div className="flex animate-slide-infinite">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 h-48 mx-4 rounded-xl overflow-hidden shadow-elegant"
              >
                <img
                  src={image}
                  alt={`AI Generated Art ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose ImageGen AI?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the next generation of AI-powered image creation with features designed for creators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card border-border/50 hover:shadow-primary transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 animate-float">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of creators who are already using ImageGen AI to transform their imagination into reality
          </p>
          <Link to="/generate">
            <Button variant="hero" size="xl" className="">
              Get Started Now <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;