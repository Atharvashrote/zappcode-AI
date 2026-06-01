import { useEffect, useState, useRef } from 'react';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import HowItWorksLight from './components/HowItWorksLight';
import AgentShowcase from './components/AgentShowcase';
import ROIMetrics from './components/ROIMetrics';
import UseCases from './components/UseCases';
import Integration from './components/Integration';
import BrandStory from './components/BrandStory';
import SocialProof from './components/SocialProof';
import VisionCTA from './components/VisionCTA';
import Footer from './components/Footer';

/* ── Scroll Progress Bar ── */
function ScrollProgress() {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            setWidth(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

/* ── Custom Cursor (desktop only) ── */
function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(max-width: 768px)').matches) return;
        if (window.matchMedia('(pointer: coarse)').matches) return;
        setVisible(true);

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;
        let isHovering = false;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onOverInteractive = () => { isHovering = true; };
        const onLeaveInteractive = () => { isHovering = false; };

        const addHoverListeners = () => {
            document.querySelectorAll('a, button, [role="button"], .cursor-pointer, .card-lift, .group').forEach((el) => {
                el.addEventListener('mouseenter', onOverInteractive);
                el.addEventListener('mouseleave', onLeaveInteractive);
            });
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        addHoverListeners();
        const observer = new MutationObserver(() => addHoverListeners());
        observer.observe(document.body, { childList: true, subtree: true });

        let raf: number;
        const tick = () => {
            dotX += (mouseX - dotX) * 0.35;
            dotY += (mouseY - dotY) * 0.35;
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${dotX - 5}px, ${dotY - 5}px)`;
            }
            if (ringRef.current) {
                const size = isHovering ? 40 : 0;
                ringRef.current.style.transform = `translate(${ringX - size / 2}px, ${ringY - size / 2}px)`;
                ringRef.current.style.width = `${size}px`;
                ringRef.current.style.height = `${size}px`;
                ringRef.current.style.opacity = isHovering ? '1' : '0';
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
            observer.disconnect();
        };
    }, []);

    if (!visible) return null;

    return (
        <>
            <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: '10px', height: '10px', borderRadius: '50%', background: '#C9952A', pointerEvents: 'none', zIndex: 99999, mixBlendMode: 'difference' }} />
            <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, borderRadius: '50%', border: '1.5px solid #C9952A', pointerEvents: 'none', zIndex: 99998, opacity: 0, transition: 'width 0.25s ease, height 0.25s ease, opacity 0.2s ease' }} />
        </>
    );
}

/* ── App ── */
function App() {
    return (
        <>
            <ScrollProgress />
            <CustomCursor />
            <main>
                <Hero />
                <ProblemStatement />
                <HowItWorksLight />
                <AgentShowcase />
                <ROIMetrics />
                <UseCases />
                <Integration />
                <BrandStory />
                <SocialProof />
                <VisionCTA />
                <Footer />
            </main>
        </>
    );
}

export default App;
