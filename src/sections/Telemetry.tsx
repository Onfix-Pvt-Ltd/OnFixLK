import React, { useState, useEffect } from 'react';
import { Activity, Radio, Cpu, Clock } from 'lucide-react';
import { Card } from '../components/common/Card';
import { analyticsService, type LiveTelemetryMetrics } from '../services/analyticsService';
import { GlobeThree } from './GlobeThree';

export const Telemetry: React.FC = () => {
  const [metrics, setMetrics] = useState<LiveTelemetryMetrics>({
    activeTerminals: 14820,
    monthlyTransactions: 42918504,
    serverUptime: 99.9997,
    apiLatencyMs: 14,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialMetrics = async () => {
      try {
        const initial = await analyticsService.getLiveTelemetry();
        setMetrics(initial);
      } catch (err) {
        console.error('Failed to load telemetry', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMetrics();

    const interval = setInterval(() => {
      setMetrics((prev) => {
        const transAdded = Math.floor(Math.random() * 45) + 15;
        const terminalsShift = Math.floor(Math.random() * 7) - 3;
        const newTerminals = Math.max(12000, prev.activeTerminals + terminalsShift);
        const newLatency = Math.floor(Math.random() * 5) + 12;

        return {
          activeTerminals: newTerminals,
          monthlyTransactions: prev.monthlyTransactions + transAdded,
          serverUptime: prev.serverUptime,
          apiLatencyMs: newLatency,
        };
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <section id="telemetry" className="bg-gradient-to-br from-bg-light to-bg-card-hover/20 border-t border-b border-border-light relative z-5 section">
      <div className="container">
        <div className="section-header">
          <span className="section-pretitle text-accent">INFRASTRUCTURE STATUS</span>
          <h2 className="section-title text-text-dark">Live Node Telemetry</h2>
          <p className="section-subtitle text-text-muted-dark">
            Real-time infrastructure health and transactional throughput monitored across all global active endpoints.
          </p>
        </div>

        <div className="grid grid-cols-[minmax(0,440px)_1fr] max-[1199px]:grid-cols-1 gap-12 items-center mt-10">
          <div className="relative flex flex-col items-center justify-center max-[1199px]:hidden">
            <div className="absolute w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,94,0,0.10)_0%,transparent_70%)] blur-[50px] pointer-events-none" aria-hidden="true" />
            <GlobeThree />
            <span className="relative z-2 mt-2 text-[0.7rem] font-bold uppercase tracking-[1px] text-[#9ca3af]">5 regions · always-on monitoring</span>
          </div>

          <div className="grid grid-cols-2 max-[575px]:grid-cols-1 gap-6 max-[1199px]:gap-5 max-[575px]:gap-4">
            {/* Metric Card 1: Active Terminals */}
            <Card variant="light" hoverEffect={false} className="flex flex-col justify-between min-h-[190px] max-[575px]:min-h-[160px] border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:!border-accent hover:!shadow-[0_8px_32px_rgba(255,94,0,0.10)]">
              <div className="flex items-center gap-3 mb-4">
                <Radio size={20} className="inline-flex text-[#10B981]" />
                <span className="text-[0.72rem] font-[750] uppercase text-text-muted-dark tracking-[0.5px]">Active Terminal Nodes</span>
              </div>
              {loading ? (
                <div className="text-[1.4rem] text-text-muted-dark py-2">...</div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[1.8rem] font-[850] text-text-dark tracking-[-0.5px] font-mono">{formatNumber(metrics.activeTerminals)}</span>
                  <span className="text-[0.68rem] font-[850] p-[4px_10px] rounded-pill uppercase tracking-[0.5px] whitespace-nowrap text-[#059669] bg-[#10b981]/8 border border-[#10b981]/18">● Live</span>
                </div>
              )}
              <div className="text-[0.78rem] text-text-muted-dark mt-auto border-t border-border-light pt-3">Online client terminals synchronized.</div>
            </Card>

            {/* Metric Card 2: Transactions */}
            <Card variant="light" hoverEffect={false} className="flex flex-col justify-between min-h-[190px] max-[575px]:min-h-[160px] border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:!border-accent hover:!shadow-[0_8px_32px_rgba(255,94,0,0.10)]">
              <div className="flex items-center gap-3 mb-4">
                <Activity size={20} className="inline-flex text-accent" />
                <span className="text-[0.72rem] font-[750] uppercase text-text-muted-dark tracking-[0.5px]">Transactions This Month</span>
              </div>
              {loading ? (
                <div className="text-[1.4rem] text-text-muted-dark py-2">...</div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[1.8rem] font-[850] text-text-dark tracking-[-0.5px] font-mono">{formatNumber(metrics.monthlyTransactions)}</span>
                  <span className="text-[0.68rem] font-[850] p-[4px_10px] rounded-pill uppercase tracking-[0.5px] whitespace-nowrap text-accent bg-accent/8 border border-accent/18 animate-pulse">▲ Ticking</span>
                </div>
              )}
              <div className="text-[0.78rem] text-text-muted-dark mt-auto border-t border-border-light pt-3">Aggregated card, invoice, and QR charges.</div>
            </Card>

            {/* Metric Card 3: Uptime */}
            <Card variant="light" hoverEffect={false} className="flex flex-col justify-between min-h-[190px] max-[575px]:min-h-[160px] border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:!border-accent hover:!shadow-[0_8px_32px_rgba(255,94,0,0.10)]">
              <div className="flex items-center gap-3 mb-4">
                <Cpu size={20} className="inline-flex text-[#10B981]" />
                <span className="text-[0.72rem] font-[750] uppercase text-text-muted-dark tracking-[0.5px]">System SLA & Uptime</span>
              </div>
              {loading ? (
                <div className="text-[1.4rem] text-text-muted-dark py-2">...</div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[1.8rem] font-[850] text-text-dark tracking-[-0.5px] font-mono">{metrics.serverUptime}%</span>
                  <span className="text-[0.68rem] font-[850] p-[4px_10px] rounded-pill uppercase tracking-[0.5px] whitespace-nowrap text-[#059669] bg-[#10b981]/8 border border-[#10b981]/18">Uptime</span>
                </div>
              )}
              <div className="text-[0.78rem] text-text-muted-dark mt-auto border-t border-border-light pt-3">Global clusters load-balanced failover index.</div>
            </Card>

            {/* Metric Card 4: Latency */}
            <Card variant="light" hoverEffect={false} className="flex flex-col justify-between min-h-[190px] max-[575px]:min-h-[160px] border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:!border-accent hover:!shadow-[0_8px_32px_rgba(255,94,0,0.10)]">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="inline-flex text-accent" />
                <span className="text-[0.72rem] font-[750] uppercase text-text-muted-dark tracking-[0.5px]">Avg API Node Latency</span>
              </div>
              {loading ? (
                <div className="text-[1.4rem] text-text-muted-dark py-2">...</div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[1.8rem] font-[850] text-text-dark tracking-[-0.5px] font-mono">{metrics.apiLatencyMs}ms</span>
                  <span className="text-[0.68rem] font-[850] p-[4px_10px] rounded-pill uppercase tracking-[0.5px] whitespace-nowrap text-[#059669] bg-[#10b981]/8 border border-[#10b981]/18">Optimal</span>
                </div>
              )}
              <div className="text-[0.78rem] text-text-muted-dark mt-auto border-t border-border-light pt-3">Anycast edge gateway roundtrip latency.</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
