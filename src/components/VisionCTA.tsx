import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function VisionCTA() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' });

    return (
        <section ref={ref} id="contact" className="relative overflow-hidden noise-overlay" style={{ background: '#0D1B2A', padding: '96px 64px' }}>
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0" style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #C9952A, transparent)' }} />

            <div className="relative z-10 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
                    {/* Left */}
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }}>
                        <span className="eyebrow eyebrow-light" style={{ marginBottom: '24px', display: 'inline-flex' }}>Ready to Transform</span>

                        <h2 style={{ fontFamily: "'DM Serif Display'", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#F5F0E8', lineHeight: 1.2, margin: '24px 0 16px' }}>
                            Ready to predict your<br />
                            <em style={{ color: '#C9952A', fontStyle: 'italic' }}>next demand shift?</em>
                        </h2>

                        <p style={{ fontSize: '14px', color: 'rgba(245,240,232,0.45)', lineHeight: 1.7, maxWidth: '420px', marginBottom: '28px' }}>
                            Book a 30-minute live demo. We&apos;ll show you exactly how AigentG9 would perform on your own data — before you invest a single rupee.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-wrap items-center" style={{ gap: '12px', marginBottom: '24px' }}>
                            <button type="button" className="btn-shimmer group inline-flex items-center cursor-pointer" style={{ padding: '14px 28px', borderRadius: '100px', background: '#C9952A', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 700, gap: '10px' }}>
                                Book a Demo <ArrowRight size={16} />
                            </button>
                            <button type="button" className="inline-flex items-center cursor-pointer transition-all duration-200 hover:border-[rgba(245,240,232,0.5)] hover:text-white" style={{ padding: '14px 24px', borderRadius: '100px', background: 'transparent', border: '0.5px solid rgba(245,240,232,0.2)', color: 'rgba(245,240,232,0.6)', fontSize: '14px', fontWeight: 600, gap: '8px' }}>
                                <Play size={13} style={{ fill: 'currentColor' }} /> Watch 3-min Overview
                            </button>
                        </div>

                        {/* Waitlist */}
                        <div className="flex items-center" style={{ gap: '8px' }}>
                            <span className="active-dot" />
                            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(201,149,42,0.6)' }}>
                                50+ enterprises on the waitlist
                            </span>
                        </div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease }}>
                        <div style={{ padding: '32px', borderRadius: '16px', background: 'rgba(245,240,232,0.05)', border: '0.5px solid rgba(245,240,232,0.1)' }}>
                            <h3 style={{ fontFamily: "'DM Serif Display'", fontSize: '18px', color: '#F5F0E8', marginBottom: '6px' }}>Get Started</h3>
                            <p style={{ fontSize: '13px', color: 'rgba(245,240,232,0.35)', marginBottom: '24px', lineHeight: 1.5 }}>
                                Fill in your details and our team will reach out within 24 hours.
                            </p>

                            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col" style={{ gap: '12px' }}>
                                {[
                                    { name: 'name', placeholder: 'Your Name', type: 'text' },
                                    { name: 'company', placeholder: 'Company', type: 'text' },
                                    { name: 'email', placeholder: 'Work Email', type: 'email' },
                                    { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                                ].map((field) => (
                                    <input key={field.name} name={field.name} type={field.type} placeholder={field.placeholder}
                                        value={form[field.name as keyof typeof form]}
                                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                                        aria-label={field.placeholder}
                                        className="w-full transition-all duration-200 outline-none"
                                        style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(245,240,232,0.06)', border: '0.5px solid rgba(245,240,232,0.12)', color: '#F5F0E8', fontFamily: "'Instrument Sans'", fontSize: '13px' }}
                                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,149,42,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,149,42,0.1)'; }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    />
                                ))}
                                <button type="submit" className="btn-shimmer w-full cursor-pointer" style={{ padding: '14px', borderRadius: '8px', background: '#C9952A', border: 'none', color: '#fff', fontFamily: "'Instrument Sans'", fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>
                                    Request Your Demo →
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
