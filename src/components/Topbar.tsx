"use client";
import React, { useState } from "react";

interface TopbarProps {
    onSkillsClick: () => void;
    onEducationClick: () => void;
    onExperienceClick: () => void;
    onProjectsClick: () => void;
}

export default function Topbar({
    onSkillsClick,
    onEducationClick,
    onExperienceClick,
    onProjectsClick,
}: TopbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Menu items for reuse
    const menuItems = (
        <>
            <button
                onClick={() => { setMenuOpen(false); onSkillsClick(); }}
                className="w-full text-left relative px-4 py-2 rounded hover:bg-blue-600/20 focus:bg-blue-600/30 focus:outline-none transition-colors duration-200 group text-white"
            >
                <span className="group-hover:text-blue-400 group-focus:text-blue-400 transition-colors text-white">Skills</span>
            </button>
            <button
                onClick={() => { setMenuOpen(false); onEducationClick(); }}
                className="w-full text-left relative px-4 py-2 rounded hover:bg-blue-600/20 focus:bg-blue-600/30 focus:outline-none transition-colors duration-200 group text-white"
            >
                <span className="group-hover:text-blue-400 group-focus:text-blue-400 transition-colors text-white">Education</span>
            </button>
            <button
                onClick={() => { setMenuOpen(false); onExperienceClick(); }}
                className="w-full text-left relative px-4 py-2 rounded hover:bg-blue-600/20 focus:bg-blue-600/30 focus:outline-none transition-colors duration-200 group text-white"
            >
                <span className="group-hover:text-blue-400 group-focus:text-blue-400 transition-colors text-white">Experience</span>
            </button>
            <button
                onClick={() => { setMenuOpen(false); onProjectsClick(); }}
                className="w-full text-left relative px-4 py-2 rounded hover:bg-blue-600/20 focus:bg-blue-600/30 focus:outline-none transition-colors duration-200 group text-white"
            >
                <span className="group-hover:text-blue-400 group-focus:text-blue-400 transition-colors text-white">Projects</span>
            </button>
        </>
    );

    return (
        <nav className="sticky top-0 z-50 bg-white/10 dark:bg-black/60 backdrop-blur-lg border-b border-zinc-700/60 py-2 px-3 sm:py-3 sm:px-6 flex items-center shadow-[0_4px_24px_0_rgba(0,0,0,0.12)] rounded-b-2xl transition-all relative text-white">
            {/* Branding - Pro Move: Always have your name/logo on the left */}
            <div className="hidden sm:block mr-8">
                <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 tracking-tighter cursor-default">
                    VENKAT
                </span>
            </div>

            {/* Hamburger for mobile */}
            <div className="flex w-full items-center justify-between sm:hidden">
                {/* Branding mobile */}
                <span className="text-lg font-black text-white tracking-tighter mr-2">VRP</span>
                
                <div className="flex items-center gap-1.5 justify-end">
                    {/* LinkedIn and Email icons (mobile) - Visible in Bar */}
                    <a
                        href="https://www.linkedin.com/in/venkatarohithpesala/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-600/20 transition-colors text-white"
                    >
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.595 1.997 3.595 4.59v5.606z" />
                        </svg>
                    </a>
                    <a
                        href="mailto:vr.pesala@gmail.com"
                        aria-label="Email"
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-600/20 transition-colors text-white"
                    >
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z" />
                        </svg>
                    </a>
                    {/* Resume Download Button (mobile) - Modern Glassmorphism */}
                    <a
                        href="/Venkata_Rohith_Pesala.pdf"
                        download
                        aria-label="Download Resume"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/30 text-blue-400 font-bold text-xs hover:bg-blue-500/20 hover:border-blue-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(59,130,246,0.1)] ml-1"
                        style={{ textDecoration: 'none' }}
                    >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
                        </svg>
                        <span>Resume</span>
                    </a>

                    {/* Hamburger Button (Mobile Only) - Moved to far right for better thumb reach */}
                    <button
                        className="p-1 focus:outline-none ml-1"
                        aria-label="Open menu"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden sm:flex w-full items-center justify-between">
                <div className="flex items-center gap-4 md:gap-10 text-xs md:text-base font-semibold text-white">
                    <button
                        onClick={onSkillsClick}
                        className="relative px-4 py-1 rounded-full hover:bg-blue-600/20 focus:bg-blue-600/30 focus:outline-none transition-colors duration-200 group"
                    >
                        <span className="group-hover:text-blue-400 group-focus:text-blue-400 transition-colors text-white">Skills</span>
                        <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-blue-400 rounded-full group-hover:w-3/4 group-focus:w-3/4 transition-all duration-300" style={{ transform: 'translateX(-50%)' }}></span>
                    </button>
                    <button
                        onClick={onEducationClick}
                        className="relative px-4 py-1 rounded-full hover:bg-blue-600/20 focus:bg-blue-600/30 focus:outline-none transition-colors duration-200 group"
                    >
                        <span className="group-hover:text-blue-400 group-focus:text-blue-400 transition-colors text-white">Education</span>
                        <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-blue-400 rounded-full group-hover:w-3/4 group-focus:w-3/4 transition-all duration-300" style={{ transform: 'translateX(-50%)' }}></span>
                    </button>
                    <button
                        onClick={onExperienceClick}
                        className="relative px-4 py-1 rounded-full hover:bg-blue-600/20 focus:bg-blue-600/30 focus:outline-none transition-colors duration-200 group"
                    >
                        <span className="group-hover:text-blue-400 group-focus:text-blue-400 transition-colors text-white">Experience</span>
                        <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-blue-400 rounded-full group-hover:w-3/4 group-focus:w-3/4 transition-all duration-300" style={{ transform: 'translateX(-50%)' }}></span>
                    </button>
                    <button
                        onClick={onProjectsClick}
                        className="relative px-4 py-1 rounded-full hover:bg-blue-600/20 focus:bg-blue-600/30 focus:outline-none transition-colors duration-200 group"
                    >
                        <span className="group-hover:text-blue-400 group-focus:text-blue-400 transition-colors text-white">Projects</span>
                        <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-blue-400 rounded-full group-hover:w-3/4 group-focus:w-3/4 transition-all duration-300" style={{ transform: 'translateX(-50%)' }}></span>
                    </button>
                </div>
                <div className="flex gap-2 md:gap-4 items-center ml-4 text-white">
                    <a
                        href="https://www.linkedin.com/in/venkatarohithpesala/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-600/20 transition-colors text-white"
                    >
                        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.595 1.997 3.595 4.59v5.606z" />
                        </svg>
                    </a>
                    <a
                        href="mailto:vr.pesala@gmail.com"
                        aria-label="Email"
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-600/20 transition-colors text-white"
                    >
                        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z" />
                        </svg>
                    </a>

                    {/* Resume Download Button (desktop) - The Professional Anchor */}
                    <a
                        href="/Venkata_Rohith_Pesala.pdf"
                        download
                        className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/30 text-blue-400 font-bold text-sm transition-all duration-300 hover:bg-blue-500 hover:text-black hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95 overflow-hidden"
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform"></div>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="relative z-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
                        </svg>
                        <span className="relative z-10">Resume</span>
                    </a>
                </div>
            </div>
            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-black/90 border-b border-zinc-700/60 shadow-lg rounded-b-2xl flex flex-col z-50 animate-fade-in-down">
                    {menuItems}
                </div>
            )}
        </nav>
    );
}
