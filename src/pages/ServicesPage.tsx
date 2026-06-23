import React from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { 
  ArrowRight, Globe, Code, Sparkles, Share2, 
  CheckCircle2, Laptop, Database, Cpu, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 'web-apps',
      icon: <Globe className="text-accent" size={36} />,
      title: 'Websites & Apps',
      tagline: 'High-performance user interfaces',
      description: 'Fast, modern websites and native mobile applications that look spectacular, operate with zero latency, and are engineered to convert visitors into loyal customers.',
      details: [
        'React, Next.js, and TypeScript single-page architectures.',
        'iOS & Android native apps built via lightweight runtimes.',
        'Fluid UX transitions and customized micro-interactions.',
        'Fully responsive layouts optimized for core web vitals.'
      ],
      techBadge: 'React / Next.js / React Native'
    },
    {
      id: 'custom-software',
      icon: <Code className="text-accent" size={36} />,
      title: 'Custom Software',
      tagline: 'Tools engineered around your operations',
      description: 'Internal systems, POS networks, inventory ledgers, and bespoke tools designed from the ground up to match the exact mechanics of your business.',
      details: [
        'Hospitality POS systems with tableside ordering queues.',
        'FIFO inventory depletion ledgers and auto-procurement.',
        'Internal employee portals and live performance trackers.',
        'High-density dashboard interfaces with custom analytics.'
      ],
      techBadge: 'Node.js / Go / PostgreSQL'
    },
    {
      id: 'ai-automation',
      icon: <Sparkles className="text-accent" size={36} />,
      title: 'AI & Automation',
      tagline: 'Intelligent workflow simplification',
      description: 'Integrate artificial intelligence directly into your daily routine. Automate repetitive workloads, deploy 24/7 customer service agents, and extract decision-making analytics.',
      details: [
        'LLM integrations and localized retrieval-augmented generation (RAG).',
        'Automatic invoice parsing and financial data ingestion.',
        'Smart customer agents handling bookings and queries.',
        'Repetitive workflow triggers saving 15+ operational hours weekly.'
      ],
      techBadge: 'Python / LangChain / OpenAI APIs'
    },
    {
      id: 'integrations',
      icon: <Share2 className="text-accent" size={36} />,
      title: 'Integrations',
      tagline: 'Unified data routing gateways',
      description: 'Connect the services your business already relies on — merchant payments, shipping API networks, accounting books, and CRM tools — into a synchronized database.',
      details: [
        'Stripe, PayHere, and global gateway payment rails.',
        'Accounting synchronization with QuickBooks and Xero ledgers.',
        'Global delivery routing integrations (Uber, local logistics).',
        'Secure OAuth 2.0 API gateway access points for partners.'
      ],
      techBadge: 'REST / GraphQL / Secure Webhooks'
    }
  ];

  const pipelineSteps = [
    {
      num: '01',
      title: 'Systems Audit',
      desc: 'We analyze your current tools, databases, and bottlenecks to propose a clean, integrated solution.'
    },
    {
      num: '02',
      title: 'UX Architecture',
      desc: 'We map out custom wireframes and interactive prototypes focusing on speed and usability.'
    },
    {
      num: '03',
      title: 'Custom Engineering',
      desc: 'Our developers build your software using lock-free databases and high-performance frameworks.'
    },
    {
      num: '04',
      title: 'Continuous Support',
      desc: 'We provide SLA-backed maintenance, server monitoring, and regular feature updates.'
    }
  ];

  return (
    <div className="animate-fade">
      <SEOHelper 
        title="Software Engineering & Integration Services" 
        description="Onfix Pvt Ltd builds high-performance Websites, Mobile Apps, Custom ERP Systems, AI-driven Automations, and secure API Integrations."
      />

      {/* Hero Header */}
      <section className="py-20 bg-[radial-gradient(circle_at_50%_50%,rgba(23,23,23,1)_0%,rgba(30,30,30,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">OUR CAPABILITIES</span>
          <h1 className="text-[3rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-5 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">Software Solutions, End to End</h1>
          <p className="max-w-[700px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            Whether you need a modern web presence, a custom operational system, workflow automation, or api bridges — we design, build, and support it.
          </p>
        </div>
      </section>

      {/* Detailed Services Layout */}
      <section className="py-20 bg-bg-light">
        <div className="container flex flex-col gap-24">
          {services.map((svc, index) => (
            <ScrollReveal key={svc.id} delay={100 + index * 50}>
              <div className="grid grid-cols-[1fr_1.1fr] max-[991px]:grid-cols-1 gap-[60px] items-center">
                
                {/* Left Side: Illustration / Card */}
                <div className={index % 2 === 1 ? 'min-[992px]:order-2' : ''}>
                  <Card variant="light" hoverEffect={false} className="relative !p-0 overflow-hidden shadow-medium border border-border-light group">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none z-0"></div>
                    <div className="bg-bg-light px-5 py-3.5 flex items-center gap-2 border-b border-border-light relative z-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                      <span className="text-[0.75rem] font-bold text-text-muted-dark ml-2 uppercase tracking-[0.5px] font-mono">{svc.techBadge}</span>
                    </div>
                    <div className="p-8 relative z-1 flex flex-col gap-6 min-h-[300px] justify-center bg-bg-card">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/10 rounded-medium text-accent">
                          {svc.icon}
                        </div>
                        <div>
                          <h4 className="text-[1.25rem] font-extrabold text-text-dark">{svc.title} Core</h4>
                          <span className="text-[0.78rem] font-bold text-accent uppercase tracking-[0.5px] block mt-0.5">Active Sandbox Mode</span>
                        </div>
                      </div>
                      
                      <div className="bg-[#111] p-5 rounded-medium font-mono text-[0.8rem] text-[#00ff66] border border-[#222]">
                        <div className="flex justify-between items-center opacity-50 border-b border-[#222] pb-2.5 mb-2.5 text-white">
                          <span>api_gateway_telemetry.log</span>
                          <span className="flex items-center gap-1"><Cpu size={12} /> Edge Online</span>
                        </div>
                        <div className="space-y-1">
                          <div>&gt; onfix init --module {svc.id}</div>
                          <div className="text-white">&gt; [OK] Module successfully compiled.</div>
                          <div>&gt; latency check: 12ms (via sg-node-02)</div>
                          <div>&gt; buffer utilization: 0.02%</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Right Side: Service Info */}
                <div className={index % 2 === 1 ? 'min-[992px]:order-1' : ''}>
                  <div className="inline-flex items-center gap-2 text-[0.8rem] font-bold tracking-[1px] text-accent uppercase mb-4">
                    {svc.icon}
                    <span>{svc.tagline}</span>
                  </div>
                  <h3 className="text-[2.2rem] max-[767px]:text-[1.8rem] font-extrabold mb-5 tracking-[-0.5px] text-text-dark">{svc.title}</h3>
                  <p className="text-[1.1rem] leading-[1.7] text-text-muted-dark mb-6">
                    {svc.description}
                  </p>
                  <div className="grid grid-cols-1 gap-3.5 mb-8">
                    {svc.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-accent mt-0.5 shrink-0" />
                        <span className="text-[0.95rem] text-text-dark leading-[1.5]">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact">
                    <Button variant="accent" icon={<ArrowRight size={16} />}>
                      Request Service Review
                    </Button>
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Production Pipeline Process */}
      <section className="py-24 border-t border-b border-border-light bg-bg-card relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(255,94,0,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container relative z-2">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">OUR PROCESS</span>
              <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">How We Engineer Software</h2>
              <p className="max-w-[650px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
                From initial systems audit to ongoing maintenance, our process ensures zero delays, clear architecture, and maximum uptime.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-4 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1 gap-8 mt-12">
            {pipelineSteps.map((step, idx) => (
              <ScrollReveal key={idx} delay={100 + idx * 100}>
                <Card variant="light" hoverEffect={true} className="h-full border border-border-light flex flex-col items-start bg-bg-light relative pt-12">
                  <span className="absolute top-4 right-6 font-mono text-[3rem] font-extrabold text-accent/10 select-none leading-none">{step.num}</span>
                  <h3 className="text-[1.18rem] font-extrabold mb-3 text-text-dark">{step.title}</h3>
                  <p className="text-[0.88rem] leading-[1.6] text-text-muted-dark grow">{step.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-20 text-center bg-accent text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[size:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] pointer-events-none"></div>
        <div className="container relative z-2">
          <ScrollReveal>
            <div className="max-w-[750px] mx-auto">
              <h2 className="text-[2.5rem] max-[767px]:text-[2rem] font-[850] mb-5 tracking-[-0.8px]">Ready to build something fast?</h2>
              <p className="text-[1.12rem] text-white/80 leading-[1.6] mb-8">
                Consult with our engineering group today. We will audit your current workflow stack and outline a high-performance roadmap with a clear, honest quote.
              </p>
              <Link to="/contact">
                <Button variant="primary" className="!bg-white !text-accent !border-2 !border-white !font-extrabold hover:!bg-[#fff5f0] hover:!text-[#e04e00] hover:!border-[#fff5f0] hover:-translate-y-0.5 active:translate-y-0" icon={<ArrowRight size={18} />}>
                  Get a Free Consultation
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
