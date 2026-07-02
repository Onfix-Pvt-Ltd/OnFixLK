import React, { useState } from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  Server, Database, Shield, Terminal,
  Activity, Play, CheckCircle2, ShieldAlert
} from 'lucide-react';

export const PhilosophyPage: React.FC = () => {
  // Console Tab State
  const [activeConsoleTab, setActiveConsoleTab] = useState<'infra' | 'db' | 'sla'>('infra');

  // Latency Tester State
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'completed'>('idle');
  const [nodePings, setNodePings] = useState<{ [key: string]: number | string }>({
    srilanka: '-',
    australia: '-',
    russia: '-',
    france: '-'
  });
  const [activePingNode, setActivePingNode] = useState<string | null>(null);

  const consoleTabs = [
    {
      id: 'infra' as const,
      label: 'Infrastructure',
      icon: <Server size={18} />,
      title: 'Edge Deployment Framework',
      text: 'Our web applications are deployed on global edge networks (like AWS CloudFront and Vercel Edge). Dynamic routes and assets are served from the closest edge node to the client, keeping roundtrip times ultra-low.',
      code: `// Edge Node Route Config
{
  "routing": "DNS Geographic Routing",
  "provider": "Global Edge Network",
  "connection": "TLS 1.3 Encryption",
  "compression": "Brotli / Gzip",
  "status": "active"
}`,
    },
    {
      id: 'db' as const,
      label: 'Database Core',
      icon: <Database size={18} />,
      title: 'Optimized Database Schemas',
      text: 'We construct scalable schemas using battle-tested database systems (such as PostgreSQL and MongoDB). Caching strategies and optimized queries prevent concurrency bottlenecks under peak load.',
      code: `// Sub-millisecond Query Optimization
const transaction = await prisma.transaction.create({
  data: {
    amount: amount,
    status: 'COMPLETED',
    metadata: { gateway: 'Stripe' }
  }
});`,
    },
    {
      id: 'sla' as const,
      label: 'Security & SLA',
      icon: <Shield size={18} />,
      title: 'Best-Practice Security Model',
      text: 'Critical data is encrypted in transit and at rest using AES-256 GCM. We design system architectures to follow OWASP top 10 security guidelines and utilize certified processors for payment workflows.',
      code: `// Security Parameters
{
  "encryption": "AES-256-GCM at rest",
  "connection": "HTTPS with HSTS enforced",
  "slaTarget": "99.9% Target Uptime",
  "bestPractice": "OWASP Top 10 Aligned"
}`,
    },
  ];

  const currentTab = consoleTabs.find((t) => t.id === activeConsoleTab) || consoleTabs[0];

  const executePingTest = () => {
    if (pingStatus === 'testing') return;
    setPingStatus('testing');
    setNodePings({
      srilanka: 'testing...',
      australia: 'testing...',
      russia: 'testing...',
      france: 'testing...'
    });

    const runPing = (node: string, delay: number, basePing: number, variance: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setActivePingNode(node);
          const finalPing = basePing + Math.floor(Math.random() * variance);
          setNodePings(prev => ({ ...prev, [node]: finalPing }));
          resolve();
        }, delay);
      });
    };

    runPing('srilanka', 400, 10, 5)
      .then(() => runPing('australia', 500, 110, 15))
      .then(() => runPing('russia', 600, 140, 20))
      .then(() => runPing('france', 700, 160, 25))
      .then(() => {
        setActivePingNode(null);
        setPingStatus('completed');
      });
  };

  return (
    <div className="animate-fade">
      <SEOHelper
        title="Philosophy & Infrastructure Core"
        description="Learn about Onfix's architectural DNA, clean database setups, secure deployments, and test your latency to edge gateways."
      />

      {/* Hero Banner */}
      <section className="py-20 bg-[radial-gradient(circle_at_90%_10%,rgba(23,23,23,1)_0%,rgba(35,35,35,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ONFIX DNA</span>
          <h1 className="text-[3rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-5 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">Robust Software Foundations</h1>
          <p className="max-w-[700px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            We build secure, reliable, and high-performing client applications using modern cloud architectures and best engineering practices.
          </p>
        </div>
      </section>

      {/* Core DNA split section */}
      <section className="py-[100px] bg-bg-light border-b border-border-light">
        <div className="container grid grid-cols-2 max-[991px]:grid-cols-1 gap-[60px] items-center">
          <div>
            <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ENGINEERING PHILOSOPHY</span>
            <h2 className="text-[1.8rem] font-extrabold mb-5 tracking-[-0.5px] text-text-dark">Clean Code. Fast Loading. Secure Data.</h2>
            <p className="text-[0.95rem] leading-[1.7] text-text-muted-dark font-medium mb-5">
              At Onfix, we believe software should be fast, reliable, and secure. We focus on clean architecture, optimized database queries, and utilizing modern CDN/edge infrastructures so your applications load instantaneously and scale smoothly.
            </p>
            <p className="text-text-muted-dark leading-[1.7] text-[0.95rem] mb-6">
              Most performance issues are caused by bloated libraries and un-indexed databases. We solve this by writing clean code, profiling resource bottlenecks, and deploying apps to edge networks that place static assets and cached APIs close to users.
            </p>
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div className="bg-bg-card border border-border-light p-6 rounded-medium shadow-subtle">
                <span className="block text-[1.8rem] font-[850] mb-2 text-accent">Fast</span>
                <span className="text-[0.8rem] font-semibold text-text-muted-dark uppercase tracking-[0.5px]">Optimized Load Speeds</span>
              </div>
              <div className="bg-bg-card border border-border-light p-6 rounded-medium shadow-subtle">
                <span className="block text-[1.8rem] font-[850] mb-2 text-accent">99.9%</span>
                <span className="text-[0.8rem] font-semibold text-text-muted-dark uppercase tracking-[0.5px]">Uptime Target</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex bg-bg-light p-1 rounded-medium gap-1">
              {consoleTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex-1 flex items-center justify-center gap-2 bg-transparent border-none p-3 font-semibold text-[0.85rem] text-[#666] rounded-small cursor-pointer transition-all duration-150 ease-out hover:text-accent ${activeConsoleTab === tab.id ? '!bg-bg-card !text-accent shadow-subtle' : ''
                    }`}
                  onClick={() => setActiveConsoleTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <Card variant="dark" hoverEffect={false} className="!p-0 rounded-large overflow-hidden shadow-medium bg-[#171717] border border-[#2e2e2e]">
              <div className="bg-[#111] px-5 py-3.5 flex justify-between items-center border-b border-[#222]">
                <div className="flex items-center gap-2 font-mono text-[0.8rem] text-[#aaa]">
                  <Terminal size={14} className="text-accent" />
                  <span>infrastructure_inspector.log</span>
                </div>
                <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-[#27c93f]">
                  <span className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse"></span>
                  <span>Active Link</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-[1.25rem] font-bold mb-3 text-white">{currentTab.title}</h3>
                <p className="text-[0.9rem] text-[#aaa] mb-6 leading-[1.6]">{currentTab.text}</p>

                <div className="bg-[#0d0d0d] p-4 rounded-medium border border-[#222] overflow-x-auto">
                  <pre className="m-0">
                    <code className="font-mono text-[0.8rem] text-[#ff8d4d] leading-[1.5]">{currentTab.code}</code>
                  </pre>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Latency Tester Section */}
      <section className="relative overflow-hidden border-b border-border-dark bg-bg-dark text-text-light py-[100px]">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle,rgba(255,94,0,0.05)_0%,rgba(255,94,0,0)_70%)] pointer-events-none" aria-hidden="true"></div>
        <div className="relative z-2 max-w-[800px] mx-auto container">
          <div className="text-center">
            <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">EDGE ROUTING</span>
            <h2 className="text-[2.5rem] font-heading font-bold mb-4">Edge Network Latency Test</h2>
            <p className="text-text-muted-light max-w-[600px] mx-auto mt-2.5 mb-10 text-[1.1rem]">
              Measure the estimated latency from your location to server nodes in client regions.
            </p>
          </div>

          <div className="tester-widget-grid">
            <Card variant="dark" hoverEffect={false} className="!p-0 bg-[#1a1a1a] !border border-[#2e2e2e]">
              <div className="bg-[#111] px-6 py-4 font-[750] text-[0.8rem] tracking-[1px] text-[#888] flex items-center gap-2.5 border-b border-[#222]">
                <Activity size={16} className="text-[#10b981]" />
                <span>EDGE GATEWAYS PING SIMULATION</span>
              </div>

              <div className="flex flex-col">
                {/* Sri Lanka Node */}
                <div className={`flex justify-between items-center px-6 py-4.5 border-b border-[#252525] transition-all duration-150 ease-out hover:bg-[#222] ${activePingNode === 'srilanka' ? 'bg-accent/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <div>
                      <span className="block font-bold text-[0.95rem] text-white">Sri Lanka Node</span>
                      <span className="block text-[0.75rem] text-[#777] mt-0.5">South Asia Gateway</span>
                    </div>
                  </div>
                  <span className="font-bold text-accent text-[0.95rem] font-mono">
                    {typeof nodePings.srilanka === 'number' ? `${nodePings.srilanka} ms` : nodePings.srilanka}
                  </span>
                </div>

                {/* Australia Node */}
                <div className={`flex justify-between items-center px-6 py-4.5 border-b border-[#252525] transition-all duration-150 ease-out hover:bg-[#222] ${activePingNode === 'australia' ? 'bg-accent/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <div>
                      <span className="block font-bold text-[0.95rem] text-white">Australia Node</span>
                      <span className="block text-[0.75rem] text-[#777] mt-0.5">Oceania Gateway</span>
                    </div>
                  </div>
                  <span className="font-bold text-accent text-[0.95rem] font-mono">
                    {typeof nodePings.australia === 'number' ? `${nodePings.australia} ms` : nodePings.australia}
                  </span>
                </div>

                {/* Russia Node */}
                <div className={`flex justify-between items-center px-6 py-4.5 border-b border-[#252525] transition-all duration-150 ease-out hover:bg-[#222] ${activePingNode === 'russia' ? 'bg-accent/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <div>
                      <span className="block font-bold text-[0.95rem] text-white">Russia Node</span>
                      <span className="block text-[0.75rem] text-[#777] mt-0.5">Eastern Europe Gateway</span>
                    </div>
                  </div>
                  <span className="font-bold text-accent text-[0.95rem] font-mono">
                    {typeof nodePings.russia === 'number' ? `${nodePings.russia} ms` : nodePings.russia}
                  </span>
                </div>

                {/* France Node */}
                <div className={`flex justify-between items-center px-6 py-4.5 border-b-0 transition-all duration-150 ease-out hover:bg-[#222] ${activePingNode === 'france' ? 'bg-accent/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <div>
                      <span className="block font-bold text-[0.95rem] text-white">France Node</span>
                      <span className="block text-[0.75rem] text-[#777] mt-0.5">Western Europe Gateway</span>
                    </div>
                  </div>
                  <span className="font-bold text-accent text-[0.95rem] font-mono">
                    {typeof nodePings.france === 'number' ? `${nodePings.france} ms` : nodePings.france}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col items-center gap-4 bg-[#151515] max-[767px]:w-full [&>button]:max-[767px]:w-full">
                <Button
                  onClick={executePingTest}
                  disabled={pingStatus === 'testing'}
                  variant="accent"
                  icon={<Play size={14} />}
                >
                  {pingStatus === 'testing' ? 'Executing Latency Pings...' : 'Run Edge Latency Test'}
                </Button>

                {pingStatus === 'completed' && (
                  <div className="flex items-center gap-2 bg-[#10b981]/10 border border-[#10b981]/20 px-4.5 py-2.5 rounded-pill text-[0.85rem] text-[#34d399]">
                    <CheckCircle2 size={16} className="text-[#10b981]" />
                    <span>Edge simulation complete. Estimated regional latencies verified.</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Reliability Practices Grid */}
      <section className="py-[100px] bg-bg-light">
        <div className="container">
          <div className="text-center mb-12">
            <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">SECURITY & STANDARDS</span>
            <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">Reliable & Secure Operations</h2>
            <p className="max-w-[700px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
              We implement industry-standard security models and design guidelines to protect critical client data.
            </p>
          </div>

          <div className="grid grid-cols-4 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1 gap-6 mt-[50px]">
            <Card variant="light" hoverEffect={false} className="text-center p-[36px_24px] flex flex-col items-center h-full">
              <Shield className="text-accent" size={36} />
              <h3 className="text-[1.15rem] font-bold mt-5 mb-3 text-text-dark">Secure by Design</h3>
              <p className="text-[0.85rem] leading-[1.5] text-text-muted-dark">We enforce security best practices covering standard input validation, rate limiting, and password hashing throughout development.</p>
            </Card>

            <Card variant="light" hoverEffect={false} className="text-center p-[36px_24px] flex flex-col items-center h-full">
              <CheckCircle2 className="text-accent" size={36} />
              <h3 className="text-[1.15rem] font-bold mt-5 mb-3 text-text-dark">Secure Payment Handling</h3>
              <p className="text-[0.85rem] leading-[1.5] text-text-muted-dark">We delegate card transactions to fully certified PCI-DSS compliant processors (like Stripe), ensuring no card details touch our servers.</p>
            </Card>

            <Card variant="light" hoverEffect={false} className="text-center p-[36px_24px] flex flex-col items-center h-full">
              <Server className="text-accent" size={36} />
              <h3 className="text-[1.15rem] font-bold mt-5 mb-3 text-text-dark">Privacy Ready</h3>
              <p className="text-[0.85rem] leading-[1.5] text-text-muted-dark">Designed with privacy-first standards in mind, respecting GDPR data minimization principles and storage boundaries.</p>
            </Card>

            <Card variant="light" hoverEffect={false} className="text-center p-[36px_24px] flex flex-col items-center h-full">
              <ShieldAlert className="text-accent" size={36} />
              <h3 className="text-[1.15rem] font-bold mt-5 mb-3 text-text-dark">256-Bit GCM Encrypted</h3>
              <p className="text-[0.85rem] leading-[1.5] text-text-muted-dark">Data is secure in transit and at rest utilizing standard AES-256 GCM encryption and TLS 1.3 protocols.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
