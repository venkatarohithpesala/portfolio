"use client";

import { motion } from 'framer-motion';
import BuildTerminal from './BuildTerminal';

export default function EndToEndSection() {
    return (
        <section className="my-20 md:my-28 w-full">
            <motion.h2
                className="text-3xl md:text-5xl font-extrabold mb-4 text-white text-center tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                End-to-End <span className="text-blue-400">Ownership</span>
            </motion.h2>
            <motion.p
                className="text-zinc-400 text-center max-w-xl mx-auto mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
            >
                From the first line of frontend code to production monitoring, I build and own every
                layer myself — no hand-offs, no gaps.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <BuildTerminal />
            </motion.div>
        </section>
    );
}
