"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";

function subscribe(callback: () => void) {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
    return false;
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    if (reducedMotion) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{ duration: 1.1, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
