"use client";
import { projects } from '../data/projects';
import { motion } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';

const TAG_COLORS = ['#60a5fa', '#3b82f6', '#38bdf8', '#818cf8'];

export default function ProjectsSection() {
    return (
        <section className="my-12 w-full">
            <motion.h2
                className="text-2xl font-bold mb-2 text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Projects
            </motion.h2>
            <motion.p
                className="text-zinc-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
            >
                A few things I&apos;ve built on my own time.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {projects.map((proj, idx) => (
                    <motion.div
                        key={proj.title}
                        className="group flex flex-col h-full bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 hover:bg-zinc-900/60 hover:-translate-y-1 transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-start gap-2.5 mb-3">
                            <FolderGit2
                                size={18}
                                strokeWidth={2}
                                className="text-zinc-500 mt-0.5 shrink-0 group-hover:text-blue-400 transition-colors"
                            />
                            <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                                {proj.title}
                            </h3>
                        </div>

                        <p className="text-zinc-400 text-sm leading-relaxed mb-5">{proj.description}</p>

                        <div className="flex flex-wrap gap-2 mt-auto pt-1">
                            {proj.tags.map((tag, tagIdx) => {
                                const color = TAG_COLORS[tagIdx % TAG_COLORS.length];
                                return (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                                        style={{
                                            color,
                                            borderColor: `${color}4d`,
                                            backgroundColor: `${color}1a`,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
