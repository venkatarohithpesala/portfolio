"use client";

import { education } from '../data/education';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function EducationSection() {
    return (
        <section className="my-12 w-full">
            <motion.h2
                className="text-2xl font-bold mb-12 text-white text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Education
            </motion.h2>
            <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
                {education.map((edu, idx) => (
                    <motion.div
                        key={edu.degree}
                        className="w-full flex flex-col items-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-8 flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:border-blue-400">
                            <div className="flex flex-col md:flex-row items-start w-full">
                                {/* Left: Degree & Period */}
                                <div className="flex-1 flex flex-col items-start mb-6 md:mb-0 md:mr-8">
                                    <h3 className="font-semibold text-xl text-blue-400 mb-2 text-left">{edu.degree}</h3>
                                    <p className="text-white text-sm opacity-80 mb-1 text-left">{edu.period}</p>
                                </div>
                                {/* Right: University & Logo */}
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-white text-base font-medium mb-3 text-center">{edu.institution}</p>
                                    <a href="https://www.unomaha.edu/" target="_blank" rel="noopener noreferrer" className="relative group">
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-zinc-800 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg border border-zinc-700">
                                            Click to visit university website
                                        </span>
                                        <Image
                                            src="/education-icons/uno.jpg"
                                            alt="University of Nebraska at Omaha Logo"
                                            width={90}
                                            height={90}
                                            className="object-contain drop-shadow-lg rounded-md hover:scale-105 transition-transform"
                                            priority
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
