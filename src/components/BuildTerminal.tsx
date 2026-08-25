"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

type Entry = { cmd: string; result?: string };

const SCRIPT: Entry[] = [
    { cmd: '$ git commit -m "feat: user dashboard"' },
    { cmd: '> Building frontend...', result: 'Next.js compiled' },
    { cmd: '> Starting backend...', result: 'NestJS API live' },
    { cmd: '> Migrating database...', result: 'PostgreSQL schema updated' },
    { cmd: '> Running Azure DevOps pipeline...', result: 'Build & release succeeded' },
    { cmd: '> Configuring monitoring...', result: 'CloudWatch alerts active' },
    { cmd: '> Publishing docs...', result: 'Swagger spec updated' },
    { cmd: '$ status --check', result: 'All systems operational — shipped solo' },
];

const TYPE_SPEED_MS = 26;
const PROCESSING_DELAY_MS = 350;
const LINE_PAUSE_MS = 450;
const LOOP_PAUSE_MS = 2600;

function subscribeReducedMotion(callback: () => void) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
    return false;
}

function TerminalChrome({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-2xl mx-auto bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-zinc-500 font-mono">deploy.sh — venkat@portfolio</span>
            </div>
            <div className="p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed min-h-[280px] md:min-h-[260px]">
                {children}
            </div>
        </div>
    );
}

function StaticTerminal() {
    return (
        <TerminalChrome>
            {SCRIPT.map((entry, i) => (
                <div key={i} className="mb-1.5 flex flex-wrap items-baseline gap-x-2">
                    <span className={entry.cmd.startsWith('$') ? 'text-white' : 'text-zinc-400'}>
                        {entry.cmd}
                    </span>
                    {entry.result && <span className="text-green-400">✓ {entry.result}</span>}
                </div>
            ))}
        </TerminalChrome>
    );
}

function AnimatedTerminal() {
    const [completed, setCompleted] = useState<Entry[]>([]);
    const [lineIndex, setLineIndex] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [resultVisible, setResultVisible] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const pausedRef = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                pausedRef.current = !entry.isIntersecting;
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const schedule = (fn: () => void, delay: number) => {
            timeoutRef.current = setTimeout(() => {
                if (pausedRef.current) {
                    schedule(fn, 200);
                } else {
                    fn();
                }
            }, delay);
        };

        const entry = SCRIPT[lineIndex];

        if (!entry) {
            // Finished the whole script — pause, then loop.
            schedule(() => {
                setCompleted([]);
                setLineIndex(0);
                setCharCount(0);
                setResultVisible(false);
            }, LOOP_PAUSE_MS);
        } else if (charCount < entry.cmd.length) {
            schedule(() => setCharCount((c) => c + 1), TYPE_SPEED_MS);
        } else if (entry.result && !resultVisible) {
            schedule(() => setResultVisible(true), PROCESSING_DELAY_MS);
        } else {
            schedule(() => {
                setCompleted((prev) => [...prev, entry]);
                setLineIndex((i) => i + 1);
                setCharCount(0);
                setResultVisible(false);
            }, LINE_PAUSE_MS);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [lineIndex, charCount, resultVisible]);

    const activeEntry = SCRIPT[lineIndex];
    const isTyping = activeEntry && charCount < activeEntry.cmd.length;

    return (
        <div ref={containerRef}>
            <TerminalChrome>
                {completed.map((entry, i) => (
                    <div key={i} className="mb-1.5 flex flex-wrap items-baseline gap-x-2">
                        <span className={entry.cmd.startsWith('$') ? 'text-white' : 'text-zinc-400'}>
                            {entry.cmd}
                        </span>
                        {entry.result && <span className="text-green-400">✓ {entry.result}</span>}
                    </div>
                ))}

                {activeEntry && (
                    <div className="mb-1.5 flex flex-wrap items-baseline gap-x-2">
                        <span className={activeEntry.cmd.startsWith('$') ? 'text-white' : 'text-zinc-400'}>
                            {activeEntry.cmd.slice(0, charCount)}
                            {isTyping && <span className="terminal-cursor" />}
                        </span>
                        {activeEntry.result && resultVisible && (
                            <span className="text-green-400 animate-fade-in">✓ {activeEntry.result}</span>
                        )}
                        {!isTyping && !resultVisible && !activeEntry.result && (
                            <span className="terminal-cursor" />
                        )}
                    </div>
                )}
            </TerminalChrome>
        </div>
    );
}

export default function BuildTerminal() {
    const reducedMotion = useSyncExternalStore(
        subscribeReducedMotion,
        getReducedMotionSnapshot,
        getReducedMotionServerSnapshot
    );

    return reducedMotion ? <StaticTerminal /> : <AnimatedTerminal />;
}
