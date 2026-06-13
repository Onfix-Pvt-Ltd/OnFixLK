import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ArrowRight, ChevronDown, 
  ShoppingBag, Cpu, Database, Share2, 
  Server, Shield, Activity, FileText, 
  Zap, HelpCircle, PhoneCall, Code
} from 'lucide-react';
import { Button } from '../common/Button';
import logoImg from '../../assets/logos/onfix-smooth-square-logo.png';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileAccordion, setActiveMobileAccordion] = useState<string | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

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
      // Clean up any pending close timer on unmount
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
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
    // Cancel any pending close timer — keeps the menu open when moving between items
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    // Delay the close so diagonal mouse movement to a corner item doesn't close the panel
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimerRef.current = null;
    }, 150);
  };

  const toggleMobileAccordion = (accordionName: string) => {
    setActiveMobileAccordion(prev => prev === accordionName ? null : accordionName);
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <img src={logoImg} alt="Onfix Pvt Ltd Logo" className="navbar-logo-img" />
          <span className="navbar-brand-name">ONFIX</span>
        </Link>

        {/* Desktop Navigation with Mega Menus */}
        <nav className="navbar-desktop-nav">
          <ul className="navbar-nav-links">
            
            {/* Products Mega Menu Link */}
            <li 
              className="navbar-nav-item"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/products" className={`navbar-nav-link ${location.pathname === '/products' ? 'active-route' : ''}`}>
                <span>Products</span> <ChevronDown size={14} className={`chevron-icon ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </Link>
              
              {activeDropdown === 'products' && (
                <div className="mega-menu-dropdown animate-slide-down">
                  <div className="mega-menu-container">
                    <div className="mega-menu-grid">
                      
                      <div className="mega-menu-col">
                        <span className="col-header">ERP Solutions</span>
                        <Link to="/products#pos" className="mega-link-item">
                          <ShoppingBag size={16} className="orange-text" />
                          <div>
                            <span className="link-title">ONFIX POS Core</span>
                            <span className="link-desc">Real-time hospitality point-of-sale database.</span>
                          </div>
                        </Link>
                        <Link to="/products#erp" className="mega-link-item">
                          <Cpu size={16} className="orange-text" />
                          <div>
                            <span className="link-title">Custom ERP Systems</span>
                            <span className="link-desc">FIFO recipe stock & procurement ledgers.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="mega-menu-col">
                        <span className="col-header">Infrastructure</span>
                        <Link to="/products#db-core" className="mega-link-item">
                          <Database size={16} className="orange-text" />
                          <div>
                            <span className="link-title">Onfix DB Core</span>
                            <span className="link-desc">Ultra-low latency, zero-lock transactions database.</span>
                          </div>
                        </Link>
                        <Link to="/products#api-hub" className="mega-link-item">
                          <Share2 size={16} className="orange-text" />
                          <div>
                            <span className="link-title">Integrations & API Hub</span>
                            <span className="link-desc">REST & GraphQL secure gateways.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="mega-menu-col">
                        <span className="col-header">Integrations</span>
                        <a href="/products#api-hub" className="mega-link-item plain-link">
                          <Zap size={14} /> <span>Merchant payment gateways</span>
                        </a>
                        <a href="/products#api-hub" className="mega-link-item plain-link">
                          <Zap size={14} /> <span>Xero & ERP corporate ledgers</span>
                        </a>
                        <a href="/products#api-hub" className="mega-link-item plain-link">
                          <Zap size={14} /> <span>Tableside QR checkout gateways</span>
                        </a>
                      </div>

                      <div className="mega-menu-col mega-menu-featured-col">
                        <div className="featured-menu-card">
                          <span className="featured-tag">NEW RELEASE</span>
                          <h4>Onfix DB Core v4.2</h4>
                          <p>Lock-free serializing transaction engine achieves 0.8ms average latency in high-density builds.</p>
                          <Link to="/insights" className="featured-card-link">
                            <span>Read Release Notes</span> <ArrowRight size={12} />
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
              className="navbar-nav-item"
              onMouseEnter={() => handleMouseEnter('philosophy')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/philosophy" className={`navbar-nav-link ${location.pathname === '/philosophy' ? 'active-route' : ''}`}>
                <span>Philosophy & Infra</span> <ChevronDown size={14} className={`chevron-icon ${activeDropdown === 'philosophy' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'philosophy' && (
                <div className="mega-menu-dropdown animate-slide-down">
                  <div className="mega-menu-container">
                    <div className="mega-menu-grid">

                      <div className="mega-menu-col">
                        <span className="col-header">Platform DNA</span>
                        <Link to="/philosophy" className="mega-link-item">
                          <Cpu size={16} className="orange-text" />
                          <div>
                            <span className="link-title">Sovereign Software</span>
                            <span className="link-desc">Why we write our own database files and sockets.</span>
                          </div>
                        </Link>
                        <Link to="/philosophy" className="mega-link-item">
                          <Activity size={16} className="orange-text" />
                          <div>
                            <span className="link-title">Latency Obsession</span>
                            <span className="link-desc">Sub-15ms client terminal routing parameters.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="mega-menu-col">
                        <span className="col-header">Clusters & Edge</span>
                        <Link to="/philosophy" className="mega-link-item">
                          <Server size={16} className="orange-text" />
                          <div>
                            <span className="link-title">Colombo Edge Node</span>
                            <span className="link-desc">lk-colombo-edge-01 hardware array log.</span>
                          </div>
                        </Link>
                        <Link to="/philosophy" className="mega-link-item">
                          <Server size={16} className="orange-text" />
                          <div>
                            <span className="link-title">Singapore Failover Grid</span>
                            <span className="link-desc">BGP path routing redundant failover targeting.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="mega-menu-col">
                        <span className="col-header">Certifications</span>
                        <a href="/philosophy" className="mega-link-item plain-link">
                          <Shield size={14} /> <span>SOC 2 Type II Certified</span>
                        </a>
                        <a href="/philosophy" className="mega-link-item plain-link">
                          <Shield size={14} /> <span>PCI-DSS Level 1 Compliance</span>
                        </a>
                        <a href="/philosophy" className="mega-link-item plain-link">
                          <Shield size={14} /> <span>AES-256 GCM Transit Cipher</span>
                        </a>
                      </div>

                      <div className="mega-menu-col mega-menu-featured-col">
                        <div className="featured-menu-card node-status-card">
                          <div className="live-status-header">
                            <span className="live-ping-dot"></span>
                            <span className="status-title">All Edge Nodes Online</span>
                          </div>
                          <div className="status-metric">
                            <span className="metric-num">14 ms</span>
                            <span className="metric-lbl">Avg Response Time</span>
                          </div>
                          <Link to="/philosophy" className="featured-card-link text-center-link">
                            <span>Execute Edge Latency Check</span> <ArrowRight size={12} />
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
              className="navbar-nav-item"
              onMouseEnter={() => handleMouseEnter('insights')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/insights" className={`navbar-nav-link ${location.pathname === '/insights' ? 'active-route' : ''}`}>
                <span>Insights</span> <ChevronDown size={14} className={`chevron-icon ${activeDropdown === 'insights' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'insights' && (
                <div className="mega-menu-dropdown animate-slide-down">
                  <div className="mega-menu-container">
                    <div className="mega-menu-grid">

                      <div className="mega-menu-col">
                        <span className="col-header">Case Studies</span>
                        <Link to="/insights" className="mega-link-item">
                          <FileText size={16} className="orange-text" />
                          <div>
                            <span className="link-title">Nobu Hospitality POS</span>
                            <span className="link-desc">QR Ordering rollouts across 12 hotels.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="mega-menu-col">
                        <span className="col-header">Engineering Research</span>
                        <Link to="/insights" className="mega-link-item">
                          <Database size={16} className="orange-text" />
                          <div>
                            <span className="link-title">FIFO Lockless DBs</span>
                            <span className="link-desc">Eliminating thread deadlock hazards under load.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="mega-menu-col">
                        <span className="col-header">Ecosystem Bulletins</span>
                        <a href="/insights" className="mega-link-item plain-link">
                          <Zap size={14} /> <span>v4.2.1 patch notes</span>
                        </a>
                        <a href="/insights" className="mega-link-item plain-link">
                          <Zap size={14} /> <span>Southeast Asia Node deployment</span>
                        </a>
                      </div>

                      <div className="mega-menu-col mega-menu-featured-col">
                        <div className="featured-menu-card bulletin-card">
                          <span className="featured-tag">RECENT POST</span>
                          <h4>Nobu Hotels reducedtableside latency by 80%</h4>
                          <p>Learn how our anycast edge arrays synchronized transactions during dinner service.</p>
                          <Link to="/insights" className="featured-card-link">
                            <span>Read Case Study</span> <ArrowRight size={12} />
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
              className="navbar-nav-item"
              onMouseEnter={() => handleMouseEnter('company')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/contact" className={`navbar-nav-link ${location.pathname === '/contact' ? 'active-route' : ''}`}>
                <span>Company & Support</span> <ChevronDown size={14} className={`chevron-icon ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'company' && (
                <div className="mega-menu-dropdown animate-slide-down">
                  <div className="mega-menu-container">
                    <div className="mega-menu-grid">

                      <div className="mega-menu-col">
                        <span className="col-header">Audit & Consultations</span>
                        <Link to="/contact" className="mega-link-item">
                          <PhoneCall size={16} className="orange-text" />
                          <div>
                            <span className="link-title">Request Systems Audit</span>
                            <span className="link-desc">Free code and network telemetry review.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="mega-menu-col">
                        <span className="col-header">Developers</span>
                        <Link to="/products#api-hub" className="mega-link-item">
                          <Code size={16} className="orange-text" />
                          <div>
                            <span className="link-title">Sandbox APIs</span>
                            <span className="link-desc">Test payload responses in local terminals.</span>
                          </div>
                        </Link>
                      </div>

                      <div className="mega-menu-col">
                        <span className="col-header">Service SLAs</span>
                        <a href="/philosophy" className="mega-link-item plain-link">
                          <HelpCircle size={14} /> <span>99.999% uptime guarantees</span>
                        </a>
                        <a href="/contact" className="mega-link-item plain-link">
                          <HelpCircle size={14} /> <span>24/7 engineering response SLAs</span>
                        </a>
                      </div>

                      <div className="mega-menu-col mega-menu-featured-col">
                        <div className="featured-menu-card company-card">
                          <h4>We are hiring!</h4>
                          <p>Join our core systems engineering group in Colombo and Singapore building next-generation DBs.</p>
                          <Link to="/philosophy" className="featured-card-link">
                            <span>Explore Careers</span> <ArrowRight size={12} />
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

        {/* CTA Button */}
        <div className="navbar-cta-desktop">
          <Link to="/contact">
            <Button variant="primary" icon={<ArrowRight size={16} />}>
              Request Review
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu with Accordions */}
      <div className={`navbar-mobile-menu ${isOpen ? 'mobile-menu-open' : ''}`}>
        <ul className="navbar-mobile-links">
          
          {/* Mobile Accordion 1: Products */}
          <li className="navbar-mobile-item">
            <button className="mobile-accordion-header" onClick={() => toggleMobileAccordion('products')}>
              <span>Products</span>
              <ChevronDown size={18} className={`chevron-icon ${activeMobileAccordion === 'products' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mobile-accordion-body ${activeMobileAccordion === 'products' ? 'accordion-open' : ''}`}>
              <ul className="mobile-accordion-links">
                <li><Link to="/products#pos" onClick={closeMenu}>ONFIX POS Core</Link></li>
                <li><Link to="/products#erp" onClick={closeMenu}>Custom Enterprise ERP</Link></li>
                <li><Link to="/products#db-core" onClick={closeMenu}>Onfix DB Core</Link></li>
                <li><Link to="/products#api-hub" onClick={closeMenu}>Integrations & API Hub</Link></li>
              </ul>
            </div>
          </li>

          {/* Mobile Accordion 2: Philosophy & Infra */}
          <li className="navbar-mobile-item">
            <button className="mobile-accordion-header" onClick={() => toggleMobileAccordion('philosophy')}>
              <span>Philosophy & Infra</span>
              <ChevronDown size={18} className={`chevron-icon ${activeMobileAccordion === 'philosophy' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mobile-accordion-body ${activeMobileAccordion === 'philosophy' ? 'accordion-open' : ''}`}>
              <ul className="mobile-accordion-links">
                <li><Link to="/philosophy" onClick={closeMenu}>Core Systems DNA</Link></li>
                <li><Link to="/philosophy" onClick={closeMenu}>Anycast Global Nodes</Link></li>
                <li><Link to="/philosophy" onClick={closeMenu}>Security Certifications</Link></li>
              </ul>
            </div>
          </li>

          {/* Mobile Accordion 3: Insights */}
          <li className="navbar-mobile-item">
            <button className="mobile-accordion-header" onClick={() => toggleMobileAccordion('insights')}>
              <span>Insights</span>
              <ChevronDown size={18} className={`chevron-icon ${activeMobileAccordion === 'insights' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mobile-accordion-body ${activeMobileAccordion === 'insights' ? 'accordion-open' : ''}`}>
              <ul className="mobile-accordion-links">
                <li><Link to="/insights" onClick={closeMenu}>Featured Core Reports</Link></li>
                <li><Link to="/insights" onClick={closeMenu}>Recent Bulletins</Link></li>
                <li><Link to="/insights" onClick={closeMenu}>Engine Patch Logs</Link></li>
              </ul>
            </div>
          </li>

          {/* Mobile Accordion 4: Company & Support */}
          <li className="navbar-mobile-item">
            <button className="mobile-accordion-header" onClick={() => toggleMobileAccordion('company')}>
              <span>Company & Support</span>
              <ChevronDown size={18} className={`chevron-icon ${activeMobileAccordion === 'company' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mobile-accordion-body ${activeMobileAccordion === 'company' ? 'accordion-open' : ''}`}>
              <ul className="mobile-accordion-links">
                <li><Link to="/contact" onClick={closeMenu}>Request Systems Audit</Link></li>
                <li><Link to="/products#api-hub" onClick={closeMenu}>Sandbox API keys</Link></li>
                <li><Link to="/philosophy" onClick={closeMenu}>Careers</Link></li>
              </ul>
            </div>
          </li>

          <li className="navbar-mobile-item-cta">
            <Link to="/contact" onClick={closeMenu}>
              <Button variant="accent" className="navbar-mobile-cta-btn">
                Request Architecture Review
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
