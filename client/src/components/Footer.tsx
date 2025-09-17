import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Community", href: "#services" },
    { label: "Success Stories", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <span className="text-2xl font-bold text-foreground" data-testid="text-footer-logo">
                  Elite Dealmakers
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md" data-testid="text-footer-description">
                Join Elite Dealmakers community to learn how to build a wildly profitable AI automation agency. Access expert coaching, proven frameworks, and a supportive network of AI agency builders.
              </p>
              <p className="text-sm text-muted-foreground">
                Trusted by AI agency builders worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4" data-testid="text-footer-links-title">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${index}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-foreground mb-4" data-testid="text-footer-contact-title">
                Contact
              </h3>
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm" data-testid="text-footer-email">
                  support@elitedealmakers.in
                </p>
                <p className="text-muted-foreground text-sm" data-testid="text-footer-phone">
                  +91 7605828874
                </p>
                <p className="text-muted-foreground text-sm">
                  Community support worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
              © {currentYear} Elite Dealmakers. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}