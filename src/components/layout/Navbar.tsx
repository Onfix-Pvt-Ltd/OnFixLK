import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ArrowRight, ChevronDown, 
  ShoppingBag, Cpu, Database, Share2, 
  Server, Shield, Activity, FileText, 
  Zap, HelpCircle, PhoneCall, Code,
  Sun, Moon
} from 'lucide-react';
import { Button } from '../common/Button';
import { useDarkMode } from '../../hooks/useDarkMode';
import logoImg from '../../assets/logos/onfix-smooth-square-logo.png';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileAccordion, setActiveMobileAccordion] = useState<string | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const { theme, toggleTheme } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setActiveDropdown(null);
    setActiveMobileAccordion(null);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (menuName: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimerRef.current = null;
    }, 150);
  };

  const toggleMobileAccordion = (accordionName: string) => {
    setActiveMobileAccordion(prev => prev === accordionName ? null : accordionName);
  };

  return (
    <header className={`absolute top-0 left-0 w-full h-[90px] z-[1000] flex items-center transition-all duration-300 ease-out border-b border-transparent ${scrolled ? 'fixed h-[75px] bg-bg-light/92 backdrop-blur-[12px] border-b border-border-light/40 shadow-subtle' : ''}`}>
      <div className="container flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
          <img src={logoImg} alt="Onfix Pvt Ltd Logo" className="h-10 w-auto rounded-small transition-all duration-300 ease-out group-hover:scale-108 group-hover:rotate-5" />
          <span className="font-heading font-extrabold text-[1.3rem] tracking-[2px] text-text-dark">ONFIX</span>
        </Link>

        {/* Desktop Navigation with Mega Menus */}
        <nav className="hidden min-[992px]:block">
          <ul className="flex list-none gap-9">
            
            {/* Products Mega Menu Link */}
            <li 
              className="static"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/products" className={`text-[0.95rem] font-semibold inline-flex items-center gap-1.5 transition-all duration-150 ease-out hover:opacity-100 hover:text-accent ${scrolled ? 'py-6' : 'py-[30px]'} ${location.pathname === '/products' ? 'opacity-100 text-accent' : 'text-text-dark opacity-80'}`}>
                <span>Products</span> <ChevronDown size={14} className={`transition-transform duration-200 ease-out ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </Link>
              
              {activeDropdown === 'products' && (
                <div className={`absolute left-0 w-full bg-bg-light/98 border-b border-border-light shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-10 z-[999] backdrop-blur-[12px] animate-slide-down ${scrolled ? 'top-[75px]' : 'top-[90px]'}`}>
                  <div className="container">
                    <div className="grid grid-cols-[1.1fr_1.1fr_0.8fr_1.2fr] gap-8">
                      
                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">ERP Solutions</span>
                        <Link to="/products#pos" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <ShoppingBag size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">ONFIX POS Core</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">Real-time hospitality point-of-sale database.</span>
                          </div>
                        </Link>
                        <Link to="/products#erp" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <Cpu size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">Custom ERP Systems</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">FIFO recipe stock & procurement ledgers.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Infrastructure</span>
                        <Link to="/products#db-core" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <Database size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">Onfix DB Core</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">Ultra-low latency, zero-lock transactions database.</span>
                          </div>
                        </Link>
                        <Link to="/products#api-hub" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <Share2 size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">Integrations & API Hub</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">REST & GraphQL secure gateways.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Integrations</span>
                        <a href="/products#api-hub" className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted-dark p-[8px_12px] rounded-small mb-1 hover:text-accent hover:bg-black/2 group">
                          <Zap size={14} className="text-[#a3a3a3] transition-all duration-150 ease-out group-hover:text-accent group-hover:translate-x-0.5" /> <span>Merchant payment gateways</span>
                        </a>
                        <a href="/products#api-hub" className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted-dark p-[8px_12px] rounded-small mb-1 hover:text-accent hover:bg-black/2 group">
                          <Zap size={14} className="text-[#a3a3a3] transition-all duration-150 ease-out group-hover:text-accent group-hover:translate-x-0.5" /> <span>Xero & ERP corporate ledgers</span>
                        </a>
                        <a href="/products#api-hub" className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted-dark p-[8px_12px] rounded-small mb-1 hover:text-accent hover:bg-black/2 group">
                          <Zap size={14} className="text-[#a3a3a3] transition-all duration-150 ease-out group-hover:text-accent group-hover:translate-x-0.5" /> <span>Tableside QR checkout gateways</span>
                        </a>
                      </div>

                      <div className="flex flex-col">
                        <div className="bg-gradient-to-br from-bg-dark to-[#252525] p-6 rounded-large text-white h-full flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                          <span className="self-start bg-accent text-white text-[0.65rem] font-extrabold px-2 py-1 rounded-pill tracking-[0.5px] mb-4">NEW RELEASE</span>
                          <h4 className="text-[1.05rem] font-[750] mb-2">Onfix DB Core v4.2</h4>
                          <p className="text-[0.78rem] text-[#bbb] leading-[1.4] mb-5 grow">Lock-free serializing transaction engine achieves 0.8ms average latency in high-density builds.</p>
                          <Link to="/insights" className="inline-flex items-center gap-1.5 text-[0.8rem] font-[750] text-accent transition-all duration-150 ease-out hover:gap-2.5 hover:text-[#ff8d4d] group">
                            <span>Read Release Notes</span> <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Philosophy & Infra Mega Menu Link */}
            <li 
              className="static"
              onMouseEnter={() => handleMouseEnter('philosophy')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/philosophy" className={`text-[0.95rem] font-semibold inline-flex items-center gap-1.5 transition-all duration-150 ease-out hover:opacity-100 hover:text-accent ${scrolled ? 'py-6' : 'py-[30px]'} ${location.pathname === '/philosophy' ? 'opacity-100 text-accent' : 'text-text-dark opacity-80'}`}>
                <span>Philosophy & Infra</span> <ChevronDown size={14} className={`transition-transform duration-200 ease-out ${activeDropdown === 'philosophy' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'philosophy' && (
                <div className={`absolute left-0 w-full bg-bg-light/98 border-b border-border-light shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-10 z-[999] backdrop-blur-[12px] animate-slide-down ${scrolled ? 'top-[75px]' : 'top-[90px]'}`}>
                  <div className="container">
                    <div className="grid grid-cols-[1.1fr_1.1fr_0.8fr_1.2fr] gap-8">

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Platform DNA</span>
                        <Link to="/philosophy" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <Cpu size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">Sovereign Software</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">Why we write our own database files and sockets.</span>
                          </div>
                        </Link>
                        <Link to="/philosophy" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <Activity size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">Latency Obsession</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">Sub-15ms client terminal routing parameters.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Clusters & Edge</span>
                        <Link to="/philosophy" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <Server size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">Colombo Edge Node</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">lk-colombo-edge-01 hardware array log.</span>
                          </div>
                        </Link>
                        <Link to="/philosophy" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <Server size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">Singapore Failover Grid</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">BGP path routing redundant failover targeting.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Certifications</span>
                        <a href="/philosophy" className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted-dark p-[8px_12px] rounded-small mb-1 hover:text-accent hover:bg-black/2 group">
                          <Shield size={14} className="text-[#a3a3a3] transition-all duration-150 ease-out group-hover:text-accent group-hover:translate-x-0.5" /> <span>SOC 2 Type II Certified</span>
                        </a>
                        <a href="/philosophy" className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted-dark p-[8px_12px] rounded-small mb-1 hover:text-accent hover:bg-black/2 group">
                          <Shield size={14} className="text-[#a3a3a3] transition-all duration-150 ease-out group-hover:text-accent group-hover:translate-x-0.5" /> <span>PCI-DSS Level 1 Compliance</span>
                        </a>
                        <a href="/philosophy" className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted-dark p-[8px_12px] rounded-small mb-1 hover:text-accent hover:bg-black/2 group">
                          <Shield size={14} className="text-[#a3a3a3] transition-all duration-150 ease-out group-hover:text-accent group-hover:translate-x-0.5" /> <span>AES-256 GCM Transit Cipher</span>
                        </a>
                      </div>

                      <div className="flex flex-col">
                        <div className="bg-[#0f172a] p-6 rounded-large text-white h-full flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                            <span className="text-[0.75rem] font-bold text-[#10b981] uppercase">All Edge Nodes Online</span>
                          </div>
                          <div className="mb-5">
                            <span className="block text-[2.2rem] font-[850] text-white font-mono leading-none">14 ms</span>
                            <span className="block text-[0.7rem] text-[#94a3b8] uppercase font-semibold mt-1">Avg Response Time</span>
                          </div>
                          <Link to="/philosophy" className="inline-flex items-center gap-1.5 text-[0.8rem] font-[750] text-accent transition-all duration-150 ease-out hover:gap-2.5 hover:text-[#ff8d4d] border-t border-white/10 pt-3 w-full group">
                            <span>Execute Edge Latency Check</span> <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Insights Mega Menu Link */}
            <li 
              className="static"
              onMouseEnter={() => handleMouseEnter('insights')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/insights" className={`text-[0.95rem] font-semibold inline-flex items-center gap-1.5 transition-all duration-150 ease-out hover:opacity-100 hover:text-accent ${scrolled ? 'py-6' : 'py-[30px]'} ${location.pathname === '/insights' ? 'opacity-100 text-accent' : 'text-text-dark opacity-80'}`}>
                <span>Insights</span> <ChevronDown size={14} className={`transition-transform duration-200 ease-out ${activeDropdown === 'insights' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'insights' && (
                <div className={`absolute left-0 w-full bg-bg-light/98 border-b border-border-light shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-10 z-[999] backdrop-blur-[12px] animate-slide-down ${scrolled ? 'top-[75px]' : 'top-[90px]'}`}>
                  <div className="container">
                    <div className="grid grid-cols-[1.1fr_1.1fr_0.8fr_1.2fr] gap-8">

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Case Studies</span>
                        <Link to="/insights" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <FileText size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">Nobu Hospitality POS</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">QR Ordering rollouts across 12 hotels.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Engineering Research</span>
                        <Link to="/insights" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <Database size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">FIFO Lockless DBs</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">Eliminating thread deadlock hazards under load.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Ecosystem Bulletins</span>
                        <a href="/insights" className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted-dark p-[8px_12px] rounded-small mb-1 hover:text-accent hover:bg-black/2 group">
                          <Zap size={14} className="text-[#a3a3a3] transition-all duration-150 ease-out group-hover:text-accent group-hover:translate-x-0.5" /> <span>v4.2.1 patch notes</span>
                        </a>
                        <a href="/insights" className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted-dark p-[8px_12px] rounded-small mb-1 hover:text-accent hover:bg-black/2 group">
                          <Zap size={14} className="text-[#a3a3a3] transition-all duration-150 ease-out group-hover:text-accent group-hover:translate-x-0.5" /> <span>Southeast Asia Node deployment</span>
                        </a>
                      </div>

                      <div className="flex flex-col">
                        <div className="bg-gradient-to-br from-bg-dark to-[#252525] p-6 rounded-large text-white h-full flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                          <span className="self-start bg-accent text-white text-[0.65rem] font-extrabold px-2 py-1 rounded-pill tracking-[0.5px] mb-4">RECENT POST</span>
                          <h4 className="text-[1.05rem] font-[750] mb-2">Nobu Hotels reduced tableside latency by 80%</h4>
                          <p className="text-[0.78rem] text-[#bbb] leading-[1.4] mb-5 grow">Learn how our anycast edge arrays synchronized transactions during dinner service.</p>
                          <Link to="/insights" className="inline-flex items-center gap-1.5 text-[0.8rem] font-[750] text-accent transition-all duration-150 ease-out hover:gap-2.5 hover:text-[#ff8d4d] group">
                            <span>Read Case Study</span> <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Company & Support Mega Menu Link */}
            <li 
              className="static"
              onMouseEnter={() => handleMouseEnter('company')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/contact" className={`text-[0.95rem] font-semibold inline-flex items-center gap-1.5 transition-all duration-150 ease-out hover:opacity-100 hover:text-accent ${scrolled ? 'py-6' : 'py-[30px]'} ${location.pathname === '/contact' ? 'opacity-100 text-accent' : 'text-text-dark opacity-80'}`}>
                <span>Company & Support</span> <ChevronDown size={14} className={`transition-transform duration-200 ease-out ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'company' && (
                <div className={`absolute left-0 w-full bg-bg-light/98 border-b border-border-light shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-10 z-[999] backdrop-blur-[12px] animate-slide-down ${scrolled ? 'top-[75px]' : 'top-[90px]'}`}>
                  <div className="container">
                    <div className="grid grid-cols-[1.1fr_1.1fr_0.8fr_1.2fr] gap-8">

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Audit & Consultations</span>
                        <Link to="/contact" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <PhoneCall size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">Request Systems Audit</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">Free code and network telemetry review.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Developers</span>
                        <Link to="/products#api-hub" className="flex items-start gap-3.5 p-[10px_12px] rounded-medium mb-2 transition-all duration-150 ease-out hover:bg-accent/4">
                          <Code size={16} className="text-accent mt-0.5" />
                          <div>
                            <span className="block text-[0.88rem] font-bold text-text-dark">Sandbox APIs</span>
                            <span className="block text-[0.75rem] text-text-muted-dark mt-1 leading-[1.4]">Test payload responses in local terminals.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-[750] uppercase text-accent tracking-[1.5px] mb-5 border-b border-black/5 pb-1.5">Service SLAs</span>
                        <a href="/philosophy" className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted-dark p-[8px_12px] rounded-small mb-1 hover:text-accent hover:bg-black/2 group">
                          <HelpCircle size={14} className="text-[#a3a3a3] transition-all duration-150 ease-out group-hover:text-accent group-hover:translate-x-0.5" /> <span>99.999% uptime guarantees</span>
                        </a>
                        <a href="/contact" className="flex items-center gap-2 text-[0.85rem] font-semibold text-text-muted-dark p-[8px_12px] rounded-small mb-1 hover:text-accent hover:bg-black/2 group">
                          <HelpCircle size={14} className="text-[#a3a3a3] transition-all duration-150 ease-out group-hover:text-accent group-hover:translate-x-0.5" /> <span>24/7 engineering response SLAs</span>
                        </a>
                      </div>

                      <div className="flex flex-col">
                        <div className="bg-gradient-to-br from-bg-dark to-[#252525] p-6 rounded-large text-white h-full flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                          <h4 className="text-[1.05rem] font-[750] mb-2">We are hiring!</h4>
                          <p className="text-[0.78rem] text-[#bbb] leading-[1.4] mb-5 grow">Join our core systems engineering group in Colombo and Singapore building next-generation DBs.</p>
                          <Link to="/philosophy" className="inline-flex items-center gap-1.5 text-[0.8rem] font-[750] text-accent transition-all duration-150 ease-out hover:gap-2.5 hover:text-[#ff8d4d] group">
                            <span>Explore Careers</span> <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </li>

          </ul>
        </nav>

        {/* Theme Toggle & CTA Button */}
        <div className="hidden min-[992px]:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border-light text-text-dark bg-bg-card hover:bg-bg-card-hover hover:text-accent hover:border-accent/40 shadow-subtle transition-all duration-150 ease-out cursor-pointer outline-none"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <Link to="/contact">
            <Button variant="primary" icon={<ArrowRight size={16} />}>
              Request Review
            </Button>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex min-[992px]:hidden items-center gap-3.5">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border-light text-text-dark bg-bg-card hover:text-accent shadow-subtle transition-all duration-150 ease-out cursor-pointer outline-none"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            className="bg-transparent border-none text-text-dark cursor-pointer outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Accordions */}
      <div className={`fixed left-0 w-full bg-bg-light z-[999] p-[30px_24px] overflow-y-auto border-t border-border-light transition-all duration-300 ease-out ${scrolled ? 'top-[75px] h-[calc(100vh-75px)]' : 'top-[90px] h-[calc(100vh-90px)]'} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className="list-none flex flex-col gap-4">
          
          {/* Mobile Accordion 1: Products */}
          <li className="flex flex-col border-b border-border-light">
            <button className="flex justify-between items-center w-full py-4 bg-transparent border-none font-heading text-[1.25rem] font-bold text-text-dark cursor-pointer text-left outline-none" onClick={() => toggleMobileAccordion('products')}>
              <span>Products</span>
              <ChevronDown size={18} className={`transition-transform duration-200 ease-out ${activeMobileAccordion === 'products' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-[max-height] duration-350 ease-out ${activeMobileAccordion === 'products' ? 'max-h-[250px]' : 'max-h-0'}`}>
              <ul className="list-none flex flex-col gap-3 p-[4px_12px_20px_12px]">
                <li><Link to="/products#pos" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>ONFIX POS Core</Link></li>
                <li><Link to="/products#erp" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Custom Enterprise ERP</Link></li>
                <li><Link to="/products#db-core" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Onfix DB Core</Link></li>
                <li><Link to="/products#api-hub" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Integrations & API Hub</Link></li>
              </ul>
            </div>
          </li>

          {/* Mobile Accordion 2: Philosophy & Infra */}
          <li className="flex flex-col border-b border-border-light">
            <button className="flex justify-between items-center w-full py-4 bg-transparent border-none font-heading text-[1.25rem] font-bold text-text-dark cursor-pointer text-left outline-none" onClick={() => toggleMobileAccordion('philosophy')}>
              <span>Philosophy & Infra</span>
              <ChevronDown size={18} className={`transition-transform duration-200 ease-out ${activeMobileAccordion === 'philosophy' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-[max-height] duration-350 ease-out ${activeMobileAccordion === 'philosophy' ? 'max-h-[250px]' : 'max-h-0'}`}>
              <ul className="list-none flex flex-col gap-3 p-[4px_12px_20px_12px]">
                <li><Link to="/philosophy" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Core Systems DNA</Link></li>
                <li><Link to="/philosophy" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Anycast Global Nodes</Link></li>
                <li><Link to="/philosophy" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Security Certifications</Link></li>
              </ul>
            </div>
          </li>

          {/* Mobile Accordion 3: Insights */}
          <li className="flex flex-col border-b border-border-light">
            <button className="flex justify-between items-center w-full py-4 bg-transparent border-none font-heading text-[1.25rem] font-bold text-text-dark cursor-pointer text-left outline-none" onClick={() => toggleMobileAccordion('insights')}>
              <span>Insights</span>
              <ChevronDown size={18} className={`transition-transform duration-200 ease-out ${activeMobileAccordion === 'insights' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-[max-height] duration-350 ease-out ${activeMobileAccordion === 'insights' ? 'max-h-[250px]' : 'max-h-0'}`}>
              <ul className="list-none flex flex-col gap-3 p-[4px_12px_20px_12px]">
                <li><Link to="/insights" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Featured Core Reports</Link></li>
                <li><Link to="/insights" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Recent Bulletins</Link></li>
                <li><Link to="/insights" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Engine Patch Logs</Link></li>
              </ul>
            </div>
          </li>

          {/* Mobile Accordion 4: Company & Support */}
          <li className="flex flex-col border-b border-border-light">
            <button className="flex justify-between items-center w-full py-4 bg-transparent border-none font-heading text-[1.25rem] font-bold text-text-dark cursor-pointer text-left outline-none" onClick={() => toggleMobileAccordion('company')}>
              <span>Company & Support</span>
              <ChevronDown size={18} className={`transition-transform duration-200 ease-out ${activeMobileAccordion === 'company' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-[max-height] duration-350 ease-out ${activeMobileAccordion === 'company' ? 'max-h-[250px]' : 'max-h-0'}`}>
              <ul className="list-none flex flex-col gap-3 p-[4px_12px_20px_12px]">
                <li><Link to="/contact" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Request Systems Audit</Link></li>
                <li><Link to="/products#api-hub" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Sandbox API keys</Link></li>
                <li><Link to="/philosophy" className="text-[0.95rem] font-semibold text-text-muted-dark block hover:text-accent" onClick={closeMenu}>Careers</Link></li>
              </ul>
            </div>
          </li>

          <li className="mt-6 list-none">
            <Link to="/contact" onClick={closeMenu}>
              <Button variant="accent" className="w-full p-4">
                Request Architecture Review
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
