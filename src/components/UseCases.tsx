import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Store, Factory, Globe, Pill, type LucideIcon } from 'lucide-react';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Industry {
    id: string; label: string; icon: LucideIcon; scenario: string;
    before: string[]; after: string[];
}

const industries: Industry[] = [
    { id: 'fmcg', label: 'FMCG', icon: ShoppingCart, scenario: 'Your promotions spike demand 3× — the Promotion Agent pre-positions inventory automatically, while the Pricing Agent adjusts channel margins in real time.', before: ['Manual promotion planning in spreadsheets', 'Inventory positioned 2–3 weeks late', 'Post-mortem ROI analysis only'], after: ['AI-simulated uplift before launch', 'Auto-positioned stock 48 hrs ahead', 'Real-time ROI tracking per SKU'] },
    { id: 'retail', label: 'Retail', icon: Store, scenario: 'A competitor drops prices across 200 SKUs overnight. The Competitor Agent detects the shift, and the Pricing Agent recommends counter-moves before your first store opens.', before: ['Competitor pricing checked weekly', 'Response cycle: 5–7 business days', 'Blanket discounting erodes margins'], after: ['Continuous monitoring across channels', 'Counter-pricing in under 4 hours', 'SKU-level elasticity-optimised pricing'] },
    { id: 'manufacturing', label: 'Manufacturing', icon: Factory, scenario: 'Raw material costs surge 18% due to a supply disruption. The Scenario Agent instantly models production alternatives and the ERP Action Agent adjusts purchase orders.', before: ['Weekly S&OP meetings to react', 'Single-source supply dependency', 'PO adjustments take 3+ days'], after: ['Real-time scenario simulations', 'Multi-source risk scoring', 'Automated PO adjustment in minutes'] },
    { id: 'ecommerce', label: 'E-Commerce', icon: Globe, scenario: 'A viral social media trend drives 5× traffic to a product category. The Market Signal Agent catches it early, the Forecast Agent adjusts, and inventory is repositioned before stockout.', before: ['Trend detected after stockout', 'Flat demand forecasts miss spikes', 'Manual inventory reallocation'], after: ['Social sentiment feeds into forecasts', 'Dynamic demand shaping in real time', 'Auto-triggered warehouse transfers'] },
    { id: 'pharma', label: 'Pharma', icon: Pill, scenario: 'A seasonal disease outbreak shifts demand patterns across 3 regions. The Deviation Agent flags anomalies, the Forecast Agent recalibrates, and distribution is rebalanced.', before: ['Regional demand forecasted quarterly', 'Outbreak response: 10–14 days', 'Excess stock expires in low-demand zones'], after: ['Daily regional recalibration', 'Auto-response within 24 hours', 'Dynamic redistribution, zero waste'] },
];

export default function UseCases() {
    const [active, setActive] = useState(0);
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const current = industries[active];

    return (
        <section ref={ref} id="use-cases" style={{ background: '#FAFAF8', padding: '96px 64px' }}>
            <div className="max-w-[1200px] mx-auto">
                {/* Eyebrow */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }} className="text-center" style={{ marginBottom: '24px' }}>
                    <span className="eyebrow" style={{ justifyContent: 'center' }}>Industry Fit</span>
                </motion.div>

                {/* Heading */}
                <motion.h2 initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease }} className="text-center" style={{ fontFamily: "'DM Serif Display'", fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#0D1B2A', lineHeight: 1.15, margin: '0 0 clamp(36px, 5vw, 56px)' }}>
                    Built for <em style={{ color: '#C9952A', fontStyle: 'italic' }}>your industry.</em>
                </motion.h2>

                {/* Pill tabs with layoutId */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease }} className="flex flex-wrap justify-center" style={{ gap: '8px', marginBottom: 'clamp(36px, 5vw, 48px)' }}>
                    {industries.map((ind, i) => {
                        const Icon = ind.icon;
                        const isActive = i === active;
                        return (
                            <button key={ind.id} type="button" onClick={() => setActive(i)}
                                className="relative inline-flex items-center cursor-pointer transition-colors duration-200"
                                style={{ gap: '8px', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, border: isActive ? 'none' : '0.5px solid #E8E2D9', background: isActive ? '#0D1B2A' : '#FFFFFF', color: isActive ? '#F5F0E8' : '#6B7280', zIndex: 1 }}>
                                {isActive && (
                                    <motion.div layoutId="tab-bg" className="absolute inset-0" style={{ background: '#0D1B2A', borderRadius: '100px', zIndex: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                                )}
                                <Icon size={14} />
                                {ind.label}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                    <motion.div key={current.id}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.25, ease }}>

                        {/* Scenario */}
                        <p style={{ fontFamily: "'DM Serif Display'", fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontStyle: 'italic', color: '#0D1B2A', lineHeight: 1.7, textAlign: 'center', maxWidth: '680px', margin: '0 auto clamp(28px, 4vw, 40px)' }}>
                            &ldquo;{current.scenario}&rdquo;
                        </p>

                        {/* Before / After with VS divider */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-0">
                            {/* Before */}
                            <div style={{ padding: 'clamp(20px, 3vw, 28px)', borderRadius: '16px 0 0 16px', background: '#F9F9F9', border: '0.5px solid #E8E2D9' }}>
                                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EF4444', display: 'block', marginBottom: '14px' }}>✕ Without AigentG9</span>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {current.before.map((item) => (
                                        <li key={item} className="flex items-start gap-2" style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, padding: '7px 0', borderBottom: '0.5px solid #E8E2D9' }}>
                                            <span style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px' }}>✗</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* VS divider */}
                            <div className="hidden md:flex items-center justify-center relative" style={{ width: '1px', background: '#E8E2D9' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid #C9952A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono'", fontSize: '9px', fontWeight: 700, color: '#C9952A', letterSpacing: '0.05em' }}>
                                    VS
                                </div>
                            </div>

                            {/* After */}
                            <div style={{ padding: 'clamp(20px, 3vw, 28px)', borderRadius: '0 16px 16px 0', background: 'rgba(201,149,42,0.04)', border: '0.5px solid rgba(201,149,42,0.2)' }}>
                                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9952A', display: 'block', marginBottom: '14px' }}>✓ With AigentG9</span>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {current.after.map((item) => (
                                        <li key={item} className="flex items-start gap-2" style={{ fontSize: '13px', color: '#0D1B2A', fontWeight: 500, lineHeight: 1.6, padding: '7px 0', borderBottom: '0.5px solid rgba(201,149,42,0.1)' }}>
                                            <span style={{ color: '#22C55E', flexShrink: 0, marginTop: '2px' }}>✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="section-divider" style={{ marginTop: '96px' }} />
        </section>
    );
}
