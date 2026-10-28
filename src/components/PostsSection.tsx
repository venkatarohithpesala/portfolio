"use client";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { posts, postDate, POST_TAGS } from '../data/posts';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Star, X } from 'lucide-react';

type Post = (typeof posts)[number];

const PAGE_SIZE_DESKTOP = 9;
// Phones show one card per row, so a smaller batch keeps the scrolling short.
const PAGE_SIZE_MOBILE = 6;
const MOBILE_QUERY = '(max-width: 639px)';

function subscribeMobile(callback: () => void) {
    const mq = window.matchMedia(MOBILE_QUERY);
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
}
const LINKEDIN_ACTIVITY_URL = 'https://www.linkedin.com/in/venkatarohithpesala/recent-activity/all/';

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const formatDate = (id: string) => dateFormat.format(postDate(id));

function PostCard({ post, featured, lead, onOpen }: { post: Post; featured?: boolean; lead?: boolean; onOpen: () => void }) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className={`project-card group relative overflow-hidden flex flex-col items-start text-left h-full w-full rounded-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                featured
                    ? `${lead ? 'p-7 md:p-10 justify-center' : 'p-6 md:p-7'} border border-blue-500/30 bg-gradient-to-br from-blue-500/15 via-zinc-900/40 to-zinc-900/40 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-blue-400/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.28)]`
                    : 'p-5 bg-zinc-900/40 border border-white/10 hover:border-blue-500/30 hover:bg-zinc-900/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]'
            }`}
        >
            {featured && (
                <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 via-sky-300 to-transparent" />
            )}
            {featured && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                    <Star size={13} strokeWidth={2.25} className="fill-current" />
                    Featured
                </span>
            )}
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="label-pill inline-block px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-wider">
                    {post.tag}
                </span>
                <span className="text-xs font-medium text-zinc-500">{formatDate(post.id)}</span>
            </div>
            <h3
                className={`font-bold leading-snug text-white group-hover:text-blue-400 transition-colors mb-5 ${
                    lead
                        ? 'text-2xl md:text-4xl'
                        : featured
                          ? 'text-xl md:text-2xl line-clamp-4'
                          : 'text-base line-clamp-3'
                }`}
            >
                {post.title}
            </h3>
            {lead && post.summary && (
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 max-w-xl">{post.summary}</p>
            )}
            <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-blue-400">
                View post
                <ExternalLink size={14} strokeWidth={2} />
            </span>
        </button>
    );
}

export default function PostsSection() {
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const isMobile = useSyncExternalStore(
        subscribeMobile,
        () => window.matchMedia(MOBILE_QUERY).matches,
        () => false
    );
    const pageSize = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP;
    const [pages, setPages] = useState(1);
    const visible = pages * pageSize;
    const [openId, setOpenId] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const isFiltering = query.trim() !== '' || activeTag !== null;
    const featured = useMemo(() => posts.filter((p) => p.featured), []);
    const tags = POST_TAGS.filter((t) => posts.some((p) => p.tag === t));

    const matches = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts.filter((p) => {
            if (activeTag && p.tag !== activeTag) return false;
            if (q && !`${p.title} ${p.tag}`.toLowerCase().includes(q)) return false;
            // Featured posts get their own row until a filter is applied.
            return isFiltering || !p.featured;
        });
    }, [query, activeTag, isFiltering]);

    const shown = matches.slice(0, visible);
    const hasMore = visible < matches.length;
    const openPost = posts.find((p) => p.id === openId);

    useEffect(() => {
        if (!openId) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenId(null);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [openId]);

    const resetVisible = () => setPages(1);

    return (
        <section ref={sectionRef} className="my-20 md:my-28 w-full scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                <div>
                    <motion.h2
                        className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Posts
                    </motion.h2>
                    <motion.p
                        className="text-zinc-400 text-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        What I&apos;m building and sharing on LinkedIn.
                    </motion.p>
                </div>

                <motion.div
                    className="relative max-w-xs w-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <input
                        type="text"
                        placeholder="Search posts (e.g. Redis, AWS)..."
                        aria-label="Search posts"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            resetVisible();
                        }}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-full pl-6 pr-12 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
                    />
                    <Search size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </motion.div>
            </div>

            <motion.div
                className="flex flex-wrap gap-2 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
            >
                {tags.map((tag) => {
                    const isActive = activeTag === tag;
                    return (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => {
                                setActiveTag(isActive ? null : tag);
                                resetVisible();
                            }}
                            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-tight border transition-all ${
                                isActive
                                    ? 'bg-blue-500 border-blue-400 text-black shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-blue-500/40'
                            }`}
                        >
                            {tag}
                        </button>
                    );
                })}
            </motion.div>

            {!isFiltering && featured.length > 0 && (
                <div className="mb-4">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Featured</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
                        {featured.map((post, idx) => (
                            <motion.div
                                key={post.id}
                                className={idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                viewport={{ once: true }}
                            >
                                <PostCard post={post} featured lead={idx === 0} onOpen={() => setOpenId(post.id)} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {isFiltering && (
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">
                    {matches.length} matching post{matches.length === 1 ? '' : 's'}
                </p>
            )}
            {!isFiltering && <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3 mt-10">All posts</p>}

            {matches.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {shown.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: (idx % 3) * 0.06 }}
                            viewport={{ once: true }}
                        >
                            <PostCard post={post} onOpen={() => setOpenId(post.id)} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-white/40 text-lg italic py-12">No posts found matching your search.</p>
            )}

            <div className="mt-10 flex flex-wrap justify-center gap-3">
                {hasMore && (
                    <button
                        type="button"
                        onClick={() => setPages((p) => p + 1)}
                        className="px-4 py-2 text-sm rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold hover:bg-blue-500 hover:text-black transition-all active:scale-95"
                    >
                        Show more posts
                    </button>
                )}
                {pages > 1 && (
                    <button
                        type="button"
                        onClick={() => {
                            resetVisible();
                            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="px-4 py-2 text-sm rounded-full bg-zinc-900 border border-zinc-700 text-white font-bold hover:bg-zinc-800 hover:border-blue-500/50 transition-all active:scale-95"
                    >
                        Show less
                    </button>
                )}
                <a
                    href={LINKEDIN_ACTIVITY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-zinc-900 border border-zinc-700 text-white font-bold hover:bg-zinc-800 hover:border-blue-500/50 transition-all active:scale-95"
                >
                    View all on LinkedIn
                    <ExternalLink size={14} strokeWidth={2.25} />
                </a>
            </div>

            <AnimatePresence>
                {openPost && (
                    <motion.div
                        className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenId(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-label={openPost.title}
                    >
                        <motion.div
                            className="flex max-h-[90vh] w-full max-w-135 flex-col overflow-hidden rounded-2xl bg-zinc-900 border border-white/10"
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
                                <a
                                    href={`https://www.linkedin.com/feed/update/urn:li:share:${openPost.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Open on LinkedIn
                                    <ExternalLink size={14} strokeWidth={2} />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setOpenId(null)}
                                    aria-label="Close post"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                                >
                                    <X size={18} strokeWidth={2.25} />
                                </button>
                            </div>
                            <div data-lenis-prevent className="overflow-y-auto overscroll-contain p-2 sm:p-3">
                                <iframe
                                    src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${openPost.id}?collapsed=1`}
                                    height={openPost.height}
                                    width="504"
                                    title={openPost.title}
                                    className="mx-auto block max-w-full rounded-xl bg-white"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
