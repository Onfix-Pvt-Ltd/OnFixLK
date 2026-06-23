import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Shield } from 'lucide-react';
import logoImg from '../../assets/logos/onfix-oval-logo.png';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-bg-dark text-text-light border-t border-border-dark pt-20 pb-0 relative">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-12">
        <div className="flex flex-col gap-5 col-span-1 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="Onfix Logo" className="h-9 w-auto rounded-small" />
            <span className="font-heading font-extrabold text-[1.25rem] tracking-[2px] text-text-light">ONFIX</span>
          </Link>
          <p className="text-[0.9rem] text-text-muted-light leading-[1.6]">
            Next-generation enterprise resource systems and databases. Building high-performance solutions for high-performance organizations.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-border-dark text-text-muted-light transition-all duration-150 ease-out hover:bg-accent hover:text-text-light hover:-translate-y-0.5" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-border-dark text-text-muted-light transition-all duration-150 ease-out hover:bg-accent hover:text-text-light hover:-translate-y-0.5" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-border-dark text-text-muted-light transition-all duration-150 ease-out hover:bg-accent hover:text-text-light hover:-translate-y-0.5" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 col-span-1">
          <h4 className="text-text-light text-[0.95rem] font-bold tracking-[1px] uppercase">Services</h4>
          <ul className="list-none flex flex-col gap-3.5">
            <li><Link to="/services" className="text-text-muted-light text-[0.9rem] font-medium transition-all duration-150 ease-out hover:text-accent hover:pl-1">Websites & Apps</Link></li>
            <li><Link to="/services" className="text-text-muted-light text-[0.9rem] font-medium transition-all duration-150 ease-out hover:text-accent hover:pl-1">Custom Software</Link></li>
            <li><Link to="/services" className="text-text-muted-light text-[0.9rem] font-medium transition-all duration-150 ease-out hover:text-accent hover:pl-1">AI & Automation</Link></li>
            <li><Link to="/services" className="text-text-muted-light text-[0.9rem] font-medium transition-all duration-150 ease-out hover:text-accent hover:pl-1">System Integrations</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 col-span-1">
          <h4 className="text-text-light text-[0.95rem] font-bold tracking-[1px] uppercase">Company</h4>
          <ul className="list-none flex flex-col gap-3.5">
            <li><Link to="/about" className="text-text-muted-light text-[0.9rem] font-medium transition-all duration-150 ease-out hover:text-accent hover:pl-1">About Us</Link></li>
            <li><Link to="/products" className="text-text-muted-light text-[0.9rem] font-medium transition-all duration-150 ease-out hover:text-accent hover:pl-1">Products</Link></li>
            <li><Link to="/news" className="text-text-muted-light text-[0.9rem] font-medium transition-all duration-150 ease-out hover:text-accent hover:pl-1">News & Updates</Link></li>
            <li><Link to="/careers" className="text-text-muted-light text-[0.9rem] font-medium transition-all duration-150 ease-out hover:text-accent hover:pl-1">Careers</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-5 col-span-1 sm:col-span-2 lg:col-span-1">
          <h4 className="text-text-light text-[0.95rem] font-bold tracking-[1px] uppercase">Stay Synchronized</h4>
          <p className="text-[0.9rem] text-text-muted-light">Subscribe to get technical bulletins and release notes.</p>
          
          {subscribed ? (
            <div className="flex items-center gap-3 text-[#10B981] font-semibold text-[0.95rem] bg-[#10B981]/5 border border-[#10B981]/20 p-3 rounded-medium">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#10B981]/15 text-[0.8rem]">✓</span>
              <span>Subscribed successfully.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full">
              <div className="flex items-center bg-border-dark border border-[#333333] rounded-medium p-[6px_12px] relative transition-all duration-150 ease-out focus-within:border-accent focus-within:shadow-[0_0_10px_rgba(255,94,0,0.25)]">
                <Mail className="text-text-muted-light mr-3" size={16} />
                <input
                  type="email"
                  placeholder="engineering@company.com"
                  className="bg-transparent border-none text-text-light font-body text-[0.9rem] w-full outline-none py-2 placeholder-[#555555]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="bg-transparent border-none text-accent cursor-pointer flex items-center justify-center p-1.5 rounded-small transition-all duration-150 ease-out hover:text-text-light hover:bg-accent" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="mt-20 border-t border-border-dark py-[30px] text-[0.85rem] text-text-muted-light">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-5 text-center">
          <div className="copy">
            &copy; {new Date().getFullYear()} Onfix Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-text-light font-medium"><Shield size={14} /> SOC2 Type II Certified</span>
            <span className="text-[#333333]">|</span>
            <a href="#" className="text-text-muted-light transition-all duration-150 ease-out hover:text-text-light">Privacy Policy</a>
            <span className="text-[#333333]">|</span>
            <a href="#" className="text-text-muted-light transition-all duration-150 ease-out hover:text-text-light">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
