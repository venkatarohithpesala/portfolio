"use client";
import { projects } from '../data/projects';
import { motion } from 'framer-motion';

export default function ProjectsSection() {
    return (
        <section className="my-12 w-full">
            <motion.h2
                className="text-2xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((proj) => (
                    <motion.div
                        key={proj.title}
                        className="rounded-lg bg-zinc-900 p-6 shadow-md hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="font-semibold text-lg mb-2 text-blue-400">{proj.title}</h3>
                        <p className="text-white/90">{proj.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
