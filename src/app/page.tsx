
"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SkillsSection from '../components/SkillsSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import { useRef, RefObject } from 'react';
import Topbar from '../components/Topbar';

export default function Home() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const skillsRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const educationRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const experienceRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const projectsRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

    const scrollToSection = (ref: RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <div className="min-h-screen w-full bg-black font-sans relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <Topbar
                onSkillsClick={() => scrollToSection(skillsRef)}
                onEducationClick={() => scrollToSection(educationRef)}
                onExperienceClick={() => scrollToSection(experienceRef)}
                onProjectsClick={() => scrollToSection(projectsRef)}
            />

            <main className="mx-auto max-w-5xl px-4 py-12 md:py-24">
                {/* Enhanced Hero Section */}
                <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 mb-20 md:mb-32 relative">
                    <motion.div
                        className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Available for work
                        </div>

                        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-sky-300 animate-gradient-x drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">Venkat</span>
                        </h1>

                        <div className="space-y-6 max-w-xl">
                            <p className="text-lg md:text-2xl font-semibold text-blue-400">
                                Full Stack Cloud Engineer
                            </p>

                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                I build scalable, cloud-native solutions with <span className="text-zinc-200 font-medium">AWS</span> and <span className="text-zinc-200 font-medium">DevOps</span> best practices. Passionate about turning complex problems into elegant, high-performance applications.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1 flex justify-center md:justify-end items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="relative group">
                            {/* Animated Rings around Profile */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                            <div className="absolute -inset-0.5 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-30 group-hover:opacity-100 transition duration-500 animate-tilt"></div>

                            <motion.div
                                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-black bg-zinc-900 shadow-2xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image
                                    src="/profile-pic.png"
                                    alt="Venkata Rohith Pesala"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                />
                            </motion.div>

                            {/* Floating Tech Badges */}
                            <motion.div
                                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-zinc-900/90 backdrop-blur-xl p-2 md:p-3 rounded-xl md:rounded-2xl border border-white/10 shadow-2xl z-20"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <img src="/skill-icons/aws.png" alt="AWS" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                            </motion.div>
                            <motion.div
                                className="absolute -bottom-2 -left-2 md:-bottom-2 md:-left-6 bg-zinc-900/90 backdrop-blur-xl p-2 md:p-3 rounded-xl md:rounded-2xl border border-white/10 shadow-2xl z-20"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <img src="/skill-icons/react.png" alt="React" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                            </motion.div>
                            <motion.div
                                className="absolute top-1/2 -left-6 md:-left-12 bg-zinc-900/90 backdrop-blur-xl p-2 md:p-2.5 rounded-lg md:rounded-xl border border-white/10 shadow-2xl z-10"
                                animate={{ x: [0, 6, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            >
                                <img src="/skill-icons/nextjs.png" alt="Next.js" className="w-5 h-5 md:w-6 md:h-6 object-contain invert" />
                            </motion.div>
                            <motion.div
                                className="absolute top-1/4 -right-6 md:-right-8 bg-zinc-900/90 backdrop-blur-xl p-2 md:p-2.5 rounded-lg md:rounded-xl border border-white/10 shadow-2xl z-10"
                                animate={{ x: [0, -6, 0] }}
                                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                            >
                                <img src="/skill-icons/ts.png" alt="TypeScript" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Animated Scroll Indicator */}
                <motion.div
                    className="flex flex-col items-center gap-2 mb-20 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 2, duration: 1 }}
                    onClick={() => scrollToSection(skillsRef)}
                >
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Scroll to explore</span>
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>

                <div ref={skillsRef} className="scroll-mt-32"><SkillsSection /></div>
                <div ref={educationRef} className="scroll-mt-32"><EducationSection /></div>
                <div ref={experienceRef} className="scroll-mt-32"><ExperienceSection /></div>
                <div ref={projectsRef} className="scroll-mt-32"><ProjectsSection /></div>
            </main>
            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 bg-black border-2 border-blue-400 hover:bg-zinc-900 text-blue-400 rounded-full shadow-lg p-1.5 transition-all duration-300 animate-fade-in w-10 h-10 flex items-center justify-center"
                    aria-label="Scroll to top"
                >
                    <svg width="20" height="20" fill="none" stroke="#60a5fa" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            )}
            {/* Professional Footer Section */}
            <footer className="w-full border-t border-zinc-800 bg-black pt-16 pb-8">
                <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
                    <motion.div 
                        className="text-center mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                            Let's Build Something <span className="text-blue-400">Extraordinary</span>
                        </h2>
                        <p className="text-zinc-400 max-w-lg mx-auto text-lg leading-relaxed">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
                            <span className="block mt-2 font-medium text-blue-400/80">Feel free to reach out!</span>
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <a 
                            href="mailto:vr.pesala@gmail.com"
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-black font-bold hover:bg-blue-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                        >
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z" />
                            </svg>
                            Say Hello
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/venkatarohithpesala/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white font-bold hover:bg-zinc-800 hover:border-blue-500/50 transition-all active:scale-95"
                        >
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.595 1.997 3.595 4.59v5.606z" />
                            </svg>
                            LinkedIn
                        </a>
                    </div>

                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm border-t border-zinc-900 pt-8">
                        <p>© {new Date().getFullYear()} Venkata Rohith Pesala. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span className="hover:text-blue-400 transition-colors cursor-default">Built with Next.js & AWS</span>
                            <span className="hover:text-blue-400 transition-colors cursor-default">Cloud Native</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
