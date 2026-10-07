"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

// Dark is the default. Light is only active when <html data-theme="light"> is set,
// either by the inline script in layout.tsx (saved choice) or by setTheme().
export const THEME_STORAGE_KEY = "portfolio-theme";

function readTheme(): Theme {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function subscribe(callback: () => void) {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
}

function getServerSnapshot(): Theme {
    return "dark";
}

export function setTheme(theme: Theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // Storage can be blocked (private mode); the theme still applies for this visit.
    }
}

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
    const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);
    const toggleTheme = useCallback(() => setTheme(readTheme() === "light" ? "dark" : "light"), []);
    return { theme, toggleTheme };
}
