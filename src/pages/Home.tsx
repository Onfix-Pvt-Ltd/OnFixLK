import React from 'react';
import { Hero } from '../sections/Hero';
import { Telemetry } from '../sections/Telemetry';
import { SEOHelper } from '../components/common/SEOHelper';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { ArrowRight, Globe, Code, Sparkles, Share2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home-page animate-fade">
      <SEOHelper 
        title="High-Performance Enterprise Software & ERP Systems" 
        description="Onfix Pvt Ltd engineers zero-latency databases, hospitality POS systems, and scalable cloud ERP networks for industry leaders."
      />
      
      {/* Redesigned Hero with scroll reveal on inner contents */}
      <Hero />
      
      {/* Telemetry section wrapped in reveal */}
      <ScrollReveal delay={100}>
        <Telemetry />
      </ScrollReveal>

      {/* What we do — plain-language services */}
      <section className="home-solutions-preview section section-dark">
        <div className="container">
          <ScrollReveal>
            <div className="section-header text-center">
              <span className="section-pretitle">WHAT WE DO</span>
              <h2 className="section-title">Software solutions, end to end</h2>
              <p className="section-subtitle">
                Whether you need a website, a custom app, smarter automation, or your tools talking to each other — we design, build, and support it for you.
              </p>
            </div>
          </ScrollReveal>

          <div className="solutions-grid">
            <ScrollReveal delay={100} className="h-full">
              <Card variant="dark" className="solution-preview-card hover-lift">
                <div className="card-icon-header">
                  <Globe className="orange-text" size={30} />
                </div>
                <h3>Websites &amp; Apps</h3>
                <p>Fast, modern websites and mobile apps that look great and are easy for your customers to use.</p>
                <Link to="/products" className="preview-link">
                  <span>See what we build</span> <ArrowRight size={14} />
                </Link>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={200} className="h-full">
              <Card variant="dark" className="solution-preview-card hover-lift">
                <div className="card-icon-header">
                  <Code className="orange-text" size={30} />
                </div>
                <h3>Custom Software</h3>
                <p>Tools built around how you actually work — POS, inventory, dashboards, and internal systems made just for your team.</p>
                <Link to="/products" className="preview-link">
                  <span>Explore our products</span> <ArrowRight size={14} />
                </Link>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={300} className="h-full">
              <Card variant="dark" className="solution-preview-card hover-lift">
                <div className="card-icon-header">
                  <Sparkles className="orange-text" size={30} />
                </div>
                <h3>AI &amp; Automation</h3>
                <p>Put AI to work: automate repetitive tasks, answer customers 24/7, and turn your data into clear decisions.</p>
                <Link to="/contact" className="preview-link">
                  <span>Talk about your idea</span> <ArrowRight size={14} />
                </Link>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={400} className="h-full">
              <Card variant="dark" className="solution-preview-card hover-lift">
                <div className="card-icon-header">
                  <Share2 className="orange-text" size={30} />
                </div>
                <h3>Integrations</h3>
                <p>Connect the apps you already use — payments, accounting, delivery — so your data flows automatically, with no double entry.</p>
                <Link to="/products" className="preview-link">
                  <span>Review integrations</span> <ArrowRight size={14} />
                </Link>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned to be unified dark mode */}
      <section className="home-cta-section section section-dark">
        <div className="home-cta-bg-glow"></div>
        <div className="home-cta-grid-overlay"></div>
        <div className="container cta-container">
          <ScrollReveal delay={150}>
            <div className="cta-content">
              <h2 className="cta-title text-gradient-light">Have a project in mind?</h2>
              <p className="cta-desc">
                Tell us what you need — a website, an app, an AI tool, or all three. We'll talk it through, give you honest advice, and a free quote. No jargon, no pressure.
              </p>
              <div className="cta-buttons">
                <Link to="/contact">
                  <Button variant="primary" className="btn-cta-white" icon={<ArrowRight size={18} />}>
                    Get a free consultation
                  </Button>
                </Link>
                <Link to="/products" style={{ marginLeft: '12px' }}>
                  <Button variant="secondary" className="btn-secondary-dark">
                    See our work
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
