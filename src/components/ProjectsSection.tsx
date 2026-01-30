"use client";
import { projects } from '../data/projects';
import { motion } from 'framer-motion';
import './ProjectsSection.css';

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
                        className="flip-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flip-card-inner">
                            {/* Front */}
                            <div className="flip-card-front rounded-lg bg-zinc-900 shadow-md flex items-center justify-center h-48 md:h-56">
                                <h3 className="font-semibold text-xl text-blue-400 text-center px-4">{proj.title}</h3>
                            </div>
                            {/* Back */}
                            <div className="flip-card-back rounded-lg bg-zinc-900 shadow-md flex flex-col items-center justify-center h-48 md:h-56 p-4 overflow-y-auto">
                                <h3 className="font-semibold text-lg mb-2 text-blue-400 text-center">{proj.title}</h3>
                                <p className="text-white/90 text-center text-sm break-words max-h-40 md:max-h-48 overflow-y-auto w-full">{proj.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
