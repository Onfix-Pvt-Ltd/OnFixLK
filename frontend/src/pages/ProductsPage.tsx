import React, { useState } from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import {
  ArrowRight, ExternalLink, ShoppingBag, Camera,
  Building2, Dumbbell, UtensilsCrossed,
  Share2, Code
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  category: 'Hospitality & Dining' | 'Creative & Photography' | 'Architecture & Lifestyle';
  hook: string;
  desc: string;
  features: string[];
  url: string;
  icon: React.ReactNode;
}

export const ProductsPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Hospitality & Dining' | 'Creative & Photography' | 'Architecture & Lifestyle'>('All');

  const categories = [
    { name: 'All Work', value: 'All' as const },
    { name: 'Hospitality & Dining', value: 'Hospitality & Dining' as const },
    { name: 'Creative & Photography', value: 'Creative & Photography' as const },
    { name: 'Architecture & Lifestyle', value: 'Architecture & Lifestyle' as const }
  ];

  const projects: Project[] = [
    {
      id: 'onfixpos',
      title: 'ONFIX POS',
      category: 'Hospitality & Dining',
      hook: 'Our flagship all-in-one ERP & POS platform for hospitality businesses.',
      desc: 'A comprehensive management system built to streamline restaurant and retail operations. It synchronizes menus, inventory, billing, and reporting across multiple locations in real-time on its own dedicated platform.',
      features: [
        'Secure payment integrations and real-time sales reporting.',
        'Tableside QR code ordering and digital menu management.',
        'Multi-branch inventory tracking with FIFO costing.'
      ],
      url: 'https://www.onfixpos.com/',
      icon: <ShoppingBag size={24} />
    },
    {
      id: 'verdana',
      title: 'Verdana Resort & Spa',
      category: 'Hospitality & Dining',
      hook: 'An immersive, multi-venue digital gastronomy showcase for 5-star resorts.',
      desc: 'Designed for premium travelers and gourmands. Features custom sub-menus for multi-venue resort restaurants, interactive event schedulers, and private beach dining reservation inquiries.',
      features: [
        'Multi-venue operational hours and availability grids.',
        'Farm-to-table organic story cards and chef-specials guides.',
        'Immersive parallax scroll aesthetics with luxury editorial layout.'
      ],
      url: 'https://serene-scroll-escapade.lovable.app/dining',
      icon: <UtensilsCrossed size={24} />
    },
    {
      id: 'dreamscenario',
      title: 'DreamScenario Weddings',
      category: 'Creative & Photography',
      hook: 'Ethereal, light-filled wedding photography and global storytelling showcase.',
      desc: 'Crafted for high-end wedding studios. Showcases dynamic high-performance wedding galleries, client testimonial carousels, and an automated quote calculator to drive premium conversions.',
      features: [
        'Dynamic high-resolution wedding album portfolios.',
        'Interactive quote request forms and event category logs.',
        'Light, airy, and beautifully ethereal design aesthetics.'
      ],
      url: 'https://www.dreamscenario.lk/',
      icon: <Camera size={24} />
    },
    {
      id: 'captured',
      title: 'Lensero Studios',
      category: 'Creative & Photography',
      hook: 'Editorial wedding and lifestyle photography capturing timeless love stories.',
      desc: 'A sophisticated web platform prioritizing high-resolution visual storytelling. Features clean grid portfolios, custom booking consultation engines, and a responsive Instagram feed grid.',
      features: [
        'Editorial structural layout grids with optimized image delivery.',
        'Live Instagram feed grid integration and social follow hooks.',
        'Automated booking consultation and quote request forms.'
      ],
      url: 'https://captured-moments-vert.vercel.app/',
      icon: <Camera size={24} />
    },
    {
      id: 'alaya',
      title: 'Ālaya Wellness Club',
      category: 'Architecture & Lifestyle',
      hook: 'A fitness and wellness club where architectural stillness meets physical strength.',
      desc: 'Built for design-forward wellness organizations. Integrates client goal selectors, session scheduling blocks, and reservation triggers in a calm, Zen-inspired structural layout.',
      features: [
        'Goal-based session path selector (Weight Loss, Recovery, Strength).',
        'Dynamic wellness class schedules and trainer booking modules.',
        'Architectural photo galleries with premium minimalist aesthetics.'
      ],
      url: 'https://sanctuary-architects.lovable.app/',
      icon: <Building2 size={24} />
    },
    {
      id: 'apexfit',
      title: 'ApexFit Elite Gym',
      category: 'Architecture & Lifestyle',
      hook: 'A high-energy, performance-focused club platform with elite coaching.',
      desc: 'Features interactive class timetables filtered by strength or cardio, coach profiles, progress sliders, and tiered membership tables to maximize membership sign-ups.',
      features: [
        'Filterable dynamic class timetable (Strength, Cardio, Yoga).',
        'Tiered membership table and interactive FAQ accordions.',
        'Client transformation before/after sliders with testimonials.'
      ],
      url: 'https://premium-gym-site.lovable.app/',
      icon: <Dumbbell size={24} />
    }
  ];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="animate-fade">
      <SEOHelper
        title="Our Products & Portfolio — Custom Web Applications"
        description="Explore Onfix's portfolio of high-performance web applications, POS systems, photography galleries, and luxury lifestyle platforms."
      />

      {/* Hero Section */}
      <section className="py-24 bg-[radial-gradient(circle_at_50%_50%,rgba(23,23,23,1)_0%,rgba(30,30,30,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">OUR PORTFOLIO</span>
          <h1 className="text-[3.2rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent leading-[1.1] tracking-[-1.5px] max-w-[900px] mx-auto">
            Elite Web Applications. Custom-Engineered for Maximum Speed.
          </h1>
          <p className="max-w-[750px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            Explore our portfolio of live client solutions. These are not concepts—they are high-performance operational systems engineered with premium branding, sub-millisecond database queries, and frictionless UX.
          </p>
        </div>
      </section>

      {/* Portfolio Filtering Interface */}
      <section className="py-12 bg-bg-light border-b border-border-light">
        <div className="container flex justify-center flex-wrap gap-3">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(cat.value)}
              className={`px-6 py-2.5 rounded-pill font-semibold text-[0.9rem] cursor-pointer transition-all duration-200 outline-none ${filter === cat.value
                ? 'bg-accent text-white shadow-glow border border-accent'
                : 'bg-bg-card border border-border-light text-text-dark hover:border-accent hover:text-accent shadow-subtle'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* The Product Grid (The Core Content) */}
      <section className="py-20 bg-bg-light">
        <div className="container">
          {/* Grid Layout - 3 Columns on Desktop, 1 Column on Mobile */}
          <div className="grid grid-cols-3 max-[1100px]:grid-cols-2 max-[767px]:grid-cols-1 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={100 + index * 50}>
                <Card variant="light" hoverEffect={true} className="flex flex-col h-full border border-border-light bg-bg-card rounded-large overflow-hidden shadow-subtle">

                  {/* Category Header */}
                  <div className="bg-bg-light px-5 py-4 border-b border-border-light flex justify-between items-center">
                    <span className="bg-accent/8 text-accent font-extrabold text-[0.7rem] px-2.5 py-1 rounded-pill uppercase tracking-[0.5px] font-mono">
                      {project.category}
                    </span>
                    <div className="text-text-muted-dark opacity-60">
                      {project.icon}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col grow">
                    <h3 className="text-[1.35rem] font-heading font-extrabold text-text-dark mb-3.5">
                      {project.title}
                    </h3>

                    {/* Core Value Hook */}
                    <p className="text-accent font-bold text-[0.92rem] leading-[1.4] mb-4">
                      {project.hook}
                    </p>

                    {/* Deep-Dive Description */}
                    <p className="text-text-muted-dark text-[0.88rem] leading-[1.6] mb-6 grow">
                      {project.desc}
                    </p>

                    {/* Key Feature Highlights */}
                    <div className="border-t border-border-light pt-5 mb-6 flex flex-col gap-3">
                      <span className="block text-[0.75rem] font-bold text-text-dark uppercase tracking-[0.5px]">Key Features</span>
                      <ul className="list-none flex flex-col gap-2.5">
                        {project.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[0.82rem] text-text-muted-dark leading-[1.4]">
                            <span className="text-accent font-bold mt-0.5">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Link Button */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.9rem] font-bold text-accent transition-all duration-150 ease-out hover:gap-2.5 hover:text-[#e05300] group mt-auto"
                    >
                      <span>Explore Live Platform</span>
                      <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>

                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Customization Promise (The "We Can Build This For You" Section) */}
      <section className="py-24 border-t border-b border-border-light bg-bg-card relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(255,94,0,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container relative z-2 text-center">
          <ScrollReveal>
            <div className="max-w-[800px] mx-auto">
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">OUR PROMISE</span>
              <h2 className="text-[2.5rem] font-heading font-bold mb-5 text-text-dark">Fully Customizable Framework Blueprints</h2>
              <p className="text-[1.12rem] text-text-muted-dark leading-[1.7] mb-8">
                All of our products serve as solid architectural blueprints. We specialize in deep personalization—taking these core database structures, lightning-fast edge networks, and UI layouts, and redesigning them completely to match your specific branding, internal operational workflows, and feature requests.
              </p>
              <div className="flex justify-center flex-wrap gap-8 max-w-[650px] mx-auto text-left">
                <div className="flex items-start gap-3.5 bg-bg-light border border-border-light p-4 rounded-medium flex-1 min-w-[250px]">
                  <Code className="text-accent shrink-0" size={20} />
                  <div>
                    <span className="block font-bold text-[0.95rem] text-text-dark">Sovereign Code</span>
                    <span className="block text-[0.8rem] text-text-muted-dark mt-1">We bypass standard templates and code custom databases suited to your workflows.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 bg-bg-light border border-border-light p-4 rounded-medium flex-1 min-w-[250px]">
                  <Share2 className="text-accent shrink-0" size={20} />
                  <div>
                    <span className="block font-bold text-[0.95rem] text-text-dark">Dynamic APIs</span>
                    <span className="block text-[0.8rem] text-text-muted-dark mt-1">Fully connect custom backends to payment processors, inventory queues, and Xero accounts.</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="relative overflow-hidden text-center bg-accent py-[100px] text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_70%)] pointer-events-none" aria-hidden="true"></div>
        <div className="container relative z-2">
          <ScrollReveal>
            <div className="max-w-[750px] mx-auto">
              <h2 className="text-[2.5rem] max-[991px]:text-[2rem] font-[850] mb-5 tracking-[-1px]">Have a unique vision? Let's engineer it.</h2>
              <p className="text-[1.12rem] text-white/80 leading-[1.7] mb-10">
                Get in touch with our team today to review your current tool stack and design your high-performance custom platform.
              </p>
              <div className="flex justify-center items-center gap-4 max-[767px]:flex-col max-[767px]:w-full [&>a]:max-[767px]:w-full">
                <Link to="/contact">
                  <Button variant="primary" className="!bg-white !text-accent !border-2 !border-white !font-extrabold hover:!bg-[#fff5f0] hover:!text-[#e04e00] hover:!border-[#fff5f0] hover:-translate-y-0.5 active:translate-y-0" icon={<ArrowRight size={18} />}>
                    Get in touch
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="secondary" className="!border-white/45 !text-white !bg-white/15 hover:!bg-white/28 hover:!border-white/80">
                    Explore Services
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
