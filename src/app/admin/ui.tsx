'use client';

import { useState, type ReactNode } from 'react';

export function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="block">
            <span className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">{label}</span>
            {children}
        </label>
    );
}

const inputClass =
    'w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={`${inputClass} ${props.className ?? ''}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return <textarea {...props} className={`${inputClass} ${props.className ?? ''}`} />;
}

export function Card({ children, onRemove }: { children: ReactNode; onRemove?: () => void }) {
    return (
        <div className="relative bg-zinc-900/50 border border-white/10 rounded-xl p-4 space-y-3">
            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 text-xs font-bold"
                >
                    Remove
                </button>
            )}
            {children}
        </div>
    );
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="px-4 py-2 rounded-lg border border-dashed border-white/20 text-zinc-400 text-sm font-semibold hover:border-blue-500/50 hover:text-blue-400 transition-colors"
        >
            + {label}
        </button>
    );
}

export function SaveBar({
    saving,
    error,
    prUrl,
    onSave,
}: {
    saving: boolean;
    error: string | null;
    prUrl: string | null;
    onSave: (commitMessage: string) => void;
}) {
    const [message, setMessage] = useState('');

    return (
        <div className="sticky bottom-0 mt-8 bg-black/90 backdrop-blur-lg border-t border-white/10 -mx-4 px-4 py-4 md:-mx-8 md:px-8">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center max-w-3xl mx-auto">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Commit message (e.g. "content: add new project")'
                    className={`${inputClass} flex-1`}
                />
                <button
                    type="button"
                    disabled={saving || !message.trim()}
                    onClick={() => onSave(message.trim())}
                    className="px-6 py-2 rounded-lg bg-blue-500 text-black font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-400 transition-colors whitespace-nowrap"
                >
                    {saving ? 'Opening PR…' : 'Save as PR'}
                </button>
            </div>
            {error && <p className="max-w-3xl mx-auto mt-2 text-red-400 text-sm">{error}</p>}
            {prUrl && (
                <p className="max-w-3xl mx-auto mt-2 text-green-400 text-sm">
                    PR opened —{' '}
                    <a href={prUrl} target="_blank" rel="noopener noreferrer" className="underline">
                        review &amp; merge on GitHub
                    </a>
                </p>
            )}
        </div>
    );
}
