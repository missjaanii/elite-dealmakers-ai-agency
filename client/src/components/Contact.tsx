import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone } from "lucide-react";
import { Vortex } from "@/components/ui/vortex";

export default function Contact() {
  const handleBookCall = () => {
    window.open('https://calendly.com/debjani-elitedealmakers/60min', '_blank');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden min-h-screen">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-contact-headline">
            Ready to Build Your AI Agency?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-contact-subheadline">
            Schedule a free alignment call to see how Elite Dealmakers community can help you build a profitable AI automation agency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Schedule Free Alignment Call */}
          <Card className="hover-elevate bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary-foreground">
                <Calendar className="h-5 w-5" />
                Schedule Free Alignment Call
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Get a free consultation to discuss your AI business goals and see if our community is right for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6 text-primary-foreground/90">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mt-2" />
                  Complimentary 1 hour alignment session
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mt-2" />
                  Customized AI agency roadmap
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mt-2" />
                  No obligation or pressure
                </li>
              </ul>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full"
                onClick={handleBookCall}
                data-testid="button-book-discovery"
              >
                Schedule Free Call
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Get In Touch */}
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle>Get In Touch</CardTitle>
              <CardDescription>
                Prefer to reach out directly? Here's how you can contact us.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground" data-testid="text-email">support@elitedealmakers.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground" data-testid="text-phone">+91 7605828874</span>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Response Time:</strong> We typically respond within 2-4 hours during business hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}