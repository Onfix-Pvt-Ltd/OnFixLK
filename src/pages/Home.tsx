import React from 'react';
import { Hero } from '../sections/Hero';
import { Telemetry } from '../sections/Telemetry';
import { SEOHelper } from '../components/common/SEOHelper';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { ArrowRight, Globe, Code, Sparkles, Share2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="animate-fade">
      <SEOHelper 
        title="High-Performance Enterprise Software & ERP Systems" 
        description="Onfix Pvt Ltd engineers zero-latency databases, hospitality POS systems, and scalable cloud ERP networks for industry leaders."
      />
      
      <Hero />
      
      <ScrollReveal delay={100}>
        <Telemetry />
      </ScrollReveal>

      {/* What we do — plain-language services */}
      <section className="bg-gradient-to-br from-bg-light to-bg-card-hover/20 border-t border-b border-border-light relative py-[100px]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">WHAT WE DO</span>
              <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">Software solutions, end to end</h2>
              <p className="max-w-[700px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
                Whether you need a website, a custom app, smarter automation, or your tools talking to each other — we design, build, and support it for you.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-4 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1 gap-6 mt-[50px] relative z-5">
            <ScrollReveal delay={100} className="h-full">
              <Card variant="light" hoverEffect={false} className="flex flex-col h-full border border-border-light shadow-subtle p-[36px_30px] rounded-large transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:!border-accent hover:!shadow-[0_20px_45px_rgba(255,94,0,0.10)]">
                <div className="mb-6">
                  <Globe className="text-accent" size={30} />
                </div>
                <h3 className="text-[1.25rem] font-heading font-extrabold mb-3.5 text-text-dark">Websites &amp; Apps</h3>
                <p className="text-text-muted-dark text-[0.92rem] leading-[1.6] mb-[30px] grow">Fast, modern websites and mobile apps that look great and are easy for your customers to use.</p>
                <Link to="/products" className="inline-flex items-center gap-2 text-accent font-bold text-[0.9rem] transition-all duration-300 ease-out hover:gap-3.5 hover:text-[#e05300]">
                  <span>See what we build</span> <ArrowRight size={14} />
                </Link>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={200} className="h-full">
              <Card variant="light" hoverEffect={false} className="flex flex-col h-full border border-border-light shadow-subtle p-[36px_30px] rounded-large transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:!border-accent hover:!shadow-[0_20px_45px_rgba(255,94,0,0.10)]">
                <div className="mb-6">
                  <Code className="text-accent" size={30} />
                </div>
                <h3 className="text-[1.25rem] font-heading font-extrabold mb-3.5 text-text-dark">Custom Software</h3>
                <p className="text-text-muted-dark text-[0.92rem] leading-[1.6] mb-[30px] grow">Tools built around how you actually work — POS, inventory, dashboards, and internal systems made just for your team.</p>
                <Link to="/products" className="inline-flex items-center gap-2 text-accent font-bold text-[0.9rem] transition-all duration-300 ease-out hover:gap-3.5 hover:text-[#e05300]">
                  <span>Explore our products</span> <ArrowRight size={14} />
                </Link>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={300} className="h-full">
              <Card variant="light" hoverEffect={false} className="flex flex-col h-full border border-border-light shadow-subtle p-[36px_30px] rounded-large transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:!border-accent hover:!shadow-[0_20px_45px_rgba(255,94,0,0.10)]">
                <div className="mb-6">
                  <Sparkles className="text-accent" size={30} />
                </div>
                <h3 className="text-[1.25rem] font-heading font-extrabold mb-3.5 text-text-dark">AI &amp; Automation</h3>
                <p className="text-text-muted-dark text-[0.92rem] leading-[1.6] mb-[30px] grow">Put AI to work: automate repetitive tasks, answer customers 24/7, and turn your data into clear decisions.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-accent font-bold text-[0.9rem] transition-all duration-300 ease-out hover:gap-3.5 hover:text-[#e05300]">
                  <span>Talk about your idea</span> <ArrowRight size={14} />
                </Link>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={400} className="h-full">
              <Card variant="light" hoverEffect={false} className="flex flex-col h-full border border-border-light shadow-subtle p-[36px_30px] rounded-large transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:!border-accent hover:!shadow-[0_20px_45px_rgba(255,94,0,0.10)]">
                <div className="mb-6">
                  <Share2 className="text-accent" size={30} />
                </div>
                <h3 className="text-[1.25rem] font-heading font-extrabold mb-3.5 text-text-dark">Integrations</h3>
                <p className="text-text-muted-dark text-[0.92rem] leading-[1.6] mb-[30px] grow">Connect the apps you already use — payments, accounting, delivery — so your data flows automatically, with no double entry.</p>
                <Link to="/products" className="inline-flex items-center gap-2 text-accent font-bold text-[0.9rem] transition-all duration-300 ease-out hover:gap-3.5 hover:text-[#e05300]">
                  <span>Review integrations</span> <ArrowRight size={14} />
                </Link>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned to be unified dark mode */}
      <section className="relative overflow-hidden text-center bg-accent py-[100px]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_70%)] z-[2] pointer-events-none" aria-hidden="true"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[size:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] z-[1] pointer-events-none" aria-hidden="true"></div>
        <div className="container relative z-[3]">
          <ScrollReveal delay={150}>
            <div className="max-w-[800px] mx-auto">
              <h2 className="text-[2.6rem] max-[991px]:text-[2rem] font-[850] mb-5 text-white tracking-[-1px]">Have a project in mind?</h2>
              <p className="text-[1.15rem] text-white/82 leading-[1.7] mb-10">
                Tell us what you need — a website, an app, an AI tool, or all three. We'll talk it through, give you honest advice, and a free quote. No jargon, no pressure.
              </p>
              <div className="flex justify-center items-center gap-4 max-[767px]:flex-col max-[767px]:w-full [&>a]:max-[767px]:w-full">
                <Link to="/contact">
                  <Button variant="primary" className="!bg-white !text-accent !border-2 !border-white !font-extrabold !shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:!bg-[#fff5f0] hover:!text-[#e04e00] hover:!border-[#fff5f0] hover:!shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:translate-y-0" icon={<ArrowRight size={18} />}>
                    Get a free consultation
                  </Button>
                </Link>
                <Link to="/products" className="ml-3 max-[767px]:ml-0 max-[767px]:mt-3">
                  <Button variant="secondary" className="!border-white/45 !text-white !bg-white/15 !backdrop-blur-[8px] hover:!bg-white/28 hover:!border-white/80">
                    See our work
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
