"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Calendar, Users, Trophy, Code2, Zap } from "lucide-react";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "hackathon", label: "Hackathon" },
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
    <div className="font-serif antialiased text-gray-900 dark:text-gray-100 dark:bg-slate-900">
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#" className="text-xl font-bold tracking-tight text-white">
              FC Hacks
            </a>
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, idx) => (
              <motion.a
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="relative inline-block text-base font-medium group cursor-pointer text-gray-200 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.1,
                }}
                whileHover={{ y: -2 }}
              >
                <span className="relative z-10">{link.label}</span>
                <motion.span
                  aria-hidden
                  className="absolute left-0 bottom-0 h-[2px] w-full origin-left bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400"
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
              className="p-2 rounded-full ring-1 ring-white/10 text-gray-200 hover:text-white transition-colors"
              aria-label="Toggle color mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md bg-white/10 backdrop-blur-sm text-gray-200"
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
              <div className="bg-black/60 rounded-xl p-4 backdrop-blur-md border border-white/10">
                <ul className="flex flex-col gap-3">
                  {NAV_LINKS.map((l) => (
                    <li key={l.id}>
                      <a
                        href={`#${l.id}`}
                        className="block py-2 px-3 rounded-md font-medium hover:bg-white/5 text-gray-200"
                        onClick={() => setMobileOpen(false)}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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

      <section id="about" className="relative min-h-screen bg-[#081f09] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 md:px-6 py-16 md:py-20 items-center relative z-10">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-extrabold text-stone-100 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Who We Are
            </motion.h2>
            <motion.p 
              className="text-stone-200 text-lg max-w-xl leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              FC Hacks is a high school coding club where students learn to build software with intention and craft. We believe every line of code should be deliberate, every design choice thoughtful.
            </motion.p>
            <motion.p 
              className="text-stone-300 text-base max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We&apos;re small, but we&apos;re ambitious. And now we&apos;re ready to bring that same energy to our first hackathon.
            </motion.p>
          </motion.div>
          
          <motion.div
            className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl relative group"
            initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?fm=jpg&q=60&w=1600&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Code on screen"
              className="w-full h-64 sm:h-80 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </section>

      <section id="hackathon" className="relative px-4 md:px-6 py-16 md:py-20 bg-gradient-to-b from-[#131216] to-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-400/30">
                <span className="text-sm font-bold text-violet-300 uppercase tracking-wider">Our First Hackathon</span>
              </div>
            </motion.div>
            <h3 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-violet-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent mb-4">
              March 7, 2026
            </h3>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Online hackathon for Pittsburgh middle & high school students
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <motion.div
                className="rounded-2xl p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Code2 className="text-violet-400" size={28} />
                  Event Details
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <Calendar className="text-violet-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-sm text-violet-300 font-medium mb-1">Date</div>
                      <div className="text-white font-semibold">Saturday, March 7, 2026</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <Users className="text-violet-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-sm text-violet-300 font-medium mb-1">Who Can Join</div>
                      <div className="text-white font-semibold">Pittsburgh area middle & high school students</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <Trophy className="text-violet-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-sm text-violet-300 font-medium mb-1">Format</div>
                      <div className="text-white font-semibold">100% Online · All skill levels welcome</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="rounded-2xl p-6 bg-gradient-to-br from-violet-900/20 to-indigo-900/20 border border-violet-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h5 className="text-lg font-bold text-white mb-3">Hosted by FC Hacks</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We&apos;re a small coding club from Fox Chapel High School. This is our first hackathon, and it happens if enough people show interest. No prizes or fancy sponsors yet — just students building projects together online.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-violet-900/20 to-indigo-900/20 border border-violet-500/30 backdrop-blur-sm relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div
                className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/10 to-pink-500/10 border border-violet-400/20 flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap size={20} className="text-violet-300" />
              </motion.div>
              
              <div className="text-center mb-8">
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Show Interest
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Fill out the form so we know you&apos;re interested. If we get enough responses, we&apos;ll make it happen and reach out with details.
                </p>
              </div>

              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdJ8qUgqsHDBEELzE5xT6zU8-g2xYbQiiUIYlD3JOQfC30e4w/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-6 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xl font-bold shadow-xl overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10">I&apos;m Interested</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>

              <motion.div
                className="relative rounded-2xl overflow-hidden border border-violet-500/20 bg-gradient-to-br from-violet-900/10 to-indigo-900/10 p-4 mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative w-full">
                  <div className="relative w-full aspect-[3/1] rounded-lg bg-gradient-to-br from-gray-900 to-black border-2 border-violet-500/30 overflow-hidden">
                    <div className="absolute inset-3 font-mono text-xs space-y-1.5 opacity-80">
                      <div className="flex items-center gap-3">
                        <span className="text-pink-400">function</span>
                        <span className="text-violet-300">hackathon2026</span>
                        <span className="text-gray-400">()</span>
                        <span className="text-amber-300">{"{"}</span>
                      </div>
                      <div className="ml-6">
                        <span className="text-emerald-400">const</span>
                        <span className="text-gray-300"> date</span>
                        <span className="text-gray-400"> = </span>
                        <span className="text-cyan-300">&quot;March 7, 2026&quot;</span>
                        <span className="text-gray-400">;</span>
                      </div>
                      <div className="ml-6">
                        <span className="text-emerald-400">const</span>
                        <span className="text-gray-300"> theme</span>
                        <span className="text-gray-400"> = </span>
                        <span className="text-cyan-300">&quot;Building Together&quot;</span>
                        <span className="text-gray-400">;</span>
                      </div>
                      <div className="ml-6">
                        <span className="text-emerald-400">const</span>
                        <span className="text-gray-300"> participants</span>
                        <span className="text-gray-400"> = </span>
                        <span className="text-yellow-300">students</span>
                        <span className="text-gray-300">.</span>
                        <span className="text-pink-300">map</span>
                        <span className="text-gray-400">(</span>
                        <span className="text-cyan-300">you</span>
                        <span className="text-gray-400">);</span>
                      </div>
                      <div className="ml-6 text-violet-300">...</div>
                    </div>
                    
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-violet-500/20 to-indigo-500/20" />
                  </div>
                  
                  <div className="relative mx-auto w-32 h-3">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-3 bg-gradient-to-b from-violet-600/30 to-indigo-600/30 rounded-t" />
                  </div>
                  
                  <div className="relative mx-auto w-2/3 h-6 mt-2">
                    <div className="absolute inset-0 bg-gradient-to-b from-violet-800/20 to-indigo-800/20 rounded border border-violet-500/20" />
                    <div className="absolute inset-1 bg-black/30 rounded" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10px] text-violet-300/40 font-mono tracking-wider">
                      fc_hacks_2026
                    </div>
                  </div>
                  
                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500/10 to-pink-500/10 border border-violet-400/20 flex items-center justify-center">
                    <div className="text-[8px] font-mono text-violet-300">{`</>`}</div>
                  </div>
                  
                  <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-400/20 flex items-center justify-center">
                    <div className="text-[8px] font-mono text-indigo-300">{"{}"}</div>
                  </div>
                </div>
              </motion.div>
            
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="join"
        className="px-4 md:px-6 py-20 md:py-28 bg-gradient-to-b from-[#0a0a0f] to-black text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent mb-6"
          >
            Join FC Hacks
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Whether you want to participate in the hackathon or join our club, we&apos;d love to have you. We&apos;re a small group building something meaningful.
          </motion.p>
          <motion.a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdJ8qUgqsHDBEELzE5xT6zU8-g2xYbQiiUIYlD3JOQfC30e4w/viewform?usp=dialog"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-lg font-bold shadow-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10">Get Involved</span>
          </motion.a>
        </div>
      </section>
    </div>
  );
}