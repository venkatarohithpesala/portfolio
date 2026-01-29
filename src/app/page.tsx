"use client";

import Image from 'next/image';
import SkillsSection from '../components/SkillsSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import HeroLottie from '../components/HeroLottie';
import { useRef, RefObject } from 'react';
import Topbar from '../components/Topbar';

export default function Home() {
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
                        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in whitespace-nowrap md:whitespace-nowrap">
                            Hi, I'm Venkat
                        </h1>
                        <p className="text-lg text-white dark:text-zinc-300 max-w-2xl animate-fade-in delay-200 mb-0 mt-3">
                            Full Stack Developer | Cloud & DevOps Enthusiast | Building modern, scalable solutions with passion for UI/UX and automation.
                        </p>
                        <HeroLottie />
                    </div>
                    <div className="flex-1 flex justify-center md:justify-end items-center md:items-start mt-4 md:mt-0">
                        <div className="relative w-32 h-32 md:w-44 md:h-44">
                            <Image
                                src="/profile-pic.png"
                                alt="Venkata Rohith Pesala photo"
                                fill
                                className="rounded-full object-cover border-4 border-blue-400 shadow-lg"
                                priority
                            />
                        </div>
                    </div>
                </section>
                {/* Mobile-only spacer to push Skills section below the fold */}
                <div className="block md:hidden h-32"></div>
                <div ref={skillsRef}><SkillsSection /></div>
                <div ref={educationRef}><EducationSection /></div>
                <div ref={experienceRef}><ExperienceSection /></div>
                <div ref={projectsRef}><ProjectsSection /></div>
            </main>
        </div>
    );
}
