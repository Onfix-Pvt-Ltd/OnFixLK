import React from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { 
  Smartphone, Cpu, Monitor, Network,
  Zap, TrendingUp, Layers, ArrowRight,
  Code, Server, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      icon: <Smartphone size={24} className="text-accent" />,
      title: 'Modernizing Commerce',
      desc: 'Equipping local dining, retail, and hospitality outlets with high-performance POS setups, custom booking tools, and digital checkouts.'
    },
    {
      icon: <Cpu size={24} className="text-accent" />,
      title: 'Automated Workflows',
      desc: 'Putting repetitive processes on autopilot, saving hours of manual data entry and stock tracking for local operations.'
    },
    {
      icon: <Monitor size={24} className="text-accent" />,
      title: 'Global Web Standards',
      desc: 'Building ultra-fast, responsive websites and web applications that allow local brands to represent themselves on a global stage.'
    },
    {
      icon: <Network size={24} className="text-accent" />,
      title: 'Systems Integration',
      desc: 'Connecting payment gateways (like Stripe and PayHere), SMS alerts, accounting tools, and delivery APIs into one cohesive hub.'
    }
  ];

  const values = [
    {
      icon: <Zap size={24} className="text-accent" />,
      title: 'Renovation & Growth',
      desc: 'We replace slow, manual systems with instant, digital equivalents. We help Sri Lankan businesses scale, adapt, and run at peak efficiency.'
    },
    {
      icon: <TrendingUp size={24} className="text-accent" />,
      title: 'Scalable Engineering',
      desc: 'We write modular, robust code using serverless edge hosting (like AWS and Vercel) so your applications load instantly from anywhere.'
    },
    {
      icon: <Layers size={24} className="text-accent" />,
      title: 'Transparent Standards',
      desc: 'We build with clean, self-documenting code, follow OWASP security standards, and focus on delivering honest value to our clients.'
    }
  ];

  const techStack = [
    {
      category: 'Frontend & UIs',
      icon: <Monitor className="text-accent" size={20} />,
      items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS']
    },
    {
      category: 'Backends & Services',
      icon: <Code className="text-accent" size={20} />,
      items: ['Node.js', 'Go', 'Python (FastAPI)']
    },
    {
      category: 'Databases & Cache',
      icon: <Database className="text-accent" size={20} />,
      items: ['PostgreSQL', 'MongoDB', 'Redis']
    },
    {
      category: 'Cloud & Operations',
      icon: <Server className="text-accent" size={20} />,
      items: ['Vercel', 'AWS Edge', 'Docker', 'Git / GitHub']
    }
  ];

  return (
    <div className="animate-fade">
      <SEOHelper 
        title="About Us — Renovating & Innovating Sri Lankan Software" 
        description="Learn how Onfix renovates Sri Lanka's business landscape through modern software development, API integrations, and workflow automation."
      />

      {/* Hero Section */}
      <section className="py-24 bg-[radial-gradient(circle_at_90%_10%,rgba(23,23,23,1)_0%,rgba(35,35,35,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ABOUT ONFIX</span>
          <h1 className="text-[3.2rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent leading-[1.1] tracking-[-1.5px] max-w-[950px] mx-auto">
            Renovating & Innovating Sri Lanka's Business Landscape
          </h1>
          <p className="max-w-[750px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            Onfix is a Sri Lankan software development company. We are dedicated to modernizing local business operations, automating workflows, and building world-class web applications using cutting-edge technology.
          </p>
        </div>
      </section>

      {/* The Problem & Solution (Our 'Why') */}
      <section className="py-24 bg-bg-light border-b border-border-light">
        <div className="container grid grid-cols-2 max-[991px]:grid-cols-1 gap-[60px] items-center">
          
          <ScrollReveal>
            <div>
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">OUR MISSION</span>
              <h2 className="text-[2.2rem] font-heading font-extrabold mb-5 text-text-dark tracking-[-0.5px]">
                Eliminating Operational Friction
              </h2>
              <p className="text-[1.05rem] leading-[1.7] text-text-muted-dark mb-6">
                Many businesses in Sri Lanka are held back by fragmented systems and manual overhead. Important records get trapped in paper logs, isolated spreadsheets, or outdated tools—causing inventory delays, processing errors, and bookkeeping bottlenecks.
              </p>
              <p className="text-[1.05rem] leading-[1.7] text-text-muted-dark mb-6">
                Onfix renovates these traditional workflows. We build integrated, custom software that connects your databases, online sales, SMS alerts, and payment gateways into a single secure platform. This saves operational hours and ensures you always have a single source of truth.
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
                  Traditional vs Renovated Workflow
                </div>
                <div className="p-6 bg-bg-card flex flex-col gap-5">
                  <div className="border border-red-500/20 bg-red-500/5 p-4 rounded-medium flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg leading-none shrink-0 font-mono">✗</span>
                    <div>
                      <h4 className="font-bold text-[0.95rem] text-text-dark">Traditional Friction</h4>
                      <p className="text-[0.82rem] text-text-muted-dark mt-1 leading-[1.4]">
                        Manual CSV exports, disconnected databases, physical stock counting, and delayed invoicing.
                      </p>
                    </div>
                  </div>
                  <div className="border border-accent/20 bg-accent/5 p-4 rounded-medium flex items-start gap-3">
                    <span className="text-accent font-bold text-lg leading-none shrink-0 font-mono">✓</span>
                    <div>
                      <h4 className="font-bold text-[0.95rem] text-text-dark">Onfix Renovated Core</h4>
                      <p className="text-[0.82rem] text-text-muted-dark mt-1 leading-[1.4]">
                        Real-time API sync, optimized database queries, automated workflow alerts, and instant dashboard updates.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-24 bg-bg-card border-b border-border-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,94,0,0.02)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="container relative z-2">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">HOW WE HELP</span>
              <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">Pillars of Digital Renovation</h2>
              <p className="max-w-[700px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
                We build clean, robust digital products focused on modernizing operations and enabling businesses to grow.
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

      {/* Tech Stack Section (New) */}
      <section className="py-24 bg-bg-light border-b border-border-light relative">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">OUR TOOLKIT</span>
              <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">Modern Technology Stack</h2>
              <p className="max-w-[700px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
                We build custom solutions using secure, standardized, and highly optimized frameworks to ensure long-term stability.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-4 max-[1100px]:grid-cols-2 max-[767px]:grid-cols-1 gap-6">
            {techStack.map((stack, idx) => (
              <ScrollReveal key={idx} delay={100 + idx * 100}>
                <Card variant="light" hoverEffect={false} className="h-full border border-border-light bg-bg-card flex flex-col p-6 rounded-large">
                  <div className="flex items-center gap-3.5 mb-5 border-b border-border-light pb-4">
                    {stack.icon}
                    <h3 className="text-[1.05rem] font-extrabold text-text-dark">{stack.category}</h3>
                  </div>
                  <ul className="list-none flex flex-col gap-2.5 p-0 m-0">
                    {stack.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-[0.88rem] text-text-muted-dark font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sri Lanka & Our Impact */}
      <section className="py-24 bg-bg-light">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">OUR FOUNDATION</span>
              <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">Engineering Value, Locally & Globally</h2>
              <p className="max-w-[700px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
                We combine Sri Lanka's top development and design talent to ship robust software.
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
              <h2 className="text-[2.5rem] max-[991px]:text-[2rem] font-[850] mb-5 tracking-[-1px]">Innovate your operations today</h2>
              <p className="text-[1.12rem] text-white/80 leading-[1.7] mb-10">
                Let's discuss how we can build, integrate, and renovate your business workflows using modern web technologies.
              </p>
              <div className="flex justify-center items-center gap-4 max-[767px]:flex-col max-[767px]:w-full [&>a]:max-[767px]:w-full">
                <Link to="/contact">
                  <Button variant="primary" className="!bg-white !text-accent !border-2 !border-white !font-extrabold hover:!bg-[#fff5f0] hover:!text-[#e04e00] hover:!border-[#fff5f0] hover:-translate-y-0.5 active:translate-y-0" icon={<ArrowRight size={18} />}>
                    Get in touch
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="secondary" className="!border-white/45 !text-white !bg-white/15 hover:!bg-white/28 hover:!border-white/80">
                    See our portfolio
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
