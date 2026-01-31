import Link from 'next/link';

interface FooterProps {
  links: {
    linkedin: string;
    email: string;
    twitter: string;
  };
}

export default function Footer({ links }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-2 border-t border-border">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-semibold text-text-primary mb-4">Muath.</h3>
            <p className="text-text-secondary text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Computer Science Student at King Saud University. Building practical projects and turning ideas into real products.
            </p>
            <div className="flex items-center space-x-5 mt-6">
              {links.email && (
                <a
                  href={`mailto:${links.email}`}
                  className="text-text-secondary hover:text-accent-highlight transition-colors"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent-highlight transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {links.twitter && (
                <a
                  href={links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent-highlight transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Get In Touch</h4>
            <div className="space-y-3">
              {links.email && (
                <p className="text-text-primary" style={{ fontFamily: 'Inter, sans-serif' }}>{links.email}</p>
              )}
              <p className="text-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Riyadh, Saudi Arabia</p>
            </div>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-text-secondary text-sm text-center sm:text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
            © {currentYear} MUATH AL-DURAYM. All rights reserved.
          </p>
          <p className="text-text-secondary/50 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
            v1.0.2 • Build 2026-01-31
          </p>
        </div>
      </div>
    </footer>
  );
}
