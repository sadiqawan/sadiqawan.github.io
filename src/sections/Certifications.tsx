import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Calendar, ExternalLink, Shield, Server, Cloud, Code, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    name: 'Palo Alto Next-Generation Firewall Engineer',
    issuer: 'Palo Alto Networks',
    date: '2024',
    expiry: '2027',
    icon: Shield,
    color: '#2D62FF',
    description: 'Advanced certification demonstrating expertise in designing, deploying, and managing Palo Alto Networks security platforms.',
    verifyUrl: 'https://www.paloaltonetworks.com/services/education/pcse',
  },
  {
    id: 2,
    name: 'Fortinet Certified Associate in Cybersecurity',
    issuer: 'Fortinet',
    date: '2026',
    expiry: '2027',
    icon: Shield,
    color: '#FF6B35',
    description: 'Professional certification validating skills in configuring and managing FortiGate devices for enterprise security.',
    verifyUrl: 'https://www.fortinet.com/training-certification',
  },
  {
    id: 3,
    name: 'NAVTTC Certified Mobile App Developer.',
    issuer: 'NAVTTC, Pak',
    date: '2020',
    expiry: 'Lifetime Validity',
    icon: Code,
    color: '#1BA0D7',
    description: 'Demonstrates proficiency in building cross-platform mobile applications using Flutter and Dart.',
    verifyUrl: 'https://navttc.gov.pk/',
  },
  {
    id: 4,
    name: 'Extreme Certified Associate.',
    issuer: 'Extreme Network',
    date: '2023',
    expiry: '2026',
    icon: Network,
    color: '#FF9900',
    description: 'Comprehensive certification covering networking fundamentals, IP connectivity, security fundamentals, and automation.',
    verifyUrl: 'https://www.credly.com/badges/01fae7bc-29ef-4f87-92c7-49d390eb7d93',
  },
  {
    id: 5,
    name: 'Forescout Accredited Engineer',
    issuer: 'Forescout',
    date: '2026',
    expiry: '2028',
    icon: Server,
    color: '#02569B',
    description: 'Validates expertise in designing distributed systems on Forescout infrastructure with focus on scalability and security.',
    verifyUrl: 'https://www.forescout.com/',
  },
  {
    id: 6,
    name: 'BeyondTrust Certified Sales Professional',
    issuer: 'BeyondTrust',
    date: '2026',
    expiry: '2027',
    icon: Shield,
    color: '#C8202F',
    description: 'Certification covering network security, compliance, threats, and vulnerabilities.',
    verifyUrl: 'https://www.credly.com/badges/298e77eb-f00b-42f9-8f93-0423d1c96827/linked_in_profile',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
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
      id="certifications"
      ref={sectionRef}
      className="relative py-24 lg:py-32 section-padding"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-electric text-sm font-medium uppercase tracking-wider">Professional Credentials</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mt-2 mb-4">Certifications</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Industry-recognized certifications validating expertise across networking, security, cloud, and development domains.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group"
              style={{ perspective: '1000px' }}
            >
              <div className="glass-card rounded-xl p-6 h-full border border-white/5 hover:border-electric/30 transition-all duration-300 hover:-translate-y-2">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${cert.color}15` }}
                  >
                    <cert.icon className="w-6 h-6" style={{ color: cert.color }} />
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 text-white/50 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-electric transition-colors line-clamp-2">
                  {cert.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-white/40" />
                  <span className="text-white/60 text-sm">{cert.issuer}</span>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                  {cert.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        cert.expiry ? 'bg-green-500' : 'bg-electric'
                      }`}
                    />
                    <span className="text-white/40 text-xs">
                      {cert.expiry ? `Valid until ${cert.expiry}` : 'Lifetime Validity'}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-electric hover:text-electric-light hover:bg-electric/10 p-2 h-auto"
                    asChild
                  >
                    <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { value: '6+', label: 'Certifications' },
            { value: '4', label: 'Vendors' },
            { value: '3', label: 'Domains' },
            { value: '100%', label: 'Active' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-lg p-4 text-center"
            >
              <div className="font-display font-bold text-2xl text-electric mb-1">
                {stat.value}
              </div>
              <span className="text-white/50 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
