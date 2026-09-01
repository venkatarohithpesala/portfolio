'use client';

import { useCallback, useState } from 'react';
import { getFileContent, saveContentAsPullRequest, type FileWrite } from './github';
import { parseDataFile } from './parseTsData';
import { serializeDataFile } from './serializeTs';

export function useContentFile<T>(
    token: string | null,
    path: string,
    varName: string,
    headerComment: string
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [prUrl, setPrUrl] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const { content } = await getFileContent(token, path);
            setData(parseDataFile(content, varName) as T);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to load');
        } finally {
            setLoading(false);
        }
    }, [token, path, varName]);

    const save = useCallback(
        async (newData: T, commitMessage: string, extraFiles: FileWrite[] = []) => {
            if (!token) return;
            setSaving(true);
            setError(null);
            setPrUrl(null);
            try {
                const content = serializeDataFile(varName, headerComment, newData);
                const url = await saveContentAsPullRequest(token, path, content, commitMessage, extraFiles);
                setPrUrl(url);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Failed to save');
                throw e;
            } finally {
                setSaving(false);
            }
        },
        [token, path, varName, headerComment]
    );

    return { data, setData, load, save, loading, saving, error, prUrl };
}
