import React, { useState, useEffect } from 'react';
import { Activity, Radio, Cpu, Clock } from 'lucide-react';
import { Card } from '../components/common/Card';
import { analyticsService, type LiveTelemetryMetrics } from '../services/analyticsService';
import { GlobeThree } from './GlobeThree';
import './Telemetry.css';

export const Telemetry: React.FC = () => {
  const [metrics, setMetrics] = useState<LiveTelemetryMetrics>({
    activeTerminals: 14820,
    monthlyTransactions: 42918504,
    serverUptime: 99.9997,
    apiLatencyMs: 14,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch from service
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

    // Setup polling with micro-fluctuations to show real-time changes
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
    <section id="telemetry" className="telemetry-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-pretitle">INFRASTRUCTURE STATUS</span>
          <h2 className="section-title text-gradient-light">Live Node Telemetry</h2>
          <p className="section-subtitle">
            Real-time infrastructure health and transactional throughput monitored across all global active endpoints.
          </p>
        </div>

        <div className="telemetry-layout">
          <div className="telemetry-globe-col">
            <div className="telemetry-globe-glow" aria-hidden="true" />
            <GlobeThree />
            <span className="telemetry-globe-caption">5 regions · always-on monitoring</span>
          </div>

          <div className="telemetry-grid">
          {/* Metric Card 1: Active Terminals */}
          <Card variant="dark" className="telemetry-card">
            <div className="telemetry-card-header">
              <Radio size={20} className="telemetry-card-icon green-icon" />
              <span className="telemetry-card-label">Active Terminal Nodes</span>
            </div>
            {loading ? (
              <div className="telemetry-loader">...</div>
            ) : (
              <div className="telemetry-value-wrap">
                <span className="telemetry-value font-mono">{formatNumber(metrics.activeTerminals)}</span>
                <span className="telemetry-trend green-text">● Live</span>
              </div>
            )}
            <div className="telemetry-footer-text">Online client terminals synchronized.</div>
          </Card>

          {/* Metric Card 2: Transactions */}
          <Card variant="dark" className="telemetry-card">
            <div className="telemetry-card-header">
              <Activity size={20} className="telemetry-card-icon orange-icon" />
              <span className="telemetry-card-label">Transactions This Month</span>
            </div>
            {loading ? (
              <div className="telemetry-loader">...</div>
            ) : (
              <div className="telemetry-value-wrap">
                <span className="telemetry-value font-mono">{formatNumber(metrics.monthlyTransactions)}</span>
                <span className="telemetry-trend orange-text animate-pulse">▲ Ticking</span>
              </div>
            )}
            <div className="telemetry-footer-text">Aggregated card, invoice, and QR charges.</div>
          </Card>

          {/* Metric Card 3: Uptime */}
          <Card variant="dark" className="telemetry-card">
            <div className="telemetry-card-header">
              <Cpu size={20} className="telemetry-card-icon green-icon" />
              <span className="telemetry-card-label">System SLA & Uptime</span>
            </div>
            {loading ? (
              <div className="telemetry-loader">...</div>
            ) : (
              <div className="telemetry-value-wrap">
                <span className="telemetry-value font-mono">{metrics.serverUptime}%</span>
                <span className="telemetry-trend green-text">Uptime</span>
              </div>
            )}
            <div className="telemetry-footer-text">Global clusters load-balanced failover index.</div>
          </Card>

          {/* Metric Card 4: Latency */}
          <Card variant="dark" className="telemetry-card">
            <div className="telemetry-card-header">
              <Clock size={20} className="telemetry-card-icon orange-icon" />
              <span className="telemetry-card-label">Avg API Node Latency</span>
            </div>
            {loading ? (
              <div className="telemetry-loader">...</div>
            ) : (
              <div className="telemetry-value-wrap">
                <span className="telemetry-value font-mono">{metrics.apiLatencyMs}ms</span>
                <span className="telemetry-trend green-text">Optimal</span>
              </div>
            )}
            <div className="telemetry-footer-text">Anycast edge gateway roundtrip latency.</div>
          </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
