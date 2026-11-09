"use client";

/* ════════════════════════════════════════════════════════════════════════════
   HACKATHON ORGANIZATION — Landing page (single file)

   Install:
     npm i three @react-three/fiber @react-three/drei framer-motion lucide-react lenis
     (React 18 projects: @react-three/fiber@8 @react-three/drei@9)

   Models:
     .glb files live in /public and are listed in HERO_MODELS.
     Missing / broken models are skipped silently, so one bad file won't break the page.
════════════════════════════════════════════════════════════════════════════ */

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  motion, AnimatePresence, MotionConfig,
  useScroll, useTransform, useReducedMotion, useInView,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import Lenis from "lenis";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";

/* ─────────────────────────────────────────
   CONFIG — edit these
───────────────────────────────────────── */
const ORG_NAME   = "FC Hackathon";
const EVENT_NAME = "Hackathon";
const EVENT_YEAR = "2027";

const GOOGLE_FORM_URL = "https://forms.gle/your-form-id"; // ← paste your Google Form link


// Where sign-ups get POSTed as JSON (e.g. a Formspree / Basin / your own API route).
// While empty, submissions are only simulated — nothing is saved.
const FORM_ENDPOINT = "";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fm=jpg&q=60&w=1600&ixlib=rb-4.1.0";

// Smooth-scroll feel. Lower = floatier (0.05–0.12 is the useful range).
const SCROLL_LERP = 0.08;

/*
  Hero models
  - layer:    "back" = behind the title, "front" = in front of it
  - x, y:     screen position as a fraction (-0.5 = left/bottom edge, 0.5 = right/top edge)
  - size:     fraction of the screen's shorter side (models are auto-normalized, so any export scale works)
  - z:        depth inside its layer (negative = further away)
  - rotation: fixed orientation in radians [x, y, z] — models never spin
  - bob:      up/down float amplitude (fraction of screen height)
  - bobSpeed: float speed
  - mobile:   optional overrides for portrait screens
*/
const HERO_MODELS = [
  {
    url: "/macbook.glb", layer: "back",
    x: -0.30, y: 0.20, z: -2, size: 0.55,
    rotation: [0.2, 0.6, 0], bob: 0.015, bobSpeed: 0.6, phase: 0,
    mobile: { x: -0.22, y: 0.17, size: 0.62 },
  },
  {
    url: "/motherboard.glb", layer: "front",
    x: 0.28, y: -0.22, z: 1, size: 0.42,
    // Stood up 90° so the board faces the viewer (use -Math.PI / 2 if it ends up facing away)
    rotation: [Math.PI / 2, 0, 0], bob: 0.012, bobSpeed: 0.5, phase: 1.7,
    mobile: { x: 0.22, y: -0.15, size: 0.5 },
  },
  {
    url: "/github.glb", layer: "back",
    x: 0.33, y: 0.27, z: -3, size: 0.42,
    rotation: [0.3, 0.2, -0.2], bob: 0.018, bobSpeed: 0.7, phase: 3.1,
    mobile: { x: 0.26, y: 0.24, size: 0.48 },
  },
];

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const OLIVE = "#B6BC86";
const EASE  = [0.22, 1, 0.36, 1];
const CAM_Z = 10;
const FOV   = 35;

const EXPERIENCE = ["Just starting", "Vibe coder", "Hobbyist", "Professional"];
const TEAM       = ["Solo", "Have a team", "Looking for one"];

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg:      #000000;
  --fg:      #F5F4EF;
  --muted:   rgba(245,244,239,0.82);
  --faint:   rgba(245,244,239,0.58);
  --line:    rgba(245,244,239,0.22);
  --olive:   ${OLIVE};
  --display: 'Anton', Impact, 'Arial Narrow', sans-serif;
  --sans:    'Inter Tight', system-ui, sans-serif;
  --mono:    'JetBrains Mono', ui-monospace, monospace;
  --ease:    cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { background: var(--bg); }
body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
::selection { background: var(--olive); color: #000; }
a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; color: inherit; }

