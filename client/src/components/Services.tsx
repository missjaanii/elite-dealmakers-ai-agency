import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Brain, 
  Wand2, 
  Compass, 
  Mail, 
  Users, 
  User, 
  Play, 
  DollarSign,
  Calendar,
  Newspaper,
  MessageCircle,
  Share2,
  Briefcase,
  Gift
} from "lucide-react";
import { Vortex } from "@/components/ui/vortex";
import { GlowingShadow } from "@/components/ui/glowing-shadow";
import { useState } from "react";

export default function Services() {
  const [activeTab, setActiveTab] = useState("classroom");

  const classroomItems = [
    {
      title: "Foundations",
      description: "Understand AI and the Kinetic Model. Get a concise overview of AI, the Kinetic business framework, and how AI agencies operate. Build a strong foundation, even if you're starting from scratch.",
      icon: Brain
    },
    {
      title: "Solution Sorcery", 
      description: "Spot, explain & build AI solutions. Identify valuable AI use cases, explain them in simple terms, and build automations without writing code. Gain technical confidence that helps you sell and deliver.",
      icon: Wand2
    },
    {
      title: "Mindset",
      description: "Adopt the entrepreneur operating system. Develop the mental resilience and strategic thinking required to lead and grow a successful AI business.",
      icon: Compass
    },
    {
      title: "Outbound Systems",
      description: "Design repeatable systems using cold email and LinkedIn to generate 5-15 calls per week. Includes tools, templates, and automation guidance.",
      icon: Mail
    },
    {
      title: "Warm Outreach",
      description: "Turn your warm network into clients. Use proven scripts and outreach habits to convert contacts into your first clients.",
      icon: Users
    },
    {
      title: "LinkedIn Launchpad",
      description: "Turn your profile into a lead engine. Optimize your LinkedIn to attract leads, grow your personal brand, and build connections that turn into booked calls organically.",
      icon: User
    },
    {
      title: "YouTube Mastery",
      description: "Build a YouTube channel that consistently drives leads by sharing strategic content.",
      icon: Play
    },
    {
      title: "Sales",
      description: "Learn how to run sales calls, structure offers, and close premium clients with no sales background required.",
      icon: DollarSign
    }
  ];

  const communityItems = [
    {
      title: "Weekly Events",
      description: "Join live events every week led by expert coaches. Get real-time support, tactical Q&A, and market-relevant guidance. Plus, connect through networking sessions across the U.S., EU, and Asia. Build momentum and relationships that move your business forward.",
      icon: Calendar
    },
    {
      title: "AI News",
      description: "We cut through the noise and distill AI news into what actually matters for agency owners. Know what's changing, why it's relevant, and how to use it to your advantage all without having to keep up with the chaos yourself.",
      icon: Newspaper
    },
    {
      title: "Ask the Coaches",
      description: "Got questions? Get answers. Our acquisition and development coaches are active daily and required to respond. Whether you're stuck on sales, workflows, tech, or delivery, expert help is always just one post away.",
      icon: MessageCircle
    },
    {
      title: "Share Your Builds",
      description: "From templates to Looms, this space makes it easy to find dev talent, resell proven solutions, or simply level up your build game. Showcase what you're building, explore what others are shipping, and take part in monthly hackathons.",
      icon: Share2
    },
    {
      title: "Hiring & Partnerships",
      description: "Post roles, pitch your skillset, or find your next contractor or collaborator. This is where talent meets opportunity. Whether you're hiring or looking to be hired, this is where to start.",
      icon: Briefcase
    },
    {
      title: "Additional Resources",
      description: "Get access to templates, and resources that will save you thousands while building your AI agency. Plus bonus content, industry reports, and insider guides only available to community members.",
      icon: Gift
    }
  ];

  const handleGetStarted = () => {
    window.open('https://calendly.com/debjani-elitedealmakers/60min', '_blank');
  };

  const renderContent = () => {
    const items = activeTab === "classroom" ? classroomItems : communityItems;
    const gridCols = activeTab === "classroom" ? "xl:grid-cols-4" : "lg:grid-cols-3";
    
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-6 mb-12`}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className="h-full transform transition-all duration-500" 
            style={{
              animation: `fadeInUp ${0.6 + index * 0.1}s ease-out ${index * 0.05}s both`
            }}>
            <GlowingShadow>
              <Card 
                className="h-full border-0 bg-transparent hover-elevate" 
                data-testid={`card-${activeTab}-${index}`}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transform transition-all duration-300 hover:scale-110 hover:bg-primary/20">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className={`${activeTab === "classroom" ? "text-lg" : "text-xl"} font-bold`}>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </GlowingShadow>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden min-h-screen">
      <Vortex
        backgroundColor="transparent"
        particleCount={350}
        baseHue={180}
        rangeY={300}
        baseSpeed={0.4}
        rangeSpeed={1.3}
        baseRadius={2}
        rangeRadius={4}
        containerClassName="absolute inset-0 opacity-45"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8" data-testid="text-accelerator-headline">
            Elite Dealmakers give you access to:
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex rounded-lg bg-muted/20 p-1 backdrop-blur-sm border border-border/20">
              <button
                onClick={() => setActiveTab("classroom")}
                className={`px-8 py-3 text-sm font-semibold rounded-md transition-all duration-300 ${
                  activeTab === "classroom"
                    ? "bg-primary text-primary-foreground shadow-md transform scale-105"
                    : "text-muted-foreground hover:text-foreground hover-elevate"
                }`}
                data-testid="tab-classroom"
              >
                Classroom
              </button>
              <button
                onClick={() => setActiveTab("community")}
                className={`px-8 py-3 text-sm font-semibold rounded-md transition-all duration-300 ${
                  activeTab === "community"
                    ? "bg-primary text-primary-foreground shadow-md transform scale-105"
                    : "text-muted-foreground hover:text-foreground hover-elevate"
                }`}
                data-testid="tab-community"
              >
                Community
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div data-testid={`content-${activeTab}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" data-testid={`text-${activeTab}-headline`}>
              {activeTab === "classroom" ? "Classroom" : "Community"}
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid={`text-${activeTab}-subheadline`}>
              {activeTab === "classroom" 
                ? "Master the fundamentals and advanced strategies to build and scale your AI agency with our comprehensive learning modules."
                : "Connect with fellow AI agency owners, get expert support, and access exclusive resources to accelerate your growth."
              }
            </p>
          </div>

          {renderContent()}

          {activeTab === "community" && (
            <div className="text-center">
              <Button size="lg" onClick={handleGetStarted} data-testid="button-community-cta">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}