"use client";

import { motion } from 'framer-motion';

const STACK = ['Next.js', 'NestJS', 'AWS'];

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.6 },
    },
};

const line = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function DeveloperObject() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 font-mono text-xs md:text-sm leading-relaxed w-full max-w-md"
        >
            <motion.div variants={line}>
                <span className="text-sky-400">const</span> <span className="text-white">developer</span>{' '}
                <span className="text-zinc-500">= {'{'}</span>
            </motion.div>
            <motion.div variants={line} className="pl-4">
                <span className="text-zinc-300">name</span>
                <span className="text-zinc-500">: </span>
                <span className="text-blue-400">&quot;Venkat&quot;</span>
                <span className="text-zinc-500">,</span>
            </motion.div>
            <motion.div variants={line} className="pl-4">
                <span className="text-zinc-300">role</span>
                <span className="text-zinc-500">: </span>
                <span className="text-blue-400">&quot;Full Stack Cloud Engineer&quot;</span>
                <span className="text-zinc-500">,</span>
            </motion.div>
            <motion.div variants={line} className="pl-4">
                <span className="text-zinc-300">stack</span>
                <span className="text-zinc-500">: [</span>
                {STACK.map((s, i) => (
                    <span key={s}>
                        <span className="text-blue-400">&quot;{s}&quot;</span>
                        {i < STACK.length - 1 && <span className="text-zinc-500">, </span>}
                    </span>
                ))}
                <span className="text-zinc-500">],</span>
            </motion.div>
            <motion.div variants={line} className="pl-4">
                <span className="text-zinc-300">location</span>
                <span className="text-zinc-500">: </span>
                <span className="text-blue-400">&quot;Omaha, NE&quot;</span>
                <span className="text-zinc-500">,</span>
            </motion.div>
            <motion.div variants={line} className="pl-4">
                <span className="text-zinc-300">status</span>
                <span className="text-zinc-500">: </span>
                <span className="text-blue-400">&quot;available_for_hire&quot;</span>
                <span className="text-zinc-500">,</span>
            </motion.div>
            <motion.div variants={line}>
                <span className="text-zinc-500">{'};'}</span>
            </motion.div>
        </motion.div>
    );
}
