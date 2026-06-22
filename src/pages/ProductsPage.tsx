import React, { useState, useEffect } from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { 
  ShoppingBag, Cpu, Database, Share2, 
  Check, Zap, Server, Terminal
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  // POS Simulator State
  const [posLog, setPosLog] = useState<string[]>(['[System] POS terminal ready. Select a menu item to simulate room charge.']);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // ERP FIFO State
  const [erpLogs, setErpLogs] = useState<string[]>([
    '[FIFO-08:12:44] Automated recipe depletion: 180g Salmon Filet from Batch #S-991',
    '[FIFO-08:12:45] Inventory level for Batch #S-991 down to 14.2kg (Reorder threshold: 15.0kg)',
    '[Procure-08:12:45] Auto-purchase order #PO-4091 generated for Salmon Filet suppliers'
  ]);

  // API Sandbox State
  const [apiResponse, setApiResponse] = useState<string>('// Click "Send Sandbox Request" to verify gateway telemetry');
  const [apiLoading, setApiLoading] = useState(false);

  // POS tableside ordering handler
  const handleSimulateOrder = (item: string, price: string) => {
    if (isProcessingOrder) return;
    setIsProcessingOrder(true);
    
    const timestamp = () => new Date().toLocaleTimeString();
    
    setPosLog(prev => [
      ...prev,
      `[Terminal-${timestamp()}] Ordering ${item} (${price}) - Routing to room database...`
    ]);

    setTimeout(() => {
      setPosLog(prev => [
        ...prev,
        `[EdgeRouter-${timestamp()}] Session resolved via sg-singapore-edge-02. Latency: 13ms.`
      ]);
    }, 400);

    setTimeout(() => {
      setPosLog(prev => [
        ...prev,
        `[DBCore-${timestamp()}] Lockless FIFO decrement of ${item} inventory successful.`
      ]);
    }, 800);

    setTimeout(() => {
      setPosLog(prev => [
        ...prev,
        `[RoomCharges-${timestamp()}] Assigned charges to Suite 104 (Verified Guest: S. Jobs).`,
        `[Telemetry-${timestamp()}] 🌟 Room charge synchronized. Status: SUCCESS.`
      ]);
      setIsProcessingOrder(false);
    }, 1200);
  };

  // Add real-time tick to ERP log
  useEffect(() => {
    const intervals = [
      'Depleted 250ml Cooking Wine from Batch #W-232',
      'Inventory level: Batch #W-232 down to 5.4L',
      'Depleted 1x Avocado from Batch #A-402',
      'Wagyu Tenderloin Batch #B-882 updated to 22.4kg',
      'Auto-routing order confirmation to vendor #VND-894',
      'FIFO queue re-sorted for Fresh Herbs: Batch #H-302 takes precedence',
    ];

    const timer = setInterval(() => {
      const randomAction = intervals[Math.floor(Math.random() * intervals.length)];
      const timeStr = new Date().toLocaleTimeString();
      setErpLogs(prev => {
        const updated = [...prev, `[FIFO-${timeStr}] ${randomAction}`];
        if (updated.length > 5) updated.shift();
        return updated;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // API simulation handler
  const handleApiRequest = () => {
    setApiLoading(true);
    setApiResponse('// Communicating with edge node...');
    setTimeout(() => {
      setApiResponse(JSON.stringify({
        status: 'success',
        node: 'lk-colombo-edge-01',
        timestamp: new Date().toISOString(),
        auth: {
          clientId: 'client_onfix_sandbox_9921',
          scope: 'pos.transactions.write, erp.inventory.read',
          roles: ['administrator']
        },
        payload: {
          transactionId: 'tx_onf_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
          amount: 145.50,
          currency: 'USD',
          method: 'ApplePay',
          latencyMs: 14
        },
        compliance: {
          pciDss: 'Level 1 Active',
          soc2Type2: 'Certified'
        }
      }, null, 2));
      setApiLoading(false);
    }, 800);
  };

  return (
    <div className="animate-fade">
      <SEOHelper 
        title="Products & Architecture Suite" 
        description="Explore Onfix's products: ONFIX POS, Custom Enterprise ERP, Onfix DB Core, and the Integrations & API Hub. Read technical specifications."
      />

      {/* Header Banner */}
      <section className="py-20 bg-[radial-gradient(circle_at_10%_20%,rgba(23,23,23,1)_0%,rgba(30,30,30,1)_90%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">THE ONFIX SUITE</span>
          <h1 className="text-[3rem] max-[991px]:text-[2.2rem] font-[850] mt-2.5 mb-5 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">High-Performance Ecosystem</h1>
          <p className="max-w-[700px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            Next-generation enterprise frameworks engineered to eliminate write-locks, network latency, and data fragmentation.
          </p>
        </div>
      </section>

      {/* Product 1: ONFIX POS */}
      <section className="py-20 border-b border-border-light" id="pos">
        <div className="container grid grid-cols-[1.1fr_0.9fr] max-[991px]:grid-cols-1 gap-[60px] max-[991px]:gap-10 items-center">
          <div className="max-[991px]:order-1">
            <div className="inline-flex items-center gap-2 text-[0.8rem] font-bold tracking-[1px] text-accent uppercase mb-4">
              <ShoppingBag size={18} className="text-accent" />
              <span>Flagship Hospitality POS</span>
            </div>
            <h2 className="text-[2.2rem] font-extrabold mb-5 tracking-[-0.5px] text-text-dark">ONFIX POS Core</h2>
            <p className="text-[1.15rem] font-medium text-text-muted-dark leading-[1.7] mb-5">
              A high-availability point-of-sale database and terminal interface built specifically for luxury hospitality and multi-location operations.
            </p>
            <p className="text-text-muted-dark leading-[1.7] mb-5 text-[0.95rem]">
              Legacy POS systems suffer from local database drops and lagging room synchronization. ONFIX POS runs on physically isolated edge clusters that synchronize menu configurations, room-charge records, and transaction logs in real time.
            </p>
            <ul className="list-none flex flex-col gap-3 mt-6">
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-dark"><Check size={16} className="text-accent shrink-0" /> <span><strong>Tableside QR Ordering:</strong> Direct-to-chef ordering pathways.</span></li>
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-dark"><Check size={16} className="text-accent shrink-0" /> <span><strong>Hotel Room Charge Sync:</strong> E2E validation against hotel PMS databases.</span></li>
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-dark"><Check size={16} className="text-accent shrink-0" /> <span><strong>Offline Resilience:</strong> Auto-syncurization when local networks fail.</span></li>
            </ul>
          </div>

          <div className="max-[991px]:order-2">
            <Card variant="light" hoverEffect={false} className="!p-0 overflow-hidden shadow-medium">
              <div className="bg-bg-light px-4 py-3 flex items-center gap-2 border-b border-border-light">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                <span className="text-[0.8rem] font-semibold text-text-muted-dark ml-2 font-body">Tableside POS Terminal Simulator</span>
              </div>
              <div className="p-6 bg-bg-card">
                <p className="text-[0.85rem] text-text-muted-dark mb-4 font-medium">Click a hospitality item to charge Suite 104 in real-time:</p>
                <div className="grid grid-cols-1 gap-3 mb-5">
                  <button onClick={() => handleSimulateOrder('Dry-Aged Wagyu Ribeye', '$95.00')} disabled={isProcessingOrder} className="flex justify-between items-center px-4.5 py-3.5 border border-border-light bg-bg-light rounded-medium font-semibold text-[0.9rem] text-text-dark cursor-pointer transition-all duration-150 ease-out hover:bg-bg-card hover:border-accent hover:shadow-[0_4px_12px_rgba(255,94,0,0.1)] hover:-translate-y-0.5">
                    <span>🥩 Wagyu Ribeye</span>
                    <span className="text-accent font-mono font-bold">$95.00</span>
                  </button>
                  <button onClick={() => handleSimulateOrder('Truffle Fries & Aioli', '$18.00')} disabled={isProcessingOrder} className="flex justify-between items-center px-4.5 py-3.5 border border-border-light bg-bg-light rounded-medium font-semibold text-[0.9rem] text-text-dark cursor-pointer transition-all duration-150 ease-out hover:bg-bg-card hover:border-accent hover:shadow-[0_4px_12px_rgba(255,94,0,0.1)] hover:-translate-y-0.5">
                    <span>🍟 Truffle Fries</span>
                    <span className="text-accent font-mono font-bold">$18.00</span>
                  </button>
                  <button onClick={() => handleSimulateOrder('Smoked Negroni Special', '$22.00')} disabled={isProcessingOrder} className="flex justify-between items-center px-4.5 py-3.5 border border-border-light bg-bg-light rounded-medium font-semibold text-[0.9rem] text-text-dark cursor-pointer transition-all duration-150 ease-out hover:bg-bg-card hover:border-accent hover:shadow-[0_4px_12px_rgba(255,94,0,0.1)] hover:-translate-y-0.5">
                    <span>🍹 Smoked Negroni</span>
                    <span className="text-accent font-mono font-bold">$22.00</span>
                  </button>
                </div>
                
                <div className="rounded-small overflow-hidden bg-[#111] text-white">
                  <div className="bg-[#1a1a1a] px-3 py-2 flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#888] border-b border-[#222]">
                    <Terminal size={12} className="text-accent" />
                    <span>transaction_telemetry.log</span>
                  </div>
                  <div className="p-3.5 h-[150px] overflow-y-auto text-[0.75rem] leading-[1.5] flex flex-col gap-1.5 font-mono text-[#ccc]">
                    {posLog.map((line, idx) => (
                      <div key={idx} className="break-all">{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Product 2: Custom Enterprise ERP */}
      <section className="py-20 border-b border-border-dark bg-bg-dark text-text-light" id="erp">
        <div className="container grid grid-cols-[0.9fr_1.1fr] max-[991px]:grid-cols-1 gap-[60px] max-[991px]:gap-10 items-center">
          <div className="max-[991px]:order-2">
            <Card variant="dark" hoverEffect={false} className="!p-0 overflow-hidden shadow-medium">
              <div className="bg-[#252525] px-4 py-3 flex items-center gap-2 border-b border-[#333]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                <span className="text-[0.8rem] font-semibold text-[#aaa] ml-2 font-body">FIFO Depletion Engine Console</span>
              </div>
              <div className="p-6 bg-[#1e1e1e]">
                <div className="bg-[#0d0d0d] border border-[#222] rounded-small overflow-hidden text-[#00ff66] font-mono">
                  <div className="bg-[#151515] px-3 py-2 flex items-center gap-2 text-[0.75rem] font-bold text-[#888] border-b border-[#222]">
                    <Zap size={14} className="text-[#00ff66]" />
                    <span>LIVE STOCK DEPLETION LOGGER</span>
                  </div>
                  <div className="p-4 h-[180px] overflow-y-auto flex flex-col gap-2 text-[0.75rem]">
                    {erpLogs.map((log, idx) => (
                      <div key={idx} className="text-[#00ff66]">{log}</div>
                    ))}
                    <div className="text-[#00ff66] animate-pulse">● Awaiting next checkout trigger...</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div className="text-center bg-[#252525] p-4 rounded-medium border border-[#333]">
                    <span className="block text-[1.5rem] font-extrabold text-accent font-mono">0.05s</span>
                    <span className="text-[0.75rem] text-[#888] uppercase font-semibold mt-1 block">Auto PO Generation</span>
                  </div>
                  <div className="text-center bg-[#252525] p-4 rounded-medium border border-[#333]">
                    <span className="block text-[1.5rem] font-extrabold text-accent font-mono">100%</span>
                    <span className="text-[0.75rem] text-[#888] uppercase font-semibold mt-1 block">FIFO Accuracy</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="max-[991px]:order-1">
            <div className="inline-flex items-center gap-2 text-[0.8rem] font-bold tracking-[1px] text-accent uppercase mb-4">
              <Cpu size={18} className="text-accent" />
              <span>Modular Cloud Enterprise ERP</span>
            </div>
            <h2 className="text-[2.2rem] font-extrabold mb-5 tracking-[-0.5px]">Custom Enterprise ERP</h2>
            <p className="text-[1.15rem] font-medium text-text-muted-light leading-[1.7] mb-5">
              A high-frequency inventory, procurement, and accounting architecture designed for massive multi-branch organizations.
            </p>
            <p className="text-text-muted-light leading-[1.7] mb-5 text-[0.95rem]">
              Legacy ERP architectures batch process inventories overnight. Onfix ERP is built with a dynamic recipe depletion engine. When a product is sold at a branch, raw inventory stock drops are calculated instantly, automatically generating vendor purchase orders the millisecond stock drops below critical levels.
            </p>
            <ul className="list-none flex flex-col gap-3 mt-6">
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-light"><Check size={16} className="text-accent shrink-0" /> <span><strong>Dynamic Recipe Depletion:</strong> Down-to-the-gram ingredient tracking.</span></li>
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-light"><Check size={16} className="text-accent shrink-0" /> <span><strong>Multi-Tenant Corporate Ledger:</strong> Real-time tax and accounting sync.</span></li>
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-light"><Check size={16} className="text-accent shrink-0" /> <span><strong>Automated Stocking POs:</strong> Smart supplier integrations.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Product 3: Onfix DB Core */}
      <section className="py-20 border-b border-border-light" id="db-core">
        <div className="container grid grid-cols-[1.1fr_0.9fr] max-[991px]:grid-cols-1 gap-[60px] max-[991px]:gap-10 items-center">
          <div className="max-[991px]:order-1">
            <div className="inline-flex items-center gap-2 text-[0.8rem] font-bold tracking-[1px] text-accent uppercase mb-4">
              <Database size={18} className="text-accent" />
              <span>Proprietary Database Technology</span>
            </div>
            <h2 className="text-[2.2rem] font-extrabold mb-5 tracking-[-0.5px] text-text-dark">Onfix DB Core</h2>
            <p className="text-[1.15rem] font-medium text-text-muted-dark leading-[1.7] mb-5">
              An ultra-low latency, transaction-ordered ledger database engine engineered for high-concurrency operations.
            </p>
            <p className="text-text-muted-dark leading-[1.7] mb-5 text-[0.95rem]">
              Standard SQL database engines rely on row locking to maintain ACID compliance under load, leading to application timeouts and buffer lag. Onfix DB Core implements a proprietary zero-lock FIFO logging format, processing database writes in sub-millisecond speeds.
            </p>
            <ul className="list-none flex flex-col gap-3 mt-6">
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-dark"><Check size={16} className="text-accent shrink-0" /> <span><strong>Lockless Transaction Pipeline:</strong> Zero write blocking.</span></li>
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-dark"><Check size={16} className="text-accent shrink-0" /> <span><strong>Anycast Failover Clustering:</strong> 99.999% SLA guarantee.</span></li>
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-dark"><Check size={16} className="text-accent shrink-0" /> <span><strong>Built-in Encrypted Ledger:</strong> Tamper-proof time-series logging.</span></li>
            </ul>
          </div>

          <div className="max-[991px]:order-2">
            <Card variant="light" hoverEffect={false} className="!p-0 overflow-hidden shadow-medium">
              <div className="bg-bg-light px-4 py-3 flex items-center gap-2 border-b border-border-light">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                <span className="text-[0.8rem] font-semibold text-text-muted-dark ml-2 font-body">Latency Comparison (Lower is Better)</span>
              </div>
              <div className="p-6 bg-bg-card">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[0.85rem] font-semibold text-text-dark">
                      <span className="font-mono">Onfix DB Core</span>
                      <span className="text-accent font-mono">0.8ms</span>
                    </div>
                    <div className="h-[14px] bg-bg-light rounded-pill overflow-hidden">
                      <div className="h-full rounded-pill bg-gradient-to-r from-accent to-[#FF8D4D] shadow-[0_0_10px_rgba(255,94,0,0.4)]" style={{ width: '4%' }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[0.85rem] font-semibold text-text-dark">
                      <span className="font-mono">DynamoDB (Global Tables)</span>
                      <span className="text-accent font-mono">12.2ms</span>
                    </div>
                    <div className="h-[14px] bg-bg-light rounded-pill overflow-hidden">
                      <div className="h-full rounded-pill bg-[#a3a3a3] dark:bg-[#404040]" style={{ width: '48%' }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[0.85rem] font-semibold text-text-dark">
                      <span className="font-mono">PostgreSQL (Replicated)</span>
                      <span className="text-accent font-mono">24.5ms</span>
                    </div>
                    <div className="h-[14px] bg-bg-light rounded-pill overflow-hidden">
                      <div className="h-full rounded-pill bg-[#a3a3a3] dark:bg-[#404040]" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[0.75rem] text-[#888] mt-5">
                  <Server size={12} />
                  <span>Benchmarks measured across 10,000 concurrent writes/sec.</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Product 4: API & Integrations Hub */}
      <section className="py-20 border-b border-border-dark bg-bg-dark text-text-light" id="api-hub">
        <div className="container grid grid-cols-[0.9fr_1.1fr] max-[991px]:grid-cols-1 gap-[60px] max-[991px]:gap-10 items-center">
          <div className="max-[991px]:order-2">
            <Card variant="dark" hoverEffect={false} className="!p-0 overflow-hidden shadow-medium">
              <div className="bg-[#252525] px-4 py-3 flex items-center gap-2 border-b border-[#333]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                <span className="text-[0.8rem] font-semibold text-[#aaa] ml-2 font-body">Edge Sandbox Request Terminal</span>
              </div>
              <div className="p-6 bg-[#1e1e1e]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 bg-[#111] p-1.5 rounded-medium border border-[#333]">
                    <span className="bg-[#10b981] text-white font-extrabold text-[0.75rem] px-2.5 py-1.5 rounded-small font-mono">GET</span>
                    <span className="font-mono text-[0.8rem] text-[#bbb] grow overflow-hidden text-ellipsis whitespace-nowrap">https://api.onfix.lk/v1/telemetry/nodes</span>
                    <button onClick={handleApiRequest} disabled={apiLoading} className="bg-accent text-white font-bold text-[0.8rem] px-4 py-2 rounded-small cursor-pointer transition-all duration-150 ease-out hover:bg-accent-hover">
                      {apiLoading ? 'Sending...' : 'Test Request'}
                    </button>
                  </div>
                  <div className="bg-[#090909] border border-[#222] rounded-small p-4 text-[0.75rem] h-[180px] overflow-y-auto text-[#38bdf8] font-mono">
                    <pre><code>{apiResponse}</code></pre>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="max-[991px]:order-1">
            <div className="inline-flex items-center gap-2 text-[0.8rem] font-bold tracking-[1px] text-accent uppercase mb-4">
              <Share2 size={18} className="text-accent" />
              <span>Secure Connected API Layer</span>
            </div>
            <h2 className="text-[2.2rem] font-extrabold mb-5 tracking-[-0.5px]">Integrations & API Hub</h2>
            <p className="text-[1.15rem] font-medium text-text-muted-light leading-[1.7] mb-5">
              A comprehensive RESTful & GraphQL gateway connecting all enterprise systems to external providers.
            </p>
            <p className="text-text-muted-light leading-[1.7] mb-5 text-[0.95rem]">
              Onfix is designed with an API-first framework. Seamlessly connect your core transaction flows to Xero, Stripe, Uber, or Marriott PMS networks. We support robust webhooks that push live operational metrics to your target systems.
            </p>
            <ul className="list-none flex flex-col gap-3 mt-6">
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-light"><Check size={16} className="text-accent shrink-0" /> <span><strong>GraphQL & REST Gateways:</strong> Standard interfaces for developers.</span></li>
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-light"><Check size={16} className="text-accent shrink-0" /> <span><strong>OAuth 2.0 Identity Server:</strong> Granular API key permission scoping.</span></li>
              <li className="flex items-center gap-2.5 text-[0.95rem] text-text-light"><Check size={16} className="text-accent shrink-0" /> <span><strong>Instant Webhook Relays:</strong> Event-driven operational triggers.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Product Comparison Matrix */}
      <section className="bg-bg-light border-t border-border-light py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">FEATURES MATRIX</span>
            <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">Ecosystem Specifications</h2>
            <p className="max-w-[700px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
              Detailed technical breakdown of how Onfix compares to legacy enterprise systems.
            </p>
          </div>

          <div className="w-full overflow-x-auto mt-[50px] rounded-medium shadow-medium bg-bg-card border border-border-light">
            <table className="w-full border-collapse text-left text-[0.95rem]">
              <thead>
                <tr>
                  <th className="bg-bg-light text-text-dark font-bold p-[20px_24px] border-b-2 border-border-light font-heading">Technical Metric</th>
                  <th className="bg-bg-light text-text-dark font-bold p-[20px_24px] border-b-2 border-border-light font-heading">ONFIX System Core</th>
                  <th className="bg-bg-light text-text-dark font-bold p-[20px_24px] border-b-2 border-border-light font-heading">Standard Enterprise POS</th>
                  <th className="bg-bg-light text-text-dark font-bold p-[20px_24px] border-b-2 border-border-light font-heading">Legacy Corporate ERP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-bg-light">
                  <td className="p-[20px_24px] border-b border-border-light font-semibold text-text-dark">Avg Write Latency</td>
                  <td className="p-[20px_24px] border-b border-border-light text-accent bg-accent/4"><strong>&lt; 1.5ms</strong> (Edge-Cached)</td>
                  <td className="p-[20px_24px] border-b border-border-light text-text-muted-dark">15ms - 40ms</td>
                  <td className="p-[20px_24px] border-b border-border-light text-text-muted-dark">50ms - 200ms</td>
                </tr>
                <tr className="hover:bg-bg-light">
                  <td className="p-[20px_24px] border-b border-border-light font-semibold text-text-dark">ACID Compliance</td>
                  <td className="p-[20px_24px] border-b border-border-light text-accent bg-accent/4"><strong>Strict Serialized</strong> (FIFO engine)</td>
                  <td className="p-[20px_24px] border-b border-border-light text-text-muted-dark">Varies (Eventually consistent)</td>
                  <td className="p-[20px_24px] border-b border-border-light text-text-muted-dark">Lock-based Serialized</td>
                </tr>
                <tr className="hover:bg-bg-light">
                  <td className="p-[20px_24px] border-b border-border-light font-semibold text-text-dark">Offline Mode</td>
                  <td className="p-[20px_24px] border-b border-border-light text-accent bg-accent/4"><strong>Full Sync-Back</strong> (Local node buffer)</td>
                  <td className="p-[20px_24px] border-b border-border-light text-text-muted-dark">Read-only mode</td>
                  <td className="p-[20px_24px] border-b border-border-light text-text-muted-dark">None (Cloud dependent)</td>
                </tr>
                <tr className="hover:bg-bg-light">
                  <td className="p-[20px_24px] border-b border-border-light font-semibold text-text-dark">SLA Uptime Commitment</td>
                  <td className="p-[20px_24px] border-b border-border-light text-accent bg-accent/4"><strong>99.999%</strong></td>
                  <td className="p-[20px_24px] border-b border-border-light text-text-muted-dark">99.9%</td>
                  <td className="p-[20px_24px] border-b border-border-light text-text-muted-dark">99.5%</td>
                </tr>
                <tr className="hover:bg-bg-light">
                  <td className="p-[20px_24px] border-b-0 font-semibold text-text-dark">Security Frameworks</td>
                  <td className="p-[20px_24px] border-b-0 text-accent bg-accent/4"><strong>PCI-DSS Level 1 & SOC 2 Type II</strong></td>
                  <td className="p-[20px_24px] border-b-0 text-text-muted-dark">PCI-DSS Level 2</td>
                  <td className="p-[20px_24px] border-b-0 text-text-muted-dark">Self-Assessed Compliance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
