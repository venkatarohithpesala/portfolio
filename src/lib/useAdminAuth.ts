'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'portfolio_admin_token';

function subscribe(callback: () => void) {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
    return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
    return null;
}

export function useAdminAuth() {
    const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const setToken = useCallback((t: string | null) => {
        if (t) {
            localStorage.setItem(STORAGE_KEY, t);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
        // The native `storage` event only fires in *other* tabs, so dispatch
        // one here too to force useSyncExternalStore to re-read in this tab.
        window.dispatchEvent(new StorageEvent('storage'));
    }, []);

    return { token, setToken };
}
