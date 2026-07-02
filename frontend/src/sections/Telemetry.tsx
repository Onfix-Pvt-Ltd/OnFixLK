import React, { useState, useEffect } from 'react';
import { Layers, Code2, Star, Clock } from 'lucide-react';
import { Card } from '../components/common/Card';
import { analyticsService, type LiveTelemetryMetrics } from '../services/analyticsService';
import { GlobeThree } from './GlobeThree';

export const Telemetry: React.FC = () => {
  const [metrics, setMetrics] = useState<LiveTelemetryMetrics>({
    projectsDelivered: 12,
    linesOfCode: 150000,
    clientSatisfaction: 4.9,
    onTimeDelivery: 98,
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
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <section id="telemetry" className="bg-gradient-to-br from-bg-light to-bg-card-hover/20 border-t border-b border-border-light relative z-5 section">
      <div className="container">
        <div className="section-header">
          <span className="section-pretitle text-accent">OUR TRACK RECORD</span>
          <h2 className="section-title text-text-dark">Built With Purpose</h2>
          <p className="section-subtitle text-text-muted-dark">
            Real metrics from real projects — here's what we've shipped so far as a growing team.
          </p>
        </div>

        <div className="grid grid-cols-[minmax(0,440px)_1fr] max-[1199px]:grid-cols-1 gap-12 items-center mt-10">
          <div className="relative flex flex-col items-center justify-center max-[1199px]:hidden">
            <div className="absolute w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,94,0,0.10)_0%,transparent_70%)] blur-[50px] pointer-events-none" aria-hidden="true" />
            <GlobeThree />
            <span className="relative z-2 mt-2 text-[0.7rem] font-bold uppercase tracking-[1px] text-[#9ca3af]">Serving clients globally</span>
          </div>

          <div className="grid grid-cols-2 max-[575px]:grid-cols-1 gap-6 max-[1199px]:gap-5 max-[575px]:gap-4">
            {/* Metric Card 1: Projects Delivered */}
            <Card variant="light" hoverEffect={false} className="flex flex-col justify-between min-h-[190px] max-[575px]:min-h-[160px] border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:!border-accent hover:!shadow-[0_8px_32px_rgba(255,94,0,0.10)]">
              <div className="flex items-center gap-3 mb-4">
                <Layers size={20} className="inline-flex text-accent" />
                <span className="text-[0.72rem] font-[750] uppercase text-text-muted-dark tracking-[0.5px]">Projects Delivered</span>
              </div>
              {loading ? (
                <div className="text-[1.4rem] text-text-muted-dark py-2">...</div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[1.8rem] font-[850] text-text-dark tracking-[-0.5px] font-mono">{metrics.projectsDelivered}+</span>
                  <span className="text-[0.68rem] font-[850] p-[4px_10px] rounded-pill uppercase tracking-[0.5px] whitespace-nowrap text-[#059669] bg-[#10b981]/8 border border-[#10b981]/18">● Active</span>
                </div>
              )}
              <div className="text-[0.78rem] text-text-muted-dark mt-auto border-t border-border-light pt-3">Custom apps, websites & integrations shipped.</div>
            </Card>

            {/* Metric Card 2: Lines of Code */}
            <Card variant="light" hoverEffect={false} className="flex flex-col justify-between min-h-[190px] max-[575px]:min-h-[160px] border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:!border-accent hover:!shadow-[0_8px_32px_rgba(255,94,0,0.10)]">
              <div className="flex items-center gap-3 mb-4">
                <Code2 size={20} className="inline-flex text-accent" />
                <span className="text-[0.72rem] font-[750] uppercase text-text-muted-dark tracking-[0.5px]">Lines of Code Shipped</span>
              </div>
              {loading ? (
                <div className="text-[1.4rem] text-text-muted-dark py-2">...</div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[1.8rem] font-[850] text-text-dark tracking-[-0.5px] font-mono">{formatNumber(metrics.linesOfCode)}+</span>
                  <span className="text-[0.68rem] font-[850] p-[4px_10px] rounded-pill uppercase tracking-[0.5px] whitespace-nowrap text-accent bg-accent/8 border border-accent/18">Growing</span>
                </div>
              )}
              <div className="text-[0.78rem] text-text-muted-dark mt-auto border-t border-border-light pt-3">Across all client projects and internal tools.</div>
            </Card>

            {/* Metric Card 3: Client Satisfaction */}
            <Card variant="light" hoverEffect={false} className="flex flex-col justify-between min-h-[190px] max-[575px]:min-h-[160px] border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:!border-accent hover:!shadow-[0_8px_32px_rgba(255,94,0,0.10)]">
              <div className="flex items-center gap-3 mb-4">
                <Star size={20} className="inline-flex text-[#f59e0b]" />
                <span className="text-[0.72rem] font-[750] uppercase text-text-muted-dark tracking-[0.5px]">Client Satisfaction</span>
              </div>
              {loading ? (
                <div className="text-[1.4rem] text-text-muted-dark py-2">...</div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[1.8rem] font-[850] text-text-dark tracking-[-0.5px] font-mono">{metrics.clientSatisfaction}/5</span>
                  <span className="text-[0.68rem] font-[850] p-[4px_10px] rounded-pill uppercase tracking-[0.5px] whitespace-nowrap text-[#059669] bg-[#10b981]/8 border border-[#10b981]/18">★ Top Rated</span>
                </div>
              )}
              <div className="text-[0.78rem] text-text-muted-dark mt-auto border-t border-border-light pt-3">Average rating from client feedback.</div>
            </Card>

            {/* Metric Card 4: On-Time Delivery */}
            <Card variant="light" hoverEffect={false} className="flex flex-col justify-between min-h-[190px] max-[575px]:min-h-[160px] border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:!border-accent hover:!shadow-[0_8px_32px_rgba(255,94,0,0.10)]">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="inline-flex text-[#10B981]" />
                <span className="text-[0.72rem] font-[750] uppercase text-text-muted-dark tracking-[0.5px]">On-Time Delivery</span>
              </div>
              {loading ? (
                <div className="text-[1.4rem] text-text-muted-dark py-2">...</div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[1.8rem] font-[850] text-text-dark tracking-[-0.5px] font-mono">{metrics.onTimeDelivery}%</span>
                  <span className="text-[0.68rem] font-[850] p-[4px_10px] rounded-pill uppercase tracking-[0.5px] whitespace-nowrap text-[#059669] bg-[#10b981]/8 border border-[#10b981]/18">Reliable</span>
                </div>
              )}
              <div className="text-[0.78rem] text-text-muted-dark mt-auto border-t border-border-light pt-3">Milestones delivered on or ahead of schedule.</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
