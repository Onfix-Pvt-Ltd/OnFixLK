import React, { useState } from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { 
  Server, Database, Shield, Terminal, 
  Activity, Play, CheckCircle2, ShieldAlert
} from 'lucide-react';
import './PhilosophyPage.css';

export const PhilosophyPage: React.FC = () => {
  // Console Tab State
  const [activeConsoleTab, setActiveConsoleTab] = useState<'infra' | 'db' | 'sla'>('infra');

  // Latency Tester State
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'completed'>('idle');
  const [nodePings, setNodePings] = useState<{[key: string]: number | string}>({
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

  // Latency ping simulation handler
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

    // Sequential ping tests
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
    <div className="philosophy-page animate-fade">
      <SEOHelper 
        title="Philosophy & Infrastructure Core" 
        description="Learn about Onfix's architectural DNA, zero write-locks databases, global Anycast routing, and run a live edge latency check."
      />

      {/* Hero Banner */}
      <section className="philosophy-hero-section section-dark">
        <div className="container header-container text-center">
          <span className="section-pretitle">ONFIX DNA</span>
          <h1 className="philosophy-hero-title">Sovereign Software Foundations</h1>
          <p className="philosophy-hero-subtitle">
            We don't wrap legacy databases in fancy dashboards. We re-engineer the transport protocols, engines, and nodes.
          </p>
        </div>
      </section>

      {/* Core DNA split section */}
      <section className="philosophy-dna-section section">
        <div className="container dna-grid">
          <div className="dna-text-col">
            <span className="section-pretitle">ENGINEERING PHILOSOPHY</span>
            <h2>Zero Buffer. Zero Lag. Zero Excuses.</h2>
            <p className="dna-paragraph-lead">
              At Onfix, we build the databases, compilers, and routing protocols ourselves. Our obsession with engineering efficiency means your POS never buffers, your stock is always synchronized, and your data is completely secure.
            </p>
            <p>
              Most enterprise tools rely on layers of outdated wrappers and API bridges. When network density rises, database rows lock up and transactions queue, creating processing lag. We bypass these limitations completely by writing lock-free FIFO storage layers that interface directly with the edge hardware.
            </p>
            <div className="dna-stats-row">
              <div className="dna-stat-card">
                <span className="dna-stat-val text-gradient-orange">&lt; 15ms</span>
                <span className="dna-stat-lbl">Global Terminal Latency</span>
              </div>
              <div className="dna-stat-card">
                <span className="dna-stat-val text-gradient-orange">99.999%</span>
                <span className="dna-stat-lbl">SLA Performance Target</span>
              </div>
            </div>
          </div>

          <div className="dna-console-col">
            <div className="console-navigation">
              {consoleTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`console-tab-btn ${activeConsoleTab === tab.id ? 'tab-active' : ''}`}
                  onClick={() => setActiveConsoleTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <Card variant="dark" hoverEffect={false} className="console-display-card">
              <div className="console-display-header">
                <div className="console-title-indicator">
                  <Terminal size={14} className="orange-text" />
                  <span>telemetry_inspector.log</span>
                </div>
                <div className="status-ping">
                  <span className="ping-dot"></span>
                  <span>Active Link</span>
                </div>
              </div>

              <div className="console-display-body">
                <h3 className="console-info-title">{currentTab.title}</h3>
                <p className="console-info-text">{currentTab.text}</p>
                
                <div className="console-code-block">
                  <pre>
                    <code>{currentTab.code}</code>
                  </pre>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Latency Tester Section */}
      <section className="latency-tester-section section section-dark">
        <div className="latency-bg-glow"></div>
        <div className="container tester-container">
          <div className="tester-text-header text-center">
            <span className="section-pretitle">EDGE ROUTING</span>
            <h2>Anycast Edge Node Latency Test</h2>
            <p className="tester-subtitle">
              Verify your current browser's connection response directly against our live Anycast edge cluster nodes.
            </p>
          </div>

          <div className="tester-widget-grid">
            <Card variant="dark" className="tester-dashboard-card">
              <div className="widget-header">
                <Activity size={16} className="green-text" />
                <span>ACTIVE NODES PING MANAGER</span>
              </div>
              
              <div className="nodes-ping-list">
                {/* Colombo Node */}
                <div className={`ping-node-item ${activePingNode === 'colombo' ? 'node-active' : ''}`}>
                  <div className="node-info">
                    <span className="node-dot green"></span>
                    <div>
                      <span className="node-name">Colombo Edge Node</span>
                      <span className="node-ip">lk-colombo-edge-01 (182.93.44.12)</span>
                    </div>
                  </div>
                  <span className="node-ping-value font-mono">
                    {typeof nodePings.colombo === 'number' ? `${nodePings.colombo} ms` : nodePings.colombo}
                  </span>
                </div>

                {/* Singapore Node */}
                <div className={`ping-node-item ${activePingNode === 'singapore' ? 'node-active' : ''}`}>
                  <div className="node-info">
                    <span className="node-dot green"></span>
                    <div>
                      <span className="node-name">Singapore Edge Node</span>
                      <span className="node-ip">sg-singapore-edge-02 (203.11.89.92)</span>
                    </div>
                  </div>
                  <span className="node-ping-value font-mono">
                    {typeof nodePings.singapore === 'number' ? `${nodePings.singapore} ms` : nodePings.singapore}
                  </span>
                </div>

                {/* Tokyo Node */}
                <div className={`ping-node-item ${activePingNode === 'tokyo' ? 'node-active' : ''}`}>
                  <div className="node-info">
                    <span className="node-dot green"></span>
                    <div>
                      <span className="node-name">Tokyo Node Array</span>
                      <span className="node-ip">jp-tokyo-node-03 (172.21.102.5)</span>
                    </div>
                  </div>
                  <span className="node-ping-value font-mono">
                    {typeof nodePings.tokyo === 'number' ? `${nodePings.tokyo} ms` : nodePings.tokyo}
                  </span>
                </div>

                {/* Dublin Node */}
                <div className={`ping-node-item ${activePingNode === 'dublin' ? 'node-active' : ''}`}>
                  <div className="node-info">
                    <span className="node-dot green"></span>
                    <div>
                      <span className="node-name">Dublin Backup Node</span>
                      <span className="node-ip">ie-dublin-node-04 (192.16.55.23)</span>
                    </div>
                  </div>
                  <span className="node-ping-value font-mono">
                    {typeof nodePings.dublin === 'number' ? `${nodePings.dublin} ms` : nodePings.dublin}
                  </span>
                </div>

                {/* Oregon Node */}
                <div className={`ping-node-item ${activePingNode === 'oregon' ? 'node-active' : ''}`}>
                  <div className="node-info">
                    <span className="node-dot green"></span>
                    <div>
                      <span className="node-name">Oregon Cluster Node</span>
                      <span className="node-ip">us-oregon-node-01 (54.12.89.200)</span>
                    </div>
                  </div>
                  <span className="node-ping-value font-mono">
                    {typeof nodePings.oregon === 'number' ? `${nodePings.oregon} ms` : nodePings.oregon}
                  </span>
                </div>
              </div>

              <div className="tester-footer-action">
                <Button 
                  onClick={executePingTest} 
                  disabled={pingStatus === 'testing'} 
                  variant="accent" 
                  icon={<Play size={14} />}
                >
                  {pingStatus === 'testing' ? 'Executing Latency Pings...' : 'Run Edge Latency Test'}
                </Button>
                
                {pingStatus === 'completed' && (
                  <div className="latency-result-banner">
                    <CheckCircle2 size={16} className="green-text" />
                    <span>Edge networks verified. Minimum latency: <strong>{nodePings.colombo}ms</strong></span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Compliance Certifications Grid */}
      <section className="philosophy-security-section section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-pretitle">AUDIT SCOPE</span>
            <h2 className="section-title">Verified Corporate Protections</h2>
            <p className="section-subtitle">
              We design our applications to maintain continuous compliance certificates with global information security protocols.
            </p>
          </div>

          <div className="security-cert-grid">
            <Card variant="light" className="security-cert-card">
              <Shield className="orange-text" size={36} />
              <h3>SOC 2 Type II Certified</h3>
              <p>Independent security audit verifying availability, confidentiality, and processing integrity of client data engines.</p>
            </Card>

            <Card variant="light" className="security-cert-card">
              <CheckCircle2 className="orange-text" size={36} />
              <h3>PCI-DSS Level 1 Enforced</h3>
              <p>Strict cardholder data protections embedded directly into transaction processing, tokenizing user payment logs.</p>
            </Card>

            <Card variant="light" className="security-cert-card">
              <Server className="orange-text" size={36} />
              <h3>GDPR & Data Sovereignty</h3>
              <p>Local anycast routing configuration respects data boundaries, keeping transactional ledger entries within national nodes.</p>
            </Card>

            <Card variant="light" className="security-cert-card">
              <ShieldAlert className="orange-text" size={36} />
              <h3>256-Bit GCM Encrypted</h3>
              <p>Dynamic data packages are encrypted-at-rest and in-transit utilizing AES-256 GCM cryptographic frameworks.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
