"use client";

import { education } from '../data/education';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function EducationSection() {
    return (
        <section className="my-12 w-full">
            <motion.h2
                className="text-2xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Education
            </motion.h2>
            <div className="space-y-6">
                {education.map((edu) => (
                    <motion.div
                        key={edu.degree}
                        className="rounded-lg bg-zinc-900 p-0 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Left Side: Degree and Period */}
                        <div className="flex-1 p-6 flex flex-col justify-center">
                            <h3 className="font-semibold text-xl text-blue-400 mb-2">{edu.degree}</h3>
                            <p className="text-white text-sm opacity-80">{edu.period}</p>
                        </div>
                        {/* Right Side: University and Logo */}
                        <div className="flex flex-col items-center justify-center bg-zinc-800 p-6 min-w-[220px] md:min-w-[300px] border-l border-zinc-700">
                            <p className="text-white text-base font-medium mb-3 text-center">{edu.institution}</p>
                            <div className="flex justify-center">
                                <a href="https://www.unomaha.edu/" target="_blank" rel="noopener noreferrer" className="relative group">
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-zinc-800 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg border border-zinc-700">
                                        Click to visit university website
                                    </span>
                                    <Image
                                        src="/education-icons/uno2.jpg"
                                        alt="University of Nebraska at Omaha Logo"
                                        width={90}
                                        height={90}
                                        className="object-contain drop-shadow-lg rounded-md hover:scale-105 transition-transform"
                                        priority
                                    />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
