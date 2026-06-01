import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const sources = [
    { name: 'SAP', color: '#0070C0' },
    { name: 'Oracle', color: '#C74634' },
    { name: 'Tally', color: '#D4AF37' },
    { name: 'Shopify', color: '#96BF48' },
    { name: 'Salesforce', color: '#00A1E0' },
    { name: 'REST API', color: '#6B7280' },
];
const outputs = ['Purchase Orders', 'Price Updates', 'Stock Transfers', 'Alerts & Reports'];

export default function Integration() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="integration" className="relative hex-bg" style={{ background: '#F5F2ED', padding: '96px 64px' }}>
            <div className="relative z-10 max-w-[1200px] mx-auto">
                {/* Eyebrow */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }} className="text-center" style={{ marginBottom: '24px' }}>
                    <span className="eyebrow" style={{ justifyContent: 'center' }}>Integration</span>
                </motion.div>

                <motion.h2 initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease }} className="text-center" style={{ fontFamily: "'DM Serif Display'", fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#0D1B2A', lineHeight: 1.15, margin: '0 0 clamp(48px, 6vw, 72px)' }}>
                    No rip-and-replace. <em style={{ color: '#C9952A', fontStyle: 'italic' }}>Works with what you have.</em>
                </motion.h2>

                {/* Flow diagram: Sources → G9 → Outputs */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
                    {/* Sources */}
                    <div className="flex flex-col" style={{ gap: '10px' }}>
                        <p style={{ fontFamily: "'JetBrains Mono'", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '8px', textAlign: 'center' }}>Your Systems</p>
                        {sources.map((s, i) => (
                            <motion.div key={s.name}
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease }}
                                className="flex items-center gap-3 card-lift"
                                style={{ padding: '12px 16px', borderRadius: '10px', background: '#FFFFFF', border: '0.5px solid #E8E2D9', cursor: 'default' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: s.color, opacity: 0.15, flexShrink: 0 }} />
                                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '12px', color: '#0D1B2A', fontWeight: 500 }}>{s.name}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center G9 box + SVG paths */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.5, ease }} className="flex flex-col items-center">
                        {/* SVG arrow left */}
                        <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="hidden md:block mb-4 rotate-0">
                            <path d="M0 12 H60" stroke="#C9952A" strokeWidth="1" strokeDasharray="6 4"
                                style={{ strokeDashoffset: inView ? 0 : 80, transition: 'stroke-dashoffset 1.5s ease 0.8s' }} />
                            <polygon points="60,6 74,12 60,18" fill="#C9952A" opacity={0.5} />
                        </svg>

                        {/* G9 Core box */}
                        <div className="relative" style={{ background: '#0D1B2A', borderRadius: '14px', padding: '32px 36px', textAlign: 'center' }}>
                            <div className="absolute top-0 left-4 right-4" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,149,42,0.4), transparent)' }} />
                            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '14px', fontWeight: 700, letterSpacing: '0.15em', color: '#C9952A', marginBottom: '4px' }}>AIGENTG9</div>
                            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '10px', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Intelligence Layer</div>
                            <div style={{ fontFamily: "'DM Serif Display'", fontSize: '28px', color: '#C9952A', marginTop: '8px' }}>9</div>
                            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '9px', color: 'rgba(245,240,232,0.3)', letterSpacing: '0.08em' }}>AI AGENTS</div>
                        </div>

                        {/* SVG arrow right */}
                        <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="hidden md:block mt-4">
                            <path d="M0 12 H60" stroke="#C9952A" strokeWidth="1" strokeDasharray="6 4"
                                style={{ strokeDashoffset: inView ? 0 : 80, transition: 'stroke-dashoffset 1.5s ease 1.2s' }} />
                            <polygon points="60,6 74,12 60,18" fill="#C9952A" opacity={0.5} />
                        </svg>
                    </motion.div>

                    {/* Outputs */}
                    <div className="flex flex-col" style={{ gap: '10px' }}>
                        <p style={{ fontFamily: "'JetBrains Mono'", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '8px', textAlign: 'center' }}>Decision Output</p>
                        {outputs.map((o, i) => (
                            <motion.div key={o}
                                initial={{ opacity: 0, x: 30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.5 + i * 0.07, ease }}
                                className="flex items-center gap-3 card-lift"
                                style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(201,149,42,0.06)', border: '0.5px solid rgba(201,149,42,0.25)', cursor: 'default' }}>
                                <span className="active-dot" style={{ flexShrink: 0 }} />
                                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '12px', color: '#C9952A', fontWeight: 500 }}>{o}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom tagline */}
                <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 1.2 }} className="text-center" style={{ fontFamily: "'JetBrains Mono'", fontSize: '11px', letterSpacing: '0.08em', color: '#9CA3AF', marginTop: '56px' }}>
                    Live in under 48 hours · No code changes to your ERP · Full audit trail
                </motion.p>
            </div>
            <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0 }} />
        </section>
    );
}
