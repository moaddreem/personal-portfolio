'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/#home', label: 'Home', isHash: true },
  { href: '/#about', label: 'About', isHash: true },
  { href: '/#skills', label: 'Skills', isHash: true },
  { href: '/#projects', label: 'Projects', isHash: true },
  { href: '/#achievements', label: 'Achievements', isHash: true },
  { href: '/#contact', label: 'Contact', isHash: true },
  { href: '/#blog', label: 'Blog', isHash: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll direction for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar near top
      if (currentScrollY < 80) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Track active section with IntersectionObserver
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact', 'blog'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [pathname]);

  // Handle smooth scroll navigation
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, isHash: boolean) => {
    if (!isHash) return; // Let normal navigation happen for non-hash links
    
    e.preventDefault();
    const targetId = href.replace('/#', '');
    
    // If we're not on the home page, navigate there first
    if (pathname !== '/') {
      router.push(href);
      return;
    }
    
    // Scroll to section - use scrollIntoView with block: 'start'
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    setMobileMenuOpen(false);
  }, [pathname, router]);

  // Check if link is active
  const isLinkActive = (href: string, isHash: boolean) => {
    if (!isHash) {
      return pathname === href || pathname.startsWith(href + '/');
    }
    if (pathname !== '/') return false;
    const sectionId = href.replace('/#', '');
    return activeSection === sectionId;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-bg-primary/80 backdrop-blur-lg border-b border-border/50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-16">
            <Link 
              href="/#home"
              onClick={(e) => handleNavClick(e, '/#home', true)}
              className="text-xl font-serif font-semibold text-text-primary hover:text-accent-highlight transition-colors"
            >
              Muath.
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isHash)}
                  className={`nav-link relative ${
                    isLinkActive(link.href, link.isHash) ? 'nav-link-active' : ''
                  }`}
                >
                  {link.label}
                  {isLinkActive(link.href, link.isHash) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-highlight rounded-full" />
                  )}
                </Link>
              ))}
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-surface hover:bg-surface-2 transition-colors text-text-secondary hover:text-accent-highlight"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-surface hover:bg-surface-2 transition-colors text-text-secondary hover:text-accent-highlight"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-surface transition-colors text-text-secondary"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.isHash)}
                    className={`nav-link py-2 ${
                      isLinkActive(link.href, link.isHash) ? 'nav-link-active' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
