import React, { useState, useEffect } from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { 
  ShoppingBag, Cpu, Database, Share2, 
  Check, Zap, Server, Terminal
} from 'lucide-react';
import './ProductsPage.css';

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
    <div className="products-page animate-fade">
      <SEOHelper 
        title="Products & Architecture Suite" 
        description="Explore Onfix's products: ONFIX POS, Custom Enterprise ERP, Onfix DB Core, and the Integrations & API Hub. Read technical specifications."
      />

      {/* Header Banner */}
      <section className="products-hero-section section-dark">
        <div className="container header-container text-center">
          <span className="section-pretitle">THE ONFIX SUITE</span>
          <h1 className="products-hero-title">High-Performance Ecosystem</h1>
          <p className="products-hero-subtitle">
            Next-generation enterprise frameworks engineered to eliminate write-locks, network latency, and data fragmentation.
          </p>
        </div>
      </section>

      {/* Product 1: ONFIX POS */}
      <section className="product-detail-section section" id="pos">
        <div className="container product-detail-grid">
          <div className="product-text-info">
            <div className="product-badge-wrap">
              <ShoppingBag size={18} className="orange-text" />
              <span>Flagship Hospitality POS</span>
            </div>
            <h2>ONFIX POS Core</h2>
            <p className="product-lead">
              A high-availability point-of-sale database and terminal interface built specifically for luxury hospitality and multi-location operations.
            </p>
            <p>
              Legacy POS systems suffer from local database drops and lagging room synchronization. ONFIX POS runs on physically isolated edge clusters that synchronize menu configurations, room-charge records, and transaction logs in real time.
            </p>
            <ul className="product-bullet-list">
              <li><Check size={16} className="orange-text" /> <strong>Tableside QR Ordering:</strong> Direct-to-chef ordering pathways.</li>
              <li><Check size={16} className="orange-text" /> <strong>Hotel Room Charge Sync:</strong> E2E validation against hotel PMS databases.</li>
              <li><Check size={16} className="orange-text" /> <strong>Offline Resilience:</strong> Auto-syncurization when local networks fail.</li>
            </ul>
          </div>

          <div className="product-interactive-demo">
            <Card variant="light" className="demo-window-card">
              <div className="demo-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="demo-title">Tableside POS Terminal Simulator</span>
              </div>
              <div className="demo-body">
                <p className="demo-instructions">Click a hospitality item to charge Suite 104 in real-time:</p>
                <div className="pos-menu-grid">
                  <button onClick={() => handleSimulateOrder('Dry-Aged Wagyu Ribeye', '$95.00')} disabled={isProcessingOrder} className="pos-menu-btn">
                    <span>🥩 Wagyu Ribeye</span>
                    <span className="pos-price">$95.00</span>
                  </button>
                  <button onClick={() => handleSimulateOrder('Truffle Fries & Aioli', '$18.00')} disabled={isProcessingOrder} className="pos-menu-btn">
                    <span>🍟 Truffle Fries</span>
                    <span className="pos-price">$18.00</span>
                  </button>
                  <button onClick={() => handleSimulateOrder('Smoked Negroni Special', '$22.00')} disabled={isProcessingOrder} className="pos-menu-btn">
                    <span>🍹 Smoked Negroni</span>
                    <span className="pos-price">$22.00</span>
                  </button>
                </div>
                
                <div className="pos-log-terminal">
                  <div className="log-header">
                    <Terminal size={12} className="orange-text" />
                    <span>transaction_telemetry.log</span>
                  </div>
                  <div className="log-output font-mono">
                    {posLog.map((line, idx) => (
                      <div key={idx} className="log-line">{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Product 2: Custom Enterprise ERP */}
      <section className="product-detail-section section section-dark" id="erp">
        <div className="container product-detail-grid reverse">
          <div className="product-interactive-demo">
            <Card variant="dark" className="demo-window-card">
              <div className="demo-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="demo-title">FIFO Depletion Engine Console</span>
              </div>
              <div className="demo-body">
                <div className="erp-live-ticker font-mono">
                  <div className="ticker-header">
                    <Zap size={14} className="green-text" />
                    <span>LIVE STOCK DEPLETION LOGGER</span>
                  </div>
                  <div className="ticker-lines">
                    {erpLogs.map((log, idx) => (
                      <div key={idx} className="ticker-line">{log}</div>
                    ))}
                    <div className="ticker-line typing-line">● Awaiting next checkout trigger...</div>
                  </div>
                </div>
                <div className="erp-metric-bar">
                  <div className="erp-metric-col">
                    <span className="erp-metric-val font-mono">0.05s</span>
                    <span className="erp-metric-lbl">Auto PO Generation</span>
                  </div>
                  <div className="erp-metric-col">
                    <span className="erp-metric-val font-mono">100%</span>
                    <span className="erp-metric-lbl">FIFO Accuracy</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="product-text-info">
            <div className="product-badge-wrap">
              <Cpu size={18} className="orange-text" />
              <span>Modular Cloud Enterprise ERP</span>
            </div>
            <h2>Custom Enterprise ERP</h2>
            <p className="product-lead">
              A high-frequency inventory, procurement, and accounting architecture designed for massive multi-branch organizations.
            </p>
            <p>
              Legacy ERP architectures batch process inventories overnight. Onfix ERP is built with a dynamic recipe depletion engine. When a product is sold at a branch, raw inventory stock drops are calculated instantly, automatically generating vendor purchase orders the millisecond stock drops below critical levels.
            </p>
            <ul className="product-bullet-list">
              <li><Check size={16} className="orange-text" /> <strong>Dynamic Recipe Depletion:</strong> Down-to-the-gram ingredient tracking.</li>
              <li><Check size={16} className="orange-text" /> <strong>Multi-Tenant Corporate Ledger:</strong> Real-time tax and accounting sync.</li>
              <li><Check size={16} className="orange-text" /> <strong>Automated Stocking POs:</strong> Smart supplier integrations.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Product 3: Onfix DB Core */}
      <section className="product-detail-section section" id="db-core">
        <div className="container product-detail-grid">
          <div className="product-text-info">
            <div className="product-badge-wrap">
              <Database size={18} className="orange-text" />
              <span>Proprietary Database Technology</span>
            </div>
            <h2>Onfix DB Core</h2>
            <p className="product-lead">
              An ultra-low latency, transaction-ordered ledger database engine engineered for high-concurrency operations.
            </p>
            <p>
              Standard SQL database engines rely on row locking to maintain ACID compliance under load, leading to application timeouts and buffer lag. Onfix DB Core implements a proprietary zero-lock FIFO logging format, processing database writes in sub-millisecond speeds.
            </p>
            <ul className="product-bullet-list">
              <li><Check size={16} className="orange-text" /> <strong>Lockless Transaction Pipeline:</strong> Zero write blocking.</li>
              <li><Check size={16} className="orange-text" /> <strong>Anycast Failover Clustering:</strong> 99.999% SLA guarantee.</li>
              <li><Check size={16} className="orange-text" /> <strong>Built-in Encrypted Ledger:</strong> Tamper-proof time-series logging.</li>
            </ul>
          </div>

          <div className="product-interactive-demo">
            <Card variant="light" className="demo-window-card">
              <div className="demo-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="demo-title">Latency Comparison (Lower is Better)</span>
              </div>
              <div className="demo-body">
                <div className="latency-chart">
                  <div className="latency-bar-group">
                    <div className="bar-labels">
                      <span className="bar-title font-mono">Onfix DB Core</span>
                      <span className="bar-value font-mono">0.8ms</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill onfix-bar" style={{ width: '4%' }}></div>
                    </div>
                  </div>

                  <div className="latency-bar-group">
                    <div className="bar-labels">
                      <span className="bar-title font-mono">DynamoDB (Global Tables)</span>
                      <span className="bar-value font-mono">12.2ms</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill standard-bar" style={{ width: '48%' }}></div>
                    </div>
                  </div>

                  <div className="latency-bar-group">
                    <div className="bar-labels">
                      <span className="bar-title font-mono">PostgreSQL (Replicated)</span>
                      <span className="bar-value font-mono">24.5ms</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill standard-bar" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="chart-disclaimer">
                  <Server size={12} />
                  <span>Benchmarks measured across 10,000 concurrent writes/sec.</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Product 4: API & Integrations Hub */}
      <section className="product-detail-section section section-dark" id="api-hub">
        <div className="container product-detail-grid reverse">
          <div className="product-interactive-demo">
            <Card variant="dark" className="demo-window-card">
              <div className="demo-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="demo-title">Edge Sandbox Request Terminal</span>
              </div>
              <div className="demo-body">
                <div className="sandbox-panel">
                  <div className="sandbox-input-row">
                    <span className="sandbox-method">GET</span>
                    <span className="sandbox-url">https://api.onfix.lk/v1/telemetry/nodes</span>
                    <button onClick={handleApiRequest} disabled={apiLoading} className="sandbox-send-btn">
                      {apiLoading ? 'Sending...' : 'Test Request'}
                    </button>
                  </div>
                  <div className="sandbox-response font-mono">
                    <pre><code>{apiResponse}</code></pre>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="product-text-info">
            <div className="product-badge-wrap">
              <Share2 size={18} className="orange-text" />
              <span>Secure Connected API Layer</span>
            </div>
            <h2>Integrations & API Hub</h2>
            <p className="product-lead">
              A comprehensive RESTful & GraphQL gateway connecting all enterprise systems to external providers.
            </p>
            <p>
              Onfix is designed with an API-first framework. Seamlessly connect your core transaction flows to Xero, Stripe, Uber, or Marriott PMS networks. We support robust webhooks that push live operational metrics to your target systems.
            </p>
            <ul className="product-bullet-list">
              <li><Check size={16} className="orange-text" /> <strong>GraphQL & REST Gateways:</strong> Standard interfaces for developers.</li>
              <li><Check size={16} className="orange-text" /> <strong>OAuth 2.0 Identity Server:</strong> Granular API key permission scoping.</li>
              <li><Check size={16} className="orange-text" /> <strong>Instant Webhook Relays:</strong> Event-driven operational triggers.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Product Comparison Matrix */}
      <section className="comparison-matrix-section section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-pretitle">FEATURES MATRIX</span>
            <h2 className="section-title">Ecosystem Specifications</h2>
            <p className="section-subtitle">
              Detailed technical breakdown of how Onfix compares to legacy enterprise systems.
            </p>
          </div>

          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Technical Metric</th>
                  <th>ONFIX System Core</th>
                  <th>Standard Enterprise POS</th>
                  <th>Legacy Corporate ERP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="metric-name">Avg Write Latency</td>
                  <td className="onfix-value"><strong>&lt; 1.5ms</strong> (Edge-Cached)</td>
                  <td>15ms - 40ms</td>
                  <td>50ms - 200ms</td>
                </tr>
                <tr>
                  <td className="metric-name">ACID Compliance</td>
                  <td className="onfix-value"><strong>Strict Serialized</strong> (FIFO engine)</td>
                  <td>Varies (Eventually consistent)</td>
                  <td>Lock-based Serialized</td>
                </tr>
                <tr>
                  <td className="metric-name">Offline Mode</td>
                  <td className="onfix-value"><strong>Full Sync-Back</strong> (Local node buffer)</td>
                  <td>Read-only mode</td>
                  <td>None (Cloud dependent)</td>
                </tr>
                <tr>
                  <td className="metric-name">SLA Uptime Commitment</td>
                  <td className="onfix-value"><strong>99.999%</strong></td>
                  <td>99.9%</td>
                  <td>99.5%</td>
                </tr>
                <tr>
                  <td className="metric-name">Security Frameworks</td>
                  <td className="onfix-value"><strong>PCI-DSS Level 1 & SOC 2 Type II</strong></td>
                  <td>PCI-DSS Level 2</td>
                  <td>Self-Assessed Compliance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
