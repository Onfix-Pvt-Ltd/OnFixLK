import React from 'react';
import { Activity, Layers, Database, Sparkles, Sliders } from 'lucide-react';
import './DashboardMockup.css';

/* A polished, fictional product UI used as the hero visual so visitors
   immediately see that Onfix builds real software. */

const NAV = [
  { icon: Activity, label: 'Dashboard', active: true },
  { icon: Layers, label: 'Projects', active: false },
  { icon: Database, label: 'Analytics', active: false },
  { icon: Sparkles, label: 'AI Assistant', active: false },
  { icon: Sliders, label: 'Settings', active: false },
];

const KPIS = [
  { label: 'Revenue', value: '$48.2k', delta: '+12%' },
  { label: 'Active users', value: '2,340', delta: '+8%' },
  { label: 'Tasks done', value: '96%', delta: '+4%' },
];

const BARS = [42, 58, 35, 72, 50, 88, 64];
const PEAK = Math.max(...BARS);

const ACTIVITY = [
  { initials: 'AC', title: 'Website redesign', client: 'Acme Co', status: 'Done', tone: 'green' },
  { initials: 'LM', title: 'AI chatbot deployed', client: 'Lumina', status: 'Live', tone: 'orange' },
  { initials: 'NW', title: 'Payment integration', client: 'Northwind', status: 'In progress', tone: 'gray' },
];

export const DashboardMockup: React.FC = () => {
  return (
    <div className="mock-window" aria-label="Example dashboard from software built by Onfix">
      {/* Browser-style title bar */}
      <div className="mock-titlebar">
        <span className="mock-dot red" />
        <span className="mock-dot yellow" />
        <span className="mock-dot green" />
        <span className="mock-url">app.onfix.lk / dashboard</span>
        <span className="mock-live"><span className="mock-live-dot" /> Live</span>
      </div>

      <div className="mock-body">
        {/* Sidebar */}
        <aside className="mock-sidebar">
          <div className="mock-brand">
            <span className="mock-brand-mark">O</span>
            <span className="mock-brand-name">Onfix</span>
          </div>
          <nav className="mock-nav">
            {NAV.map(({ icon: Icon, label, active }) => (
              <span key={label} className={`mock-nav-item ${active ? 'active' : ''}`}>
                <Icon size={15} />
                <span>{label}</span>
              </span>
            ))}
          </nav>
          <div className="mock-help">
            <span className="mock-help-title">Need a hand?</span>
            <span className="mock-help-btn">Talk to us</span>
          </div>
        </aside>

        {/* Main panel */}
        <main className="mock-main">
          <div className="mock-topbar">
            <div className="mock-topbar-titles">
              <span className="mock-page-title">Dashboard</span>
              <span className="mock-page-sub">Welcome back, Alex 👋</span>
            </div>
            <div className="mock-topbar-right">
              <span className="mock-search">Search…</span>
              <span className="mock-avatar">AB</span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="mock-kpis">
            {KPIS.map(k => (
              <div key={k.label} className="mock-kpi">
                <span className="mock-kpi-label">{k.label}</span>
                <span className="mock-kpi-value">{k.value}</span>
                <span className="mock-kpi-delta">▲ {k.delta}</span>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="mock-card mock-chart">
            <div className="mock-card-head">
              <span className="mock-card-title">Revenue this week</span>
              <span className="mock-card-tag">+18%</span>
            </div>
            <div className="mock-bars">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className={`mock-bar ${h === PEAK ? 'peak' : ''}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Activity list */}
          <div className="mock-card mock-list">
            <div className="mock-card-head">
              <span className="mock-card-title">Recent activity</span>
            </div>
            {ACTIVITY.map(a => (
              <div key={a.title} className="mock-row">
                <span className="mock-row-avatar">{a.initials}</span>
                <div className="mock-row-text">
                  <span className="mock-row-title">{a.title}</span>
                  <span className="mock-row-client">{a.client}</span>
                </div>
                <span className={`mock-badge ${a.tone}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
