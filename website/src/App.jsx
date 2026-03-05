"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Users, Trophy, Zap, Coffee, Heart,
  ChevronRight, Leaf, Award, Menu, X, Sun, Moon,
} from "lucide-react";

/* ─────────────────────────────────────────
   FONT + GLOBAL STYLES
───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Outfit:wght@300;400;500;600;700&display=swap');

    :root {
      --gold:        #C4913A;
      --gold-light:  #E8C97A;
      --gold-dim:    rgba(196,145,58,0.15);
      --gold-border: rgba(196,145,58,0.22);
      --bg:          #060604;
      --surface:     #0D0C0A;
      --card:        #131210;
      --text:        #F0E6D3;
      --muted:       #7A6E5F;
      --faint:       #2E2A24;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Outfit', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    ::selection { background: rgba(196,145,58,0.25); color: var(--gold-light); }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

    .font-display { font-family: 'Cormorant', serif; }
    .font-mono    { font-family: 'DM Mono', monospace; }

    /* Grain overlay */
    .grain::before {
      content: '';
      position: fixed;
      inset: -200%;
      width: 400%;
      height: 400%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.035;
      pointer-events: none;
      z-index: 9999;
      animation: grain 0.8s steps(2) infinite;
    }
    @keyframes grain {
      0%,100% { transform: translate(0,0); }
      10%     { transform: translate(-2%,-3%); }
      20%     { transform: translate(3%,2%); }
      30%     { transform: translate(-1%,4%); }
      40%     { transform: translate(2%,-1%); }
      50%     { transform: translate(-3%,1%); }
      60%     { transform: translate(1%,3%); }
      70%     { transform: translate(3%,-2%); }
      80%     { transform: translate(-2%,2%); }
      90%     { transform: translate(1%,-3%); }
    }

    /* Gold shimmer */
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    .shimmer-text {
      background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 30%, #FFF6DC 50%, var(--gold-light) 70%, var(--gold) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }

    /* Subtle grid lines */
    .grid-bg {
      background-image:
        linear-gradient(rgba(196,145,58,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(196,145,58,0.04) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* Prize cards */
    .prize-gold   { box-shadow: 0 0 60px rgba(196,145,58,0.18), 0 0 120px rgba(196,145,58,0.08); }
    .prize-silver { box-shadow: 0 0 40px rgba(180,190,200,0.10); }
    .prize-bronze { box-shadow: 0 0 40px rgba(180,120,60,0.10); }

    /* Nav line */
    .nav-line::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      opacity: 0.4;
    }

    /* Section number */
    .section-num {
      font-family: 'Cormorant', serif;
      font-size: clamp(6rem, 14vw, 12rem);
      font-weight: 300;
      line-height: 0.85;
      letter-spacing: -0.04em;
      color: transparent;
      -webkit-text-stroke: 1px rgba(196,145,58,0.12);
      pointer-events: none;
      user-select: none;
    }

    /* Detail row */
    .detail-row {
      display: flex;
      align-items: flex-start;
      gap: 1.25rem;
      padding: 1.25rem 1.5rem;
      border-radius: 0.75rem;
      background: rgba(196,145,58,0.04);
      border: 1px solid var(--gold-border);
      transition: border-color 0.3s, background 0.3s;
    }
    .detail-row:hover {
      background: rgba(196,145,58,0.07);
      border-color: rgba(196,145,58,0.35);
    }

    /* Button shine */
    .btn-primary {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #B8832E 0%, #C4913A 40%, #D4A44E 100%);
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: 0 4px 24px rgba(196,145,58,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
      color: #0D0C0A;
      font-weight: 600;
      letter-spacing: 0.02em;
      transition: box-shadow 0.3s, transform 0.2s;
    }
    .btn-primary::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }
    .btn-primary:hover::after { transform: translateX(100%); }
    .btn-primary:hover {
      box-shadow: 0 8px 40px rgba(196,145,58,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
    }

    .btn-outline {
      border: 1px solid var(--gold-border);
      color: var(--text);
      transition: background 0.3s, border-color 0.3s;
    }
    .btn-outline:hover {
      background: var(--gold-dim);
      border-color: rgba(196,145,58,0.4);
    }
  `}</style>
);

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const NAV_LINKS = [
  { id: "about",     label: "About"     },
  { id: "hackathon", label: "Hackathon" },
  { id: "prizes",    label: "Prizes"    },
  { id: "donate",    label: "Support"   },
  { id: "join",      label: "Join"      },
];

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.8, ease: [0.22,1,0.36,1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1] } },
};

/* ─────────────────────────────────────────
   THIN GOLD DIVIDER
───────────────────────────────────────── */
const GoldLine = ({ className = "" }) => (
  <div className={`w-full h-px ${className}`}
       style={{ background: "linear-gradient(90deg,transparent,var(--gold),transparent)", opacity: 0.25 }} />
);

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Home() {
  const [theme, setTheme]       = useState("dark");
  const [isDark, setIsDark]     = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined")
      document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setIsDark(next === "dark");
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <>
      <GlobalStyles />
      <div className="grain" style={{ position: "relative", minHeight: "100vh" }}>

        {/* ══════════════════════════════════════
            HEADER
        ══════════════════════════════════════ */}
        <header
          className="nav-line"
          style={{
            position: "fixed",
            inset: "0 0 auto",
            zIndex: 100,
            transition: "background 0.4s, border-color 0.4s",
            background: scrolled ? "rgba(6,6,4,0.92)" : "rgba(6,6,4,0.55)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${scrolled ? "rgba(196,145,58,0.15)" : "transparent"}`,
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1.1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "linear-gradient(135deg,#1A1710,#0D0C0A)",
                border: "1px solid rgba(196,145,58,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(196,145,58,0.12)",
              }}>
                <Leaf size={18} color="var(--gold)" />
              </div>
              <span className="font-display" style={{ fontSize: "1.35rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--text)" }}>
                FC<span style={{ color: "var(--gold)" }}> Hacks</span>
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22,1,0.36,1] }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif", fontSize: "0.875rem",
                    fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase",
                    color: "var(--muted)", transition: "color 0.25s",
                    display: "none",
                  }}
                  className="desktop-nav-item"
                  onMouseEnter={e => e.currentTarget.style.color = "var(--gold-light)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Desktop: CTA + theme */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <a
                href="https://forms.gle/5Q1ussbR1znusNUy8"
                target="_blank" rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: "0.55rem 1.25rem", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                Register
              </a>
              <button
                onClick={() => setMobileOpen(s => !s)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", display: "block" }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </motion.div>
          </div>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  background: "rgba(13,12,10,0.98)",
                  borderTop: "1px solid var(--gold-border)",
                  padding: "1.5rem 2rem 2rem",
                }}
              >
                {NAV_LINKS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "'Outfit', sans-serif", fontSize: "1rem",
                      fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
                      color: "var(--muted)", padding: "0.85rem 0",
                      borderBottom: "1px solid var(--faint)",
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {/* Video BG */}
          <video
            autoPlay loop muted playsInline
            src="/codingcinematicvid.mp4"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            aria-hidden="true"
          />
          {/* Multi-layer overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,6,4,0.65) 0%, rgba(6,6,4,0.5) 50%, rgba(6,6,4,0.85) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(6,6,4,0.5) 100%)" }} />

          {/* Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{
              position: "relative", zIndex: 10, textAlign: "center",
              maxWidth: 860, padding: "3.5rem 3rem 3rem", paddingTop: "calc(3.5rem + 0px)",
              marginTop: 80,
              borderRadius: 28,
              background: "rgba(6,6,4,0.45)",
              backdropFilter: "blur(28px) saturate(1.4)",
              WebkitBackdropFilter: "blur(28px) saturate(1.4)",
              border: "1px solid rgba(196,145,58,0.12)",
              boxShadow: "0 8px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.45rem 1.1rem", borderRadius: 999, border: "1px solid var(--gold-border)", background: "rgba(196,145,58,0.07)", marginBottom: "2rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 8px var(--gold)", animation: "pulse 2s ease-in-out infinite" }} />
              <span className="font-mono" style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-light)" }}>
                High School Coding Club · Fox Chapel Area
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display"
              style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.03em", marginBottom: "2rem" }}
            >
              <span style={{ display: "block", color: "var(--text)" }}>Build. <span style={{ color: "var(--text)", opacity: 0.75 }}>Create.</span></span>
              <span className="shimmer-text" style={{ display: "block" }}>Ship.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              style={{ fontSize: "clamp(1rem,2.5vw,1.2rem)", fontWeight: 300, color: "rgba(240,230,211,0.7)", maxWidth: 540, margin: "0 auto 0.75rem", lineHeight: 1.65 }}
            >
              A small, craft-minded club from Fox Chapel that treats code like a trade.
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: "clamp(0.95rem,2.2vw,1.1rem)", fontWeight: 400, color: "var(--gold-light)", marginBottom: "2.5rem" }}
            >
              <span style={{ fontWeight: 600 }}>Special Event —</span> We're hosting our first online hackathon.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdJ8qUgqsHDBEELzE5xT6zU8-g2xYbQiiUIYlD3JOQfC30e4w/viewform?usp=dialog"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 2rem", borderRadius: 12, fontSize: "0.92rem", letterSpacing: "0.04em", textDecoration: "none", fontFamily: "'Outfit', sans-serif" }}
              >
                Become a Member
                <ChevronRight size={16} />
              </a>
              <button
                onClick={() => scrollTo("hackathon")}
                className="btn-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 2rem", borderRadius: 12, fontSize: "0.92rem", letterSpacing: "0.04em", background: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}
              >
                Learn More
              </button>
            </motion.div>

            {/* Date */}
            <motion.div
              variants={fadeUp}
              style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", color: "var(--muted)", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <Calendar size={13} color="var(--gold)" />
              <span>March 7, 2026 · 10 AM – 5 PM EST</span>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
          >
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>Scroll</span>
            <motion.div
              style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--gold), transparent)" }}
              animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            ABOUT
        ══════════════════════════════════════ */}
        <section id="about" className="grid-bg" style={{ position: "relative", background: "var(--surface)", padding: "8rem 2rem" }}>
          <GoldLine />
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
            {/* Left */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="section-num">01</div>
              <div style={{ marginTop: "-2rem", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.6 }} />
                  <span className="font-mono" style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>About the Club</span>
                </div>
                <h2 className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "2rem" }}>
                  Our<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>Craft</em>
                </h2>
                <p style={{ fontSize: "1.05rem", color: "rgba(240,230,211,0.7)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  <strong style={{ color: "var(--gold-light)", fontWeight: 600 }}>FC Hacks</strong> is where high school students learn to build software with intention. We believe in code that's deliberate, design that's thoughtful, and projects that stand the test of time.
                </p>
                <blockquote style={{ borderLeft: "2px solid rgba(196,145,58,0.35)", paddingLeft: "1.25rem", marginTop: "2rem" }}>
                  <p className="font-display" style={{ fontSize: "1.15rem", fontStyle: "italic", color: "rgba(240,230,211,0.5)", lineHeight: 1.7 }}>
                    We may be a small group, but our ambitions are as solid as oak. Now we're bringing that same craftsmanship to our first hackathon.
                  </p>
                </blockquote>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              style={{ position: "relative" }}
            >
              {/* Decorative frame */}
              <div style={{ position: "absolute", inset: -16, border: "1px solid rgba(196,145,58,0.1)", borderRadius: 20, pointerEvents: "none", zIndex: 0 }} />
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(196,145,58,0.2)" }}>
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?fm=jpg&q=60&w=1600&ixlib=rb-4.1.0"
                  alt="Code workshop"
                  style={{ width: "100%", height: 420, objectFit: "cover", display: "block", filter: "brightness(0.8) saturate(0.9)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,6,4,0.8) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem" }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", fontWeight: 600, color: "var(--text)" }}>The Workshop</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.25rem" }}>Where ideas become handcrafted software</div>
                </div>
              </div>
              {/* Floating badge */}
              <div style={{ position: "absolute", top: -20, right: -20, background: "var(--card)", border: "1px solid var(--gold-border)", borderRadius: 12, padding: "0.75rem 1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", zIndex: 10 }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 4 }}>Est.</div>
                <div className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>2024</div>
              </div>
            </motion.div>
          </div>
          <GoldLine style={{ marginTop: "8rem" }} />
        </section>

        {/* ══════════════════════════════════════
            HACKATHON
        ══════════════════════════════════════ */}
        <section id="hackathon" style={{ background: "var(--bg)", padding: "8rem 2rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Header */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ marginBottom: "5rem" }}
            >
              <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.6 }} />
                <span className="font-mono" style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>The Event</span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display"
                style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.95, color: "var(--text)" }}
              >
                Hackathon <em className="shimmer-text ml-4" style={{ fontStyle: "italic" }}>2026</em>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ marginTop: "1.5rem", fontSize: "1.05rem", color: "var(--muted)", maxWidth: 520 }}>
                A 100% online hackathon for Pittsburgh-area middle and high school students of all skill levels.
              </motion.p>
            </motion.div>

            {/* Two Columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
              {/* Left — Details */}
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div style={{ background: "var(--card)", border: "1px solid var(--gold-border)", borderRadius: 20, padding: "2.5rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                    <div style={{ padding: "0.6rem", borderRadius: 10, background: "rgba(196,145,58,0.08)", border: "1px solid var(--gold-border)" }}>
                      <Calendar size={18} color="var(--gold)" />
                    </div>
                    <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--text)" }}>Event Details</h4>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[
                      {
                        icon: <Calendar size={18} color="var(--gold)" />,
                        label: "Date & Time",
                        main: "Saturday, March 7, 2026",
                        sub: "9:00 AM – 9:00 PM EST",
                      },
                      {
                        icon: <Users size={18} color="var(--gold)" />,
                        label: "Who Can Join",
                        main: "Pittsburgh Area Students",
                        sub: "Middle & High School · All skill levels",
                      },
                      {
                        icon: <Trophy size={18} color="var(--gold)" />,
                        label: "Format",
                        main: "100% Online · Team or Solo",
                        sub: "Theme announced at kickoff",
                      },
                    ].map(item => (
                      <div key={item.label} className="detail-row">
                        <div style={{ marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.35rem" }}>{item.label}</div>
                          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>{item.main}</div>
                          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.2rem" }}>{item.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crafted by block */}
                <div style={{ background: "linear-gradient(135deg, rgba(196,145,58,0.05), rgba(196,145,58,0.02))", border: "1px solid var(--gold-border)", borderRadius: 16, padding: "1.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.9rem" }}>
                    <Coffee size={16} color="var(--gold)" />
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Crafted by FC Hacks</span>
                  </div>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.75 }}>
                    We're a small coding club from Fox Chapel High School. This is our first hackathon — a passion project built from the ground up. No corporate sponsors. Just students who love building things.
                  </p>
                </div>
              </motion.div>

              {/* Right — Register */}
              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{ background: "var(--card)", border: "1px solid var(--gold-border)", borderRadius: 20, padding: "2.5rem", position: "relative", overflow: "hidden" }}
              >
                {/* Decorative circle */}
                <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,145,58,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative", zIndex: 1 }}>
                  <h4 className="font-display" style={{ fontSize: "2.2rem", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1rem" }}>
                    Show Your Interest
                  </h4>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: 320, margin: "0 auto" }}>
                    This event runs if we hit our interest goal. Sign up and we'll reach out with all the details.
                  </p>
                </div>

                <a
                  href="https://forms.gle/5Q1ussbR1znusNUy8"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", width: "100%", padding: "1.1rem", borderRadius: 14, fontSize: "1rem", textDecoration: "none", fontFamily: "'Outfit',sans-serif", marginBottom: "2rem" }}
                >
                  <Zap size={18} />
                  I'm Interested
                  <ChevronRight size={16} />
                </a>

                {/* Terminal block */}
                <div style={{ background: "#080806", border: "1px solid var(--faint)", borderRadius: 14, padding: "1.5rem", fontFamily: "'DM Mono',monospace" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    {["#C96262","#C9A862","#62C962"].map(c => (
                      <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
                    ))}
                    <span style={{ marginLeft: "0.75rem", fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase" }}>hackathon_2026.py</span>
                  </div>
                  {[
                    { t: "def ", c: "var(--gold)", rest: [{ t: "hackathon_2026", c: "var(--gold-light)" }, { t: "():", c: "var(--muted)" }] },
                    { indent: true, t: "date ", c: "var(--text)", rest: [{ t: "= ", c: "var(--muted)" }, { t: '"March 7, 2026"', c: "rgba(196,145,58,0.8)" }] },
                    { indent: true, t: "theme ", c: "var(--text)", rest: [{ t: "= ", c: "var(--muted)" }, { t: '"Craft & Create"', c: "rgba(196,145,58,0.8)" }] },
                    { indent: true, t: "location ", c: "var(--text)", rest: [{ t: "= ", c: "var(--muted)" }, { t: '"Online · Pittsburgh"', c: "rgba(196,145,58,0.8)" }] },
                    { indent: true, t: "participants ", c: "var(--text)", rest: [{ t: "= ", c: "var(--muted)" }, { t: "await ", c: "var(--gold)" }, { t: "your_response()", c: "var(--gold-light)" }] },
                    { prompt: true, t: "join_hackathon()", c: "var(--gold-light)" },
                    { success: true, t: "[✓] Reserving your spot...", c: "rgba(100,200,120,0.8)" },
                  ].map((line, i) => (
                    <div key={i} style={{ fontSize: "0.76rem", lineHeight: 2, paddingLeft: line.indent ? "1.5rem" : 0 }}>
                      {line.prompt && <span style={{ color: "var(--gold)", opacity: 0.5 }}>&gt;&gt;&gt; </span>}
                      <span style={{ color: line.c }}>{line.t}</span>
                      {line.rest?.map((r, j) => <span key={j} style={{ color: r.c }}>{r.t}</span>)}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PRIZES  (NEW)
        ══════════════════════════════════════ */}
        <section id="prizes" className="grid-bg" style={{ background: "var(--surface)", padding: "8rem 2rem", position: "relative" }}>
          <GoldLine />
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Header */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "5rem" }}
            >
              <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.6 }} />
                <span className="font-mono" style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Awards</span>
                <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.6 }} />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display"
                style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.95, color: "var(--text)" }}
              >
                The <em className="shimmer-text" style={{ fontStyle: "italic" }}>Prizes</em>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ marginTop: "1.5rem", fontSize: "1.05rem", color: "var(--muted)", maxWidth: 460, margin: "1.5rem auto 0" }}>
                Real cash prizes for the top three teams. Build something remarkable and take home the gold.
              </motion.p>
            </motion.div>

            {/* Podium — 2nd · 1st · 3rd */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", gap: "1.5rem", alignItems: "end" }}>
              {/* 2nd Place */}
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="prize-silver"
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(180,190,200,0.2)",
                  borderRadius: 20,
                  padding: "2.5rem 2rem",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(180,190,200,0.5), transparent)" }} />
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "linear-gradient(135deg,#B0B8C0,#8A9299)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1rem",
                    boxShadow: "0 4px 20px rgba(180,190,200,0.2)",
                  }}>
                    <Award size={26} color="rgba(240,245,250,0.9)" />
                  </div>
                  <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(180,190,200,0.7)" }}>2nd Place</span>
                </div>
                <div className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 700, color: "rgba(200,210,220,0.95)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  $100
                </div>
                <div style={{ marginTop: "1rem", fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>
                  Cash prize for the<br />runner-up team
                </div>
                {/* Podium bar */}
                <div style={{ marginTop: "2rem", marginLeft: -32, marginRight: -32, marginBottom: -40, height: 24, background: "rgba(180,190,200,0.08)", borderTop: "1px solid rgba(180,190,200,0.15)" }} />
              </motion.div>

              {/* 1st Place — CENTER & TALLEST */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="prize-gold"
                style={{
                  background: "linear-gradient(180deg, #141208 0%, var(--card) 100%)",
                  border: "1px solid rgba(196,145,58,0.4)",
                  borderRadius: 24,
                  padding: "3.5rem 2.5rem 3rem",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  zIndex: 2,
                }}
              >
                {/* Gold top bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, var(--gold-light), var(--gold), var(--gold-light), transparent)" }} />
                {/* Glow */}
                <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,145,58,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ marginBottom: "1.75rem", position: "relative", zIndex: 1 }}>
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: 72, height: 72, borderRadius: "50%",
                      background: "linear-gradient(135deg, #C4913A, #E8C97A, #C4913A)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 1.25rem",
                      boxShadow: "0 8px 32px rgba(196,145,58,0.45)",
                    }}
                  >
                    <Trophy size={32} color="#0D0C0A" />
                  </motion.div>
                  <span className="font-mono" style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>1st Place</span>
                </div>

                <div className="shimmer-text font-display" style={{ fontSize: "clamp(3rem,7vw,5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, position: "relative", zIndex: 1 }}>
                  $200
                </div>
                <div style={{ marginTop: "0.5rem", fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--gold)", textTransform: "uppercase" }}>
                  Grand Prize
                </div>
                <div style={{ marginTop: "1.25rem", fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem", color: "rgba(240,230,211,0.6)", lineHeight: 1.6 }}>
                  Cash prize for the<br />winning team
                </div>

                {/* Crown decoration */}
                <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Cormorant',serif", fontSize: "2rem", color: "rgba(196,145,58,0.15)" }}>✦</div>
                <div style={{ position: "absolute", top: 16, left: 20, fontFamily: "'Cormorant',serif", fontSize: "2rem", color: "rgba(196,145,58,0.15)" }}>✦</div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="prize-bronze"
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(180,120,60,0.2)",
                  borderRadius: 20,
                  padding: "2.5rem 2rem",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(180,120,60,0.5), transparent)" }} />
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "linear-gradient(135deg,#B07840,#7A5228)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1rem",
                    boxShadow: "0 4px 20px rgba(180,120,60,0.2)",
                  }}>
                    <Award size={26} color="rgba(255,220,180,0.9)" />
                  </div>
                  <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(180,120,60,0.7)" }}>3rd Place</span>
                </div>
                <div className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 700, color: "rgba(220,160,90,0.95)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  $50
                </div>
                <div style={{ marginTop: "1rem", fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>
                  Cash prize for the<br />third-place team
                </div>
                <div style={{ marginTop: "2rem", marginLeft: -32, marginRight: -32, marginBottom: -40, height: 16, background: "rgba(180,120,60,0.06)", borderTop: "1px solid rgba(180,120,60,0.12)" }} />
              </motion.div>
            </div>

            {/* Note below */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ textAlign: "center", marginTop: "4rem", fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", opacity: 0.7 }}
            >
              Prizes paid out to verified winners following the event
            </motion.p>
          </div>
          <GoldLine style={{ marginTop: "8rem" }} />
        </section>

        {/* ══════════════════════════════════════
            DONATE
        ══════════════════════════════════════ */}
        <section id="donate" style={{ background: "var(--bg)", padding: "8rem 2rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "3.5rem" }}
            >
              <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                <div style={{ padding: "0.7rem", borderRadius: 12, background: "rgba(196,145,58,0.08)", border: "1px solid var(--gold-border)" }}>
                  <Heart size={20} color="var(--gold)" />
                </div>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display"
                style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1.25rem" }}
              >
                Support Our Craft
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: "1.05rem", color: "var(--muted)", lineHeight: 1.75, maxWidth: 540, margin: "0 auto" }}>
                As a student-run club, we're building everything from scratch. Your support helps us create meaningful experiences for young developers in our community.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ background: "var(--card)", border: "1px solid var(--gold-border)", borderRadius: 24, padding: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}
            >
              {/* Where it goes */}
              <div>
                <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", fontWeight: 600, color: "var(--text)", marginBottom: "1.75rem" }}>
                  Where Your Support Goes
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  {[
                    "Hackathon infrastructure and tools",
                    "Learning resources for club members",
                    "Future community events and workshops",
                    "Supporting student-led initiatives",
                  ].map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem", color: "rgba(240,230,211,0.65)", lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div style={{ textAlign: "center" }}>
                <div style={{ background: "rgba(196,145,58,0.05)", border: "1px solid var(--gold-border)", borderRadius: 16, padding: "2rem", marginBottom: "1.5rem" }}>
                  <div className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>Help us reach our goal</div>
                  <div className="font-display shimmer-text" style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1 }}>$2,500</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.4rem" }}>for hackathon excellence</div>
                </div>
                <a
                  href="https://gofund.me/a3b0683db"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.65rem", width: "100%", padding: "1rem", borderRadius: 12, fontSize: "0.95rem", textDecoration: "none", fontFamily: "'Outfit',sans-serif" }}
                >
                  <Heart size={16} />
                  Support Our Mission
                </a>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.08em", color: "rgba(122,110,95,0.5)", marginTop: "1rem" }}>
                  Every contribution helps us craft better experiences
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            JOIN
        ══════════════════════════════════════ */}
        <section id="join" style={{ background: "var(--bg)", padding: "8rem 2rem 6rem", position: "relative", overflow: "hidden" }}>
          <GoldLine />
          {/* BG glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(196,145,58,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.6 }} />
                <span className="font-mono" style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Get Involved</span>
                <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.6 }} />
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-display"
                style={{ fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.95, color: "var(--text)", marginBottom: "1.5rem" }}
              >
                Join the<br /><em className="shimmer-text" style={{ fontStyle: "italic" }}>Workshop</em>
              </motion.h2>

              <motion.p variants={fadeUp} style={{ fontSize: "1.05rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "3rem", maxWidth: 480, margin: "0 auto 3rem" }}>
                Whether you want to join the hackathon, attend weekly club meetings, or support our mission — there's a place for you here.
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "5rem" }}>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdJ8qUgqsHDBEELzE5xT6zU8-g2xYbQiiUIYlD3JOQfC30e4w/viewform?usp=dialog"
                  className="btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", padding: "1rem 2.25rem", borderRadius: 14, fontSize: "0.95rem", letterSpacing: "0.02em", textDecoration: "none", fontFamily: "'Outfit',sans-serif" }}
                >
                  <Users size={17} />
                  Become a Member
                </a>
                <button
                  onClick={() => scrollTo("hackathon")}
                  className="btn-outline"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", padding: "1rem 2.25rem", borderRadius: 14, fontSize: "0.95rem", background: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}
                >
                  Hackathon Details
                  <ChevronRight size={15} />
                </button>
              </motion.div>

              {/* Footer line */}
              <motion.div
                variants={fadeUp}
                style={{ paddingTop: "2.5rem", borderTop: "1px solid var(--faint)" }}
              >
                <p className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(122,110,95,0.45)" }}>
                  FC Hacks · Crafting code with care since 2024 · Fox Chapel Area School District
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}