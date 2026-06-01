import { useState, useEffect } from 'react';
import { Menu, X, Clock, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(istTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = ['Platform', 'Agents', 'Insights', 'Contact'];

  return (
    <>
      <nav className="relative z-20 w-full px-5 sm:px-8 lg:px-12 pt-4 sm:pt-5">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-white rounded-full px-2 py-[5px] flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
            {/* Left side */}
            <div className="flex items-center gap-2 sm:gap-6">
              {/* Logo */}
              <div className="flex-shrink-0 pl-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#1D4ED8] rounded-full flex items-center justify-center">
                  <span
                    className="text-white font-bold tracking-tight"
                    style={{ fontSize: '10px', lineHeight: '11px' }}
                  >
                    AG
                  </span>
                </div>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-900 hover:text-gray-500 transition-colors duration-300 whitespace-nowrap"
                    style={{ fontSize: '14px' }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Right side — desktop */}
            <div className="hidden md:flex items-center gap-4 pr-1">
              <span
                className="hidden lg:inline text-gray-600 whitespace-nowrap"
                style={{ fontSize: '13px' }}
              >
                Demand Intelligence for Q1 2026
              </span>

              <div
                className="flex items-center gap-1.5 text-gray-600 whitespace-nowrap"
                style={{ fontSize: '13px' }}
              >
                <Clock size={14} className="flex-shrink-0" />
                <span>{time} IST</span>
              </div>

              {/* CTA Button */}
              <a
                href="#book"
                className="group bg-[#1D4ED8] text-white font-medium rounded-full pl-5 pr-2 py-2 flex items-center gap-2 transition-colors duration-300 hover:bg-[#1e40af] whitespace-nowrap flex-shrink-0"
                style={{ fontSize: '13px' }}
              >
                <div className="text-roll">
                  <span>Book a strategy call</span>
                  <span>Book a strategy call</span>
                </div>
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                  <ArrowRight size={13} className="text-[#1D4ED8]" />
                </span>
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden bg-[#1D4ED8] rounded-full p-2.5 flex items-center justify-center text-white flex-shrink-0"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute bottom-0 left-0 right-0 mx-3 mb-3 bg-white rounded-2xl p-6"
            style={{
              animation: 'slideUp 500ms cubic-bezier(0.32,0.72,0,1) forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-1.5 text-gray-600 mb-8"
              style={{ fontSize: '13px' }}
            >
              <Clock size={14} className="flex-shrink-0" />
              <span>{time} IST</span>
            </div>
            <div className="flex flex-col gap-5 mb-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-900 font-medium transition-colors duration-300"
                  style={{ fontSize: '28px', lineHeight: '32px' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
            <a
              href="#book"
              className="group bg-[#1D4ED8] text-white font-medium rounded-full pl-5 pr-2 py-3 flex items-center gap-2 w-full justify-center transition-colors duration-300 hover:bg-[#1e40af]"
              style={{ fontSize: '14px' }}
              onClick={() => setMobileOpen(false)}
            >
              <span>Start a project</span>
              <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                <ArrowRight size={14} className="text-[#1D4ED8]" />
              </span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
