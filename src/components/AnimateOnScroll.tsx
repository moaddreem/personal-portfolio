'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export default function AnimateOnScroll({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    };

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return { ...baseStyles, opacity: 0, transform: 'translateY(40px)' };
        case 'fade-in':
          return { ...baseStyles, opacity: 0 };
        case 'fade-left':
          return { ...baseStyles, opacity: 0, transform: 'translateX(-40px)' };
        case 'fade-right':
          return { ...baseStyles, opacity: 0, transform: 'translateX(40px)' };
        case 'scale-up':
          return { ...baseStyles, opacity: 0, transform: 'scale(0.95)' };
        default:
          return { ...baseStyles, opacity: 0 };
      }
    }

    return { ...baseStyles, opacity: 1, transform: 'translateY(0) translateX(0) scale(1)' };
  };

  return (
    <div ref={ref} className={className} style={getAnimationStyles()}>
      {children}
    </div>
  );
}
