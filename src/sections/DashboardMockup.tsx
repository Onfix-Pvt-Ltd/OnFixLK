import React from 'react';
import { Activity, Layers, Database, Sparkles, Sliders } from 'lucide-react';

const NAV = [
  { icon: Activity, label: 'Dashboard' },
  { icon: Layers, label: 'Projects' },
  { icon: Database, label: 'Analytics' },
  { icon: Sparkles, label: 'AI Assistant' },
  { icon: Sliders, label: 'Settings' },
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

export const DashboardMockup: React.FC<{ isRevealed?: boolean }> = ({ isRevealed = false }) => {
  const [activeTab, setActiveTab] = React.useState('Dashboard');

  // AI Assistant Chat State
  const [messages, setMessages] = React.useState([
    { sender: 'assistant', text: 'Hello Alex! I am your Onfix AI assistant. How can I help you run your business systems today?' }
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  // Settings Toggles State
  const [backups, setBackups] = React.useState(true);
  const [slackAlerts, setSlackAlerts] = React.useState(true);
  const [logsStream, setLogsStream] = React.useState(false);

  const getTabSubtitle = (tab: string) => {
    switch (tab) {
      case 'Projects': return 'Track your builds and milestones';
      case 'Analytics': return 'Real-time performance telemetry';
      case 'AI Assistant': return 'Ask Onfix AI about your systems';
      case 'Settings': return 'Configure custom middleware and backups';
      default: return 'Welcome back, Alex 👋';
    }
  };

  const handlePromptClick = (prompt: string) => {
    if (isTyping) return;
    setMessages(prev => [...prev, { sender: 'user', text: prompt }]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      if (prompt.includes('health')) {
        reply = 'System Node-A: healthy (CPU 12%, RAM 45%). Latency is 18ms. Database check: optimal.';
      } else if (prompt.includes('queries')) {
        reply = 'Slow query detected in billing: SELECT * FROM checkouts. Missing index on "created_at". Run: CREATE INDEX idx_checkout_created ON checkouts(created_at);';
      } else {
        reply = 'HubSpot, Stripe, & Slack connections audited. All API endpoints active and responding within 120ms.';
      }
      setMessages(prev => [...prev, { sender: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="flex flex-col gap-3.25 animate-tab-fade">
            {/* KPI cards */}
            <div className="grid grid-cols-3 gap-2.5">
              {KPIS.map((k, idx) => (
                <div 
                  key={k.label} 
                  className={`bg-white border border-[#ebedf1] rounded-xl p-[11px_12px] flex flex-col gap-0.75 ${
                    isRevealed ? 'animate-stat-pop' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${600 + idx * 200}ms` }}
                >
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5px] text-[#98a0ac]">{k.label}</span>
                  <span className="font-heading text-[1.06rem] font-extrabold text-[#111317] tracking-[-0.3px]">{k.value}</span>
                  <span className="text-[0.58rem] font-bold text-[#059669]">▲ {k.delta}</span>
                </div>
              ))}
            </div>

            {/* Mini chart */}
            <div 
              className={`bg-white border border-[#ebedf1] rounded-xl p-[13px_14px] max-[560px]:hidden ${
                isRevealed ? 'animate-chart-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: '1000ms' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[0.74rem] font-bold text-[#1d2127]">Revenue this week</span>
                <span className="text-[0.58rem] font-bold text-accent bg-accent/9 rounded-pill px-2 py-0.75">+18%</span>
              </div>
              <div className="flex items-end gap-2.25 h-[78px]">
                {BARS.map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-[5px_5px_2px_2px] min-h-[8px] origin-bottom ${
                      h === PEAK 
                        ? 'bg-gradient-to-b from-[#ff7a2e] to-accent shadow-[0_4px_12px_-2px_rgba(255,94,0,0.45)]' 
                        : 'bg-gradient-to-b from-[#ffc59c] to-[#ff8a4c]'
                    } ${isRevealed ? 'animate-bar-grow' : 'scale-y-0'}`}
                    style={{ 
                      height: `${h}%`,
                      animationDelay: `${1200 + i * 100}ms`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Activity list */}
            <div 
              className={`bg-white border border-[#ebedf1] rounded-xl p-[13px_14px] ${
                isRevealed ? 'animate-chart-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: '1300ms' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[0.74rem] font-bold text-[#1d2127]">Recent activity</span>
              </div>
              {ACTIVITY.map((a, idx) => (
                <div 
                  key={a.title} 
                  className={`flex items-center gap-2.5 py-2.25 border-t border-[#f0f1f4] first-of-type:border-t-0 first-of-type:pt-0.5 ${
                    isRevealed ? 'animate-activity-slide' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${1450 + idx * 200}ms` }}
                >
                  <span className="w-[27px] h-[27px] rounded-lg bg-[#f1f4f8] text-[#54607a] text-[0.58rem] font-extrabold flex items-center justify-center shrink-0">{a.initials}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[0.72rem] font-semibold text-[#1d2127] whitespace-nowrap overflow-hidden text-ellipsis">{a.title}</span>
                    <span className="text-[0.62rem] text-[#98a0ac]">{a.client}</span>
                  </div>
                  <span className={`ml-auto text-[0.56rem] font-bold uppercase tracking-[0.4px] px-2.25 py-0.75 rounded-pill whitespace-nowrap ${
                    a.tone === 'green' ? 'text-[#059669] bg-[#059669]/10' :
                    a.tone === 'orange' ? 'text-accent bg-accent/10' :
                    'text-[#6b7280] bg-[#6b7280]/10'
                  }`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Projects':
        return (
          <div className="flex flex-col gap-3 animate-tab-fade">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white border border-[#ebedf1] rounded-xl p-[11px_12px] flex flex-col gap-0.75">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5px] text-[#98a0ac]">Total builds</span>
                <span className="font-heading text-[1.06rem] font-extrabold text-[#111317]">14</span>
                <span className="text-[0.58rem] font-bold text-[#059669]">▲ 100% On Time</span>
              </div>
              <div className="bg-white border border-[#ebedf1] rounded-xl p-[11px_12px] flex flex-col gap-0.75">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5px] text-[#98a0ac]">Completed</span>
                <span className="font-heading text-[1.06rem] font-extrabold text-[#111317]">84</span>
                <span className="text-[0.58rem] font-bold text-[#059669]">QA Passed</span>
              </div>
              <div className="bg-white border border-[#ebedf1] rounded-xl p-[11px_12px] flex flex-col gap-0.75">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5px] text-[#98a0ac]">Deploy Rate</span>
                <span className="font-heading text-[1.06rem] font-extrabold text-[#111317]">98.8%</span>
                <span className="text-[0.58rem] font-bold text-[#059669]">Weekly Releases</span>
              </div>
            </div>

            <div className="bg-white border border-[#ebedf1] rounded-xl p-[13px_14px] flex flex-col gap-3">
              <span className="text-[0.74rem] font-bold text-[#1d2127]">Active development builds</span>
              {[
                { name: 'Hotel PMS System', type: 'SaaS App', progress: 85, color: 'bg-accent' },
                { name: 'Onfix CRM Webnode', type: 'Custom Middleware', progress: 50, color: 'bg-[#ff9850]' },
                { name: 'Retail Checkout Flow', type: 'Client integration', progress: 100, color: 'bg-[#22c55e]' }
              ].map((proj) => (
                <div key={proj.name} className="flex flex-col gap-1.5 py-1 first-of-type:pt-0">
                  <div className="flex items-center justify-between text-[0.72rem]">
                    <span className="font-semibold text-[#1d2127]">{proj.name}</span>
                    <span className="text-[#98a0ac] font-medium">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-[#f1f3f7] h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${proj.color} rounded-full transition-all duration-500`} style={{ width: `${proj.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Analytics':
        return (
          <div className="flex flex-col gap-3 animate-tab-fade">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white border border-[#ebedf1] rounded-xl p-[11px_12px] flex flex-col gap-0.75">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5px] text-[#98a0ac]">Avg Latency</span>
                <span className="font-heading text-[1.06rem] font-extrabold text-[#111317]">124ms</span>
                <span className="text-[0.58rem] font-bold text-[#059669]">▼ 8ms vs yesterday</span>
              </div>
              <div className="bg-white border border-[#ebedf1] rounded-xl p-[11px_12px] flex flex-col gap-0.75">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5px] text-[#98a0ac]">Error rate</span>
                <span className="font-heading text-[1.06rem] font-extrabold text-[#111317]">0.02%</span>
                <span className="text-[0.58rem] font-bold text-[#059669]">Within limits</span>
              </div>
              <div className="bg-white border border-[#ebedf1] rounded-xl p-[11px_12px] flex flex-col gap-0.75">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5px] text-[#98a0ac]">API Requests</span>
                <span className="font-heading text-[1.06rem] font-extrabold text-[#111317]">1.2M</span>
                <span className="text-[0.58rem] font-bold text-[#059669]">▲ 14% this month</span>
              </div>
            </div>

            <div className="bg-white border border-[#ebedf1] rounded-xl p-[13px_14px] flex flex-col gap-2.5">
              <span className="text-[0.74rem] font-bold text-[#1d2127]">System Node Latencies</span>
              <div className="flex flex-col gap-1 border-t border-[#f0f1f4] pt-1">
                {[
                  { endpoint: '/api/v1/checkout', latency: '98ms', status: 'Optimal', color: 'text-[#22c55e]' },
                  { endpoint: '/api/v1/auth/login', latency: '42ms', status: 'Optimal', color: 'text-[#22c55e]' },
                  { endpoint: '/api/v1/ai/generate', latency: '420ms', status: 'Degraded', color: 'text-[#f97316]' },
                  { endpoint: '/api/v1/telemetry', latency: '14ms', status: 'Optimal', color: 'text-[#22c55e]' }
                ].map((node) => (
                  <div key={node.endpoint} className="flex items-center justify-between py-1.5 text-[0.68rem] border-b border-[#f5f6f9] last-of-type:border-b-0">
                    <span className="font-mono text-[#4b5563]">{node.endpoint}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-[#111317]">{node.latency}</span>
                      <span className={`font-bold text-[0.58rem] uppercase tracking-[0.2px] ${node.color}`}>{node.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'AI Assistant':
        return (
          <div className="flex flex-col gap-3.25 h-full animate-tab-fade">
            {/* Messages box */}
            <div className="bg-white border border-[#ebedf1] rounded-xl p-3 flex-1 flex flex-col gap-2.5 min-h-[170px] max-h-[200px] overflow-y-auto max-[560px]:min-h-[140px] max-[560px]:max-h-[160px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] text-[0.68rem] p-2 rounded-xl leading-[1.4] ${
                    msg.sender === 'user' 
                      ? 'bg-accent text-white rounded-br-none' 
                      : 'bg-[#f1f3f7] text-[#111317] rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1 p-2 bg-[#f1f3f7] rounded-xl rounded-bl-none self-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9aa1ad] animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9aa1ad] animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9aa1ad] animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.5px] text-[#9ca3af]">Quick Prompts</span>
              <div className="flex flex-wrap gap-1.75">
                {[
                  { text: 'Check system health 📊', val: 'health' },
                  { text: 'Optimize queries ⚡', val: 'query' },
                  { text: 'Check stripe & hubspot 🔌', val: 'integrations' }
                ].map((chip) => (
                  <button
                    key={chip.val}
                    onClick={() => handlePromptClick(chip.text)}
                    disabled={isTyping}
                    className="text-[0.6rem] font-medium text-[#4b5563] bg-white border border-[#ebedf1] hover:border-accent hover:text-accent transition-colors px-2.5 py-1.25 rounded-pill cursor-pointer outline-none select-none disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {chip.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="flex flex-col gap-3 animate-tab-fade">
            <div className="bg-white border border-[#ebedf1] rounded-xl p-[14px_16px] flex flex-col gap-3.5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.74rem] font-bold text-[#1d2127]">System Controls</span>
                <span className="text-[0.62rem] text-[#98a0ac]">Customize your node settings in real time.</span>
              </div>
              
              <div className="flex flex-col gap-3.25 border-t border-[#f0f1f4] pt-3">
                {[
                  { label: 'Daily Database Backups', desc: 'Secure snapshot stored in AWS Glacier.', val: backups, set: setBackups },
                  { label: 'Slack Alerts on Failure', desc: 'Notify Onfix dev team on anomalies.', val: slackAlerts, set: setSlackAlerts },
                  { label: 'Real-Time Log Streaming', desc: 'Pipe console out to datadog client.', val: logsStream, set: setLogsStream }
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[0.7rem] font-semibold text-[#111317]">{s.label}</span>
                      <span className="text-[0.58rem] text-[#98a0ac]">{s.desc}</span>
                    </div>
                    {/* Toggle Button */}
                    <button
                      onClick={() => s.set(!s.val)}
                      className={`w-[34px] h-[18px] rounded-pill relative shrink-0 transition-colors duration-300 outline-none border-none cursor-pointer ${
                        s.val ? 'bg-accent' : 'bg-[#e4e4e7]'
                      }`}
                    >
                      <span 
                        className={`absolute w-3.5 h-3.5 rounded-full bg-white top-0.5 left-0.5 transition-transform duration-300 ${
                          s.val ? 'translate-x-4' : 'translate-x-0'
                        }`} 
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[540px] bg-white border border-[#e7e9ee] rounded-[16px] overflow-hidden font-body shadow-[0_32px_64px_-24px_rgba(15,23,42,0.30),0_12px_28px_-12px_rgba(15,23,42,0.14)]" aria-label="Example dashboard from software built by Onfix">
      {/* Browser-style title bar */}
      <div className="flex items-center gap-[7px] px-3.5 h-10 bg-[#f7f8fa] border-b border-[#ececf1]">
        <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#28c840]" />
        <span className="ml-2.5 text-[0.7rem] text-[#9aa1ad] font-mono tracking-[0.2px]">app.onfix.lk / dashboard</span>
        <span className="ml-auto inline-flex items-center gap-1.25 text-[0.62rem] font-bold uppercase tracking-[0.6px] text-[#16a34a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_0_3px_rgba(34,197,94,0.18)]" /> Live
        </span>
      </div>

      <div className="flex h-[440px] max-[560px]:h-auto">
        {/* Sidebar */}
        <aside 
          className={`w-[156px] shrink-0 bg-[#0f1012] p-4 flex flex-col max-[420px]:w-[50px] max-[420px]:p-[14px_8px] max-[560px]:hidden ${
            isRevealed ? 'animate-sidebar-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '300ms' }}
        >
          <div className="flex items-center gap-2.25 p-[0_4px_4px] mb-4 max-[420px]:justify-center">
            <span className="w-6 h-6 rounded-[7px] bg-gradient-to-br from-[#ff7a2e] to-accent text-white font-heading font-extrabold text-[0.85rem] flex items-center justify-center">O</span>
            <span className="font-heading font-bold text-[0.92rem] text-white tracking-[0.2px] max-[420px]:hidden">Onfix</span>
          </div>
          <nav className="flex flex-col gap-0.75">
            {NAV.map(({ icon: Icon, label }) => {
              const active = activeTab === label;
              return (
                <button 
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={`flex items-center gap-2.25 p-2 rounded-lg text-[0.74rem] font-medium text-[#8b919c] transition-colors cursor-pointer hover:bg-white/5 hover:text-white max-[420px]:justify-center max-[420px]:py-2.25 max-[420px]:px-0 text-left border-none outline-none ${
                    active ? 'bg-accent/16 text-white font-semibold [&>svg]:text-accent' : ''
                  }`}
                >
                  <Icon size={15} />
                  <span className="max-[420px]:hidden">{label}</span>
                </button>
              );
            })}
          </nav>
          <div className="mt-auto bg-white/6 border border-white/8 rounded-[11px] p-3 flex flex-col gap-2 max-[420px]:hidden">
            <span className="text-[0.72rem] font-semibold text-[#e7e9ee]">Need a hand?</span>
            <button 
              onClick={() => setActiveTab('AI Assistant')}
              className="self-start text-[0.66rem] font-bold text-white bg-gradient-to-br from-[#ff7a2e] to-accent px-[11px] py-[5px] rounded-pill border-none cursor-pointer outline-none hover:brightness-110 active:scale-95 transition-all"
            >
              Talk to us
            </button>
          </div>
        </aside>

        {/* Main panel */}
        <main className="flex-1 min-w-0 bg-[#fafbfc] p-[16px_16px_18px] flex flex-col gap-3.25 overflow-y-auto">
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex flex-col">
              <span className="font-heading text-[0.98rem] font-extrabold text-[#111317] leading-tight">
                {activeTab}
              </span>
              <span className="text-[0.68rem] text-[#98a0ac] mt-0.5">
                {getTabSubtitle(activeTab)}
              </span>
            </div>
            <div className="flex items-center gap-2.25">
              <span className="text-[0.68rem] text-[#aab0bb] bg-white border border-[#e8eaef] rounded-pill px-3.5 py-1.5 whitespace-nowrap">Search…</span>
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2b2d33] to-[#44464d] text-white text-[0.6rem] font-bold flex items-center justify-center shrink-0">AB</span>
            </div>
          </div>

          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};
