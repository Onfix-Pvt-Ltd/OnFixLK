import React from 'react';
import { Activity, Layers, Database, Sparkles, Sliders } from 'lucide-react';

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

      <div className="flex min-h-[372px]">
        {/* Sidebar */}
        <aside className="w-[156px] shrink-0 bg-[#0f1012] p-4 flex flex-col max-[420px]:w-[50px] max-[420px]:p-[14px_8px]">
          <div className="flex items-center gap-2.25 p-[0_4px_4px] mb-4 max-[420px]:justify-center">
            <span className="w-6 h-6 rounded-[7px] bg-gradient-to-br from-[#ff7a2e] to-accent text-white font-heading font-extrabold text-[0.85rem] flex items-center justify-center">O</span>
            <span className="font-heading font-bold text-[0.92rem] text-white tracking-[0.2px] max-[420px]:hidden">Onfix</span>
          </div>
          <nav className="flex flex-col gap-0.75">
            {NAV.map(({ icon: Icon, label, active }) => (
              <span key={label} className={`flex items-center gap-2.25 p-2 rounded-lg text-[0.74rem] font-medium text-[#8b919c] max-[420px]:justify-center max-[420px]:py-2.25 max-[420px]:px-0 ${active ? 'bg-accent/16 text-white font-semibold [&>svg]:text-accent' : ''}`}>
                <Icon size={15} />
                <span className="max-[420px]:hidden">{label}</span>
              </span>
            ))}
          </nav>
          <div className="mt-auto bg-white/6 border border-white/8 rounded-[11px] p-3 flex flex-col gap-2 max-[420px]:hidden">
            <span className="text-[0.72rem] font-semibold text-[#e7e9ee]">Need a hand?</span>
            <span className="self-start text-[0.66rem] font-bold text-white bg-gradient-to-br from-[#ff7a2e] to-accent px-[11px] py-[5px] rounded-pill">Talk to us</span>
          </div>
        </aside>

        {/* Main panel */}
        <main className="flex-1 min-w-0 bg-[#fafbfc] p-[16px_16px_18px] flex flex-col gap-3.25">
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex flex-col">
              <span className="font-heading text-[0.98rem] font-extrabold text-[#111317] leading-tight">Dashboard</span>
              <span className="text-[0.68rem] text-[#98a0ac] mt-0.5">Welcome back, Alex 👋</span>
            </div>
            <div className="flex items-center gap-2.25">
              <span className="text-[0.68rem] text-[#aab0bb] bg-white border border-[#e8eaef] rounded-pill px-3.5 py-1.5 whitespace-nowrap">Search…</span>
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2b2d33] to-[#44464d] text-white text-[0.6rem] font-bold flex items-center justify-center shrink-0">AB</span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {KPIS.map(k => (
              <div key={k.label} className="bg-white border border-[#ebedf1] rounded-xl p-[11px_12px] flex flex-col gap-0.75">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5px] text-[#98a0ac]">{k.label}</span>
                <span className="font-heading text-[1.06rem] font-extrabold text-[#111317] tracking-[-0.3px]">{k.value}</span>
                <span className="text-[0.58rem] font-bold text-[#059669]">▲ {k.delta}</span>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="bg-white border border-[#ebedf1] rounded-xl p-[13px_14px]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.74rem] font-bold text-[#1d2127]">Revenue this week</span>
              <span className="text-[0.58rem] font-bold text-accent bg-accent/9 rounded-pill px-2 py-0.75">+18%</span>
            </div>
            <div className="flex items-end gap-2.25 h-[78px]">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-[5px_5px_2px_2px] min-h-[8px] ${
                    h === PEAK 
                      ? 'bg-gradient-to-b from-[#ff7a2e] to-accent shadow-[0_4px_12px_-2px_rgba(255,94,0,0.45)]' 
                      : 'bg-gradient-to-b from-[#ffc59c] to-[#ff8a4c]'
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Activity list */}
          <div className="bg-white border border-[#ebedf1] rounded-xl p-[13px_14px]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.74rem] font-bold text-[#1d2127]">Recent activity</span>
            </div>
            {ACTIVITY.map(a => (
              <div key={a.title} className="flex items-center gap-2.5 py-2.25 border-t border-[#f0f1f4] first-of-type:border-t-0 first-of-type:pt-0.5">
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
        </main>
      </div>
    </div>
  );
};