/* Lenis */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--olive); }

.ho-root { position: relative; z-index: 1; }

/* Type */
.wrap    { max-width: 1280px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 48px); }
.display { font-family: var(--display); font-weight: 400; text-transform: uppercase; letter-spacing: -0.01em; line-height: 0.9; }
.label   { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--olive); }
.meta    { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--faint); }
.olive   { color: var(--olive); }

/* Nav */
.nav { position: fixed; inset: 0 0 auto; z-index: 50; border-bottom: 1px solid transparent; transition: background .4s var(--ease), border-color .4s var(--ease); }
.nav.scrolled { background: rgba(0,0,0,0.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-color: var(--line); }
.nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.nav-brand { font-family: var(--display); text-transform: uppercase; font-size: 18px; letter-spacing: 0.01em; }
.nav-links { display: flex; align-items: center; gap: 28px; }
.nav-link  { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); transition: color .25s; }
.nav-link:hover { color: var(--fg); }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  height: 40px; padding: 0 18px; border-radius: 999px; cursor: pointer;
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
  border: 1px solid var(--fg);
  transition: background .3s var(--ease), color .3s var(--ease), border-color .3s var(--ease), opacity .3s;
}
.btn-solid { background: var(--fg); color: #000; }
.btn-solid:hover { background: var(--olive); border-color: var(--olive); }
.btn-ghost { background: transparent; color: var(--fg); border-color: var(--line); }
.btn-ghost:hover { border-color: var(--olive); color: var(--olive); }
.btn-lg { height: 52px; padding: 0 26px; font-size: 12px; }
.btn:disabled { opacity: 0.5; cursor: wait; }

/* Hero */
.hero { position: relative; height: 100svh; min-height: 640px; overflow: hidden; }
.layer { position: absolute; inset: 0; pointer-events: none; }
.layer-back  { z-index: 1; }
.layer-text  { z-index: 2; display: grid; place-items: center; padding: 0 16px; }
.layer-front { z-index: 3; }
.hero-title { font-size: clamp(3rem, 13.5vw, 13.5rem); text-align: center; }
.mask { display: block; overflow: hidden; padding-top: 0.06em; }
.mask > span { display: block; }
.hero-sub { margin-top: clamp(20px, 3vw, 36px); text-align: center; font-size: clamp(15px, 1.6vw, 19px); font-weight: 300; color: var(--muted); }
.hero-sub em { font-style: normal; color: var(--olive); }
.hero-cta { margin-top: 28px; display: flex; justify-content: center; pointer-events: auto; }
.hero-foot { position: absolute; z-index: 4; left: 0; right: 0; bottom: 28px; display: flex; justify-content: space-between; align-items: center; }
.scroll-cue { display: inline-flex; align-items: center; gap: 8px; transition: color .25s; }
.scroll-cue:hover { color: var(--fg); }

/* Sections */
.section { position: relative; padding: clamp(110px, 15vw, 200px) 0; }
.section-head { display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 20px; border-bottom: 1px solid var(--line); margin-bottom: clamp(56px, 8vw, 110px); }
.display-md { font-size: clamp(2.75rem, 6.5vw, 6rem); }
.body { font-size: clamp(16px, 1.25vw, 18px); line-height: 1.7; font-weight: 300; color: var(--muted); max-width: 52ch; }
.body + .body { margin-top: 1.1em; }
.body strong { color: var(--fg); font-weight: 500; }

/* About */
.about-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(40px, 7vw, 112px); align-items: center; }
.about-copy .body:first-of-type { margin-top: 32px; }
.about-media { position: relative; aspect-ratio: 4 / 5; overflow: hidden; border-radius: 4px; background: #0a0a0a; }
.about-media img {
  position: absolute; left: 0; top: -20%; width: 100%; height: 140%; object-fit: cover; display: block;
  filter: grayscale(1) contrast(1.06) brightness(0.8);
  transition: filter 0.9s var(--ease);
}
.about-media:hover img { filter: grayscale(0.15) contrast(1.02) brightness(0.9); }
.about-media::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent 45%); pointer-events: none; }
.about-media figcaption { position: absolute; left: 20px; right: 20px; bottom: 18px; z-index: 1; display: flex; justify-content: space-between; }

