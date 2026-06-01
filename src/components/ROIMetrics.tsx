import { Suspense, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Count-up ── */
function useCountUp(target: number, active: boolean, decimals = 0) {
    const [val, setVal] = useState('0');
    useEffect(() => {
        if (!active) return;
        let start: number | null = null;
        let raf: number;
        const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / 2000, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(decimals > 0 ? (target * eased).toFixed(decimals) : String(Math.round(target * eased)));
            if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [active, target, decimals]);
    return val;
}

const metrics = [
    { value: 40, prefix: '↓', suffix: '%', label: 'Inventory Cost Reduction', sub: 'Eliminate overstocking with AI-precision forecasts', color: '#22C55E' },
    { value: 35, prefix: '↑', suffix: '%', label: 'Forecast Accuracy', sub: 'Rolling 90-day forecasts that sharpen every cycle', color: '#C9952A' },
    { value: 2, prefix: '', suffix: '×', label: 'Supply Chain Agility', sub: 'Respond to demand shifts in hours, not weeks', color: '#C9952A' },
    { value: 3.2, prefix: '', suffix: '×', label: 'First-Year ROI', sub: 'Average return on total platform investment', color: '#C9952A', decimals: 1 },
];

const orbitLabels = ['↑ Forecast Accuracy', '↓ Inventory Risk', 'Real-time Intel', 'Auto ERP Actions'];

/* ── 3D Sphere ── */
function ROISphere() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) groupRef.current.rotation.y += 0.003;
    });
    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.3} />
            <pointLight position={[3, 3, 3]} intensity={0.6} />
            {/* Wireframe outer */}
            <mesh>
                <sphereGeometry args={[1.8, 64, 64]} />
                <meshStandardMaterial color="#C9952A" wireframe transparent opacity={0.12} />
            </mesh>
            {/* Solid inner */}
            <mesh>
                <sphereGeometry args={[1.4, 64, 64]} />
                <meshStandardMaterial color="#7a5518" metalness={0.9} roughness={0.1} emissive="#C9952A" emissiveIntensity={0.2} />
            </mesh>
            {/* Orbiting labels */}
            {orbitLabels.map((label, i) => {
                const angle = (i / 4) * Math.PI * 2;
                const x = Math.cos(angle) * 2.4;
                const z = Math.sin(angle) * 2.4;
                return (
                    <Html key={label} position={[x, 0.3, z]} center style={{ pointerEvents: 'none' }}>
                        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '10px', color: '#C9952A', background: 'rgba(13,27,42,0.9)', border: '0.5px solid rgba(201,149,42,0.3)', borderRadius: '999px', padding: '4px 10px', whiteSpace: 'nowrap', userSelect: 'none' }}>
                            {label}
                        </span>
                    </Html>
                );
            })}
        </group>
    );
}

/* ── Metric Row ── */
function MetricRow({ m, index, inView }: { m: (typeof metrics)[number]; index: number; inView: boolean }) {
    const display = useCountUp(m.value, inView, m.decimals ?? 0);
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease }}
            className="group flex items-start gap-5 py-5 transition-all duration-200 hover:pl-4"
            style={{ borderLeft: '2px solid transparent', borderBottom: index < metrics.length - 1 ? '0.5px dashed rgba(255,255,255,0.06)' : 'none' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = '#C9952A'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'transparent'; }}
        >
            <div style={{ fontFamily: "'DM Serif Display'", fontSize: '40px', color: m.color, lineHeight: 1, minWidth: '100px' }}>
                {m.prefix}{display}{m.suffix}
            </div>
            <div>
                <p style={{ fontFamily: "'JetBrains Mono'", fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.7)', fontWeight: 600, marginBottom: '4px' }}>{m.label}</p>
                <p style={{ fontSize: '13px', color: 'rgba(245,240,232,0.35)', lineHeight: 1.5, margin: 0 }}>{m.sub}</p>
            </div>
        </motion.div>
    );
}

/* ── Main ── */
export default function ROIMetrics() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="roi" className="relative overflow-hidden noise-overlay" style={{ background: '#0D1B2A', padding: '96px 64px' }}>
            <div className="relative z-10 max-w-[1200px] mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }} style={{ marginBottom: '24px' }}>
                    <span className="eyebrow eyebrow-light">Business Impact</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease }} style={{ fontFamily: "'DM Serif Display'", fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#F5F0E8', lineHeight: 1.15, margin: '0 0 16px', maxWidth: '500px' }}>
                    Hard numbers for <em style={{ color: '#C9952A', fontStyle: 'italic' }}>hard decisions.</em>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontSize: '14px', color: 'rgba(245,240,232,0.4)', lineHeight: 1.7, maxWidth: '420px', marginBottom: 'clamp(40px, 5vw, 56px)' }}>
                    Built for enterprises that compete on intelligence, not instinct.
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center">
                    {/* Left — metric rows */}
                    <div>
                        {metrics.map((m, i) => <MetricRow key={m.label} m={m} index={i} inView={inView} />)}
                    </div>

                    {/* Right — 3D Sphere */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, delay: 0.4, ease }} className="hidden lg:block" style={{ height: '380px' }}>
                        <Suspense fallback={<div />}>
                            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }} style={{ background: 'transparent' }}>
                                <ROISphere />
                            </Canvas>
                        </Suspense>
                    </motion.div>
                </div>
            </div>
            <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0 }} />
        </section>
    );
}
