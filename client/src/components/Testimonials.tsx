import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";
import { Vortex } from "@/components/ui/vortex";
import { GlowingShadow } from "@/components/ui/glowing-shadow";
import ceoImage from '@assets/generated_images/CEO_testimonial_headshot_3a8d1a53.png';
import clientImage from '@assets/generated_images/Client_testimonial_headshot_8bda605b.png';
import techImage from '@assets/generated_images/Tech_executive_testimonial_81f5f979.png';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "AI Agency Owner",
      company: "AutomateFlow", 
      avatar: ceoImage,
      content: "Elite Dealmakers community gave me the foundation I needed to launch my AI agency. The classroom modules and weekly coaching helped me close my first $15K client within 6 weeks of joining.",
      rating: 5,
      result: "$15K first client"
    },
    {
      name: "Michael Rodriguez",
      role: "Tech Entrepreneur",
      company: "SmartSolutions",
      avatar: clientImage,
      content: "The community support is incredible. Having access to experienced agency owners who've already built successful AI businesses saved me months of trial and error. Best investment I've made.",
      rating: 5,
      result: "6 months saved"
    },
    {
      name: "Raveen Seth",
      role: "Business Consultant",
      company: "InnovateAI",
      avatar: techImage,
      content: "The combination of structured learning and community networking is powerful. I went from knowing nothing about AI to building profitable automation solutions for clients. The coaches are always available to help.",
      rating: 5,
      result: "Profitable AI business"
    }
  ];


  return (
    <section id="testimonials" className="py-24 relative overflow-hidden min-h-screen">
      <Vortex
        backgroundColor="transparent"
        particleCount={350}
        baseHue={180}
        rangeY={300}
        baseSpeed={0.5}
        rangeSpeed={1.5}
        baseRadius={2}
        rangeRadius={4}
        containerClassName="absolute inset-0 opacity-50"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-testimonials-headline">
            Trusted By AI Agency Builders Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-testimonials-subheadline">
            See how Elite Dealmakers community has helped entrepreneurs build profitable AI automation agencies from scratch.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="h-full transform transition-all duration-500" 
              style={{
                animation: `fadeInUp ${0.8 + index * 0.2}s ease-out ${index * 0.1}s both`
              }}>
              <GlowingShadow>
                <Card 
                  className="h-full border-0 bg-transparent" 
                  data-testid={`card-testimonial-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    
                    <Quote className="h-8 w-8 text-primary mb-4" />
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-testimonial-content-${index}`}>
                      "{testimonial.content}"
                    </p>
                    
                    <div className="mb-4">
                      <div className="font-semibold text-foreground" data-testid={`text-testimonial-name-${index}`}>
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${index}`}>
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <div className="font-semibold text-primary" data-testid={`text-testimonial-result-${index}`}>
                        {testimonial.result}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </GlowingShadow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}