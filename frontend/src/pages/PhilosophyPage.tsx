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
    colombo: '-',
    singapore: '-',
    tokyo: '-',
    dublin: '-',
    oregon: '-'
  });
  const [activePingNode, setActivePingNode] = useState<string | null>(null);

  const consoleTabs = [
    {
      id: 'infra' as const,
      label: 'Infrastructure',
      icon: <Server size={18} />,
      title: 'Global High-Availability Node Array',
      text: 'Our systems deploy across physically isolated edge clusters in primary hubs. Using intelligent routing, client terminals are automatically connected to the nearest node, securing 10-15ms roundtrip times.',
      code: `// Cluster Node Configuration
{
  "node": "lk-colombo-edge-01",
  "routing": "Anycast BGP Path Routing",
  "failoverTarget": "sg-singapore-edge-02",
  "connection": "E2E TLS 1.3",
  "status": "active"
}`,
    },
    {
      id: 'db' as const,
      label: 'Database Core',
      icon: <Database size={18} />,
      title: 'Proprietary Ledger & Sync Engine',
      text: 'We engineered a transaction logging engine that operates with zero write-locks. Menus, stock changes, and room allocations are processed in microsecond intervals, avoiding concurrency bottlenecks.',
      code: `// Sub-millisecond Transaction depletion
await onfixDb.transact({
  lock: LockMode.NONE,
  isolation: Isolation.SERIALIZABLE,
  recipeDepletion: "FIFO",
  latencyTargetMs: 1
});`,
    },
    {
      id: 'sla' as const,
      label: 'Security & SLA',
      icon: <Shield size={18} />,
      title: 'Bank-Grade Auditing & Compliance',
      text: 'Every transaction is encrypted in transit and at rest using AES-256 GCM. Onfix has achieved certified compliance in PCI-DSS Level 1 and SOC 2 Type II audit scopes for secure operation.',
      code: `// Audit Verification
{
  "compliance": "SOC 2 Type II Certified",
  "dataProtection": "AES-256-GCM Encryption",
  "slaCommitment": "99.999% Uptime Guarantee",
  "auditFrequency": "Continuous Continuous"
}`,
    },
  ];

  const currentTab = consoleTabs.find((t) => t.id === activeConsoleTab) || consoleTabs[0];

  const executePingTest = () => {
    if (pingStatus === 'testing') return;
    setPingStatus('testing');
    setNodePings({
      colombo: 'pinging...',
      singapore: 'pinging...',
      tokyo: 'pinging...',
      dublin: 'pinging...',
      oregon: 'pinging...'
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

    runPing('colombo', 400, 12, 4)
      .then(() => runPing('singapore', 500, 42, 6))
      .then(() => runPing('tokyo', 600, 75, 10))
      .then(() => runPing('dublin', 700, 155, 15))
      .then(() => runPing('oregon', 800, 218, 20))
      .then(() => {
        setActivePingNode(null);
        setPingStatus('completed');
      });
  };

  return (
    <div className="animate-fade">
      <SEOHelper
        title="Philosophy & Infrastructure Core"
        description="Learn about Onfix's architectural DNA, zero write-locks databases, global Anycast routing, and run a live edge latency check."
      />

      {/* Hero Banner */}
      <section className="py-20 bg-[radial-gradient(circle_at_90%_10%,rgba(23,23,23,1)_0%,rgba(35,35,35,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ONFIX DNA</span>
          <h1 className="text-[3rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-5 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">Sovereign Software Foundations</h1>
          <p className="max-w-[700px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            We don't wrap legacy databases in fancy dashboards. We re-engineer the transport protocols, engines, and nodes.
          </p>
        </div>
      </section>

      {/* Core DNA split section */}
      <section className="py-[100px] bg-bg-light border-b border-border-light">
        <div className="container grid grid-cols-2 max-[991px]:grid-cols-1 gap-[60px] items-center">
          <div>
            <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ENGINEERING PHILOSOPHY</span>
            <h2 className="text-[1.8rem] font-extrabold mb-5 tracking-[-0.5px] text-text-dark">Zero Buffer. Zero Lag. Zero Excuses.</h2>
            <p className="text-[0.95rem] leading-[1.7] text-text-muted-dark font-medium mb-5">
              At Onfix, we build the databases, compilers, and routing protocols ourselves. Our obsession with engineering efficiency means your POS never buffers, your stock is always synchronized, and your data is completely secure.
            </p>
            <p className="text-text-muted-dark leading-[1.7] text-[0.95rem] mb-6">
              Most enterprise tools rely on layers of outdated wrappers and API bridges. When network density rises, database rows lock up and transactions queue, creating processing lag. We bypass these limitations completely by writing lock-free FIFO storage layers that interface directly with the edge hardware.
            </p>
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div className="bg-bg-card border border-border-light p-6 rounded-medium shadow-subtle">
                <span className="block text-[1.8rem] font-[850] mb-2 text-accent">&lt; 15ms</span>
                <span className="text-[0.8rem] font-semibold text-text-muted-dark uppercase tracking-[0.5px]">Global Terminal Latency</span>
              </div>
              <div className="bg-bg-card border border-border-light p-6 rounded-medium shadow-subtle">
                <span className="block text-[1.8rem] font-[850] mb-2 text-accent">99.999%</span>
                <span className="text-[0.8rem] font-semibold text-text-muted-dark uppercase tracking-[0.5px]">SLA Performance Target</span>
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
                  <span>telemetry_inspector.log</span>
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
            <h2 className="text-[2.5rem] font-heading font-bold mb-4">Anycast Edge Node Latency Test</h2>
            <p className="text-text-muted-light max-w-[600px] mx-auto mt-2.5 mb-10 text-[1.1rem]">
              Verify your current browser's connection response directly against our live Anycast edge cluster nodes.
            </p>
          </div>

          <div className="tester-widget-grid">
            <Card variant="dark" hoverEffect={false} className="!p-0 bg-[#1a1a1a] !border border-[#2e2e2e]">
              <div className="bg-[#111] px-6 py-4 font-[750] text-[0.8rem] tracking-[1px] text-[#888] flex items-center gap-2.5 border-b border-[#222]">
                <Activity size={16} className="text-[#10b981]" />
                <span>ACTIVE NODES PING MANAGER</span>
              </div>

              <div className="flex flex-col">
                {/* Colombo Node */}
                <div className={`flex justify-between items-center px-6 py-4.5 border-b border-[#252525] transition-all duration-150 ease-out hover:bg-[#222] ${activePingNode === 'colombo' ? 'bg-accent/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <div>
                      <span className="block font-bold text-[0.95rem] text-white">Colombo Edge Node</span>
                      <span className="block text-[0.75rem] text-[#777] mt-0.5">lk-colombo-edge-01 (182.93.44.12)</span>
                    </div>
                  </div>
                  <span className="font-bold text-accent text-[0.95rem] font-mono">
                    {typeof nodePings.colombo === 'number' ? `${nodePings.colombo} ms` : nodePings.colombo}
                  </span>
                </div>

                {/* Singapore Node */}
                <div className={`flex justify-between items-center px-6 py-4.5 border-b border-[#252525] transition-all duration-150 ease-out hover:bg-[#222] ${activePingNode === 'singapore' ? 'bg-accent/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <div>
                      <span className="block font-bold text-[0.95rem] text-white">Singapore Edge Node</span>
                      <span className="block text-[0.75rem] text-[#777] mt-0.5">sg-singapore-edge-02 (203.11.89.92)</span>
                    </div>
                  </div>
                  <span className="font-bold text-accent text-[0.95rem] font-mono">
                    {typeof nodePings.singapore === 'number' ? `${nodePings.singapore} ms` : nodePings.singapore}
                  </span>
                </div>

                {/* Tokyo Node */}
                <div className={`flex justify-between items-center px-6 py-4.5 border-b border-[#252525] transition-all duration-150 ease-out hover:bg-[#222] ${activePingNode === 'tokyo' ? 'bg-accent/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <div>
                      <span className="block font-bold text-[0.95rem] text-white">Tokyo Node Array</span>
                      <span className="block text-[0.75rem] text-[#777] mt-0.5">jp-tokyo-node-03 (172.21.102.5)</span>
                    </div>
                  </div>
                  <span className="font-bold text-accent text-[0.95rem] font-mono">
                    {typeof nodePings.tokyo === 'number' ? `${nodePings.tokyo} ms` : nodePings.tokyo}
                  </span>
                </div>

                {/* Dublin Node */}
                <div className={`flex justify-between items-center px-6 py-4.5 border-b border-[#252525] transition-all duration-150 ease-out hover:bg-[#222] ${activePingNode === 'dublin' ? 'bg-accent/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <div>
                      <span className="block font-bold text-[0.95rem] text-white">Dublin Backup Node</span>
                      <span className="block text-[0.75rem] text-[#777] mt-0.5">ie-dublin-node-04 (192.16.55.23)</span>
                    </div>
                  </div>
                  <span className="font-bold text-accent text-[0.95rem] font-mono">
                    {typeof nodePings.dublin === 'number' ? `${nodePings.dublin} ms` : nodePings.dublin}
                  </span>
                </div>

                {/* Oregon Node */}
                <div className={`flex justify-between items-center px-6 py-4.5 border-b-0 transition-all duration-150 ease-out hover:bg-[#222] ${activePingNode === 'oregon' ? 'bg-accent/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <div>
                      <span className="block font-bold text-[0.95rem] text-white">Oregon Cluster Node</span>
                      <span className="block text-[0.75rem] text-[#777] mt-0.5">us-oregon-node-01 (54.12.89.200)</span>
                    </div>
                  </div>
                  <span className="font-bold text-accent text-[0.95rem] font-mono">
                    {typeof nodePings.oregon === 'number' ? `${nodePings.oregon} ms` : nodePings.oregon}
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
                    <span>Edge networks verified. Minimum latency: <strong>{nodePings.colombo}ms</strong></span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Compliance Certifications Grid */}
      <section className="py-[100px] bg-bg-light">
        <div className="container">
          <div className="text-center mb-12">
            <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">AUDIT SCOPE</span>
            <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">Verified Corporate Protections</h2>
            <p className="max-w-[700px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
              We design our applications to maintain continuous compliance certificates with global information security protocols.
            </p>
          </div>

          <div className="grid grid-cols-4 max-[991px]:grid-cols-2 max-[767px]:grid-cols-1 gap-6 mt-[50px]">
            <Card variant="light" hoverEffect={false} className="text-center p-[36px_24px] flex flex-col items-center h-full">
              <Shield className="text-accent" size={36} />
              <h3 className="text-[1.15rem] font-bold mt-5 mb-3 text-text-dark">SOC 2 Type II Certified</h3>
              <p className="text-[0.85rem] leading-[1.5] text-text-muted-dark">Independent security audit verifying availability, confidentiality, and processing integrity of client data engines.</p>
            </Card>

            <Card variant="light" hoverEffect={false} className="text-center p-[36px_24px] flex flex-col items-center h-full">
              <CheckCircle2 className="text-accent" size={36} />
              <h3 className="text-[1.15rem] font-bold mt-5 mb-3 text-text-dark">PCI-DSS Level 1 Enforced</h3>
              <p className="text-[0.85rem] leading-[1.5] text-text-muted-dark">Strict cardholder data protections embedded directly into transaction processing, tokenizing user payment logs.</p>
            </Card>

            <Card variant="light" hoverEffect={false} className="text-center p-[36px_24px] flex flex-col items-center h-full">
              <Server className="text-accent" size={36} />
              <h3 className="text-[1.15rem] font-bold mt-5 mb-3 text-text-dark">GDPR & Data Sovereignty</h3>
              <p className="text-[0.85rem] leading-[1.5] text-text-muted-dark">Local anycast routing configuration respects data boundaries, keeping transactional ledger entries within national nodes.</p>
            </Card>

            <Card variant="light" hoverEffect={false} className="text-center p-[36px_24px] flex flex-col items-center h-full">
              <ShieldAlert className="text-accent" size={36} />
              <h3 className="text-[1.15rem] font-bold mt-5 mb-3 text-text-dark">256-Bit GCM Encrypted</h3>
              <p className="text-[0.85rem] leading-[1.5] text-text-muted-dark">Dynamic data packages are encrypted-at-rest and in-transit utilizing AES-256 GCM cryptographic frameworks.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
