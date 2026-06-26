import React, { useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { DashboardMockup } from './DashboardMockup';

const PILLARS = [
  'Websites & mobile apps',
  'Custom business software',
  'AI & automation',
  'System integrations',
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMockupRevealed, setIsMockupRevealed] = React.useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reveals = section.querySelectorAll<HTMLElement>('.hero-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            if (e.target.classList.contains('dashboard-trigger')) {
              setIsMockupRevealed(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-10 max-[560px]:pt-[110px] pb-20 flex items-center overflow-hidden bg-bg-light" ref={sectionRef}>
      {/* Subtle warm accent layer */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_-10%,rgba(255,94,0,0.07)_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_10%_110%,rgba(249,115,22,0.05)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_60%_70%_at_80%_-10%,rgba(255,94,0,0.03)_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_10%_110%,rgba(249,115,22,0.02)_0%,transparent_60%)]" aria-hidden="true" />

      <div className="container grid grid-cols-2 max-[900px]:grid-cols-1 gap-12 max-[900px]:gap-14 items-center relative z-2">

        {/* ── LEFT COLUMN — Message ────────────────────────── */}
        <div className="flex flex-col items-start max-[900px]:items-center max-[900px]:text-center">

          <h1 className="hero-reveal text-[4.0rem] max-[1100px]:text-[3.5rem] max-[560px]:text-[2.7rem] font-extrabold leading-[1.08] tracking-[-2.2px] max-[560px]:tracking-[-1.4px] text-text-dark mb-[22px]" style={{ transitionDelay: '0.05s' }}>
            We build the <span className="bg-gradient-to-r from-accent to-[#ff9850] bg-clip-text text-transparent">software</span> that runs your business.
          </h1>

          <p className="hero-reveal text-[1.08rem] leading-[1.72] text-text-muted-dark mb-7 max-w-[520px] max-[900px]:max-w-[560px]" style={{ transitionDelay: '0.2s' }}>
            Onfix is your software partner. We design websites, build custom apps,
            add AI where it helps, and connect the tools you already use — so your
            day-to-day runs faster and simpler.
          </p>

          <div className="hero-reveal grid grid-cols-2 max-[560px]:grid-cols-1 gap-x-[22px] gap-y-[11px] mb-[38px] max-[900px]:justify-center max-[900px]:w-fit max-[900px]:mx-auto" style={{ transitionDelay: '0.32s' }}>
            {PILLARS.map(item => (
              <div key={item} className="flex items-center gap-2.5 text-[0.92rem] font-medium text-text-dark">
                <Check size={16} className="text-accent shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="hero-reveal flex gap-3.5 mb-[52px] flex-wrap max-[900px]:justify-center max-[560px]:flex-col max-[560px]:w-full [&>a]:max-[560px]:w-full" style={{ transitionDelay: '0.44s' }}>
            <Link to="/contact">
              <Button variant="accent" icon={<ArrowRight size={18} />}>
                Get a free consultation
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="secondary">See what we build</Button>
            </Link>
          </div>

          <div className="hero-reveal w-full border-t border-border-light pt-6 max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center" style={{ transitionDelay: '0.56s' }}>
            <p className="text-[0.67rem] font-bold uppercase text-text-muted-dark opacity-60 tracking-[2px] mb-4">Trusted by teams in hospitality, retail &amp; enterprise</p>
            <div className="flex flex-wrap gap-[30px] items-center max-[900px]:justify-center">
              {['HILTON', 'MARRIOTT', 'THE RITZ', 'NOBU'].map(b => (
                <span key={b} className="font-heading font-bold text-[0.82rem] tracking-[2px] text-text-muted-dark opacity-40 transition-all duration-300 ease-out cursor-default select-none hover:text-accent hover:opacity-100">{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Product mockup ────────────────── */}
        <div className="hero-reveal dashboard-trigger relative flex items-center justify-center min-h-[460px] p-[8px_10px]" style={{ transitionDelay: '0.18s' }}>
          {/* Ambient background glow */}
          <div className="absolute w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,94,0,0.12)_0%,transparent_70%)] blur-[55px] pointer-events-none animate-glow-breath" aria-hidden="true" />

          {/* The "show the product" dashboard */}
          <div className={`relative z-2 w-full max-w-[540px] dashboard-container-reveal ${isMockupRevealed ? 'revealed' : ''}`}>
            <DashboardMockup isRevealed={isMockupRevealed} />
          </div>

          {/* Floating proof badges */}
          <div className={`absolute z-10 top-4 -right-3.5 max-[560px]:hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[1.9s] ${
            isMockupRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
          }`}>
            <div className="bg-bg-light/92 border border-border-light/90 shadow-[0_8px_24px_rgba(0,0,0,0.10)] rounded-medium p-[10px_18px] flex flex-col items-center backdrop-blur-[12px] animate-float-a">
              <span className="font-heading text-[1.25rem] font-extrabold text-accent leading-none">120+</span>
              <span className="text-[0.64rem] font-semibold uppercase tracking-[1px] text-text-muted-dark mt-0.75 whitespace-nowrap">Projects delivered</span>
            </div>
          </div>

          <div className={`absolute z-10 bottom-5 -left-4.5 max-[560px]:hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[2.2s] ${
            isMockupRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
          }`}>
            <div className="bg-bg-light/92 border border-border-light/90 shadow-[0_8px_24px_rgba(0,0,0,0.10)] rounded-medium p-[10px_18px] flex flex-col items-center backdrop-blur-[12px] animate-float-c">
              <span className="font-heading text-[1.25rem] font-extrabold text-accent leading-none">4.9/5</span>
              <span className="text-[0.64rem] font-semibold uppercase tracking-[1px] text-text-muted-dark mt-0.75 whitespace-nowrap">Client rating</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
