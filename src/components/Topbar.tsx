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
            <div className="flex gap-4 items-center px-4 py-2 text-white">
                <a
                    href="https://www.linkedin.com/in/venkatarohithpesala/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:text-blue-400 transition-colors"
                >
                    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.595 1.997 3.595 4.59v5.606z" />
                    </svg>
                </a>
                <a
                    href="https://github.com/venkatarohithpesalae"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:text-blue-400 transition-colors"
                >
                    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
                        <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.874.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.218.694.825.576 4.765-1.589 8.199-6.085 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>
            </div>
        </>
    );

    return (
        <nav className="sticky top-0 z-50 bg-white/10 dark:bg-black/60 backdrop-blur-lg border-b border-zinc-700/60 py-2 px-1 sm:py-3 sm:px-6 flex items-center shadow-[0_4px_24px_0_rgba(0,0,0,0.12)] rounded-b-2xl transition-all relative text-white">
            {/* Hamburger for mobile */}
            <div className="flex w-full items-center justify-between sm:hidden">

                <button
                    className="p-2 focus:outline-none"
                    aria-label="Open menu"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
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
                <div className="flex gap-4 items-center ml-4 text-white">
                    <a
                        href="https://www.linkedin.com/in/venkatarohithpesala/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-blue-400 transition-colors text-white"
                    >
                        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.595 1.997 3.595 4.59v5.606z" />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/venkatarohithpesalae"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-blue-400 transition-colors text-white"
                    >
                        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
                            <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.874.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.218.694.825.576 4.765-1.589 8.199-6.085 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
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
