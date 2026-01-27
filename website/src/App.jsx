"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Calendar, Users, Trophy, Code2, Zap, Coffee, Heart, ChevronRight, Award, Users as UsersIcon, Sparkles, Leaf, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "hackathon", label: "Hackathon" },
  { id: "donate", label: "Support" },
  { id: "join", label: "Join" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [isDark, setIsDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(newTheme === "dark");
    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <div className="font-serif antialiased text-amber-100 bg-[#0c0c0a] selection:bg-amber-900/30">
      {/* Wood Pattern Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4a574' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
           }} 
      />
      
      {/* Wood Texture Overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23404040' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23595959'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
           }}
      />

      {/* Header - Wood Panel */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-[#1a1814]/95 border-b border-amber-900/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-700/20 to-amber-900/20 blur-xl rounded-full" />
              <a href="#" className="relative text-2xl font-bold tracking-tight text-amber-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-800 to-amber-900 flex items-center justify-center shadow-inner border border-amber-700/50">
                  <Leaf size={24} className="text-amber-300" />
                </div>
                <span className="bg-gradient-to-r from-amber-200 to-amber-300 bg-clip-text text-transparent">
                  FC Hacks
                </span>
              </a>
            </div>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, idx) => (
              <motion.a
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="relative inline-block text-base font-medium group cursor-pointer text-amber-200/90 hover:text-amber-100 transition-colors"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.1,
                }}
                whileHover={{ y: -2 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {link.label}
                  {link.id === "donate" && <Heart size={14} className="text-amber-400" />}
                </span>
                <motion.span
                  aria-hidden
                  className="absolute left-0 bottom-0 h-[2px] w-full origin-left bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{
                    type: "tween",
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: "left center" }}
                />
              </motion.a>
            ))}
          </nav>
          
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-amber-900/20 border border-amber-800/30 text-amber-200 hover:text-amber-100 transition-colors"
              aria-label="Toggle color mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md bg-amber-900/30 backdrop-blur-sm text-amber-200 border border-amber-800/30"
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden px-4 pb-6"
            >
              <div className="bg-[#1a1814] rounded-xl p-4 backdrop-blur-md border border-amber-800/30 shadow-xl">
                <ul className="flex flex-col gap-3">
                  {NAV_LINKS.map((l) => (
                    <li key={l.id}>
                      <a
                        href={`#${l.id}`}
                        className="flex items-center gap-3 py-2 px-3 rounded-md font-medium hover:bg-amber-900/20 text-amber-200/90 border border-transparent hover:border-amber-800/30 transition-all"
                        onClick={() => setMobileOpen(false)}
                      >
                        {l.label}
                        {l.id === "donate" && <Heart size={14} className="text-amber-400" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Hero Section - Smokehouse Vibes */}
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="/codingcinematicvid.mp4"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        <motion.section
          className="relative z-20 max-w-5xl mx-4 md:mx-6 w-full rounded-3xl p-8 md:p-12 backdrop-blur-3xl bg-gradient-to-br from-black/50 via-black/40 to-black/50 border border-white/10 shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          animate={reduceMotion ? undefined : "show"}
        >
          <motion.div variants={itemVariants} className="text-center">
            <motion.div
              className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-400/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-sm font-medium text-violet-300">High School Coding Club</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="text-white">
                <span className="text-white">Build.</span> <span className="text-sky-100">Create.</span> <span className="text-emerald-100">Ship.</span> 
              </span>
            </h1>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-6 text-gray-100 max-w-2xl mx-auto">
            <p className="text-lg md:text-xl flex justify-center">
              We&apos;re a small, Fox Chapel Area club that treats code like craft.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-6 text-gray-100 max-w-2xl mx-auto">
            <p className="text-lg md:text-xl flex justify-center">
              <span className="text-emerald-200 font-bold mr-2">SPECIAL EVENT!</span> We are hosting our own online hackathon!
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdJ8qUgqsHDBEELzE5xT6zU8-g2xYbQiiUIYlD3JOQfC30e4w/viewform?usp=dialog"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Become a member of the club!</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              href="#hackathon"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white/90 font-medium hover:bg-white/5 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.a>
          </motion.div>
          <motion.div 
            variants={itemVariants} 
            className="mt-8 flex items-center justify-center gap-2 text-sm"
          >
            <Calendar size={16} className="text-violet-400" />
            <span className="text-gray-300">March 7, 2026 · Hackathon!</span>
          </motion.div>
        </motion.section>
      </main>


      {/* About Section - Rustic Wood Panel */}
      <section id="about" className="relative min-h-screen bg-[#0f0e0c] flex items-center overflow-hidden">
        {/* Wood Texture Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2c3e1f]/10 rounded-full blur-3xl" />
        </div>
        
        {/* Wood Plank Decoration */}
        <div className="absolute left-0 top-1/4 w-4 h-64 bg-gradient-to-b from-amber-800/20 via-amber-700/10 to-transparent" />
        <div className="absolute right-0 bottom-1/4 w-4 h-64 bg-gradient-to-t from-amber-800/20 via-amber-700/10 to-transparent" />
        
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 px-4 md:px-6 py-16 md:py-24 items-center relative z-10">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Section Header with Wood Accent */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full" />
                <motion.h2 
                  className="text-4xl md:text-5xl font-extrabold text-amber-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Our Craft
                </motion.h2>
              </div>
              
              <motion.p 
                className="text-amber-100/80 text-lg max-w-xl leading-relaxed mb-8 p-6 rounded-xl bg-gradient-to-br from-[#1a1814]/50 to-[#0f0e0c]/50 border border-amber-800/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="text-amber-300 font-semibold">FC Hacks</span> is where high school students learn to build software . We believe in code that's intentional, 
                design that's thoughtful, and projects that stand the test of time.
              </motion.p>
              
              
              <motion.p 
                className="text-amber-200/70 text-base max-w-xl leading-relaxed italic"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                "We may be a small group, but our ambitions are as solid as oak. 
                Now we're bringing that same craftsmanship to our first hackathon."
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group">
              {/* Wood Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-[#2c3e1f]/30 rounded-2xl blur-sm" />
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-amber-800/40 bg-gradient-to-br from-[#1a1814] to-[#0f0e0c]">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 via-transparent to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?fm=jpg&q=60&w=1600&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZSUyMHdvcmtzaG9wfGVufDB8fDB8fHww"
                  alt="Code craftsmanship workshop"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
                  <div className="text-amber-100 text-lg font-semibold">The Workshop</div>
                  <div className="text-amber-200/70 text-sm">Where ideas become handcrafted software</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hackathon Section - Smokehouse Announcement */}
      <section id="hackathon" className="relative px-4 md:px-6 py-16 md:py-24 bg-[#212622] overflow-hidden">
        {/* Wood Panel Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2c3e1f]/10 rounded-full blur-3xl" />
        </div>

        {/* Wood Beam Accents */}
        <div className="absolute top-20 left-0 w-32 h-2 bg-gradient-to-r from-amber-800/20 to-transparent" />
        <div className="absolute top-20 right-0 w-32 h-2 bg-gradient-to-l from-amber-800/20 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
            </motion.div>
            <h3 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent mb-6">
              Hackathon 2026
            </h3>
            <p className="text-lg md:text-xl text-amber-100/80 max-w-2xl mx-auto">
              A 100% online hackathon for Pittsburgh students
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Event Details */}
            <div className="space-y-8">
              <motion.div
                className="rounded-2xl p-8 bg-gradient-to-br from-[#1a1814] to-[#0f0e0c] border-2 border-amber-800/30 shadow-xl"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h4 className="text-2xl font-bold text-amber-100 mb-8 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-900/30 to-amber-800/30">
                    <Calendar className="text-amber-300" size={24} />
                  </div>
                  Event Details
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-amber-900/20 to-amber-800/10 border border-amber-800/30">
                    <Calendar className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-sm text-amber-400 font-medium mb-1">Date & Time</div>
                      <div className="text-amber-100 font-semibold">Saturday, March 7, 2026</div>
                      <div className="text-amber-200/70 text-sm">9:00 AM - 9:00 PM EST</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-amber-900/20 to-amber-800/10 border border-amber-800/30">
                    <UsersIcon className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-sm text-amber-400 font-medium mb-1">Participants</div>
                      <div className="text-amber-100 font-semibold">Pittsburgh Area Students</div>
                      <div className="text-amber-200/70 text-sm">Middle & High School · All skill levels welcome</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-amber-900/20 to-amber-800/10 border border-amber-800/30">
                    <Trophy className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-sm text-amber-400 font-medium mb-1">Format</div>
                      <div className="text-amber-100 font-semibold">100% Online · Team or Solo</div>
                      <div className="text-amber-200/70 text-sm">Themes announced at kickoff</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="rounded-2xl p-8 bg-gradient-to-br from-[#2c3e1f]/20 to-amber-900/20 border border-amber-800/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h5 className="text-xl font-bold text-amber-100 mb-4 flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-amber-900/30">
                    <Coffee size={18} className="text-amber-300" />
                  </div>
                  Crafted by FC Hacks
                </h5>
                <p className="text-amber-200/80 leading-relaxed">
                  We're a small coding club from Fox Chapel High School. This is our first hackathon—a passion project 
                  built from the ground up. No corporate sponsors, no flashy prizes—just students coming together 
                  to build something meaningful, like craftsmen in a smokehouse perfecting their craft.
                </p>
              </motion.div>
            </div>

            {/* Right Column - Registration */}
            <motion.div
              className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-[#1a1814] to-[#0f0e0c] border-2 border-amber-800/40 shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Wood Grain Overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.2'%3E%3Crect x='0' y='0' width='100' height='100'/%3E%3Crect x='0' y='0' width='20' height='100' transform='rotate(45 50 50)'/%3E%3C/g%3E%3C/svg%3E")`,
                   }}
              />
              
              {/* Animated Wood Knot */}
              <motion.div
                className="absolute top-6 right-6 w-20 h-20 rounded-full bg-gradient-to-br from-amber-900/10 to-amber-800/10 border border-amber-700/20 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="text-amber-600/40 text-2xl font-bold">✻</div>
              </motion.div>
              
              <div className="text-center mb-10 relative z-10">
                <h4 className="text-3xl md:text-4xl font-bold text-amber-100 mb-6">
                  Show Your Interest
                </h4>
                <p className="text-amber-200/80 leading-relaxed max-w-md mx-auto">
                  This event happens if we get enough interest from the community. 
                  Let us know you're interested, and we'll reach out with details once we hit our goal.
                </p>
              </div>

              <motion.a
                href="https://forms.gle/5Q1ussbR1znusNUy8"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full inline-flex items-center justify-center gap-4 px-10 py-6 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 text-xl font-bold shadow-2xl overflow-hidden mb-10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  boxShadow: "0 15px 40px rgba(139, 69, 19, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-900"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <Zap size={20} className="text-amber-200" />
                  I'm Interested
                </span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight size={20} />
                </motion.span>
              </motion.a>

              {/* Code Display - Wooden Terminal */}
              <motion.div
                className="relative rounded-xl overflow-hidden border-2 border-amber-800/30 bg-gradient-to-br from-[#0f0e0c] to-black p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="relative">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-amber-600/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                    <div className="ml-4 text-xs text-amber-500 font-mono">smokehouse_hackathon.py</div>
                  </div>
                  
                  {/* Terminal Content */}
                  <div className="font-mono text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600">def</span>
                      <span className="text-amber-300">hackathon_2026</span>
                      <span className="text-amber-500">():</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-amber-400">date</span>
                      <span className="text-amber-500"> = </span>
                      <span className="text-amber-200">"March 7, 2026"</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-amber-400">theme</span>
                      <span className="text-amber-500"> = </span>
                      <span className="text-amber-200">"Craft & Create"</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-amber-400">location</span>
                      <span className="text-amber-500"> = </span>
                      <span className="text-amber-200">"Virtual Smokehouse"</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-amber-400">participants</span>
                      <span className="text-amber-500"> = </span>
                      <span className="text-amber-300">await</span>
                      <span className="text-amber-200"> your_response()</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-amber-500">&gt;&gt;&gt; </span>
                      <span className="text-amber-300">join_hackathon()</span>
                    </div>
                    <div>
                      <span className="text-amber-400">[✓]</span>
                      <span className="text-amber-200 ml-2">Reserving your spot...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="relative px-4 md:px-6 py-20 md:py-28 bg-gradient-to-b from-[#0a0907] to-[#080705] overflow-hidden">
        {/* Wood Beam */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-6 p-3 rounded-full bg-gradient-to-r from-amber-900/30 to-[#2c3e1f]/30 border border-amber-700/30">
              <Heart size={24} className="text-amber-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-amber-100 mb-6">
              Support Our Craft
            </h3>
            <p className="text-lg md:text-xl text-amber-200/80 max-w-2xl mx-auto leading-relaxed">
              As a student-run club, we're building everything from scratch. Your support helps us 
              create meaningful experiences for young developers in our community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#1a1814] to-[#0f0e0c] rounded-2xl p-8 border-2 border-amber-800/30 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold text-amber-100 mb-4">Where Your Support Goes</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-amber-200/80">Hackathon infrastructure and tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-amber-200/80">Learning resources for club members</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-amber-200/80">Future community events and workshops</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-amber-200/80">Supporting student-led initiatives</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="mb-6 p-6 rounded-xl bg-gradient-to-br from-amber-900/20 to-[#2c3e1f]/20 border border-amber-800/30">
                  <div className="text-amber-400 text-sm mb-2">Help Us Reach Our Goal</div>
                  <div className="text-3xl font-bold text-amber-200">$2,500</div>
                  <div className="text-amber-300/70 text-sm">for hackathon excellence</div>
                </div>
                
                <motion.a
                  href="https://gofund.me/a3b0683db"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 w-full px-8 py-5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 text-lg font-bold shadow-xl overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    boxShadow: "0 10px 30px rgba(139, 69, 19, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-900"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <Heart size={20} className="text-amber-200" />
                    Support Our Mission
                  </span>
                </motion.a>
                
                <p className="text-amber-400/60 text-sm mt-4">
                  Every contribution helps us craft better experiences
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Section - Final Call */}
      <section id="join" className="relative px-4 md:px-6 py-20 md:py-28 bg-gradient-to-b from-[#080705] to-black overflow-hidden">
        {/* Wood Texture */}
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Crect x='0' y='0' width='100' height='100'/%3E%3Crect x='0' y='0' width='20' height='100' transform='rotate(45 50 50)'/%3E%3Crect x='0' y='0' width='20' height='100' transform='rotate(135 50 50)'/%3E%3Crect x='0' y='0' width='20' height='100' transform='rotate(90 50 50)'/%3E%3C/g%3E%3C/svg%3E")`,
             }}
        />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-200 to-amber-300 bg-clip-text text-transparent mb-6">
              Join the Workshop
            </h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-amber-200/80 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Whether you want to participate in the hackathon, join our weekly club meetings, 
              or support our mission—there's a place for you in our workshop.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdJ8qUgqsHDBEELzE5xT6zU8-g2xYbQiiUIYlD3JOQfC30e4w/viewform?usp=dialog"
              className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 text-lg font-bold shadow-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: "0 15px 40px rgba(139, 69, 19, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-900"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <UsersIcon size={20} />
                Become a Member
              </span>
            </motion.a>
            
            <motion.a
              href="#hackathon"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-xl border-2 border-amber-700/50 text-amber-200 font-medium hover:bg-amber-900/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Learn About Hackathon</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
          
          {/* Final Wood Accent */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-amber-900/30"
          >
            <p className="text-center text-amber-400/60 text-sm">
              FC Hacks · Crafting code with care since 2024 · Fox Chapel Area School District
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}