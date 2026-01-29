"use client";
import { education } from '../data/education';
import { motion } from 'framer-motion';

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
                        className="rounded-lg bg-zinc-900 p-6 shadow-md"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="font-semibold text-lg text-blue-400">{edu.degree}</h3>
                        <p className="text-white">{edu.institution}</p>
                        <p className="text-white text-sm">{edu.period}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
