'use client';

import { useEffect } from 'react';
import { useContentFile } from '../../lib/useContentFile';
import { AddButton, Card, Field, SaveBar, TextArea, TextInput } from './ui';

type Project = {
    name: string;
    supervisor: string;
    period: string;
    tags?: string[];
    highlights: string[];
};

type Role = { role: string; period: string; projects: Project[] };

type Experience = {
    company: string;
    location: string;
    logo: string;
    website?: string;
    tags?: string[];
    role?: string;
    period?: string;
    projects?: Project[];
    roles?: Role[];
};

function ProjectForm({
    project,
    onChange,
    onRemove,
}: {
    project: Project;
    onChange: (p: Project) => void;
    onRemove: () => void;
}) {
    return (
        <Card onRemove={onRemove}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Project name">
                    <TextInput value={project.name} onChange={(e) => onChange({ ...project, name: e.target.value })} />
                </Field>
                <Field label="Supervisor">
                    <TextInput
                        value={project.supervisor}
                        onChange={(e) => onChange({ ...project, supervisor: e.target.value })}
                    />
                </Field>
                <Field label="Period">
                    <TextInput value={project.period} onChange={(e) => onChange({ ...project, period: e.target.value })} />
                </Field>
                <Field label="Tags (comma-separated)">
                    <TextInput
                        value={(project.tags ?? []).join(', ')}
                        onChange={(e) =>
                            onChange({
                                ...project,
                                tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                            })
                        }
                    />
                </Field>
            </div>
            <Field label="Highlights (one per line)">
                <TextArea
                    rows={5}
                    value={project.highlights.join('\n')}
                    onChange={(e) =>
                        onChange({ ...project, highlights: e.target.value.split('\n').filter((l) => l.trim() !== '') })
                    }
                />
            </Field>
        </Card>
    );
}

function ProjectListEditor({ projects, onChange }: { projects: Project[]; onChange: (p: Project[]) => void }) {
    return (
        <div className="space-y-3 pl-4 border-l-2 border-blue-500/20">
            {projects.map((proj, i) => (
                <ProjectForm
                    key={i}
                    project={proj}
                    onChange={(p) => onChange(projects.map((x, idx) => (idx === i ? p : x)))}
                    onRemove={() => onChange(projects.filter((_, idx) => idx !== i))}
                />
            ))}
            <AddButton
                label="Add project"
                onClick={() =>
                    onChange([...projects, { name: '', supervisor: '', period: '', tags: [], highlights: [] }])
                }
            />
        </div>
    );
}

export default function ExperienceEditor({ token }: { token: string }) {
    const { data, setData, load, save, loading, saving, error, prUrl } = useContentFile<Experience[]>(
        token,
        'src/data/experience.ts',
        'experience',
        'Experience data for portfolio'
    );

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading || !data) return <p className="text-zinc-500">Loading experience…</p>;

    const update = (i: number, patch: Partial<Experience>) => {
        setData(data.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));
    };

    return (
        <div>
            <div className="space-y-6">
                {data.map((exp, i) => {
                    const isMultiRole = Array.isArray(exp.roles);
                    return (
                        <Card key={i} onRemove={() => setData(data.filter((_, idx) => idx !== i))}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Field label="Company">
                                    <TextInput value={exp.company} onChange={(e) => update(i, { company: e.target.value })} />
                                </Field>
                                <Field label="Location">
                                    <TextInput value={exp.location} onChange={(e) => update(i, { location: e.target.value })} />
                                </Field>
                                <Field label="Logo path">
                                    <TextInput value={exp.logo} onChange={(e) => update(i, { logo: e.target.value })} />
                                </Field>
                                <Field label="Website">
                                    <TextInput
                                        value={exp.website ?? ''}
                                        onChange={(e) => update(i, { website: e.target.value })}
                                    />
                                </Field>
                            </div>
                            <Field label="Tags (comma-separated)">
                                <TextInput
                                    value={(exp.tags ?? []).join(', ')}
                                    onChange={(e) =>
                                        update(i, {
                                            tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                                        })
                                    }
                                />
                            </Field>

                            {!isMultiRole && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Field label="Role">
                                            <TextInput
                                                value={exp.role ?? ''}
                                                onChange={(e) => update(i, { role: e.target.value })}
                                            />
                                        </Field>
                                        <Field label="Period">
                                            <TextInput
                                                value={exp.period ?? ''}
                                                onChange={(e) => update(i, { period: e.target.value })}
                                            />
                                        </Field>
                                    </div>
                                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Projects</p>
                                    <ProjectListEditor
                                        projects={exp.projects ?? []}
                                        onChange={(projects) => update(i, { projects })}
                                    />
                                </>
                            )}

                            {isMultiRole && (
                                <div className="space-y-4">
                                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Roles</p>
                                    {(exp.roles ?? []).map((role, ri) => (
                                        <div key={ri} className="bg-black/30 border border-white/10 rounded-lg p-3 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                                                    <Field label="Role">
                                                        <TextInput
                                                            value={role.role}
                                                            onChange={(e) => {
                                                                const roles = (exp.roles ?? []).map((r, idx) =>
                                                                    idx === ri ? { ...r, role: e.target.value } : r
                                                                );
                                                                update(i, { roles });
                                                            }}
                                                        />
                                                    </Field>
                                                    <Field label="Period">
                                                        <TextInput
                                                            value={role.period}
                                                            onChange={(e) => {
                                                                const roles = (exp.roles ?? []).map((r, idx) =>
                                                                    idx === ri ? { ...r, period: e.target.value } : r
                                                                );
                                                                update(i, { roles });
                                                            }}
                                                        />
                                                    </Field>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        update(i, { roles: (exp.roles ?? []).filter((_, idx) => idx !== ri) })
                                                    }
                                                    className="text-zinc-500 hover:text-red-400 text-xs font-bold mt-5"
                                                >
                                                    Remove role
                                                </button>
                                            </div>
                                            <ProjectListEditor
                                                projects={role.projects}
                                                onChange={(projects) => {
                                                    const roles = (exp.roles ?? []).map((r, idx) =>
                                                        idx === ri ? { ...r, projects } : r
                                                    );
                                                    update(i, { roles });
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <AddButton
                                        label="Add role"
                                        onClick={() =>
                                            update(i, {
                                                roles: [...(exp.roles ?? []), { role: '', period: '', projects: [] }],
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
            <div className="mt-4">
                <AddButton
                    label="Add company"
                    onClick={() =>
                        setData([
                            ...data,
                            { company: '', location: '', logo: '', website: '', tags: [], role: '', period: '', projects: [] },
                        ])
                    }
                />
            </div>
            <SaveBar saving={saving} error={error} prUrl={prUrl} onSave={(msg) => save(data, msg)} />
        </div>
    );
}
