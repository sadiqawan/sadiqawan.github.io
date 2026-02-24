import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Flutter & Mobile Dev',
    icon: '📱',
    skills: [
      { name: 'Flutter', level: 98 },
      { name: 'Dart', level: 95 },
      { name: 'Firebase', level: 90 },
      { name: 'GetX/Provider/BLoC', level: 88 },
      { name: 'REST APIs', level: 80 },
      { name: 'Android/IOS', level: 90 },
    ],
    color: '#2D62FF',
  },
  {
    title: 'Networking & Security',
    icon: '🛡️',
    skills: [
      { name: 'Palo Alto Firewalls', level: 88 },
      { name: 'FortiGate', level: 85 },
      { name: 'Routing/Switching', level: 82 },
      { name: 'VPN (IPSec/SSL)', level: 90 },
      { name: 'VLANs & Subnetting', level: 88 },
      { name: 'Network Monitoring', level: 85 },
    ],
    color: '#00D4AA',
  },
  {
    title: 'Cloud & Servers',
    icon: '☁️',
    skills: [
      { name: 'AWS (EC2, S3, RDS)', level: 78 },
      { name: 'Linux Administration', level: 85 },
      { name: 'Windows Server', level: 80 },
      { name: 'EDR', level: 75 },
      { name: 'VMware/VirtualBox', level: 82 },
      { name: 'Backup Solutions', level: 80 },
    ],
    color: '#FF6B6B',
  },
  {
    title: 'Tools & Platforms',
    icon: '🛠️',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'CI/CD (GitHub Actions)', level: 75 },
      { name: 'VS Code/Android Studio', level: 92 },
      { name: 'Wireshark', level: 80 },
      { name: 'Postman', level: 88 },
      { name: 'Jira/Confluence', level: 85 },

    ],
    color: '#A855F7',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards magnetic pop animation
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Skill bars animation
      const skillBars = sectionRef.current?.querySelectorAll('.skill-bar');
      skillBars?.forEach((bar) => {
        const width = (bar as HTMLElement).dataset.level;
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 section-padding"
    >
      {/* Background Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(45, 98, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 98, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-electric text-sm font-medium uppercase tracking-wider">My Expertise</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mt-2 mb-4">Skills & Technologies</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A comprehensive toolkit spanning mobile development, network infrastructure,
            cloud platforms, and modern DevOps practices.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={`skill-card glass-card rounded-xl p-6 lg:p-8 border border-white/5 hover:border-electric/30 transition-all duration-300 ${index % 2 === 1 ? 'md:mt-10' : ''
                }`}
            >
              {/* Card Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-white">{category.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-white/50 text-sm">{category.skills.length} technologies</span>
                  </div>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-white/50 text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full rounded-full transition-all duration-300 group-hover:brightness-110"
                        style={{
                          backgroundColor: category.color,
                          width: '0%',
                        }}
                        data-level={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm">
            Always learning new technologies. Currently exploring:{' '}
            <span className="text-electric">Kubernetes</span>,{' '}
            <span className="text-electric">Terraform</span>, and{' '}
            <span className="text-electric">Flutter Web</span>
          </p>
        </div>
      </div>
    </section>
  );
}
