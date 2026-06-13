import React from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Calendar, ArrowRight, FileText, Cpu, Star } from 'lucide-react';
import './InsightsPage.css';

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
    <div className="insights-page animate-fade">
      <SEOHelper 
        title="Insights, Bulletins & Case Studies" 
        description="Read Onfix's technical insights, engineering bulletins, SOC 2 reports, and case studies detailing our global edge deployments."
      />

      {/* Hero Header */}
      <section className="insights-hero-section section-dark">
        <div className="container header-container text-center">
          <span className="section-pretitle">ONFIX INSIGHTS</span>
          <h1 className="insights-hero-title">Technical Bulletins & Reports</h1>
          <p className="insights-hero-subtitle">
            Stay up to date with engineering updates, database benchmarks, and case studies from our global client deployments.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="insights-content-section section">
        <div className="container insights-grid">
          
          {/* Left Column: News / Blog */}
          <div className="articles-column">
            <h2 className="column-title">Featured Release</h2>
            
            {/* Highlighted Featured Post */}
            <Card variant="light" className="featured-article-card">
              <div className="featured-img-placeholder">
                <div className="featured-badge">
                  <Star size={12} fill="currentColor" />
                  <span>CORE RELEASE</span>
                </div>
                <div className="featured-overlay-content">
                  <span className="article-date"><Calendar size={12} /> May 20, 2026</span>
                  <h3>Onfix DB Core v4.2 Release: Achieving Sub-Millisecond Concurrency</h3>
                </div>
              </div>
              <div className="featured-article-body">
                <p>
                  Our database systems engineering group has finished deploying the lockless FIFO database logging format across all global Anycast edge nodes. In live operational tests across 10,000 concurrent writes/sec, this architecture reduced write processing latencies to an average of 0.8ms, resolving legacy locking bottlenecks completely.
                </p>
                <div className="featured-footer">
                  <span className="read-time">8 min read</span>
                  <Button variant="secondary" className="read-btn" icon={<ArrowRight size={14} />}>
                    Read Technical Report
                  </Button>
                </div>
              </div>
            </Card>

            <h2 className="column-title" style={{ marginTop: '50px' }}>Recent Bulletins</h2>
            <div className="articles-subgrid">
              {articles.map((art) => (
                <Card key={art.id} variant="light" className="article-grid-card">
                  <span className="article-tag">{art.tag}</span>
                  <h3>{art.title}</h3>
                  <p>{art.desc}</p>
                  <div className="article-card-footer">
                    <span className="article-date-sub">{art.date}</span>
                    <span className="article-read-time">{art.readTime}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar (Technical bulletins) */}
          <div className="bulletins-column">
            <Card variant="dark" className="sidebar-bulletins-card">
              <div className="sidebar-header">
                <Cpu className="orange-text" size={20} />
                <h3>Engine Patch Logs</h3>
              </div>
              <p className="sidebar-desc">
                Technical release logs and network routing adjustments pushed to global Anycast endpoints.
              </p>

              <div className="bulletin-list">
                {bulletins.map((b, idx) => (
                  <div key={idx} className="bulletin-item">
                    <div className="bulletin-meta">
                      <span className="bulletin-version font-mono">{b.version}</span>
                      <span className="bulletin-date font-mono">{b.date}</span>
                    </div>
                    <p className="bulletin-text">{b.note}</p>
                  </div>
                ))}
              </div>

              <div className="sidebar-footer">
                <a href="#contact" className="sidebar-audit-link">
                  <span>Inquire about custom patches</span> <ArrowRight size={14} />
                </a>
              </div>
            </Card>

            <Card variant="light" className="whitepaper-download-card">
              <FileText className="orange-text" size={32} />
              <h3>FIFO Lock-Free DB Whitepaper</h3>
              <p>Download our complete technical specifications document on sub-millisecond ACID processing.</p>
              <Button href="#contact" variant="primary" className="whitepaper-btn">
                Request Whitepaper
              </Button>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
};
