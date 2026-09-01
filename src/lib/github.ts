// Minimal GitHub REST API client for the admin content editor.
// No backend involved — this calls api.github.com directly from the
// browser using a personal access token the user provides themselves.

const REPO_OWNER = 'venkatarohithpesala';
const REPO_NAME = 'portfolio';
const API_BASE = 'https://api.github.com';

export class GitHubApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

async function githubFetch(token: string, path: string, options: RequestInit = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...options.headers,
        },
    });
    if (!res.ok) {
        let message = res.statusText;
        try {
            const body = await res.json();
            message = body.message || message;
        } catch {
            // ignore
        }
        throw new GitHubApiError(res.status, message);
    }
    if (res.status === 204) return null;
    return res.json();
}

function utf8ToBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    bytes.forEach((b) => {
        binary += String.fromCharCode(b);
    });
    return btoa(binary);
}

function base64ToUtf8(base64: string): string {
    const binary = atob(base64.replace(/\n/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
}

export type GitHubUser = { login: string; name: string | null; avatar_url: string };

// Validates the token and confirms it has access to the target repo.
export async function validateToken(token: string): Promise<GitHubUser> {
    const user = await githubFetch(token, '/user');
    await githubFetch(token, `/repos/${REPO_OWNER}/${REPO_NAME}`);
    return user;
}

export async function getFileContent(token: string, path: string): Promise<{ content: string; sha: string }> {
    const data = await githubFetch(token, `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=main`);
    return { content: base64ToUtf8(data.content), sha: data.sha };
}

async function getMainSha(token: string): Promise<string> {
    const data = await githubFetch(token, `/repos/${REPO_OWNER}/${REPO_NAME}/git/ref/heads/main`);
    return data.object.sha;
}

async function branchExists(token: string, branch: string): Promise<boolean> {
    try {
        await githubFetch(token, `/repos/${REPO_OWNER}/${REPO_NAME}/git/ref/heads/${branch}`);
        return true;
    } catch (err) {
        if (err instanceof GitHubApiError && err.status === 404) return false;
        throw err;
    }
}

async function createBranch(token: string, branch: string): Promise<void> {
    const mainSha = await getMainSha(token);
    await githubFetch(token, `/repos/${REPO_OWNER}/${REPO_NAME}/git/refs`, {
        method: 'POST',
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: mainSha }),
    });
}

export type FileWrite = { path: string; content: string; encoding?: 'utf8' | 'base64' };

async function getShaOnBranch(token: string, path: string, branch: string): Promise<string | null> {
    try {
        const data = await githubFetch(token, `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${branch}`);
        return data.sha;
    } catch (err) {
        if (err instanceof GitHubApiError && err.status === 404) return null;
        throw err;
    }
}

async function writeFileOnBranch(
    token: string,
    path: string,
    content: string,
    branch: string,
    message: string,
    encoding: 'utf8' | 'base64' = 'utf8'
): Promise<void> {
    const sha = await getShaOnBranch(token, path, branch);
    const base64Content = encoding === 'base64' ? content : utf8ToBase64(content);
    await githubFetch(token, `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
        method: 'PUT',
        body: JSON.stringify({ message, content: base64Content, sha: sha ?? undefined, branch }),
    });
}

async function createPullRequest(token: string, branch: string, title: string, body: string) {
    return githubFetch(token, `/repos/${REPO_OWNER}/${REPO_NAME}/pulls`, {
        method: 'POST',
        body: JSON.stringify({ title, head: branch, base: 'main', body }),
    });
}

// End-to-end: create a branch off main, commit the new file content (plus any
// extra files, e.g. uploaded icon images) to it, and open a PR back to main.
// Returns the PR URL.
export async function saveContentAsPullRequest(
    token: string,
    path: string,
    newContent: string,
    commitMessage: string,
    extraFiles: FileWrite[] = []
): Promise<string> {
    const branch = `content/${path.split('/').pop()?.replace(/\.[^.]+$/, '')}-${Date.now()}`;
    if (!(await branchExists(token, branch))) {
        await createBranch(token, branch);
    }

    for (const file of extraFiles) {
        await writeFileOnBranch(token, file.path, file.content, branch, commitMessage, file.encoding ?? 'utf8');
    }

    await writeFileOnBranch(token, path, newContent, branch, commitMessage);

    const pr = await createPullRequest(
        token,
        branch,
        commitMessage,
        `Content update via the admin panel.\n\nEdited file: \`${path}\`` +
            (extraFiles.length ? `\nNew files: ${extraFiles.map((f) => `\`${f.path}\``).join(', ')}` : '')
    );

    return pr.html_url as string;
}
