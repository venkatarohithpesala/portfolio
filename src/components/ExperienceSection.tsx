
"use client";

import { useState, useEffect } from 'react';
import { experience } from '../data/experience';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import './ExperienceZigzag.css';
import RainEffect from './RainEffect';

export default function ExperienceSection() {
     // Use the order from the experience array directly (reverse chronological)
    const timeline = experience;

    const [modalIdx, setModalIdx] = useState<number | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (modalIdx !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [modalIdx]);

    return (
        <section className="my-12 w-full relative">
            <RainEffect />
            <motion.h2
                className="text-3xl md:text-5xl font-extrabold mb-16 text-white text-center tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Professional <span className="text-blue-400">Roadmap</span>
            </motion.h2>
            
            <div className="experience-timeline-zigzag">
                {timeline.map((exp, idx) => {
                    const isRight = idx % 2 === 1;
                    return (
                        <motion.div
                            className={`zigzag-row${isRight ? ' right' : ''}`}
                            key={exp?.company || idx}
                            initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="zigzag-dot" />
                            <div className="zigzag-connector-line" />

                            <div className="zigzag-column zigzag-card-container">
                                <motion.div
                                    className="zigzag-card group cursor-pointer border border-white/5 hover:border-blue-500/30 transition-all duration-500"
                                    onClick={() => setModalIdx(idx)}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="mb-4 relative">
                                            <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <Image 
                                                src={exp?.logo || ''} 
                                                alt={exp?.company + ' Logo'} 
                                                width={72} 
                                                height={72} 
                                                className="relative object-contain rounded-xl shadow-lg"
                                            />
                                        </div>
                                        <h3 className="font-bold text-xl text-blue-400 mb-1 text-center w-full group-hover:text-blue-300 transition-colors">{exp?.company}</h3>
                                        <p className="text-white text-base font-semibold mb-1 text-center w-full">
                                            {exp?.role || (exp?.roles && exp.roles[0]?.role) || ''}
                                        </p>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="h-px w-4 bg-blue-400/30"></span>
                                            <p className="text-blue-300/80 text-xs font-medium uppercase tracking-wider">
                                                {exp?.period || (exp?.roles && exp.roles[0]?.period) || ''}
                                            </p>
                                            <span className="h-px w-4 bg-blue-400/30"></span>
                                        </div>
                                        
                                        <div className="text-zinc-400 text-sm text-center leading-relaxed line-clamp-3">
                                            {idx === 0 && "Driving full-stack innovation at Nebraska Innovation Labs, building scalable fintech and investment platforms."}
                                            {idx === 1 && "Advanced research and academic excellence at UNO, focusing on complex computational challenges and data-driven insights."}
                                            {idx === 2 && "Foundational software engineering at a global scale, delivering robust solutions for enterprise ecosystems."}
                                        </div>

                                        <div className="mt-4 flex items-center text-blue-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            View Details
                                            <svg className="w-4 h-4 ml-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            
                            <div className="zigzag-column hidden md:flex" />
                        </motion.div>
                    );
                })}
            </div>

            {/* Enhanced Professional Modal */}
            <AnimatePresence>
                {modalIdx !== null && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
                        {/* Overlay */}
                        <motion.div 
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalIdx(null)}
                        />

                        {/* Modal Content container */}
                        <motion.div 
                            className="relative bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-hidden flex flex-col"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/5"
                                onClick={() => setModalIdx(null)}
                            >
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {(() => {
                                const exp = timeline[modalIdx];
                                if (!exp) return null;
                                return (
                                    <>
                                        {/* Modal Header - Compact on Mobile */}
                                        <div className="p-5 md:p-8 pb-4 md:pb-6 border-b border-white/5 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                                            <div className="relative group shrink-0">
                                                <div className="absolute -inset-1 bg-blue-500/20 blur-lg rounded-xl md:rounded-2xl"></div>
                                                <Image 
                                                    src={exp.logo} 
                                                    alt={exp.company} 
                                                    width={60} 
                                                    height={60} 
                                                    className="relative object-contain rounded-xl md:rounded-2xl bg-black/20 p-1.5 md:p-2 border border-white/5 md:w-[100px] md:h-[100px]"
                                                />
                                            </div>
                                            <div className="flex-1 text-center md:text-left pt-1">
                                                <h3 className="text-xl md:text-3xl font-black text-white mb-0.5 tracking-tight leading-tight">{exp.company}</h3>
                                                <p className="text-blue-400 text-sm md:text-lg font-bold mb-3 md:mb-2">
                                                    {exp.role || (exp.roles && exp.roles[0]?.role) || ''}
                                                </p>
                                                <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 text-zinc-400 text-xs md:text-sm font-medium">
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                                                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                        {exp.period || (exp.roles && exp.roles[0]?.period) || ''}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                                                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                        {exp.location}
                                                    </div>
                                                    {exp.website && (
                                                        <a href={exp.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors text-[10px] md:text-xs">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                            Website
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Modal Body */}
                                        <div className="flex-1 overflow-y-auto p-5 md:p-8 pt-4 md:pt-6 space-y-6 md:space-y-8 scroll-smooth custom-scrollbar">
                                            {exp.projects && exp.projects.map((proj, i) => (
                                                <div key={proj.name + i} className="group/proj relative pl-5 md:pl-6 border-l-2 border-blue-500/20 hover:border-blue-500/50 transition-colors duration-500">
                                                    <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3 md:mb-4">
                                                        <div>
                                                            <h4 className="text-lg md:text-xl font-black text-white group-hover/proj:text-blue-400 transition-colors">{proj.name}</h4>
                                                            <p className="text-zinc-500 text-xs md:text-sm font-semibold italic">Lead: {proj.supervisor}</p>
                                                        </div>
                                                        <span className="inline-block self-start md:self-center px-2 py-0.5 md:px-3 md:py-1 rounded-lg bg-zinc-800 text-zinc-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">{proj.period}</span>
                                                    </div>
                                                    <ul className="space-y-3 md:space-y-4">
                                                        {proj.highlights.map((h, j) => (
                                                            <li key={j} className="flex gap-2 md:gap-3 text-zinc-300 text-xs md:text-sm leading-relaxed group/item">
                                                                <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover/item:bg-blue-500 transition-colors"></span>
                                                                <span>{h}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}

                                            {exp.roles && exp.roles.map((role, i) => (
                                                <div key={role.role + i} className="space-y-8">
                                                    {role.projects && role.projects.map((proj, j) => (
                                                        <div key={proj.name + j} className="group/proj relative pl-6 border-l-2 border-blue-500/20 hover:border-blue-500/50 transition-colors duration-500">
                                                            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                                                <div>
                                                                    <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">{role.role}</div>
                                                                    <h4 className="text-xl font-black text-white group-hover/proj:text-blue-400 transition-colors">{proj.name}</h4>
                                                                    <p className="text-zinc-500 text-sm font-semibold italic">Supervisor: {proj.supervisor}</p>
                                                                </div>
                                                                <span className="inline-block px-3 py-1 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider">{proj.period}</span>
                                                            </div>
                                                            <ul className="space-y-4">
                                                                {proj.highlights.map((h, k) => (
                                                                    <li key={k} className="flex gap-3 text-zinc-300 text-sm leading-relaxed group/item">
                                                                        <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover/item:bg-blue-500 transition-colors"></span>
                                                                        <span>{h}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                );
                            })()}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}