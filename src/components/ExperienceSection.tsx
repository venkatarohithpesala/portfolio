
"use client";

import { useState } from 'react';
import { experience } from '../data/experience';
import { motion } from 'framer-motion';
import Image from 'next/image';
import './ExperienceTimeline.css';

export default function ExperienceSection() {
    // Order: HCL, UNO, Nebraska Innovation Labs
    const timeline = [
        experience.find(e => e.company.includes('HCL')),
        experience.find(e => e.company.includes('University Of Nebraska')),
        experience.find(e => e.company.includes('Nebraska Innovation Labs')),
    ];

    const [modalIdx, setModalIdx] = useState<number | null>(null);

    return (
        <section className="my-12 w-full">
            <motion.h2
                className="text-2xl font-bold mb-12 text-white text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                My Career Roadmap
            </motion.h2>
            <div className="experience-timeline">
                {timeline.map((exp, idx) => (
                    <div className="timeline-block cursor-pointer" key={exp?.company || idx} onClick={() => setModalIdx(idx)}>
                        <div className="timeline-content">
                            <div className="timeline-logo">
                                {exp?.website ? (
                                    <a href={exp.website} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                                        <Image src={exp.logo} alt={exp.company + ' Logo'} width={70} height={70} className="object-contain rounded-md hover:scale-105 transition-transform" />
                                    </a>
                                ) : (
                                    <Image src={exp?.logo || ''} alt={exp?.company + ' Logo'} width={70} height={70} className="object-contain rounded-md" />
                                )}
                            </div>
                            <h3 className="font-semibold text-xl text-blue-400 mb-1 text-center w-full">{exp?.company}</h3>
                            <p className="text-white text-base font-medium mb-2 text-center w-full">
                                {exp?.role || (exp?.roles && exp.roles[0]?.role) || ''}
                            </p>
                            <p className="text-white text-sm opacity-80 mb-2 text-center w-full">
                                {exp?.period || (exp?.roles && exp.roles[0]?.period) || ''}
                            </p>
                            <p className="text-white text-xs opacity-70 text-center w-full">
                                {exp?.location}
                            </p>
                            {/* Short highlight/story for each block */}
                            <div className="mt-4 text-white/90 text-center w-full">
                                {idx === 0 && (
                                    <span>Began my career as a Software Engineer, learning real-world development and teamwork in a global company.</span>
                                )}
                                {idx === 1 && (
                                    <span>Pursued my Master’s degree, deepening my knowledge and research in computer science at UNO.</span>
                                )}
                                {idx === 2 && (
                                    <span>Joined an innovative startup, applying my skills to impactful projects and real-world solutions.</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal Popup */}
            {modalIdx !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-zinc-900 rounded-xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] min-h-[400px] relative animate-fadeIn overflow-y-auto">
                        // Add at the end of the file (or after imports if using CSS modules or global styles)

                        // Custom scrollbar styles for modal

                        <button
                            className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-blue-400 focus:outline-none"
                            onClick={() => setModalIdx(null)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        {(() => {
                            const exp = timeline[modalIdx];
                            if (!exp) return null;
                            return (
                                <div>
                                    <div className="flex flex-col items-center mb-4">
                                        <Image src={exp.logo} alt={exp.company + ' Logo'} width={70} height={70} className="object-contain rounded-md mb-2" />
                                        <h3 className="font-semibold text-xl text-blue-400 mb-1 text-center">{exp.company}</h3>
                                        <p className="text-white text-base font-medium mb-1 text-center">
                                            {exp.role || (exp.roles && exp.roles[0]?.role) || ''}
                                        </p>
                                        <p className="text-white text-sm opacity-80 mb-1 text-center">
                                            {exp.period || (exp.roles && exp.roles[0]?.period) || ''}
                                        </p>
                                        <p className="text-white text-xs opacity-70 text-center">
                                            {exp.location}
                                        </p>
                                    </div>
                                    {/* Details: Projects/Highlights */}
                                    {exp.projects && (
                                        <div>
                                            <h4 className="text-blue-400 font-semibold mb-2">Projects</h4>
                                            {exp.projects.map((proj, i) => (
                                                <div key={proj.name + i} className="mb-4">
                                                    <div className="font-semibold text-white mb-1">{proj.name} <span className="text-xs text-white/60">{proj.supervisor}</span></div>
                                                    <div className="text-xs text-white/70 mb-1">{proj.period}</div>
                                                    <ul className="list-disc ml-6 text-white/90 text-sm">
                                                        {proj.highlights.map((h, j) => (
                                                            <li key={j}>{h}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {exp.roles && (
                                        <div>
                                            <h4 className="text-blue-400 font-semibold mb-2">Roles & Projects</h4>
                                            {exp.roles.map((role, i) => (
                                                <div key={role.role + i} className="mb-4">
                                                    <div className="font-semibold text-white mb-1">{role.role} <span className="text-xs text-white/60">{role.period}</span></div>
                                                    {role.projects && role.projects.map((proj, j) => (
                                                        <div key={proj.name + j} className="ml-2 mb-2">
                                                            <div className="text-blue-400 font-semibold">{proj.name} <span className="text-xs text-white/60">{proj.supervisor}</span></div>
                                                            <div className="text-xs text-white/70 mb-1">{proj.period}</div>
                                                            <ul className="list-disc ml-6 text-white/90 text-sm">
                                                                {proj.highlights.map((h, k) => (
                                                                    <li key={k}>{h}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}
        </section>
    );
}
