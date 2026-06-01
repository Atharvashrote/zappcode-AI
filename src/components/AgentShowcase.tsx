import { useRef, useState, useEffect, useCallback } from "react";
import {
    TrendingUp, AlertTriangle, Radio, Eye, DollarSign,
    Megaphone, GitBranch, BarChart3, Cpu,
} from "lucide-react";

/* ── AGENT DATA ─────────────────────────────────────────────── */
const agents = [
    { name: "Forecast Agent", shortName: "Forecast", initial: "F", role: "Generates rolling demand forecasts with confidence intervals using time-series ML and seasonality analysis.", icon: TrendingUp, tag: "Predictive", hue: 210 },
    { name: "Deviation Agent", shortName: "Deviation", initial: "D", role: "Monitors actuals vs. forecast 24/7, fires alerts the moment demand deviates and traces root cause.", icon: AlertTriangle, tag: "Real-time Alerts", hue: 30 },
    { name: "Market Signal Agent", shortName: "Market", initial: "M", role: "Ingests macro-economic indicators, social trends, and news sentiment to surface demand signals.", icon: Radio, tag: "External Signals", hue: 190 },
    { name: "Competitor Agent", shortName: "Competitor", initial: "C", role: "Tracks competitor pricing, stock availability, and promotional activity across channels.", icon: Eye, tag: "Competitive Intel", hue: 260 },
    { name: "Pricing Agent", shortName: "Pricing", initial: "P", role: "Recommends optimal price points balancing elasticity, margins, and competitive positioning.", icon: DollarSign, tag: "Dynamic Pricing", hue: 150 },
    { name: "Promotion Agent", shortName: "Promotion", initial: "P2", role: "Simulates promotional uplift, cannibalization, and ROI before launch — tracks actuals live.", icon: Megaphone, tag: "ROI Tracking", hue: 340 },
    { name: "Scenario Agent", shortName: "Scenario", initial: "S", role: "Build unlimited what-if scenarios — supply disruptions, price changes — compare outcomes instantly.", icon: GitBranch, tag: "What-if Modeling", hue: 170 },
    { name: "Executive Insight Agent", shortName: "Executive", initial: "E", role: "Synthesises data from all agents into executive briefings and KPI dashboards for the C-suite.", icon: BarChart3, tag: "C-Suite Ready", hue: 45 },
    { name: "ERP Action Agent", shortName: "ERP Action", initial: "A", role: "Converts AI recommendations into ERP transactions — purchase orders, production runs, stock transfers.", icon: Cpu, tag: "Auto-Execution", hue: 280 },
];

const COUNT = agents.length;
const SCROLL_PER_CARD = 350;

