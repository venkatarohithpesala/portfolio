"use client";

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) return;

        let raf: number | null = null;
        const handleMove = (e: MouseEvent) => {
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                el.style.setProperty('--mx', `${e.clientX}px`);
                el.style.setProperty('--my', `${e.clientY}px`);
                el.style.opacity = '1';
            });
        };
        const handleLeave = () => {
            el.style.opacity = '0';
        };

        window.addEventListener('mousemove', handleMove);
        document.documentElement.addEventListener('mouseleave', handleLeave);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            document.documentElement.removeEventListener('mouseleave', handleLeave);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={ref}
            className="fixed inset-0 pointer-events-none opacity-0 transition-opacity duration-500"
            style={{
                background:
                    'radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.12), transparent 70%)',
            }}
        />
    );
}
