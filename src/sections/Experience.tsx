import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: 'Network Engineer',
    company: 'AZOURE Engineering & Services',
    location: 'Islamabad, Pakistan',
    period: '2024 - Present',
    description: 'Part of network security team working on operations for enterprise clients. Responsible for firewall configuration, threat monitoring, and incident response.',
    responsibilities: [
      'Configure and maintain Palo Alto and FortiGate firewalls for 50+ enterprise clients',
      'Implement zero-trust network architecture reducing security incidents by 60%',
      'Design and deploy site-to-site VPN solutions connecting 15+ branch offices',
      'Conduct security audits and vulnerability assessments',
      'Train junior engineers on network security best practices',
    ],
    technologies: ['Palo Alto', 'FortiGate', 'XDR', 'SIEM', 'Virtualization',],
    side: 'left',
  },

  {
    id: 2,
    role: 'IT Support Engineer ',
    company: 'Pakistan Meteorological Department (PMD).',
    location: 'Islamabad, Pakistan',
    period: 'Jul 2025 - Aug 2025.',
    description: 'Provided comprehensive IT support for a 5+ Departments. Managed infrastructure, resolved technical issues, and implemented system improvements.',
    responsibilities: [
      'Maintained 99.9% network uptime for critical business operations',
      'Managed Active Directory, Exchange Server, and file servers',
      'Implemented automated backup solutions reducing data loss risk',
      'Configured and troubleshot Cisco switches and routers',
      'Created technical documentation and user training materials',
    ],
    technologies: ['Windows Server', 'Cisco', 'Active Directory', 'VMware'],
    side: 'right',
  },
  {
    id: 3,
    role: 'Flutter Developer',
    company: 'AptechMedia',
    location: 'Peshawer, Pakistan',
    period: 'May 2024 - Nov 2024.',
    description: 'Developed cross-platform mobile applications for clients across various industries including e-commerce, healthcare, and fintech.',
    responsibilities: [
      'Built 8+ production-ready Flutter apps with 50k+ combined downloads',
      'Implemented clean architecture and state management using BLoC pattern',
      'Integrated REST APIs, Firebase services, and third-party SDKs',
      'Published apps to App Store and Play Store with 4.5+ star ratings',
      'Collaborated with UI/UX designers to implement pixel-perfect designs',
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Git'],
    side: 'left',
  },
  {
    id: 4,
    role: 'Flutter Developer',
    company: 'CodexDev',
    location: 'Peshawer, Pakistan',
    period: 'May 2024 - Aug 2024.',
    description: 'Developed cross-platform mobile applications for clients across various industries  health, and fintness.',
    responsibilities: [
      'Built 3+ production-ready Flutter apps with 50k+ combined downloads',
      'Implemented clean architecture and state management using BLoC pattern',
      'Integrated REST APIs, Firebase services, and third-party SDKs',
      'Published apps to App Store and Play Store with 4.5+ star ratings',
      'Collaborated with UI/UX designers to implement pixel-perfect designs',
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Git'],
    side: 'right',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const nodesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        );
      }

      // Card animations
      cardsRef.current.forEach((card, index) => {
        const isLeft = experiences[index].side === 'left';
        gsap.fromTo(
          card,
          {
            x: isLeft ? -100 : 100,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Node pulse animations
      nodesRef.current.forEach((node) => {
        gsap.to(node, {
          scale: 1.3,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 section-padding"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-electric text-sm font-medium uppercase tracking-wider">Career Journey</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mt-2 mb-4">Work Experience</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            My professional journey across network security, mobile development, and IT infrastructure.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-white/10" />
            <div
              ref={lineRef}
              className="absolute inset-x-0 top-0 bg-electric origin-top"
              style={{ height: '100%' }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${index !== 0 ? 'lg:mt-16' : ''
                  }`}
              >
                {/* Timeline Node - Desktop */}
                <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div
                    ref={(el) => {
                      if (el) nodesRef.current[index] = el;
                    }}
                    className="w-4 h-4 rounded-full bg-electric border-4 border-void shadow-glow"
                  />
                </div>

                {/* Card */}
                <div
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className={`${exp.side === 'right' ? 'lg:col-start-2' : ''}`}
                >
                  <div className="glass-card rounded-xl p-6 lg:p-8 border border-white/5 hover:border-electric/30 transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-display font-bold text-xl text-white group-hover:text-electric transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-white/60">
                          <Building2 className="w-4 h-4" />
                          <span className="text-sm">{exp.company}</span>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-electric/10 border border-electric/30 text-electric text-xs font-medium">
                        {exp.period}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    <div className="mb-4">
                      <h4 className="text-white/80 text-sm font-medium mb-2">Key Responsibilities:</h4>
                      <ul className="space-y-1.5">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-electric mt-1.5 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-md bg-white/5 text-white/60 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                {exp.side === 'left' && <div className="hidden lg:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
