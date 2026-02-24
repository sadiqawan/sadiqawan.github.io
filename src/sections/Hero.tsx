import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - split character reveal
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1.2,
            stagger: 0.05,
            ease: 'expo.out',
            delay: 0.2,
          }
        );
      }

      // Role text - decoder effect simulation
      gsap.fromTo(
        roleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 0.8,
        }
      );

      // Description
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 1,
        }
      );

      // Profile image - 3D rotation reveal
      gsap.fromTo(
        imageRef.current,
        { rotateY: 90, opacity: 0, scale: 0.8 },
        {
          rotateY: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'expo.out',
          delay: 0.4,
        }
      );

      // CTA buttons
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 1.2,
        }
      );

      // Social links
      gsap.fromTo(
        socialsRef.current?.children || [],
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 1.4,
        }
      );

      // Scroll-triggered parallax for image
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.to(imageRef.current, {
              y: -self.progress * 100,
              scale: 1 - self.progress * 0.1,
              duration: 0.1,
            });
          }
        },
      });

      // Title blur on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '50% top',
        scrub: true,
        onUpdate: (self) => {
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              filter: `blur(${self.progress * 10}px)`,
              duration: 0.1,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split name into characters
  const name = 'Sadiq Awan';
  const nameChars = name.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ));

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center section-padding pt-20 lg:pt-0"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Role Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              <span className="text-sm text-electric font-medium">Available for Work</span>
            </div>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mb-4 overflow-hidden"
            >
              {nameChars}
            </h1>

            {/* Role */}
            <p
              ref={roleRef}
              className="font-display text-xl sm:text-2xl lg:text-3xl text-electric mb-6"
            >
              IT Expert | Flutter Developer | Network & Security Engineer
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Bridging the gap between robust infrastructure and elegant mobile experiences. 
              I build secure networks, develop cross-platform apps, and ensure 24/7 system reliability.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button
                onClick={() => scrollToSection('#projects')}
                className="bg-electric hover:bg-electric-light text-white font-semibold px-8 py-6 text-base group"
              >
                View My Work
                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection('#contact')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-6 text-base"
              >
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/sadiqawan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-electric hover:border-electric/50 transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/sadiqawan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-electric hover:border-electric/50 transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:sadiqawan@example.com"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-electric hover:border-electric/50 transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              style={{ perspective: '1000px' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-electric/20 blur-3xl scale-110 animate-pulse-glow" />
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-electric/30 animate-float">
                <img
                  src="/profile.jpg"
                  alt="Sadiq Awan"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 to-transparent" />
              </div>

              {/* Floating Badges */}
              <div className="absolute -left-4 top-1/4 px-3 py-1.5 rounded-lg bg-void-light border border-electric/30 text-xs font-medium text-electric animate-float" style={{ animationDelay: '1s' }}>
                Flutter
              </div>
              <div className="absolute -right-4 top-1/2 px-3 py-1.5 rounded-lg bg-void-light border border-electric/30 text-xs font-medium text-electric animate-float" style={{ animationDelay: '2s' }}>
                Network
              </div>
              <div className="absolute left-1/4 -bottom-2 px-3 py-1.5 rounded-lg bg-void-light border border-electric/30 text-xs font-medium text-electric animate-float" style={{ animationDelay: '0.5s' }}>
                Security
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-xs text-white/50">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-electric animate-bounce" />
        </div>
      </div>
    </section>
  );
}
