import React from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { 
  ArrowRight,
  Smartphone, Cpu, Monitor, Network,
  Zap, TrendingUp, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      icon: <Smartphone size={24} className="text-accent" />,
      title: 'Custom Apps',
      desc: 'Mobile-first platforms and specialized business applications built around how your users and teams behave.'
    },
    {
      icon: <Cpu size={24} className="text-accent" />,
      title: 'Automated Workflows',
      desc: 'Put repetitive processes on autopilot. Save engineering and operational time by removing double-entry tasks.'
    },
    {
      icon: <Monitor size={24} className="text-accent" />,
      title: 'Web Platforms',
      desc: 'Blazing-fast responsive interfaces built on lightweight frameworks ensuring sub-millisecond edge load times.'
    },
    {
      icon: <Network size={24} className="text-accent" />,
      title: 'System Integration',
      desc: 'Bridging payment processors, inventory databases, accounting books, and delivery trackers into one hub.'
    }
  ];

  const values = [
    {
      icon: <Zap size={24} className="text-accent" />,
      title: 'Speed & Efficiency',
      desc: 'We prioritize performance above all. Our databases eliminate write-locks, and our clients experience zero buffer times.'
    },
    {
      icon: <TrendingUp size={24} className="text-accent" />,
      title: 'Scalability',
      desc: 'We architect software to expand effortlessly. Our modular codebases support massive spikes in concurrent traffic without breaking.'
    },
    {
      icon: <Layers size={24} className="text-accent" />,
      title: 'Clean Engineering',
      desc: 'We write clear, self-documenting code and build sovereign database layers, completely bypassing heavy legacy wrappers.'
    }
  ];

  return (
    <div className="animate-fade">
      <SEOHelper 
        title="About Us — Software Engineering & Systems Integration" 
        description="Learn how Onfix accelerates business growth through integrated systems, custom apps, automated workflows, and sovereign engineering."
      />

      {/* Hero Section */}
      <section className="py-24 bg-[radial-gradient(circle_at_90%_10%,rgba(23,23,23,1)_0%,rgba(35,35,35,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ABOUT ONFIX</span>
          <h1 className="text-[3.2rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent leading-[1.1] tracking-[-1.5px] max-w-[900px] mx-auto">
            We Accelerate Business Growth Through Modern Software & Automation
          </h1>
          <p className="max-w-[700px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            Onfix is a systems engineering group. We help modern enterprises eliminate manual overhead, unify data streams, and build trust through fast, robust software.
          </p>
        </div>
      </section>

      {/* The Problem & Solution (Our 'Why') */}
      <section className="py-24 bg-bg-light border-b border-border-light">
        <div className="container grid grid-cols-2 max-[991px]:grid-cols-1 gap-[60px] items-center">
          
          <ScrollReveal>
            <div>
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">OUR WHY</span>
              <h2 className="text-[2.2rem] font-heading font-extrabold mb-5 text-text-dark tracking-[-0.5px]">
                Eliminating the Friction of Fragmented Tools
              </h2>
              <p className="text-[1.05rem] leading-[1.7] text-text-muted-dark mb-6">
                Most modern businesses are slowed down by the very systems designed to help them. Data gets trapped in isolated tools — CRM, inventory POS, billing ledgers, and shipping trackers — creating bottlenecks, manual double-entry, and processing delays.
              </p>
              <p className="text-[1.05rem] leading-[1.7] text-text-muted-dark mb-6">
                Onfix was founded to bridge this gap. We bypass clunky wrappers and integrate systems directly on top of lock-free edge databases. The result is a single source of truth, enabling operations to run instantly, securely, and seamlessly.
              </p>
              <div className="flex gap-4 items-center">
                <Link to="/services">
                  <Button variant="accent" icon={<ArrowRight size={14} />}>
                    Explore our services
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="relative">
              {/* Comparative Visual Box */}
              <Card variant="light" hoverEffect={false} className="!p-0 border border-border-light shadow-medium overflow-hidden">
                <div className="bg-bg-light px-5 py-4 border-b border-border-light font-heading font-bold text-[0.85rem] text-text-dark uppercase tracking-[0.5px]">
                  System Comparison
                </div>
                <div className="p-6 bg-bg-card flex flex-col gap-5">
                  <div className="border border-red-500/20 bg-red-500/5 p-4 rounded-medium flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg leading-none shrink-0 font-mono">✗</span>
                    <div>
                      <h4 className="font-bold text-[0.95rem] text-text-dark">Fragmented System</h4>
                      <p className="text-[0.82rem] text-text-muted-dark mt-1 leading-[1.4]">
                        Manual CSV syncs, double-entry inventory updates, POS timeouts, and delayed accounting updates.
                      </p>
                    </div>
                  </div>
                  <div className="border border-accent/20 bg-accent/5 p-4 rounded-medium flex items-start gap-3">
                    <span className="text-accent font-bold text-lg leading-none shrink-0 font-mono">✓</span>
                    <div>
                      <h4 className="font-bold text-[0.95rem] text-text-dark">Onfix Integrated Core</h4>
                      <p className="text-[0.82rem] text-text-muted-dark mt-1 leading-[1.4]">
                        Sub-millisecond transactions, zero database row locking, automated recipe depletion, and automatic ledger updates.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Core Pillars/Services */}
      <section className="py-24 bg-bg-card border-b border-border-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,94,0,0.02)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="container relative z-2">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">CORE PILLARS</span>
              <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">The Foundation of Our Architecture</h2>
              <p className="max-w-[700px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
                We build clean, robust solutions around four core areas, delivering software that scales natively.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-4 max-[1100px]:grid-cols-2 max-[767px]:grid-cols-1 gap-6">
            {pillars.map((p, idx) => (
              <ScrollReveal key={idx} delay={100 + idx * 100}>
                <Card variant="light" hoverEffect={true} className="h-full border border-border-light bg-bg-light flex flex-col justify-start">
                  <div className="mb-5 p-3.5 bg-accent/8 w-fit rounded-medium">
                    {p.icon}
                  </div>
                  <h3 className="text-[1.2rem] font-extrabold mb-3 text-text-dark font-heading">{p.title}</h3>
                  <p className="text-[0.88rem] leading-[1.6] text-text-muted-dark">{p.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Culture/Values */}
      <section className="py-24 bg-bg-light">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ENGINEERING CULTURE</span>
              <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">Values That Drive Excellence</h2>
              <p className="max-w-[700px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
                Our culture is rooted in rigorous engineering standards, performance optimization, and clean architecture.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-3 max-[991px]:grid-cols-1 gap-8 mt-10">
            {values.map((v, idx) => (
              <ScrollReveal key={idx} delay={100 + idx * 100}>
                <Card variant="light" hoverEffect={false} className="h-full border border-border-light bg-bg-card flex flex-col items-center text-center p-[40px_30px] rounded-large">
                  <div className="mb-6 p-4 bg-accent/8 w-fit rounded-full text-accent">
                    {v.icon}
                  </div>
                  <h3 className="text-[1.25rem] font-extrabold mb-4.5 text-text-dark">{v.title}</h3>
                  <p className="text-[0.9rem] leading-[1.6] text-text-muted-dark">{v.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Unified CTA Section */}
      <section className="relative overflow-hidden text-center bg-accent py-[100px] text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_70%)] pointer-events-none" aria-hidden="true"></div>
        <div className="container relative z-2">
          <ScrollReveal>
            <div className="max-w-[750px] mx-auto">
              <h2 className="text-[2.5rem] max-[991px]:text-[2rem] font-[850] mb-5 tracking-[-1px]">Accelerate your operations today</h2>
              <p className="text-[1.12rem] text-white/80 leading-[1.7] mb-10">
                Let's discuss how we can integrate your tools and automate workflows. We provide direct access to our core systems engineering group for consultations.
              </p>
              <div className="flex justify-center items-center gap-4 max-[767px]:flex-col max-[767px]:w-full [&>a]:max-[767px]:w-full">
                <Link to="/contact">
                  <Button variant="primary" className="!bg-white !text-accent !border-2 !border-white !font-extrabold hover:!bg-[#fff5f0] hover:!text-[#e04e00] hover:!border-[#fff5f0] hover:-translate-y-0.5 active:translate-y-0" icon={<ArrowRight size={18} />}>
                    Get in touch
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="secondary" className="!border-white/45 !text-white !bg-white/15 hover:!bg-white/28 hover:!border-white/80">
                    See what we build
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
