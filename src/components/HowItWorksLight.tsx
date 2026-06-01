import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CloudDownload, Zap, TrendingUp } from 'lucide-react';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
    {
        num: '01',
        icon: CloudDownload,
        title: 'Adopt',
        desc: 'Connect your ERP, POS, or spreadsheet data. AigentG9 ingests it all — no migration, no rip-and-replace.',
    },
    {
        num: '02',
        icon: Zap,
        title: 'Automate',
        desc: '9 specialized agents begin analyzing, forecasting, and recommending actions autonomously — 24/7.',
    },
    {
        num: '03',
        icon: TrendingUp,
        title: 'Evolve',
        desc: 'Agents learn from every decision cycle, continuously sharpening forecasts and expanding coverage.',
    },
];

const connectorLabels = ['72hrs setup', 'Real-time'];

export default function HowItWorksLight() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            ref={ref}
            id="how-it-works"
            className="relative hex-bg"
            style={{
                background: '#F5F2ED',
                padding: '96px 64px',
            }}
        >
            <div className="relative z-10 max-w-[1200px] mx-auto">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease }}
                    style={{ marginBottom: '24px' }}
                >
                    <span className="eyebrow">How It Works</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                    style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        color: '#0D1B2A',
                        lineHeight: 1.15,
                        margin: '0 0 clamp(48px, 6vw, 72px)',
                        maxWidth: '550px',
                    }}
                >
                    Three steps to{' '}
                    <em style={{ color: '#C9952A', fontStyle: 'italic' }}>
                        autonomous intelligence.
                    </em>
                </motion.h2>

                {/* Steps grid with connectors */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 relative">
                    {steps.map((step, i) => (
                        <div key={step.num} className="relative flex flex-col items-center lg:items-stretch">
                            {/* Connector line + label (between cards, desktop only) */}
                            {i < 2 && (
                                <div className="hidden lg:block absolute top-[56px] right-0 z-20"
                                    style={{ width: '100%', left: '100%', transform: 'translateX(-50%)' }}>
                                    {/* SVG dashed line */}
                                    <svg width="100%" height="24" viewBox="0 0 200 24" fill="none"
                                        style={{ overflow: 'visible' }}>
                                        <line
                                            x1="20" y1="12" x2="170" y2="12"
                                            stroke="#C9952A"
                                            strokeWidth="1"
                                            strokeDasharray="6 4"
                                            style={{
                                                strokeDashoffset: inView ? 0 : 100,
                                                transition: `stroke-dashoffset 2s linear ${0.8 + i * 0.5}s`,
                                            }}
                                        />
                                        {/* Arrow head */}
                                        <polygon points="170,6 184,12 170,18" fill="#C9952A" opacity={0.6} />
                                    </svg>
                                    {/* Floating micro-label */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2"
                                        style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: '10px',
                                            color: '#C9952A',
                                            whiteSpace: 'nowrap',
                                        }}>
                                        {connectorLabels[i]}
                                    </div>
                                </div>
                            )}

                            {/* Step card */}
                            <motion.div
                                initial={{ opacity: 0, y: 32 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease }}
                                className="relative card-lift group w-full"
                                style={{
                                    background: '#FFFFFF',
                                    border: '0.5px solid #E8E2D9',
                                    borderRadius: '16px',
                                    padding: '32px 28px',
                                    cursor: 'default',
                                }}
                            >
                                {/* Ghost number */}
                                <span
                                    className="absolute top-4 right-6 transition-opacity duration-300 group-hover:opacity-30"
                                    style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        fontSize: '72px',
                                        color: 'rgba(201,149,42,0.10)',
                                        lineHeight: 1,
                                        userSelect: 'none',
                                    }}
                                >
                                    {step.num}
                                </span>

                                {/* Hex icon */}
                                <div
                                    className="hex-clip flex items-center justify-center"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        background: '#C9952A',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <step.icon size={22} color="#FFFFFF" />
                                </div>

                                {/* Title */}
                                <h3
                                    style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        fontSize: '22px',
                                        color: '#0D1B2A',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p style={{
                                    fontSize: '13px',
                                    color: '#6B7280',
                                    lineHeight: 1.7,
                                    margin: 0,
                                }}>
                                    {step.desc}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section divider */}
            <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0 }} />
        </section>
    );
}
