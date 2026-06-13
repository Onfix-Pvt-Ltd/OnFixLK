import React, { useState } from 'react';
import { SEOHelper } from '../components/common/SEOHelper';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { contactService, type ContactRequestData } from '../services/contactService';
import { 
  ShieldCheck, Send, Info, RefreshCw, 
  HelpCircle, Sparkles, Sliders, Layers, ArrowRight
} from 'lucide-react';
import './ContactPage.css';

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
    } catch (err) {
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
    <div className="contact-page animate-fade">
      <SEOHelper 
        title="Request Systems Audit & Proposal" 
        description="Book an engineering audit of your database, POS, or ERP systems. Use our proposal estimator to generate an architecture plan."
      />

      {/* Header Banner */}
      <section className="contact-hero-section section-dark">
        <div className="container header-container text-center">
          <span className="section-pretitle">AUDIT REQUESTS</span>
          <h1 className="contact-hero-title">Systems Audit & Consultations</h1>
          <p className="contact-hero-subtitle">
            Consult with our core systems engineering group to resolve database row-locking, terminal latency, and inventory syncing failures.
          </p>
        </div>
      </section>

      {/* Split Audit Request Form and Estimator */}
      <section className="contact-content-section section">
        <div className="container contact-grid">
          
          {/* Left Column: Form Card */}
          <div className="form-column">
            <h2 className="column-title">Architecture Audit Request</h2>
            <Card variant="glass" hoverEffect={false} className="contact-form-card">
              {status === 'success' ? (
                <div className="form-success-screen">
                  <div className="success-icon-badge">✓</div>
                  <h3 className="success-title">Audit Request Received</h3>
                  <p className="success-text">{feedbackMsg}</p>
                  <Button onClick={handleReset} variant="primary" className="success-reset-btn" icon={<RefreshCw size={14} />}>
                    Submit Another Audit Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <p className="form-instruction-text">
                    Fill out the corporate intake form. A systems engineer will provide an initial recommendation response within 24 hours.
                  </p>
                  
                  {status === 'error' && (
                    <div className="form-error-banner">
                      <Info size={16} />
                      <span>{feedbackMsg}</span>
                    </div>
                  )}

                  <div className="form-field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Alan Turing"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">Work Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="turing@onfix.lk"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Bletchley Park Ltd"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="interest">Core Architecture Goal</label>
                    <select
                      id="interest"
                      name="interest"
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

                  <div className="form-field">
                    <label htmlFor="message">Brief System Diagnostic Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Please details your locations count, write locks, transaction volume, or latency issues..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    disabled={status === 'submitting'}
                    className="form-submit-btn"
                    icon={status === 'submitting' ? <span className="spinner"></span> : <Send size={16} />}
                  >
                    {status === 'submitting' ? 'Transmitting Core Diagnostics...' : 'Submit Architecture Request'}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Right Column: Estimator Wizard */}
          <div className="estimator-column">
            <h2 className="column-title">Proposal Estimator Widget</h2>
            
            <Card variant="light" className="estimator-wizard-card">
              <div className="estimator-header">
                <Sparkles size={16} className="orange-text" />
                <span>DYNAMIC DEPLOYMENT EVALUATOR</span>
              </div>

              {/* Step indicator bar */}
              <div className="estimator-steps-indicator">
                <span className={`step-dot ${estimatorStep >= 1 ? 'step-active' : ''}`}>1. Scope</span>
                <span className="step-line"></span>
                <span className={`step-dot ${estimatorStep >= 2 ? 'step-active' : ''}`}>2. Volume</span>
                <span className="step-line"></span>
                <span className={`step-dot ${estimatorStep >= 3 ? 'step-active' : ''}`}>3. Analysis</span>
              </div>

              <div className="estimator-body">
                
                {/* Step 1: Industry Scope */}
                {estimatorStep === 1 && (
                  <div className="estimator-step-content animate-fade">
                    <h4>Select Your Operational Scope:</h4>
                    <p className="step-help">Choose the primary framework you want audited.</p>
                    
                    <div className="options-selector-list">
                      <button 
                        onClick={() => setEstIndustry('hospitality')} 
                        className={`selector-option-btn ${estIndustry === 'hospitality' ? 'selected' : ''}`}
                      >
                        <span className="option-title">Hospitality POS & PMS Core</span>
                        <span className="option-desc">Front-of-house checkout, QR menu tableside, hotel room charge sync.</span>
                      </button>

                      <button 
                        onClick={() => setEstIndustry('procurement')} 
                        className={`selector-option-btn ${estIndustry === 'procurement' ? 'selected' : ''}`}
                      >
                        <span className="option-title">Enterprise Cloud ERP</span>
                        <span className="option-desc">Automated FIFO depletion, procurement chains, ledgers.</span>
                      </button>

                      <button 
                        onClick={() => setEstIndustry('api')} 
                        className={`selector-option-btn ${estIndustry === 'api' ? 'selected' : ''}`}
                      >
                        <span className="option-title">Secure API Gateway</span>
                        <span className="option-desc">Xero, Stripe integration hubs, webhook relays.</span>
                      </button>
                    </div>

                    <div className="step-navigation-footer">
                      <Button onClick={() => setEstimatorStep(2)} variant="accent" icon={<ArrowRight size={14} />}>
                        Continue to Scale Settings
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Scale and Volume Settings */}
                {estimatorStep === 2 && (
                  <div className="estimator-step-content animate-fade">
                    <h4>Specify Operational Scale:</h4>
                    <p className="step-help">Input your nodes density and daily transaction counts.</p>

                    <div className="scale-inputs-group">
                      <div className="range-selector-row">
                        <label className="input-label"><Sliders size={14} /> Active Locations / Branches</label>
                        <div className="btn-pill-selector">
                          {['1-5', '6-20', '21-100', '100+'].map((opt) => (
                            <button 
                              key={opt}
                              type="button"
                              onClick={() => setEstLocations(opt)} 
                              className={`pill-btn ${estLocations === opt ? 'active' : ''}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="range-selector-row" style={{ marginTop: '24px' }}>
                        <label className="input-label"><Layers size={14} /> Daily Transaction Volume</label>
                        <div className="btn-pill-selector">
                          {['<1k', '1k-10k', '10k-50k', '50k+'].map((opt) => (
                            <button 
                              key={opt}
                              type="button"
                              onClick={() => setEstTransactions(opt)} 
                              className={`pill-btn ${estTransactions === opt ? 'active' : ''}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="step-navigation-footer double-btn">
                      <button onClick={() => setEstimatorStep(1)} className="btn-go-back">
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
                  <div className="estimator-step-content animate-fade">
                    <h4 className="green-text">Audit Evaluation Generated</h4>
                    <p className="step-help">Recommended infrastructure target configured based on scale metrics.</p>

                    <div className="estimator-results-box">
                      <div className="result-metric-row">
                        <span className="result-lbl">Recommended Deployment</span>
                        <span className="result-val font-mono">{estResult.recommendedCluster}</span>
                      </div>

                      <div className="result-metric-row">
                        <span className="result-lbl">Target Database Engine</span>
                        <span className="result-val font-mono">{estResult.databaseEngine}</span>
                      </div>

                      <div className="result-metric-row">
                        <span className="result-lbl">Estimated Latency Improvement</span>
                        <span className="result-val green-text font-mono"><strong>Save ~{estResult.latencySaving}</strong></span>
                      </div>

                      <div className="result-metric-row">
                        <span className="result-lbl">Initial Audit Scope Timeline</span>
                        <span className="result-val font-mono">{estResult.auditTimeline}</span>
                      </div>

                      <div className="result-description">
                        <HelpCircle size={14} />
                        <span>{estResult.description}</span>
                      </div>
                    </div>

                    <div className="step-navigation-footer double-btn">
                      <button onClick={() => setEstimatorStep(2)} className="btn-go-back">
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
                        className="btn-use-estimate"
                      >
                        Apply to Intake Form
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </Card>

            <div className="estimator-compliance-card">
              <ShieldCheck className="orange-text" size={24} />
              <div>
                <h4>Continuous NDA Handshakes</h4>
                <p>All shared architecture diagrams, daily volumes, and node specs are handled in strict sandbox secrecy.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
