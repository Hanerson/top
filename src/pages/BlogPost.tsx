import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { posts } from '../data';
import { ArrowLeft, Calendar, Tag, Clock, FileText } from 'lucide-react';
// 1. 这里引入 Variants 类型
import { motion, type Variants } from 'framer-motion';
import PDFViewer from '../components/PDFViewer';
import 'highlight.js/styles/github-dark.css';

const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = posts.find(p => p.id === parseInt(id || '0'));

    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (post?.type === 'article' && post.fileUrl) {
            setLoading(true);
            fetch(post.fileUrl)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch');
                    return res.text();
                })
                .then(text => {
                    setContent(text);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setContent('# 加载失败 \n 无法读取文章内容。');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
        window.scrollTo(0, 0);
    }, [post]);

    if (!post) return <div className="text-center py-40">文章不存在</div>;

    // 2. 显式定义类型为 Variants，解决 TypeScript 报错
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <article className="pt-32 pb-20 px-6 min-h-screen bg-white">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-8 group">
          <span className="p-2 rounded-full bg-gray-50 group-hover:bg-indigo-50 transition-colors">
             <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
          </span>
                    <span className="font-medium">返回首页</span>
                </Link>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants} // 现在这里不会报错了
                    className="mb-10"
                >
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100"><Calendar size={14}/> {post.date}</span>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600"><Tag size={14}/> {post.category}</span>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100"><Clock size={14}/> {post.readTime}</span>
                        {post.type === 'pdf' && <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600"><FileText size={14}/> PDF Document</span>}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 md:h-[400px] object-cover rounded-3xl shadow-2xl mb-12"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="text-gray-400 text-sm animate-pulse">正在从服务器获取内容...</p>
                        </div>
                    ) : post.type === 'pdf' ? (
                        <div className="w-full">
                            <PDFViewer fileUrl={post.fileUrl} />
                        </div>
                    ) : (
                        <div className="prose prose-lg prose-indigo md:prose-xl prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-500 max-w-none bg-white">
                            <ReactMarkdown
                                rehypePlugins={[rehypeHighlight]}
                                remarkPlugins={[remarkGfm]}
                            >
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