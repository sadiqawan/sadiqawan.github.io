import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'ShopFlow E-Commerce',
    description: 'A full-featured e-commerce mobile application built with Flutter. Features include product catalog, shopping cart, secure checkout, order tracking, and real-time inventory management. Integrated with Stripe for payments and Firebase for backend services.',
    image: '/project-ecommerce.jpg',
    technologies: ['Flutter', 'Firebase', 'Stripe API', 'Provider'],
    category: 'Mobile App',
    github: 'https://github.com/sadiqawan/shopflow',
    demo: 'https://demo-link.com',
  },
  {
    id: 2,
    title: 'NetGuard Security Dashboard',
    description: 'Enterprise network security monitoring system designed for SOC teams. Provides real-time firewall metrics, threat detection alerts, traffic analysis, and automated incident response. Integrated with Palo Alto and FortiGate APIs.',
    image: '/project-network.jpg',
    technologies: ['Python', 'React', 'Palo Alto API', 'PostgreSQL'],
    category: 'Network Security',
    github: 'https://github.com/sadiqawan/netguard',
    demo: 'https://demo-link.com',
  },
  {
    id: 3,
    title: 'ChatWave Messenger',
    description: 'Real-time messaging application with end-to-end encryption. Features include one-on-one and group chats, voice messages, file sharing, and push notifications. Built with Flutter for cross-platform compatibility.',
    image: '/project-chat.jpg',
    technologies: ['Flutter', 'WebSocket', 'Node.js', 'MongoDB'],
    category: 'Mobile App',
    github: 'https://github.com/sadiqawan/chatwave',
    demo: 'https://demo-link.com',
  },
  {
    id: 4,
    title: 'CloudOps Infrastructure',
    description: 'Automated cloud infrastructure management platform for AWS resources. Features include auto-scaling, load balancing, cost optimization, and comprehensive monitoring dashboards. Implements Infrastructure as Code with Terraform.',
    image: '/project-cloud.jpg',
    technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
    category: 'Cloud & DevOps',
    github: 'https://github.com/sadiqawan/cloudops',
    demo: 'https://demo-link.com',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      const track = trackRef.current;
      const cards = cardsRef.current;
      
      if (track && cards.length > 0) {
        const totalWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Parallax effect on images inside cards
        cards.forEach((card) => {
          const img = card.querySelector('img');
          if (img) {
            gsap.fromTo(
              img,
              { x: '-10%' },
              {
                x: '10%',
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: gsap.getById('horizontal-scroll'),
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              }
            );
          }
        });
      }

      // Card entrance animations
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
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
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-0 overflow-hidden"
    >
      {/* Section Header - Fixed */}
      <div className="section-padding py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <span className="text-electric text-sm font-medium uppercase tracking-wider">Featured Work</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mt-2 mb-4">Projects</h2>
          <p className="text-white/60 max-w-2xl">
            A selection of my recent work across mobile development, network security, and cloud infrastructure.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="flex gap-8 section-padding pb-12 lg:pb-0"
        style={{ width: 'fit-content' }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="project-card relative w-[85vw] md:w-[70vw] lg:w-[60vw] max-w-4xl flex-shrink-0"
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-electric/30 transition-all duration-500 group">
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-transparent lg:bg-gradient-to-t" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-electric/20 border border-electric/30 text-electric text-xs font-medium">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <h3 className="font-display font-bold text-2xl lg:text-3xl text-white mb-4 group-hover:text-electric transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-white/5 text-white/70 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-electric hover:bg-electric-light text-white"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* View All Card */}
        <div className="w-[85vw] md:w-[70vw] lg:w-[40vw] max-w-md flex-shrink-0 flex items-center justify-center">
          <div className="glass-card rounded-2xl p-8 lg:p-12 text-center border border-white/5 hover:border-electric/30 transition-all duration-500">
            <div className="w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="w-8 h-8 text-electric" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">View All Projects</h3>
            <p className="text-white/60 text-sm mb-6">
              Explore my complete portfolio on GitHub, including open-source contributions and private repositories.
            </p>
            <Button
              className="bg-electric hover:bg-electric-light text-white"
              asChild
            >
              <a href="https://github.com/sadiqawan" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Visit GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="hidden lg:flex items-center gap-4 section-padding mt-8">
        <div className="h-px flex-1 bg-gradient-to-r from-electric/50 to-transparent" />
        <span className="text-white/40 text-sm">Scroll to explore</span>
        <ArrowRight className="w-4 h-4 text-electric animate-pulse" />
      </div>
    </section>
  );
}
