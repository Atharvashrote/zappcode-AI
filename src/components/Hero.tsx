import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ShaderBackground';

/* ===== Starburst SVG ===== */
function StarburstIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-[#F0F4FF]">
      {/* Shader Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <ShaderBackground />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Content — bottom anchored */}
      <div className="flex-1" />
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
        {/* Label */}
        <p
          className="text-gray-900 tracking-wide mb-5 sm:mb-8"
          style={{ fontSize: 'clamp(13px, 1.5vw, 14px)' }}
        >
          AigentG9 Platform
        </p>

        {/* Headline */}
        <h1
          className="font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] max-w-5xl"
          style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}
        >
          <span className="sm:hidden">
            Intelligent AI Agents for Strategic Demand Decisions at Scale.
          </span>
          <span
            className="hidden sm:block"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}
          >
            Intelligent AI Agents
            <br />
            for Strategic Demand
            <br />
            Decisions at Scale.
          </span>
        </h1>

        {/* CTA Row */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
          {/* Blue CTA Button */}
          <a
            href="#agents"
            className="group bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 inline-flex items-center gap-2 transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex-shrink-0"
            style={{ fontSize: 'clamp(13px, 1.5vw, 14px)' }}
          >
            <div className="text-roll">
              <span>Explore Agents</span>
              <span>Explore Agents</span>
            </div>
            <span className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
              <ArrowRight size={15} className="text-[#1D4ED8]" />
            </span>
          </a>

          {/* Partner Badge */}
          <div className="bg-white rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300 px-3 py-2 inline-flex items-center gap-2.5 flex-shrink-0">
            <StarburstIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D4ED8] flex-shrink-0" />
            <span
              className="text-gray-900 font-medium whitespace-nowrap"
              style={{ fontSize: 'clamp(13px, 1.5vw, 14px)' }}
            >
              Generation-9 AI
            </span>
            <span
              className="bg-gray-900 text-white font-semibold px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap"
              style={{ fontSize: 'clamp(10px, 1vw, 11px)' }}
            >
              G9
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
