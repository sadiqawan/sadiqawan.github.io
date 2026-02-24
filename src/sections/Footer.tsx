import { Heart, ArrowUp } from 'lucide-react';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '#hero' },
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Projects', href: '#projects' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Network Security', href: '#skills' },
      { name: 'Flutter Development', href: '#skills' },
      { name: 'Cloud Infrastructure', href: '#skills' },
      { name: 'IT Consulting', href: '#contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'GitHub', href: 'https://github.com/sadiqawan' },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/sadiqawan' },
      { name: 'Twitter', href: 'https://twitter.com/sadiqawan' },
      { name: 'Email', href: 'mailto:sadiqawan.xpert@gmail.com' },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-void border-t border-white/5">
      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#hero');
                }}
                className="font-display font-bold text-2xl text-white hover:text-electric transition-colors inline-block mb-4"
              >
                Sadiq<span className="text-electric">.</span>
              </a>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
                IT Expert, Flutter Developer, and Network Security Engineer. 
                Building reliable systems and elegant mobile experiences.
              </p>
              
              {/* Status */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 text-xs font-medium">Available for work</span>
              </div>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="font-display font-semibold text-white mb-4">{group.title}</h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault();
                            scrollToSection(link.href);
                          }
                        }}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-white/60 text-sm hover:text-electric transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Sadiq Awan
            </p>
            
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-electric hover:border-electric/30 hover:bg-electric/10 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
