import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Github, 
  Star, 
  Users, 
  Calendar,
  Zap,
  Palette,
  Code,
  Sparkles,
  Globe,
  Brain,
  Smartphone,
  Shield,
  CheckCircle,
  ArrowRight,
  Award,
  Target,
  Clock,
  ChevronDown,
  ChevronUp,
  Send
} from "lucide-react";

const Projects = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const stats = [
    { value: "10+", label: "Projects Completed" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "3+", label: "Years Experience" }
  ];

  const categories = [
    {
      icon: Globe,
      title: "Web Development",
      description: "High-performance, responsive websites built with modern frameworks."
    },
    {
      icon: Brain,
      title: "AI Solutions",
      description: "AI-powered web apps including resume generators, smart dashboards, and analytics platforms."
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications designed for both Android and iOS."
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Intuitive design systems and graphics that enhance user experience."
    },
    {
      icon: Shield,
      title: "Security",
      description: "Secure platforms with robust authentication and cybersecurity practices."
    }
  ];

  const highlights = [
    {
      title: "Tailored Solutions",
      description: "Created solutions tailored for personal brands, small businesses, and startups."
    },
    {
      title: "Cutting-edge Tech",
      description: "Integrated AI models, REST APIs, and automation to enhance user experiences."
    },
    {
      title: "User Focused",
      description: "Ensured all products are visually appealing, user-friendly, and conversion-focused."
    }
  ];

  const whyChooseUs = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Agile development with quick delivery times."
    },
    {
      icon: Target,
      title: "Custom Solutions",
      description: "Solutions precisely tailored to unique needs."
    },
    {
      icon: CheckCircle,
      title: "Transparent Process",
      description: "Transparent updates and smooth collaboration throughout each project."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Our Projects
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            We've built over 10 diverse projects across web development, AI-driven applications, custom tools, and design systems. Each project is crafted with a focus on innovation, functionality, and creating real value.
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-muted/30 border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Projects Categories Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Project Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-8 text-center">
                  <category.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Highlights & Achievements Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Highlights & Achievements</h2>
            <p className="text-lg text-muted-foreground">
              Our track record speaks for itself. Here's what sets us apart in the industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="bg-gradient-subtle border-border/50">
                <CardContent className="p-8 text-center">
                  <Award className="w-10 h-10 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-20">
          <Card className="bg-gradient-hero border-border/50 max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Want to explore our projects and try them out?</h3>
              <Button 
                variant="hero" 
                className="mt-4"
                onClick={() => window.open("https://starkcloudie.netlify.app/#portfolio", "_blank")}
              >
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Why People Choose Us Section */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why people choose us</h2>
            <p className="text-lg text-muted-foreground">
              We're committed to delivering exceptional results through our proven approach.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardContent className="p-8 text-center">
                  <reason.icon className="w-10 h-10 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="bg-gradient-hero border-border/50 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Have an idea in mind? Let's build something amazing together.
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Contact us to get started.
              </p>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setShowContactForm(!showContactForm)}
              >
                Get in Touch
                {showContactForm ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </Button>
              
              {/* Dropdown Contact Form */}
              {showContactForm && (
                <div className="mt-8 text-left animate-in slide-in-from-top-4 duration-300">
                  <div className="bg-background/50 rounded-lg p-6 border border-border/50">
                    <form action="https://formsubmit.co/thirumoorthy07dj@gmail.com" method="POST" className="space-y-4">
                      {/* Hidden inputs for FormSubmit configuration */}
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_subject" value="New Project Inquiry from Projects Page" />
                      <input type="hidden" name="_template" value="table" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="project-name" className="block text-sm font-medium mb-2">
                            Name *
                          </label>
                          <input
                            id="project-name"
                            name="name"
                            type="text"
                            placeholder="Your full name"
                            required
                            className="flex h-9 w-full rounded-md border border-input bg-background/80 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          />
                        </div>
                        <div>
                          <label htmlFor="project-email" className="block text-sm font-medium mb-2">
                            Email *
                          </label>
                          <input
                            id="project-email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            required
                            className="flex h-9 w-full rounded-md border border-input bg-background/80 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="project-type" className="block text-sm font-medium mb-2">
                          Project Type *
                        </label>
                        <select
                          id="project-type"
                          name="project_type"
                          required
                          className="flex h-9 w-full rounded-md border border-input bg-background/80 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          <option value="">Select project type</option>
                          <option value="Web Development">Web Development</option>
                          <option value="AI Solutions">AI Solutions</option>
                          <option value="Mobile Apps">Mobile Apps</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="project-budget" className="block text-sm font-medium mb-2">
                          Budget Range
                        </label>
                        <select
                          id="project-budget"
                          name="budget"
                          className="flex h-9 w-full rounded-md border border-input bg-background/80 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          <option value="">Select budget range</option>
                          <option value="Under $1,000">Under $1,000</option>
                          <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                          <option value="$10,000+">$10,000+</option>
                          <option value="Let's discuss">Let's discuss</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="project-message" className="block text-sm font-medium mb-2">
                          Project Details *
                        </label>
                        <textarea
                          id="project-message"
                          name="message"
                          placeholder="Tell us about your project idea, requirements, timeline, etc."
                          required
                          rows={4}
                          className="flex min-h-[60px] w-full rounded-md border border-input bg-background/80 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" variant="hero">
                        <Send className="w-4 h-4 mr-2" />
                        Send Project Inquiry
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Projects;