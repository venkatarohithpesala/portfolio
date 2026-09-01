// Turns a plain JS value back into formatted TypeScript source, matching
// the style already used in src/data/*.ts (single quotes, 4-space indent).
// Used by the admin editors to regenerate a data file after an edit.

function serializeString(s: string): string {
    return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function serializeValue(value: unknown, depth: number): string {
    const pad = '    '.repeat(depth);
    const padClose = '    '.repeat(depth - 1);

    if (value === null || value === undefined) return 'undefined';
    if (typeof value === 'string') return serializeString(value);
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);

    if (Array.isArray(value)) {
        if (value.length === 0) return '[]';
        const items = value.map((v) => pad + serializeValue(v, depth + 1)).join(',\n');
        return `[\n${items},\n${padClose}]`;
    }

    if (typeof value === 'object') {
        const entries = Object.entries(value as Record<string, unknown>).filter(([, v]) => v !== undefined);
        if (entries.length === 0) return '{}';
        const items = entries
            .map(([k, v]) => `${pad}${/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : serializeString(k)}: ${serializeValue(v, depth + 1)}`)
            .join(',\n');
        return `{\n${items},\n${padClose}}`;
    }

    return JSON.stringify(value);
}

export function serializeDataFile(varName: string, headerComment: string, data: unknown): string {
    return `// ${headerComment}\nexport const ${varName} = ${serializeValue(data, 1)};\n`;
}
