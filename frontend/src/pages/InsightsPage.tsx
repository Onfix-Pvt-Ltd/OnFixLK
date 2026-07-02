import React from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Calendar, ArrowRight, FileText, Cpu, Star } from 'lucide-react';

export const InsightsPage: React.FC = () => {
  const articles = [
    {
      id: 'multibranch-pos',
      tag: 'CASE STUDY',
      title: 'Multi-Branch POS Integration: Modernizing Operations',
      desc: 'How we helped a hospitality provider integrate a central management platform to resolve tableside guest card processing bottlenecks and sync multi-branch menus.',
      date: 'June 02, 2026',
      readTime: '6 min read',
      featured: false,
    },
    {
      id: 'edge-networks',
      tag: 'EDGE DEPLOYMENT',
      title: 'Deploying Web Platforms Globally on Modern Edge Networks',
      desc: 'A breakdown of our serverless deployment architecture that caches static content and routes API calls to the closest edge servers.',
      date: 'May 28, 2026',
      readTime: '4 min read',
      featured: false,
    },
    {
      id: 'security-labs',
      tag: 'SECURITY LABS',
      title: 'Building Secure Applications: Core Practices for Modern Startups',
      desc: 'An overview of the security protocols we implement by default, from secure JWT-based authentication to Stripe integration standards.',
      date: 'May 14, 2026',
      readTime: '3 min read',
      featured: false,
    },
  ];

  const bulletins = [
    { version: 'v1.2.1-patch', date: 'June 08, 2026', note: 'Optimized response parsing in checkout webhook integrations.' },
    { version: 'v1.2.0-release', date: 'May 20, 2026', note: 'Public launch of Onfix custom boilerplate frameworks for startup apps.' },
    { version: 'v1.1.8-patch', date: 'May 02, 2026', note: 'Implemented rate-limiting and security policies at the edge router.' },
  ];

  return (
    <div className="animate-fade">
      <SEOHelper 
        title="Insights, Bulletins & Case Studies" 
        description="Read Onfix's technical insights, engineering bulletins, security standards, and case studies detailing our custom web applications."
      />

      {/* Hero Header */}
      <section className="py-20 bg-[radial-gradient(circle_at_50%_50%,rgba(23,23,23,1)_0%,rgba(30,30,30,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ONFIX INSIGHTS</span>
          <h1 className="text-[3rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-5 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">Technical Bulletins & Reports</h1>
          <p className="max-w-[700px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            Stay up to date with engineering updates, performance optimization tips, and case studies from our client deployments.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 bg-bg-light">
        <div className="container grid grid-cols-[1.3fr_0.7fr] max-[991px]:grid-cols-1 gap-[50px] max-[991px]:gap-10">
          
          {/* Left Column: News / Blog */}
          <div>
            <h2 className="text-[1.25rem] font-extrabold mb-6 text-text-dark border-b-2 border-border-light pb-3 uppercase tracking-[0.5px]">Featured Release</h2>
            
            {/* Highlighted Featured Post */}
            <Card variant="light" hoverEffect={false} className="!p-0 overflow-hidden shadow-medium border border-border-light">
              <div className="h-[280px] max-[767px]:h-[220px] bg-gradient-to-br from-accent to-[#171717] p-6 flex flex-col justify-between relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/70 after:to-transparent after:z-1">
                <div className="relative z-2 self-start bg-accent text-white text-[0.7rem] font-bold px-3 py-1.5 rounded-pill flex items-center gap-1.5 tracking-[1px]">
                  <Star size={12} fill="currentColor" />
                  <span>CORE RELEASE</span>
                </div>
                <div className="relative z-2 text-white">
                  <span className="flex items-center gap-1.5 text-[0.75rem] opacity-80 mb-2"><Calendar size={12} /> May 20, 2026</span>
                  <h3 className="text-[1.6rem] max-[767px]:text-[1.3rem] font-extrabold leading-tight">Building Scalable Architectures: Achieving Low-Latency APIs</h3>
                </div>
              </div>
              <div className="p-[30px] bg-bg-card">
                <p className="text-text-muted-dark text-[0.95rem] leading-[1.6] mb-6">
                  Our development team has optimized the API response pipeline and data caching layers for our web applications. In live stress tests, this configuration handled high concurrency levels while maintaining an average response time of under 50ms, ensuring pages load quickly and reliably for end-users.
                </p>
                <div className="flex justify-between items-center border-t border-border-light pt-5">
                  <span className="text-[0.8rem] text-text-muted-dark font-medium">5 min read</span>
                  <Button variant="secondary" icon={<ArrowRight size={14} />}>
                    Read Technical Report
                  </Button>
                </div>
              </div>
            </Card>

            <h2 className="text-[1.25rem] font-extrabold mb-6 text-text-dark border-b-2 border-border-light pb-3 uppercase tracking-[0.5px]" style={{ marginTop: '50px' }}>Recent Bulletins</h2>
            <div className="grid grid-cols-1 gap-6">
              {articles.map((art) => (
                <Card key={art.id} variant="light" hoverEffect={false} className="!p-6 border border-border-light">
                  <span className="inline-block text-[0.7rem] font-bold text-accent mb-3 tracking-[1px]">{art.tag}</span>
                  <h3 className="text-[1.25rem] font-[750] text-text-dark mb-3 leading-[1.4]">{art.title}</h3>
                  <p className="text-[0.9rem] text-text-muted-dark leading-[1.6] mb-5">{art.desc}</p>
                  <div className="flex justify-between text-[0.75rem] text-[#777] border-t border-border-light pt-3.5">
                    <span>{art.date}</span>
                    <span>{art.readTime}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar (Technical bulletins) */}
          <div className="flex flex-col gap-8">
            <Card variant="dark" hoverEffect={false} className="!bg-[#171717] border border-[#2e2e2e]">
              <div className="flex items-center gap-2.5 mb-3 text-white">
                <Cpu className="text-accent" size={20} />
                <h3 className="text-[1.15rem] font-bold">Engine Patch Logs</h3>
              </div>
              <p className="text-[0.85rem] text-[#aaa] leading-[1.5] mb-6">
                Technical logs and updates pushed to client repositories and cloud hosting platforms.
              </p>

              <div className="flex flex-col gap-5">
                {bulletins.map((b, idx) => (
                  <div key={idx} className="border-b border-[#2a2a2a] pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[0.75rem] text-accent font-bold font-mono">{b.version}</span>
                      <span className="text-[0.7rem] text-[#777] font-mono">{b.date}</span>
                    </div>
                    <p className="text-[0.8rem] text-[#ccc] leading-[1.5]">{b.note}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#2a2a2a] pt-4 mt-3">
                <a href="#contact" className="inline-flex items-center gap-2 text-accent font-bold text-[0.8rem] transition-all duration-150 ease-out hover:gap-3">
                  <span>Inquire about custom patches</span> <ArrowRight size={14} />
                </a>
              </div>
            </Card>

            <Card variant="light" hoverEffect={false} className="border border-border-light shadow-subtle flex flex-col items-start">
              <FileText className="text-accent" size={32} />
              <h3 className="text-[1.15rem] font-[750] mt-4 mb-2 text-text-dark">Performance Optimization Guide</h3>
              <p className="text-[0.85rem] text-text-muted-dark leading-[1.5]">Download our guide on optimizing database queries and frontend load times.</p>
              <Button href="#contact" variant="primary" className="w-full mt-4">
                Request Guide
              </Button>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
};
