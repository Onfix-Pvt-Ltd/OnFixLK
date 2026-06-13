import React, { useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { DashboardMockup } from './DashboardMockup';
import './Hero.css';

const PILLARS = [
  'Websites & mobile apps',
  'Custom business software',
  'AI & automation',
  'System integrations',
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reveals = section.querySelectorAll<HTMLElement>('.hero-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.1 }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      {/* Subtle warm accent layer */}
      <div className="hero-gradient-bg" aria-hidden="true" />

      <div className="container hero-container">

        {/* ── LEFT COLUMN — Message ────────────────────────── */}
        <div className="hero-content">

          <h1 className="hero-title hero-reveal" style={{ transitionDelay: '0.05s' }}>
            We build the <span className="hero-title-accent">software</span> that
            runs your business.
          </h1>

          <p className="hero-subtitle hero-reveal" style={{ transitionDelay: '0.2s' }}>
            Onfix is your software partner. We design websites, build custom apps,
            add AI where it helps, and connect the tools you already use — so your
            day-to-day runs faster and simpler.
          </p>

          <div className="hero-checklist hero-reveal" style={{ transitionDelay: '0.32s' }}>
            {PILLARS.map(item => (
              <div key={item} className="hero-check-item">
                <Check size={16} className="check-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions hero-reveal" style={{ transitionDelay: '0.44s' }}>
            <Link to="/contact">
              <Button variant="accent" icon={<ArrowRight size={18} />}>
                Get a free consultation
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="secondary">See what we build</Button>
            </Link>
          </div>

          <div className="hero-trust hero-reveal" style={{ transitionDelay: '0.56s' }}>
            <p className="trust-label">Trusted by teams in hospitality, retail &amp; enterprise</p>
            <div className="trust-logos">
              {['HILTON', 'MARRIOTT', 'THE RITZ', 'NOBU'].map(b => (
                <span key={b} className="trust-logo">{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Product mockup ────────────────── */}
        <div className="hero-visual-col hero-reveal" style={{ transitionDelay: '0.18s' }}>
          {/* Ambient background glow */}
          <div className="hero-visual-glow" aria-hidden="true" />

          {/* The "show the product" dashboard */}
          <div className="hero-mock-wrap">
            <DashboardMockup />
          </div>

          {/* Floating proof badges */}
          <div className="hero-float-badge badge-tr animate-float-a">
            <span className="badge-num">120+</span>
            <span className="badge-lbl">Projects delivered</span>
          </div>
          <div className="hero-float-badge badge-bl animate-float-c">
            <span className="badge-num">4.9/5</span>
            <span className="badge-lbl">Client rating</span>
          </div>
        </div>

      </div>
    </section>
  );
};