/* ── AGENT CARD ─────────────────────────────────────────────── */
function AgentCard({ agent, offset }: { agent: (typeof agents)[number]; offset: number }) {
    // offset: 0 = centered/active, -1 = previous, +1 = next, etc.
    const Icon = agent.icon;
    const absOff = Math.abs(offset);
    const isActive = absOff < 0.5;

    const translateY = offset * 110;
    const scale = Math.max(0.7, 1 - absOff * 0.15);
    const opacity = Math.max(0, 1 - absOff * 0.6);
    const blur = Math.min(absOff * 3, 6);

    return (
        <div
            style={{
                position: "absolute",
                inset: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: isActive ? "auto" : "none",
                zIndex: 10 - Math.round(absOff),
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    filter: `blur(${blur}px)`,
                    willChange: "transform, opacity, filter",
                    transition: "none",
                }}
            >
                <div
                    style={{
                        background: "#FFFFFF",
                        border: `0.5px solid ${isActive ? "rgba(201,149,42,0.55)" : "#E8E2D9"}`,
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: isActive
                            ? "0 28px 72px rgba(13,27,42,0.16), 0 0 0 1px rgba(201,149,42,0.12)"
                            : "0 2px 8px rgba(13,27,42,0.04)",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            position: "relative",
                            height: "120px",
                            overflow: "hidden",
                            background: `linear-gradient(135deg, hsl(${agent.hue},35%,18%), hsl(${agent.hue + 30},25%,12%))`,
                        }}
                    >
                        <span style={{
                            position: "absolute", right: "-4px", top: "-8px",
                            fontFamily: "'DM Serif Display', Georgia, serif",
                            fontSize: "80px", color: "rgba(255,255,255,0.07)",
                            lineHeight: 1, userSelect: "none",
                        }}>
                            {agent.initial}
                        </span>
                        <div style={{
                            position: "absolute", inset: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <Icon size={32} style={{ color: "#C9952A" }} />
                        </div>
                        <span style={{
                            position: "absolute", bottom: "8px", right: "12px",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "9px", color: "rgba(201,149,42,0.5)",
                            letterSpacing: "0.1em",
                        }}>
                            {agent.tag}
                        </span>
                    </div>

                    {/* Body */}
                    <div style={{ padding: "22px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                            <h3 style={{
                                fontFamily: "'DM Serif Display', Georgia, serif",
                                fontSize: "18px", color: "#0D1B2A", margin: 0,
                            }}>
                                {agent.name}
                            </h3>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <span className="active-dot" />
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "9px", letterSpacing: "0.1em",
                                    color: "#22C55E", textTransform: "uppercase", fontWeight: 600,
                                }}>Active</span>
                            </div>
                        </div>
                        <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7, margin: 0 }}>
                            {agent.role}
                        </p>
                    </div>

                    {/* Footer */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "12px 24px", borderTop: "0.5px solid #E8E2D9",
                    }}>
                        <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "9px", color: "#C9952A",
                            background: "rgba(201,149,42,0.08)",
                            border: "0.5px solid rgba(201,149,42,0.2)",
                            borderRadius: "999px", padding: "4px 12px",
                        }}>
                            {agent.tag}
                        </span>
                        <span style={{ color: "#C9952A", fontSize: "14px" }}>→</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── MAIN SECTION ───────────────────────────────────────────── */
