import React from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const perks = [
    {
      title: 'Complete Autonomy',
      desc: 'We trust our team to take full ownership of their modules. You decide the execution details and ship when it is ready.'
    },
    {
      title: 'High-Impact Problems',
      desc: 'Build high-performance web applications, robust POS systems, and smart workflow automation tools.'
    },
    {
      title: 'Modern Tech Stack',
      desc: 'Build using React, Node.js, Go, Python, and modern edge deployment frameworks. We prioritize clean code and robust design.'
    },
    {
      title: 'Competitive Compensation',
      desc: 'We offer competitive rates, flexible remote options, and growth opportunities for early developers.'
    }
  ];

  const jobs = [
    {
      title: 'Full-Stack Engineer',
      dept: 'Engineering',
      location: 'Remote / Colombo',
      summary: 'Engineer high-performance client portals using React/Next.js and develop scalable backend APIs in Node.js or Python.',
      stack: 'React, Next.js, Node.js, Python, TailwindCSS'
    },
    {
      title: 'Backend & Integration Developer',
      dept: 'Engineering',
      location: 'On-site (Colombo, Sri Lanka)',
      summary: 'Architect backend services, integrate payment processors and APIs, and construct secure database integrations in Go or Python.',
      stack: 'Go, Node.js, Cloud Architecture, PostgreSQL, Docker'
    },
    {
      title: 'UI/UX Product Designer',
      dept: 'Product Design',
      location: 'Remote / Hybrid',
      summary: 'Design sleek dashboard interfaces, custom booking flows, and mobile wireframes with high-fidelity interactions.',
      stack: 'Figma, Tailwind Styling Guidelines, Prototyping, Design Systems'
    }
  ];

  return (
    <div className="animate-fade">
      <SEOHelper 
        title="Careers — Join the Onfix Team" 
        description="Build the future of business automation at Onfix. Explore open developer and UI/UX product designer positions."
      />

      {/* Hero Section */}
      <section className="py-24 bg-[radial-gradient(circle_at_10%_80%,rgba(23,23,23,1)_0%,rgba(35,35,35,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ONFIX CAREERS</span>
          <h1 className="text-[3.2rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent leading-[1.1] tracking-[-1.5px] max-w-[850px] mx-auto">
            Build the Future of Business Automation & Web Software
          </h1>
          <p className="max-w-[700px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            We build high-performance web applications and database integrations. Join our growing team of developers.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-bg-light border-b border-border-light">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">JOIN THE TEAM</span>
              <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">Why Work With Us?</h2>
              <p className="max-w-[650px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
                We support a flat structural startup environment focusing on product execution, code quality, and engineering autonomy.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 max-[767px]:grid-cols-1 gap-8 mt-10">
            {perks.map((p, idx) => (
              <ScrollReveal key={idx} delay={100 + idx * 100}>
                <Card variant="light" hoverEffect={false} className="border border-border-light bg-bg-card flex items-start gap-5 p-7 rounded-large">
                  <div className="p-3 bg-accent/8 rounded-medium text-accent shrink-0">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h3 className="text-[1.15rem] font-bold text-text-dark mb-2">{p.title}</h3>
                    <p className="text-[0.9rem] leading-[1.5] text-text-muted-dark">{p.desc}</p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="py-24 bg-bg-card border-b border-border-light">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">ACTIVE OPPORTUNITIES</span>
              <h2 className="text-[2.5rem] font-heading font-bold mb-4 text-text-dark">Open Positions</h2>
              <p className="max-w-[650px] mx-auto text-text-muted-dark text-lg leading-[1.6]">
                Find your role in our engineering and design sprints.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 max-w-[900px] mx-auto mt-10">
            {jobs.map((job, idx) => (
              <ScrollReveal key={idx} delay={100 + idx * 100}>
                <Card variant="light" hoverEffect={true} className="border border-border-light bg-bg-light p-8 rounded-large flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2.5 items-center mb-3">
                      <span className="bg-accent/8 text-accent font-extrabold text-[0.7rem] px-2.5 py-1 rounded-pill uppercase tracking-[0.5px] font-mono">{job.dept}</span>
                      <span className="text-text-muted-dark text-[0.8rem] font-mono">• {job.location}</span>
                    </div>
                    <h3 className="text-[1.4rem] font-heading font-bold text-text-dark mb-2.5">{job.title}</h3>
                    <p className="text-[0.92rem] text-text-muted-dark leading-[1.5] mb-4">{job.summary}</p>
                    <div className="text-[0.78rem] font-mono text-text-muted-dark bg-bg-card border border-border-light/60 px-3.5 py-2 w-fit rounded-small">
                      <span className="text-accent font-bold">Stack:</span> {job.stack}
                    </div>
                  </div>
                  <a href={`mailto:careers@onfix.lk?subject=Application for ${job.title}`} className="w-full md:w-auto">
                    <Button variant="accent" className="w-full md:w-auto" icon={<ArrowRight size={14} />}>
                      Apply Now
                    </Button>
                  </a>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-24 text-center bg-accent text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[size:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] pointer-events-none"></div>
        <div className="container relative z-2">
          <ScrollReveal>
            <div className="max-w-[750px] mx-auto">
              <h2 className="text-[2.5rem] max-[767px]:text-[2rem] font-[850] mb-5 tracking-[-0.8px]">Do not see your exact role listed?</h2>
              <p className="text-[1.12rem] text-white/80 leading-[1.6] mb-8">
                We are always looking for stellar builders, backend programmers, and systems designers. Send us your CV, portfolio, or a link to your GitHub profile, and let's talk.
              </p>
              <a href="mailto:careers@onfix.lk?subject=General Application - Systems Builder">
                <Button variant="primary" className="!bg-white !text-accent !border-2 !border-white !font-extrabold hover:!bg-[#fff5f0] hover:!text-[#e04e00] hover:!border-[#fff5f0] hover:-translate-y-0.5 active:translate-y-0">
                  Send Your CV & Portfolio
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
