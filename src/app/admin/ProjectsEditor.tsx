'use client';

import { useEffect } from 'react';
import { useContentFile } from '../../lib/useContentFile';
import { AddButton, Card, Field, SaveBar, TextArea, TextInput } from './ui';

type Project = { title: string; description: string; tags: string[] };

export default function ProjectsEditor({ token }: { token: string }) {
    const { data, setData, load, save, loading, saving, error, prUrl } = useContentFile<Project[]>(
        token,
        'src/data/projects.ts',
        'projects',
        'Projects data for portfolio'
    );

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading || !data) return <p className="text-zinc-500">Loading projects…</p>;

    const update = (i: number, patch: Partial<Project>) => {
        setData(data.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
    };

    return (
        <div>
            <div className="space-y-4">
                {data.map((project, i) => (
                    <Card key={i} onRemove={() => setData(data.filter((_, idx) => idx !== i))}>
                        <Field label="Title">
                            <TextInput value={project.title} onChange={(e) => update(i, { title: e.target.value })} />
                        </Field>
                        <Field label="Description">
                            <TextArea
                                rows={3}
                                value={project.description}
                                onChange={(e) => update(i, { description: e.target.value })}
                            />
                        </Field>
                        <Field label="Tags (comma-separated)">
                            <TextInput
                                value={project.tags.join(', ')}
                                onChange={(e) =>
                                    update(i, {
                                        tags: e.target.value
                                            .split(',')
                                            .map((t) => t.trim())
                                            .filter(Boolean),
                                    })
                                }
                            />
                        </Field>
                    </Card>
                ))}
            </div>
            <div className="mt-4">
                <AddButton
                    label="Add project"
                    onClick={() => setData([...data, { title: '', description: '', tags: [] }])}
                />
            </div>
            <SaveBar saving={saving} error={error} prUrl={prUrl} onSave={(msg) => save(data, msg)} />
        </div>
    );
}
