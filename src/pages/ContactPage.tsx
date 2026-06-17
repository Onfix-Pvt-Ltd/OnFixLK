import React, { useState } from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { contactService, type ContactRequestData } from '../services/contactService';
import { 
  ShieldCheck, Send, Info, RefreshCw, 
  HelpCircle, Sparkles, Sliders, Layers, ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  // Systems Audit Form State
  const [formData, setFormData] = useState<ContactRequestData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    interest: 'pos',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Estimator Widget State
  const [estimatorStep, setEstimatorStep] = useState(1);
  const [estIndustry, setEstIndustry] = useState('hospitality');
  const [estLocations, setEstLocations] = useState('1-5');
  const [estTransactions, setEstTransactions] = useState('10k');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setFeedbackMsg('');

    try {
      const response = await contactService.submitInquiry(formData);
      if (response.success) {
        setStatus('success');
        setFeedbackMsg(response.message);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          interest: 'pos',
        });
      } else {
        setStatus('error');
        setFeedbackMsg(response.message);
      }
    } catch {
      setStatus('error');
      setFeedbackMsg('An unexpected network error occurred. Please try again later.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFeedbackMsg('');
  };

  // Estimator Calculations
  const getEstimationResults = () => {
    let latencySaving = '35ms';
    let recommendedCluster = 'Onfix POS Edge Array';
    let databaseEngine = 'DB Core Single-Node FIFO';
    let auditTimeline = '4 Business Days';
    let description = 'Optimized for front-of-house tableside order processing and room charges synchronization.';

    if (estIndustry === 'procurement' || estIndustry === 'enterprise') {
      latencySaving = '60ms';
      recommendedCluster = 'Onfix Cloud ERP Cluster';
      databaseEngine = 'DB Core Multi-Node Cluster';
      auditTimeline = '7 Business Days';
      description = 'Configured for high-volume automated recipe depletion and FIFO purchase order routing.';
    } else if (estIndustry === 'api') {
      latencySaving = '18ms';
      recommendedCluster = 'Onfix API Hub Gateway';
      databaseEngine = 'DB Core High-Frequency Key-Value';
      auditTimeline = '5 Business Days';
      description = 'Customized for external webhook relays and OAuth2 credentials handshakes under high load.';
    }

    if (estLocations === '21-100' || estLocations === '100+') {
      auditTimeline = '10 Business Days';
    }

    return { latencySaving, recommendedCluster, databaseEngine, auditTimeline, description };
  };

  const estResult = getEstimationResults();

  return (
    <div className="animate-fade">
      <SEOHelper 
        title="Request Systems Audit & Proposal" 
        description="Book an engineering audit of your database, POS, or ERP systems. Use our proposal estimator to generate an architecture plan."
      />

      {/* Header Banner */}
      <section className="py-20 bg-[radial-gradient(circle_at_10%_90%,rgba(23,23,23,1)_0%,rgba(33,33,33,1)_100%)] border-b border-border-dark text-text-light">
        <div className="container text-center">
          <span className="block text-[0.8rem] font-[750] tracking-[2px] text-accent mb-3 uppercase">AUDIT REQUESTS</span>
          <h1 className="text-[3rem] max-[767px]:text-[2.2rem] font-[850] mt-2.5 mb-5 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">Systems Audit & Consultations</h1>
          <p className="max-w-[700px] mx-auto text-[1.15rem] text-text-muted-light leading-[1.7]">
            Consult with our core systems engineering group to resolve database row-locking, terminal latency, and inventory syncing failures.
          </p>
        </div>
      </section>

      {/* Split Audit Request Form and Estimator */}
      <section className="py-20 bg-bg-light">
        <div className="container grid grid-cols-2 max-[991px]:grid-cols-1 gap-[50px] max-[991px]:gap-10 items-start">
          
          {/* Left Column: Form Card */}
          <div>
            <h2 className="text-[1.25rem] font-extrabold mb-6 text-text-dark border-b-2 border-border-light pb-3 uppercase tracking-[0.5px]">Architecture Audit Request</h2>
            <Card variant="glass" hoverEffect={false} className="!p-[30px] shadow-medium border border-border-light">
              {status === 'success' ? (
                <div className="text-center py-10 px-2.5">
                  <div className="w-16 h-16 rounded-full bg-[#10b981]/10 text-[#10b981] text-[2rem] leading-[64px] mx-auto mb-6 font-bold flex items-center justify-center">✓</div>
                  <h3 className="text-2xl font-extrabold mb-3 text-text-dark">Audit Request Received</h3>
                  <p className="text-[0.95rem] text-text-muted-dark leading-[1.6] mb-[30px]">{feedbackMsg}</p>
                  <Button onClick={handleReset} variant="primary" className="!p-[12px_24px]" icon={<RefreshCw size={14} />}>
                    Submit Another Audit Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <p className="text-[0.9rem] text-text-muted-dark leading-[1.6] mb-6">
                    Fill out the corporate intake form. A systems engineer will provide an initial recommendation response within 24 hours.
                  </p>
                  
                  {status === 'error' && (
                    <div className="flex items-center gap-2.5 p-[14px_18px] bg-red-50 border border-red-200 rounded-medium text-[0.85rem] text-red-500">
                      <Info size={16} />
                      <span>{feedbackMsg}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[0.85rem] font-bold text-text-dark uppercase tracking-[0.5px]">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Alan Turing"
                      className="w-full p-[14px_16px] text-[0.95rem] text-text-dark bg-white border border-border-light rounded-medium outline-none font-body transition-all duration-150 ease-out focus:border-accent focus:ring-3 focus:ring-accent/8"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[0.85rem] font-bold text-text-dark uppercase tracking-[0.5px]">Work Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="turing@onfix.lk"
                      className="w-full p-[14px_16px] text-[0.95rem] text-text-dark bg-white border border-border-light rounded-medium outline-none font-body transition-all duration-150 ease-out focus:border-accent focus:ring-3 focus:ring-accent/8"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-[0.85rem] font-bold text-text-dark uppercase tracking-[0.5px]">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Bletchley Park Ltd"
                      className="w-full p-[14px_16px] text-[0.95rem] text-text-dark bg-white border border-border-light rounded-medium outline-none font-body transition-all duration-150 ease-out focus:border-accent focus:ring-3 focus:ring-accent/8"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="interest" className="text-[0.85rem] font-bold text-text-dark uppercase tracking-[0.5px]">Core Architecture Goal</label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full p-[14px_16px] text-[0.95rem] text-text-dark bg-white border border-border-light rounded-medium outline-none font-body transition-all duration-150 ease-out focus:border-accent focus:ring-3 focus:ring-accent/8"
                      value={formData.interest}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    >
                      <option value="pos">ONFIX POS (Hospitality Edge POS)</option>
                      <option value="custom">Custom Enterprise ERP Architecture</option>
                      <option value="db">Onfix DB Core Database Engine</option>
                      <option value="general">General Corporate Inquiry</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[0.85rem] font-bold text-text-dark uppercase tracking-[0.5px]">Brief System Diagnostic Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Please details your locations count, write locks, transaction volume, or latency issues..."
                      className="w-full p-[14px_16px] text-[0.95rem] text-text-dark bg-white border border-border-light rounded-medium outline-none font-body transition-all duration-150 ease-out focus:border-accent focus:ring-3 focus:ring-accent/8"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    disabled={status === 'submitting'}
                    className="w-full mt-2.5 !p-4"
                    icon={status === 'submitting' ? <span className="inline-block w-4 h-4 border-2 border-white/30 rounded-full border-t-white animate-spin"></span> : <Send size={16} />}
                  >
                    {status === 'submitting' ? 'Transmitting Core Diagnostics...' : 'Submit Architecture Request'}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Right Column: Estimator Wizard */}
          <div>
            <h2 className="text-[1.25rem] font-extrabold mb-6 text-text-dark border-b-2 border-border-light pb-3 uppercase tracking-[0.5px]">Proposal Estimator Widget</h2>
            
            <Card variant="light" hoverEffect={false} className="!p-0 shadow-medium border border-border-light">
              <div className="bg-[#fafafa] px-6 py-4 font-[750] text-[0.8rem] tracking-[1px] text-[#888] flex items-center gap-2.5 border-b border-border-light">
                <Sparkles size={16} className="text-accent" />
                <span>DYNAMIC DEPLOYMENT EVALUATOR</span>
              </div>

              {/* Step indicator bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#fafafa] border-b border-border-light">
                <span className={`text-[0.75rem] font-bold text-[#a3a3a3] uppercase tracking-[0.5px] ${estimatorStep >= 1 ? 'text-accent' : ''}`}>1. Scope</span>
                <span className="grow h-[1px] bg-border-light mx-3"></span>
                <span className={`text-[0.75rem] font-bold text-[#a3a3a3] uppercase tracking-[0.5px] ${estimatorStep >= 2 ? 'text-accent' : ''}`}>2. Volume</span>
                <span className="grow h-[1px] bg-border-light mx-3"></span>
                <span className={`text-[0.75rem] font-bold text-[#a3a3a3] uppercase tracking-[0.5px] ${estimatorStep >= 3 ? 'text-accent' : ''}`}>3. Analysis</span>
              </div>

              <div className="p-[30px] bg-white">
                
                {/* Step 1: Industry Scope */}
                {estimatorStep === 1 && (
                  <div className="animate-fade">
                    <h4 className="text-[1.15rem] font-extrabold text-text-dark mb-1">Select Your Operational Scope:</h4>
                    <p className="text-[0.85rem] text-text-muted-dark mb-6">Choose the primary framework you want audited.</p>
                    
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => setEstIndustry('hospitality')} 
                        className={`flex flex-col text-left p-[16px_20px] border border-border-light bg-[#fafafa] rounded-medium cursor-pointer outline-none font-body transition-all duration-150 ease-out hover:bg-white hover:border-[#cbd5e1] hover:-translate-y-0.5 ${
                          estIndustry === 'hospitality' ? 'bg-accent/2 border-accent shadow-[0_0_12px_rgba(255,94,0,0.08)]' : ''
                        }`}
                      >
                        <span className="block font-[750] text-[0.95rem] text-text-dark mb-1">Hospitality POS & PMS Core</span>
                        <span className="block text-[0.8rem] text-text-muted-dark leading-[1.5]">Front-of-house checkout, QR menu tableside, hotel room charge sync.</span>
                      </button>

                      <button 
                        onClick={() => setEstIndustry('procurement')} 
                        className={`flex flex-col text-left p-[16px_20px] border border-border-light bg-[#fafafa] rounded-medium cursor-pointer outline-none font-body transition-all duration-150 ease-out hover:bg-white hover:border-[#cbd5e1] hover:-translate-y-0.5 ${
                          estIndustry === 'procurement' ? 'bg-accent/2 border-accent shadow-[0_0_12px_rgba(255,94,0,0.08)]' : ''
                        }`}
                      >
                        <span className="block font-[750] text-[0.95rem] text-text-dark mb-1">Enterprise Cloud ERP</span>
                        <span className="block text-[0.8rem] text-text-muted-dark leading-[1.5]">Automated FIFO depletion, procurement chains, ledgers.</span>
                      </button>

                      <button 
                        onClick={() => setEstIndustry('api')} 
                        className={`flex flex-col text-left p-[16px_20px] border border-border-light bg-[#fafafa] rounded-medium cursor-pointer outline-none font-body transition-all duration-150 ease-out hover:bg-white hover:border-[#cbd5e1] hover:-translate-y-0.5 ${
                          estIndustry === 'api' ? 'bg-accent/2 border-accent shadow-[0_0_12px_rgba(255,94,0,0.08)]' : ''
                        }`}
                      >
                        <span className="block font-[750] text-[0.95rem] text-text-dark mb-1">Secure API Gateway</span>
                        <span className="block text-[0.8rem] text-text-muted-dark leading-[1.5]">Xero, Stripe integration hubs, webhook relays.</span>
                      </button>
                    </div>

                    <div className="mt-[30px] flex justify-end border-t border-border-light pt-5">
                      <Button onClick={() => setEstimatorStep(2)} variant="accent" icon={<ArrowRight size={14} />}>
                        Continue to Scale Settings
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Scale and Volume Settings */}
                {estimatorStep === 2 && (
                  <div className="animate-fade">
                    <h4 className="text-[1.15rem] font-extrabold text-text-dark mb-1">Specify Operational Scale:</h4>
                    <p className="text-[0.85rem] text-text-muted-dark mb-6">Input your nodes density and daily transaction counts.</p>

                    <div className="flex flex-col">
                      <div className="flex flex-col gap-3">
                        <label className="flex items-center gap-2 text-[0.85rem] font-bold text-text-dark"><Sliders size={14} /> Active Locations / Branches</label>
                        <div className="grid grid-cols-4 max-[767px]:grid-cols-2 bg-[#f5f5f5] p-1 rounded-pill max-[767px]:rounded-medium gap-1">
                          {['1-5', '6-20', '21-100', '100+'].map((opt) => (
                            <button 
                              key={opt}
                              type="button"
                              onClick={() => setEstLocations(opt)} 
                              className={`background-transparent border-none py-2.5 font-semibold text-[0.85rem] text-[#666] rounded-pill max-[767px]:rounded-medium cursor-pointer text-center transition-all duration-150 ease-out hover:text-text-dark ${
                                estLocations === opt ? 'bg-white text-accent shadow-subtle font-bold' : ''
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3" style={{ marginTop: '24px' }}>
                        <label className="flex items-center gap-2 text-[0.85rem] font-bold text-text-dark"><Layers size={14} /> Daily Transaction Volume</label>
                        <div className="grid grid-cols-4 max-[767px]:grid-cols-2 bg-[#f5f5f5] p-1 rounded-pill max-[767px]:rounded-medium gap-1">
                          {['<1k', '1k-10k', '10k-50k', '50k+'].map((opt) => (
                            <button 
                              key={opt}
                              type="button"
                              onClick={() => setEstTransactions(opt)} 
                              className={`background-transparent border-none py-2.5 font-semibold text-[0.85rem] text-[#666] rounded-pill max-[767px]:rounded-medium cursor-pointer text-center transition-all duration-150 ease-out hover:text-text-dark ${
                                estTransactions === opt ? 'bg-white text-accent shadow-subtle font-bold' : ''
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-[30px] flex justify-between border-t border-border-light pt-5">
                      <button onClick={() => setEstimatorStep(1)} className="bg-transparent border border-border-light font-bold text-[0.85rem] px-5 py-2.5 rounded-pill text-text-dark cursor-pointer transition-all duration-150 ease-out hover:bg-[#f5f5f5] hover:border-[#d4d4d4]">
                        Back
                      </button>
                      <Button onClick={() => setEstimatorStep(3)} variant="accent" icon={<ArrowRight size={14} />}>
                        Generate Audit Scope
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Analysis Results */}
                {estimatorStep === 3 && (
                  <div className="animate-fade">
                    <h4 className="text-[1.15rem] font-extrabold text-[#10b981] mb-1">Audit Evaluation Generated</h4>
                    <p className="text-[0.85rem] text-text-muted-dark mb-6">Recommended infrastructure target configured based on scale metrics.</p>

                    <div className="bg-[#fafafa] border border-border-light rounded-medium overflow-hidden mt-4">
                      <div className="flex justify-between items-center px-5 py-4 border-b border-border-light">
                        <span className="text-[0.8rem] text-text-muted-dark font-semibold">Recommended Deployment</span>
                        <span className="font-bold text-[0.9rem] text-text-dark font-mono">{estResult.recommendedCluster}</span>
                      </div>

                      <div className="flex justify-between items-center px-5 py-4 border-b border-border-light">
                        <span className="text-[0.8rem] text-text-muted-dark font-semibold">Target Database Engine</span>
                        <span className="font-bold text-[0.9rem] text-text-dark font-mono">{estResult.databaseEngine}</span>
                      </div>

                      <div className="flex justify-between items-center px-5 py-4 border-b border-border-light">
                        <span className="text-[0.8rem] text-text-muted-dark font-semibold">Estimated Latency Improvement</span>
                        <span className="text-[#059669] font-mono text-[0.95rem] font-bold">Save ~{estResult.latencySaving}</span>
                      </div>

                      <div className="flex justify-between items-center px-5 py-4 border-b border-border-light">
                        <span className="text-[0.8rem] text-text-muted-dark font-semibold">Initial Audit Scope Timeline</span>
                        <span className="font-bold text-[0.9rem] text-text-dark font-mono">{estResult.auditTimeline}</span>
                      </div>

                      <div className="flex gap-2.5 px-5 py-4 bg-accent/2 text-[0.8rem] text-text-muted-dark leading-[1.5]">
                        <HelpCircle size={14} className="shrink-0 text-accent" />
                        <span>{estResult.description}</span>
                      </div>
                    </div>

                    <div className="mt-[30px] flex justify-between border-t border-border-light pt-5 max-[767px]:w-full [&>button]:max-[767px]:w-full">
                      <button onClick={() => setEstimatorStep(2)} className="bg-transparent border border-border-light font-bold text-[0.85rem] px-5 py-2.5 rounded-pill text-text-dark cursor-pointer transition-all duration-150 ease-out hover:bg-[#f5f5f5] hover:border-[#d4d4d4]">
                        Back
                      </button>
                      <button 
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            message: `Generated via Estimator Widget:\nIndustry Scope: ${estIndustry}\nActive Locations: ${estLocations}\nTransactions: ${estTransactions}\nRecommended Cluster: ${estResult.recommendedCluster}\nTarget Database: ${estResult.databaseEngine}\nEstimated Latency Saving: ~${estResult.latencySaving}\n\nPlease audit our current configuration.`
                          }));
                          setEstimatorStep(1);
                        }} 
                        className="bg-bg-dark text-white border-none font-[750] text-[0.85rem] px-6 py-3 rounded-pill cursor-pointer transition-all duration-150 ease-out hover:bg-[#252525] hover:text-accent"
                      >
                        Apply to Intake Form
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </Card>

            <div className="mt-6 bg-white border border-border-light p-5 rounded-medium flex gap-4">
              <ShieldCheck className="text-accent shrink-0" size={24} />
              <div>
                <h4 className="text-[0.95rem] font-[750] text-text-dark mb-1">Continuous NDA Handshakes</h4>
                <p className="text-[0.8rem] text-text-muted-dark leading-[1.5]">All shared architecture diagrams, daily volumes, and node specs are handled in strict sandbox secrecy.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
