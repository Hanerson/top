// src/pages/BlogPost.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { posts } from '../data';
import { ArrowLeft, Clock, Calendar, Box, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PDFViewer from '../components/PDFViewer';
import 'highlight.js/styles/github-dark.css';

const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = posts.find(p => p.id === parseInt(id || '0'));
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const isPDF = post?.type === 'pdf';

    useEffect(() => {
        if (post?.type === 'article' && post.fileUrl) {
            setLoading(true);
            fetch(post.fileUrl)
                .then(res => res.ok ? res.text() : Promise.reject())
                .then(text => { setContent(text); setLoading(false); })
                .catch(() => { setContent('# Error \n无法加载内容。'); setLoading(false); });
        } else { setLoading(false); }
        window.scrollTo(0, 0);
    }, [post]);

    if (!post) return <div className="py-40 text-center font-mono text-xs text-slate-400">STATUS_404</div>;

    return (
        <article className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-6">
            {/* 动态调整容器宽度：PDF 使用 5xl(1024px)，纯文字使用 2xl(672px) */}
            <div className={`mx-auto transition-all duration-500 ${isPDF ? 'max-w-5xl' : 'max-w-2xl'}`}>

                {/* 顶部导航与 Meta 信息 */}
                <div className="flex justify-between items-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-mono text-xs uppercase tracking-tighter">
                        <ArrowLeft size={12} /> <span>cd ..</span>
                    </Link>
                    {isPDF && (
                        <div className="flex items-center gap-2 text-slate-300 font-mono text-[10px]">
                            <Maximize2 size={10} /> <span>THEATER_MODE_ACTIVE</span>
                        </div>
                    )}
                </div>

                <motion.header
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="mb-12 border-b border-slate-50 pb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap gap-6 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-2"><Calendar size={12} /> {post.date}</div>
                        <div className="flex items-center gap-2"><Box size={12} /> {post.category}</div>
                        <div className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</div>
                    </div>
                </motion.header>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    {loading ? (
                        <div className="font-mono text-[10px] text-slate-300 animate-pulse tracking-tighter">
                            {`> INITIALIZING_STREAM_READER...`}
                        </div>
                    ) : isPDF ? (
                        <PDFViewer fileUrl={post.fileUrl} />
                    ) : (
                        <div className="prose prose-slate prose-base max-w-none
                            prose-headings:text-slate-900 prose-code:text-indigo-500 prose-code:bg-slate-50
                            prose-pre:bg-[#1a1b26] prose-pre:rounded-xl">
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </motion.div>
            </div>
        </article>
    );
};

export default BlogPost;