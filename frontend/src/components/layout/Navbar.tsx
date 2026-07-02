import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { Button } from '../common/Button';
import { useDarkMode } from '../../hooks/useDarkMode';
import logoImg from '../../assets/logos/onfix-smooth-square-logo.png';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`absolute top-0 left-0 w-full h-[90px] z-[1000] flex items-center transition-all duration-300 ease-out border-b border-transparent ${scrolled ? 'fixed h-[75px] bg-bg-light/92 backdrop-blur-[12px] border-b border-border-light/40 shadow-subtle' : ''}`}>
      <div className="container flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
          <img src={logoImg} alt="Onfix Pvt Ltd Logo" className="h-10 w-auto rounded-small transition-all duration-300 ease-out group-hover:scale-108 group-hover:rotate-5" />
          <span className="font-heading font-extrabold text-[1.3rem] tracking-[2px] text-text-dark">ONFIX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden min-[992px]:block">
          <ul className="flex list-none gap-9">
            <li>
              <Link to="/services" className={`text-[0.95rem] font-semibold transition-all duration-150 ease-out hover:opacity-100 hover:text-accent ${scrolled ? 'py-6' : 'py-[30px]'} ${location.pathname === '/services' ? 'opacity-100 text-accent' : 'text-text-dark opacity-80'}`}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/products" className={`text-[0.95rem] font-semibold transition-all duration-150 ease-out hover:opacity-100 hover:text-accent ${scrolled ? 'py-6' : 'py-[30px]'} ${location.pathname === '/products' ? 'opacity-100 text-accent' : 'text-text-dark opacity-80'}`}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className={`text-[0.95rem] font-semibold transition-all duration-150 ease-out hover:opacity-100 hover:text-accent ${scrolled ? 'py-6' : 'py-[30px]'} ${location.pathname === '/about' ? 'opacity-100 text-accent' : 'text-text-dark opacity-80'}`}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/news" className={`text-[0.95rem] font-semibold transition-all duration-150 ease-out hover:opacity-100 hover:text-accent ${scrolled ? 'py-6' : 'py-[30px]'} ${location.pathname === '/news' ? 'opacity-100 text-accent' : 'text-text-dark opacity-80'}`}>
                News
              </Link>
            </li>
            <li>
              <Link to="/careers" className={`text-[0.95rem] font-semibold transition-all duration-150 ease-out hover:opacity-100 hover:text-accent ${scrolled ? 'py-6' : 'py-[30px]'} ${location.pathname === '/careers' ? 'opacity-100 text-accent' : 'text-text-dark opacity-80'}`}>
                Careers
              </Link>
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

      {/* Mobile Drawer Menu */}
      <div className={`fixed left-0 w-full bg-bg-light z-[999] p-[30px_24px] overflow-y-auto border-t border-border-light transition-all duration-300 ease-out ${scrolled ? 'top-[75px] h-[calc(100vh-75px)]' : 'top-[90px] h-[calc(100vh-90px)]'} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className="list-none flex flex-col gap-4">
          <li className="flex flex-col border-b border-border-light">
            <Link to="/services" className="py-4 font-heading text-[1.25rem] font-bold text-text-dark block hover:text-accent" onClick={closeMenu}>
              Services
            </Link>
          </li>
          <li className="flex flex-col border-b border-border-light">
            <Link to="/products" className="py-4 font-heading text-[1.25rem] font-bold text-text-dark block hover:text-accent" onClick={closeMenu}>
              Products
            </Link>
          </li>
          <li className="flex flex-col border-b border-border-light">
            <Link to="/about" className="py-4 font-heading text-[1.25rem] font-bold text-text-dark block hover:text-accent" onClick={closeMenu}>
              About Us
            </Link>
          </li>
          <li className="flex flex-col border-b border-border-light">
            <Link to="/news" className="py-4 font-heading text-[1.25rem] font-bold text-text-dark block hover:text-accent" onClick={closeMenu}>
              News
            </Link>
          </li>
          <li className="flex flex-col border-b border-border-light">
            <Link to="/careers" className="py-4 font-heading text-[1.25rem] font-bold text-text-dark block hover:text-accent" onClick={closeMenu}>
              Careers
            </Link>
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
