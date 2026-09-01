'use client';

import { useEffect } from 'react';
import { useContentFile } from '../../lib/useContentFile';
import { AddButton, Card, Field, SaveBar, TextInput } from './ui';

type Education = { degree: string; institution: string; period: string };

export default function EducationEditor({ token }: { token: string }) {
    const { data, setData, load, save, loading, saving, error, prUrl } = useContentFile<Education[]>(
        token,
        'src/data/education.ts',
        'education',
        'Education data for portfolio'
    );

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading || !data) return <p className="text-zinc-500">Loading education…</p>;

    const update = (i: number, patch: Partial<Education>) => {
        setData(data.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));
    };

    return (
        <div>
            <div className="space-y-4">
                {data.map((edu, i) => (
                    <Card key={i} onRemove={() => setData(data.filter((_, idx) => idx !== i))}>
                        <Field label="Degree">
                            <TextInput value={edu.degree} onChange={(e) => update(i, { degree: e.target.value })} />
                        </Field>
                        <Field label="Institution">
                            <TextInput
                                value={edu.institution}
                                onChange={(e) => update(i, { institution: e.target.value })}
                            />
                        </Field>
                        <Field label="Period">
                            <TextInput
                                value={edu.period}
                                placeholder="Jan 2023 - Dec 2024"
                                onChange={(e) => update(i, { period: e.target.value })}
                            />
                        </Field>
                    </Card>
                ))}
            </div>
            <div className="mt-4">
                <AddButton
                    label="Add education"
                    onClick={() => setData([...data, { degree: '', institution: '', period: '' }])}
                />
            </div>
            <SaveBar saving={saving} error={error} prUrl={prUrl} onSave={(msg) => save(data, msg)} />
        </div>
    );
}
