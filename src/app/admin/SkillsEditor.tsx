'use client';

import { useEffect, useState } from 'react';
import { useContentFile } from '../../lib/useContentFile';
import { AddButton, Card, Field, SaveBar, TextInput } from './ui';

type SkillItem = { name: string; icon: string };
type SkillCategory = { category: string; items: SkillItem[] };

// filename -> data URL, staged locally until the PR is opened.
type PendingIcons = Record<string, string>;

function sanitizeFilename(name: string): string {
    const dot = name.lastIndexOf('.');
    const base = dot === -1 ? name : name.slice(0, dot);
    const ext = dot === -1 ? '' : name.slice(dot);
    return base.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + ext.toLowerCase();
}

export default function SkillsEditor({ token }: { token: string }) {
    const { data, setData, load, save, loading, saving, error, prUrl } = useContentFile<SkillCategory[]>(
        token,
        'src/data/skills.ts',
        'skills',
        'Skills data for portfolio'
    );
    const [pendingIcons, setPendingIcons] = useState<PendingIcons>({});

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading || !data) return <p className="text-zinc-500">Loading skills…</p>;

    const updateCategory = (ci: number, patch: Partial<SkillCategory>) => {
        setData(data.map((c, idx) => (idx === ci ? { ...c, ...patch } : c)));
    };

    const updateItem = (ci: number, ii: number, patch: Partial<SkillItem>) => {
        const items = data[ci].items.map((it, idx) => (idx === ii ? { ...it, ...patch } : it));
        updateCategory(ci, { items });
    };

    const handleIconUpload = (ci: number, ii: number, file: File) => {
        const filename = sanitizeFilename(file.name);
        const reader = new FileReader();
        reader.onload = () => {
            setPendingIcons((prev) => ({ ...prev, [filename]: reader.result as string }));
            updateItem(ci, ii, { icon: filename });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = (commitMessage: string) => {
        const extraFiles = Object.entries(pendingIcons).map(([filename, dataUrl]) => ({
            path: `public/skill-icons/${filename}`,
            content: dataUrl.split(',')[1] ?? '',
            encoding: 'base64' as const,
        }));
        save(data, commitMessage, extraFiles)
            .then(() => setPendingIcons({}))
            .catch(() => {});
    };

    return (
        <div>
            <div className="space-y-6">
                {data.map((cat, ci) => (
                    <Card key={ci} onRemove={() => setData(data.filter((_, idx) => idx !== ci))}>
                        <Field label="Category name">
                            <TextInput value={cat.category} onChange={(e) => updateCategory(ci, { category: e.target.value })} />
                        </Field>

                        <div className="space-y-2">
                            {cat.items.map((item, ii) => (
                                <div key={ii} className="flex items-center gap-2">
                                    {item.icon && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={pendingIcons[item.icon] ?? `/skill-icons/${item.icon}`}
                                            alt=""
                                            className="w-7 h-7 object-contain rounded shrink-0 bg-white/5"
                                        />
                                    )}
                                    <TextInput
                                        placeholder="Name"
                                        value={item.name}
                                        onChange={(e) => updateItem(ci, ii, { name: e.target.value })}
                                        className="flex-1"
                                    />
                                    <TextInput
                                        placeholder="icon-file.png"
                                        value={item.icon}
                                        onChange={(e) => updateItem(ci, ii, { icon: e.target.value })}
                                        className="flex-1"
                                    />
                                    <label className="shrink-0 cursor-pointer text-xs text-blue-400 hover:text-blue-300 font-semibold px-2 whitespace-nowrap">
                                        Upload
                                        <input
                                            type="file"
                                            accept="image/png,image/svg+xml,image/jpeg,image/webp"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleIconUpload(ci, ii, file);
                                                e.target.value = '';
                                            }}
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => updateCategory(ci, { items: cat.items.filter((_, idx) => idx !== ii) })}
                                        className="text-zinc-500 hover:text-red-400 text-xs font-bold px-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <AddButton
                            label="Add skill"
                            onClick={() => updateCategory(ci, { items: [...cat.items, { name: '', icon: '' }] })}
                        />
                    </Card>
                ))}
            </div>
            <div className="mt-4">
                <AddButton
                    label="Add category"
                    onClick={() => setData([...data, { category: '', items: [] }])}
                />
            </div>
            {Object.keys(pendingIcons).length > 0 && (
                <p className="mt-4 text-xs text-zinc-500">
                    {Object.keys(pendingIcons).length} new icon{Object.keys(pendingIcons).length > 1 ? 's' : ''} will
                    be uploaded with this PR.
                </p>
            )}
            <SaveBar saving={saving} error={error} prUrl={prUrl} onSave={handleSave} />
        </div>
    );
}
