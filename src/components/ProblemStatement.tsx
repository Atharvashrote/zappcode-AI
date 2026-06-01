import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Count-up hook ── */
function useCountUp(target: number, active: boolean, suffix = '', prefix = '') {
    const [display, setDisplay] = useState(prefix + '0' + suffix);
    useEffect(() => {
        if (!active) return;
        let start: number | null = null;
        let raf: number;
        const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / 2000, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = target * eased;
            const formatted = target % 1 !== 0 ? val.toFixed(1) : String(Math.round(val));
            setDisplay(prefix + formatted + suffix);
            if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [active, target, suffix, prefix]);
    return display;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stats = [
    { value: 73, suffix: '%', label: 'Forecast Error Rate', sub: 'Average across legacy planning tools' },
    { value: 2.3, suffix: 'Cr', prefix: '₹', label: 'Annual Waste per SKU', sub: 'From poor demand visibility alone' },
    { value: 4.7, suffix: ' days', label: 'Avg. Reaction Time', sub: 'To detect and respond to demand shifts' },
    { value: 62, suffix: '%', label: 'Missed Market Signals', sub: 'External data never reaches planners' },
];

export default function ProblemStatement() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            ref={ref}
            id="problem"
            className="relative overflow-hidden noise-overlay"
            style={{
                background: '#0D1B2A',
                padding: '96px 64px',
            }}
        >
            {/* Scanline */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: '50%',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(201,149,42,0.4), transparent)',
                    animation: 'scanline 3s ease-in-out infinite',
                }}
            />

            <div className="relative z-10 max-w-[1200px] mx-auto">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease }}
                    style={{ marginBottom: '24px' }}
                >
                    <span className="eyebrow eyebrow-light">The Problem</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                    style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        color: '#F5F0E8',
                        lineHeight: 1.15,
                        margin: '0 0 16px',
                        maxWidth: '600px',
                    }}
                >
                    Your supply chain is flying blind.{' '}
                    <em style={{ color: '#C9952A', fontStyle: 'italic' }}>
                        Here's the cost.
                    </em>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        fontSize: '14px',
                        color: 'rgba(245,240,232,0.4)',
                        lineHeight: 1.7,
                        maxWidth: '480px',
                        marginBottom: 'clamp(40px, 5vw, 64px)',
                    }}
                >
                    Most enterprises still forecast with spreadsheets and gut instinct.
                    The numbers tell a different story.
                </motion.p>

                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
                    ))}
                </div>
            </div>

            {/* Bottom gold divider */}
            <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0 }} />
        </section>
    );
}

function StatCard({
    stat,
    index,
    inView,
}: {
    stat: (typeof stats)[number];
    index: number;
    inView: boolean;
}) {
    const display = useCountUp(stat.value, inView, stat.suffix, stat.prefix || '');

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
            style={{
                borderRadius: '16px',
                border: '0.5px solid rgba(201,149,42,0.2)',
                background: 'rgba(255,255,255,0.02)',
                padding: '28px 24px',
            }}
        >
            {/* Top edge gold gradient line */}
            <div
                className="absolute top-0 left-0 right-0"
                style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(201,149,42,0.5), transparent)',
                }}
            />

            {/* Radial glow behind number */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: '120px',
                    height: '120px',
                    top: '-10px',
                    left: '10px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(201,149,42,0.15) 0%, transparent 70%)',
                }}
            />

            {/* Number */}
            <div
                className="relative"
                style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                    color: '#C9952A',
                    lineHeight: 1,
                    marginBottom: '14px',
                }}
            >
                {display}
            </div>

            {/* Label */}
            <p
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.7)',
                    fontWeight: 600,
                    marginBottom: '6px',
                }}
            >
                {stat.label}
            </p>

            {/* Sub */}
            <p style={{ fontSize: '12px', color: 'rgba(245,240,232,0.3)', lineHeight: 1.5, margin: 0 }}>
                {stat.sub}
            </p>
        </motion.div>
    );
}
