
"use client";
import { useEffect, useState } from 'react';

import Image from 'next/image';
import SkillsSection from '../components/SkillsSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import HeroLottie from '../components/HeroLottie';
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
    // Section refs for scrolling
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
        <div className="min-h-screen w-full bg-black font-sans">
            <Topbar
                onSkillsClick={() => scrollToSection(skillsRef)}
                onEducationClick={() => scrollToSection(educationRef)}
                onExperienceClick={() => scrollToSection(experienceRef)}
                onProjectsClick={() => scrollToSection(projectsRef)}
            />
            <main className="mx-auto max-w-4xl px-4 py-12">
                {/* Hero Section */}
                <section className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between text-center md:text-left mb-0 gap-4 md:gap-6 min-h-[18rem]">
                    <div className="flex-1 flex flex-col items-center md:items-start justify-start">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white animate-fade-in whitespace-nowrap md:whitespace-nowrap">
                            <span className="typing-demo border-r-2 border-blue-400 pr-1">Hi, I'm Venkat</span>
                        </h1>
                        {/* Typing animation styles */}
                        <style jsx>{`
                                     .typing-demo {
                                                    display: inline-block;
                                                    overflow: hidden;
                                                    white-space: nowrap;
                                                    border-right: 2px solid #60a5fa;
                                                    animation: typing 2.5s steps(30, end), blink-caret 0.75s step-end infinite;
                                                    font-family: inherit;
                                                  }
                                                    @keyframes typing {
                                                        from { width: 0 }
                                                        to { width: 100% }
                                                    }
                                                    @keyframes blink-caret {
                                                        from, to { border-color: transparent }
                                                        50% { border-color: #60a5fa; }
                                                    }                       
                                        `}</style>
                        <div className="text-base md:text-base text-white dark:text-zinc-300 max-w-2xl md:max-w-4xl animate-fade-in delay-200 mb-0 mt-3 space-y-1 text-center md:text-left">
                            <p className="text-lg md:text-xl font-semibold text-blue-400">Full Stack Developer</p>
                            <p className="md:inline">Experienced with AWS, DevOps, CI/CD, and building scalable, cloud-native solutions. Passionate about integrating APIs and cloud services to deliver robust, real-time applications.</p>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center md:justify-end items-center md:items-start mt-4 md:mt-0">
                        <div className="relative w-32 h-32 md:w-44 md:h-44">
                            <Image
                                src="/profile-pic.png"
                                alt="Venkata Rohith Pesala photo"
                                fill
                                className="rounded-full object-cover border-2 shadow-lg"
                                priority
                            />
                        </div>
                    </div>
                </section>
                {/* Mobile-only spacer to push Skills section further below the fold */}
                <div className="block md:hidden h-64"></div>
                <div ref={skillsRef}><SkillsSection /></div>
                <div ref={educationRef}><EducationSection /></div>
                <div ref={experienceRef}><ExperienceSection /></div>
                <div ref={projectsRef}><ProjectsSection /></div>
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
        </div>
    );
}
