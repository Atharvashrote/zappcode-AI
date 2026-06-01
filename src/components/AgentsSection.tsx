import { useEffect, useRef, useState } from 'react';

/* ── Agent data ── */
const agents = [
  {
    name: 'Forecast Agent',
    description: 'Predicts future demand shifts',
    tag: 'Forecasting',
  },
  {
    name: 'Deviation Agent',
    description: 'Detects anomalies in real-time',
    tag: 'Risk',
  },
  {
    name: 'Market Signal Agent',
    description: 'Reads external market signals',
    tag: 'Market',
  },
  {
    name: 'Competitor Agent',
    description: 'Monitors competitive landscape',
    tag: 'Intelligence',
  },
  {
    name: 'Pricing Agent',
    description: 'Optimizes dynamic pricing',
    tag: 'Pricing',
  },
  {
    name: 'Promotion Agent',
    description: 'Evaluates promotional impact',
    tag: 'Growth',
  },
  {
    name: 'Scenario Agent',
    description: 'Simulates business scenarios',
    tag: 'Simulation',
  },
  {
    name: 'Executive Insight Agent',
    description: 'Surfaces C-suite decisions',
    tag: 'Strategy',
  },
  {
    name: 'ERP Action Agent',
    description: 'Triggers automated ERP actions',
    tag: 'Automation',
  },
];

/* ── Scroll-reveal hook ── */
function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

/* ── Pulse dot ── */
function PulseDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{
          background: '#06B6D4',
          animation: 'agent-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
      <span
        className="relative inline-flex rounded-full h-2.5 w-2.5"
        style={{ background: '#06B6D4' }}
      />
    </span>
  );
}

/* ── Agent card ── */
function AgentCard({
  agent,
  index,
  featured,
  visible,
}: {
  agent: (typeof agents)[number];
  index: number;
  featured: boolean;
  visible: boolean;
}) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      className={`group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out ${
        featured ? 'col-span-1 md:col-span-2' : ''
      }`}
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        minHeight: featured ? '260px' : '220px',
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0) scale(1)'
          : 'translateY(40px) scale(0.97)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Hover glow border overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(236,72,153,0.15))',
          border: '1px solid transparent',
          borderImage:
            'linear-gradient(135deg, #06B6D4, #EC4899) 1',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Hover scale */}
      <style>{`
        .group:hover {
          transform: scale(1.02) !important;
          border-color: rgba(124, 58, 237, 0.3) !important;
        }
      `}</style>

      {/* Top row: number + pulse */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="font-black tracking-tight"
          style={{
            fontSize: featured ? '48px' : '36px',
            lineHeight: 1,
            background: 'linear-gradient(to right, #06B6D4, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {num}
        </span>
        <PulseDot />
      </div>

      {/* Agent name */}
      <h3
        className="font-bold text-white uppercase tracking-wide leading-tight mb-2"
        style={{ fontSize: featured ? '22px' : '17px' }}
      >
        {agent.name}
      </h3>

      {/* Description */}
      <p
        className="leading-relaxed flex-1 mb-4"
        style={{ color: '#999999', fontSize: '14px' }}
      >
        {agent.description}
      </p>

      {/* Tag */}
      <div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{
            background: 'rgba(124, 58, 237, 0.12)',
            color: '#A78BFA',
            border: '1px solid rgba(124, 58, 237, 0.25)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#7C3AED' }}
          />
          {agent.tag}
        </span>
      </div>

      {/* Subtle corner glow */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

/* ── Main section ── */
export default function AgentsSection() {
  const { ref, visible } = useRevealOnScroll();

  return (
    <section
      id="agents"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes agent-pulse {
          0%, 100% { transform: scale(1); opacity: 0.75; }
          50% { transform: scale(2); opacity: 0; }
        }
        @keyframes agent-grid-line {
          0% { opacity: 0; }
          50% { opacity: 0.06; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '-200px',
            left: '50%',
            transform: 'translateX(-50%)',
            background:
              'radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            bottom: '-100px',
            right: '-100px',
            background:
              'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 lg:pb-36">
        {/* Massive header */}
        <div className="mb-16 sm:mb-20 lg:mb-28">
          <h2
            className="uppercase font-black tracking-[-0.04em] leading-[0.9] text-white"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 9rem)',
            }}
          >
            <span className="block">9 AI Agent</span>
            <span
              className="block"
              style={{
                background:
                  'linear-gradient(to right, #06B6D4, #EC4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Demand
            </span>
            <span className="block">Intelligence</span>
          </h2>

          {/* Subtitle */}
          <p
            className="mt-6 sm:mt-8 max-w-lg leading-relaxed"
            style={{ color: '#999999', fontSize: 'clamp(16px, 1.8vw, 20px)' }}
          >
            An intelligence team — not just one tool.
          </p>

          {/* Gradient accent line */}
          <div
            className="mt-6 h-px w-24 sm:w-32"
            style={{
              background: 'linear-gradient(to right, #06B6D4, #EC4899)',
            }}
          />
        </div>

        {/* Agent cards bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {agents.map((agent, i) => (
            <AgentCard
              key={agent.name}
              agent={agent}
              index={i}
              featured={i === 0}
              visible={visible}
            />
          ))}
        </div>

        {/* Bottom stats bar */}
        <div
          className="mt-14 sm:mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-14 py-6 rounded-2xl"
          style={{
            background: 'rgba(17,17,17,0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(8px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.9s',
          }}
        >
          {[
            { value: '9', label: 'AI Agents' },
            { value: '24/7', label: 'Monitoring' },
            { value: 'Real-time', label: 'Intelligence' },
            { value: 'G9', label: 'Certified Stack' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center px-2">
              <p
                className="font-black text-xl sm:text-2xl"
                style={{
                  background:
                    'linear-gradient(to right, #06B6D4, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {value}
              </p>
              <p
                className="text-xs sm:text-sm uppercase tracking-widest mt-1"
                style={{ color: '#666666' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
