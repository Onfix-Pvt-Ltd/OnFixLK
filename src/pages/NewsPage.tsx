import React, { useState } from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { Calendar, Clock, ArrowRight, Star, Mail } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const articles = [
    {
      id: 'custom-vs-shelf',
      tag: 'TECHNICAL BUILD',
      title: 'The Hidden Costs of Off-the-Shelf Tools: Why Custom Software Wins',
      desc: 'Many businesses buy standard SaaS products only to find themselves paying for features they do not use, while struggling with disconnected data pipelines. We break down the long-term ROI of bespoke database architectures.',
      date: 'June 18, 2026',
      readTime: '5 min read'
    },
    {
      id: 'hospitality-web-trends',
      tag: 'WEB & MOBILE',
      title: 'Modern Web Trends Transforming the Hospitality Sector in 2026',
      desc: 'From tableside QR ordering menus to automatic room charging integrations, discover how luxury hospitality brands are eliminating transaction latency to improve guest satisfaction scores.',
      date: 'June 10, 2026',
      readTime: '4 min read'
    },
    {
      id: 'company-growth-milestone',
      tag: 'COMPANY NEWS',
      title: 'Onfix Expands Engineering Node Network & Welcomes New Talent',
      desc: 'We are excited to announce our continuous hiring growth and the successful commissioning of our new Southeast Asian edge routing node arrays to handle growing transaction concurrency.',
      date: 'May 29, 2026',
      readTime: '3 min read'
    }
  ];

  return (
    <div className="animate-fade">
      <SEOHelper 
        title="Onfix News & Engineering Bulletins" 
        description="Stay up to date with modern software trends, AI-driven automation insights, case studies, and engineering updates from Onfix."
      />

      {/* Hero Header */}
      <section className="py-20 bg-[radial-gradient(circle_at_50%_50%,rgba(23,23,23,1)_0%,rgba(30,30,30,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ONFIX NEWSROOM</span>
          <h1 className="text-[3rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-5 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">Thought Leadership & Updates</h1>
          <p className="max-w-[700px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            Insights on business automation, operational efficiency, systems integration, and engineering excellence.
          </p>
        </div>
      </section>

      {/* Articles & Newsletter Grid */}
      <section className="py-20 bg-bg-light">
        <div className="container grid grid-cols-[1.35fr_0.65fr] max-[991px]:grid-cols-1 gap-[50px]">
          
          {/* Left Column: Articles */}
          <div className="flex flex-col gap-12">
            
            {/* Featured Article Section */}
            <ScrollReveal>
              <div>
                <h2 className="text-[1.2rem] font-heading font-extrabold mb-6 text-text-dark border-b border-border-light pb-3.5 uppercase tracking-[1px]">Featured Article</h2>
                
                <Card variant="light" hoverEffect={false} className="!p-0 overflow-hidden shadow-medium border border-border-light bg-bg-card">
                  <div className="h-[280px] max-[767px]:h-[220px] bg-gradient-to-br from-accent to-[#1c1c1c] p-8 flex flex-col justify-between relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/75 after:to-transparent after:z-1">
                    <div className="relative z-2 self-start bg-accent text-white text-[0.7rem] font-extrabold px-3.5 py-1.5 rounded-pill flex items-center gap-1.5 tracking-[1px] uppercase">
                      <Star size={12} fill="currentColor" />
                      <span>THOUGHT LEADERSHIP</span>
                    </div>
                    <div className="relative z-2 text-white">
                      <span className="flex items-center gap-1.5 text-[0.75rem] opacity-80 mb-2 font-mono"><Calendar size={12} /> June 22, 2026</span>
                      <h3 className="text-[1.8rem] max-[767px]:text-[1.4rem] font-heading font-extrabold leading-tight">
                        How AI-Driven Automation is Saving Retail Operations 15+ Hours a Week
                      </h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-text-muted-dark text-[0.98rem] leading-[1.6] mb-6">
                      By integrating LLM parser networks and automated invoice scrapers directly into backend inventories, retail operators are eliminating manual spreadsheet data entries entirely. In our latest rollout, automation ledgers saved store managers over two workdays per week, reducing compliance errors to absolute zero.
                    </p>
                    <div className="flex justify-between items-center border-t border-border-light pt-5">
                      <span className="text-[0.8rem] text-text-muted-dark font-mono flex items-center gap-1.5"><Clock size={12} /> 6 min read</span>
                      <Button variant="secondary" icon={<ArrowRight size={14} />}>
                        Read Article
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>

            {/* Recent Updates Grid */}
            <ScrollReveal delay={100}>
              <div>
                <h2 className="text-[1.2rem] font-heading font-extrabold mb-6 text-text-dark border-b border-border-light pb-3.5 uppercase tracking-[1px]">Recent Updates</h2>
                <div className="grid grid-cols-1 gap-6">
                  {articles.map((art) => (
                    <Card key={art.id} variant="light" hoverEffect={true} className="border border-border-light bg-bg-card flex flex-col items-start !p-7">
                      <span className="inline-block text-[0.7rem] font-extrabold text-accent mb-3 tracking-[1.2px] uppercase font-mono">{art.tag}</span>
                      <h3 className="text-[1.3rem] font-heading font-bold text-text-dark mb-3 leading-[1.4] hover:text-accent transition-colors duration-150 cursor-pointer">{art.title}</h3>
                      <p className="text-[0.92rem] text-text-muted-dark leading-[1.6] mb-5 grow">{art.desc}</p>
                      <div className="flex justify-between items-center w-full text-[0.78rem] text-text-muted-dark border-t border-border-light/60 pt-4.5 font-mono">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {art.date}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {art.readTime}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Newsletter Subscription Sidebar */}
          <div>
            <ScrollReveal delay={150}>
              <div className="sticky top-[110px]">
                <Card variant="dark" hoverEffect={false} className="!bg-[#1c1c1c] border border-border-dark flex flex-col p-8 rounded-large">
                  <div className="mb-5 p-3.5 bg-accent/8 w-fit rounded-medium text-accent">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-[1.3rem] font-heading font-bold text-white mb-3">Newsletter</h3>
                  <p className="text-[0.88rem] text-text-muted-light leading-[1.6] mb-6">
                    Join tech leaders subscribing to our operational efficiency updates, system design writeups, and engineering bulletins.
                  </p>

                  {subscribed ? (
                    <div className="flex items-center gap-2.5 text-[#10B981] font-semibold text-[0.9rem] bg-[#10B981]/5 border border-[#10B981]/20 p-4 rounded-medium font-body">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#10B981]/15 text-[0.75rem]">✓</span>
                      <span>Subscription successful!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                      <input 
                        type="email"
                        required
                        placeholder="business@company.com"
                        className="bg-[#111] border border-[#2d2d2d] rounded-medium p-3.5 text-[0.9rem] text-white focus:outline-none focus:border-accent font-body w-full transition-all duration-150"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button type="submit" variant="accent" className="w-full justify-center text-[0.9rem] py-3.5">
                        Subscribe Now
                      </Button>
                    </form>
                  )}
                </Card>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>
    </div>
  );
};
