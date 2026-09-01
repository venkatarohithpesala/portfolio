// Extracts the array/object literal out of a simple
// `export const X = [...];` data file so it can be edited as plain JS.
// Safe in this context: the source is always our own repo's content,
// fetched via an authenticated GitHub API call, not arbitrary user input.
export function parseDataFile(source: string, varName: string): unknown {
    const marker = `export const ${varName} =`;
    const idx = source.indexOf(marker);
    if (idx === -1) {
        throw new Error(`Could not find "${marker}" in the file`);
    }
    let expr = source.slice(idx + marker.length).trim();
    if (expr.endsWith(';')) expr = expr.slice(0, -1);

    const fn = new Function(`"use strict"; return (${expr});`);
    return fn();
}
