import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const anchorLinks = [
    { label: 'Platform',   href: '/#problem'   },
    { label: 'Industries', href: '/#use-cases' },
    { label: 'ROI',        href: '/#roi'       },
];

const routerLinks = [
    { label: 'Agents',   to: '/agents'  },
    { label: 'About Us', to: '/about'   },
    { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <nav className="fixed z-50 left-1/2 -translate-x-1/2" style={{
                top: scrolled ? '12px' : '20px',
                width: scrolled ? '92%' : '95%',
                maxWidth: '1200px',
                transition: 'all 0.7s cubic-bezier(0.23,1,0.32,1)',
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    height: '56px', padding: '0 6px 0 20px',
                    borderRadius: '9999px',
                    background: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(15,23,42,0.6)',
                    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                    border: `0.5px solid ${scrolled ? 'rgba(37,99,235,0.12)' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: scrolled
                        ? '0 8px 32px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(37,99,235,0.08)'
                        : '0 4px 24px rgba(0,0,0,0.2)',
                    transition: 'all 0.7s cubic-bezier(0.23,1,0.32,1)',
                }}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <div style={{
                            width: '34px', height: '34px', borderRadius: '50%',
                            background: '#2563EB',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)', flexShrink: 0,
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(37,99,235,0.4)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '14px', color: '#FFFFFF', lineHeight: 1 }}>Z</span>
                        </div>
                        <span className="hidden sm:block" style={{
                            fontFamily: "'DM Serif Display', serif", fontSize: '17px',
                            color: scrolled ? '#0D1B2A' : '#F1F5F9', letterSpacing: '-0.01em',
                            transition: 'color 0.7s cubic-bezier(0.23,1,0.32,1)',
                        }}>
                            Zappcode<span style={{ color: '#2563EB' }}>.</span>
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center" style={{ gap: '4px' }}>
                        {anchorLinks.map((link) => (
                            <a key={link.label} href={link.href} style={{
                                padding: '8px 16px', borderRadius: '9999px',
                                fontSize: '13px', fontWeight: 500,
                                color: scrolled ? '#6B7280' : 'rgba(241,245,249,0.6)',
                                textDecoration: 'none', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = scrolled ? '#0D1B2A' : '#FFFFFF'; e.currentTarget.style.background = scrolled ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = scrolled ? '#6B7280' : 'rgba(241,245,249,0.6)'; e.currentTarget.style.background = 'transparent'; }}
                            >
                                {link.label}
                            </a>
                        ))}
                        {routerLinks.map((link) => (
                            <Link key={link.label} to={link.to} style={{
                                padding: '8px 16px', borderRadius: '9999px',
                                fontSize: '13px', fontWeight: 500,
                                color: scrolled ? '#6B7280' : 'rgba(241,245,249,0.6)',
                                textDecoration: 'none', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                            }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = scrolled ? '#0D1B2A' : '#FFFFFF'; (e.currentTarget as HTMLElement).style.background = scrolled ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = scrolled ? '#6B7280' : 'rgba(241,245,249,0.6)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="flex items-center" style={{ gap: '8px' }}>
                        <Link to="/contact" className="hidden sm:inline-flex btn-primary" style={{ padding: '10px 22px', fontSize: '11px', letterSpacing: '0.15em', gap: '6px', textDecoration: 'none' }}>
                            Get Started <ArrowRight size={14} />
                        </Link>
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex items-center justify-center" style={{
                            width: '42px', height: '42px', borderRadius: '50%',
                            background: '#2563EB', border: 'none', color: '#FFFFFF',
                            cursor: 'pointer', transition: 'all 0.3s ease', flexShrink: 0,
                        }}>
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile */}
            {mobileOpen && (
                <div className="fixed inset-0 z-60 md:hidden" onClick={() => setMobileOpen(false)}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
                    <div className="absolute bottom-0 left-0 right-0" style={{
                        margin: '0 12px 12px', background: '#FFFFFF', borderRadius: '24px', padding: '32px 28px',
                        animation: 'slideUp 400ms cubic-bezier(0.23,1,0.32,1) forwards',
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '15px', color: '#FFFFFF' }}>Z</span>
                            </div>
                            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#0D1B2A' }}>
                                Zappcode<span style={{ color: '#2563EB' }}>.</span>
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '28px' }}>
                            {anchorLinks.map((link) => (
                                <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} style={{
                                    fontFamily: "'DM Serif Display', serif", fontSize: '24px', color: '#0D1B2A',
                                    textDecoration: 'none', padding: '10px 0', borderBottom: '0.5px solid #E8E2D9',
                                }}>{link.label}</a>
                            ))}
                            {routerLinks.map((link) => (
                                <Link key={link.label} to={link.to} onClick={() => setMobileOpen(false)} style={{
                                    fontFamily: "'DM Serif Display', serif", fontSize: '24px', color: '#0D1B2A',
                                    textDecoration: 'none', padding: '10px 0', borderBottom: '0.5px solid #E8E2D9',
                                }}>{link.label}</Link>
                            ))}
                        </div>
                        <Link to="/contact" className="btn-primary w-full" onClick={() => setMobileOpen(false)} style={{ justifyContent: 'center', textDecoration: 'none' }}>
                            Get Started <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