export default function AgentShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeFloat, setActiveFloat] = useState(0); // fractional index (0.0 - 8.0)

    const computeProgress = useCallback(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionScrollable = rect.height - window.innerHeight;
        if (sectionScrollable <= 0) return;
        const progress = Math.max(0, Math.min(1, -rect.top / sectionScrollable));
        setActiveFloat(progress * (COUNT - 1));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", computeProgress, { passive: true });
        window.addEventListener("resize", computeProgress, { passive: true });
        computeProgress();
        return () => {
            window.removeEventListener("scroll", computeProgress);
            window.removeEventListener("resize", computeProgress);
        };
    }, [computeProgress]);

    const activeIndex = Math.max(0, Math.min(COUNT - 1, Math.round(activeFloat)));
    const totalHeight = SCROLL_PER_CARD * COUNT + window.innerHeight;

    return (
        <section
            ref={sectionRef}
            id="agents"
            style={{ position: "relative", height: `${totalHeight}px` }}
        >
            {/* Sticky viewport */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    overflow: "hidden",
                    background: "#F5F2ED",
                    display: "flex",
                }}
            >
                {/* ── LEFT PANEL ── */}
                <div
                    style={{
                        flex: "1 1 50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "0 clamp(32px, 5vw, 80px)",
                        minWidth: 0,
                    }}
                >
                    {/* Eyebrow */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                        <span className="active-dot" />
                        <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "10px", letterSpacing: "0.15em",
                            color: "#C9952A", textTransform: "uppercase",
                        }}>
                            The 9 AI Agents
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 style={{
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                        color: "#0D1B2A", lineHeight: 1.1,
                        margin: "0 0 16px",
                    }}>
                        Your demand{" "}
                        <em style={{ color: "#C9952A", fontStyle: "italic" }}>intelligence team.</em>
                    </h2>

                    <p style={{
                        fontSize: "14px", color: "#6B7280", lineHeight: 1.7,
                        margin: "0 0 40px", maxWidth: "360px",
                    }}>
                        9 autonomous agents working in concert — scroll to explore each one.
                    </p>

                    {/* Scroll progress ring */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
                        <svg viewBox="0 0 52 52" width="52" height="52">
                            <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(201,149,42,0.12)" strokeWidth="2.5" />
                            <circle
                                cx="26" cy="26" r="22" fill="none"
                                stroke="#C9952A" strokeWidth="2.5"
                                strokeDasharray={`${2 * Math.PI * 22}`}
                                strokeDashoffset={`${2 * Math.PI * 22 * (1 - activeFloat / (COUNT - 1))}`}
                                strokeLinecap="round"
                                transform="rotate(-90 26 26)"
                            />
                            <text x="26" y="26" textAnchor="middle" dominantBaseline="central" style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "12px", fill: "#C9952A", fontWeight: 700,
                            }}>
                                {activeIndex + 1}
                            </text>
                        </svg>
                        <div>
                            <div style={{
                                fontFamily: "'DM Serif Display', Georgia, serif",
                                fontSize: "16px", color: "#0D1B2A", marginBottom: "2px",
                                transition: "none",
                            }}>
                                {agents[activeIndex].name}
                            </div>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "10px", letterSpacing: "0.08em",
                                color: "#9CA3AF", textTransform: "uppercase",
                            }}>
                                Agent {activeIndex + 1} of {COUNT}
                            </div>
                        </div>
                    </div>

                    {/* Dot indicator */}
                    <div style={{ display: "flex", gap: "5px" }}>
                        {agents.map((_, i) => (
                            <div key={i} style={{
                                width: i === activeIndex ? "24px" : "6px",
                                height: "6px", borderRadius: "999px",
                                background: i === activeIndex ? "#C9952A" : "rgba(201,149,42,0.2)",
                                transition: "all 0.25s ease",
                            }} />
                        ))}
                    </div>
                </div>

                {/* ── RIGHT PANEL — Card carousel ── */}
                <div
                    style={{
                        flex: "1 1 50%",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 0,
                    }}
                >
                    {/* Top/bottom fade gradients */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "140px",
                        background: "linear-gradient(180deg, #F5F2ED, transparent)",
                        zIndex: 20, pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: "140px",
                        background: "linear-gradient(0deg, #F5F2ED, transparent)",
                        zIndex: 20, pointerEvents: "none",
                    }} />

                    {/* Card stack */}
                    <div style={{
                        position: "relative",
                        width: "min(400px, 90%)",
                        height: "420px",
                    }}>
                        {agents.map((agent, i) => (
                            <AgentCard key={agent.name} agent={agent} offset={i - activeFloat} />
                        ))}
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div style={{
                    position: "absolute",
                    bottom: "20px", left: "clamp(24px, 4vw, 64px)", right: "clamp(24px, 4vw, 64px)",
                    display: "flex", flexWrap: "wrap",
                    alignItems: "center", justifyContent: "space-between",
                    padding: "18px 28px", borderRadius: "14px",
                    background: "rgba(13,27,42,0.95)",
                    backdropFilter: "blur(12px)",
                    gap: "12px", zIndex: 30,
                }}>
                    <p style={{
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        fontSize: "clamp(13px, 1.3vw, 17px)",
                        color: "#F5F0E8", margin: 0, lineHeight: 1.4,
                    }}>
                        All 9 agents operate as one unified intelligence system.
                    </p>
                    <a href="#how-it-works" className="btn-shimmer" style={{
                        display: "inline-block", padding: "12px 24px",
                        borderRadius: "8px", background: "#C9952A",
                        color: "#fff", fontSize: "13px", fontWeight: 700,
                        textDecoration: "none", whiteSpace: "nowrap",
                    }}>
                        See How They Work Together →
                    </a>
                </div>
            </div>
        </section>
    );
}