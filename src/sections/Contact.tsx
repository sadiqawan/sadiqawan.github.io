import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sadiqawan.xpert@gmail.com',
    href: 'mailto:sadiqawan.xpert@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 318 9289196',
    href: 'tel:+923189289196',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Islamabad, Pakistan',
    href: '#',
  },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/sadiqawan' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/sadiqawan' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/sadiqawan' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form entrance animation
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info cards
      const infoCards = sectionRef.current?.querySelectorAll('.info-card');
      infoCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
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

  // Orb animation based on focused field
  useEffect(() => {
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        scale: focusedField ? 1.5 : 1,
        opacity: focusedField ? 0.3 : 0.15,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [focusedField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 section-padding overflow-hidden"
    >
      {/* Background Orb */}
      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-electric opacity-15 blur-[100px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-electric text-sm font-medium uppercase tracking-wider">Get In Touch</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mt-2 mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="info-card flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-electric/30 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-electric/10 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                    <info.icon className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <span className="text-white/50 text-sm">{info.label}</span>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-white/50 text-sm mb-4 block">Connect with me</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-electric hover:border-electric/30 hover:bg-electric/10 transition-all duration-300"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="glass-card rounded-xl p-4 border-l-4 border-green-500">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <span className="text-white font-medium">Available for freelance</span>
                  <p className="text-white/50 text-sm">Typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card rounded-xl p-6 lg:p-8 border border-white/5"
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">Message Sent!</h3>
                  <p className="text-white/60">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="input-underline">
                      <label className="block text-white/60 text-sm mb-2 transition-colors group-focus-within:text-electric">
                        Your Name
                      </label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        required
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-electric transition-colors"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="input-underline">
                      <label className="block text-white/60 text-sm mb-2">
                        Your Email
                      </label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        required
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-electric transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="input-underline">
                    <label className="block text-white/60 text-sm mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      placeholder="Project Inquiry"
                      required
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-electric transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="input-underline">
                    <label className="block text-white/60 text-sm mb-2">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      required
                      rows={5}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-electric transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-electric hover:bg-electric-light text-white font-semibold py-6 group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
