"use client";
import { skills } from '../data/skills';
import { motion } from 'framer-motion';

export default function SkillsSection() {
    return (
        <section className="mt-0 mb-0 w-full">
            <motion.h2
                className="text-2xl font-bold mb-2 text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Skills
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((group) => (
                    <motion.div
                        key={group.category}
                        className="rounded-lg bg-zinc-900 p-6 shadow-md hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                            {group.category}
                        </h3>
                        <ul className="flex flex-wrap gap-2">
                            {group.items.map((item) => (
                                typeof item === 'object' && 'name' in item && 'icon' in item ? (
                                    <li key={item.name} className="flex items-center gap-2 bg-[#23272f] border border-[#353945] px-4 py-2 rounded-xl text-sm font-medium shadow hover:scale-105 transition-transform">
                                        <img
                                            src={`/skill-icons/${item.icon}`}
                                            alt={item.name + ' logo'}
                                            className="w-6 h-6 object-contain"
                                            loading="lazy"
                                        />
                                        <span className="text-white font-medium">{item.name}</span>
                                    </li>
                                ) : (
                                    <li key={typeof item === 'string' ? item : (item as any).name} className="bg-[#172554] text-blue-200 px-3 py-1 rounded-full text-sm font-medium shadow hover:bg-blue-700 hover:text-white transition-colors">
                                        {typeof item === 'string' ? item : (item as any).name}
                                    </li>
                                )
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
