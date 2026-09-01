'use client';

import { useState } from 'react';
import { useAdminAuth } from '../../lib/useAdminAuth';
import { validateToken, GitHubApiError } from '../../lib/github';
import ProjectsEditor from './ProjectsEditor';
import EducationEditor from './EducationEditor';
import SkillsEditor from './SkillsEditor';
import ExperienceEditor from './ExperienceEditor';

const TABS = ['Skills', 'Education', 'Experience', 'Projects'] as const;
type Tab = (typeof TABS)[number];

function LoginGate({ onLogin }: { onLogin: (token: string) => void }) {
    const [input, setInput] = useState('');
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setChecking(true);
        setError(null);
        try {
            const user = await validateToken(input.trim());
            onLogin(input.trim());
            void user;
        } catch (e) {
            if (e instanceof GitHubApiError && e.status === 404) {
                setError("Token is valid but doesn't have access to venkatarohithpesala/portfolio.");
            } else if (e instanceof GitHubApiError && e.status === 401) {
                setError('Invalid or expired token.');
            } else {
                setError(e instanceof Error ? e.message : 'Could not validate token.');
            }
        } finally {
            setChecking(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-zinc-900/50 border border-white/10 rounded-2xl p-8">
                <h1 className="font-sans text-2xl font-extrabold tracking-tight text-white mb-6">Admin sign-in</h1>
                <textarea
                    autoComplete="off"
                    spellCheck={false}
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            submit();
                        }
                    }}
                    placeholder="ghp_..."
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mb-4 resize-none"
                />
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                <button
                    type="button"
                    disabled={checking || !input.trim()}
                    onClick={submit}
                    className="w-full py-2 rounded-lg bg-blue-500 text-black font-bold text-sm disabled:opacity-40 hover:bg-blue-400 transition-colors"
                >
                    {checking ? 'Checking…' : 'Sign in'}
                </button>
            </div>
        </div>
    );
}

export default function AdminPage() {
    const { token, setToken } = useAdminAuth();
    const [tab, setTab] = useState<Tab>('Skills');

    if (!token) return <LoginGate onLogin={setToken} />;

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
                <h1 className="font-bold text-lg">Content Admin</h1>
                <button
                    type="button"
                    onClick={() => setToken(null)}
                    className="text-xs text-zinc-500 hover:text-white"
                >
                    Sign out
                </button>
            </div>

            <div className="flex gap-2 px-4 md:px-8 py-4 border-b border-white/10 overflow-x-auto">
                {TABS.map((t) => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => setTab(t)}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                            tab === t ? 'bg-blue-500 text-black' : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
                {tab === 'Skills' && <SkillsEditor token={token} />}
                {tab === 'Education' && <EducationEditor token={token} />}
                {tab === 'Experience' && <ExperienceEditor token={token} />}
                {tab === 'Projects' && <ProjectsEditor token={token} />}
            </div>
        </div>
    );
}
