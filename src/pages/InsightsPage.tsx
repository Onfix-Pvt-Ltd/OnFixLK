import React from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Calendar, ArrowRight, FileText, Cpu, Star } from 'lucide-react';

export const InsightsPage: React.FC = () => {
  const articles = [
    {
      id: 'nobu-pos',
      tag: 'CASE STUDY',
      title: 'Nobu Hospitality Case Study: Zero Latency Tableside Checkout',
      desc: 'How Nobu Hotels integrated ONFIX POS across 12 APAC branches to resolve tableside guest card processing bottlenecks and room sync errors.',
      date: 'June 02, 2026',
      readTime: '6 min read',
      featured: false,
    },
    {
      id: 'colombo-node',
      tag: 'EDGE NETWORK',
      title: 'Colombo Rack Edge Node Array Expansion Completed',
      desc: 'We have finished hardware installation of lk-colombo-edge-01 to handle seasonal traffic spikes in Southeast Asian luxury resorts.',
      date: 'May 28, 2026',
      readTime: '4 min read',
      featured: false,
    },
    {
      id: 'soc2-audit',
      tag: 'SECURITY LABS',
      title: 'Annual SOC 2 Type II Security Compliance Audit Completed',
      desc: 'Onfix successfully cleared the continuous third-party information auditing scope with zero compliance exceptions noted.',
      date: 'May 14, 2026',
      readTime: '3 min read',
      featured: false,
    },
  ];

  const bulletins = [
    { version: 'v4.2.1-patch', date: 'June 08, 2026', note: 'Resolved TCP handshaking retry intervals on failover routes.' },
    { version: 'v4.2.0-release', date: 'May 20, 2026', note: 'Public launch of Onfix DB Core lock-free serializing transaction engine.' },
    { version: 'v4.1.8-patch', date: 'May 02, 2026', note: 'Implemented strict Webhook rate-limiting policies at API gateway.' },
  ];

  return (
    <div className="animate-fade">
      <SEOHelper 
        title="Insights, Bulletins & Case Studies" 
        description="Read Onfix's technical insights, engineering bulletins, SOC 2 reports, and case studies detailing our global edge deployments."
      />

      {/* Hero Header */}
      <section className="py-20 bg-[radial-gradient(circle_at_50%_50%,rgba(23,23,23,1)_0%,rgba(30,30,30,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ONFIX INSIGHTS</span>
          <h1 className="text-[3rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-5 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">Technical Bulletins & Reports</h1>
          <p className="max-w-[700px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            Stay up to date with engineering updates, database benchmarks, and case studies from our global client deployments.
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
                  <h3 className="text-[1.6rem] max-[767px]:text-[1.3rem] font-extrabold leading-tight">Onfix DB Core v4.2 Release: Achieving Sub-Millisecond Concurrency</h3>
                </div>
              </div>
              <div className="p-[30px] bg-white">
                <p className="text-text-muted-dark text-[0.95rem] leading-[1.6] mb-6">
                  Our database systems engineering group has finished deploying the lockless FIFO database logging format across all global Anycast edge nodes. In live operational tests across 10,000 concurrent writes/sec, this architecture reduced write processing latencies to an average of 0.8ms, resolving legacy locking bottlenecks completely.
                </p>
                <div className="flex justify-between items-center border-t border-border-light pt-5">
                  <span className="text-[0.8rem] text-text-muted-dark font-medium">8 min read</span>
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
                Technical release logs and network routing adjustments pushed to global Anycast endpoints.
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
              <h3 className="text-[1.15rem] font-[750] mt-4 mb-2 text-text-dark">FIFO Lock-Free DB Whitepaper</h3>
              <p className="text-[0.85rem] text-text-muted-dark leading-[1.5]">Download our complete technical specifications document on sub-millisecond ACID processing.</p>
              <Button href="#contact" variant="primary" className="w-full mt-4">
                Request Whitepaper
              </Button>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
};