.principles { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: clamp(96px, 12vw, 170px); border-top: 1px solid var(--line); }
.principle { padding: 28px 32px 0 0; }
.principle + .principle { padding-left: 32px; border-left: 1px solid var(--line); }
.principle h3 { font-size: clamp(1.6rem, 2.4vw, 2.1rem); margin: 14px 0 12px; }
.principle p { font-size: 15px; line-height: 1.65; font-weight: 300; color: var(--muted); max-width: 34ch; }

/* Sign up */
.signup-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(40px, 7vw, 112px); align-items: start; }
.facts { margin-top: 40px; border-top: 1px solid var(--line); }
.fact { display: grid; grid-template-columns: 96px 1fr; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--line); font-size: 15px; }
.fact dt { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--faint); padding-top: 3px; }
.fact dd { color: var(--fg); font-weight: 400; }

.form { display: grid; gap: 32px; }
.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.field { display: grid; gap: 10px; }
.field > label, .field-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.field .opt { color: var(--faint); text-transform: none; letter-spacing: 0.02em; }
.input {
  width: 100%; background: transparent; border: none; border-bottom: 1px solid var(--line); border-radius: 0;
  padding: 10px 0 12px; font-size: 18px; font-weight: 300; outline: none;
  transition: border-color .3s var(--ease);
}
.input:focus { border-color: var(--olive); }
.input::placeholder { color: rgba(245,244,239,0.22); }
textarea.input { resize: vertical; min-height: 96px; line-height: 1.5; }

.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  height: 36px; padding: 0 15px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--line); background: transparent; color: var(--muted); font-size: 14px;
  transition: background .25s, color .25s, border-color .25s;
}
.chip:hover { border-color: var(--faint); color: var(--fg); }
.chip[aria-pressed="true"] { background: var(--fg); color: #000; border-color: var(--fg); }

.form-foot { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 8px; }
.fine  { font-size: 12px; color: var(--faint); }
.error { font-size: 13px; color: #D9907C; }

.success { border: 1px solid var(--line); border-radius: 4px; padding: clamp(32px, 5vw, 56px); background: rgba(0,0,0,0.6); }
.success-icon { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--olive); color: #000; margin-bottom: 28px; }
.success h3 { font-size: clamp(2.2rem, 4vw, 3.4rem); margin-bottom: 16px; }

/* Footer */
.footer { border-top: 1px solid var(--line); padding: 32px 0 40px; }
.foot-inner { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }

/* Responsive */
@media (max-width: 900px) {
  .about-grid, .signup-grid { grid-template-columns: 1fr; }
  .principles { grid-template-columns: 1fr; }
  .principle, .principle + .principle { padding: 28px 0; border-left: none; }
  .principle + .principle { border-top: 1px solid var(--line); }
  .row-2 { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .nav-link { display: none; }
  .hero-foot .meta:first-child { display: none; }
  .hero-foot { justify-content: center; }
}
`;

/* ════════════════════════════════════════════════════════════════════════════
   SMOOTH SCROLL (Lenis)
════════════════════════════════════════════════════════════════════════════ */
function useLenis(disabled) {
  useEffect(() => {
    if (disabled) return;

    const lenis = new Lenis({ lerp: SCROLL_LERP, smoothWheel: true });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Route in-page anchor links (#about, #signup, #top) through Lenis
    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (hash === "#top" || hash === "#") {
        e.preventDefault();
        lenis.scrollTo(0);
        return;
      }
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -64 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [disabled]);
}

/* ════════════════════════════════════════════════════════════════════════════
   3D
════════════════════════════════════════════════════════════════════════════ */

// Catches missing/broken .glb files so one bad model doesn't take the page down
class ModelBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.warn(`[3D] Couldn't load "${this.props.url}" — skipping it.`, error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Loads a GLB, centers it and scales it so its largest dimension = 1 unit
function NormalizedModel({ url }) {
  const { scene } = useGLTF(url);
  const object = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    clone.position.sub(center);
    const fit = new THREE.Group();
    fit.add(clone);
    fit.scale.setScalar(1 / maxDim);
    return fit;
  }, [scene]);
  return <primitive object={object} />;
}

// Transparent canvas with a shared camera setup (so layers line up)
function Stage({ children, active = true }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, CAM_Z], fov: FOV }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {children}
    </Canvas>
  );
}

