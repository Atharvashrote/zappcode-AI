import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const comparisons = [
    { name: 'Alibaba DAMO', origin: 'China · E-Commerce Giant', power: 'Massive consumer data scale' },
    { name: 'Oracle Demantra', origin: 'USA · Enterprise Legacy', power: 'Deep ERP integration' },
    { name: 'Palantir Foundry', origin: 'USA · Defence-Grade AI', power: 'Complex data modelling' },
    { name: 'AigentG9', origin: 'India · Purpose-Built', power: '9-agent autonomous intelligence', highlight: true },
];

export default function BrandStory() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="story" style={{ background: '#F5F0E8', padding: '96px 64px' }}>
            <div className="max-w-[1200px] mx-auto">
                {/* Eyebrow */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }} style={{ marginBottom: '24px' }}>
                    <span className="eyebrow">The Story</span>
                </motion.div>

                {/* 50/50 grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left — Editorial quote */}
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease }} className="relative">
                        {/* Giant decorative quote mark */}
                        <span className="absolute -top-8 -left-4 select-none" style={{ fontFamily: "'DM Serif Display'", fontSize: '160px', color: 'rgba(201,149,42,0.10)', lineHeight: 0.8, pointerEvents: 'none' }}>&ldquo;</span>

                        <blockquote className="relative" style={{ margin: 0, padding: '0 0 0 28px', borderLeft: '2px solid #C9952A' }}>
                            <p style={{ fontFamily: "'DM Serif Display'", fontSize: 'clamp(18px, 2vw, 22px)', fontStyle: 'italic', color: '#0D1B2A', lineHeight: 1.6, margin: '0 0 24px' }}>
                                Just as Gunmaster G9 anticipated every threat before it arrived —{' '}
                                <span style={{ color: '#C9952A' }}>
                                    AigentG9 sees your demand shifts before your competition does.
                                </span>
                            </p>
                        </blockquote>

                        <div style={{ paddingLeft: '28px' }}>
                            <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.8, marginBottom: '16px' }}>
                                AigentG9 draws its name from the legendary Gunmaster G9 — a character defined by anticipation, precision, and multi-dimensional awareness. Our platform deploys 9 autonomous AI agents that work in concert to give your enterprise a decisive edge.
                            </p>
                            <p style={{ fontSize: '14px', color: '#0D1B2A', lineHeight: 1.8, fontWeight: 600, margin: 0 }}>
                                This isn&apos;t another dashboard. It&apos;s an autonomous intelligence layer.
                            </p>

                            {/* Attribution */}
                            <div style={{ marginTop: '24px', fontFamily: "'JetBrains Mono'", fontSize: '10px', letterSpacing: '0.15em', color: '#9CA3AF', textTransform: 'uppercase' }}>
                                Born in India · Built for Global Enterprise
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — 2×2 comparison cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {comparisons.map((c, i) => (
                            <motion.div key={c.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease }}
                                className="relative card-lift"
                                style={{
                                    padding: '22px',
                                    borderRadius: '16px',
                                    background: c.highlight ? 'rgba(201,149,42,0.04)' : '#FFFFFF',
                                    border: c.highlight ? '1px solid #C9952A' : '0.5px solid #E8E2D9',
                                    cursor: 'default',
                                }}>
                                {/* Gold corner accent for AigentG9 */}
                                {c.highlight && (
                                    <div className="absolute top-0 right-0" style={{ width: 0, height: 0, borderTop: '20px solid #C9952A', borderLeft: '20px solid transparent', borderTopRightRadius: '16px' }} />
                                )}
                                <p style={{ fontFamily: "'JetBrains Mono'", fontSize: '9px', color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>{c.origin}</p>
                                <h4 style={{ fontFamily: "'DM Serif Display'", fontSize: '16px', color: c.highlight ? '#C9952A' : '#0D1B2A', marginBottom: '6px' }}>{c.name}</h4>
                                <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5, margin: 0 }}>{c.power}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="section-divider" style={{ marginTop: '96px' }} />
        </section>
    );
}
