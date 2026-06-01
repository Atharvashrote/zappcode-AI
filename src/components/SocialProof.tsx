import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const testimonials = [
    { quote: 'We reduced forecast error by 31% in Q1. The Forecast Agent alone paid for the entire platform.', name: 'Rajesh Mehta', title: 'VP Supply Chain', company: '$2B FMCG Company', initials: 'RM', bg: '#1a3a5c' },
    { quote: 'The ERP Action Agent eliminated our weekly planning meeting. 3-day decisions now happen in 20 minutes.', name: 'Sarah Chen', title: 'Chief Operations Officer', company: 'National Retail Group', initials: 'SC', bg: '#5c1a3a' },
    { quote: 'We caught a competitor pricing shift 11 days before our team would have spotted it manually.', name: 'Arjun Patel', title: 'CEO', company: 'Mid-Market Manufacturer', initials: 'AP', bg: '#3a5c1a' },
];

const logoStrip = ['Manufacturing', 'FMCG', 'Retail', 'Pharma', 'Automotive', 'E-Commerce'];

export default function SocialProof() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="social-proof" style={{ background: '#FFFFFF', padding: '96px 64px' }}>
            <div className="max-w-[1200px] mx-auto">
                {/* Eyebrow */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }} className="text-center" style={{ marginBottom: '24px' }}>
                    <span className="eyebrow" style={{ justifyContent: 'center' }}>Trust Signals</span>
                </motion.div>

                <motion.h2 initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease }} className="text-center" style={{ fontFamily: "'DM Serif Display'", fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#0D1B2A', lineHeight: 1.15, margin: '0 0 20px' }}>
                    Leaders who chose <em style={{ color: '#C9952A', fontStyle: 'italic' }}>intelligence over instinct.</em>
                </motion.h2>

                {/* Logo strip */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap justify-center items-center" style={{ marginBottom: '56px', gap: 0 }}>
                    <p style={{ fontFamily: "'JetBrains Mono'", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9CA3AF', width: '100%', textAlign: 'center', marginBottom: '20px' }}>Trusted Across Industries</p>
                    <div className="flex flex-wrap justify-center items-center">
                        {logoStrip.map((logo, i) => (
                            <div key={logo} className="flex items-center">
                                {i > 0 && <div style={{ width: '0.5px', height: '20px', background: '#E8E2D9', margin: '0 16px' }} />}
                                <span className="transition-all duration-300 cursor-default" style={{ fontFamily: "'JetBrains Mono'", fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', filter: 'grayscale(100%) opacity(40%)', padding: '4px 0' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.color = '#0D1B2A'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(100%) opacity(40%)'; e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.transform = 'scale(1)'; }}>
                                    {logo}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Testimonial cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <motion.div key={t.name}
                            initial={{ opacity: 0, y: 32 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease }}
                            className="card-lift flex flex-col"
                            style={{ background: '#FFFFFF', border: '0.5px solid #E8E2D9', borderLeft: '2px solid #C9952A', borderRadius: '16px', padding: '24px', cursor: 'default' }}>

                            {/* Stars */}
                            <div style={{ fontSize: '12px', color: '#C9952A', letterSpacing: '2px', marginBottom: '14px' }}>★★★★★</div>

                            {/* Quote */}
                            <p className="flex-1" style={{ fontFamily: "'DM Serif Display'", fontStyle: 'italic', fontSize: '15px', color: '#374151', lineHeight: 1.6, margin: '0 0 20px' }}>
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Attribution */}
                            <div className="flex items-center" style={{ gap: '12px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#F5F0E8', flexShrink: 0 }}>
                                    {t.initials}
                                </div>
                                <div>
                                    <p style={{ fontFamily: "'Instrument Sans'", fontSize: '14px', fontWeight: 500, color: '#0D1B2A', margin: '0 0 1px' }}>{t.name}</p>
                                    <p style={{ fontFamily: "'JetBrains Mono'", fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.04em', margin: 0 }}>{t.title}, {t.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* India badge */}
                <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.8 }} className="flex justify-center" style={{ marginTop: '40px' }}>
                    <div className="inline-flex items-center" style={{ gap: '8px', padding: '10px 24px', borderRadius: '100px', background: 'rgba(201,149,42,0.06)', border: '0.5px solid rgba(201,149,42,0.2)' }}>
                        <span style={{ fontSize: '14px' }}>🇮🇳</span>
                        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '11px', letterSpacing: '0.06em', color: '#C9952A', fontWeight: 600 }}>
                            Trusted by enterprises across India
                        </span>
                    </div>
                </motion.div>
            </div>
            <div className="section-divider" style={{ marginTop: '96px' }} />
        </section>
    );
}