// Neutral studio light + a soft olive rim. No network HDRs.
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} />
      <directionalLight position={[-6, -2, -4]} intensity={1.1} color={OLIVE} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 5]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} color={OLIVE} position={[-6, 0, -2]} scale={[6, 6, 1]} />
        <Lightformer form="ring" intensity={1.5} position={[5, 2, 3]} scale={2} />
      </Environment>
    </>
  );
}

/* ── Hero models: fixed orientation, gentle bob only ── */
function HeroModel({ cfg, reduced }) {
  const group = useRef(null);

  useFrame(({ viewport, clock }) => {
    const g = group.current;
    if (!g) return;

    const m = viewport.aspect < 0.8 && cfg.mobile ? cfg.mobile : null;
    const x = m?.x ?? cfg.x;
    const y = m?.y ?? cfg.y;
    const size = m?.size ?? cfg.size;

    // Screen-space placement, corrected for depth
    const depth = (CAM_Z - cfg.z) / CAM_Z;
    const w = viewport.width * depth;
    const h = viewport.height * depth;
    const short = Math.min(viewport.width, viewport.height) * depth;

    const bob = reduced ? 0 : Math.sin(clock.elapsedTime * cfg.bobSpeed + cfg.phase) * cfg.bob * h;
    g.position.set(x * w, y * h + bob, cfg.z);
    g.scale.setScalar(size * short);
  });

  return (
    <group ref={group} rotation={cfg.rotation}>
      <NormalizedModel url={cfg.url} />
    </group>
  );
}

