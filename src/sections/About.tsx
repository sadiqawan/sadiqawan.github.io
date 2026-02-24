import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Code, Shield, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3, suffix: '+', label: 'Years Experience', icon: Briefcase },
  { value: 50, suffix: '+', label: 'Projects Completed', icon: Code },
  { value: 99, suffix: '%', label: 'Uptime Maintained', icon: Server },
  { value: 100, suffix: '%', label: 'Security Compliance', icon: Shield },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const statsPanelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text panel animation
      gsap.fromTo(
        textPanelRef.current,
        { rotateX: 20, opacity: 0, y: 50 },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats panel animation
      gsap.fromTo(
        statsPanelRef.current,
        { rotateX: 20, opacity: 0, y: 50 },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Connector line animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Parallax effect on scroll
      gsap.to(textPanelRef.current, {
        x: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(statsPanelRef.current, {
        x: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 section-padding"
    >
      {/* SVG Connector Line */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none hidden lg:block"
        style={{ maxWidth: '1200px' }}
      >
        <path
          ref={lineRef}
          d="M 400 100 Q 500 200 600 150 T 800 200"
          fill="none"
          stroke="rgba(45, 98, 255, 0.3)"
          strokeWidth="1"
        />
      </svg>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-electric text-sm font-medium uppercase tracking-wider">Get To Know Me</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mt-2">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Text Panel */}
          <div
            ref={textPanelRef}
            className="lg:col-span-7 glass-card rounded-2xl p-8 lg:p-10"
            style={{ perspective: '1000px' }}
          >
            <h3 className="font-display font-semibold text-2xl lg:text-3xl text-white mb-6">
              Passionate about building <span className="text-electric">reliable systems</span> and <span className="text-electric">elegant apps</span>
            </h3>

            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Professional experience spans enterprise networking, cybersecurity operations, and cross-platform mobile application
                development. Strong focus on building secure, scalable, and highly available IT environments aligned with business and
                operational requirements.
              </p>

              <p>
                Networking and security expertise includes deployment, configuration, and support of enterprise firewalls
                (Palo Alto, FortiGate & more..), secure VPN architectures, endpoint security, and XDR platforms. Hands-on experience managing
                production infrastructure for organizations supporting 500+ users with near-zero downtime.
              </p>

              <p>
                Mobile development experience centers on Flutter-based applications for Android and iOS, following clean architecture
                principles, structured state management, and performance-optimized UI/UX. Delivered 15+ production applications with
                a combined user base exceeding 300,000 users.
              </p>

              <p>
                Actively expanding expertise in advanced network engineering, cloud and virtualization platforms, switching and routing,
                XDR ecosystems, and modern infrastructure practices to deliver end-to-end, secure, and resilient solutions.
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
              <div>
                <span className="text-white/50 text-sm">Location</span>
                <p className="text-white font-medium">Pakistan</p>
              </div>
              <div>
                <span className="text-white/50 text-sm">Experience</span>
                <p className="text-white font-medium">3+ Years</p>
              </div>
              <div>
                <span className="text-white/50 text-sm">Availability</span>
                <p className="text-electric font-medium">Full-time</p>
              </div>
              <div>
                <span className="text-white/50 text-sm">Languages</span>
                <p className="text-white font-medium">English, Urdu</p>
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div
            ref={statsPanelRef}
            className="lg:col-span-5 lg:mt-12"
            style={{ perspective: '1000px' }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-xl p-6 text-center group hover:border-electric/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-electric/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-electric/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-electric" />
                  </div>
                  <div className="font-display font-bold text-3xl lg:text-4xl text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <span className="text-white/50 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Quote Card */}
            <div className="glass-card rounded-xl p-6 mt-4 border-l-4 border-electric">
              <p className="text-white/80 italic text-sm leading-relaxed">
                "The best systems are those that users never notice—they just work, reliably and securely,
                day after day."
              </p>
              <span className="text-electric text-xs mt-3 block">— My Philosophy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
