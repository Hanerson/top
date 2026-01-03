import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { posts } from '../data';
import { Post } from '../types';
import { ArrowLeft, Clock, Calendar, Box, Maximize2, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import PDFViewer from '../components/PDFViewer';
import 'highlight.js/styles/github-dark.css';

const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const findPostById = (items: Post[], targetId: number): Post | undefined => {
        for (const item of items) {
            if (item.id === targetId) return item;
            if (item.children && item.children.length > 0) {
                const found = findPostById(item.children, targetId);
                if (found) return found;
            }
        }
        return undefined;
    };

    // 使用 useMemo 优化性能，仅在 id 或 posts 变化时重新计算
    const post = useMemo(() => {
        return findPostById(posts, parseInt(id || '0'));
    }, [id]);

    const isPDF = post?.type === 'pdf';

    useEffect(() => {
        if (post?.type === 'article' && post.fileUrl) {
            setLoading(true);
            fetch(post.fileUrl)
                .then(res => res.ok ? res.text() : Promise.reject())
                .then(text => {
                    setContent(text);
                    setLoading(false);
                })
                .catch(() => {
                    setContent('# Error \n无法加载内容。请检查文件路径是否正确。');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
        // 切换文章时自动滚动到顶部
        window.scrollTo(0, 0);
    }, [post]);

    // 错误处理：找不到文章时显示
    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-mono text-slate-400">
                <Terminal size={48} className="mb-4 opacity-20" />
                <div className="text-xs tracking-[0.2em]">STATUS_404: RESOURCE_NOT_FOUND</div>
                <Link to="/" className="mt-8 text-indigo-500 hover:underline">返回系统首页</Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-6">
            {/* 动态调整容器宽度：PDF 使用宽屏 5xl，纯文字使用阅读专注型 2xl */}
            <div className={`mx-auto transition-all duration-500 ${isPDF ? 'max-w-5xl' : 'max-w-2xl'}`}>

                {/* 顶部导航与 Meta 信息 */}
                <div className="flex justify-between items-center mb-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-mono text-xs uppercase tracking-tighter group"
                    >
                        <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                        <span>cd ..</span>
                    </Link>
                    {isPDF && (
                        <div className="flex items-center gap-2 text-slate-300 font-mono text-[10px]">
                            <Maximize2 size={10} /> <span>THEATER_MODE_ACTIVE</span>
                        </div>
                    )}
                </div>

                {/* 文章头部 */}
                <motion.header
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 border-b border-slate-50 pb-8"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-mono font-bold uppercase tracking-widest">
                            {post.type}
                        </span>
                        {post.category && (
                            <span className="text-slate-300 font-mono text-[9px]">/ {post.category.toUpperCase()}</span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <Calendar size={12} className="text-slate-300" /> {post.date.replace(/-/g, '.')}
                        </div>
                        <div className="flex items-center gap-2">
                            <Box size={12} className="text-slate-300" /> {post.category}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={12} className="text-slate-300" /> {post.readTime}
                        </div>
                    </div>
                </motion.header>

                {/* 正文渲染区域 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {loading ? (
                        <div className="flex flex-col items-center py-20">
                            <div className="font-mono text-[10px] text-slate-300 animate-pulse tracking-tighter">
                                {`> INITIALIZING_STREAM_READER...`}
                            </div>
                        </div>
                    ) : isPDF ? (
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                            <PDFViewer fileUrl={post.fileUrl || ''} />
                        </div>
                    ) : (
                        <div className="prose prose-slate prose-base max-w-none
                            prose-headings:text-slate-900 prose-headings:font-bold
                            prose-code:text-indigo-600 prose-code:bg-indigo-50/50 prose-code:px-1 prose-code:rounded
                            prose-pre:bg-[#1a1b26] prose-pre:rounded-xl prose-pre:shadow-lg
                            prose-img:rounded-xl prose-img:shadow-md
                            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </motion.div>

                {/* 底部装饰 */}
                <footer className="mt-24 pt-8 border-t border-slate-50 flex justify-between items-center">
                    <div className="text-[10px] font-mono text-slate-300 uppercase">
                        End_of_Transmission
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1 h-1 rounded-full bg-slate-100"></div>
                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    </div>
                </footer>
            </div>
        </article>
    );
};

export default BlogPost;