function HeroScene({ layer, reduced }) {
  return (
    <>
      <SceneLights />
      {HERO_MODELS.filter((m) => m.layer === layer).map((cfg) => (
        <ModelBoundary key={cfg.url} url={cfg.url}>
          <Suspense fallback={null}>
            <HeroModel cfg={cfg} reduced={reduced} />
          </Suspense>
        </ModelBoundary>
      ))}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   UI HELPERS
════════════════════════════════════════════════════════════════════════════ */

// Shifts children while they cross the viewport. speed > 0 = faster than the page, < 0 = slower.
function Parallax({ children, speed = 80, className }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [speed, -speed]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTIONS
════════════════════════════════════════════════════════════════════════════ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
    >
      <div className="wrap nav-inner">
        <a href="#top" className="nav-brand">{ORG_NAME}</a>
        <nav className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#signup" className="btn btn-solid">Sign up</a>
        </nav>
      </div>
    </motion.header>
  );
}

function Hero({ reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Over one screen of scroll: back layer lags, title outruns the page, front layer outruns everything
  const r = reduced ? 0 : 1;
  const backY  = useTransform(scrollYProgress, [0, 1], [0, 320 * r]);
  const textY  = useTransform(scrollYProgress, [0, 1], [0, -280 * r]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -520 * r]);
  const fade   = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="hero">
      {/* Models behind the title */}
      <motion.div className="layer layer-back" style={{ y: backY }} aria-hidden="true">
        <Stage active={inView}>
          <HeroScene layer="back" reduced={reduced} />
        </Stage>
      </motion.div>

      {/* Title */}
      <motion.div className="layer layer-text" style={{ y: textY, opacity: fade }}>
        <div>
          <h1 className="display hero-title" aria-label={ORG_NAME}>
            {ORG_NAME.split(" ").map((word, i) => (
              <span key={`${word}-${i}`} className="mask" aria-hidden="true">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.1, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          >
            Hosting a hackathon for <em>{EVENT_YEAR}</em>.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          >
            <a href="#signup" className="btn btn-ghost">
              Get on the list <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Models in front of the title */}
      <motion.div className="layer layer-front" style={{ y: frontY }} aria-hidden="true">
        <Stage active={inView}>
          <HeroScene layer="front" reduced={reduced} />
        </Stage>
      </motion.div>

      <motion.div className="wrap hero-foot" style={{ opacity: fade }}>
        <span className="meta">Regional · Open to everyone</span>
        <a href="#about" className="meta scroll-cue">
          Scroll <ArrowDown size={12} />
        </a>
      </motion.div>
    </section>
  );
}

function About() {
  const mediaRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="about-grid">
          {/* Photo: frame lags behind the page, image drifts inside it */}
          <Parallax speed={-70}>
            <figure ref={mediaRef} className="about-media">
              <motion.img src={ABOUT_IMAGE} alt="Code on a laptop screen" style={{ y: imgY }} />
              <figcaption>
                <span className="meta">Where it started</span>
                <span className="meta">A classroom, after the bell</span>
              </figcaption>
            </figure>
          </Parallax>

          {/* Copy: outruns the page */}
          <Parallax speed={130} className="about-copy">
            <Reveal>
              <h2 className="display display-md">
                Started in <br /><span className="olive">Fox Chapel</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body">
                This hackathon is hosted by {" "}<strong>FC Hacks</strong>, a student-run club at Fox Chapel Area High School.
                We started 2 years ago as a small group of friends who liked to build things together.
              </p>
              <p className="body">
                We spent our free time making websites, apps, and games, and we wanted to share that with our classmates.
              </p>
              <p className="body">
                This year, we are hosting our 2nd hackahon, and we are excited to welcome anyone who wants to compete. Whether you are a beginner or a seasoned hacker, we hope you will join us for a day of creativity and fun.
              </p>
            </Reveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, optional, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {optional && <span className="opt"> — optional</span>}
      </label>
      {children}
    </div>
  );
}



function SignUp() {
  const facts = [
    ["When", `${EVENT_YEAR} · Date TBA`],
    ["Where", "Regional · Venue TBA"],
    ["Who", "Anyone who builds. Vibe coders welcome."],
    ["Format", "Solo or teams"],
  ];

  return (
    <section id="signup" className="section">
      <div className="wrap">
        <div className="signup-grid" style={{ alignItems: "center" }}>
          {/* Left — heading, copy, button */}
          <Parallax speed={110}>
            <Reveal>
              <h2 className="display display-md">
                Save<br />your <span className="olive">spot.</span>
              </h2>
              <p className="body" style={{ marginTop: 28 }}>
                Date and venue drop soon. Get on the list and you&apos;ll hear about everything first:
                schedule, location, themes, and prizes.
              </p>

              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
                style={{
                  marginTop: 44,
                  height: 68,
                  padding: "0 44px",
                  fontSize: 14,
                  letterSpacing: "0.16em",
                  gap: 12,
                  boxShadow: "0 0 0 6px rgba(182,188,134,0.12), 0 10px 40px rgba(182,188,134,0.18)",
                }}
              >
                Sign up now <ArrowUpRight size={20} />
              </a>
            </Reveal>
          </Parallax>

          {/* Right — event info */}
          <Parallax speed={50}>
            <Reveal delay={0.1}>
              <dl className="facts" style={{ marginTop: 0 }}>
                {facts.map(([k, v]) => (
                  <div key={k} className="fact" style={{ padding: "22px 0", fontSize: 17 }}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const reduced = useReducedMotion() ?? false;
  useLenis(reduced);

  return (
    <MotionConfig reducedMotion="user">
      <style>{GLOBAL_CSS}</style>
      <div className="ho-root">
        <Nav />
        <main>
          <Hero reduced={reduced} />
          <About />
          <SignUp />
        </main>
      </div>
    </MotionConfig>
  );
}